"use client";

import { ArrowRight } from "lucide-react";
import { XIAOE_COURSE_URL } from "@/data/masLife";

export default function EnrollBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--os-line)] bg-[color:var(--os-bg)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-sm text-[color:var(--os-dim)]">
            <span className="hidden sm:inline">学费 </span>
            <b className="os-mono text-[color:var(--os-you)]">¥6980</b>
            <span className="mx-1.5 text-[color:var(--os-faint)]">·</span>
            深 / 京 / 沪线下各限{" "}
            <b className="text-[color:var(--os-text)]">50 席</b> · 线上全球可报
          </p>
          <p className="os-mono hidden text-xs text-[color:var(--os-faint)] sm:block">
            第一天学不会，100% 全额退款
          </p>
        </div>
        <a
          href={XIAOE_COURSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="os-btn os-btn-you shrink-0 px-5 py-2.5 text-sm sm:px-7 sm:text-base"
        >
          立即报名
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
