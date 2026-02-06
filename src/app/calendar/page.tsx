"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, Calendar, BookOpen, Star, Sparkles, Lock } from "lucide-react";
import Link from "next/link";
import { monthsData, quarters, getQuarterByMonth } from "@/data/courses2026";

export default function CalendarPage() {
  const t = useTranslations("calendar");
  const locale = useLocale();
  const [currentMonth, setCurrentMonth] = useState(1);

  const monthData = monthsData.find(m => m.month === currentMonth);
  const quarterData = getQuarterByMonth(currentMonth);

  // Hero 轮播图片配置（来自 Supabase Storage）
  const SUPABASE_URL = "https://grgrnqlgufgahsstoawz.supabase.co";
  const heroSlidesConfig: Record<number, { folder: string; prefix: string; count: number }> = {
    2: { folder: "february", prefix: "feb", count: 28 },
    3: { folder: "march", prefix: "mar", count: 27 },
    4: { folder: "april", prefix: "apr", count: 28 },
  };

  const slideConfig = heroSlidesConfig[currentMonth];
  const heroSlides = slideConfig
    ? Array.from({ length: slideConfig.count }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        return `${SUPABASE_URL}/storage/v1/object/public/course-slides/${slideConfig.folder}/${slideConfig.prefix}-${num}.jpg`;
      })
    : [];

  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const interval = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentMonth, heroSlides.length]);

  // 切换月份时重置轮播索引
  useEffect(() => {
    setHeroSlideIndex(0);
  }, [currentMonth]);

  const getDaysInMonth = (month: number, year: number = 2026) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number = 2026) => {
    return new Date(year, month - 1, 1).getDay();
  };

  // 检查日期是否已解锁（是否 <= 今天）
  const isDateUnlocked = (year: number, month: number, day: number) => {
    const targetDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    return targetDate <= today;
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  const weekDays = locale === 'zh'
    ? ['日', '一', '二', '三', '四', '五', '六']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthNames = {
    zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  const getLesson = (day: number) => {
    const dateStr = `2026-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return monthData?.lessons.find(l => l.date === dateStr);
  };

  const prevMonth = () => {
    setCurrentMonth(prev => prev > 1 ? prev - 1 : 12);
  };

  const nextMonth = () => {
    setCurrentMonth(prev => prev < 12 ? prev + 1 : 1);
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      {heroSlides.length > 0 ? (
        <section className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: '16/9', maxHeight: '70vh' }}>
          {/* 课程图片轮播 */}
          {heroSlides.map((slide, index) => (
            <img
              key={slide}
              src={slide}
              alt={`${monthNames[locale as 'zh' | 'en'][currentMonth - 1]} - ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
                index === heroSlideIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* 轮播指示器 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setHeroSlideIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === heroSlideIndex
                    ? "bg-purple-400 w-6"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          {/* 左右切换按钮 */}
          <button
            onClick={() => setHeroSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>
          {/* 页码标签 */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1.5 bg-black/50 rounded-full text-white text-sm backdrop-blur-sm">
            {heroSlideIndex + 1} / {heroSlides.length}
          </div>
        </section>
      ) : (
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-300 text-sm mb-6">
                <Calendar size={16} />
                <span>2026 {locale === 'zh' ? '公益陪伴计划' : 'Public Welfare Program'}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  {locale === 'zh' ? '365天觉醒之旅' : '365-Day Awakening Journey'}
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                {locale === 'zh'
                  ? '基于《灵魂永生》的全年心灵成长课程，每天一个主题，带你重新认识自己'
                  : 'A year-long spiritual growth course based on "Seth Speaks", with daily themes to help you rediscover yourself'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Quarter & Month Theme */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 rounded-3xl p-6 md:p-8 border border-purple-500/20 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-purple-500/30 rounded-full text-purple-300 text-sm">
                    Q{quarterData?.quarter} - {locale === 'zh' ? quarterData?.themeZh : quarterData?.themeEn}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {locale === 'zh' ? monthData?.themeZh : monthData?.themeEn}
                </h2>
                <p className="text-gray-400 mt-1">
                  {locale === 'zh' ? monthData?.subtitleZh : monthData?.subtitleEn}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {locale === 'zh' ? '学习内容' : 'Source'}
                </p>
                <p className="text-emerald-400">
                  {locale === 'zh' ? monthData?.sourceZh : monthData?.sourceEn}
                </p>
              </div>
            </div>

            {/* Monthly Goals */}
            {monthData?.goals && monthData.goals.length > 0 && (
              <div className="border-t border-gray-700/50 pt-4">
                <h3 className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                  <Star size={14} className="text-yellow-500" />
                  {locale === 'zh' ? '本月目标' : 'Monthly Goals'}
                </h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {monthData.goals.map((goal, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <Sparkles size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{locale === 'zh' ? goal.zh : goal.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Calendar Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-300"
            >
              <ChevronLeft size={20} />
              <span className="hidden sm:inline">{locale === 'zh' ? '上月' : 'Previous'}</span>
            </button>

            <h2 className="text-2xl font-bold text-white">
              {monthNames[locale as 'zh' | 'en'][currentMonth - 1]} 2026
            </h2>

            <button
              onClick={nextMonth}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-gray-300"
            >
              <span className="hidden sm:inline">{locale === 'zh' ? '下月' : 'Next'}</span>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Month Quick Select */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {quarters.map(q => (
              <div key={q.quarter} className="flex gap-1">
                {q.months.map(m => (
                  <button
                    key={m}
                    onClick={() => setCurrentMonth(m)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                      currentMonth === m
                        ? 'bg-gradient-to-br from-purple-500 to-emerald-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Calendar */}
          <div className="bg-gray-900/50 rounded-3xl p-4 md:p-6 border border-gray-800">
            {/* Week days header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className={`text-center text-sm font-medium py-2 ${
                    index === 0 || index === 6 ? 'text-purple-400' : 'text-gray-500'
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before the first of the month */}
              {Array.from({ length: firstDay }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {/* Actual days */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const lesson = getLesson(day);
                const dateStr = `2026-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayOfWeek = (firstDay + index) % 7;
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                const isUnlocked = isDateUnlocked(2026, currentMonth, day);

                // 有课程且已解锁
                if (lesson && isUnlocked) {
                  return (
                    <Link
                      key={day}
                      href={`/calendar/${dateStr}`}
                      className="aspect-square bg-gradient-to-br from-purple-500/20 to-emerald-500/20 hover:from-purple-500/40 hover:to-emerald-500/40 rounded-xl border border-purple-500/30 hover:border-purple-500 transition-all flex flex-col items-center justify-center p-1 group relative"
                    >
                      <span className={`text-lg font-bold ${isWeekend ? 'text-purple-300' : 'text-white'}`}>
                        {day}
                      </span>
                      {lesson.special && (
                        <Star size={12} className="text-yellow-500 absolute top-1 right-1" />
                      )}
                      <span className="text-[10px] text-gray-400 text-center line-clamp-2 hidden sm:block group-hover:text-emerald-300 transition-colors">
                        {locale === 'zh' ? lesson.titleZh.slice(0, 6) : lesson.titleEn.slice(0, 10)}...
                      </span>
                    </Link>
                  );
                }

                // 有课程但未解锁
                if (lesson && !isUnlocked) {
                  return (
                    <div
                      key={day}
                      className="aspect-square bg-gray-800/30 rounded-xl border border-gray-700/30 flex flex-col items-center justify-center p-1 opacity-60 cursor-not-allowed relative"
                    >
                      <Lock size={12} className="text-gray-500 absolute top-1 right-1" />
                      <span className={`text-lg font-bold ${isWeekend ? 'text-purple-300/40' : 'text-gray-500'}`}>
                        {day}
                      </span>
                      <span className="text-[10px] text-gray-600 hidden sm:block">
                        {locale === 'zh' ? '未解锁' : 'Locked'}
                      </span>
                    </div>
                  );
                }

                // 没有课程
                return (
                  <div
                    key={day}
                    className="aspect-square bg-gray-800/50 rounded-xl border border-gray-700/50 flex flex-col items-center justify-center p-1 opacity-50"
                  >
                    <span className={`text-lg font-bold ${isWeekend ? 'text-purple-300/50' : 'text-gray-500'}`}>
                      {day}
                    </span>
                    <span className="text-[10px] text-gray-600 hidden sm:block">
                      {locale === 'zh' ? '即将上线' : 'Coming'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-purple-500/20 to-emerald-500/20 border border-purple-500/30" />
              <span className="text-gray-400">{locale === 'zh' ? '已解锁' : 'Unlocked'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={14} className="text-gray-500" />
              <span className="text-gray-400">{locale === 'zh' ? '未解锁' : 'Locked'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-800/50 border border-gray-700/50" />
              <span className="text-gray-400">{locale === 'zh' ? '即将上线' : 'Coming Soon'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={14} className="text-yellow-500" />
              <span className="text-gray-400">{locale === 'zh' ? '特别日' : 'Special Day'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800">
            <BookOpen className="mx-auto text-purple-400 mb-4" size={40} />
            <h2 className="text-2xl font-bold text-white mb-4">
              {locale === 'zh' ? '开始你的觉醒之旅' : 'Begin Your Awakening Journey'}
            </h2>
            <p className="text-gray-400 mb-6">
              {locale === 'zh'
                ? '每天花10分钟，跟随赛斯的智慧，一步步唤醒内在的力量'
                : 'Spend 10 minutes daily, follow Seth\'s wisdom to gradually awaken your inner power'}
            </p>
            <Link
              href="/calendar/2026-01-01"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full text-white font-medium text-lg hover:scale-105 transition-transform"
            >
              {locale === 'zh' ? '从第一天开始' : 'Start from Day 1'}
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
