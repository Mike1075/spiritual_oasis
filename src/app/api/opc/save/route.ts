import { NextResponse } from "next/server";
import { createBitableRecord, feishuConfigured } from "@/lib/feishu";
import { OPC_TABLE_ID } from "../tableId";

export const runtime = "nodejs";

// 来源场次映射（与 /api/compass/save 保持一致）
const SOURCE_MAP: Record<string, string> = {
  "1": "晚1·意义与方向",
  "2": "晚2·真机证据",
  "3": "晚3·方法+开售",
  ep1: "晚1·意义与方向",
  ep2: "晚2·真机证据",
  ep3: "晚3·方法+开售",
};

// 报告完成即匿名落表（克隆自 /api/compass/save 的做法）；留资时再补姓名/联系方式。
// 字段 schema 见 docs/opc-feishu-table.md。
export async function POST(req: Request) {
  let body: {
    identityLabel?: string;
    costLabel?: string;
    city?: string;
    fitScore?: number;
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
    成本类型: String(body.costLabel ?? "").slice(0, 30),
    推荐城市: String(body.city ?? "").slice(0, 30),
    适配度: String(body.fitScore ?? "").slice(0, 10),
    来源场次: SOURCE_MAP[body.ep || ""] || "OPC页直接进",
    答题摘要: String(body.answers ?? "").slice(0, 3000),
    报告: report,
    解锁: "未解锁",
    状态: "匿名测评",
  };

  if (!feishuConfigured) {
    // 沿用 compass：缺 FEISHU_APP_SECRET 时不报错，结果不写库但流程照常
    console.warn("[opc/save] FEISHU_APP_SECRET 未配置，结果未写入");
    return NextResponse.json({ ok: true, stored: false, recordId: "" });
  }
  try {
    const recordId = await createBitableRecord(fields, OPC_TABLE_ID);
    return NextResponse.json({ ok: true, stored: true, recordId });
  } catch (err) {
    console.error("[opc/save] 写入失败：", err);
    return NextResponse.json({ ok: true, stored: false, recordId: "" });
  }
}
