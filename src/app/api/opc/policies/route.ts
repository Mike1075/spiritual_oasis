import { NextResponse } from "next/server";
import { getOpcPolicies, cityMatches } from "@/lib/opcPolicies";

export const runtime = "nodejs";
export const revalidate = 1800; // 30 分钟

// GET /api/opc/policies?city=苏州  → 该城市的政策+社区(已过滤🔴)
// GET /api/opc/policies            → 全量
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = (searchParams.get("city") || "").trim();
  const all = await getOpcPolicies();
  const items = city ? all.filter((p) => cityMatches(p.city, city)) : all;
  // 政策按 🟢 优先排序,社区殿后
  const order = (s: string) => (s.includes("🟢") ? 0 : s.includes("🟡") ? 1 : 2);
  items.sort((a, b) => {
    if (a.isCommunity !== b.isCommunity) return a.isCommunity ? 1 : -1;
    return order(a.status) - order(b.status);
  });
  return NextResponse.json({ ok: true, count: items.length, items });
}
