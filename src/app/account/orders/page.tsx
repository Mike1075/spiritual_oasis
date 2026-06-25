import { redirect } from "next/navigation";
import { getSessionProfile } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase";
import { yuanFromFen } from "@/lib/catalog";

export const dynamic = "force-dynamic";

const STATUS: Record<string, { label: string; cls: string }> = {
  pending: { label: "待支付", cls: "bg-white/10 text-white/60" },
  paid: { label: "已报名", cls: "bg-emerald-400/15 text-emerald-300" },
  expired: { label: "已过期", cls: "bg-white/10 text-white/40" },
  closed: { label: "已关闭", cls: "bg-white/10 text-white/40" },
  refunding: { label: "退款中", cls: "bg-amber-300/15 text-amber-300" },
  refunded: { label: "已退款", cls: "bg-red-500/15 text-red-300" },
};

type Row = {
  out_trade_no: string;
  status: string;
  amount_fen: number;
  paid_at: string | null;
  created_at: string;
  course_sessions: { name: string; starts_on: string | null; products: { title: string } | null } | null;
};

export default async function OrdersPage() {
  const session = await getSessionProfile();
  if (!session) redirect("/login?next=/account/orders");

  const db = getServiceClient();
  const { data } = await db
    .from("course_orders")
    .select("out_trade_no, status, amount_fen, paid_at, created_at, course_sessions(name, starts_on, products(title))")
    .eq("user_id", session.userId)
    .order("created_at", { ascending: false });
  const orders = (data ?? []) as unknown as Row[];

  return (
    <div className="mx-auto max-w-3xl px-6 py-28 text-white">
      <h1 className="text-3xl font-semibold">我的订单</h1>

      {orders.length === 0 ? (
        <p className="mt-4 text-white/60">你还没有订单。报名课程后，这里会显示你的报名与付款记录。</p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => {
            const st = STATUS[o.status] ?? { label: o.status, cls: "bg-white/10 text-white/50" };
            const title = o.course_sessions?.products?.title ?? "课程";
            const sessName = o.course_sessions?.name ?? "";
            const dateStr = (o.paid_at ?? o.created_at)?.slice(0, 10);
            return (
              <div key={o.out_trade_no} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-white">{title}</h3>
                    {sessName && <p className="mt-0.5 text-sm text-white/50">{sessName}</p>}
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-0.5 text-xs ${st.cls}`}>{st.label}</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-lg font-semibold text-amber-300">{yuanFromFen(o.amount_fen)}</span>
                  <span className="text-xs text-white/35">{dateStr} · 单号 {o.out_trade_no}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
