"use client";

// OPC 一人公司适配测评 —— 主流程（客户端）
// 克隆自 src/app/compass/page.tsx 的结构与提交落库逻辑（同 fetch /api/opc/save + /api/opc/claim 模式）。
// 与 compass 不同：结果是确定性计算（适配度 + 推荐城市 + 五步清单 + 两大避坑），不走 LLM 流式。
// 流程：intro → identity → quiz → result → gate → done

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Copy,
  History,
  Loader2,
  MapPin,
  RotateCcw,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import {
  COST_LABEL,
  OPC_IDENTITIES,
  OPC_PITFALLS,
  buildOpcReport,
  getOpcQuestions,
  registrationChecklist,
  scoreOpc,
  type OpcAnswer,
  type OpcIdentityId,
} from "@/data/opc";
import Markdown from "@/components/compass/Markdown";

type Step = "intro" | "identity" | "quiz" | "result" | "gate" | "done";

// 本机历史报告（localStorage），与 compass 同款逻辑，独立 key
type SavedReport = { id: string; title: string; ts: number };
const LS_KEY = "opc_reports";

function loadSavedReports(): SavedReport[] {
  try {
    const list = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    return Array.isArray(list) ? list.slice(0, 10) : [];
  } catch {
    return [];
  }
}

function persistReport(r: SavedReport) {
  try {
    const list = loadSavedReports().filter((x) => x.id !== r.id);
    list.unshift(r);
    localStorage.setItem(LS_KEY, JSON.stringify(list.slice(0, 10)));
  } catch {
    /* 隐私模式写不进就算了 */
  }
}

