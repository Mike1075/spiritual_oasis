import type { Metadata } from "next";
import CourseDetailPage from "@/components/courses/CourseDetailPage";
import { companion365 } from "@/data/courses/companion365";

export const metadata: Metadata = {
  title: `${companion365.title} · 心灵家园`,
  description: companion365.subtitle,
};

export default function Page() {
  return <CourseDetailPage data={companion365} />;
}
