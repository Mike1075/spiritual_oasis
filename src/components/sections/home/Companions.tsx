import Link from "next/link";
import { COMPANIONS } from "@/data/wayHome";

export default function Companions() {
  return (
    <section className="warm-2 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif-sc text-3xl font-medium sm:text-4xl">{COMPANIONS.heading}</h2>
          <p className="mt-4 text-[#f3ead9]/80">{COMPANIONS.intro}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {COMPANIONS.items.map((c) => {
            const inner = (
              <div className="rise h-full rounded-2xl border border-[var(--dawn)]/20 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-[var(--dawn)]/45 hover:bg-white/[0.07]">
                <h3 className="font-serif-sc text-lg text-[#fbf3e4]">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#f3ead9]/75">{c.body}</p>
              </div>
            );
            return c.external ? (
              <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <Link key={c.title} href={c.href}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
