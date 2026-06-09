"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  QUESTIONS,
  scoreResult,
  type Archetype,
  type ArchetypeKey,
} from "@/data/gaokaoQuiz";

// 把 **加粗** 标记渲染成 <strong>
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="text-emerald-300 font-semibold">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

type Step = "intro" | "quiz" | "result" | "done";

function GaokaoAssessment() {
  const search = useSearchParams();
  const ep = search.get("ep") || "";

  const [step, setStep] = useState<Step>("intro");
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState<Record<ArchetypeKey, number>>({
    B: 0,
    C: 0,
    S: 0,
    H: 0,
    K: 0,
  });

  // 留资表单
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [identity, setIdentity] = useState<"家长" | "考生" | "其他">("考生");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState("");

  const result = useMemo(() => scoreResult(score), [score]);
  const archetypeLabel = useMemo(() => {
    const { top, second, combo } = result;
    return combo ? `${top.name} × ${second.name}` : top.name;
  }, [result]);

  function start() {
    setStep("quiz");
    setIdx(0);
    setScore({ B: 0, C: 0, S: 0, H: 0, K: 0 });
    window.scrollTo(0, 0);
  }

  function pick(key: ArchetypeKey) {
    setScore((s) => ({ ...s, [key]: s[key] + 1 }));
    if (idx + 1 < QUESTIONS.length) {
      setIdx((i) => i + 1);
    } else {
      setStep("result");
    }
    window.scrollTo(0, 0);
  }

  function restart() {
    setStep("intro");
    setIdx(0);
    setScore({ B: 0, C: 0, S: 0, H: 0, K: 0 });
    setSubmitted(false);
    setName("");
    setContact("");
    setErr("");
    window.scrollTo(0, 0);
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!contact.trim()) {
      setErr("请留下你的手机号或微信号，方便老师把诊断结果发给你");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          contact,
          identity,
          archetype: archetypeLabel,
          ep,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "提交失败");
      }
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch {
      setErr("网络有点问题，请稍后再试，或直接扫码加老师微信");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-black to-black text-white">
      {/* 顶部细条 */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-400" />

      <div className="mx-auto w-full max-w-xl px-5 pb-20 pt-8">
        {/* 品牌 */}
        <Link
          href="/mas-life"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-emerald-400 text-xs font-bold">
            SO
          </span>
          心灵家园 · MAS-Life OS
        </Link>

        {/* ===== 封面 ===== */}
        {step === "intro" && (
          <section>
            <span className="mb-4 inline-block rounded-full border border-emerald-400/60 px-3 py-1 text-xs text-emerald-300">
              高考刚结束 · AI 时代版
            </span>
            <h1 className="mb-3 text-3xl font-extrabold leading-snug">
              你的<span className="text-emerald-400">起跑线</span>
              ，刚被 AI 重新画了一条
            </h1>
            <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
              高考定义的是你的过去。而真正决定你未来的那次“选方向”——AI
              时代怎么选——没有标准答案、没人替你划重点。
              <br />
              <br />
              这个 3 分钟自测，帮你看清：在一个 AI
              能一句话写代码、出图、做视频的时代，
              <b className="text-white">你的天然优势在哪、该往哪个方向押。</b>
            </p>

            <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-gray-300">
              <ShieldCheck className="mb-2 h-5 w-5 text-emerald-400" />
              先说清楚：这不是替你选专业。张雪峰看的是就业数据；我们想让你看清的是——
              <b className="text-white">
                AI
                正在重塑每个方向的价值，而真正安全的不是某个专业，是成为“会指挥
                AI、能做出真东西、有独特组合”的人。
              </b>
            </div>

            <button
              onClick={start}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-4 text-lg font-bold text-emerald-950 transition active:scale-[0.99]"
            >
              开始自测（10 题 · 约 3 分钟）
              <ArrowRight className="h-5 w-5" />
            </button>
          </section>
        )}

        {/* ===== 答题 ===== */}
        {step === "quiz" && (
          <section>
            <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-300"
                style={{ width: `${(idx / QUESTIONS.length) * 100}%` }}
              />
            </div>
            <p className="mb-1 text-xs text-gray-400">
              第 {idx + 1} / {QUESTIONS.length} 题
            </p>
            <h2 className="mb-5 text-xl font-bold leading-snug">
              {QUESTIONS[idx].q}
            </h2>
            <div className="space-y-3">
              {QUESTIONS[idx].options.map((o) => (
                <button
                  key={o.label}
                  onClick={() => pick(o.key)}
                  className="block w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-left text-[15px] transition hover:border-emerald-400/60 hover:bg-white/[0.08] active:scale-[0.99]"
                >
                  {o.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ===== 结果（含留资） ===== */}
        {step === "result" && !submitted && (
          <ResultBlock
            archetypeLabel={archetypeLabel}
            top={result.top}
            second={result.second}
            combo={result.combo}
            name={name}
            setName={setName}
            contact={contact}
            setContact={setContact}
            identity={identity}
            setIdentity={setIdentity}
            submitting={submitting}
            err={err}
            onSubmit={submitLead}
            onRestart={restart}
          />
        )}

        {/* ===== 留资成功 ===== */}
        {submitted && (
          <DoneBlock archetypeLabel={archetypeLabel} onRestart={restart} />
        )}
      </div>
    </div>
  );
}

function ResultBlock({
  archetypeLabel,
  top,
  second,
  combo,
  name,
  setName,
  contact,
  setContact,
  identity,
  setIdentity,
  submitting,
  err,
  onSubmit,
  onRestart,
}: {
  archetypeLabel: string;
  top: Archetype;
  second: Archetype;
  combo: boolean;
  name: string;
  setName: (v: string) => void;
  contact: string;
  setContact: (v: string) => void;
  identity: "家长" | "考生" | "其他";
  setIdentity: (v: "家长" | "考生" | "其他") => void;
  submitting: boolean;
  err: string;
  onSubmit: (e: React.FormEvent) => void;
  onRestart: () => void;
}) {
  return (
    <section>
      <span className="mb-3 inline-block rounded-full border border-emerald-400/60 px-3 py-1 text-xs text-emerald-300">
        你的 AI 时代定位
      </span>
      <div className="mb-2 bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-3xl font-extrabold text-transparent">
        {archetypeLabel}
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {top.tags.map((t) => (
          <span
            key={t}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="space-y-4">
        <Field title="你是谁">
          <RichText text={top.lean} />
          {combo && (
            <>
              <br />
              <br />
              而你身上还有很强的
              <b className="text-white">「{second.name}」</b>
              底色——这种<b className="text-white">独特组合</b>，正是 AI
              时代别人复制不走的东西。
            </>
          )}
        </Field>
        <Field title="AI 时代，这意味着什么">
          <RichText text={top.ai} />
        </Field>
        <Field title="该往哪押 / 该避开什么">
          <RichText text={top.bet} />
        </Field>
      </div>

      <div className="my-5 rounded-xl border-l-2 border-emerald-400 bg-emerald-400/10 px-4 py-3 text-sm leading-relaxed text-emerald-50">
        不管你是哪种——AI 时代真正的安全牌，
        <b>
          不是赌某个“热门专业”，是成为一个“会指挥 AI、能做出真东西、有自己独特组合”的人。
        </b>
        方向看清得越早，你越早赢。
      </div>

      {/* ===== 留资表单 ===== */}
      <form
        onSubmit={onSubmit}
        className="mt-6 rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-5"
      >
        <div className="mb-1 flex items-center gap-2 text-lg font-bold">
          <Sparkles className="h-5 w-5 text-emerald-300" />
          领取你的「方向诊断」
        </div>
        <p className="mb-4 text-sm leading-relaxed text-gray-300">
          留下联系方式，老师会结合你的定位结果，给你一份更具体的方向诊断 +
          7&nbsp;月深圳夏令营名额信息（应届高考生额外 8 折）。
        </p>

        <div className="mb-3 flex gap-2">
          {(["考生", "家长", "其他"] as const).map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setIdentity(opt)}
              className={`flex-1 rounded-lg border px-3 py-2 text-sm transition ${
                identity === opt
                  ? "border-emerald-400 bg-emerald-400/20 text-white"
                  : "border-white/10 bg-white/5 text-gray-400"
              }`}
            >
              {opt === "考生" ? "我是考生" : opt === "家长" ? "我是家长" : "其他"}
            </button>
          ))}
        </div>

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
          inputMode="text"
          className="mb-1 w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 text-[15px] outline-none placeholder:text-gray-500 focus:border-emerald-400"
        />
        {err && <p className="mb-1 mt-1 text-sm text-rose-400">{err}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-4 text-lg font-bold text-emerald-950 transition active:scale-[0.99] disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              提交中…
            </>
          ) : (
            <>
              领取方向诊断 + 名额信息
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
        <p className="mt-3 text-center text-xs text-gray-500">
          我们只用它给你发诊断与课程信息，不会骚扰、不会泄露。
        </p>
      </form>

      <button
        onClick={onRestart}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-sky-300 transition hover:bg-white/5"
      >
        <RotateCcw className="h-4 w-4" />
        重新测一次 / 发给同学测
      </button>

      <Disclaimer />
    </section>
  );
}

function DoneBlock({
  archetypeLabel,
  onRestart,
}: {
  archetypeLabel: string;
  onRestart: () => void;
}) {
  return (
    <section className="text-center">
      <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-emerald-400" />
      <h2 className="mb-2 text-2xl font-extrabold">收到啦！</h2>
      <p className="mb-6 text-[15px] leading-relaxed text-gray-300">
        你的定位是
        <b className="text-emerald-300"> {archetypeLabel}</b>
        。老师会尽快联系你，发来更具体的方向诊断。
        <br />
        想更快？现在扫码加老师微信，备注「定位诊断」插队优先。
      </p>

      {/* 客服二维码 */}
      <div className="mx-auto mb-6 flex max-w-[240px] flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/gaokao-kefu-qr.jpg"
          alt="AI 夏令营客服二维码"
          width={200}
          height={200}
          className="w-full rounded-lg bg-white p-2"
        />
        <p className="mt-3 text-sm text-gray-400">
          长按识别加客服，备注「定位诊断」
        </p>
      </div>

      {/* 夏令营 offer */}
      <div className="mb-5 rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-600/15 via-fuchsia-600/10 to-emerald-500/10 p-5 text-left">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-purple-300/50 px-2.5 py-0.5 text-xs text-purple-100">
            2026 暑期 · 深圳夏令营
          </span>
          <span className="rounded-full border border-rose-400/50 bg-rose-500/10 px-2.5 py-0.5 text-xs text-rose-200">
            仅 30 个名额 · 6/18 涨价
          </span>
        </div>
        <div className="text-base font-bold">把定位，真的落成你的第一个作品</div>
        <p className="mt-2 text-sm leading-relaxed text-gray-300">
          我们做了 5 期：最近一期带零基础的同学
          <b className="text-white"> 60 天做出一个上架苹果商店的 App</b>
          ，大部分人都完成了。7 月深圳有一期线下夏令营，专门带你看清 AI
          时代的方向 + 亲手做出一个真东西。
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-gray-300">
          <li>📍 7/6–7/12 深圳线下 + 21 天线上陪跑</li>
          <li>
            💰 <b className="text-emerald-300">早鸟 4980</b>（6/18 前，之后
            6980）｜<b className="text-emerald-300">应届高考生额外 8 折</b>
          </li>
          <li>🛡 第一天听不懂学不会，100% 全额退款</li>
        </ul>
        <Link
          href="/mas-life#enroll"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 py-3.5 font-bold text-white transition active:scale-[0.99]"
        >
          看夏令营详情 · 报名
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <button
        onClick={onRestart}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-sky-300 transition hover:bg-white/5"
      >
        <RotateCcw className="h-4 w-4" />
        再测一次 / 发给朋友
      </button>

      <Disclaimer />
    </section>
  );
}

function Field({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-1 text-sm font-semibold text-sky-300">{title}</h3>
      <p className="text-[15px] leading-relaxed text-gray-200">{children}</p>
    </div>
  );
}

function Disclaimer() {
  return (
    <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-gray-500">
      说明：本自测是帮你看清天然倾向与 AI 时代方向感的
      <b>思考工具</b>
      ，不替你做最终决定，也不构成专业的志愿填报建议。「该往哪押」中的具体专业方向，请结合你的真实情况与专业老师再判断。我们不承诺任何升学或收入结果；学员成果均为个例，不代表普遍结果。
    </p>
  );
}

export default function GaokaoPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black text-gray-500">
          加载中…
        </div>
      }
    >
      <GaokaoAssessment />
    </Suspense>
  );
}
