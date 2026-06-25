/**
 * 通联异步通知：验签 → 幂等置 paid / 释放名额。回调地址须公网 HTTPS、不带参数：
 *   https://www.spiritual-oasis.net/api/pay/notify
 * 安全：金额比对(防篡改)、按订单幂等(重复回调只处理一次)、验签不过直接拒。
 * 名额：下单时已 hold；付款成功保留；付款失败/退款释放；过期晚付补占。
 */
import { getServiceClient } from "@/lib/supabase";
import { parseNotify, NOTIFY_ACK } from "@/lib/pay/allinpay";

export const dynamic = "force-dynamic";

function ack() {
  return new Response(NOTIFY_ACK, { status: 200, headers: { "Content-Type": "text/plain" } });
}
function reject(msg: string) {
  return new Response(msg, { status: 400, headers: { "Content-Type": "text/plain" } });
}

export async function POST(request: Request) {
  const raw = await request.text();
  const params: Record<string, string> = {};
  if (raw.trim().startsWith("{")) {
    try { Object.assign(params, JSON.parse(raw)); } catch { /* */ }
  } else {
    for (const [k, v] of new URLSearchParams(raw)) params[k] = v;
  }

  const n = parseNotify(params);
  if (!n.valid) return reject("sign_invalid");

  const db = getServiceClient();

  // ===== 退款通知：释放名额(覆盖"通联后台直接退款") =====
  if (n.isRefund) {
    if (!n.success) return ack();
    type RO = { id: string; session_id: string; status: string };
    let ro: RO | null = null;
    if (n.srcTradeNo) {
      const { data } = await db.from("course_orders").select("id, session_id, status").eq("trade_no", n.srcTradeNo).maybeSingle<RO>();
      ro = data ?? null;
    }
    if (!ro && n.oldReqsn) {
      const { data } = await db.from("course_orders").select("id, session_id, status").eq("out_trade_no", n.oldReqsn).maybeSingle<RO>();
      ro = data ?? null;
    }
    if (!ro) return ack();
    const { data: upd } = await db
      .from("course_orders")
      .update({ status: "refunded", refund_trade_no: n.tradeNo ?? null, refunded_at: new Date().toISOString(), refund_amount_fen: n.amountFen ?? null, refund_raw: params })
      .eq("id", ro.id).in("status", ["paid", "refunding"]).select("id").maybeSingle();
    if (upd) await db.rpc("release_seat", { p_session: ro.session_id });
    return ack();
  }

  if (!n.outTradeNo) return reject("no_reqsn");

  const { data: order } = await db
    .from("course_orders")
    .select("id, session_id, amount_fen, status")
    .eq("out_trade_no", n.outTradeNo)
    .maybeSingle<{ id: string; session_id: string; amount_fen: number; status: string }>();
  if (!order) return reject("order_not_found");
  if (order.status === "paid") return ack(); // 幂等

  // 金额比对(防篡改)
  if (n.amountFen != null && n.amountFen !== order.amount_fen) {
    await db.from("course_orders").update({ raw_notify: { ...params, _amount_mismatch: true } }).eq("id", order.id);
    return reject("amount_mismatch");
  }

  if (!n.success) {
    // 付款失败：关单 + 释放名额(守卫：仅 pending→closed 一次)
    const { data: closed } = await db.from("course_orders").update({ status: "closed", raw_notify: params }).eq("id", order.id).eq("status", "pending").select("id").maybeSingle();
    if (closed) await db.rpc("release_seat", { p_session: order.session_id });
    return ack();
  }

  // 成功：pending 或 expired → paid（过期晚付也认款）
  const { data: paidRow } = await db
    .from("course_orders")
    .update({ status: "paid", trade_no: n.tradeNo ?? null, paid_at: new Date().toISOString(), raw_notify: params })
    .eq("id", order.id).in("status", ["pending", "expired"]).select("id").maybeSingle();
  if (!paidRow) return ack(); // 并发已置位

  // 过期单的名额此前已释放，补占一个；满则标记待人工(但仍认款)
  if (order.status === "expired") {
    const { data: rehold } = await db.rpc("hold_seat", { p_session: order.session_id });
    if (rehold !== true) {
      await db.from("course_orders").update({ raw_notify: { ...params, _oversell_manual: true } }).eq("id", order.id);
    }
  }
  return ack();
}
