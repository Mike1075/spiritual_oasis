"use client";
import { useLocale } from "next-intl";
import { PILLARS } from "@/data/academy";
import CourseCard from "@/components/academy/CourseCard";

export default function AcademyCatalog() {
  const locale = useLocale() as "zh" | "en";
  return (
    <div className="mx-auto max-w-7xl px-6 py-28">
      <h1 className="text-center text-4xl font-semibold text-white sm:text-5xl">
        {locale === "zh" ? "心灵大学" : "Academy"}
      </h1>
      {PILLARS.map((p) => (
        <section key={p.id} id={p.id} className="scroll-mt-24 pt-16">
          <h2 className="text-2xl font-semibold text-white">{locale === "zh" ? p.titleZh : p.titleEn}</h2>
          <p className="mt-2 text-white/60">{locale === "zh" ? p.descZh : p.descEn}</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.courses.map((c) => <CourseCard key={c.id} course={c} locale={locale} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
