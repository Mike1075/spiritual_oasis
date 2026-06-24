// 多轮对话流式 + 兜底：先 MiniMax；若出错或迟迟不出"正文 token"（思考卡住/限流/挂掉），
// 切换到 Vercel AI Gateway 的 DeepSeek v4-pro。对客户端始终输出干净的 OpenAI 兼容 SSE（只发 delta.content）。
import type { ChatMessage } from "./minimax";

const MM_BASE = process.env.MINIMAX_BASE_URL || "https://api.minimaxi.com/v1";
const MM_KEY = process.env.MINIMAX_API_KEY || "";
const MM_MODEL = process.env.MINIMAX_MODEL || "MiniMax-M2.5-highspeed";

const GW_BASE = process.env.AI_GATEWAY_BASE_URL || "https://ai-gateway.vercel.sh/v1";
const GW_KEY = process.env.AI_GATEWAY_API_KEY || "";
const GW_MODEL = process.env.FALLBACK_MODEL || "deepseek/deepseek-v4-pro";

// MiniMax 多久没吐出"正文"就判定太慢、切兜底（思考链不算正文）。可用 env 调。
const FIRST_TOKEN_MS = Number(process.env.MM_FIRST_TOKEN_MS || 15000);

function reqInit(
  key: string,
  model: string,
  system: string,
  messages: ChatMessage[],
  maxTokens: number,
  temperature: number,
  signal?: AbortSignal
): RequestInit {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      stream: true,
      messages: [{ role: "system", content: system }, ...messages],
      max_tokens: maxTokens,
      temperature,
    }),
    signal,
  };
}

// 读 SSE，对每个 delta.content 调 onContent；忽略 reasoning_content（思考链）。
async function pump(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onContent: (text: string) => void
): Promise<void> {
  const dec = new TextDecoder();
  let buf = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() || "";
    for (const line of lines) {
      const t = line.trim();
      if (!t.startsWith("data:")) continue;
      const d = t.slice(5).trim();
      if (!d || d === "[DONE]") continue;
      try {
        const j = JSON.parse(d);
        const c = j?.choices?.[0]?.delta?.content;
        if (typeof c === "string" && c) onContent(c);
      } catch {
        /* 跳过不完整 chunk */
      }
    }
  }
}

export async function streamChatWithFallback(
  system: string,
  messages: ChatMessage[],
  maxTokens = 2400,
  temperature = 0.6
): Promise<Response> {
  if (!MM_KEY && !GW_KEY) {
    return Response.json({ ok: false, error: "未配置任何模型" }, { status: 503 });
  }
  const enc = new TextEncoder();
  const sse = (text: string) =>
    enc.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`);

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let produced = false;

      // 1) 先试 MiniMax，带"首个正文 token"超时
      if (MM_KEY) {
        const ac = new AbortController();
        const timer = setTimeout(() => ac.abort(), FIRST_TOKEN_MS);
        try {
          const up = await fetch(
            `${MM_BASE}/chat/completions`,
            reqInit(MM_KEY, MM_MODEL, system, messages, maxTokens, temperature, ac.signal)
          );
          if (up.ok && up.body) {
            await pump(up.body.getReader(), (c) => {
              if (!produced) {
                produced = true;
                clearTimeout(timer);
              }
              controller.enqueue(sse(c));
            });
          }
        } catch {
          /* 超时被 abort 或网络错 → 落到兜底 */
        } finally {
          clearTimeout(timer);
        }
      }

      // 2) MiniMax 没出正文 → 兜底 DeepSeek v4-pro
      if (!produced && GW_KEY) {
        try {
          const up = await fetch(
            `${GW_BASE}/chat/completions`,
            reqInit(GW_KEY, GW_MODEL, system, messages, maxTokens, temperature)
          );
          if (up.ok && up.body) {
            await pump(up.body.getReader(), (c) => {
              produced = true;
              controller.enqueue(sse(c));
            });
          }
        } catch {
          /* 兜底也失败 */
        }
      }

      if (!produced) {
        controller.enqueue(sse("（我在的，只是一时没接上话。可以再说一次吗。）"));
      }
      controller.enqueue(enc.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
