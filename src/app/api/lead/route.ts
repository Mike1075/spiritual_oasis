import { NextResponse } from "next/server";
import { createBitableRecord, feishuConfigured } from "@/lib/feishu";

export const runtime = "nodejs";

// 来源场次映射（与飞书表单选项严格一致）
const SOURCE_MAP: Record<string, string> = {
  "1": "晚1·意义与方向",
  "2": "晚2·真机证据",
  "3": "晚3·方法+开售",
  ep1: "晚1·意义与方向",
  ep2: "晚2·真机证据",
  ep3: "晚3·方法+开售",
};

const IDENTITY_SET = new Set(["家长", "考生", "其他"]);

type LeadPayload = {
  name?: string;
  contact?: string;
  identity?: string;
  archetype?: string;
  ep?: string;
  note?: string;
};

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "请求格式错误" },
      { status: 400 }
    );
  }

  const name = (body.name || "").trim().slice(0, 40);
  const contact = (body.contact || "").trim().slice(0, 60);

  // 至少要有联系方式才算有效留资
  if (!contact) {
    return NextResponse.json(
      { ok: false, error: "请留下手机号或微信号" },
      { status: 400 }
    );
  }

  const identity = IDENTITY_SET.has(body.identity || "")
    ? (body.identity as string)
    : "其他";
  const source = SOURCE_MAP[body.ep || ""] || "自测页直接进";

  const fields: Record<string, string> = {
    姓名: name || "（未填）",
    "手机/微信": contact,
    身份: identity,
    测评原型: (body.archetype || "").slice(0, 60),
    来源场次: source,
    状态: "新线索",
    备注: (body.note || "").slice(0, 200),
  };

  // 未配置飞书机密时（如本地未设 .env）：不报错，留资体验照常，仅记录到日志
  if (!feishuConfigured) {
    console.warn("[lead] FEISHU_APP_SECRET 未配置，留资未写入飞书：", fields);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const recordId = await createBitableRecord(fields);
    return NextResponse.json({ ok: true, stored: true, recordId });
  } catch (err) {
    console.error("[lead] 写入飞书失败：", err, fields);
    // 对用户不暴露失败：仍返回 ok，避免到手的线索因后端抖动流失（日志已留底可补录）
    return NextResponse.json({ ok: true, stored: false });
  }
}
