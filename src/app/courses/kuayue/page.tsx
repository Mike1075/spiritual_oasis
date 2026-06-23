import type { Metadata } from "next";
import CourseDetailPage from "@/components/courses/CourseDetailPage";
import { kuayue } from "@/data/courses/kuayue";

export const metadata: Metadata = {
  title: `${kuayue.title} · 心灵家园`,
  description: kuayue.subtitle,
};

export default function Page() {
  return <CourseDetailPage data={kuayue} />;
}
