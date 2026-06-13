"use client";

// /mas-life/demo「看见 10 年后的你」主流程
// 手机号+称呼 双因子匹配罗盘测评记录 → 并发生成 POV 图(MiniMax 文生图)
// + 10 年故事(MiniMax 流式) → 分享链接 + canvas 合成带二维码的分享卡

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  Hourglass,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import { drawQrOnCanvas, loadImage } from "@/components/lock/ShareKit";
import DreamcoreBg from "./Dreamcore";

const SITE_URL = "https://www.spiritual-oasis.net";

type FindResp = {
  ok: boolean;
  error?: string;
  found?: boolean;
  limited?: boolean;
  cached?: boolean;
  id?: string;
  name?: string;
  story?: string;
  imageUrl?: string | null;
};

// 流式期间渐进剥思维链:完整 <think>…</think> 删掉;只开未闭说明还在思考
function visibleStory(raw: string): { text: string; thinking: boolean } {
  let s = raw.replace(/<think>[\s\S]*?<\/think>/g, "");
  const close = s.indexOf("</think>");
  if (close !== -1) s = s.slice(close + "</think>".length);
  const open = s.indexOf("<think>");
  let thinking = false;
  if (open !== -1) {
    s = s.slice(0, open);
    thinking = true;
  }
  return { text: s.trim(), thinking };
}

// 从故事里挑一句做分享卡金句(优先含「你」的中等长度句子)
function pickQuote(story: string): string {
  const sentences = story
    .replace(/\s+/g, " ")
    .split(/[。！？!?；;]/)
    .map((s) => s.trim().replace(/^[，,、:"「」"]+/, ""))
    .filter(Boolean);
  const cands = sentences.filter(
    (s) => s.length >= 8 && s.length <= 26 && s.includes("你") && !s.startsWith("——")
  );
  return (
    cands[Math.floor(cands.length / 2)] ||
    sentences.find((s) => s.length >= 6 && s.length <= 30) ||
    "十年后的你，正等你出发"
  );
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxW: number,
  maxLines: number
): string[] {
  const all: string[] = [];
  let cur = "";
  for (const ch of text) {
    if (ctx.measureText(cur + ch).width > maxW && cur) {
      all.push(cur);
      cur = ch;
    } else {
      cur += ch;
    }
  }
  if (cur) all.push(cur);
  if (all.length > maxLines) {
    const kept = all.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].slice(0, -1) + "…";
    return kept;
  }
  return all;
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const iw = img.naturalWidth || 1;
  const ih = img.naturalHeight || 1;
  const scale = Math.max(w / iw, h / ih);
  const sw = w / scale;
  const sh = h / scale;
  ctx.drawImage(img, (iw - sw) / 2, (ih - sh) / 2, sw, sh, x, y, w, h);
}

const FONT = `-apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`;

// 分享卡:POV 图 + 故事金句 + 二维码(canvas 合成进图片本体,二维码指向分享页)
async function buildShareCard(
  povUrl: string,
  quote: string,
  link: string
): Promise<string> {
  const W = 1080;
  const H = 1620;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 不可用");

  ctx.fillStyle = "#0b0614";
  ctx.fillRect(0, 0, W, H);

  // POV 图铺上部,底缘渐隐进底色
  const pov = await loadImage(povUrl);
  const imgH = 1110;
  drawImageCover(ctx, pov, 0, 0, W, imgH);
  const g = ctx.createLinearGradient(0, imgH - 320, 0, imgH + 2);
  g.addColorStop(0, "rgba(11,6,20,0)");
  g.addColorStop(1, "rgba(11,6,20,1)");
  ctx.fillStyle = g;
  ctx.fillRect(0, imgH - 320, W, 322);

  const pad = 72;
  ctx.textBaseline = "top";

  // 金句
  ctx.fillStyle = "#f3e8ff";
  ctx.font = `bold 52px ${FONT}`;
  let y = 1148;
  for (const ln of wrapText(ctx, `「${quote}」`, W - pad * 2, 2)) {
    ctx.fillText(ln, pad, y);
    y += 74;
  }

  // 底部:左侧文案 + 右侧二维码(指向 TA 的分享页)
  const qrSize = 200;
  const qrX = W - pad - qrSize;
  const qrY = H - pad - qrSize;
  await drawQrOnCanvas(ctx, link, qrX, qrY, qrSize);

  ctx.fillStyle = "#ffffff";
  ctx.font = `bold 40px ${FONT}`;
  ctx.fillText("来自 10 年后的一封信", pad, qrY + 8);
  ctx.fillStyle = "#cdb6ff";
  ctx.font = `30px ${FONT}`;
  ctx.fillText("扫码读 TA 的 10 年故事", pad, qrY + 72);
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText("也来看看你的 10 年后", pad, qrY + 118);
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.font = `24px ${FONT}`;
  ctx.fillText("AI 畅想 · 仅供娱乐 · 不构成对未来的预测", pad, qrY + 172);

  return canvas.toDataURL("image/jpeg", 0.85);
}

