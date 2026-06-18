"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Calendar, Wallet, ShieldCheck } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Calendar, text: "28 天 · 深/京/沪线下 + 线上全球同价" },
  { icon: Wallet, text: "学费 6980 · 学生 / 3 人拼团 8 折" },
  { icon: ShieldCheck, text: "第一天学不会，100% 全额退款" },
];

export default function MasLifePreview() {
  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* 光晕 */}
      <div className="pointer-events-none absolute -top-20 left-1/4 h-[360px] w-[360px] rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-emerald-500/15 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-purple-400/30 bg-gradient-to-br from-purple-600/15 via-fuchsia-600/10 to-emerald-500/10 p-8 md:p-12">
          {/* hero 图作为右侧底纹 */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center opacity-25 [mask-image:linear-gradient(to_right,transparent,black)] md:block"
            style={{ backgroundImage: "url(/images/mas-life/hero-exoskeleton.jpg)" }}
          />
          <div className="relative mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-purple-300/50 px-4 py-1.5 text-sm text-purple-200">
              2026 旗舰课程 · 限时招生
            </span>
            <span className="rounded-full border border-emerald-400/50 px-4 py-1.5 text-sm text-emerald-300">
              高考刚结束 · 方向重置
            </span>
          </div>

          <h2 className="relative mb-4 text-3xl font-extrabold leading-tight md:text-5xl">
            MAS-Life OS —— 给你装一个
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              会帮你的系统
            </span>
          </h2>
          <p className="relative mb-8 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg">
            AI 时代最缺的不是技能，是意义和方向。带你看清方向、装一套真在替你跑的「一人公司操作系统」、亲手做出一个真东西。
          </p>

          <ul className="relative mb-9 grid gap-3 sm:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <li
                key={h.text}
                className="flex items-start gap-2 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-gray-200"
              >
                <h.icon className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                {h.text}
              </li>
            ))}
          </ul>

          <div className="relative flex flex-col gap-3 sm:flex-row">
            <Link
              href="/mas-life"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 px-8 py-4 text-lg font-bold text-white transition hover:scale-[1.02]"
            >
              查看课程详情
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/gaokao"
              className="flex items-center justify-center gap-2 rounded-full border border-emerald-400/60 px-8 py-4 text-lg font-semibold text-emerald-300 transition hover:bg-emerald-400/10"
            >
              <Sparkles className="h-5 w-5" />
              免费做 AI 时代定位自测
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
