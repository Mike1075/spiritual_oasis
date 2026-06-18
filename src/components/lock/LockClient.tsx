"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  BadgeCheck,
  CalendarClock,
  Check,
  Copy,
  HelpCircle,
  Loader2,
  Lock,
  MapPin,
  MessageCircle,
  QrCode,
  ShieldCheck,
  Ticket,
  Users,
  X,
} from "lucide-react";
import ShareKit from "./ShareKit";

const SESSIONS = [
  { key: "深圳线下", label: "深圳 · 线下" },
  { key: "北京线下", label: "北京 · 线下" },
  { key: "上海线下", label: "上海 · 线下" },
  { key: "线上", label: "线上 · 全球可报" },
];

const IDENTITIES = ["纯新人", "学生", "金卡会员", "老学员", "金卡+老学员"];

const SOLO_BENEFITS = [
  {
    icon: Ticket,
    title: "618 元全额抵学费",
    desc: "锁位金一分不浪费，报名时直接抵扣尾款。",
  },
  {
    icon: Lock,
    title: "锁定你的席位",
    desc: "学费 6980，线上线下同价。618 元先占位，报名时全额抵扣。",
  },
  {
    icon: ShieldCheck,
    title: "开课前可全额退",
    desc: "改主意了？开课前申请，锁位金 618 全额退还，零风险。",
  },
  {
    icon: MapPin,
    title: "线下席位有限",
    desc: "深圳 / 北京 / 上海每城仅 50 席，先到先得；线上不限名额。",
  },
];

const TEAM_BENEFITS = [
  {
    icon: Users,
    title: "3 人成团 · 拼团价 5584",
    desc: "新朋友专享 8 折（原价 6980）。618 元入团，成团后尾款 4966。",
  },
  {
    icon: Lock,
    title: "入团即锁价",
    desc: "只要进了团，拼团价 5584 就锁定了——比单独报名省 1396。",
  },
  {
    icon: Copy,
    title: "你也能发起分享",
    desc: "付 618 入团后你会拿到专属链接，发朋友圈或好友，谁都能接力补位。",
  },
  {
    icon: ShieldCheck,
    title: "未成团不吃亏",
    desc: "开课前仍未满 3 人：618 全额退，或转当期你可享的最优个人价格，二选一。",
  },
];

// 分享链接固定用正式域名：vercel.app 在国内无法直接访问，
// 不能依赖 location.origin（用户可能从预览域名进来）
const SITE_URL = "https://www.spiritual-oasis.net";

type JoinTeam = {
  code: string;
  count: number;
  size: number;
  complete: boolean;
  leader: string;
  members: string[];
  // 老团（6/18 前开）锁定当初拼团价 3984，尾款须 6/30 前补齐；新团按 6980 八折 5584
  legacy?: boolean;
  price?: number;
  balance?: number;
};

// 拼团价兜底（接口未返回时按新团显示，最终以客服核验为准）
const TEAM_PRICE_NEW = 5584;
const TEAM_BALANCE_NEW = 4966;
const LEGACY_BALANCE_DEADLINE = "6 月 30 日";

type ModifySummary = {
  name: string;
  session: string;
  identity: string;
  mode: "solo" | "team";
  teamCode?: string;
  teamCount?: number;
  teamComplete?: boolean;
};

