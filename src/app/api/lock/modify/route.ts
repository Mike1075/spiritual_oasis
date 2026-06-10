import { NextResponse } from "next/server";
import {
  updateBitableRecord,
  feishuConfigured,
  LOCK_APP_TOKEN,
  LOCK_TABLE_ID,
} from "@/lib/feishu";
import {
  ALL_SESSIONS,
  TEAM_SIZE,
  TEAM_CODE_RE,
  genTeamCode,
  maskName,
  getTeamMembers,
  cityFull,
  findLockRecord,
  type LockRecord,
} from "@/lib/lock";

export const runtime = "nodejs";

// 自助改单：凭"联系方式 + 付款单号"双因子找回记录后，可自助
//   个人锁位 ⇄ 拼团（开团 / 参团）、更改场次。
// 涉及他人的操作（所在团还有其他成员）一律拒绝并引导客服，避免动到队友。

type ModifyPayload = {
  contact?: string;
  payRef?: string;
  action?: "find" | "to-solo" | "to-team-create" | "to-team-join" | "change-session";
  teamCode?: string;
  session?: string;
};

async function summarize(rec: LockRecord) {
  let teamCount = 0;
  if (rec.teamCode) {
    try {
      teamCount = (await getTeamMembers(rec.teamCode)).length;
    } catch {
      teamCount = 1;
    }
  }
  return {
    name: maskName(rec.name),
    session: rec.session,
    identity: rec.identity,
    mode: rec.teamCode ? "team" : "solo",
    teamCode: rec.teamCode || undefined,
    teamCount: rec.teamCode ? teamCount : undefined,
    teamComplete: rec.teamCode ? teamCount >= TEAM_SIZE : undefined,
  };
}

// 所在团除自己外的其他成员数（>0 时不允许自助改动团相关状态）
async function otherMembers(rec: LockRecord): Promise<number> {
  if (!rec.teamCode) return 0;
  const members = await getTeamMembers(rec.teamCode);
  return members.filter((m) => m.contact !== rec.contact).length;
}

