"use client";

import { useTranslations, useLocale } from "next-intl";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { getDailyLesson, getDailyWallpapers } from "@/lib/dailyContent";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const [isBreathing, setIsBreathing] = useState(false);
  const [currentWallpaperIndex, setCurrentWallpaperIndex] = useState(0);

  // 获取今天的课程数据
  const todayLesson = getDailyLesson();
  const wallpapers = getDailyWallpapers();

  // 背景图轮播（每8秒切换一次）
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWallpaperIndex((prev) => (prev + 1) % wallpapers.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [wallpapers.length]);

  // Breathing animation on mouse hold
  const handleMouseDown = () => setIsBreathing(true);
  const handleMouseUp = () => setIsBreathing(false);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* 每日壁纸背景轮播 */}
      <div className="absolute inset-0">
        {wallpapers.map((wallpaper, index) => (
          <div
            key={wallpaper}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentWallpaperIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${wallpaper})`,
            }}
          />
        ))}

        {/* 深色遮罩层，确保文字可读 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        {/* Aurora呼吸效果 */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isBreathing ? "opacity-30" : "opacity-0"
          }`}
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-float" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-float" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* 2026年全年主题 */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl text-emerald-400 font-light mb-2">
            2026年 终极自由之旅 · 生生不息公益陪伴
          </h2>
          <p className="text-sm md:text-base text-gray-400">
            Ultimate Freedom Journey 2026 · Eternal Companion
          </p>
        </div>

        {/* 今日主题 */}
        {todayLesson ? (
          <>
            <h1
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-transform duration-1000 ${
                isBreathing ? "scale-105" : "scale-100"
              }`}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-emerald-400 bg-clip-text text-transparent">
                {locale === 'zh' ? todayLesson.titleZh : todayLesson.titleEn}
              </span>
            </h1>

            {/* 今日引用 */}
            <blockquote className="text-lg md:text-xl lg:text-2xl text-white/90 font-light mb-8 leading-relaxed italic border-l-4 border-emerald-400 pl-6 max-w-3xl mx-auto text-left">
              {locale === 'zh' ? todayLesson.quoteZh : todayLesson.quoteEn}
            </blockquote>

            {/* 今日内容 */}
            <p className="text-base md:text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
              {locale === 'zh' ? todayLesson.contentZh : todayLesson.contentEn}
            </p>

            {/* 今日行动 */}
            {todayLesson.actionZh && (
              <div className="mb-8 max-w-3xl mx-auto">
                <p className="text-sm md:text-base text-emerald-300 font-medium">
                  💫 {locale === 'zh' ? '今日行动' : 'Today\'s Action'}
                </p>
                <p className="text-sm md:text-base text-gray-200 mt-2">
                  {locale === 'zh' ? todayLesson.actionZh : todayLesson.actionEn}
                </p>
              </div>
            )}

            {/* 特殊日子标记 */}
            {todayLesson.special && (
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-500/20 to-emerald-500/20 rounded-full border border-white/10 text-white/90">
                  🎉 {todayLesson.special}
                </span>
              </div>
            )}
          </>
        ) : (
          <>
            {/* 备用内容（如果没有找到今日课程） */}
            <h1
              className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-4 transition-transform duration-1000 ${
                isBreathing ? "scale-105" : "scale-100"
              }`}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-emerald-400 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-6">{t("subtitle")}</p>

            <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light mb-6 leading-relaxed">
              {t("slogan")}
            </p>

            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              {t("description")}
            </p>
          </>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#plan2026"
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full text-white font-medium text-lg overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10">{t("cta")}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <span className="text-emerald-400 text-sm">{t("ctaFree")}</span>
        </div>

        {/* Breathing hint */}
        <p className="mt-12 text-gray-500 text-sm animate-pulse">
          长按屏幕，深呼吸... / Hold to breathe...
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-gray-400" size={32} />
      </div>
    </section>
  );
}
