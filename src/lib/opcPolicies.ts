// OPC 城市政策库 —— 服务端读取层（/opc/policies 页 + /api/opc/policies 嵌入共用）
// 数据源:飞书多维表 OPC_POLICY_TABLE_ID(与线索表同 base)。
// 红绿灯口径:🟢已核实正常展示、🟡待核实加徽章展示、🔴传闻一律过滤不展示。

import { OPC_POLICY_TABLE_ID, listBitableRecords } from "@/lib/feishu";

export type OpcPolicy = {
  city: string;
  tier: string;
  name: string;
  type: string;
  strength: string;
  subject: string;
  audience: string;
  validity: string;
  status: string; // 🟢已核实 / 🟡待核实 / ''(社区)
  sourceOrg: string;
  sourceUrl: string;
  quote: string;
  batch: string;
  isCommunity: boolean;
};

const FIELDS = [
  "城市", "档位", "政策/资源名称", "类型", "力度金额", "主体要求",
  "适用人群", "有效期", "核实状态", "出处机构", "出处链接", "原文引用", "批次",
];

// 飞书文本字段可能返回 string 或 [{text}] 富文本段数组
function fieldText(v: unknown): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) {
    return v
      .map((seg) =>
        typeof seg === "object" && seg && "text" in seg
          ? String((seg as { text: unknown }).text)
          : typeof seg === "string"
            ? seg
            : ""
      )
      .join("");
  }
  if (v && typeof v === "object" && "text" in v) {
    return String((v as { text: unknown }).text);
  }
  return v == null ? "" : String(v);
}

// 归一化城市名用于模糊匹配(上海临港 ≈ 上海(临港新片区))
export function normCity(s: string): string {
  return (s || "").replace(/[\s()（）·\-、,，。]/g, "").replace(/[市区省]/g, "");
}

export function cityMatches(recordCity: string, target: string): boolean {
  const a = normCity(recordCity);
  const b = normCity(target);
  if (!a || !b) return false;
  return a === b || a.includes(b) || b.includes(a);
}

let cache: { at: number; data: OpcPolicy[] } | null = null;
const TTL = 30 * 60 * 1000; // 30 分钟内存缓存,避免反复打飞书

// 拉全表 → 归一化 → 过滤掉 🔴 传闻。失败返回空数组(页面优雅降级)。
export async function getOpcPolicies(): Promise<OpcPolicy[]> {
  if (cache && Date.now() - cache.at < TTL) return cache.data;
  let rows: Record<string, unknown>[] = [];
  try {
    rows = await listBitableRecords(OPC_POLICY_TABLE_ID, FIELDS);
  } catch {
    return cache?.data ?? [];
  }
  const items: OpcPolicy[] = rows
    .map((f) => {
      const type = fieldText(f["类型"]);
      const status = fieldText(f["核实状态"]);
      return {
        city: fieldText(f["城市"]),
        tier: fieldText(f["档位"]),
        name: fieldText(f["政策/资源名称"]),
        type,
        strength: fieldText(f["力度金额"]),
        subject: fieldText(f["主体要求"]),
        audience: fieldText(f["适用人群"]),
        validity: fieldText(f["有效期"]),
        status,
        sourceOrg: fieldText(f["出处机构"]),
        sourceUrl: fieldText(f["出处链接"]),
        quote: fieldText(f["原文引用"]),
        batch: fieldText(f["批次"]),
        isCommunity: type.includes("社区"),
      };
    })
    .filter((p) => p.name && !p.status.includes("🔴")); // 过滤空名 + 传闻
  cache = { at: Date.now(), data: items };
  return items;
}
