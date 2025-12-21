"use client";

import { useTranslations } from "next-intl";
import { MapPin, MessageCircle, Calendar } from "lucide-react";
import Link from "next/link";

export default function CommunityPreview() {
  const t = useTranslations("community");
  const common = useTranslations("common");

  const features = [
    {
      icon: MapPin,
      title: t("map"),
      description: t("mapDesc"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: MessageCircle,
      title: t("groups"),
      description: t("groupsDesc"),
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Calendar,
      title: t("activities"),
      description: t("activitiesDesc"),
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background map-like pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.3)_0%,transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.3)_0%,transparent_40%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-900/50 rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 text-center"
            >
              <div
                className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className="text-white" size={36} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Global locations mock */}
        <div className="bg-gray-900/50 rounded-2xl p-8 border border-gray-800">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            全球心灵家园 / Global Spiritual Oasis
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["中国 China", "美国 USA", "欧洲 Europe", "东南亚 SEA", "澳洲 AU"].map(
              (location, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  {location}
                </div>
              )
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 px-8 py-4 border border-purple-500 rounded-full text-purple-300 font-medium hover:bg-purple-500/20 transition-colors"
          >
            {common("learnMore")}
          </Link>
        </div>
      </div>
    </section>
  );
}
