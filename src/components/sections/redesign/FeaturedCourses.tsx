"use client";
import { useLocale } from "next-intl";
import { PILLARS } from "@/data/academy";
import CourseCard from "@/components/academy/CourseCard";

export default function FeaturedCourses() {
  const locale = useLocale() as "zh" | "en";
  const featured = PILLARS.flatMap((p) => p.courses).filter((c) => c.recruiting);
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="mb-8 text-center text-3xl font-semibold text-white">
        {locale === "zh" ? "正在招生" : "Now Enrolling"}
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((c) => <CourseCard key={c.id} course={c} locale={locale} />)}
      </div>
    </section>
  );
}
