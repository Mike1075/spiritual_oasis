import { NextResponse } from "next/server";
import {
  createBitableRecord,
  listBitableRecords,
  searchBitableRecords,
  feishuConfigured,
  LOCK_TABLE_ID,
} from "@/lib/feishu";

export const runtime = "nodejs";

// 每城线下锁位上限（服务端静默校验，页面不展示报名人数）；线上不限
const CITY_CAP = 50;
const OFFLINE_CITIES = ["深圳线下", "北京线下", "上海线下"] as const;
const ALL_SESSIONS = new Set<string>([...OFFLINE_CITIES, "线上"]);
const IDENTITY_SET = new Set([
  "纯新人",
  "学生",
  "金卡会员",
  "老学员",
  "金卡+老学员",
]);

const TEAM_SIZE = 3;
// 团码字符集去掉 0/O/1/I/L 等易混淆字符；P 前缀代表"拼"
const CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function genTeamCode(): string {
  let s = "P";
  for (let i = 0; i < 6; i++) {
    s += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  }
  return s;
}

// 文本字段在搜索接口里以 segment 数组返回，单选字段是字符串
function fieldText(v: unknown): string {
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

function maskName(name: string): string {
  if (!name) return "新同学";
  return name.length <= 1 ? `${name}**` : `${name[0]}**`;
}

type TeamMember = { name: string; contact: string; verified: boolean };

// 取一个团的有效成员（已退款不算）
async function getTeamMembers(code: string): Promise<TeamMember[]> {
  const records = await searchBitableRecords("团码", code, LOCK_TABLE_ID);
  return records
    .filter((r) => fieldText(r.fields["状态"]) !== "已退款")
    .map((r) => ({
      name: fieldText(r.fields["姓名"]),
      contact: fieldText(r.fields["手机/微信"]),
      verified: fieldText(r.fields["状态"]) === "已核验",
    }));
}

async function cityFull(session: string): Promise<boolean> {
  if (session === "线上") return false;
  const records = await listBitableRecords(LOCK_TABLE_ID, ["场次", "状态"]);
  const taken = records.filter(
    (r) => r["场次"] === session && r["状态"] !== "已退款"
  ).length;
  return taken >= CITY_CAP;
}

// GET /api/lock?team=PXXXXXX — 查团进度（分享落地页用，姓名打码）
export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("team")?.trim().toUpperCase();
  if (!code) return NextResponse.json({ ok: true });
  if (!/^P[A-Z2-9]{6}$/.test(code) || !feishuConfigured) {
    return NextResponse.json({ ok: false, error: "团码无效" }, { status: 404 });
  }
  try {
    const members = await getTeamMembers(code);
    if (members.length === 0) {
      return NextResponse.json(
        { ok: false, error: "团码无效或该团已取消" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      ok: true,
      team: {
        code,
        count: members.length,
        size: TEAM_SIZE,
        complete: members.length >= TEAM_SIZE,
        leader: maskName(members[0]?.name ?? ""),
        members: members.map((m) => maskName(m.name)),
      },
    });
  } catch (err) {
    console.error("[lock] 查团失败：", err);
    return NextResponse.json(
      { ok: false, error: "查询失败，请稍后再试" },
      { status: 502 }
    );
  }
}

type LockPayload = {
  mode?: "solo" | "team-create" | "team-join";
  teamCode?: string;
  name?: string;
  contact?: string;
  session?: string;
  identity?: string;
  payRef?: string;
  note?: string;
};

export async function POST(req: Request) {
  let body: LockPayload;
  try {
    body = (await req.json()) as LockPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "请求格式错误" },
      { status: 400 }
    );
  }

  const mode = body.mode || "solo";
  const name = (body.name || "").trim().slice(0, 40);
  const contact = (body.contact || "").trim().slice(0, 60);
  const session = (body.session || "").trim();
  const payRef = (body.payRef || "").trim().slice(0, 60);

  if (!name)
    return NextResponse.json({ ok: false, error: "请填写姓名" }, { status: 400 });
  if (!contact)
    return NextResponse.json(
      { ok: false, error: "请留下手机号或微信号" },
      { status: 400 }
    );
  if (!ALL_SESSIONS.has(session))
    return NextResponse.json(
      { ok: false, error: "请选择报名场次" },
      { status: 400 }
    );
  if (!payRef)
    return NextResponse.json(
      { ok: false, error: "请填写付款单号或转账备注（用于核验到账）" },
      { status: 400 }
    );

  if (!feishuConfigured) {
    return NextResponse.json(
      { ok: false, error: "系统暂时不可用，请直接联系群内客服锁位" },
      { status: 503 }
    );
  }

  // 拼团仅限新人；个人锁位允许填身份（金卡/老学员正价报名走小鹅通，锁位仍可用）
  const identity =
    mode === "solo"
      ? IDENTITY_SET.has(body.identity || "")
        ? (body.identity as string)
        : "待确认"
      : "纯新人";

  let teamCode = "";
  let noteTag = "";

  if (mode === "team-join") {
    teamCode = (body.teamCode || "").trim().toUpperCase();
    if (!/^P[A-Z2-9]{6}$/.test(teamCode)) {
      return NextResponse.json(
        { ok: false, error: "团码无效，请检查分享链接" },
        { status: 400 }
      );
    }
    try {
      const members = await getTeamMembers(teamCode);
      if (members.length === 0) {
        return NextResponse.json(
          { ok: false, error: "团码无效或该团已取消，可自己开一个新团" },
          { status: 404 }
        );
      }
      if (members.length >= TEAM_SIZE) {
        return NextResponse.json(
          { ok: false, error: "这个团已满 3 人，你可以自己开一个新团" },
          { status: 409 }
        );
      }
      if (members.some((m) => m.contact === contact)) {
        return NextResponse.json(
          { ok: false, error: "这个联系方式已在团里，无需重复提交" },
          { status: 409 }
        );
      }
      // 并发同时加入同一个团的竞态由客服核验时兜底（第 4 人退款或转开新团）
    } catch (err) {
      console.error("[lock] 参团校验失败：", err);
      return NextResponse.json(
        { ok: false, error: "校验失败，请稍后重试或联系群内客服" },
        { status: 502 }
      );
    }
    noteTag = "拼团·参团";
  } else if (mode === "team-create") {
    teamCode = genTeamCode();
    noteTag = "拼团·开团";
  }

  // 线下城市静默校验余位（页面不展示数字，但满员要拦住）
  try {
    if (await cityFull(session)) {
      return NextResponse.json(
        { ok: false, error: `${session}名额已满，可改报线上或联系客服候补` },
        { status: 409 }
      );
    }
  } catch {
    // 余位校验失败不阻断提交，人工核验兜底
  }

  const fields = {
    姓名: name,
    "手机/微信": contact,
    场次: session,
    身份: identity,
    付款单号: payRef,
    付款金额: 618,
    状态: "待核验",
    团码: teamCode,
    备注: [noteTag, (body.note || "").slice(0, 200)].filter(Boolean).join(" | "),
  };

  // 锁位涉及真实付款，写入失败必须如实报错，不能像留资那样静默吞掉
  try {
    const recordId = await createBitableRecord(fields, LOCK_TABLE_ID);
    let teamCount = 0;
    if (teamCode) {
      try {
        teamCount = (await getTeamMembers(teamCode)).length;
      } catch {
        teamCount = mode === "team-create" ? 1 : 0;
      }
    }
    return NextResponse.json({
      ok: true,
      recordId,
      teamCode: teamCode || undefined,
      teamCount: teamCode ? teamCount : undefined,
      teamComplete: teamCode ? teamCount >= TEAM_SIZE : undefined,
    });
  } catch (err) {
    console.error("[lock] 写入飞书失败：", err, fields);
    return NextResponse.json(
      {
        ok: false,
        error: "提交失败，请截图付款记录并直接联系群内客服登记锁位",
      },
      { status: 502 }
    );
  }
}
