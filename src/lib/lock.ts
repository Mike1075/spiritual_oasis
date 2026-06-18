// 锁位/拼团共享逻辑（/api/lock 与 /api/lock/modify 共用）

import {
  listBitableRecords,
  searchBitableRecords,
  LOCK_APP_TOKEN,
  LOCK_TABLE_ID,
} from "./feishu";

export const CITY_CAP = 50;
export const OFFLINE_CITIES = ["深圳线下", "北京线下", "上海线下"] as const;
export const ALL_SESSIONS = new Set<string>([...OFFLINE_CITIES, "线上"]);
export const IDENTITY_SET = new Set([
  "纯新人",
  "学生",
  "金卡会员",
  "老学员",
  "金卡+老学员",
]);
export const TEAM_SIZE = 3;
export const TEAM_CODE_RE = /^P[A-Z2-9]{6}$/;

// 拼团价：早鸟结束后新团按原价 6980 的 8 折；6/18 前开的"老团"锁定当初早鸟 8 折价。
export const TEAM_PRICE_NEW = 5584;
export const TEAM_BALANCE_NEW = 4966; // 5584 - 618
export const TEAM_PRICE_LEGACY = 3984;
export const TEAM_BALANCE_LEGACY = 3366; // 3984 - 618
// 老团分界：2026-06-18 24:00 CST（= 6/19 00:00 +08:00 = 6/18 16:00 UTC）。
// 此刻之前开的团 = 老团，锁定 3984，尾款须 6/30 前补齐；此后开的团 = 新团 5584。
export const LEGACY_TEAM_CUTOFF_MS = Date.UTC(2026, 5, 18, 16, 0, 0);
export const LEGACY_TEAM_BALANCE_DEADLINE = "6 月 30 日";

// 团是否为老团：以开团人（最早一条记录）的创建时间判断。
// 取不到创建时间时回落为"新团"（显示新价，最终以客服核验为准，不会少收）。
export function isLegacyTeam(members: TeamMember[]): boolean {
  const opened = Math.min(
    ...members.map((m) => (m.createdTime > 0 ? m.createdTime : Infinity))
  );
  return Number.isFinite(opened) && opened < LEGACY_TEAM_CUTOFF_MS;
}

export function teamPricing(legacy: boolean): {
  legacy: boolean;
  price: number;
  balance: number;
} {
  return legacy
    ? { legacy: true, price: TEAM_PRICE_LEGACY, balance: TEAM_BALANCE_LEGACY }
    : { legacy: false, price: TEAM_PRICE_NEW, balance: TEAM_BALANCE_NEW };
}

