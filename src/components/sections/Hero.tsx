"use client";

import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, Download, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";
import { getHeroSlides } from "@/lib/dailyContent";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = getHeroSlides(locale);

  // 背景图轮播（每8秒切换一次，2张图片）
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* 壁纸按 16:9 完整显示（不裁切、不超界），高度随宽度自适应、上限 92svh */}
      <div className="relative mx-auto w-full aspect-[16/9] max-h-[92svh]">
        {slides.map((slide, index) => (
          <img
            key={slide}
            src={slide}
            alt={`Daily wallpaper ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentSlideIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* 轻微遮罩层 */}
        <div className="absolute inset-0 bg-black/30" />

        {/* MAS-Life 报名 Button - Top Left */}
        <Link
          href="/mas-life"
          className="absolute left-3 top-20 z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-emerald-500 px-3 py-2 text-xs font-medium text-white shadow-2xl transition-all duration-300 hover:scale-105 sm:left-6 sm:top-24 sm:gap-2 sm:px-5 sm:py-3 sm:text-base"
        >
          <GraduationCap className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />
          <span>{locale === "zh" ? "课程报名" : "Enroll Now"}</span>
        </Link>

        {/* Download Button - Top Right */}
        <Link
          href="https://www.futuremind2075.com/seth365"
          target="_blank"
          className="absolute right-3 top-20 z-20 flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-2 text-xs font-medium text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-purple-700 sm:right-6 sm:top-24 sm:gap-2 sm:px-5 sm:py-3 sm:text-base"
        >
          <Download className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" />
          <span>{locale === "zh" ? "下载壁纸" : "Wallpapers"}</span>
        </Link>

        {/* Welcome Button - Bottom Right */}
        <Link
          href="/calendar"
          className="group absolute bottom-3 right-3 z-20 rounded-full bg-gradient-to-r from-purple-600 to-emerald-500 px-4 py-2.5 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-emerald-600 sm:bottom-8 sm:right-8 sm:px-8 sm:py-4"
        >
          <div className="text-center">
            <div className="flex items-center gap-2 text-sm font-bold sm:text-lg">
              <span>2026公益365天觉醒之旅</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
            <p className="mt-0.5 hidden text-xs text-white/90 sm:block">
              终极自由之旅 · 生生不息公益陪伴
            </p>
          </div>
        </Link>

        {/* Scroll indicator */}
        <div className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 animate-bounce sm:block">
          <ChevronDown className="text-white/60" size={32} />
        </div>
      </div>
    </section>
  );
}
