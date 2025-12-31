"use client";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getHeroSlides } from "@/lib/dailyContent";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations("hero");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = getHeroSlides();

  // 背景图轮播（每6秒切换一次）
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* PDF幻灯片背景轮播 */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black">
        {slides.map((slide, index) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlideIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}

        {/* 轻微遮罩层 */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content - 简洁的进入按钮 */}
      <div className="relative z-10 text-center px-4">
        <Link
          href="/calendar"
          className="group inline-flex items-center gap-3 px-12 py-6 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-full text-white font-medium text-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 shadow-2xl"
        >
          <span>进入 365 课程</span>
          <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
        </Link>

        {/* 小标题 */}
        <p className="mt-6 text-white/80 text-sm md:text-base">
          2026年 · 终极自由之旅 · 生生不息公益陪伴
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-gray-400" size={32} />
      </div>
    </section>
  );
}
