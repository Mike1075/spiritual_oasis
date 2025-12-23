"use client";

import { useTranslations } from "next-intl";
import { Heart, Sparkles, Users, Compass, ExternalLink, Clock, Award, Users2 } from "lucide-react";

// 课程平台链接
const XIAOE_MAIN_URL = "https://appvwgstfof3025.pc.xiaoe-tech.com";
const FUTUREMIND_URL = "https://www.futuremind2075.com";

export default function AcademyPage() {
  const t = useTranslations("academy");

  const categories = [
    {
      icon: Heart,
      title: t("healing.title"),
      subtitle: t("healing.subtitle"),
      description: t("healing.description"),
      color: "from-rose-500 to-pink-500",
      categoryUrl: XIAOE_MAIN_URL,
      courses: [
        { name: "绽放生命体验营 / Life Blossoming Camp", url: XIAOE_MAIN_URL },
        { name: "阴阳极致之美 / Yin Yang Beauty", url: XIAOE_MAIN_URL },
        { name: "21天丰盛之旅 / 21-Day Abundance Journey", url: XIAOE_MAIN_URL },
        { name: "动感冥想 / Dynamic Meditation", url: XIAOE_MAIN_URL },
        { name: "阴阳交融之美 / Yin Yang Fusion", url: XIAOE_MAIN_URL },
      ],
    },
    {
      icon: Sparkles,
      title: t("growth.title"),
      subtitle: t("growth.subtitle"),
      description: t("growth.description"),
      color: "from-purple-500 to-violet-500",
      categoryUrl: XIAOE_MAIN_URL,
      courses: [
        { name: "《做自己的主人》/ Be Your Own Master", url: XIAOE_MAIN_URL },
        { name: "《灵魂永生》/ Seth Speaks", url: XIAOE_MAIN_URL },
        { name: "灵性本质三阶段开悟 / Spiritual Awakening", url: XIAOE_MAIN_URL },
        { name: "讲师内训课程 / Instructor Training", url: XIAOE_MAIN_URL },
        { name: "《了凡四训》新解 / Liao Fan's Four Lessons", url: XIAOE_MAIN_URL },
      ],
    },
    {
      icon: Users,
      title: t("connection.title"),
      subtitle: t("connection.subtitle"),
      description: t("connection.description"),
      color: "from-emerald-500 to-teal-500",
      categoryUrl: XIAOE_MAIN_URL,
      courses: [
        { name: "以性悟道系列 / Tao Through Intimacy", url: XIAOE_MAIN_URL },
        { name: "情感与两性关系 / Relationships & Intimacy", url: XIAOE_MAIN_URL },
        { name: "《道德经》高维解读 / Tao Te Ching", url: XIAOE_MAIN_URL },
        { name: "《庄子》高维解读 / Zhuangzi Wisdom", url: XIAOE_MAIN_URL },
        { name: "与万物互联练习 / Oneness Practices", url: XIAOE_MAIN_URL },
      ],
    },
    {
      icon: Compass,
      title: t("truth.title"),
      subtitle: t("truth.subtitle"),
      description: t("truth.description"),
      color: "from-blue-500 to-indigo-500",
      categoryUrl: XIAOE_MAIN_URL,
      courses: [
        { name: "《未知的实相》/ The Unknown Reality", url: XIAOE_MAIN_URL },
        { name: "《梦、演化与价值完成》/ Dreams & Value Fulfillment", url: XIAOE_MAIN_URL },
        { name: "《生命之花》/ Flower of Life", url: XIAOE_MAIN_URL },
        { name: "梅尔卡巴 / Merkaba", url: XIAOE_MAIN_URL },
        { name: "9大内在感官训练 / Inner Senses Training", url: XIAOE_MAIN_URL },
      ],
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
            <p className="text-2xl text-gray-400 mb-4">{t("subtitle")}</p>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
              {t("description")}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                  <Clock size={24} />
                  <span className="text-3xl font-bold">500+</span>
                </div>
                <p className="text-gray-500">课程时长 / Hours</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-emerald-400 mb-2">
                  <Award size={24} />
                  <span className="text-3xl font-bold">50+</span>
                </div>
                <p className="text-gray-500">系统课程 / Courses</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-pink-400 mb-2">
                  <Users2 size={24} />
                  <span className="text-3xl font-bold">10000+</span>
                </div>
                <p className="text-gray-500">学员 / Students</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={XIAOE_MAIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full text-white font-medium text-lg hover:scale-105 transition-transform"
              >
                小鹅通课程 / XiaoE Courses
                <ExternalLink size={20} />
              </a>
              <a
                href={FUTUREMIND_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-purple-500 rounded-full text-white font-medium text-lg hover:bg-purple-500/20 transition-colors"
              >
                未来心灵学院 / FutureMind
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Category Info */}
                  <div className="md:w-1/3">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}
                    >
                      <category.icon className="text-white" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {category.title}
                    </h2>
                    <p className="text-emerald-400 mb-3">{category.subtitle}</p>
                    <p className="text-gray-400">{category.description}</p>
                  </div>

                  {/* Course List */}
                  <div className="md:w-2/3">
                    <h3 className="text-lg font-medium text-gray-300 mb-4">
                      核心课程 / Core Courses
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {category.courses.map((course, courseIndex) => (
                        <a
                          key={courseIndex}
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 bg-gray-800/50 rounded-lg text-gray-300 hover:bg-purple-500/20 hover:text-white transition-colors flex items-center justify-between group"
                        >
                          <span>{course.name}</span>
                          <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-emerald-900/50 rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              开始你的灵性成长之旅
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              Start Your Spiritual Growth Journey
            </p>
            <p className="text-gray-400 mb-8">
              加入心灵大学，系统学习灵性智慧，实现生命的价值完成
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={XIAOE_MAIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-medium text-lg hover:scale-105 transition-transform"
              >
                小鹅通课程 / XiaoE
                <ExternalLink size={20} />
              </a>
              <a
                href={FUTUREMIND_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white rounded-full text-white font-medium text-lg hover:bg-white/10 transition-colors"
              >
                未来心灵学院 / FutureMind
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