export async function POST(req: Request) {
  let body: ModifyPayload;
  try {
    body = (await req.json()) as ModifyPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "请求格式错误" },
      { status: 400 }
    );
  }

  const contact = (body.contact || "").trim().slice(0, 60);
  const payRef = (body.payRef || "").trim().slice(0, 60);
  const action = body.action || "find";

  if (!contact || !payRef) {
    return NextResponse.json(
      { ok: false, error: "请填写提交时用的联系方式和付款单号" },
      { status: 400 }
    );
  }
  if (!feishuConfigured) {
    return NextResponse.json(
      { ok: false, error: "系统暂时不可用，请直接联系群内客服" },
      { status: 503 }
    );
  }

  let rec: LockRecord | null;
  try {
    rec = await findLockRecord(contact, payRef);
  } catch (err) {
    console.error("[lock/modify] 查找失败：", err);
    return NextResponse.json(
      { ok: false, error: "查询失败，请稍后再试" },
      { status: 502 }
    );
  }
  if (!rec) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "没有找到匹配的锁位记录，请核对联系方式和付款单号是否与提交时一致；实在找不回就联系群内客服",
      },
      { status: 404 }
    );
  }

  try {
    if (action === "find") {
      return NextResponse.json({ ok: true, record: await summarize(rec) });
    }

    if (action === "to-team-create") {
      if (rec.teamCode && (await otherMembers(rec)) > 0) {
        return NextResponse.json(
          { ok: false, error: "你所在的团已有其他成员，调整请联系群内客服" },
          { status: 409 }
        );
      }
      if (rec.identity !== "纯新人" && rec.identity !== "待确认") {
        return NextResponse.json(
          { ok: false, error: "拼团仅限新朋友身份，你的身份折扣请联系客服核算" },
          { status: 403 }
        );
      }
      // 自己独占的旧团码直接复用（幂等），否则发新码
      const code = rec.teamCode || genTeamCode();
      await updateBitableRecord(
        rec.recordId,
        {
          团码: code,
          身份: "纯新人",
          备注: `${rec.note ? rec.note + " | " : ""}改单:转开团`,
        },
        LOCK_TABLE_ID,
        LOCK_APP_TOKEN
      );
      return NextResponse.json({
        ok: true,
        teamCode: code,
        teamCount: 1,
        teamComplete: false,
      });
    }

    if (action === "to-team-join") {
      const code = (body.teamCode || "").trim().toUpperCase();
      if (!TEAM_CODE_RE.test(code)) {
        return NextResponse.json(
          { ok: false, error: "团码无效，请检查朋友发你的链接或团码" },
          { status: 400 }
        );
      }
      if (code === rec.teamCode) {
        return NextResponse.json(
          { ok: false, error: "你已经在这个团里了" },
          { status: 409 }
        );
      }
      if (rec.teamCode && (await otherMembers(rec)) > 0) {
        return NextResponse.json(
          { ok: false, error: "你所在的团已有其他成员，换团请联系群内客服" },
          { status: 409 }
        );
      }
      if (rec.identity !== "纯新人" && rec.identity !== "待确认") {
        return NextResponse.json(
          { ok: false, error: "拼团仅限新朋友身份，你的身份折扣请联系客服核算" },
          { status: 403 }
        );
      }
      const members = await getTeamMembers(code);
      if (members.length === 0) {
        return NextResponse.json(
          { ok: false, error: "团码无效或该团已取消" },
          { status: 404 }
        );
      }
      if (members.length >= TEAM_SIZE) {
        return NextResponse.json(
          { ok: false, error: "这个团已满 3 人" },
          { status: 409 }
        );
      }
      if (members.some((m) => m.contact === contact)) {
        return NextResponse.json(
          { ok: false, error: "这个联系方式已在团里" },
          { status: 409 }
        );
      }
      await updateBitableRecord(
        rec.recordId,
        {
          团码: code,
          身份: "纯新人",
          备注: `${rec.note ? rec.note + " | " : ""}改单:转参团${code}`,
        },
        LOCK_TABLE_ID,
        LOCK_APP_TOKEN
      );
      const count = members.length + 1;
      return NextResponse.json({
        ok: true,
        teamCode: code,
        teamCount: count,
        teamComplete: count >= TEAM_SIZE,
      });
    }

    if (action === "to-solo") {
      if (!rec.teamCode) {
        return NextResponse.json(
          { ok: false, error: "你的锁位本来就是个人锁位" },
          { status: 409 }
        );
      }
      if ((await otherMembers(rec)) > 0) {
        return NextResponse.json(
          { ok: false, error: "你所在的团已有其他成员，退团请联系群内客服" },
          { status: 409 }
        );
      }
      await updateBitableRecord(
        rec.recordId,
        {
          团码: "",
          备注: `${rec.note ? rec.note + " | " : ""}改单:转个人锁位`,
        },
        LOCK_TABLE_ID,
        LOCK_APP_TOKEN
      );
      return NextResponse.json({ ok: true, teamCode: undefined });
    }

    if (action === "change-session") {
      const session = (body.session || "").trim();
      if (!ALL_SESSIONS.has(session)) {
        return NextResponse.json(
          { ok: false, error: "请选择有效的场次" },
          { status: 400 }
        );
      }
      if (session === rec.session) {
        return NextResponse.json(
          { ok: false, error: "你的场次本来就是" + session },
          { status: 409 }
        );
      }
      try {
        if (await cityFull(session)) {
          return NextResponse.json(
            { ok: false, error: `${session}名额已满，可选线上或联系客服候补` },
            { status: 409 }
          );
        }
      } catch {
        // 余位校验失败不阻断，人工核验兜底
      }
      await updateBitableRecord(
        rec.recordId,
        {
          场次: session,
          备注: `${rec.note ? rec.note + " | " : ""}改单:${rec.session}→${session}`,
        },
        LOCK_TABLE_ID,
        LOCK_APP_TOKEN
      );
      return NextResponse.json({ ok: true, session });
    }

    return NextResponse.json(
      { ok: false, error: "不支持的操作" },
      { status: 400 }
    );
  } catch (err) {
    console.error("[lock/modify] 修改失败：", err);
    return NextResponse.json(
      { ok: false, error: "修改失败，请稍后重试或联系群内客服" },
      { status: 502 }
    );
  }
}
