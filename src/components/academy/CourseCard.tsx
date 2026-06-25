"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/data/academy";

export function hasCover(cover?: string): boolean {
  return !!cover && cover.startsWith("/images/");
}

const FORMAT_LABEL: Record<Course["format"], { zh: string; en: string }> = {
  online: { zh: "线上", en: "Online" },
  retreat: { zh: "线下闭关", en: "Retreat" },
  app: { zh: "应用", en: "App" },
  service: { zh: "陪伴", en: "Service" },
  video: { zh: "录播课", en: "On-demand" },
  live: { zh: "直播", en: "Live" },
  camp: { zh: "训练营", en: "Camp" },
  reading: { zh: "共修", en: "Group" },
};

// 分 → 人民币展示串（整数不带小数；¥9.9 这类保留有效小数）
function yuan(fen?: number): string | null {
  if (fen == null) return null;
  const y = fen / 100;
  return Number.isInteger(y) ? `¥${y}` : `¥${y.toFixed(2).replace(/0+$/, "").replace(/\.$/, "")}`;
}

export default function CourseCard({ course, locale }: { course: Course; locale: "zh" | "en" }) {
  const [imgError, setImgError] = useState(false);
  const title = locale === "zh" ? course.titleZh : course.titleEn;
  const blurb = locale === "zh" ? course.blurbZh : course.blurbEn;
  const fmt = FORMAT_LABEL[course.format][locale];
  const duration = locale === "zh" ? course.durationLabelZh : course.durationLabelEn;

  const price = yuan(course.priceFen);
  const original =
    course.originalPriceFen && course.originalPriceFen > (course.priceFen ?? 0)
      ? yuan(course.originalPriceFen)
      : null;

  // CTA 文案：付费课(小鹅通)→前往购买；内部课→了解/报名；外部应用→了解
  const cta =
    course.source === "xiaoe"
      ? locale === "zh"
        ? "前往购买 →"
        : "Enroll →"
      : course.recruiting
        ? locale === "zh"
          ? "了解报名 →"
          : "Learn & enroll →"
        : locale === "zh"
          ? "了解 →"
          : "Learn more →";

  const inner = (
    <div className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition hover:border-white/25 hover:bg-white/[0.06]">
      <div className="mb-4 aspect-[16/10] overflow-hidden rounded-xl">
        {hasCover(course.cover) && !imgError ? (
          <Image
            src={course.cover}
            alt={title}
            width={480}
            height={300}
            className="h-full w-full object-cover transition group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-amber-300/20 to-emerald-400/20" />
        )}
      </div>

      {/* 徽章行：形式 / 时长 / 在招 */}
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-white/50">
        <span className="rounded-full border border-white/15 px-2 py-0.5">{fmt}</span>
        {duration && <span className="rounded-full border border-white/15 px-2 py-0.5">{duration}</span>}
        {course.recruiting && (
          <span className="rounded-full bg-amber-300/20 px-2 py-0.5 text-amber-200">
            {locale === "zh" ? "在招" : "Recruiting"}
          </span>
        )}
      </div>

      <h3 className="text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/60">{blurb}</p>

      {/* 价格行 */}
      {price && (
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-xl font-semibold text-amber-300">{price}</span>
          {original && <span className="text-sm text-white/35 line-through">{original}</span>}
          {course.salesCount != null && (
            <span className="ml-auto text-xs text-white/40">
              {locale === "zh" ? `已报名 ${course.salesCount}` : `${course.salesCount} enrolled`}
            </span>
          )}
        </div>
      )}

      <span className="mt-4 inline-block text-sm text-emerald-300 transition group-hover:translate-x-1">
        {cta}
      </span>
    </div>
  );

  return course.external ? (
    <a href={course.href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={course.href}>{inner}</Link>
  );
}
