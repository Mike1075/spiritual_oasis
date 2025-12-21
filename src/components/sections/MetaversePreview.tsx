"use client";

import { useTranslations } from "next-intl";
import { User, Boxes, Mountain } from "lucide-react";

export default function MetaversePreview() {
  const t = useTranslations("metaverse");

  const features = [
    {
      icon: User,
      title: t("features.avatar"),
      description: t("features.avatarDesc"),
    },
    {
      icon: Boxes,
      title: t("features.space"),
      description: t("features.spaceDesc"),
    },
    {
      icon: Mountain,
      title: t("features.temple"),
      description: t("features.templeDesc"),
    },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* 3D-like background effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a2e_1px,transparent_1px),linear-gradient(to_bottom,#1a1a2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm mb-6">
            {t("comingSoon")}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-xl text-gray-400 mb-2">{t("subtitle")}</p>
          <p className="text-gray-500 max-w-2xl mx-auto">{t("description")}</p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Card */}
              <div className="relative bg-gradient-to-b from-gray-900 to-gray-900/50 rounded-2xl p-8 border border-gray-800 group-hover:border-purple-500/50 transition-all duration-300 h-full">
                {/* Glow effect */}
                <div className="absolute -inset-px bg-gradient-to-b from-purple-500/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="text-purple-400" size={32} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Token display mock */}
        <div className="mt-16 bg-gradient-to-r from-purple-900/30 to-emerald-900/30 rounded-2xl p-8 border border-purple-500/20">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">XLT</div>
              <div className="text-gray-400 text-sm">心灵通 - 消费积分</div>
            </div>
            <div className="w-px bg-gray-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">XWT</div>
              <div className="text-gray-400 text-sm">修为通 - 贡献权证</div>
            </div>
            <div className="w-px bg-gray-700" />
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-1">SBT</div>
              <div className="text-gray-400 text-sm">灵魂绑定 - 成就认证</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
