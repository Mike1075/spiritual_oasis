"use client";

// AI 定位罗盘 —— 主流程
// 分流 → 9 道分支选择题 → 2 道开放题 → AI 定位画像+三条方向(流式)
// → 选方向深挖 → 行业冷观察+预死亡推演+行动计划(流式) → 匿名落表
// → 留资解锁「保存+分享链接」 → 完成页(分享+offer)

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AssistantWidget from "@/components/assistant/AssistantWidget";
import {
  ArrowRight,
  Compass,
  Copy,
  CheckCircle2,
  History,
  Loader2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Swords,
} from "lucide-react";
import {
  ARCHETYPES,
  IDENTITIES,
  OPEN_QUESTIONS,
  getQuestions,
  parseDirections,
  scoreResult,
  type ArchetypeKey,
  type Track,
} from "@/data/compass";
import Markdown from "@/components/compass/Markdown";
// radar-auto 2026-06-15: GEO（FAQPage schema + AI 摘要块）
import { JsonLdFaq, GeoSummary } from "@/components/geo/Geo";
import { COMPASS_FAQ } from "@/data/geoFaq";

type Step =
  | "intro"
  | "identity"
  | "quiz"
  | "open"
  | "analyze"
  | "direction"
  | "premortem"
  | "gate"
  | "done";

const EMPTY_SCORE: Record<ArchetypeKey, number> = { B: 0, C: 0, S: 0, H: 0, K: 0 };

// 本机历史报告（localStorage）：换设备/清缓存会丢，丢了走 /compass/find 凭联系方式找回
type SavedReport = { id: string; title: string; ts: number };
const LS_KEY = "compass_reports";

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
    /* 隐私模式等场景写不进就算了 */
  }
}

// MiniMax-M3 把思维链以 <think>…</think> 混在 content 里输出——展示前剥掉；
// 未闭合（还在思考）时只展示 <think> 之前的内容（即空，等待指示器会持续显示）
function stripThink(s: string): string {
  let out = s.replace(/<think>[\s\S]*?<\/think>/g, "");
  const open = out.indexOf("<think>");
  if (open !== -1) out = out.slice(0, open);
  return out.trimStart();
}

// 解析 OpenAI 兼容 SSE，流式回调正文（忽略 reasoning_content）
async function streamLLM(
  url: string,
  payload: unknown,
  onText: (full: string) => void
): Promise<string> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok || !res.body) {
    let msg = "AI 服务暂时不可用，请稍后重试";
    try {
      const j = await res.json();
      if (j?.error) msg = j.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  let full = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      const t = line.trim();
      if (!t.startsWith("data:")) continue;
      const data = t.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const j = JSON.parse(data) as {
          choices?: { delta?: { content?: string } }[];
        };
        const c = j.choices?.[0]?.delta?.content;
        if (typeof c === "string" && c) {
          full += c;
          onText(stripThink(full));
        }
      } catch {
        /* 跳过半截 chunk */
      }
    }
  }
  return stripThink(full);
}

