import Link from "next/link";
import { NEEDS } from "@/data/wayHome";

export default function Needs() {
  return (
    <section className="warm-3 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif-sc text-3xl font-medium text-[var(--inkwarm)] sm:text-4xl">
            {NEEDS.heading}
          </h2>
          <p className="mt-4 text-[var(--inkwarm)]/70">{NEEDS.intro}</p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {NEEDS.groups.map((g) => {
            const inner = (
              <div className="rise flex h-full flex-col rounded-3xl bg-[#fbf6ec] p-7 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-md">
                <h3 className="font-serif-sc text-xl text-[var(--inkwarm)]">{g.want}</h3>
                <ul className="mt-4 flex-1 space-y-2">
                  {g.courses.map((c) => (
                    <li key={c} className="flex gap-2 text-sm leading-relaxed text-[var(--inkwarm)]/80">
                      <span className="text-[var(--ember)]">·</span>
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center justify-between">
                  <span className="rounded-full bg-[var(--ember)]/10 px-3 py-1 text-xs text-[var(--ember)]">
                    {g.note}
                  </span>
                  <span className="text-sm text-[var(--ember)]">{g.cta} →</span>
                </div>
              </div>
            );
            return g.external ? (
              <a key={g.want} href={g.href} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <Link key={g.want} href={g.href}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
