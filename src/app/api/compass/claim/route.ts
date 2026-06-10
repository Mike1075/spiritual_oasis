import { NextResponse } from "next/server";
import {
  createBitableRecord,
  updateBitableRecord,
  feishuConfigured,
  COMPASS_TABLE_ID,
} from "@/lib/feishu";

export const runtime = "nodejs";

// 留资解锁：补写姓名/联系方式到已有记录，返回分享链接。
// save 阶段写入失败的（recordId 为空），在这里整单重写一次兜底。
export async function POST(req: Request) {
  let body: {
    recordId?: string;
    name?: string;
    contact?: string;
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

  const name = String(body.name ?? "").trim().slice(0, 40);
  const contact = String(body.contact ?? "").trim().slice(0, 60);
  if (!contact) {
    return NextResponse.json(
      { ok: false, error: "请留下手机号或微信号" },
      { status: 400 }
    );
  }

  if (!feishuConfigured) {
    console.warn("[compass/claim] FEISHU_APP_SECRET 未配置：", { name, contact });
    return NextResponse.json({ ok: true, stored: false, shareId: "" });
  }

  const recordId = String(body.recordId ?? "").trim();
  const leadFields: Record<string, string> = {
    姓名: name || "（未填）",
    "手机/微信": contact,
    解锁: "已解锁",
    状态: "新线索",
  };

  try {
    if (recordId) {
      await updateBitableRecord(recordId, leadFields, COMPASS_TABLE_ID);
      return NextResponse.json({ ok: true, stored: true, shareId: recordId });
    }
    // save 阶段失败的兜底：整单重写
    const newId = await createBitableRecord(
      {
        ...leadFields,
        身份: String(body.identityLabel ?? "").slice(0, 20),
        测评原型: String(body.archetypeLabel ?? "").slice(0, 60),
        意向方向: String(body.direction ?? "").slice(0, 80),
        来源场次: "罗盘页直接进",
        答题摘要: String(body.answers ?? "").slice(0, 3000),
        报告: String(body.report ?? "").slice(0, 20000),
      },
      COMPASS_TABLE_ID
    );
    return NextResponse.json({ ok: true, stored: true, shareId: newId });
  } catch (err) {
    console.error("[compass/claim] 写入失败：", err, { name, contact });
    // 线索不能丢：至少留日志；对用户仍返回 ok 但无分享链接
    return NextResponse.json({ ok: true, stored: false, shareId: "" });
  }
}
