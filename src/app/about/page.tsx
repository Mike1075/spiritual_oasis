"use client";

import { useTranslations } from "next-intl";
import { Target, Lightbulb, History, BookOpen } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");

  const timeline = [
    {
      year: "2020",
      title: "起源 / The Beginning",
      description: "心灵家园在疫情期间诞生，从线上读书会开始",
    },
    {
      year: "2021",
      title: "成长 / Growth",
      description: "建立系统课程体系，首批学员突破1000人",
    },
    {
      year: "2022",
      title: "2.0架构 / Structure 2.0",
      description: "完善线上社区，开启多城市线下活动",
    },
    {
      year: "2023",
      title: "扩展 / Expansion",
      description: "全球社区布局，Web3技术探索",
    },
    {
      year: "2024",
      title: "元宇宙 / Metaverse",
      description: "开发心灵元宇宙，DAO治理框架建立",
    },
    {
      year: "2025",
      title: "3.0启航 / Launch 3.0",
      description: "虚实共生平台上线，2026公益计划启动",
    },
  ];

  const philosophyItems = [
    {
      key: "dimension",
      icon: "🌌",
      title: "3.5维存在",
      titleEn: "3.5D Existence",
    },
    {
      key: "teal",
      icon: "🌿",
      title: "青色组织",
      titleEn: "Teal Organization",
    },
    {
      key: "scaffold",
      icon: "🏗️",
      title: "脚手架理论",
      titleEn: "Scaffolding Theory",
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h1>
            <p className="text-2xl text-gray-400">{t("subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 rounded-3xl p-8 md:p-12 border border-purple-500/20">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center">
                <Target className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {t("mission")}
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {t("missionText")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Lightbulb className="text-purple-400" size={32} />
            <h2 className="text-3xl font-bold text-white">{t("philosophy")}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {philosophyItems.map((item) => (
              <div
                key={item.key}
                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-emerald-400 text-sm mb-3">{item.titleEn}</p>
                <p className="text-gray-400">
                  {t(`philosophyItems.${item.key}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <History className="text-purple-400" size={32} />
            <h2 className="text-3xl font-bold text-white">{t("history")}</h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-emerald-500 to-purple-500 hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-8 items-start">
                  {/* Year badge */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center text-white font-bold z-10">
                    {item.year.slice(2)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <span className="text-purple-400 font-bold">
                        {item.year}
                      </span>
                      <span className="text-white font-medium">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Foundation Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900/50 rounded-3xl p-8 md:p-12 border border-gray-800">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <BookOpen className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {t("foundation")}
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed mb-4">
                  {t("foundationText")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "赛斯资料 / Seth Material",
                    "信念创造实相 / Beliefs Create Reality",
                    "价值完成 / Value Fulfillment",
                    "多维意识 / Multidimensional Consciousness",
                  ].map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center mb-6">
              <span className="text-4xl font-bold text-white">M</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Mike</h3>
            <p className="text-purple-400 mb-4">创始人 / Founder</p>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
              一位致力于将古老智慧与现代科技融合的探索者，希望通过心灵家园帮助更多人找到内在的平静与力量，实现生命的价值完成。
            </p>
            <p className="text-gray-500 mt-4 text-sm">
              A seeker dedicated to integrating ancient wisdom with modern technology,
              hoping to help more people find inner peace and strength through Spiritual Oasis.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
