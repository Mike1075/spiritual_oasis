"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { XIAOE_COURSE_URL } from "@/data/masLife";

// 早鸟截止：2026-06-18 23:59:59 (北京时间 UTC+8)
const EARLY_BIRD_DEADLINE = Date.UTC(2026, 5, 18, 15, 59, 59); // 18日23:59:59 CST = 15:59:59 UTC

function useCountdown(target: number) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return null;
  const diff = Math.max(0, target - now);
  return {
    expired: diff === 0,
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function EnrollBar() {
  const c = useCountdown(EARLY_BIRD_DEADLINE);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          {c && !c.expired ? (
            <p className="truncate text-sm text-gray-300">
              <span className="hidden sm:inline">早鸟价 </span>
              <b className="text-emerald-300">¥4980</b>
              <span className="mx-1.5 text-gray-500">·</span>
              距涨价还有
              <span className="ml-1.5 font-mono font-bold text-white">
                {c.d}天 {pad(c.h)}:{pad(c.m)}:{pad(c.s)}
              </span>
            </p>
          ) : (
            <p className="truncate text-sm text-gray-300">
              7/6 深圳夏令营 ·{" "}
              <b className="text-emerald-300">限 30 个名额</b>
            </p>
          )}
          <p className="hidden text-xs text-gray-500 sm:block">
            第一天学不会，100% 全额退款
          </p>
        </div>
        <a
          href={XIAOE_COURSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 to-emerald-400 px-5 py-2.5 text-sm font-bold text-white transition active:scale-95 sm:px-7 sm:text-base"
        >
          立即报名
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
