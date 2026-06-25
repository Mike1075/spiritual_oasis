/**
 * 下单(扫码 Native)：要求登录 → 服务端取场次价格 → 原子占名额(hold_seat) →
 * 建 course_orders(pending,30min持位) → 通联统一扫码下单 → 返二维码内容。
 * 金额只取 course_sessions，绝不信客户端。失败必释放名额。
 */
import { NextResponse } from "next/server";
import { getSessionProfile } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase";
import { allinpayConfigured, createScanOrder, randomStr, type PayMethod } from "@/lib/pay/allinpay";
import { releaseExpiredHolds } from "@/lib/pay/orders";

export const dynamic = "force-dynamic";

const METHODS: PayMethod[] = ["wxpay", "alipay", "unionpay"];

export async function POST(request: Request) {
  const session = await getSessionProfile();
  if (!session) return NextResponse.json({ ok: false, error: "请先登录" }, { status: 401 });

  let body: { session_id?: string; method?: string } = {};
  try { body = await request.json(); } catch { /* 空 body */ }
  if (!body.session_id) return NextResponse.json({ ok: false, error: "缺少场次" }, { status: 400 });
  const method = (METHODS.includes(body.method as PayMethod) ? body.method : "wxpay") as PayMethod;

  if (!allinpayConfigured()) {
    return NextResponse.json({ ok: false, error: "支付暂未开通", code: "not_configured" }, { status: 503 });
  }

  const db = getServiceClient();
  const { data: sess } = await db
    .from("course_sessions")
    .select("id, name, price_fen, status")
    .eq("id", body.session_id)
    .maybeSingle<{ id: string; name: string; price_fen: number; status: string }>();
  if (!sess || sess.status !== "open") {
    return NextResponse.json({ ok: false, error: "该场次暂不可报名" }, { status: 400 });
  }

  // 先释放过期持位，再原子占一个名额
  await releaseExpiredHolds(sess.id);
  const { data: held } = await db.rpc("hold_seat", { p_session: sess.id });
  if (held !== true) {
    return NextResponse.json({ ok: false, error: "名额已满", code: "sold_out" }, { status: 409 });
  }

  const outTradeNo = `SO${Date.now().toString(36)}${randomStr(8)}`.toUpperCase().slice(0, 32);
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

  const { error: insErr } = await db.from("course_orders").insert({
    out_trade_no: outTradeNo,
    user_id: session.userId,
    session_id: sess.id,
    amount_fen: sess.price_fen,
    original_amount_fen: sess.price_fen,
    status: "pending",
    expires_at: expiresAt,
    pay_method: method,
  });
  if (insErr) {
    await db.rpc("release_seat", { p_session: sess.id });
    return NextResponse.json({ ok: false, error: "建单失败" }, { status: 500 });
  }

  const order = await createScanOrder({
    outTradeNo,
    amountFen: sess.price_fen,
    body: `心灵家园报名·${sess.name}`.slice(0, 60),
    method,
  });

  if (!order.ok || !order.qrCode) {
    await db.from("course_orders").update({ status: "closed", raw_notify: { create_error: order.error ?? "no_qr" } }).eq("out_trade_no", outTradeNo);
    await db.rpc("release_seat", { p_session: sess.id });
    return NextResponse.json({ ok: false, error: order.error ?? "下单失败" }, { status: 502 });
  }

  await db.from("course_orders").update({ qr_code: order.qrCode, trade_no: order.tradeNo ?? null }).eq("out_trade_no", outTradeNo);

  return NextResponse.json({ ok: true, outTradeNo, qrCode: order.qrCode, amountFen: sess.price_fen });
}
