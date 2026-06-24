import { GUIDE_SYSTEM } from "@/lib/guidePrompt";
import { type ChatMessage } from "@/lib/minimax";
import { streamChatWithFallback } from "@/lib/chatFallback";

export const runtime = "nodejs";
// M 系列先输出思维链再出正文，留足上限
export const maxDuration = 300;

export async function POST(req: Request) {
  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: "请求格式错误" }, { status: 400 });
  }

  const raw = Array.isArray(body.messages) ? body.messages : [];
  // 清洗：只留 user/assistant、限长、限轮数（防滥用）
  const messages: ChatMessage[] = raw
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string"
    )
    .slice(-16)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return Response.json({ ok: false, error: "请先说点什么" }, { status: 400 });
  }

  return streamChatWithFallback(GUIDE_SYSTEM, messages, 2400, 0.6);
}
