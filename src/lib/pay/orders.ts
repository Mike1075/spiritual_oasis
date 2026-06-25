import { getServiceClient } from "@/lib/supabase";

/**
 * 释放某场次下已过期的 pending 持位（下单超时未付）。
 * 守卫：pending→expired 只转一次，转成功才 release_seat，避免重复释放。
 * 在每次新下单前调用，腾出被废弃购物车占住的名额。
 */
export async function releaseExpiredHolds(sessionId: string): Promise<void> {
  const db = getServiceClient();
  const { data: stale } = await db
    .from("course_orders")
    .select("id")
    .eq("session_id", sessionId)
    .eq("status", "pending")
    .lt("expires_at", new Date().toISOString());
  for (const o of (stale ?? []) as { id: string }[]) {
    const { data: won } = await db
      .from("course_orders")
      .update({ status: "expired" })
      .eq("id", o.id)
      .eq("status", "pending")
      .select("id")
      .maybeSingle();
    if (won) await db.rpc("release_seat", { p_session: sessionId });
  }
}
