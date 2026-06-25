/**
 * 退款：① 后台带 x-admin-token(=PAY_ADMIN_TOKEN) 可退任意已支付订单；
 *       ② 用户可退自己订单，限支付后 24h 内(与免手续费窗口一致)。
 * 流程：校验 → 通联退款 → 成功则订单转 refunded/refunding + 释放名额(done 立即；pending 等退款回调)。
 */
import { NextResponse } from "next/server";
import { getSessionProfile } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase";
import { createRefund, randomStr } from "@/lib/pay/allinpay";

export const dynamic = "force-dynamic";

const REFUND_WINDOW_HOURS = 24;

export async function POST(request: Request) {
  let body: { out_trade_no?: string; amountFen?: number } = {};
  try { body = await request.json(); } catch { /* */ }
  if (!body.out_trade_no) return NextResponse.json({ ok: false, error: "缺少订单号" }, { status: 400 });

  const adminToken = request.headers.get("x-admin-token");
  const isAdmin = !!process.env.PAY_ADMIN_TOKEN && adminToken === process.env.PAY_ADMIN_TOKEN;

  const db = getServiceClient();
  type Order = { id: string; out_trade_no: string; user_id: string; session_id: string; amount_fen: number; status: string; paid_at: string | null };
  const { data: order } = await db
    .from("course_orders")
    .select("id, out_trade_no, user_id, session_id, amount_fen, status, paid_at")
    .eq("out_trade_no", body.out_trade_no)
    .maybeSingle<Order>();
  if (!order) return NextResponse.json({ ok: false, error: "订单不存在" }, { status: 404 });

  if (!isAdmin) {
    const session = await getSessionProfile();
    if (!session || session.userId !== order.user_id) {
      return NextResponse.json({ ok: false, error: "无权退款" }, { status: 403 });
    }
    const paidMs = order.paid_at ? Date.parse(order.paid_at) : 0;
    if (!paidMs || Date.now() - paidMs > REFUND_WINDOW_HOURS * 3600_000) {
      return NextResponse.json({ ok: false, error: `仅支付后 ${REFUND_WINDOW_HOURS} 小时内可自助退款，请联系客服` }, { status: 403 });
    }
  }

  if (order.status !== "paid") {
    return NextResponse.json({ ok: false, error: `订单状态 ${order.status}，不可退款` }, { status: 409 });
  }

  const amountFen = body.amountFen && body.amountFen > 0 ? Math.min(body.amountFen, order.amount_fen) : order.amount_fen;
  const refundReqsn = `RF${Date.now().toString(36)}${randomStr(8)}`.toUpperCase().slice(0, 32);

  const r = await createRefund({ refundReqsn, amountFen, oldReqsn: order.out_trade_no });
  if (!r.ok) {
    await db.from("course_orders").update({ refund_raw: { error: r.error, status: r.status } }).eq("id", order.id);
    return NextResponse.json({ ok: false, error: r.error ?? "退款失败" }, { status: 502 });
  }

  const nextStatus = r.status === "done" ? "refunded" : "refunding";
  const { data: upd } = await db
    .from("course_orders")
    .update({
      status: nextStatus,
      refund_trade_no: r.refundTrxid ?? null,
      refund_amount_fen: amountFen,
      refunded_at: r.status === "done" ? new Date().toISOString() : null,
      refund_raw: r.raw as object,
    })
    .eq("id", order.id).eq("status", "paid").select("id").maybeSingle();

  // done 且抢到状态转换 → 立即释放名额（pending 退款由退款回调释放）
  if (upd && r.status === "done") {
    await db.rpc("release_seat", { p_session: order.session_id });
  }

  return NextResponse.json({ ok: true, status: nextStatus, amountFen, refundReqsn });
}
