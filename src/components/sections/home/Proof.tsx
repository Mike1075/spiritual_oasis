import Link from "next/link";
import { PROOF } from "@/data/home";

export default function Proof() {
  return (
    <section className="warm-3 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-serif-sc text-3xl font-medium text-[var(--inkwarm)] sm:text-4xl">
          {PROOF.heading}
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PROOF.quotes.map((q) => (
            <figure
              key={q.who + q.text.slice(0, 6)}
              className="rise rounded-3xl bg-[#fbf6ec] p-7 shadow-sm ring-1 ring-black/5"
            >
              <span className="font-serif-sc text-3xl leading-none text-[var(--ember)]">“</span>
              <blockquote className="mt-2 leading-relaxed text-[var(--inkwarm)]/90">
                {q.text}
              </blockquote>
              <figcaption className="mt-4 text-sm text-[var(--inkwarm)]/55">— {q.who}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--inkwarm)]/50">{PROOF.note}</p>

        {/* 创始人的话 */}
        <div className="mt-16 rounded-3xl bg-[var(--inkwarm)] p-8 sm:p-12">
          <h3 className="font-serif-sc text-xl text-[var(--dawn)]">{PROOF.founder.title}</h3>
          <p className="mt-4 max-w-3xl font-serif-sc text-lg leading-relaxed text-[#f3ead9] sm:text-xl">
            {PROOF.founder.body}
          </p>
          <Link
            href={PROOF.founder.href}
            className="mt-6 inline-block text-[var(--dawn)] transition hover:translate-x-1"
          >
            {PROOF.founder.cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}
