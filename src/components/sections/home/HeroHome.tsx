import Image from "next/image";
import Link from "next/link";
import { HERO } from "@/data/wayHome";

export default function HeroHome() {
  return (
    <section className="relative isolate flex min-h-[94svh] items-end overflow-hidden">
      <Image
        src="/images/home/hero-dawn.jpg"
        alt="黎明时分，面向晨光、走在回家路上的人"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-[var(--night)]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--night)]/55 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 sm:pb-28">
        <p className="mb-5 text-sm tracking-[0.2em] text-[var(--dawn)]">{HERO.eyebrow}</p>
        <h1 className="font-serif-sc text-4xl font-medium leading-[1.18] text-[#fbf3e4] sm:text-6xl md:text-7xl">
          {HERO.titleA}
          <br />
          {HERO.titleB}
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#efe3cf]/90 sm:text-lg">
          {HERO.sub}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href={HERO.ctaPrimary.href}
            className="rounded-full bg-[var(--dawn)] px-8 py-4 font-medium text-[#1a1206] shadow-lg shadow-amber-900/30 transition hover:scale-[1.03] hover:bg-[#f4ba5e]"
          >
            {HERO.ctaPrimary.label} →
          </Link>
          <Link
            href={HERO.ctaSecondary.href}
            className="rounded-full border border-[#efe3cf]/30 px-8 py-4 font-medium text-[#efe3cf] transition hover:bg-white/10"
          >
            {HERO.ctaSecondary.label}
          </Link>
        </div>
        <ul className="mt-9 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#efe3cf]/65">
          {HERO.trust.map((t, i) => (
            <li key={t} className="flex items-center gap-3">
              {i > 0 && <span className="text-[var(--dawn)]/50">·</span>}
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
