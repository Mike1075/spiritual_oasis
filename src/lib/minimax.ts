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
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
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