// 团码字符集去掉 0/O/1/I/L 等易混淆字符；P 前缀代表"拼"
const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function genTeamCode(): string {
  let s = "P";
  for (let i = 0; i < 6; i++) {
    s += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return s;
}

// 文本字段在搜索接口里以 segment 数组返回，单选字段是字符串
export function fieldText(v: unknown): string {
  if (typeof v === "string") return v;
  if (Array.isArray(v)) {
    return v
      .map((seg) =>
        typeof seg === "object" && seg && "text" in seg
          ? String((seg as { text: unknown }).text)
          : ""
      )
      .join("");
  }
  return "";
}

export function maskName(name: string): string {
  if (!name) return "新同学";
  return name.length <= 1 ? `${name}**` : `${name[0]}**`;
}

export type TeamMember = {
  recordId: string;
  name: string;
  contact: string;
  verified: boolean;
  createdTime: number; // 记录创建时间（毫秒）；用于判断老团/新团
};

// 取一个团的有效成员（已退款不算）
export async function getTeamMembers(code: string): Promise<TeamMember[]> {
  const records = await searchBitableRecords(
    "团码",
    code,
    LOCK_TABLE_ID,
    20,
    LOCK_APP_TOKEN
  );
  return records
    .filter((r) => fieldText(r.fields["状态"]) !== "已退款")
    .map((r) => ({
      recordId: r.recordId,
      name: fieldText(r.fields["姓名"]),
      contact: fieldText(r.fields["手机/微信"]),
      verified: fieldText(r.fields["状态"]) === "已核验",
      createdTime: r.createdTime,
    }));
}

export async function cityFull(session: string): Promise<boolean> {
  if (session === "线上") return false;
  const records = await listBitableRecords(
    LOCK_TABLE_ID,
    ["场次", "状态"],
    LOCK_APP_TOKEN
  );
  const taken = records.filter(
    (r) => r["场次"] === session && r["状态"] !== "已退款"
  ).length;
  return taken >= CITY_CAP;
}

export type LockRecord = {
  recordId: string;
  name: string;
  contact: string;
  session: string;
  identity: string;
  teamCode: string;
  note: string;
};

// 该联系方式名下的有效锁位记录数（已退款不算）。
// 一个联系方式只允许一条有效记录：防止已锁位/已成团的人重复提交、重复开团。
export async function countActiveRecords(contact: string): Promise<number> {
  const records = await searchBitableRecords(
    "手机/微信",
    contact,
    LOCK_TABLE_ID,
    20,
    LOCK_APP_TOKEN
  );
  return records.filter((r) => fieldText(r.fields["状态"]) !== "已退款").length;
}

// 凭"联系方式 + 付款单号"双因子找回锁位记录（无登录体系下的轻量身份验证，
// 与 compass 找回报告同一思路）
export async function findLockRecord(
  contact: string,
  payRef: string
): Promise<LockRecord | null> {
  const records = await searchBitableRecords(
    "手机/微信",
    contact,
    LOCK_TABLE_ID,
    20,
    LOCK_APP_TOKEN
  );
  const match = records.find(
    (r) =>
      fieldText(r.fields["付款单号"]) === payRef &&
      fieldText(r.fields["状态"]) !== "已退款"
  );
  if (!match) return null;
  return {
    recordId: match.recordId,
    name: fieldText(match.fields["姓名"]),
    contact,
    session: fieldText(match.fields["场次"]),
    identity: fieldText(match.fields["身份"]),
    teamCode: fieldText(match.fields["团码"]),
    note: fieldText(match.fields["备注"]),
  };
}

function norm(s: string): string {
  return (s || "").replace(/\s+/g, "").toLowerCase();
}

export type RecoverResult = {
  recordId: string;
  name: string;
  contact: string;
  session: string;
  status: string;
  teamCode: string;
};

// 凭"手机号 + 姓名/微信昵称"双因子找回记录（早期锁位要求填姓名）。
// 用于学员找回拼团链接与二维码：忘记保存链接/海报的人，无需付款单号也能自助找回。
// 两个因子都要对上才算命中（手机号匹配 + 姓名/昵称匹配），避免只凭姓名撞名而暴露他人记录。
// 同时按"手机/微信"和"姓名"两路搜索再合并，兼容当时填在哪个字段。
export async function findByContactName(
  contact: string,
  name: string
): Promise<RecoverResult | null> {
  const c = norm(contact);
  const n = norm(name);
  if (!c || !n) return null;

  const seen = new Map<
    string,
    { recordId: string; fields: Record<string, unknown> }
  >();
  for (const [field, val] of [
    ["手机/微信", contact],
    ["姓名", name],
  ] as const) {
    try {
      const recs = await searchBitableRecords(
        field,
        val,
        LOCK_TABLE_ID,
        20,
        LOCK_APP_TOKEN
      );
      for (const r of recs) seen.set(r.recordId, r);
    } catch {
      /* 单路搜索失败不阻断另一路 */
    }
  }

  const match = [...seen.values()].find((r) => {
    if (fieldText(r.fields["状态"]) === "已退款") return false;
    const fc = norm(fieldText(r.fields["手机/微信"]));
    const fn = norm(fieldText(r.fields["姓名"]));
    const contactHit = !!fc && (fc.includes(c) || c.includes(fc));
    const nameHit = !!fn && (fn === n || fn.includes(n) || n.includes(fn));
    return contactHit && nameHit;
  });
  if (!match) return null;
  return {
    recordId: match.recordId,
    name: fieldText(match.fields["姓名"]),
    contact: fieldText(match.fields["手机/微信"]),
    session: fieldText(match.fields["场次"]),
    status: fieldText(match.fields["状态"]),
    teamCode: fieldText(match.fields["团码"]),
  };
}
