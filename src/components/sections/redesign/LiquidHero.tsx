"use client";

import Link from "next/link";

export default function LiquidHero() {
  return (
    <section className="relative isolate min-h-[92svh] overflow-hidden bg-[var(--ink)] flex items-center">
      {/* 呼吸光晕（流体感占位；P3 换 Fable 5 流体 shader canvas） */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aura absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <div className="absolute inset-0 bg-[var(--ink)]/40" />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center">
        <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-6xl md:text-7xl">
          开启人类潜能
          <br />
          引领人类进入新时代
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg">
          一个以共建·共享·共有方式成立、遵循青色组织理念的成长型社区
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/academy"
            className="rounded-full bg-gradient-to-r from-amber-300 to-emerald-400 px-8 py-4 font-medium text-black transition hover:scale-105">
            探索心灵大学 →
          </Link>
          <Link href="/365"
            className="rounded-full border border-white/20 px-8 py-4 font-medium text-white transition hover:bg-white/10">
            加入 365 陪伴
          </Link>
        </div>
      </div>
    </section>
  );
}
