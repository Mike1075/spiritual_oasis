import { redirect } from "next/navigation";
import { getSessionProfile } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const session = await getSessionProfile();
  if (!session) redirect("/login?next=/account/orders");

  // M4 接上 course_orders 后在此列出该用户订单；现为占位
  return (
    <div className="mx-auto max-w-3xl px-6 py-28 text-white">
      <h1 className="text-3xl font-semibold">我的订单</h1>
      <p className="mt-4 text-white/60">
        你还没有订单。课程上线购买后，这里会显示你的报名与付款记录。
      </p>
    </div>
  );
}
