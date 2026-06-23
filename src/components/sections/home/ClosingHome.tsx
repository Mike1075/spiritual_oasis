import Link from "next/link";
import { CLOSE } from "@/data/wayHome";

export default function ClosingHome() {
  return (
    <section className="warm-4 px-6 py-28 text-center sm:py-36">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-serif-sc text-3xl font-medium text-[var(--inkwarm)] sm:text-5xl">
          {CLOSE.heading}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-[var(--inkwarm)]/70">{CLOSE.sub}</p>
        <Link
          href={CLOSE.cta.href}
          className="mt-10 inline-block rounded-full bg-[var(--ember)] px-9 py-4 font-medium text-[#fbf3e4] shadow-lg shadow-amber-900/20 transition hover:scale-[1.03] hover:bg-[#b1632f]"
        >
          {CLOSE.cta.label} →
        </Link>
      </div>
    </section>
  );
}
