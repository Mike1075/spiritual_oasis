import type { Metadata } from "next";
import CourseDetailPage from "@/components/courses/CourseDetailPage";
import { canchan } from "@/data/courses/canchan";

export const metadata: Metadata = {
  title: `${canchan.title} · 心灵家园`,
  description: canchan.subtitle,
};

export default function Page() {
  return <CourseDetailPage data={canchan} />;
}
