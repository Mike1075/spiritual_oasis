// MiniMax 开放平台 — 服务端流式调用（OpenAI 兼容端点，纯 fetch 零依赖）
// 国内端点 api.minimaxi.com；Vercel 节点在海外时可设 MINIMAX_BASE_URL=https://api.minimax.io/v1
// 模型 MiniMax-M3（已验证可用，1M 上下文，带 reasoning）。

const BASE_URL = process.env.MINIMAX_BASE_URL || "https://api.minimaxi.com/v1";
const API_KEY = process.env.MINIMAX_API_KEY || "";
// M 系列全部强制输出 <think> 思维链且无法关闭（已实测 thinking/enable_thinking/reasoning 参数均无效）。
// highspeed 版思考最快；max_tokens 必须给足思考+正文的预算，前端负责剥离 <think>。
// ⚠️ 实测吞吐波动大（同请求 60-400s），疑似 TokenPlan 套餐限流——直播并发高时
// 可在 Vercel 改 MINIMAX_MODEL 切到 MiniMax-M2.1-highspeed（实测最快）无需改代码。
const MODEL = process.env.MINIMAX_MODEL || "MiniMax-M2.5-highspeed";

export const minimaxConfigured = Boolean(API_KEY);

// 调 MiniMax 并把 SSE 字节流原样透传给浏览器。
// 前端解析 OpenAI 格式 chunk，取 choices[0].delta.content（忽略 reasoning_content）。
export async function streamChat(
  system: string,
  user: string,
  maxTokens = 6000
): Promise<Response> {
  return streamChatMessages(system, [{ role: "user", content: user }], maxTokens, 0.7);
}

export type ChatMessage = { role: "user" | "assistant"; content: string };

// 多轮对话版（AI 客服用）
export async function streamChatMessages(
  system: string,
  messages: ChatMessage[],
  maxTokens = 3000,
  temperature = 0.3
): Promise<Response> {
  if (!API_KEY) {
    return Response.json(
      { ok: false, error: "MINIMAX_API_KEY 未配置" },
      { status: 503 }
    );
  }
  const upstream = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      messages: [{ role: "system", content: system }, ...messages],
      max_tokens: maxTokens,
      temperature,
    }),
  });
  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("[minimax] upstream error", upstream.status, detail.slice(0, 500));
    return Response.json(
      { ok: false, error: `模型服务暂时不可用 (${upstream.status})` },
      { status: 502 }
    );
  }
  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}

// 文生图（/mas-life/demo「10 年后」用）:MiniMax image-01,返回图片 URL(有时效,调用方负责落库)
// ⚠️ 跨境打国内端点 + TokenPlan 限流,实测偶发 base_resp 非 0 / 空结果——给 3 次重试,
//   实测一次重试基本能救回。返回的 OSS 链接 24h 过期,调用方须立即落盘成永久素材。
export async function generateImage(
  prompt: string,
  aspectRatio = "3:4",
  retries = 2
): Promise<string> {
  if (!API_KEY) throw new Error("MINIMAX_API_KEY 未配置");
  let lastErr = "";
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(`${BASE_URL}/image_generation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: process.env.MINIMAX_IMAGE_MODEL || "image-01",
          prompt: prompt.slice(0, 1500),
          aspect_ratio: aspectRatio,
          response_format: "url",
          n: 1,
          // 不用官方 prompt 改写:改写可能丢掉「无文字/无人脸」硬约束
          prompt_optimizer: false,
        }),
      });
      const json = (await res.json().catch(() => null)) as {
        data?: { image_urls?: string[] };
        base_resp?: { status_code?: number; status_msg?: string };
      } | null;
      const url = json?.data?.image_urls?.[0];
      if (res.ok && url) return url;
      lastErr = `${json?.base_resp?.status_code ?? res.status} ${
        json?.base_resp?.status_msg ?? ""
      }`;
    } catch (e) {
      lastErr = e instanceof Error ? e.message : String(e);
    }
    if (i < retries) await new Promise((r) => setTimeout(r, 800 * (i + 1)));
  }
  throw new Error(`文生图失败(重试 ${retries + 1} 次): ${lastErr}`);
}
