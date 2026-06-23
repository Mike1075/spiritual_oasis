import Link from "next/link";
import { GUIDE } from "@/data/wayHome";

export default function GuideInvite() {
  return (
    <section className="warm-3 px-6 pb-24 sm:pb-32">
      <div className="mx-auto max-w-3xl rounded-3xl bg-[var(--inkwarm)] p-10 text-center sm:p-14">
        <p className="text-sm tracking-[0.2em] text-[var(--dawn)]">{GUIDE.eyebrow}</p>
        <h2 className="mt-4 font-serif-sc text-3xl font-medium text-[#fbf3e4] sm:text-4xl">
          {GUIDE.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-[#f3ead9]/80">{GUIDE.sub}</p>
        <Link
          href={GUIDE.cta.href}
          className="mt-9 inline-block rounded-full bg-[var(--dawn)] px-9 py-4 font-medium text-[#1a1206] shadow-lg shadow-amber-900/30 transition hover:scale-[1.03] hover:bg-[#f4ba5e]"
        >
          {GUIDE.cta.label} →
        </Link>
      </div>
    </section>
  );
}