function OpcFlow() {
  const search = useSearchParams();
  const ep = search.get("ep") || "";

  const [step, setStep] = useState<Step>("intro");
  const [identityId, setIdentityId] = useState<OpcIdentityId | "">("");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<OpcAnswer[]>([]);

  const [recordId, setRecordId] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [gateErr, setGateErr] = useState("");
  const [shareId, setShareId] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<SavedReport[]>([]);

  const savingRef = useRef(false);

  useEffect(() => {
    setHistory(loadSavedReports());
  }, []);

  const questions = useMemo(() => getOpcQuestions(), []);
  const identity = OPC_IDENTITIES.find((i) => i.id === identityId);

  const result = useMemo(
    () => (identityId ? scoreOpc(answers, identityId) : null),
    [answers, identityId]
  );
  const checklist = useMemo(
    () => (result ? registrationChecklist(result) : []),
    [result]
  );

  function restart() {
    setStep("intro");
    setIdentityId("");
    setIdx(0);
    setAnswers([]);
    setRecordId("");
    setShareId("");
    setCopied(false);
    setName("");
    setContact("");
    setGateErr("");
    window.scrollTo(0, 0);
  }

  function pick(opt: { label: string; cost?: OpcAnswer["cost"]; signal?: string }) {
    const q = questions[idx];
    const next: OpcAnswer[] = [
      ...answers,
      { qid: q.id, label: opt.label, cost: opt.cost, signal: opt.signal },
    ];
    setAnswers(next);
    if (idx + 1 < questions.length) {
      setIdx((i) => i + 1);
    } else {
      // 答完最后一题 → 用 next（含本题）算结果并落表
      setStep("result");
      void saveAnonymous(next);
    }
    window.scrollTo(0, 0);
  }

  // 结果生成即匿名落表（克隆 compass 的 saveAnonymous）
  async function saveAnonymous(allAnswers: OpcAnswer[]) {
    if (!identityId) return;
    if (savingRef.current) return;
    savingRef.current = true;
    const r = scoreOpc(allAnswers, identityId);
    try {
      const res = await fetch("/api/opc/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identityLabel: identity?.label ?? "",
          costLabel: COST_LABEL[r.primaryCost],
          city: r.city.city,
          fitScore: r.fitScore,
          report: buildOpcReport(identity?.label ?? "", r),
          answers: allAnswers.map((a) => a.label).join("\n"),
          ep,
        }),
      });
      const j = await res.json();
      if (j?.recordId) setRecordId(j.recordId);
    } catch {
      /* claim 阶段还有整单重写兜底 */
    }
  }

  async function submitGate(e: React.FormEvent) {
    e.preventDefault();
    setGateErr("");
    if (!contact.trim()) {
      setGateErr("请留下手机号或微信号，报告链接和后续解读都发到这里");
      return;
    }
    if (!result || !identityId) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/opc/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recordId,
          name,
          contact,
          identityLabel: identity?.label ?? "",
          costLabel: COST_LABEL[result.primaryCost],
          city: result.city.city,
          fitScore: result.fitScore,
          report: buildOpcReport(identity?.label ?? "", result),
          answers: answers.map((a) => a.label).join("\n"),
          ep,
        }),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || "提交失败");
      setShareId(j.shareId || "");
      if (j.shareId) {
        persistReport({
          id: j.shareId,
          title: [identity?.label, COST_LABEL[result.primaryCost], result.city.city]
            .filter(Boolean)
            .join(" · "),
          ts: Date.now(),
        });
      }
      setStep("done");
      window.scrollTo(0, 0);
    } catch (err) {
      setGateErr(
        err instanceof Error && err.message !== "提交失败"
          ? err.message
          : "网络有点问题，请稍后再试"
      );
    } finally {
      setSubmitting(false);
    }
  }

  const shareUrl =
    shareId && typeof window !== "undefined"
      ? `${window.location.origin}/opc/r/${shareId}`
      : "";

  async function copyShare() {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-black to-black text-white">
      <div className="h-1 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-400" />
      <div className="mx-auto w-full max-w-xl px-5 pb-20 pt-8">
        <Link
          href="/mas-life"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-emerald-400 text-xs font-bold">
            SO
          </span>
          心灵家园 · MAS-Life OS
        </Link>

        {/* ===== 封面 ===== */}
        {step === "intro" && (
          <section>
            <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 bg-black/50 px-3 py-1 text-xs text-emerald-300">
              <Building2 className="h-3.5 w-3.5" />
              OPC 一人公司适配测评
            </span>
            <h1 className="mb-3 text-3xl font-extrabold leading-snug">
              你这门生意，<span className="text-emerald-400">该不该开公司</span>？
              <br />
              开的话，<span className="text-sky-400">落在哪座城</span>？
            </h1>
            <p className="mb-5 text-[15px] leading-relaxed text-gray-300">
              一个人也能开公司（One-Person Company）。但「要不要立主体、落在哪、怎么注册、踩哪些坑」，
              <b className="text-white">
                取决于你这门生意的核心成本是算力、税、生态还是跨境。
              </b>
              答 6 题，当场给你适配度、推荐城市和五步注册清单。
            </p>
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-gray-300">
              <ShieldAlert className="mb-2 h-5 w-5 text-amber-400" />
              这不是劝你冲动注册。
              <b className="text-white">
                传统本地小生意，我们会直接劝退、建议你先用个体工商户起步
              </b>
              。所有补贴/税率数字都是示例，以官方最新政策为准——这是帮你想清楚的工具，不是财税建议。
            </div>
            <button
              onClick={() => {
                setStep("identity");
                window.scrollTo(0, 0);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-4 text-lg font-bold text-emerald-950 transition active:scale-[0.99]"
            >
              开始测评（6 题 · 约 2 分钟）
              <ArrowRight className="h-5 w-5" />
            </button>

            {history.length > 0 && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="mb-2.5 flex items-center gap-1.5 text-sm font-semibold text-sky-300">
                  <History className="h-4 w-4" />
                  你在本机保存过 {history.length} 份报告
                </p>
                <div className="space-y-2">
                  {history.slice(0, 3).map((h) => (
                    <Link
                      key={h.id}
                      href={`/opc/r/${h.id}`}
                      className="block rounded-lg border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm transition hover:border-emerald-400/60"
                    >
                      {h.title || "我的 OPC 适配报告"}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <Disclaimer />
          </section>
        )}

        {/* ===== 身份分流 ===== */}
        {step === "identity" && (
          <section>
            <h2 className="mb-1 text-xl font-bold">你现在主要是哪一类？</h2>
            <p className="mb-5 text-sm text-gray-400">
              不同身份吃的成本不一样，推荐路径也不同
            </p>
            <div className="space-y-3">
              {OPC_IDENTITIES.map((it) => (
                <button
                  key={it.id}
                  onClick={() => {
                    setIdentityId(it.id);
                    setStep("quiz");
                    setIdx(0);
                    setAnswers([]);
                    window.scrollTo(0, 0);
                  }}
                  className="block w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-left transition hover:border-emerald-400/60 hover:bg-white/[0.08] active:scale-[0.99]"
                >
                  <span className="text-[15px] font-semibold">{it.label}</span>
                  <span className="ml-2 text-xs text-gray-400">{it.hint}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ===== 选择题 ===== */}
        {step === "quiz" && (
          <section>
            <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-300"
                style={{ width: `${(idx / questions.length) * 100}%` }}
              />
            </div>
            <p className="mb-1 text-xs text-gray-400">
              第 {idx + 1} / {questions.length} 题
            </p>
            <h2 className="mb-5 text-xl font-bold leading-snug">
              {questions[idx].q}
            </h2>
            <div className="space-y-3">
              {questions[idx].options.map((o) => (
                <button
                  key={o.label}
                  onClick={() => pick(o)}
                  className="block w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-left text-[15px] transition hover:border-emerald-400/60 hover:bg-white/[0.08] active:scale-[0.99]"
                >
                  {o.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ===== 结果 + 留资 gate ===== */}
        {(step === "result" || step === "gate") && result && (
          <section>
            {/* 适配度 */}
            <div className="mb-5 rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-5">
              <div className="mb-1 flex items-center gap-2 text-sm text-emerald-300">
                <Sparkles className="h-4 w-4" />
                {identity?.label} · 核心成本：{COST_LABEL[result.primaryCost]}
              </div>
              <div className="mb-1 text-4xl font-extrabold">
                适配度 {result.fitScore}
                <span className="text-lg text-gray-400"> / 100</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-300">
                {result.fitLabel}
              </p>
            </div>

            {/* 推荐城市 */}
            <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-1 flex items-center gap-2 text-lg font-bold">
                <MapPin className="h-5 w-5 text-sky-300" />
                推荐落地：{result.city.city}
              </div>
              <p className="text-sm leading-relaxed text-gray-300">
                {result.city.reason}
              </p>
            </div>

            {/* 五步注册清单 */}
            <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-3 text-lg font-bold">五步注册清单</div>
              <ol className="space-y-3">
                {checklist.map((s) => (
                  <li key={s.title}>
                    <p className="text-[15px] font-semibold text-white">
                      {s.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-gray-400">
                      {s.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            {/* 两大避坑 */}
            <div className="mb-2 rounded-2xl border border-amber-400/40 bg-amber-500/[0.06] p-5">
              <div className="mb-3 flex items-center gap-2 text-lg font-bold text-amber-200">
                <ShieldAlert className="h-5 w-5" />
                两大避坑（务必看完）
              </div>
              <div className="space-y-3">
                {OPC_PITFALLS.map((p) => (
                  <div key={p.title}>
                    <p className="text-[15px] font-semibold text-amber-100">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-relaxed text-gray-300">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {step === "result" && (
              <button
                onClick={() => {
                  setStep("gate");
                  window.scrollTo(0, 0);
                }}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-4 text-lg font-bold text-emerald-950 transition active:scale-[0.99]"
              >
                保存这份报告 + 获取专属链接
                <ArrowRight className="h-5 w-5" />
              </button>
            )}

            {step === "gate" && (
              <form
                onSubmit={submitGate}
                className="mt-5 rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-5"
              >
                <div className="mb-1 flex items-center gap-2 text-lg font-bold">
                  <Sparkles className="h-5 w-5 text-emerald-300" />
                  保存这份报告
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-300">
                  留下联系方式：①拿到专属链接，随时回看、可转发
                  ②直播时老师会挑报告做 1v1 的「该不该开公司」诊断。
                </p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="称呼（选填）"
                  className="mb-3 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-[15px] outline-none placeholder:text-gray-500 focus:border-emerald-400"
                />
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="手机号 / 微信号 *"
                  className="mb-1 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-[15px] outline-none placeholder:text-gray-500 focus:border-emerald-400"
                />
                {gateErr && <p className="mt-1 text-sm text-rose-400">{gateErr}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-4 text-lg font-bold text-emerald-950 transition active:scale-[0.99] disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      生成链接中…
                    </>
                  ) : (
                    <>
                      保存报告 + 获取专属链接
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-xs text-gray-500">
                  只用于发报告链接与直播解读通知，不骚扰、不泄露。
                </p>
              </form>
            )}
            <Disclaimer />
          </section>
        )}

        {/* ===== 完成 ===== */}
        {step === "done" && result && (
          <section>
            <div className="mb-6 text-center">
              <CheckCircle2 className="mx-auto mb-3 h-14 w-14 text-emerald-400" />
              <h2 className="mb-1 text-2xl font-extrabold">报告已保存</h2>
              <p className="text-sm text-gray-400">
                {identity?.label} · {COST_LABEL[result.primaryCost]} ·{" "}
                {result.city.city}
              </p>
            </div>

            {shareUrl ? (
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="mb-2 text-sm font-semibold text-sky-300">
                  你的专属报告链接（可转发，已在本机记住）
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 overflow-x-auto whitespace-nowrap rounded-lg bg-black/40 px-3 py-2.5 text-xs text-emerald-300">
                    {shareUrl}
                  </code>
                  <button
                    onClick={copyShare}
                    className="flex items-center gap-1 rounded-lg border border-emerald-400/50 px-3 py-2.5 text-sm text-emerald-300 transition hover:bg-emerald-400/10"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "已复制" : "复制"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-gray-300">
                已登记成功。报告链接稍后由老师整理后发到你的联系方式，直播时也会做解读。
              </div>
            )}

            <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Markdown text={buildOpcReport(identity?.label ?? "", result)} />
            </div>

            {/* 直播 + 课程 offer */}
            <div className="mb-5 rounded-2xl border border-sky-400/40 bg-gradient-to-br from-sky-600/15 via-cyan-600/10 to-emerald-500/10 p-5">
              <div className="mb-2 text-base font-bold">
                主体定了，下一步是把这门一人公司真正跑起来
              </div>
              <p className="mb-3 text-sm leading-relaxed text-gray-300">
                MAS-Life OS 系统营带你把「一个人 + 一套 AI 系统」做成可持续的生意——
                从拿到第一笔合规收入，到搭起替你干活的工作流。
              </p>
              <Link
                href="/mas-life#enroll"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 py-3.5 font-bold text-white transition active:scale-[0.99]"
              >
                看课程详情
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            <button
              onClick={restart}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-sky-300 transition hover:bg-white/5"
            >
              <RotateCcw className="h-4 w-4" />
              再测一次 / 发给朋友测
            </button>
            <Disclaimer />
          </section>
        )}
      </div>
    </div>
  );
}

function Disclaimer() {
  return (
    <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-gray-500">
      说明：本测评是帮你看清「要不要开一人公司、落在哪、怎么注册」的
      <b>思考工具</b>
      ，不构成法律、财税或工商注册的专业建议。报告中涉及的补贴、税率、门槛等数字均为
      <b>示例，以官方最新政策为准</b>
      ，请务必在当地市场监管/税务部门核实后再行动。我们不承诺任何政策红利或经营结果。
    </p>
  );
}

export default function OpcClient() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black text-gray-500">
          加载中…
        </div>
      }
    >
      <OpcFlow />
    </Suspense>
  );
}
