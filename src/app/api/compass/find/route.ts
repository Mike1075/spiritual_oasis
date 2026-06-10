import { NextResponse } from "next/server";
import {
  searchBitableRecords,
  feishuConfigured,
  COMPASS_TABLE_ID,
} from "@/lib/feishu";

export const runtime = "nodejs";

function fieldText(v: unknown): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) {
    return v
      .map((seg) =>
        typeof seg === "object" && seg && "text" in seg
          ? String((seg as { text: unknown }).text)
          : ""
      )
      .join("");
  }
  return "";
}

// 凭留资时的联系方式找回报告。
// 隐私权衡：联系方式 + 称呼双因子——记录里留了真实称呼的，必须称呼也对上；
// 称呼为（未填）的记录仅凭联系方式返回（用户自己当时没填，无从校验）。
export async function POST(req: Request) {
  let body: { contact?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "请求格式错误" }, { status: 400 });
  }
  const contact = String(body.contact ?? "").trim().slice(0, 60);
  const name = String(body.name ?? "").trim().slice(0, 40);
  if (contact.length < 4) {
    return NextResponse.json(
      { ok: false, error: "请输入当时留下的手机号或微信号" },
      { status: 400 }
    );
  }
  if (!feishuConfigured) {
    return NextResponse.json({ ok: true, reports: [] });
  }
  try {
    const records = await searchBitableRecords(
      "手机/微信",
      contact,
      COMPASS_TABLE_ID
    );
    const reports = records
      .filter((r) => fieldText(r.fields["解锁"]) === "已解锁")
      .filter((r) => {
        const savedName = fieldText(r.fields["姓名"]);
        if (!savedName || savedName === "（未填）") return true;
        return name !== "" && savedName === name;
      })
      .slice(0, 5)
      .map((r) => ({
        id: r.recordId,
        identity: fieldText(r.fields["身份"]),
        archetype: fieldText(r.fields["测评原型"]),
        direction: fieldText(r.fields["意向方向"]),
      }));
    return NextResponse.json({ ok: true, reports });
  } catch (err) {
    console.error("[compass/find] 查询失败：", err);
    return NextResponse.json(
      { ok: false, error: "查询服务暂时不可用，请稍后再试" },
      { status: 502 }
    );
  }
}
