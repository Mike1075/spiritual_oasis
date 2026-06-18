"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import { Check, Copy, Download, Loader2, X } from "lucide-react";

const SITE_URL = "https://www.spiritual-oasis.net";
const POSTER_COUNT = 8;
const HOOK = "28 天，给自己装一个会帮你的人生系统";

const DEFAULT_TEAM_PRICE = 5584;

// 朋友圈文案模板（复制时文末自动拼接专属链接）；价格随团动态（老团锁定当初价）
function textTemplates(price: number) {
  return [
    {
      label: "走心版",
      body:
        "我在做一件事——用 28 天给自己装一套 AI 人生系统：先帮我看清自己该往哪走，再替我把方向跑成真东西。\n现在 3 人成团有特别价。如果你也想给自己一个重新设计人生的机会，跟我拼一个 👇",
    },
    {
      label: "直接版",
      body: `「人生方向设计」3 人拼团开团啦！拼团价 ${price}，618 元先锁位、全额抵学费。\n还差人成团，来跟我凑一桌 👇`,
    },
    {
      label: "提问版",
      body: `你有多久没认真想过：我到底该往哪走？\n这门课用 AI 帮你把「人生方向」设计出来，还替你一步步执行。我已经开团了，3 人成团价 ${price}，一起 👇`,
    },
  ];
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// 二维码合成:生成二维码并带白色衬底画到画布指定位置(拼团海报 / 10年后分享卡共用)
export async function drawQrOnCanvas(
  ctx: CanvasRenderingContext2D,
  link: string,
  x: number,
  y: number,
  size: number
): Promise<void> {
  const qrDataUrl = await QRCode.toDataURL(link, {
    width: size,
    margin: 1,
    color: { dark: "#2a1c10", light: "#ffffff" },
  });
  const qrImg = await loadImage(qrDataUrl);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x - 6, y - 6, size + 12, size + 12);
  ctx.drawImage(qrImg, x, y, size, size);
}

// 在海报底部留白区画：二维码 + 钩子文案 + 扫码提示，返回合成后的 PNG dataURL
async function buildPoster(
  idx: number,
  link: string,
  price: number
): Promise<string> {
  const bg = await loadImage(`/posters/poster-${idx}.jpg`);
  const W = bg.naturalWidth || 1086;
  const H = bg.naturalHeight || 1448;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 不可用");
  ctx.drawImage(bg, 0, 0, W, H);

  // 底部信息区（海报本身已留白，再铺一层柔和白底保证文字清晰）
  const cardH = H * 0.26;
  const cardY = H - cardH;
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillRect(0, cardY, W, cardH);

  // 二维码（左侧）
  const pad = W * 0.06;
  const qrSize = Math.round(cardH * 0.72);
  const qrX = pad;
  const qrY = cardY + (cardH - qrSize) / 2;
  await drawQrOnCanvas(ctx, link, qrX, qrY, qrSize);

  // 右侧文案
  const tx = qrX + qrSize + W * 0.05;
  const maxW = W - tx - pad;
  ctx.textBaseline = "top";

  // 钩子主文案（按宽度自动折行）
  ctx.fillStyle = "#2a1c10";
  const titleSize = Math.round(W * 0.05);
  ctx.font = `bold ${titleSize}px -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`;
  const lines: string[] = [];
  let cur = "";
  for (const ch of HOOK) {
    if (ctx.measureText(cur + ch).width > maxW && cur) {
      lines.push(cur);
      cur = ch;
    } else {
      cur += ch;
    }
  }
  if (cur) lines.push(cur);
  const lineH = titleSize * 1.35;
  let ty = cardY + cardH * 0.2;
  for (const ln of lines) {
    ctx.fillText(ln, tx, ty);
    ty += lineH;
  }

  // 扫码提示 + 价格
  ty += lineH * 0.25;
  ctx.fillStyle = "#7a4a1a";
  const subSize = Math.round(W * 0.033);
  ctx.font = `${subSize}px -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`;
  ctx.fillText("长按识别二维码 · 加入我的 3 人拼团", tx, ty);
  ty += subSize * 1.5;
  ctx.fillStyle = "#b3541e";
  ctx.font = `bold ${subSize}px -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif`;
  ctx.fillText(`拼团价 ${price} · 618 先锁位全额抵学费`, tx, ty);

  return canvas.toDataURL("image/jpeg", 0.85);
}

