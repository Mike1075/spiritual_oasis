"use client";

import { useTranslations } from "next-intl";
import { User, Boxes, Mountain, Sparkles, Palette, Music } from "lucide-react";

export default function MetaversePage() {
  const t = useTranslations("metaverse");

  const features = [
    {
      icon: User,
      title: "数字元身 / Digital Avatar",
      description: "创建你的虚拟分身，设置初始人生蓝图，参考《灵魂永生》死后选择理论",
    },
    {
      icon: Sparkles,
      title: "法则学习 / Universal Laws",
      description: "通过交互式游戏学习11大宇宙法则：价值完成、能量转换、自发性等",
    },
    {
      icon: Mountain,
      title: "冥想圣殿 / Meditation Temple",
      description: "多人实时在线冥想场域，全球觉醒者共同创造高频能量场",
    },
    {
      icon: Boxes,
      title: "体验空间 / Experience Zones",
      description: "助眠区、读书区、音乐区，3D虚拟房间沉浸式体验",
    },
    {
      icon: Palette,
      title: "创造工坊 / Creation Workshop",
      description: "利用AI工具创造NFT（房屋、道具、艺术品）并交易",
    },
    {
      icon: Music,
      title: "音乐疗愈 / Sound Healing",
      description: "3D空间音频疗愈，颂钵、水晶钵、频率音乐",
    },
  ];

  const tokens = [
    {
      symbol: "XLT",
      name: "心灵通",
      nameEn: "Spirit Token",
      type: "Utility Token",
      description: "用于消费、课程购买、虚拟商品交易",
      color: "from-purple-500 to-violet-500",
    },
    {
      symbol: "XWT",
      name: "修为通",
      nameEn: "Wisdom Token",
      type: "Governance Token",
      description: "代表社区贡献度，用于质押与分红权证",
      color: "from-emerald-500 to-teal-500",
    },
    {
      symbol: "SBT",
      name: "灵魂绑定",
      nameEn: "Soulbound Token",
      type: "Achievement Token",
      description: "课程结业证书、志愿者荣誉，不可转移",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm mb-6">
              {t("comingSoon")} - 2026 Q2
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
                {t("title")}
              </span>
            </h1>
            <p className="text-2xl text-gray-400 mb-4">{t("subtitle")}</p>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            核心功能 / Core Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-b from-gray-900 to-gray-900/50 rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="absolute -inset-px bg-gradient-to-b from-purple-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="text-purple-400" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Token Economy Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Token 经济体系
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            基于 Polygon/Ethereum L2 的低Gas费环保区块链方案
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {tokens.map((token, index) => (
              <div
                key={index}
                className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800 hover:border-purple-500/30 transition-colors"
              >
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${token.color} flex items-center justify-center mb-6 mx-auto`}
                >
                  <span className="text-2xl font-bold text-white">
                    {token.symbol}
                  </span>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {token.name}
                  </h3>
                  <p className="text-emerald-400 text-sm mb-2">{token.nameEn}</p>
                  <span className="inline-block px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-xs mb-4">
                    {token.type}
                  </span>
                  <p className="text-gray-400">{token.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avatar Journey Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            元身之旅 / Avatar Journey
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 to-emerald-500 hidden md:block" />

            <div className="space-y-12">
              {[
                {
                  step: 1,
                  title: "苏醒 / Awakening",
                  description: "创建或加载你的数字元身，设置初始人生蓝图",
                },
                {
                  step: 2,
                  title: "学习 / Learning",
                  description: "通过交互式游戏学习宇宙法则，获得基础XLT奖励",
                },
                {
                  step: 3,
                  title: "探索 / Exploration",
                  description: "进入各个体验空间，参与冥想、疗愈、创造",
                },
                {
                  step: 4,
                  title: "创造 / Creation",
                  description: "使用AI工具创造NFT，在元宇宙中展示和交易",
                },
                {
                  step: 5,
                  title: "共修 / Co-Practice",
                  description: "与全球觉醒者一起参加集体冥想和直播活动",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1 hidden md:block" />
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center text-white font-bold text-xl z-10">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-purple-900/50 to-emerald-900/50 rounded-3xl p-12 border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              敬请期待 / Coming Soon
            </h2>
            <p className="text-gray-300 mb-8">
              心灵元宇宙将于2026年第二季度开放内测，
              加入2026公益计划的成员将获得优先体验资格
            </p>
            <a
              href="/#plan2026"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full text-white font-medium text-lg hover:scale-105 transition-transform"
            >
              加入2026计划获取内测资格
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
