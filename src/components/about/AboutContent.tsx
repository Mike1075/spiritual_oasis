"use client";

import { useLocale } from "next-intl";
import { ABOUT } from "@/data/about";
import LeadForm from "@/components/leads/LeadForm";

export default function AboutContent() {
  const locale = (useLocale() as "zh" | "en");
  const pick = (b: { zh: string; en: string }) => (locale === "zh" ? b.zh : b.en);

  return (
    <div className="bg-[var(--ink)] text-white">
      {/* 愿景 */}
      <header className="relative overflow-hidden px-6 pt-32 pb-20 text-center">
        <div className="aura absolute left-1/2 top-0 -z-10 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full opacity-50" />
        <p className="text-sm uppercase tracking-widest text-white/50">{locale === "zh" ? "关于我们" : "About"}</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-semibold sm:text-5xl">{pick(ABOUT.vision)}</h1>
      </header>

      <div className="mx-auto max-w-4xl space-y-20 px-6 pb-28">
        {/* 共建·共享·共有 */}
        <section className="grid gap-5 sm:grid-cols-3">
          {ABOUT.values.map((v) => (
            <div key={v.en} className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <span className="text-2xl font-semibold">{pick(v)}</span>
            </div>
          ))}
        </section>

        {/* 原则 */}
        <section className="space-y-3">
          {ABOUT.principles.map((p) => (
            <p key={p.en} className="text-lg text-white/80">{pick(p)}</p>
          ))}
        </section>

        {/* 哲学基石 */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <h2 className="mb-3 text-2xl font-semibold">{locale === "zh" ? "哲学基石" : "Foundation"}</h2>
          <p className="text-white/80">{pick(ABOUT.foundation)}</p>
        </section>

        {/* 发展历程 */}
        <section>
          <h2 className="mb-8 text-2xl font-semibold">{locale === "zh" ? "发展历程" : "Our Journey"}</h2>
          <ol className="relative space-y-8 border-l border-white/15 pl-6">
            {ABOUT.timeline.map((t) => (
              <li key={t.year} className="relative">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-gradient-to-r from-amber-300 to-emerald-400" />
                <div className="text-emerald-300">{t.year} · {locale === "zh" ? t.zhTitle : t.enTitle}</div>
                <p className="mt-1 text-white/70">{locale === "zh" ? t.zhDesc : t.enDesc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 共建者招募 */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="mb-3 text-2xl font-semibold">{locale === "zh" ? "成为共建者" : "Become a Co-builder"}</h2>
          <p className="mb-4 text-white/80">{pick(ABOUT.cobuilder.intro)}</p>
          <ul className="mb-8 flex flex-wrap gap-3">
            {ABOUT.cobuilder.roles.map((r) => (
              <li key={r.en} className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-white/80">{pick(r)}</li>
            ))}
          </ul>
          <LeadForm source={ABOUT.cobuilder.leadSource} pillar="community" title={locale === "zh" ? "留下联系方式，一起共建" : "Join us — leave your contact"} />
        </section>
      </div>
    </div>
  );
}
