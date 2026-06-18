"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Calendar, Wallet, ShieldCheck, Users } from "lucide-react";
import { osDisplay, osMono } from "@/lib/masosFonts";

const HIGHLIGHTS = [
  { icon: Calendar, text: "28 天 · 深/京/沪线下 + 线上全球同价" },
  { icon: Wallet, text: "学费 6980 · 学生/金卡 8 折 · 老学员 75 折" },
  { icon: ShieldCheck, text: "第一天学不会，100% 全额退款" },
];

export default function MasLifePreview() {
  return (
    <section className="relative overflow-hidden bg-[#0a0b0f] py-24">
      {/* 光晕 */}
      <div className="pointer-events-none absolute -top-20 left-1/4 h-[360px] w-[360px] rounded-full bg-[#f5a524]/12 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-[#2dd4bf]/10 blur-[120px]" />

      <div
        className={`${osDisplay.variable} ${osMono.variable} masos relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8`}
      >
        <div className="os-panel os-panel--live relative overflow-hidden p-8 md:p-12">
          {/* hero 图作为右侧底纹 */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-cover bg-center opacity-30 [mask-image:linear-gradient(to_right,transparent,black)] md:block"
            style={{ backgroundImage: "url(/images/mas-life/redesign/exoskeleton.jpg)" }}
          />
          <div className="relative mb-5 flex flex-wrap items-center gap-3">
            <span className="os-mono rounded-md border border-[color:var(--os-line-strong)] px-3 py-1 text-xs text-[color:var(--os-dim)]">
              2026 旗舰课程
            </span>
            <span className="os-mono rounded-md border border-[color:var(--os-sys)] bg-[color:var(--os-sys-soft)] px-3 py-1 text-xs text-[color:var(--os-sys)]">
              认证 AI 应用架构师
            </span>
          </div>

          <h2 className="relative mb-4 text-3xl font-bold leading-tight md:text-5xl">
            MAS-Life OS —— 普通人跨入 AI 行业的
            <span className="text-[color:var(--os-you)]"> 唯一入口</span>
          </h2>
          <p className="relative mb-8 max-w-2xl text-base leading-relaxed text-[color:var(--os-dim)] md:text-lg">
            28 天，拿到一套永远属于你、断网也能跑的 AI 系统，一个认证架构师的新职业身份，一张接单变现的交付网络席位。
          </p>

          <ul className="relative mb-9 grid gap-3 sm:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <li
                key={h.text}
                className="os-panel flex items-start gap-2 p-4 text-sm text-[color:var(--os-text)]"
              >
                <h.icon className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--os-sys)]" />
                {h.text}
              </li>
            ))}
          </ul>

          {/* 拼团促销入口（首页直达锁位/拼团页） */}
          <Link
            href="/lock"
            className="relative mb-5 flex items-center justify-between gap-3 rounded-2xl border border-[color:rgba(245,165,36,0.4)] bg-[color:var(--os-you-soft)] px-5 py-3.5 transition hover:bg-[color:rgba(245,165,36,0.16)]"
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-[color:var(--os-text)]">
              <Users className="h-5 w-5 shrink-0 text-[color:var(--os-you)]" />
              3 人拼团 <span className="os-mono text-[color:var(--os-you)]">¥5584</span> · 立省 1396，618 先锁位
            </span>
            <span className="flex shrink-0 items-center gap-1 text-sm font-bold text-[color:var(--os-you)]">
              去拼团 <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <div className="relative flex flex-col gap-3 sm:flex-row">
            <Link href="/mas-life" className="os-btn os-btn-you px-8 py-4 text-lg">
              查看课程详情
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link href="/gaokao" className="os-btn os-btn-ghost px-8 py-4 text-lg">
              <Sparkles className="h-5 w-5 text-[color:var(--os-sys)]" />
              免费做 AI 定位自测
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
