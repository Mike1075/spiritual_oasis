import { NextResponse } from "next/server";
import { streamChat } from "@/lib/minimax";
import {
  getBitableRecord,
  updateBitableRecord,
  COMPASS_TABLE_ID,
} from "@/lib/feishu";
import { fieldText, stripThink } from "@/lib/demo";

export const runtime = "nodejs";
// M 系列思维链 + 长文,生成可能跑数分钟
export const maxDuration = 300;

function buildPrompts(record: Record<string, unknown>, name: string) {
  const nowYear = new Date().getFullYear();
  const system =
    `你是一位温暖而克制的传记作家。用户做过一次「AI 人生定位测评」,下面是 TA 的定位资料。` +
    `请以「来自 10 年后(${nowYear + 10} 年)的一封信」的口吻,写 TA 未来 10 年的人生发展故事。\n\n` +
    `硬性要求:\n` +
    `1. 第二人称「你」,由 10 年后的 TA 写给现在的 TA,开头称呼对方为「${name}」。\n` +
    `2. 按时间推进:从 ${nowYear} 年到 ${nowYear + 10} 年,自然选取若干年份节点,写清每个阶段发生了什么、TA 是怎么一步步走过来的。有挫折也有转机,合理可信,不浮夸、不灌鸡汤。\n` +
    `3. 内容必须紧扣 TA 的定位资料(身份、测评原型、选定方向、报告里的优势与隐忧),让 TA 读完觉得「这就是我的人生」。\n` +
    `4. 要有具体的生活细节——某个清晨或深夜、一个场景、一句对话,有温度、有故事。\n` +
    `5. 纯文本分段输出,段落之间空一行;不要使用任何 Markdown 标题、列表、加粗符号。\n` +
    `6. 不限字数,以把故事讲完、讲好为准。\n` +
    `7. 结尾署名「—— 10 年后的你」。`;
  const user =
    `称呼:${name}\n` +
    `身份:${fieldText(record["身份"])}\n` +
    `测评原型:${fieldText(record["测评原型"])}\n` +
    `选定方向:${fieldText(record["意向方向"])}\n\n` +
    `定位报告:\n${fieldText(record["报告"]).slice(0, 5000)}\n\n` +
    `答题摘要:\n${fieldText(record["答题摘要"]).slice(0, 1500)}`;
  return { system, user };
}

// 命中记录后的「文」路:流式生成 10 年故事,SSE 原样透传给前端,
// 服务端同步累积内容,流结束时剥掉思维链写回 demo故事(缓存,每手机号 1 次)
export async function POST(req: Request) {
  let body: { id?: string; contact?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "请求格式错误" }, { status: 400 });
  }
  const id = String(body.id ?? "");
  const contact = String(body.contact ?? "").trim();
  if (!/^rec[A-Za-z0-9]+$/.test(id) || contact.length < 4) {
    return NextResponse.json({ ok: false, error: "参数错误" }, { status: 400 });
  }
  const record = await getBitableRecord(id, COMPASS_TABLE_ID);
  if (!record) {
    return NextResponse.json({ ok: false, error: "记录不存在" }, { status: 404 });
  }
  // 轻鉴权:必须持有该记录留资时的联系方式
  if (fieldText(record["手机/微信"]).trim() !== contact) {
    return NextResponse.json({ ok: false, error: "无权访问" }, { status: 403 });
  }
  const cached = fieldText(record["demo故事"]).trim();
  if (cached) {
    return NextResponse.json({ ok: true, cached: true, story: cached });
  }

  const savedName = fieldText(record["姓名"]).trim();
  const { system, user } = buildPrompts(
    record,
    savedName && savedName !== "（未填）" && savedName !== "（未留资）"
      ? savedName
      : "朋友"
  );
  // max_tokens 给足:思维链会吃掉大量预算
  const upstream = await streamChat(system, user, 24000);
  const ct = upstream.headers.get("Content-Type") || "";
  if (!ct.includes("text/event-stream") || !upstream.body) {
    return upstream; // 上游错误 JSON 原样透传
  }

  // 透传字节流的同时解析 SSE 累积正文,flush 时落库
  const decoder = new TextDecoder();
  let buf = "";
  let full = "";
  const transform = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      controller.enqueue(chunk);
      buf += decoder.decode(chunk, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const line of lines) {
        const t = line.trim();
        if (!t.startsWith("data:")) continue;
        const payload = t.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const j = JSON.parse(payload) as {
            choices?: { delta?: { content?: unknown } }[];
          };
          const c = j.choices?.[0]?.delta?.content;
          if (typeof c === "string") full += c;
        } catch {
          /* 半截 JSON,跳过 */
        }
      }
    },
    async flush() {
      const story = stripThink(full);
      // 太短视为生成失败,不落库,用户可重试
      if (story.length < 100) return;
      try {
        await updateBitableRecord(id, { demo故事: story }, COMPASS_TABLE_ID);
      } catch (err) {
        console.error("[mas-life/demo/story] 故事落库失败：", err);
      }
    },
  });
  return new Response(upstream.body.pipeThrough(transform), {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
