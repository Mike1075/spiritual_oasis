import Link from "next/link";
import { PATH } from "@/data/home";

export default function PathToClarity() {
  return (
    <section className="warm-2 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif-sc text-3xl font-medium sm:text-4xl">{PATH.heading}</h2>
          <p className="mt-4 text-[#f3ead9]/80">{PATH.intro}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PATH.steps.map((s) => (
            <div
              key={s.tag}
              className="rise flex flex-col rounded-3xl border border-[var(--dawn)]/20 bg-white/[0.04] p-8 backdrop-blur-sm"
            >
              <span className="font-serif-sc text-2xl text-[var(--dawn)]">{s.tag}</span>
              <h3 className="mt-3 text-lg font-medium text-[#fbf3e4]">{s.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-[#f3ead9]/75">{s.body}</p>
              <Link
                href={s.href}
                className="mt-6 inline-block text-[var(--dawn)] transition hover:translate-x-1"
              >
                {s.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
