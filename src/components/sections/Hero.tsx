"use client";

import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, Download } from "lucide-react";
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 每日壁纸直接显示（根据语言和日期自动切换） */}
      <div className="absolute inset-0">
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
      </div>

      {/* Download Button - Top Right */}
      <Link
        href="https://www.futuremind2075.com/seth365"
        target="_blank"
        className="absolute top-24 right-6 z-20 flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 shadow-2xl"
      >
        <Download size={18} />
        <span>{locale === 'zh' ? '下载壁纸' : 'Download Wallpapers'}</span>
      </Link>

      {/* Welcome Button - Bottom Right */}
      <Link
        href="/calendar"
        className="absolute bottom-20 right-8 z-20 group px-8 py-4 bg-gradient-to-r from-purple-600 to-emerald-500 hover:from-purple-700 hover:to-emerald-600 rounded-full text-white font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl"
      >
        <div className="text-center">
          <div className="flex items-center gap-2">
            <span>2026公益365天觉醒之旅欢迎你</span>
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </div>
          <p className="text-xs text-white/90 mt-1">
            终极自由之旅 · 生生不息公益陪伴
          </p>
        </div>
      </Link>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-white/60" size={32} />
      </div>
    </section>
  );
}
