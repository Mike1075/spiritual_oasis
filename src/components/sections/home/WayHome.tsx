import Link from "next/link";
import { WAY } from "@/data/wayHome";

export default function WayHome() {
  return (
    <section id="way" className="warm-1 scroll-mt-20 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="font-serif-sc text-3xl font-medium sm:text-4xl">{WAY.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-[#ece2d2]/80">{WAY.intro}</p>
        </div>

        {/* 上升的路：一条贯穿的光线 + 四个驿站 */}
        <ol className="relative mt-16 space-y-12 border-l border-[var(--dawn)]/25 pl-8 sm:pl-12">
          {WAY.stages.map((s) => {
            const inner = (
              <>
                <span className="text-sm tracking-widest text-[var(--dawn)]">{s.stage}</span>
                <h3 className="mt-2 font-serif-sc text-2xl font-medium text-[#fbf3e4]">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-[#f3ead9]/80">{s.body}</p>
                <span className="mt-5 inline-block text-[var(--dawn)] transition group-hover:translate-x-1">
                  {s.cta} →
                </span>
              </>
            );
            return (
              <li key={s.n} className="rise relative">
                {/* 驿站节点 */}
                <span className="absolute -left-[41px] flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[var(--dawn)] to-[var(--ember)] font-serif-sc text-sm text-[#1a1206] sm:-left-[57px]">
                  {s.n}
                </span>
                {s.external ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="group block">
                    {inner}
                  </a>
                ) : (
                  <Link href={s.href} className="group block">
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
