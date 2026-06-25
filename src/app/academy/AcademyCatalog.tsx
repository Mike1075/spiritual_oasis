"use client";
import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { PILLARS, type Course, type CourseFormat } from "@/data/academy";
import CourseCard from "@/components/academy/CourseCard";

// 形式筛选项（顺序固定）
const FILTERS: { id: CourseFormat | "all"; zh: string; en: string }[] = [
  { id: "all", zh: "全部", en: "All" },
  { id: "retreat", zh: "线下闭关", en: "Retreat" },
  { id: "camp", zh: "训练营", en: "Camp" },
  { id: "video", zh: "录播课", en: "On-demand" },
  { id: "live", zh: "直播", en: "Live" },
  { id: "reading", zh: "共修", en: "Group" },
  { id: "app", zh: "应用工具", en: "App" },
  { id: "service", zh: "陪伴", en: "Service" },
];

export default function AcademyCatalog() {
  const locale = useLocale() as "zh" | "en";
  const [fmt, setFmt] = useState<CourseFormat | "all">("all");

  const match = useMemo(
    () => (c: Course) => fmt === "all" || c.format === fmt,
    [fmt],
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-28">
      <h1 className="text-center text-4xl font-semibold text-white sm:text-5xl">
        {locale === "zh" ? "心灵大学" : "Academy"}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-center text-white/60">
        {locale === "zh"
          ? "面向未来的教育、心灵成长与日常陪伴——一处找到属于你的那门课。"
          : "Future-ready education, inner growth and daily companionship — find your course here."}
      </p>

      {/* 形式筛选条 */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFmt(f.id)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              fmt === f.id
                ? "border-amber-300/60 bg-amber-300/15 text-amber-200"
                : "border-white/15 text-white/60 hover:border-white/30 hover:text-white/80"
            }`}
          >
            {locale === "zh" ? f.zh : f.en}
          </button>
        ))}
      </div>

      {PILLARS.map((p) => {
        const visible = p.courses.filter(match);
        if (visible.length === 0) return null;
        return (
          <section key={p.id} id={p.id} className="scroll-mt-24 pt-16">
            <h2 className="text-2xl font-semibold text-white">
              {locale === "zh" ? p.titleZh : p.titleEn}
            </h2>
            <p className="mt-2 text-white/60">{locale === "zh" ? p.descZh : p.descEn}</p>

            {p.subgroups && p.subgroups.length > 0 ? (
              // 有二级小组：按小组分小节
              p.subgroups.map((sg) => {
                const inGroup = visible.filter((c) => c.subgroup === sg.id);
                if (inGroup.length === 0) return null;
                return (
                  <div key={sg.id} className="mt-10">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-amber-200/80">
                      {locale === "zh" ? sg.titleZh : sg.titleEn}
                    </h3>
                    <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {inGroup.map((c) => (
                        <CourseCard key={c.id} course={c} locale={locale} />
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((c) => (
                  <CourseCard key={c.id} course={c} locale={locale} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
