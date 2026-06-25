import { getAnonClient } from "@/lib/supabase";

export type SessionInfo = {
  sessionId: string;
  productKey: string;
  productTitle: string;
  name: string;
  startsOn: string | null;
  priceFen: number;
  capacity: number;
  seatsTaken: number;
  remaining: number;
  status: string;
};

/** 分 → 人民币字符串（整数无小数；990→"¥9.9"；299900→"¥2999"） */
export function yuanFromFen(fen: number): string {
  const yuan = fen / 100;
  if (Number.isInteger(yuan)) return `¥${yuan}`;
  // Use toFixed(2) then strip trailing zeros (matches CourseCard.tsx pattern)
  return `¥${yuan.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}`;
}

/**
 * 读取指定 product_key 的产品及第一个 course_session。
 * 使用 anon 客户端 —— products & course_sessions 已配置公开只读 RLS。
 * v1: 单场次，取 starts_on 最早的一个。
 */
export async function getSessionByProductKey(
  productKey: string,
): Promise<SessionInfo | null> {
  const supabase = getAnonClient();

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      id,
      product_key,
      title,
      course_sessions (
        id,
        name,
        starts_on,
        price_fen,
        capacity,
        seats_taken,
        status
      )
    `,
    )
    .eq("product_key", productKey)
    .eq("is_active", true)
    .limit(1)
    .single();

  if (error || !data) return null;

  // PostgREST returns nested array; take first session ordered by starts_on
  const sessions = data.course_sessions as Array<{
    id: string;
    name: string;
    starts_on: string | null;
    price_fen: number;
    capacity: number;
    seats_taken: number;
    status: string;
  }>;

  if (!sessions || sessions.length === 0) return null;

  // Sort ascending by starts_on, nulls last
  const sorted = [...sessions].sort((a, b) => {
    if (!a.starts_on) return 1;
    if (!b.starts_on) return -1;
    return a.starts_on.localeCompare(b.starts_on);
  });

  const s = sorted[0];
  return {
    sessionId: s.id,
    productKey: data.product_key,
    productTitle: data.title,
    name: s.name,
    startsOn: s.starts_on,
    priceFen: s.price_fen,
    capacity: s.capacity,
    seatsTaken: s.seats_taken,
    remaining: Math.max(0, s.capacity - s.seats_taken),
    status: s.status,
  };
}