const inputCls =
  "w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3.5 text-sm outline-none placeholder:text-white/35 focus:border-fuchsia-400";

export default function DemoClient() {
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState<
    "form" | "checking" | "missing" | "limited" | "result"
  >("form");
  const [error, setError] = useState("");

  const [recId, setRecId] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [storyRaw, setStoryRaw] = useState("");
  const [storyDone, setStoryDone] = useState(false);
  const [storyErr, setStoryErr] = useState("");
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgBusy, setImgBusy] = useState(false);
  const [imgErr, setImgErr] = useState("");

  const [card, setCard] = useState<string | null>(null);
  const [cardBusy, setCardBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const started = useRef(false);

  // 罗盘完成页带 ?c=手机号&n=称呼 跳过来:预填并直接开跑,免得用户重填一遍
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const c = (sp.get("c") || "").trim();
    const n = (sp.get("n") || "").trim();
    if (c) setContact(c);
    if (n) setName(n);
    if (c.length >= 4 && n) submit(c, n);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shareLink = recId ? `${SITE_URL}/mas-life/demo/r/${recId}` : "";
  const { text: storyText, thinking } = visibleStory(storyRaw);

  async function genImage(id: string) {
    setImgBusy(true);
    setImgErr("");
    try {
      const res = await fetch("/api/mas-life/demo/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, contact: contact.trim() }),
      });
      const j = (await res.json()) as { ok: boolean; url?: string; error?: string };
      if (j.ok && j.url) setImgUrl(j.url);
      else setImgErr(j.error || "画面生成失败");
    } catch {
      setImgErr("画面生成失败，请刷新重试");
    } finally {
      setImgBusy(false);
    }
  }

  async function genStory(id: string) {
    setStoryErr("");
    try {
      const res = await fetch("/api/mas-life/demo/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, contact: contact.trim() }),
      });
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const j = (await res.json()) as {
          ok: boolean;
          story?: string;
          error?: string;
        };
        if (j.ok && j.story) {
          setStoryRaw(j.story);
          setStoryDone(true);
          return;
        }
        throw new Error(j.error || "故事生成失败");
      }
      if (!res.ok || !res.body) throw new Error("故事生成失败");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const t = line.trim();
          if (!t.startsWith("data:")) continue;
          const payload = t.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const j = JSON.parse(payload) as {
              choices?: { delta?: { content?: unknown } }[];
            };
            const c = j.choices?.[0]?.delta?.content;
            if (typeof c === "string") acc += c;
          } catch {
            /* 半截 JSON,忽略 */
          }
        }
        setStoryRaw(acc);
      }
      setStoryDone(true);
      if (!visibleStory(acc).text) {
        setStoryErr("生成结果为空，请刷新重试");
      }
    } catch (e) {
      setStoryDone(true);
      setStoryErr(e instanceof Error ? e.message : "故事生成失败，请刷新重试");
    }
  }

  async function submit(cArg?: string, nArg?: string) {
    const c = (cArg ?? contact).trim();
    const n = (nArg ?? name).trim();
    setError("");
    if (!c) return setError("请填写手机号");
    if (!n) return setError("请填写称呼（与做罗盘测评时填的一致）");
    if (started.current) return;
    setStep("checking");
    try {
      const res = await fetch("/api/mas-life/demo/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: c, name: n }),
      });
      const j = (await res.json()) as FindResp;
      if (!j.ok) {
        setStep("form");
        return setError(j.error || "查询失败，请稍后再试");
      }
      if (!j.found) return setStep("missing");
      if (j.limited) return setStep("limited");
      started.current = true;
      setRecId(j.id || "");
      setDisplayName(j.name || n);
      setStep("result");
      if (j.cached) {
        setStoryRaw(j.story || "");
        setStoryDone(true);
        if (j.imageUrl) setImgUrl(j.imageUrl);
        else if (j.id) genImage(j.id); // 上次图没生成成功,补一张
      } else if (j.id) {
        // 两路并发:图 + 故事
        genImage(j.id);
        genStory(j.id);
      }
    } catch {
      setStep("form");
      setError("网络异常，请重试");
    }
  }

  async function makeCard() {
    if (!imgUrl || !storyText || !shareLink) return;
    setCardBusy(true);
    try {
      setCard(await buildShareCard(imgUrl, pickQuote(storyText), shareLink));
    } catch {
      setImgErr("分享卡生成失败，请重试");
    } finally {
      setCardBusy(false);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(
        `这是我 10 年后的故事，AI 按我的人生定位写的：${shareLink}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* 旧浏览器降级:手动长按复制 */
    }
  }

  const paragraphs = storyText.split(/\n{2,}/).filter((p) => p.trim());

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07040f] text-white">
      <DreamcoreBg />
      <div className="relative z-10 mx-auto w-full max-w-xl px-5 pb-16 pt-12">
        {/* 头部 */}
        <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-fuchsia-300/80">
          <span className="h-px w-8 bg-gradient-to-r from-purple-400 to-fuchsia-400" />
          MAS · 时光机
        </div>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-pink-200 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(217,70,239,0.35)]">
            看见 10 年后的你
          </span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          用你的 AI 人生定位资料，生成 10 年后的某个普通而美好的瞬间——
          一张从你眼睛看出去的画面，一封来自未来的信。
        </p>

        {/* 表单 */}
        {(step === "form" || step === "checking") && (
          <div className="mt-8 rounded-3xl border border-fuchsia-400/25 bg-white/[0.04] p-6 backdrop-blur-sm">
            <div className="space-y-3">
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="手机号 *"
                inputMode="tel"
                className={inputCls}
              />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="你的称呼 *"
                className={inputCls}
              />
              <p className="text-xs leading-relaxed text-fuchsia-200/70">
                ✦ 请与做罗盘测评时填的一致，我们用它找回你的人生定位资料。
              </p>
            </div>
            {error && (
              <p className="mt-3 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={() => submit()}
              disabled={step === "checking"}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-4 text-base font-bold shadow-[0_0_30px_rgba(217,70,239,0.35)] transition hover:opacity-90 disabled:opacity-50"
            >
              {step === "checking" ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" /> 正在寻找你的定位资料…
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" /> 打开我的 10 年后
                </>
              )}
            </button>
          </div>
        )}

        {/* 未命中 → 引导去测评 */}
        {step === "missing" && (
          <div className="mt-8 rounded-3xl border border-white/15 bg-white/[0.04] p-6 text-center backdrop-blur-sm">
            <p className="text-base leading-relaxed text-white/80">
              还没有你的人生定位资料，花3分钟测一下，回来领你的10年后
            </p>
            <Link
              href="/compass"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-8 py-3.5 font-bold transition hover:opacity-90"
            >
              去做 AI 定位测评 <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setStep("form")}
              className="mt-4 block w-full text-xs text-white/45 underline underline-offset-4 hover:text-white/70"
            >
              填错了？返回重新输入
            </button>
          </div>
        )}

        {/* 每日上限 */}
        {step === "limited" && (
          <div className="mt-8 rounded-3xl border border-amber-400/30 bg-amber-500/10 p-6 text-center">
            <Hourglass className="mx-auto h-8 w-8 text-amber-300" />
            <p className="mt-3 text-base font-semibold text-amber-200">
              今日名额已满，明天再来
            </p>
            <p className="mt-1 text-xs text-white/50">
              每天限量生成 300 份「10 年后」，明天早点来呀。
            </p>
          </div>
        )}

        {/* 结果区 */}
        {step === "result" && (
          <div className="mt-8 space-y-5">
            {/* POV 图 */}
            <div className="overflow-hidden rounded-3xl border border-fuchsia-400/25">
              {imgUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={imgUrl}
                  alt="10 年后,从你眼睛看出去的一个瞬间"
                  className="aspect-[3/4] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-purple-900/40 via-fuchsia-900/25 to-black">
                  {imgErr ? (
                    <>
                      <p className="px-6 text-center text-sm text-amber-300">{imgErr}</p>
                      <button
                        type="button"
                        onClick={() => recId && genImage(recId)}
                        disabled={imgBusy}
                        className="rounded-full border border-white/25 px-5 py-2 text-xs text-white/75 hover:bg-white/10 disabled:opacity-50"
                      >
                        重新生成画面
                      </button>
                    </>
                  ) : (
                    <>
                      <Loader2 className="h-7 w-7 animate-spin text-fuchsia-300" />
                      <p className="text-sm text-white/60">正在显影你的 10 年后…</p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* 故事 */}
            <div className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm">
              <h2 className="text-lg font-bold text-fuchsia-100">
                来自 10 年后的一封信 · 致 {displayName}
              </h2>
              <div className="mt-4 space-y-4 text-[15px] leading-[1.9] text-white/80">
                {paragraphs.map((p, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {p}
                  </p>
                ))}
                {!storyDone && (
                  <p className="flex items-center gap-2 text-sm text-fuchsia-300/80">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {thinking || !storyText
                      ? "10 年后的你正在回忆这十年…"
                      : "正在落笔…"}
                  </p>
                )}
                {storyErr && (
                  <p className="rounded-xl border border-amber-400/40 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-300">
                    {storyErr}
                  </p>
                )}
              </div>
            </div>

            {/* 分享区 */}
            {storyDone && storyText && (
              <div className="rounded-3xl border border-fuchsia-400/25 bg-fuchsia-500/5 p-6">
                <h3 className="text-base font-bold text-fuchsia-100">
                  把你的 10 年后分享出去
                </h3>
                <div className="mt-3 flex items-center gap-2">
                  <code className="min-w-0 flex-1 truncate rounded-xl bg-white/10 px-3 py-2.5 text-xs text-fuchsia-200">
                    {shareLink}
                  </code>
                  <button
                    type="button"
                    onClick={copyLink}
                    className="flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-2.5 text-sm font-bold"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" /> 已复制
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> 复制链接
                      </>
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={makeCard}
                  disabled={!imgUrl || cardBusy}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-fuchsia-400/50 px-6 py-3.5 text-sm font-bold text-fuchsia-100 transition hover:bg-fuchsia-500/15 disabled:opacity-45"
                >
                  {cardBusy ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> 正在合成分享卡…
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      {imgUrl ? "生成分享卡（带二维码）" : "等画面生成后可做分享卡"}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* 页脚声明 */}
        <p className="mt-10 text-center text-xs leading-relaxed text-white/35">
          本页面内容为 AI 畅想，仅供娱乐，不构成对未来的预测。
        </p>
      </div>

      {/* 分享卡弹层:长按保存(移动端) / 点击下载(桌面端),二维码已合成进图片本体 */}
      {card &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-5"
            onClick={() => setCard(null)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card}
              alt="我的 10 年后分享卡"
              className="max-h-[70vh] w-auto max-w-full rounded-xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="mt-4 text-center text-sm font-semibold text-white">
              长按图片保存到相册（手机） / 点下方按钮下载（电脑）
            </p>
            <p className="mt-1 text-center text-xs text-white/55">
              卡片已带二维码，朋友扫码就能读你的 10 年故事
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={card}
                download="我的10年后.jpg"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-2 text-sm font-bold"
              >
                <Download className="h-4 w-4" /> 下载图片
              </a>
              <button
                type="button"
                onClick={() => setCard(null)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-5 py-2 text-sm text-white/80 hover:bg-white/10"
              >
                <X className="h-4 w-4" /> 关闭
              </button>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}
