import { NextResponse } from "next/server";
import {
  searchBitableRecords,
  listBitableRecords,
  updateBitableRecord,
  feishuConfigured,
  COMPASS_TABLE_ID,
} from "@/lib/feishu";
import {
  fieldText,
  beijingNow,
  beijingToday,
  isPlaceholderName,
  DEMO_DAILY_LIMIT,
} from "@/lib/demo";

export const runtime = "nodejs";
export const maxDuration = 60;

// 「10 年后」入口:手机号 + 称呼双因子找回罗盘测评记录
// 命中且已生成过 → 直接回缓存;命中未生成 → 占今日名额并放行;未命中 → 引导去 /compass
export async function POST(req: Request) {
  let body: { contact?: string; name?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "请求格式错误" }, { status: 400 });
  }
  const contact = String(body.contact ?? "").trim().slice(0, 60);
  const name = String(body.name ?? "").trim().slice(0, 40);
  if (contact.length < 4 || !name) {
    return NextResponse.json(
      { ok: false, error: "请填写手机号和称呼（与做罗盘测评时填的一致）" },
      { status: 400 }
    );
  }
  if (!feishuConfigured) {
    return NextResponse.json(
      { ok: false, error: "服务暂未配置，请稍后再试" },
      { status: 503 }
    );
  }
  try {
    const records = await searchBitableRecords(
      "手机/微信",
      contact,
      COMPASS_TABLE_ID
    );
    // 双因子:记录里留了真实称呼的必须称呼也对上;称呼为占位值的仅凭联系方式
    // (与 /api/compass/find 同口径——用户当时没填,无从校验)
    const matched = records.filter((r) => {
      const saved = fieldText(r.fields["姓名"]).trim();
      return isPlaceholderName(saved) || saved === name;
    });
    if (matched.length === 0) {
      return NextResponse.json({ ok: true, found: false });
    }

    // 每个手机号只生成 1 次:该手机号下任何一条已有 demo故事 就回缓存
    const cachedRec =
      matched.find((r) => fieldText(r.fields["demo故事"]).trim()) ||
      records.find((r) => fieldText(r.fields["demo故事"]).trim());
    if (cachedRec) {
      const savedName = fieldText(cachedRec.fields["姓名"]).trim();
      return NextResponse.json({
        ok: true,
        found: true,
        cached: true,
        id: cachedRec.recordId,
        name: isPlaceholderName(savedName) ? name : savedName,
        story: fieldText(cachedRec.fields["demo故事"]).trim(),
        imageUrl: fieldText(cachedRec.fields["demo图URL"]).trim()
          ? `/api/mas-life/demo/img/${cachedRec.recordId}`
          : null,
      });
    }

    // 优先取有完整报告的记录,生成素材更足
    const target =
      matched.find((r) => fieldText(r.fields["报告"]).length >= 200) ||
      matched[0];

    // 全站每日生成上限(按北京时间的"今天"计 demo生成时间)
    const rows = await listBitableRecords(COMPASS_TABLE_ID, ["demo生成时间"]);
    const today = beijingToday();
    const used = rows.filter((f) =>
      fieldText(f["demo生成时间"]).startsWith(today)
    ).length;
    if (used >= DEMO_DAILY_LIMIT) {
      return NextResponse.json({ ok: true, found: true, limited: true });
    }

    // 先占名额再生成;若生成中断,demo故事 仍为空,下次进来可重试(名额不退)
    await updateBitableRecord(
      target.recordId,
      { demo生成时间: beijingNow() },
      COMPASS_TABLE_ID
    );
    const savedName = fieldText(target.fields["姓名"]).trim();
    return NextResponse.json({
      ok: true,
      found: true,
      cached: false,
      id: target.recordId,
      name: isPlaceholderName(savedName) ? name : savedName,
    });
  } catch (err) {
    console.error("[mas-life/demo/find] 查询失败：", err);
    return NextResponse.json(
      { ok: false, error: "查询服务暂时不可用，请稍后再试" },
      { status: 502 }
    );
  }
}
