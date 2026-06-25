/**
 * 查单(前端扫码后轮询)：返回订单状态。只查本人订单。
 */
import { NextResponse } from "next/server";
import { getSessionProfile } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await getSessionProfile();
  if (!session) return NextResponse.json({ ok: false, error: "未登录" }, { status: 401 });

  const outTradeNo = new URL(request.url).searchParams.get("out_trade_no");
  if (!outTradeNo) return NextResponse.json({ ok: false, error: "缺少订单号" }, { status: 400 });

  const db = getServiceClient();
  const { data: order } = await db
    .from("course_orders")
    .select("status, amount_fen, paid_at")
    .eq("out_trade_no", outTradeNo)
    .eq("user_id", session.userId)
    .maybeSingle<{ status: string; amount_fen: number; paid_at: string | null }>();

  if (!order) return NextResponse.json({ ok: false, error: "订单不存在" }, { status: 404 });

  return NextResponse.json({
    ok: true,
    status: order.status, // pending/paid/closed/expired/refunding/refunded
    paid: order.status === "paid",
    amountFen: order.amount_fen,
    paidAt: order.paid_at,
  });
}