export default function ShareKit({
  teamCode,
  price = DEFAULT_TEAM_PRICE,
}: {
  teamCode: string;
  price?: number;
}) {
  const link = `${SITE_URL}/lock?t=${teamCode}`;
  const templates = textTemplates(price);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [busyIdx, setBusyIdx] = useState<number | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [err, setErr] = useState("");

  async function copyText(i: number) {
    try {
      await navigator.clipboard.writeText(`${templates[i].body}\n${link}`);
      setCopiedIdx(i);
      setTimeout(() => setCopiedIdx((v) => (v === i ? null : v)), 2000);
    } catch {
      setErr("复制失败，请长按手动选择文字复制");
    }
  }

  async function generatePoster(n: number) {
    setBusyIdx(n);
    setErr("");
    try {
      const dataUrl = await buildPoster(n, link, price);
      setPreview(dataUrl);
    } catch {
      setErr("海报生成失败，请重试，或直接复制上方文案分享");
    } finally {
      setBusyIdx(null);
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-fuchsia-400/30 bg-fuchsia-500/5 p-5">
      <h3 className="flex items-center gap-2 text-base font-bold text-fuchsia-100">
        📣 邀请好友拼团，越多人来你越快成团
      </h3>

      {/* ① 文字模板 */}
      <p className="mt-4 text-sm font-semibold text-white/80">
        ① 复制文案发朋友圈
      </p>
      <div className="mt-2 space-y-2">
        {templates.map((t, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-black/30 p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-fuchsia-200">{t.label}</span>
              <button
                type="button"
                onClick={() => copyText(i)}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-fuchsia-500/30 px-2.5 py-1 text-xs font-semibold text-fuchsia-50 hover:bg-fuchsia-500/45"
              >
                {copiedIdx === i ? (
                  <>
                    <Check className="h-3.5 w-3.5" /> 已复制
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> 复制
                  </>
                )}
              </button>
            </div>
            <p className="mt-1.5 whitespace-pre-line text-xs leading-relaxed text-white/65">
              {t.body}
              {"\n"}
              <span className="text-fuchsia-300">{link}</span>
            </p>
          </div>
        ))}
      </div>

      {/* ② 海报 */}
      <p className="mt-5 text-sm font-semibold text-white/80">
        ② 点"生成"后长按图片保存到相册 / 直接转发（已带你的专属二维码）
      </p>
      <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: POSTER_COUNT }).map((_, idx) => {
          const n = idx + 1;
          return (
            <div key={n} className="overflow-hidden rounded-xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/posters/poster-${n}.jpg`}
                alt={`拼团海报 ${n}`}
                className="aspect-[3/4] w-full object-cover"
              />
              <button
                type="button"
                onClick={() => generatePoster(n)}
                disabled={busyIdx === n}
                className="flex w-full items-center justify-center gap-1 bg-fuchsia-500/25 py-2 text-xs font-semibold text-fuchsia-50 hover:bg-fuchsia-500/40 disabled:opacity-60"
              >
                {busyIdx === n ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> 生成中
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" /> 生成
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {err && <p className="mt-3 text-xs text-amber-300">{err}</p>}
      <p className="mt-3 text-xs text-white/45">
        海报上的二维码就是你的专属拼团链接，朋友扫码进来加入的是你的团，人满即成团。
      </p>

      {/* 合成海报弹层:让用户长按的是"带二维码的合成图",而不是网格里的原始底图。
          挂 body Portal,避免祖先 transform 让 fixed 失效(同 PayRefHelp 的坑) */}
      {preview &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-5"
            onClick={() => setPreview(null)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="带专属二维码的拼团海报"
              className="max-h-[72vh] w-auto max-w-full rounded-xl border border-white/20"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="mt-4 text-center text-sm font-semibold text-white">
              长按图片保存到相册 / 直接转发给朋友
            </p>
            <p className="mt-1 text-center text-xs text-white/55">
              这张已带你的专属二维码，朋友扫码即可加入你的团
            </p>
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 px-5 py-2 text-sm text-white/80 hover:bg-white/10"
            >
              <X className="h-4 w-4" /> 关闭
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}
