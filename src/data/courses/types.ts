export type CourseSection = { heading: string; body: string[] };
export type CourseFaq = { q: string; a: string };

export type CourseDetailData = {
  id: string;
  leadSource: string; // 传给 LeadForm 的唯一来源标识
  pillar: string; // 'growth' | 'companion' 等
  title: string;
  subtitle: string;
  intro: string[]; // 开篇段落
  forWhom: string[]; // 适合谁
  experience: string[]; // 你会经历什么
  schedule?: CourseSection[]; // 节律/安排（概述，非逐字内部作息）
  notes?: string[]; // 注意事项
  faq?: CourseFaq[];
  cta?: { label: string; href: string; external?: boolean }; // 额外 CTA（如 365 → /calendar）
};

export function validateCourseDetail(d: CourseDetailData): string[] {
  const errs: string[] = [];
  const need: (keyof CourseDetailData)[] = [
    "id",
    "leadSource",
    "pillar",
    "title",
    "subtitle",
  ];
  for (const k of need) {
    if (!d[k] || typeof d[k] !== "string") errs.push(`missing ${k}`);
  }
  if (!d.intro?.length) errs.push("intro empty");
  if (!d.forWhom?.length) errs.push("forWhom empty");
  if (!d.experience?.length) errs.push("experience empty");
  return errs;
}
