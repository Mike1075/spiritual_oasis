import { NextResponse } from "next/server";
import {
  createBitableRecord,
  feishuConfigured,
  COMPASS_TABLE_ID,
} from "@/lib/feishu";

export const runtime = "nodejs";

// 来源场次映射（与 /api/lead 保持一致）
const SOURCE_MAP: Record<string, string> = {
  "1": "晚1·意义与方向",
  "2": "晚2·真机证据",
  "3": "晚3·方法+开售",
  ep1: "晚1·意义与方向",
  ep2: "晚2·真机证据",
  ep3: "晚3·方法+开售",
};

// 报告完成即匿名落表（"所有测评结果都写入飞书"），留资时再补姓名/联系方式
export async function POST(req: Request) {
  let body: {
    identityLabel?: string;
    archetypeLabel?: string;
    direction?: string;
    report?: string;
    answers?: string;
    ep?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "请求格式错误" }, { status: 400 });
  }

  const report = String(body.report ?? "").slice(0, 20000);
  if (report.length < 200) {
    return NextResponse.json({ ok: false, error: "报告内容缺失" }, { status: 400 });
  }

  const fields: Record<string, string> = {
    姓名: "（未留资）",
    "手机/微信": "",
    身份: String(body.identityLabel ?? "").slice(0, 20),
    测评原型: String(body.archetypeLabel ?? "").slice(0, 60),
    意向方向: String(body.direction ?? "").slice(0, 80),
    来源场次: SOURCE_MAP[body.ep || ""] || "罗盘页直接进",
    答题摘要: String(body.answers ?? "").slice(0, 3000),
    报告: report,
    解锁: "未解锁",
    状态: "匿名测评",
  };

  if (!feishuConfigured) {
    console.warn("[compass/save] FEISHU_APP_SECRET 未配置，结果未写入");
    return NextResponse.json({ ok: true, stored: false, recordId: "" });
  }
  try {
    const recordId = await createBitableRecord(fields, COMPASS_TABLE_ID);
    return NextResponse.json({ ok: true, stored: true, recordId });
  } catch (err) {
    console.error("[compass/save] 写入失败：", err);
    // 不打扰用户体验；留资阶段还有一次补救机会
    return NextResponse.json({ ok: true, stored: false, recordId: "" });
  }
}
