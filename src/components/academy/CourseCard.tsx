import Link from "next/link";
import type { Course } from "@/data/academy";

const FORMAT_LABEL: Record<Course["format"], { zh: string; en: string }> = {
  online: { zh: "线上", en: "Online" },
  retreat: { zh: "线下闭关", en: "Retreat" },
  app: { zh: "应用", en: "App" },
  service: { zh: "陪伴", en: "Service" },
};

export default function CourseCard({ course, locale }: { course: Course; locale: "zh" | "en" }) {
  const title = locale === "zh" ? course.titleZh : course.titleEn;
  const blurb = locale === "zh" ? course.blurbZh : course.blurbEn;
  const fmt = FORMAT_LABEL[course.format][locale];
  const inner = (
    <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition hover:border-white/25 hover:bg-white/[0.06]">
      <div className="mb-3 flex items-center gap-2 text-xs text-white/50">
        <span className="rounded-full border border-white/15 px-2 py-0.5">{fmt}</span>
        {course.recruiting && <span className="rounded-full bg-amber-300/20 px-2 py-0.5 text-amber-200">{locale === "zh" ? "在招" : "Recruiting"}</span>}
      </div>
      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/60">{blurb}</p>
      <span className="mt-4 inline-block text-sm text-emerald-300 group-hover:translate-x-1 transition">
        {locale === "zh" ? "了解 →" : "Learn more →"}
      </span>
    </div>
  );
  return course.external ? (
    <a href={course.href} target="_blank" rel="noopener noreferrer">{inner}</a>
  ) : (
    <Link href={course.href}>{inner}</Link>
  );
}
