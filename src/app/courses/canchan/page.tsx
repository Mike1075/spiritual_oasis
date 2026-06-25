import type { Metadata } from "next";
import CourseDetailPage from "@/components/courses/CourseDetailPage";
import SessionEnrollBox from "@/components/courses/SessionEnrollBox";
import { canchan } from "@/data/courses/canchan";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${canchan.title} · 心灵家园`,
  description: canchan.subtitle,
};

export default function Page() {
  return (
    <>
      <CourseDetailPage data={canchan} />
      <div className="mx-auto max-w-3xl px-6 pb-16">
        <SessionEnrollBox productKey="canchan" />
      </div>
    </>
  );
}
