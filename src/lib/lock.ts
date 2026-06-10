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
