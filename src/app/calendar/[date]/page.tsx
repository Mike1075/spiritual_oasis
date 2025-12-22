"use client";

import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Quote,
  BookOpen,
  Lightbulb,
  Star,
  Share2,
  Home
} from "lucide-react";
import { getLessonByDate, getMonthData, monthsData } from "@/data/courses2026";

export default function LessonPage() {
  const params = useParams();
  const locale = useLocale();
  const dateStr = params.date as string;

  const lesson = getLessonByDate(dateStr);

  // Parse date
  const [year, month, day] = dateStr.split('-').map(Number);
  const monthData = getMonthData(month);

  // Get previous and next dates
  const currentDate = new Date(year, month - 1, day);
  const prevDate = new Date(currentDate);
  prevDate.setDate(prevDate.getDate() - 1);
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + 1);

  const formatDateStr = (d: Date) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const prevDateStr = formatDateStr(prevDate);
  const nextDateStr = formatDateStr(nextDate);

  // Check if prev/next lessons exist
  const prevLesson = prevDate.getFullYear() === 2026 ? getLessonByDate(prevDateStr) : null;
  const nextLesson = nextDate.getFullYear() === 2026 ? getLessonByDate(nextDateStr) : null;

  const weekDayNames = {
    zh: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  };

  const monthNames = {
    zh: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  const dayOfWeek = currentDate.getDay();

  if (!lesson) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center p-8">
          <Calendar className="mx-auto text-gray-600 mb-4" size={64} />
          <h1 className="text-2xl font-bold text-white mb-4">
            {locale === 'zh' ? '课程即将上线' : 'Lesson Coming Soon'}
          </h1>
          <p className="text-gray-400 mb-6">
            {locale === 'zh'
              ? `${dateStr} 的课程内容正在准备中，请稍后再来。`
              : `The lesson for ${dateStr} is being prepared. Please check back later.`}
          </p>
          <Link
            href="/calendar"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white transition-colors"
          >
            <Home size={18} />
            {locale === 'zh' ? '返回日历' : 'Back to Calendar'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header */}
      <section className="py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-purple-400 transition-colors">
              {locale === 'zh' ? '首页' : 'Home'}
            </Link>
            <ChevronRight size={14} />
            <Link href="/calendar" className="hover:text-purple-400 transition-colors">
              {locale === 'zh' ? '课程日历' : 'Calendar'}
            </Link>
            <ChevronRight size={14} />
            <span className="text-purple-400">{dateStr}</span>
          </div>

          {/* Date & Month Theme */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm">
                  {monthNames[locale as 'zh' | 'en'][month - 1]}
                </span>
                <span className="px-3 py-1 bg-emerald-500/20 rounded-full text-emerald-300 text-sm">
                  {locale === 'zh' ? monthData?.themeZh : monthData?.themeEn}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold bg-gradient-to-br from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  {day}
                </div>
                <div>
                  <p className="text-lg text-gray-400">
                    {weekDayNames[locale as 'zh' | 'en'][dayOfWeek]}
                  </p>
                  <p className="text-sm text-gray-500">
                    {locale === 'zh' ? `第${day}天` : `Day ${day}`}
                  </p>
                </div>
              </div>
            </div>

            {lesson.special && (
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-full">
                <Star className="text-yellow-500" size={16} />
                <span className="text-yellow-300 text-sm">{lesson.special}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 rounded-3xl p-6 md:p-8 border border-purple-500/20 mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {locale === 'zh' ? lesson.titleZh : lesson.titleEn}
            </h1>
            <p className="text-gray-400">
              {locale === 'zh' ? lesson.titleEn : lesson.titleZh}
            </p>
          </div>

          {/* Quote */}
          <div className="bg-gray-900/50 rounded-3xl p-6 md:p-8 border border-gray-800 mb-8">
            <div className="flex items-start gap-4">
              <Quote className="text-purple-400 flex-shrink-0 mt-1" size={32} />
              <div>
                <blockquote className="text-lg md:text-xl text-white leading-relaxed mb-4 italic">
                  "{locale === 'zh' ? lesson.quoteZh : lesson.quoteEn}"
                </blockquote>
                <p className="text-gray-500 text-sm">
                  — {locale === 'zh' ? '赛斯' : 'Seth'}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-gray-900/50 rounded-3xl p-6 md:p-8 border border-gray-800 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-emerald-400" size={24} />
              <h2 className="text-xl font-bold text-white">
                {locale === 'zh' ? '今日主题' : 'Today\'s Theme'}
              </h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              {locale === 'zh' ? lesson.contentZh : lesson.contentEn}
            </p>
            {/* Show translation */}
            <p className="text-gray-500 mt-4 text-sm">
              {locale === 'zh' ? lesson.contentEn : lesson.contentZh}
            </p>
          </div>

          {/* Action */}
          {lesson.actionZh && (
            <div className="bg-gradient-to-r from-purple-900/50 to-emerald-900/50 rounded-3xl p-6 md:p-8 border border-purple-500/30 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-yellow-400" size={24} />
                <h2 className="text-xl font-bold text-white">
                  {locale === 'zh' ? '今日练习' : 'Today\'s Practice'}
                </h2>
              </div>
              <p className="text-gray-200 text-lg leading-relaxed">
                {locale === 'zh' ? lesson.actionZh : lesson.actionEn}
              </p>
              {/* Show translation */}
              <p className="text-gray-500 mt-4 text-sm">
                {locale === 'zh' ? lesson.actionEn : lesson.actionZh}
              </p>
            </div>
          )}

          {/* Share */}
          <div className="flex justify-center mb-8">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: locale === 'zh' ? lesson.titleZh : lesson.titleEn,
                    text: locale === 'zh' ? lesson.quoteZh : lesson.quoteEn,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert(locale === 'zh' ? '链接已复制' : 'Link copied');
                }
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 transition-colors"
            >
              <Share2 size={18} />
              {locale === 'zh' ? '分享今日课程' : 'Share Today\'s Lesson'}
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4 pt-8 border-t border-gray-800">
            {prevLesson ? (
              <Link
                href={`/calendar/${prevDateStr}`}
                className="flex-1 flex items-center gap-3 p-4 bg-gray-900/50 hover:bg-gray-800/50 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all group"
              >
                <ChevronLeft className="text-gray-500 group-hover:text-purple-400 transition-colors" size={24} />
                <div className="text-left">
                  <p className="text-xs text-gray-500">
                    {locale === 'zh' ? '上一课' : 'Previous'}
                  </p>
                  <p className="text-white font-medium line-clamp-1">
                    {locale === 'zh' ? prevLesson.titleZh : prevLesson.titleEn}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            <Link
              href="/calendar"
              className="p-4 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
            >
              <Calendar className="text-gray-400" size={24} />
            </Link>

            {nextLesson ? (
              <Link
                href={`/calendar/${nextDateStr}`}
                className="flex-1 flex items-center justify-end gap-3 p-4 bg-gray-900/50 hover:bg-gray-800/50 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all group"
              >
                <div className="text-right">
                  <p className="text-xs text-gray-500">
                    {locale === 'zh' ? '下一课' : 'Next'}
                  </p>
                  <p className="text-white font-medium line-clamp-1">
                    {locale === 'zh' ? nextLesson.titleZh : nextLesson.titleEn}
                  </p>
                </div>
                <ChevronRight className="text-gray-500 group-hover:text-emerald-400 transition-colors" size={24} />
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