// 付款单号怎么找——"?"帮助弹窗（微信/支付宝/云闪付 + 找不到的兜底）
function PayRefHelp() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        aria-label="如何找到付款单号"
        onClick={() => setOpen(true)}
        className="text-white/40 transition hover:text-fuchsia-300"
      >
        <HelpCircle className="h-5 w-5" />
      </button>
      {/* 用 Portal 挂到 body：触发按钮的祖先带 transform，会让 fixed 失效（弹窗被压成窄条的 bug） */}
      {open &&
        createPortal(
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-white/15 bg-zinc-900 p-6 text-left sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                付款单号在哪里找？
              </h3>
              <button
                type="button"
                aria-label="关闭"
                onClick={() => setOpen(false)}
                className="text-white/50 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-1 text-xs text-white/50">
              只需要填单号的<strong className="text-emerald-300">最后 5 位数字</strong>
              ，用于客服核对到账。
            </p>

            <div className="mt-4 space-y-4 text-sm leading-relaxed text-white/75">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="font-bold text-emerald-200">
                  微信支付（最常用）
                </div>
                <ol className="mt-1.5 list-decimal space-y-1 pl-4">
                  <li>
                    微信 →「我」→「服务」→「钱包」→「账单」
                    （或直接点开"微信支付"发给你的支付凭证消息）
                  </li>
                  <li>找到 <strong>-618.00（深圳市心灵家园）</strong>那笔，点进去</li>
                  <li>
                    看「<strong className="text-emerald-300">交易单号</strong>」
                    ——一长串数字
                  </li>
                  <li>
                    填<strong>最后 5 位</strong>。例：单号是
                    4500…83<strong className="text-emerald-300">714084</strong>
                    ，就填 <strong className="text-emerald-300">14084</strong>
                  </li>
                </ol>
                <p className="mt-2 text-xs text-amber-300/90">
                  ⚠️ 是数字单号，不是「商户全称」那一行的公司名；
                  万一填成了「商户单号」的后 5 位也没关系，客服同样能查到。
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="font-bold text-emerald-200">支付宝</div>
                <ol className="mt-1.5 list-decimal space-y-1 pl-4">
                  <li>支付宝 → 右下角「我的」→「账单」</li>
                  <li>找到 618 那笔（深圳市心灵家园 / 收钱码收款），点进去</li>
                  <li>
                    看「订单号」；没有的话点底部「更多」，看
                    「<strong className="text-emerald-300">支付宝交易号</strong>」
                  </li>
                  <li>填最后 5 位</li>
                </ol>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="font-bold text-emerald-200">云闪付</div>
                <p className="mt-1.5">
                  「我的」→「交易记录」→ 点开 618 那笔 → 订单号后 5 位。
                </p>
              </div>

              <div className="rounded-xl border border-fuchsia-400/30 bg-fuchsia-500/10 p-4">
                <div className="font-bold text-fuchsia-200">实在找不到？</div>
                <p className="mt-1.5">
                  在单号栏填「付款日期+时间」，例如 6 月 10 日 16:04 付的，就填{" "}
                  <code className="rounded bg-white/10 px-1.5 py-0.5 text-emerald-200">
                    0610-1604
                  </code>
                  ，并保存好付款截图——客服按金额和时间一样能对上账。
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 w-full rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-6 py-3 font-bold text-white"
            >
              知道了，去填写
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

// 从粘贴的链接或裸团码里抽出团码
function parseTeamCode(input: string): string {
  const m = input.trim().toUpperCase().match(/P[A-Z2-9]{6}/);
  return m ? m[0] : "";
}

// 自助改单：凭联系方式+付款单号找回记录，自助切换 个人锁位⇄拼团、改场次
function ModifyPanel() {
  const [contact, setContact] = useState("");
  const [payRef, setPayRef] = useState("");
  const [rec, setRec] = useState<ModifySummary | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [joinInput, setJoinInput] = useState("");
  const [newSession, setNewSession] = useState("");
  const [done, setDone] = useState("");
  const [shareCode, setShareCode] = useState("");
  const [copied, setCopied] = useState(false);

  async function call(
    action: string,
    extra: Record<string, string> = {}
  ): Promise<{
    ok: boolean;
    error?: string;
    record?: ModifySummary;
    teamCode?: string;
    teamCount?: number;
    session?: string;
  } | null> {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/lock/modify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, payRef, action, ...extra }),
      });
      const j = await res.json();
      setBusy(false);
      return j;
    } catch {
      setBusy(false);
      setError("网络异常，请重试");
      return null;
    }
  }

  async function find() {
    if (!contact.trim() || !payRef.trim())
      return setError("请填写提交时用的联系方式和付款单号");
    const j = await call("find");
    if (!j) return;
    if (j.ok && j.record) {
      setRec(j.record);
      setDone("");
      setShareCode("");
    } else setError(j.error || "查询失败");
  }

  async function act(action: string, extra: Record<string, string> = {}) {
    const j = await call(action, extra);
    if (!j) return;
    if (j.ok) {
      if (j.teamCode) {
        setShareCode(j.teamCode);
        setDone(
          action === "to-team-join"
            ? `已加入团 ${j.teamCode}（当前 ${j.teamCount}/3 人）`
            : `已转为 3 人拼团（拼团价 5584），团码 ${j.teamCode}`
        );
      } else if (action === "to-solo") {
        setShareCode("");
        setDone("已转为个人锁位（学费 6980，618 全额抵扣）");
      } else if (action === "change-session") {
        setDone(`场次已改为 ${j.session}`);
      }
      const f = await call("find");
      if (f?.ok && f.record) setRec(f.record);
    } else setError(j.error || "操作失败");
  }

  const shareUrl = shareCode ? `${SITE_URL}/lock?t=${shareCode}` : "";

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(
        `我在拼「人生方向设计」3 人团，拼团价 5584（原价 6980 打 8 折），618 元锁位入团：${shareUrl}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* 旧浏览器降级：手动长按复制 */
    }
  }

  const inputCls =
    "rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-fuchsia-400";
  const btnCls =
    "rounded-xl border border-fuchsia-400/50 px-4 py-2.5 text-sm font-semibold text-fuchsia-200 transition hover:bg-fuchsia-500/15 disabled:opacity-40";

  return (
    <div className="mt-3 rounded-2xl border border-white/15 bg-white/[0.04] p-5">
      <div className="text-sm font-bold text-white/85">
        修改我的锁位（选错了类型 / 场次？这里自助改）
      </div>
      <p className="mt-1 text-xs text-white/50">
        填提交时用的联系方式和付款单号，找回后即可修改。涉及已有队友的团需联系群内客服。
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="手机号或微信号"
          className={inputCls}
        />
        <div className="relative">
          <input
            value={payRef}
            onChange={(e) => setPayRef(e.target.value)}
            placeholder="付款单号后5位"
            className={inputCls + " w-full pr-11"}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            <PayRefHelp />
          </span>
        </div>
        <button type="button" onClick={find} disabled={busy} className={btnCls}>
          {busy && !rec ? "查找中…" : "找回我的锁位"}
        </button>
      </div>

      {rec && (
        <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4">
          <div className="text-sm">
            当前：
            <strong className="text-emerald-200">
              {rec.mode === "team"
                ? `3 人拼团（${rec.teamCount}/3 · 团码 ${rec.teamCode}）`
                : "个人锁位（学费 6980）"}
            </strong>
            <span className="mx-2 text-white/30">|</span>
            场次：<strong className="text-emerald-200">{rec.session}</strong>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {rec.mode === "solo" && (
              <button
                type="button"
                onClick={() => act("to-team-create")}
                disabled={busy}
                className={btnCls}
              >
                转为 3 人拼团（开团 · 5584）
              </button>
            )}
            {rec.mode === "team" && (
              <button
                type="button"
                onClick={() => act("to-solo")}
                disabled={busy}
                className={btnCls}
              >
                转为个人锁位（6980）
              </button>
            )}
            <select
              value={newSession}
              onChange={(e) => setNewSession(e.target.value)}
              className={inputCls + " py-2.5"}
            >
              <option value="" className="bg-black">
                改场次…
              </option>
              {SESSIONS.filter((s) => s.key !== rec.session).map((s) => (
                <option key={s.key} value={s.key} className="bg-black">
                  {s.label}
                </option>
              ))}
            </select>
            {newSession && (
              <button
                type="button"
                onClick={() => act("change-session", { session: newSession })}
                disabled={busy}
                className={btnCls}
              >
                确认改场次
              </button>
            )}
          </div>

          {rec.mode === "solo" && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <input
                value={joinInput}
                onChange={(e) => setJoinInput(e.target.value)}
                placeholder="或粘贴朋友的拼团链接 / 团码"
                className={inputCls + " min-w-56 flex-1"}
              />
              <button
                type="button"
                onClick={() => {
                  const code = parseTeamCode(joinInput);
                  if (!code) return setError("没识别出团码，请检查链接");
                  act("to-team-join", { teamCode: code });
                }}
                disabled={busy}
                className={btnCls}
              >
                加入朋友的团
              </button>
            </div>
          )}
        </div>
      )}

      {done && (
        <p className="mt-3 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-200">
          ✅ {done}
        </p>
      )}
      {shareCode && (
        <div className="mt-2 flex items-center gap-2">
          <code className="min-w-0 flex-1 truncate rounded-xl bg-white/10 px-3 py-2.5 text-xs text-emerald-200">
            {shareUrl}
          </code>
          <button
            type="button"
            onClick={copyShare}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-2.5 text-sm font-bold"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" /> 已复制
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" /> 复制邀请
              </>
            )}
          </button>
        </div>
      )}
      {error && (
        <p className="mt-3 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

type RecoverInfo = {
  name: string;
  status: string;
  session: string;
  hasTeam: boolean;
  teamCode?: string;
  teamCount?: number;
  teamSize?: number;
  teamComplete?: boolean;
  members?: string[];
};

// 找回拼团链接/二维码：凭"手机号 + 姓名/微信昵称"找回（开过团或已拼团成功、但忘存链接/海报的学员）。
// 命中后展示拼团状态 + 团进度，并复用 ShareKit 重建专属链接与带二维码的海报。
function RecoverPanel() {
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [info, setInfo] = useState<RecoverInfo | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function find() {
    if (!contact.trim() || !name.trim())
      return setError("请填写手机号和姓名/微信昵称");
    setBusy(true);
    setError("");
    setInfo(null);
    try {
      const res = await fetch("/api/lock/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, name }),
      });
      const j = await res.json();
      setBusy(false);
      if (j.ok) setInfo(j as RecoverInfo);
      else setError(j.error || "没找到匹配的记录");
    } catch {
      setBusy(false);
      setError("网络异常，请重试");
    }
  }

  const link =
    info?.hasTeam && info.teamCode ? `${SITE_URL}/lock?t=${info.teamCode}` : "";

  async function copyLink() {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* 旧浏览器降级：手动长按复制 */
    }
  }

  const inputCls =
    "rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-fuchsia-400";
  const btnCls =
    "rounded-xl border border-fuchsia-400/50 px-4 py-2.5 text-sm font-semibold text-fuchsia-200 transition hover:bg-fuchsia-500/15 disabled:opacity-40";

  return (
    <div className="mt-3 rounded-2xl border border-white/15 bg-white/[0.04] p-5">
      <div className="text-sm font-bold text-white/85">
        找回我的拼团链接 / 二维码
      </div>
      <p className="mt-1 text-xs text-white/50">
        开过团或已拼团成功，但忘了保存链接、没存海报？填当时锁位用的
        <b className="text-white/70">手机号 + 姓名 / 微信昵称</b>（早期要求填姓名）即可找回。
      </p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="手机号"
          inputMode="tel"
          className={inputCls}
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="姓名 / 微信昵称"
          className={inputCls}
        />
        <button type="button" onClick={find} disabled={busy} className={btnCls}>
          {busy ? "查找中…" : "找回拼团链接"}
        </button>
      </div>

      {error && (
        <p className="mt-3 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
          {error}
        </p>
      )}

      {info && (
        <div className="mt-4 rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/5 p-4">
          <div className="text-sm font-semibold text-fuchsia-100">
            找到你的记录啦，{info.name} 👋
          </div>
          <div className="mt-1 text-xs text-white/65">
            状态：{info.status}
            {info.session ? ` · ${info.session}` : ""}
          </div>

          {info.hasTeam && info.teamCode ? (
            <>
              <div className="mt-3 text-xs text-white/70">
                团码 <b className="text-fuchsia-200">{info.teamCode}</b> ·{" "}
                {info.teamCount}/{info.teamSize} 人
                {info.teamComplete ? " · 已成团 🎉" : "（还差人，可继续邀请）"}
              </div>
              {info.members && info.members.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {info.members.map((m, i) => (
                    <span
                      key={i}
                      className="rounded-lg bg-fuchsia-500/25 px-2.5 py-1 text-xs text-white/80"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}

              {/* 拼团链接（快速复制） */}
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 p-2.5">
                <span className="flex-1 break-all text-xs text-fuchsia-300">
                  {link}
                </span>
                <button
                  type="button"
                  onClick={copyLink}
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-fuchsia-500/30 px-2.5 py-1 text-xs font-semibold text-fuchsia-50 hover:bg-fuchsia-500/45"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> 已复制
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" /> 复制链接
                    </>
                  )}
                </button>
              </div>

              {/* 复用 ShareKit：朋友圈文案 + 8 张带专属二维码的海报（点生成后长按保存） */}
              <ShareKit teamCode={info.teamCode} />
            </>
          ) : (
            <p className="mt-3 text-xs text-white/65">
              你当前是<b className="text-white/80">个人锁位</b>，没有拼团链接。如果想转成
              3 人拼团（拼团价更低）来开团，请用上方“自助修改”切换为拼团；遇到问题联系群内客服。
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function LockClient() {
  const [mode, setMode] = useState<"solo" | "team">("solo");
  const [joinTeam, setJoinTeam] = useState<JoinTeam | null>(null);
  const [joinTeamError, setJoinTeamError] = useState("");

  const [session, setSession] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [identity, setIdentity] = useState("纯新人");
  const [payRef, setPayRef] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState("");
  const [qrMissing, setQrMissing] = useState(false);
  const [paypalMissing, setPaypalMissing] = useState(false);
  const [groupQrMissing, setGroupQrMissing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bannerCopied, setBannerCopied] = useState(false);
  const [showModify, setShowModify] = useState(false);
  const [showRecover, setShowRecover] = useState(false);
  const [result, setResult] = useState<{
    teamCode?: string;
    teamCount?: number;
    teamComplete?: boolean;
    teamLegacy?: boolean;
    teamPrice?: number;
    teamBalance?: number;
  }>({});

  // 带 ?t=团码 进来 = 拼团分享落地：拉团进度并直接进入拼团模式
  useEffect(() => {
    const code = new URLSearchParams(window.location.search)
      .get("t")
      ?.trim()
      .toUpperCase();
    if (!code) return;
    setMode("team");
    fetch(`/api/lock?team=${encodeURIComponent(code)}`)
      .then((r) => r.json())
      .then((j) => {
        if (j?.ok && j.team) setJoinTeam(j.team as JoinTeam);
        else setJoinTeamError(j?.error || "团码无效");
      })
      .catch(() => setJoinTeamError("团信息加载失败，可直接开新团"));
  }, []);

  const benefits = mode === "team" ? TEAM_BENEFITS : SOLO_BENEFITS;
  const shareUrl = result.teamCode ? `${SITE_URL}/lock?t=${result.teamCode}` : "";

  // 横幅一键复制：朋友点开分享链接后，接力转发同一个团（带开团人名字+进度+链接）
  async function copyBannerShare() {
    if (!joinTeam) return;
    const link = `${SITE_URL}/lock?t=${joinTeam.code}`;
    const remain = joinTeam.size - joinTeam.count;
    const price = joinTeam.price ?? TEAM_PRICE_NEW;
    const priceNote = joinTeam.legacy
      ? `拼团价 ${price}（开团时锁定价，尾款 ${LEGACY_BALANCE_DEADLINE}前补齐）`
      : `拼团价 ${price}（原价 6980 打 8 折）`;
    const text =
      `${joinTeam.leader} 邀请你一起拼「人生方向设计」3 人团\n` +
      `${priceNote}· 当前 ${joinTeam.count}/${joinTeam.size} 人，还差 ${remain} 人成团。点击下方链接即可加入拼团。\n` +
      link;
    try {
      await navigator.clipboard.writeText(text);
      setBannerCopied(true);
      setTimeout(() => setBannerCopied(false), 2000);
    } catch {
      setJoinTeamError("复制失败，请手动长按选择文字复制");
    }
  }

  async function copyShare() {
    const price = result.teamPrice ?? TEAM_PRICE_NEW;
    const priceNote = result.teamLegacy
      ? `拼团价 ${price}（开团时锁定价，尾款 ${LEGACY_BALANCE_DEADLINE}前补齐）`
      : `拼团价 ${price}（原价 6980 打 8 折）`;
    try {
      await navigator.clipboard.writeText(
        `我在拼「人生方向设计」3 人团，${priceNote}，618 元锁位入团：${shareUrl}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* 旧浏览器降级：用户手动长按复制下方链接 */
    }
  }

  async function submit() {
    setError("");
    if (!session) return setError("请先选择报名场次");
    if (!name.trim()) return setError("请填写微信名");
    if (!contact.trim()) return setError("请填写手机号或微信号");
    if (!payRef.trim())
      return setError("请填写付款单号或转账备注（用于核验到账）");
    setStatus("submitting");
    try {
      const body = {
        mode:
          mode === "solo"
            ? "solo"
            : joinTeam && !joinTeam.complete
              ? "team-join"
              : "team-create",
        teamCode: joinTeam?.code,
        name,
        contact,
        session,
        identity: mode === "solo" ? identity : "纯新人",
        payRef,
        note,
      };
      const res = await fetch("/api/lock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = (await res.json()) as {
        ok: boolean;
        error?: string;
        teamCode?: string;
        teamCount?: number;
        teamComplete?: boolean;
        teamLegacy?: boolean;
        teamPrice?: number;
        teamBalance?: number;
      };
      if (j.ok) {
        setResult({
          teamCode: j.teamCode,
          teamCount: j.teamCount,
          teamComplete: j.teamComplete,
          teamLegacy: j.teamLegacy,
          teamPrice: j.teamPrice,
          teamBalance: j.teamBalance,
        });
        setStatus("done");
      } else {
        setStatus("idle");
        setError(j.error || "提交失败，请联系群内客服");
      }
    } catch {
      setStatus("idle");
      setError("网络异常，请重试；或截图付款记录直接联系群内客服登记");
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
        {/* 来自分享链接：开团人邀请横幅（置顶醒目，社交裂变钩子） */}
        {joinTeam && !joinTeam.complete && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-fuchsia-400/50 bg-gradient-to-r from-purple-500/25 to-fuchsia-500/20 p-4 shadow-lg shadow-fuchsia-500/10">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/30 text-fuchsia-100">
              <Users className="h-5 w-5" />
            </div>
            <div className="text-sm leading-relaxed">
              <div className="font-bold text-fuchsia-100">
                {joinTeam.leader} 邀请你一起拼「人生方向设计」3 人团
              </div>
              <div className="mt-0.5 text-white/70">
                拼团价{" "}
                <strong className="text-emerald-300">
                  {joinTeam.price ?? TEAM_PRICE_NEW}
                </strong>
                {joinTeam.legacy
                  ? "（开团时锁定价）"
                  : "（原价 6980 打 8 折）"}
                · 当前 {joinTeam.count}/{joinTeam.size} 人，还差{" "}
                {joinTeam.size - joinTeam.count} 人成团
                {joinTeam.legacy && (
                  <span className="mt-0.5 block text-amber-300">
                    老团福利：锁定当初拼团价，成团后尾款请于{" "}
                    {LEGACY_BALANCE_DEADLINE}前补齐。
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={copyBannerShare}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-fuchsia-500/30 px-3 py-1.5 text-xs font-semibold text-fuchsia-50 transition hover:bg-fuchsia-500/45"
              >
                {bannerCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> 已复制邀请文案
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> 复制分享链接
                  </>
                )}
              </button>
            </div>
          </div>
        )}
        {/* 头部 */}
        <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-fuchsia-300">
          <span className="h-px w-8 bg-gradient-to-r from-purple-400 to-fuchsia-400" />
          3 人拼团 · 锁位通道
        </div>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
            锁位通道 · 锁住你的席位
          </span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          「人生方向设计」28 天课程 · 深圳 / 北京 / 上海线下 + 线上全球同价。
          用 <strong className="text-emerald-300">618 元</strong>
          锁住席位，全额抵学费；3 人拼团再享 8 折。
        </p>

        {/* 企微群 · 公转私主入口 */}
        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
          {groupQrMissing ? (
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-dashed border-white/25 text-white/40">
              <QrCode className="h-6 w-6" />
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src="/images/wecom-group.jpg"
              alt="扫码加入意向群"
              className="h-24 w-24 shrink-0 rounded-lg bg-white object-contain"
              onError={() => setGroupQrMissing(true)}
            />
          )}
          <div className="text-sm leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-emerald-200">
              <MessageCircle className="h-4 w-4" />
              先进群，再锁位
            </div>
            <p className="mt-1 text-white/70">
              扫码进意向群：领 <strong>AI 定位测评</strong>、直接问老师、
              找拼团队友。锁位过程有任何问题，群里客服秒回。
            </p>
          </div>
        </div>

        {/* 模式切换 */}
        <div className="mt-8 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/5 p-1.5">
          <button
            type="button"
            onClick={() => setMode("solo")}
            className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
              mode === "solo"
                ? "bg-gradient-to-r from-purple-500 to-fuchsia-500"
                : "text-white/60 hover:text-white"
            }`}
          >
            个人锁位 · 学费 6980
          </button>
          <button
            type="button"
            onClick={() => setMode("team")}
            className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
              mode === "team"
                ? "bg-gradient-to-r from-purple-500 to-fuchsia-500"
                : "text-white/60 hover:text-white"
            }`}
          >
            3 人拼团 · 新人价 5584
          </button>
        </div>

        {/* 自助改单入口 */}
        <button
          type="button"
          onClick={() => setShowModify((v) => !v)}
          className="mt-3 text-xs text-white/50 underline underline-offset-4 hover:text-white/80"
        >
          已提交过但选错了？点这里自助修改（个人锁位 ⇄ 拼团 / 改场次）
        </button>
        {showModify && <ModifyPanel />}

        {/* 找回拼团链接/二维码入口 */}
        <button
          type="button"
          onClick={() => setShowRecover((v) => !v)}
          className="mt-2 block text-xs text-white/50 underline underline-offset-4 hover:text-white/80"
        >
          忘了保存拼团链接 / 没存拼团海报？点这里凭手机号+姓名找回
        </button>
        {showRecover && <RecoverPanel />}

        {/* 拼团说明 / 来自分享链接的团进度 */}
        {mode === "team" && (
          <div className="mt-4 space-y-3">
            {joinTeam && !joinTeam.complete && (
              <div className="rounded-2xl border border-fuchsia-400/40 bg-fuchsia-500/15 p-4">
                <div className="flex items-center gap-2 font-bold text-fuchsia-200">
                  <Users className="h-4 w-4" />
                  你正在加入 {joinTeam.leader} 的 3 人团
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {Array.from({ length: joinTeam.size }).map((_, i) => (
                    <span
                      key={i}
                      className={`flex h-9 flex-1 items-center justify-center rounded-lg text-xs font-semibold ${
                        i < joinTeam.count
                          ? "bg-fuchsia-500/40 text-white"
                          : "border border-dashed border-white/25 text-white/40"
                      }`}
                    >
                      {i < joinTeam.count ? joinTeam.members[i] : "虚位以待"}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-xs text-white/60">
                  已有 {joinTeam.count}/{joinTeam.size} 人，你入团后
                  {joinTeam.count + 1 >= joinTeam.size
                    ? "即成团！"
                    : `还差 ${joinTeam.size - joinTeam.count - 1} 人成团。`}
                </p>
              </div>
            )}
            {joinTeam?.complete && (
              <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-200">
                这个团已满 3 人啦。没关系——你可以直接开一个新团，
                同样锁定拼团价 5584。
              </div>
            )}
            {joinTeamError && (
              <div className="rounded-2xl border border-amber-400/40 bg-amber-500/10 p-4 text-sm text-amber-200">
                {joinTeamError}——你可以直接开一个新团，锁定拼团价 5584。
              </div>
            )}
            <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-white/55">
              拼团仅限<strong className="text-white/80">新朋友</strong>。
              金卡会员、老学员在小鹅通报名时
              <strong className="text-white/80">自动显示专属折扣价</strong>
              （更优），无需拼团；学生折扣请进群找客服核验。
            </p>
          </div>
        )}

        {/* 权益 */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center gap-2 font-semibold">
                <b.icon className="h-4 w-4 text-fuchsia-300" />
                {b.title}
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {status === "done" ? (
          /* 成功态 */
          <div className="mt-10 rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-6 sm:p-8">
            <div className="text-center">
              <BadgeCheck className="mx-auto h-12 w-12 text-emerald-300" />
              <h2 className="mt-4 text-2xl font-bold text-emerald-200">
                {result.teamCode
                  ? result.teamComplete
                    ? "恭喜，3 人团已拼成！"
                    : "入团成功，把团拼满！"
                  : "锁位申请已提交"}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/75">
                客服将在 <strong>24 小时内</strong>核验到账并与你确认
                （{session}）。请<strong>保存好付款凭证截图</strong>。
              </p>
              {result.teamCode && result.teamComplete && (
                <p className="mx-auto mt-3 max-w-md rounded-xl border border-emerald-400/30 bg-black/30 p-3 text-sm leading-relaxed text-white/75">
                  <strong className="text-emerald-200">接下来：</strong>
                  客服核验三位的 618 到账后会逐一联系你们，发放专属报名通道——
                  <strong>
                    {result.teamLegacy ? "请于 " + LEGACY_BALANCE_DEADLINE + "前补尾款 " : "开课前补尾款 "}
                    {result.teamBalance ?? TEAM_BALANCE_NEW}
                  </strong>
                  （618 + {result.teamBalance ?? TEAM_BALANCE_NEW} = 拼团价{" "}
                  {result.teamPrice ?? TEAM_PRICE_NEW}）即完成报名，之后等开课通知就行。
                </p>
              )}
            </div>

            {/* 拼团分享区 */}
            {result.teamCode && !result.teamComplete && (
              <div className="mt-6 rounded-2xl border border-white/15 bg-black/30 p-5">
                <div className="flex items-center gap-2 font-bold">
                  <Users className="h-4 w-4 text-fuchsia-300" />
                  当前 {result.teamCount ?? 1}/3 人 · 还差{" "}
                  {3 - (result.teamCount ?? 1)} 人成团
                </div>
                <p className="mt-2 text-sm text-white/65">
                  把下面的链接发给朋友或发到朋友圈，谁点开都能直接入团。
                  入团的人也会拿到这个链接，可以继续接力分享。
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <code className="min-w-0 flex-1 truncate rounded-xl bg-white/10 px-3 py-2.5 text-xs text-emerald-200">
                    {shareUrl}
                  </code>
                  <button
                    type="button"
                    onClick={copyShare}
                    className="flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-2.5 text-sm font-bold"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" /> 已复制
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> 复制邀请
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-xs text-white/45">
                  团码 {result.teamCode} · 朋友也可在本页选"3 人拼团"手动加入
                </p>
              </div>
            )}

            {result.teamCode && !result.teamComplete && (
              <ShareKit teamCode={result.teamCode} price={result.teamPrice} />
            )}

            {/* 成功页再推一次群 */}
            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-white/15 bg-black/30 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/wecom-group.jpg"
                alt="扫码加入意向群"
                className="h-24 w-24 shrink-0 rounded-lg bg-white object-contain"
              />
              <p className="text-sm leading-relaxed text-white/70">
                <strong className="text-emerald-200">最后一步：</strong>
                扫码进意向群，发"已锁位"，客服会优先为你核验
                {result.teamCode ? "，并帮你的团撮合补位。" : "。"}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* 第一步：选场次 */}
            <h2 className="mt-12 flex items-center gap-2 text-lg font-bold">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-xs">
                1
              </span>
              选择报名场次
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {SESSIONS.map((s) => {
                const active = session === s.key;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setSession(s.key)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-fuchsia-400 bg-fuchsia-500/20"
                        : "border-white/15 bg-white/5 hover:border-fuchsia-400/60"
                    }`}
                  >
                    <div className="text-sm font-semibold">{s.label}</div>
                    <div className="mt-1 text-xs text-white/60">
                      {s.key === "线上" ? "不限名额 · 海外可报" : "小班 · 限 50 席"}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 第二步：扫码付款 */}
            <h2 className="mt-12 flex items-center gap-2 text-lg font-bold">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-xs">
                2
              </span>
              扫码支付 618 元锁位金
            </h2>
            <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-start">
              {qrMissing ? (
                <div className="flex h-48 w-44 shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/25 text-white/40">
                  <QrCode className="h-8 w-8" />
                  <span className="px-3 text-center text-xs">
                    收款码维护中，请在群内向客服索取
                  </span>
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src="/images/pay-qr-618.jpg"
                  alt="深圳市心灵家园 · 公司收款码（支持微信/支付宝/云闪付）"
                  className="w-44 shrink-0 rounded-xl bg-white object-contain"
                  onError={() => setQrMissing(true)}
                />
              )}
              <div className="text-sm leading-relaxed text-white/70">
                <p>
                  扫码向{" "}
                  <strong className="text-white">深圳市心灵家园</strong>{" "}
                  公司账户支付{" "}
                  <strong className="text-emerald-300">618 元</strong>
                  （支持微信 / 支付宝 / 云闪付）。
                </p>
                <p className="mt-2">
                  付款时请在<strong>备注</strong>里写：
                  <code className="mx-1 rounded bg-white/10 px-2 py-0.5 text-emerald-200">
                    {mode === "team" ? "拼团+你的微信名" : "锁位+你的微信名"}
                  </code>
                </p>
                <p className="mt-2 text-white/50">
                  付款完成后，把<strong>交易单号的最后 5 位</strong>填进下方表单，
                  客服核验到账后{mode === "team" ? "即入团锁价" : "席位即锁定"}。
                  不知道单号在哪？点单号输入框旁的{" "}
                  <HelpCircle className="inline h-4 w-4 text-fuchsia-300" />{" "}
                  看图文教程。
                </p>
              </div>
            </div>

            {/* 海外学员：PayPal 收款 */}
            <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-sky-400/20 bg-sky-500/5 p-6 sm:flex-row sm:items-start">
              {paypalMissing ? (
                <div className="flex h-48 w-44 shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/25 text-white/40">
                  <QrCode className="h-8 w-8" />
                  <span className="px-3 text-center text-xs">
                    PayPal 码维护中，请向客服索取
                  </span>
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src="/images/pay-paypal.png"
                  alt="Spiritual Oasis · 公司 PayPal 收款码（海外学员）"
                  className="w-44 shrink-0 rounded-xl bg-white object-contain"
                  onError={() => setPaypalMissing(true)}
                />
              )}
              <div className="text-sm leading-relaxed text-white/70">
                <p>
                  <strong className="text-sky-300">海外学员</strong>{" "}
                  可用{" "}
                  <strong className="text-white">PayPal</strong>{" "}
                  支付等值锁位金（约 ¥618，按当日汇率，客服按实收金额确认）。
                </p>
                <p className="mt-2">
                  PayPal 收款邮箱：
                  <code className="mx-1 rounded bg-white/10 px-2 py-0.5 text-sky-200">
                    spiritual.oasis.online@gmail.com
                  </code>
                </p>
                <p className="mt-2">
                  付款时请在<strong>备注 / Note</strong>里写：
                  <code className="mx-1 rounded bg-white/10 px-2 py-0.5 text-sky-200">
                    {mode === "team" ? "拼团+你的微信名" : "锁位+你的微信名"}
                  </code>
                </p>
                <p className="mt-2 text-white/50">
                  PayPal 手续费由付款方承担；付款完成后，把{" "}
                  <strong>交易单号的最后 5 位</strong>填进下方表单，客服核验到账后
                  {mode === "team" ? "即入团锁价" : "席位即锁定"}。
                </p>
              </div>
            </div>

            {/* 第三步：回填信息 */}
            <h2 className="mt-12 flex items-center gap-2 text-lg font-bold">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-xs">
                3
              </span>
              回填信息，完成{mode === "team" ? "入团" : "锁位"}
            </h2>
            <div className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 sm:grid-cols-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="你的微信昵称（务必填群里的微信名）*"
                className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-fuchsia-400"
              />
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="手机号或微信号 *"
                className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-fuchsia-400"
              />
              {mode === "solo" ? (
                <select
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none focus:border-fuchsia-400"
                >
                  {IDENTITIES.map((i) => (
                    <option key={i} value={i} className="bg-black">
                      身份：{i}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex items-center rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white/50">
                  身份：新朋友（拼团专享）
                </div>
              )}
              <div className="relative">
                <input
                  value={payRef}
                  onChange={(e) => setPayRef(e.target.value)}
                  placeholder="付款单号后5位 *（点 ? 看哪里找）"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 pr-11 text-sm outline-none placeholder:text-white/35 focus:border-fuchsia-400"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <PayRefHelp />
                </span>
              </div>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="备注（选填）"
                className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-fuchsia-400 sm:col-span-2"
              />
            </div>

            {error && (
              <p className="mt-3 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={submit}
              disabled={status === "submitting"}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 text-lg font-bold transition hover:opacity-90 disabled:opacity-50"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> 提交中…
                </>
              ) : mode === "team" ? (
                <>
                  <Users className="h-5 w-5" />
                  {joinTeam && !joinTeam.complete
                    ? "提交，加入这个团"
                    : "提交，开团并获取邀请链接"}
                </>
              ) : (
                <>
                  <Lock className="h-5 w-5" /> 提交锁位申请
                </>
              )}
            </button>
          </>
        )}

        {/* 规则原文 */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-xs leading-relaxed text-white/50">
          <div className="mb-2 flex items-center gap-1.5 font-semibold text-white/70">
            <CalendarClock className="h-3.5 w-3.5" />
            锁位与拼团规则（请仔细阅读）
          </div>
          <ol className="list-decimal space-y-1 pl-4">
            <li>锁位金 618 元，报名时全额抵扣学费。</li>
            <li>
              个人锁位：学费 6980 元（线上线下同价）。618 元锁定席位，报名时全额抵扣。
            </li>
            <li>
              3 人拼团（仅限新朋友）：拼团价 5584 元 = 原价 6980 的 8 折（618 入团 + 成团后尾款
              4966）。入团即锁定拼团价。
            </li>
            <li>
              开课前未满 3 人：可选全额退还 618 元，或转为当期你可享的最优个人价格报名（二选一）。
            </li>
            <li>
              个人锁位开课前可申请全额退；开课后锁位金不退。
            </li>
            <li>线下席位（深/京/沪各 50 席）按核验到账顺序锁定，满员后可改报线上或候补。</li>
            <li>金卡会员、老学员折扣在小鹅通报名时自动生效，与拼团不叠加以更优者为准；学生折扣请联系客服核验。</li>
            <li>本页面仅限受邀学员使用，最终解释权归主办方所有。</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
