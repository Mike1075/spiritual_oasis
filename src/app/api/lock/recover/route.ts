import { NextResponse } from "next/server";
import { feishuConfigured } from "@/lib/feishu";
import {
  TEAM_SIZE,
  maskName,
  getTeamMembers,
  findByContactName,
} from "@/lib/lock";

export const runtime = "nodejs";

// 找回拼团链接/二维码：凭"手机号 + 姓名/微信昵称"双因子找回记录。
// 面向忘记保存拼团链接、没存拼团海报的学员（开过团的 / 已拼团成功的都可用）。
// 返回拼团状态 + 团码（前端凭团码用 ShareKit 重建链接与带二维码海报）。
type RecoverPayload = { contact?: string; name?: string };

export async function POST(req: Request) {
  let body: RecoverPayload;
  try {
    body = (await req.json()) as RecoverPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "请求格式错误" },
      { status: 400 }
    );
  }

  const contact = (body.contact || "").trim().slice(0, 60);
  const name = (body.name || "").trim().slice(0, 40);
  if (!contact || !name) {
    return NextResponse.json(
      { ok: false, error: "请填写手机号和姓名/微信昵称" },
      { status: 400 }
    );
  }
  if (!feishuConfigured) {
    return NextResponse.json(
      { ok: false, error: "系统暂时不可用，请直接联系群内客服找回" },
      { status: 503 }
    );
  }

  try {
    const rec = await findByContactName(contact, name);
    if (!rec) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "没找到匹配的记录。请确认手机号与姓名/昵称和当时锁位填写的一致；若当时用微信号（非手机号）锁位、或未填姓名，请联系群内客服帮你找回。",
        },
        { status: 404 }
      );
    }

    // 团进度（姓名打码，保护其他队友隐私）
    let teamCount = 0;
    let complete = false;
    let members: string[] = [];
    if (rec.teamCode) {
      try {
        const ms = await getTeamMembers(rec.teamCode);
        teamCount = ms.length;
        complete = ms.length >= TEAM_SIZE;
        members = ms.map((m) => maskName(m.name));
      } catch {
        /* 取团成员失败不阻断：至少把团码/链接还给用户 */
      }
    }

    return NextResponse.json({
      ok: true,
      name: maskName(rec.name),
      status: rec.status || "待核验",
      session: rec.session,
      hasTeam: !!rec.teamCode,
      teamCode: rec.teamCode || undefined,
      teamCount: rec.teamCode ? teamCount : undefined,
      teamSize: TEAM_SIZE,
      teamComplete: rec.teamCode ? complete : undefined,
      members: rec.teamCode ? members : undefined,
    });
  } catch (err) {
    console.error("[lock] 找回拼团链接失败：", err);
    return NextResponse.json(
      { ok: false, error: "查询失败，请稍后再试或联系群内客服" },
      { status: 502 }
    );
  }
}
