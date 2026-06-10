import { streamChatMessages, type ChatMessage } from "@/lib/minimax";
import { ASSISTANT_SYSTEM } from "@/lib/assistantPrompt";

export const runtime = "nodejs";
// M 系列先输出思维链再出正文，客服场景给足余量
export const maxDuration = 300;

// 朴素的进程内限流（serverless 实例各自计数，挡得住单点滥刷，挡不住分布式——
// 真被刷了在 Vercel 上 WAF/限流，这里只是第一道闸）
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_PER_WINDOW) return true;
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear(); // 防内存膨胀
  return false;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json(
      { ok: false, error: "提问太快啦，歇 1 分钟再来；急事请进群找人工客服" },
      { status: 429 }
    );
  }

  let body: { messages?: { role?: string; content?: string }[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "请求格式错误" }, { status: 400 });
  }

  // 只保留最近 12 条、每条截断，且必须以用户消息收尾
  const messages: ChatMessage[] = (body.messages ?? [])
    .filter(
      (m): m is { role: "user" | "assistant"; content: string } =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim() !== ""
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return Response.json({ ok: false, error: "请输入问题" }, { status: 400 });
  }

  return streamChatMessages(ASSISTANT_SYSTEM, messages, 3000, 0.3);
}
