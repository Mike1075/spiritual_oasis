"use client";
import { useLocale } from "next-intl";
import Link from "next/link";
import { PILLARS } from "@/data/academy";

export default function PillarsBento() {
  const locale = (useLocale() as "zh" | "en");
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-5 md:grid-cols-3">
        {PILLARS.map((p) => (
          <Link key={p.id} href={`/academy#${p.id}`}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-white/25 hover:bg-white/[0.06]">
            <h2 className="text-2xl font-semibold text-white">{locale === "zh" ? p.titleZh : p.titleEn}</h2>
            <p className="mt-3 text-white/60">{locale === "zh" ? p.descZh : p.descEn}</p>
            <p className="mt-6 text-sm text-emerald-300">{locale === "zh" ? `${p.courses.length} 门课程 / 服务 →` : `${p.courses.length} Courses / Services →`}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
