"use client";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getDailyWallpapers } from "@/lib/dailyContent";
import Link from "next/link";

export default function Hero() {
  const t = useTranslations("hero");
  const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(0);
  const wallpapers = getDailyWallpapers();

  // 背景图轮播（每5秒切换一次）
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWallpaperIndex((prev) => (prev + 1) % wallpapers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [wallpapers.length]);

  // 添加日志来调试
  useEffect(() => {
    console.log("Today's wallpapers:", wallpapers);
    console.log("Current index:", currentWallpaperIndex);
  }, [wallpapers, currentWallpaperIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 每日壁纸背景轮播 */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-indigo-900 to-black">
        {wallpapers.map((wallpaper, index) => (
          <div
            key={wallpaper}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentWallpaperIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${wallpaper})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* 如果图片加载失败，会显示背景渐变色 */}
          </div>
        ))}

        {/* 轻微遮罩层 */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content - 简洁的进入按钮 */}
      <div className="relative z-10 text-center px-4">
        <Link
          href="/academy"
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