function CompassFlow() {
  const search = useSearchParams();
  const ep = search.get("ep") || "";

  const [step, setStep] = useState<Step>("intro");
  const [identityId, setIdentityId] = useState("");
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState({ ...EMPTY_SCORE });
  const [qaLines, setQaLines] = useState<string[]>([]);
  const [openPlay, setOpenPlay] = useState("");
  const [openDirection, setOpenDirection] = useState("");
  const [openIdx, setOpenIdx] = useState(0);

  const [analyzeText, setAnalyzeText] = useState("");
  const [premortemText, setPremortemText] = useState("");
  const [direction, setDirection] = useState("");
  const [customDirection, setCustomDirection] = useState("");
  const [recordId, setRecordId] = useState("");
  const [streamErr, setStreamErr] = useState("");

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

  const identity = IDENTITIES.find((i) => i.id === identityId);
  const track: Track = identity?.track ?? "adult";
  const questions = useMemo(() => getQuestions(track), [track]);
  const result = useMemo(() => scoreResult(score), [score]);
  const archetypeLabel = useMemo(
    () => (result.combo ? `${result.top.name} × ${result.second.name}` : result.top.name),
    [result]
  );
  const scoreLine = useMemo(
    () =>
      (Object.keys(score) as ArchetypeKey[])
        .map((k) => `${ARCHETYPES[k].name}${score[k]}`)
        .join(" "),
    [score]
  );
  const directions = useMemo(() => parseDirections(analyzeText), [analyzeText]);

  const baseInput = () => ({
    track,
    identityLabel: identity?.label ?? "",
    archetypeLabel,
    scoreLine,
    qaLines,
    openPlay,
    openDirection,
  });

  function restart() {
    setStep("intro");
    setIdentityId("");
    setIdx(0);
    setScore({ ...EMPTY_SCORE });
    setQaLines([]);
    setOpenPlay("");
    setOpenDirection("");
    setOpenIdx(0);
    setAnalyzeText("");
    setPremortemText("");
    setDirection("");
    setCustomDirection("");
    setRecordId("");
    setStreamErr("");
    setShareId("");
    setCopied(false);
    window.scrollTo(0, 0);
  }

  function pick(optLabel: string, key?: ArchetypeKey) {
    const q = questions[idx];
    setQaLines((l) => [...l, `${q.q} → ${optLabel}`]);
    if (key) setScore((s) => ({ ...s, [key]: s[key] + 1 }));
    if (idx + 1 < questions.length) {
      setIdx((i) => i + 1);
    } else {
      setStep("open");
    }
    window.scrollTo(0, 0);
  }

  async function runAnalyze() {
    setStep("analyze");
    setStreamErr("");
    setAnalyzeText("");
    window.scrollTo(0, 0);
    try {
      await streamLLM("/api/compass/analyze", baseInput(), setAnalyzeText);
      setStep("direction");
    } catch (e) {
      setStreamErr(e instanceof Error ? e.message : "出错了，请重试");
    }
  }

  async function runPremortem(dir: string) {
    const d = dir.trim().slice(0, 80);
    if (!d) return;
    setDirection(d);
    setStep("premortem");
    setStreamErr("");
    setPremortemText("");
    try {
      const full = await streamLLM(
        "/api/compass/premortem",
        { ...baseInput(), direction: d },
        setPremortemText
      );
      void saveAnonymous(d, full);
      setStep("gate");
    } catch (e) {
      setStreamErr(e instanceof Error ? e.message : "出错了，请重试");
    }
  }

  // 报告完成即匿名落表（所有测评结果都进飞书）；留资时再补身份信息
  async function saveAnonymous(dir: string, premortem: string) {
    if (savingRef.current) return;
    savingRef.current = true;
    try {
      const res = await fetch("/api/compass/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identityLabel: identity?.label ?? "",
          archetypeLabel,
          direction: dir,
          report: buildReport(analyzeText, premortem, dir),
          answers: [...qaLines, `像玩:${openPlay}`, `意向:${openDirection}`].join("\n"),
          ep,
        }),
      });
      const j = await res.json();
      if (j?.recordId) setRecordId(j.recordId);
    } catch {
      /* claim 阶段还有整单重写兜底 */
    }
  }

  function buildReport(analyze: string, premortem: string, dir: string) {
    return `# AI 定位罗盘报告\n\n身份：${identity?.label}｜定位原型：${archetypeLabel}｜选定方向：${dir}\n\n${analyze}\n\n${premortem}`.slice(
      0,
      20000
    );
  }

  async function submitGate(e: React.FormEvent) {
    e.preventDefault();
    setGateErr("");
    if (!contact.trim()) {
      setGateErr("请留下手机号或微信号，报告链接和后续解读都发到这里");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/compass/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recordId,
          name,
          contact,
          identityLabel: identity?.label ?? "",
          archetypeLabel,
          direction,
          report: buildReport(analyzeText, premortemText, direction),
          answers: [...qaLines, `像玩:${openPlay}`, `意向:${openDirection}`].join("\n"),
          ep,
        }),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || "提交失败");
      setShareId(j.shareId || "");
      if (j.shareId) {
        persistReport({
          id: j.shareId,
          title: [identity?.label, archetypeLabel, direction]
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
      ? `${window.location.origin}/compass/r/${shareId}`
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
      {/* radar-auto 2026-06-15: FAQPage 结构化数据 */}
      <JsonLdFaq items={COMPASS_FAQ} />
      <div className="h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-400" />
      <div className="mx-auto w-full max-w-xl px-5 pb-20 pt-8">
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
            <div className="relative mb-6 overflow-hidden rounded-2xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/compass/hero.jpg"
                alt="AI 定位罗盘"
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 bg-black/50 px-3 py-1 text-xs text-emerald-300 backdrop-blur">
                <Compass className="h-3.5 w-3.5" />
                AI 定位罗盘 · 直播专属福利
              </span>
            </div>
            <h1 className="mb-3 text-3xl font-extrabold leading-snug">
              AI 时代，<span className="text-emerald-400">你的位置</span>在哪？
            </h1>
            <p className="mb-5 text-[15px] leading-relaxed text-gray-300">
              未来五年，全球 39% 的核心技能会变，9200 万个岗位会消失、1.7
              亿个新岗位会长出来（世界经济论坛 2025）。
              <b className="text-white">
                高考生选的是专业，职场人选的是赛道——但本质是同一道题：把自己押在哪。
              </b>
            </p>
            {/* radar-auto 2026-06-15: AI 摘要块（首屏可见，明确观点 + 场景 + 品牌词） */}
            <GeoSummary label="罗盘是什么" className="mb-6">
              AI 定位罗盘是心灵家园出品的免费定位测评：11 题约 6 分钟，AI 基于你的真实回答现场推演优势资产、三条候选方向，并做“预死亡推演”。它不是星座式娱乐测试，而是帮高考生选专业、职场人选赛道看清“该把自己押在哪”的思考工具；留联系方式可保存报告、随时回看。
            </GeoSummary>
            <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-gray-300">
              <ShieldCheck className="mb-2 h-5 w-5 text-emerald-400" />
              这不是又一个「测测你像哪种人」的星座题。答完题后，AI
              会基于你的真实回答现场推演：
              <b className="text-white">
                你的优势资产、三条候选方向、以及——假设三年后你失败了，最可能死在哪
              </b>
              。敢看结果的再点开始。
            </div>
            <button
              onClick={() => {
                setStep("identity");
                window.scrollTo(0, 0);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-4 text-lg font-bold text-emerald-950 transition active:scale-[0.99]"
            >
              开始（11 题 · AI 现场分析 · 约 6 分钟）
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
                      href={`/compass/r/${h.id}`}
                      className="block rounded-lg border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm transition hover:border-emerald-400/60"
                    >
                      {h.title || "我的定位报告"}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              href="/compass/find"
              className="mt-4 block text-center text-sm text-gray-400 underline-offset-4 transition hover:text-white hover:underline"
            >
              做过测评但链接丢了？凭联系方式找回 →
            </Link>
            <Disclaimer />
          </section>
        )}

        {/* ===== 身份分流 ===== */}
        {step === "identity" && (
          <section>
            <h2 className="mb-1 text-xl font-bold">你现在的身份是？</h2>
            <p className="mb-5 text-sm text-gray-400">
              学生和职场人走完全不同的分析路径
            </p>
            <div className="space-y-3">
              {IDENTITIES.map((it) => (
                <button
                  key={it.id}
                  onClick={() => {
                    setIdentityId(it.id);
                    setStep("quiz");
                    setIdx(0);
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
                style={{ width: `${(idx / (questions.length + 2)) * 100}%` }}
              />
            </div>
            <p className="mb-1 text-xs text-gray-400">
              第 {idx + 1} / {questions.length + 2} 题
            </p>
            <h2 className="mb-5 text-xl font-bold leading-snug">
              {questions[idx].q}
            </h2>
            <div className="space-y-3">
              {questions[idx].options.map((o) => (
                <button
                  key={o.label}
                  onClick={() => pick(o.label, o.key)}
                  className="block w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-left text-[15px] transition hover:border-emerald-400/60 hover:bg-white/[0.08] active:scale-[0.99]"
                >
                  {o.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* ===== 开放题 ===== */}
        {step === "open" && (
          <section>
            <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400 transition-all duration-300"
                style={{
                  width: `${((questions.length + openIdx) / (questions.length + 2)) * 100}%`,
                }}
              />
            </div>
            <p className="mb-1 text-xs text-gray-400">
              第 {questions.length + openIdx + 1} / {questions.length + 2} 题 ·
              这道题 AI 会逐字分析
            </p>
            <h2 className="mb-2 text-xl font-bold leading-snug">
              {OPEN_QUESTIONS[openIdx].q}
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-gray-400">
              {OPEN_QUESTIONS[openIdx].hint}
            </p>
            <textarea
              value={openIdx === 0 ? openPlay : openDirection}
              onChange={(e) =>
                openIdx === 0
                  ? setOpenPlay(e.target.value.slice(0, 600))
                  : setOpenDirection(e.target.value.slice(0, 600))
              }
              placeholder={OPEN_QUESTIONS[openIdx].placeholder}
              rows={4}
              className="mb-3 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-[15px] leading-relaxed outline-none placeholder:text-gray-600 focus:border-emerald-400"
            />
            <button
              onClick={() => {
                if (openIdx === 0) {
                  if (!openPlay.trim()) return;
                  setOpenIdx(1);
                  window.scrollTo(0, 0);
                } else {
                  if (!openDirection.trim()) setOpenDirection("还没有");
                  void runAnalyze();
                }
              }}
              disabled={openIdx === 0 && !openPlay.trim()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-4 text-lg font-bold text-emerald-950 transition active:scale-[0.99] disabled:opacity-50"
            >
              {openIdx === 0 ? "下一题" : "让 AI 开始分析"}
              <ArrowRight className="h-5 w-5" />
            </button>
            {openIdx === 1 && (
              <button
                onClick={() => {
                  setOpenDirection("还没有");
                  void runAnalyze();
                }}
                className="mt-3 w-full py-2 text-sm text-gray-400 transition hover:text-white"
              >
                还没有方向，让 AI 替我推荐 →
              </button>
            )}
          </section>
        )}

        {/* ===== AI 分析（第一段流式） ===== */}
        {(step === "analyze" || step === "direction") && (
          <section>
            <StreamHeader
              icon={<Sparkles className="h-4 w-4" />}
              title={`你的定位：${archetypeLabel}`}
              streaming={step === "analyze" && !streamErr}
              waiting={step === "analyze" && !analyzeText && !streamErr}
              waitingText="AI 正在盘点你的优势资产、对照 2026 最新就业数据…（深度思考约需 30-60 秒，比模板快餐慢、但值得）"
            />
            {analyzeText && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <Markdown text={analyzeText} />
              </div>
            )}
            {streamErr && <StreamError msg={streamErr} onRetry={runAnalyze} />}

            {step === "direction" && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/10 to-sky-500/10">
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/compass/premortem.jpg"
                    alt="预死亡推演"
                    className="aspect-[21/9] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06120c] via-transparent to-transparent" />
                </div>
                <div className="p-5 pt-3">
                <div className="mb-1 flex items-center gap-2 text-lg font-bold">
                  <Swords className="h-5 w-5 text-emerald-300" />
                  选一条方向，做「预死亡推演」
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-300">
                  接下来是别的测评不敢做的部分：假设三年后你在这条路上
                  <b className="text-white">已经失败了</b>
                  ，五个「杀手」角色倒推你会死在哪、提前多久能看到信号、现在怎么防。
                </p>
                <div className="space-y-2.5">
                  {(directions.length
                    ? directions
                    : ["按 AI 上面推荐的第一条走"]
                  ).map((d) => (
                    <button
                      key={d}
                      onClick={() => void runPremortem(d)}
                      className="block w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-left text-[15px] transition hover:border-emerald-400/60 active:scale-[0.99]"
                    >
                      {d}
                    </button>
                  ))}
                  <div className="flex gap-2">
                    <input
                      value={customDirection}
                      onChange={(e) => setCustomDirection(e.target.value.slice(0, 80))}
                      placeholder="或自己写一个方向…"
                      className="flex-1 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-[15px] outline-none placeholder:text-gray-600 focus:border-emerald-400"
                    />
                    <button
                      onClick={() => void runPremortem(customDirection)}
                      disabled={!customDirection.trim()}
                      className="rounded-xl bg-emerald-500 px-4 font-bold text-emerald-950 transition active:scale-[0.99] disabled:opacity-50"
                    >
                      推演
                    </button>
                  </div>
                </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ===== 预死亡推演（第二段流式）+ 留资 gate ===== */}
        {(step === "premortem" || step === "gate") && (
          <section>
            <StreamHeader
              icon={<Swords className="h-4 w-4" />}
              title={`深挖方向：${direction}`}
              streaming={step === "premortem" && !streamErr}
              waiting={step === "premortem" && !premortemText && !streamErr}
              waitingText="五个杀手正在轮流推演你的死因…（深度推演约需 40-80 秒，他们下手不轻）"
            />
            <div className="mb-4 max-h-[40vh] overflow-y-auto rounded-2xl border border-white/10 bg-white/[0.03] p-5 opacity-80">
              <Markdown text={analyzeText} />
            </div>
            {premortemText && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <Markdown text={premortemText} />
              </div>
            )}
            {streamErr && (
              <StreamError msg={streamErr} onRetry={() => void runPremortem(direction)} />
            )}

            {step === "gate" && (
              <form
                onSubmit={submitGate}
                className="mt-6 rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-5"
              >
                <div className="mb-1 flex items-center gap-2 text-lg font-bold">
                  <Sparkles className="h-5 w-5 text-emerald-300" />
                  保存这份报告
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-300">
                  这份报告是根据你的回答现场生成的，<b className="text-white">关掉就没了</b>
                  。留下联系方式：①拿到专属链接，随时回看、可转发
                  ②直播时老师会挑报告做 1v1 解读。
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
          </section>
        )}

        {/* ===== 完成 ===== */}
        {step === "done" && (
          <section>
            <div className="mb-6 text-center">
              <CheckCircle2 className="mx-auto mb-3 h-14 w-14 text-emerald-400" />
              <h2 className="mb-1 text-2xl font-extrabold">报告已保存</h2>
              <p className="text-sm text-gray-400">
                {identity?.label} · {archetypeLabel} · {direction}
              </p>
            </div>

            {shareUrl ? (
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="mb-2 text-sm font-semibold text-sky-300">
                  你的专属报告链接（可转发给朋友/家人，已在本机记住；换设备可凭联系方式
                  <Link href="/compass/find" className="underline underline-offset-2">
                    找回
                  </Link>
                  ）
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 overflow-x-auto whitespace-nowrap rounded-lg bg-black/40 px-3 py-2.5 text-xs text-emerald-300">
                    {shareUrl}
                  </code>
                  <button
                    onClick={copyShare}
                    className="flex items-center gap-1 rounded-lg border border-emerald-400/50 px-3 py-2.5 text-sm text-emerald-300 transition hover:bg-emerald-400/10"
                  >
                    {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "已复制" : "复制"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-gray-300">
                已登记成功。报告链接稍后由老师整理后发到你的联系方式，直播时也会做解读。
              </div>
            )}

            {/* 彩蛋入口:用刚生成的定位资料看 10 年后,带上联系方式免重填 */}
            <Link
              href={`/mas-life/demo?c=${encodeURIComponent(contact.trim())}${
                name.trim() ? `&n=${encodeURIComponent(name.trim())}` : ""
              }`}
              className="mb-6 block rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-purple-600/20 via-fuchsia-600/15 to-pink-500/10 p-5 transition hover:border-fuchsia-300/60 active:scale-[0.99]"
            >
              <div className="mb-1 flex items-center gap-2 text-lg font-bold">
                <Sparkles className="h-5 w-5 text-fuchsia-300" />
                彩蛋：看见 10 年后的你
              </div>
              <p className="mb-3 text-sm leading-relaxed text-gray-300">
                AI 用你刚生成的定位资料，写一封
                <b className="text-white">来自 10 年后的信</b>
                ，再画一张 10 年后某个普通而美好的瞬间。
              </p>
              <span className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 py-3.5 font-bold text-white">
                打开我的 10 年后
                <ArrowRight className="h-5 w-5" />
              </span>
            </Link>

            <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Markdown text={buildReport(analyzeText, premortemText, direction)} />
            </div>

            {/* 客服二维码 */}
            <div className="mx-auto mb-6 flex max-w-[240px] flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/gaokao-kefu-qr.jpg"
                alt="客服二维码"
                width={200}
                height={200}
                className="w-full rounded-lg bg-white p-2"
              />
              <p className="mt-3 text-center text-sm text-gray-400">
                加老师微信、备注「罗盘报告」，直播解读优先排队
              </p>
            </div>

            {/* 直播 + 课程 offer */}
            <div className="mb-5 rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-600/15 via-fuchsia-600/10 to-emerald-500/10 p-5">
              <div className="mb-2 text-base font-bold">
                方向看清了，下一步是把它做出来
              </div>
              <p className="mb-3 text-sm leading-relaxed text-gray-300">
                {track === "student" ? (
                  <>
                    这三晚直播会展开讲「AI 时代怎么选方向」；28 天人生方向设计课带你把今天的报告
                    <b className="text-white">落成你的第一个真作品</b>
                    （上一期零基础同学做出了上架苹果商店的
                    App，个例）。深圳/北京/上海线下 + 线上全球同价，
                    <b className="text-white">学生专属 8 折</b>，进群找客服核验。
                  </>
                ) : (
                  <>
                    这三晚直播会展开讲「AI 时代的方向与方法」；MAS-Life OS
                    系统营带你把今天的报告
                    <b className="text-white">落成一套替你干活的 AI 系统</b>
                    ——报告里 30/90/365 天计划的第一步，营里第一周就会做完。
                  </>
                )}
              </p>
              <Link
                href="/mas-life#enroll"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 py-3.5 font-bold text-white transition active:scale-[0.99]"
              >
                看课程详情
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/lock"
                className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-400/60 py-3.5 font-bold text-emerald-300 transition hover:bg-emerald-400/10 active:scale-[0.99]"
              >
                618 元锁住早鸟价 / 3 人拼团 8 折
                <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="mt-2 text-center text-xs text-gray-500">
                锁位金全额抵学费 · 早鸟价 4980 至 6/18 · 拼团仅限新朋友
              </p>
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

function StreamHeader({
  icon,
  title,
  streaming,
  waiting,
  waitingText,
}: {
  icon: React.ReactNode;
  title: string;
  streaming: boolean;
  waiting: boolean;
  waitingText: string;
}) {
  return (
    <div className="mb-4">
      <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 px-3 py-1 text-xs text-emerald-300">
        {icon}
        {title}
      </span>
      {waiting && (
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
          <Loader2 className="h-4 w-4 shrink-0 animate-spin text-emerald-400" />
          {waitingText}
        </div>
      )}
      {streaming && !waiting && (
        <p className="text-xs text-gray-500">
          <Loader2 className="mr-1 inline h-3 w-3 animate-spin" />
          AI 正在边想边写…
        </p>
      )}
    </div>
  );
}

function StreamError({ msg, onRetry }: { msg: string; onRetry: () => void }) {
  return (
    <div className="mt-4 rounded-xl border border-rose-400/40 bg-rose-500/10 p-4 text-sm">
      <p className="mb-2 text-rose-200">{msg}</p>
      <button
        onClick={onRetry}
        className="rounded-lg border border-rose-300/50 px-3 py-1.5 text-rose-100 transition hover:bg-rose-400/10"
      >
        重试
      </button>
    </div>
  );
}

function Disclaimer() {
  return (
    <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-relaxed text-gray-500">
      说明：本测评由 AI
      根据你的回答现场生成，是帮你看清方向的<b>思考工具</b>
      ，不替你做最终决定，也不构成志愿填报或职业规划的专业建议。报告中标注（需核实）的数字请自行验证；引用的行业数据均注明了公开来源。我们不承诺任何升学、就业或收入结果。
    </p>
  );
}

export default function CompassPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black text-gray-500">
          加载中…
        </div>
      }
    >
      <CompassFlow />
      <AssistantWidget />
    </Suspense>
  );
}
