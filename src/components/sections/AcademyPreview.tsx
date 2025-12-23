"use client";

import { useTranslations } from "next-intl";
import { Heart, Sparkles, Users, Compass, ExternalLink } from "lucide-react";
import Link from "next/link";

// 课程平台链接
const XIAOE_MAIN_URL = "https://appvwgstfof3025.pc.xiaoe-tech.com";
const FUTUREMIND_URL = "https://www.futuremind2075.com";

export default function AcademyPreview() {
  const t = useTranslations("academy");

  const categories = [
    {
      icon: Heart,
      title: t("healing.title"),
      subtitle: t("healing.subtitle"),
      description: t("healing.description"),
      color: "from-rose-500 to-pink-500",
    },
    {
      icon: Sparkles,
      title: t("growth.title"),
      subtitle: t("growth.subtitle"),
      description: t("growth.description"),
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Users,
      title: t("connection.title"),
      subtitle: t("connection.subtitle"),
      description: t("connection.description"),
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Compass,
      title: t("truth.title"),
      subtitle: t("truth.subtitle"),
      description: t("truth.description"),
      color: "from-blue-500 to-indigo-500",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-2">{t("subtitle")}</p>
          <p className="text-gray-500">{t("description")}</p>
        </div>

        {/* Course Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="relative z-10 flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                >
                  <category.icon className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {category.title}
                  </h3>
                  <p className="text-emerald-400 text-sm mb-2">
                    {category.subtitle}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full text-white font-medium text-lg hover:scale-105 transition-transform"
          >
            查看全部课程 / View All
          </Link>
          <a
            href={XIAOE_MAIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 border border-purple-500 rounded-full text-white font-medium hover:bg-purple-500/20 transition-colors"
          >
            小鹅通 / XiaoE
            <ExternalLink size={18} />
          </a>
          <a
            href={FUTUREMIND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 border border-emerald-500 rounded-full text-white font-medium hover:bg-emerald-500/20 transition-colors"
          >
            未来心灵 / FutureMind
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
