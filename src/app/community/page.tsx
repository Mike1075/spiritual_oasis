"use client";

import { useTranslations } from "next-intl";
import { MapPin, MessageCircle, Calendar, Globe, Users, Home } from "lucide-react";

export default function CommunityPage() {
  const t = useTranslations("community");

  const locations = [
    { name: "北京 Beijing", status: "active", members: 500 },
    { name: "上海 Shanghai", status: "active", members: 420 },
    { name: "深圳 Shenzhen", status: "active", members: 380 },
    { name: "成都 Chengdu", status: "active", members: 260 },
    { name: "洛杉矶 Los Angeles", status: "active", members: 180 },
    { name: "纽约 New York", status: "planning", members: 0 },
    { name: "伦敦 London", status: "planning", members: 0 },
    { name: "新加坡 Singapore", status: "active", members: 150 },
  ];

  const activities = [
    {
      title: "7天游学 / 7-Day Retreat",
      description: "集体OM疗愈、动感冥想、高能量食物制作、《神奇之道》学习",
      duration: "7天",
      type: "线下",
    },
    {
      title: "14天体验营 / 14-Day Camp",
      description: "财务自由、身体自由、时间自由、心灵自由全方位体验",
      duration: "14天",
      type: "线下",
    },
    {
      title: "苏菲旋转 / Sufi Whirling",
      description: "通过旋转达到身体与意识的分离，进入深度冥想状态",
      duration: "3天",
      type: "线下",
    },
    {
      title: "太阳功 / Sun Gazing",
      description: "与太阳能量连接，提升身心能量",
      duration: "7天",
      type: "线下",
    },
    {
      title: "21天丰盛之旅 / 21-Day Abundance",
      description: "系统冥想与作业，开启丰盛人生",
      duration: "21天",
      type: "线上/线下",
    },
    {
      title: "辟谷练习 / Bigu Fasting",
      description: "从宇宙获得能量，身心净化",
      duration: "7天",
      type: "线下",
    },
  ];

  const socialPlatforms = [
    { name: "微信群 WeChat", icon: "💬", members: "5000+" },
    { name: "Telegram", icon: "📱", members: "1200+" },
    { name: "WhatsApp", icon: "📞", members: "800+" },
    { name: "Discord", icon: "🎮", members: "600+" },
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
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Global Map Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Globe className="text-purple-400" size={32} />
            <h2 className="text-3xl font-bold text-white">{t("map")}</h2>
          </div>

          <div className="bg-gray-900/50 rounded-3xl p-8 border border-gray-800">
            {/* Simple map visualization */}
            <div className="grid md:grid-cols-4 gap-4">
              {locations.map((location, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border transition-colors ${
                    location.status === "active"
                      ? "bg-purple-500/10 border-purple-500/30 hover:border-purple-500"
                      : "bg-gray-800/50 border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        location.status === "active"
                          ? "bg-emerald-400 animate-pulse"
                          : "bg-gray-500"
                      }`}
                    />
                    <span className="text-white font-medium">{location.name}</span>
                  </div>
                  {location.status === "active" ? (
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Users size={14} />
                      <span>{location.members}+ 成员</span>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">筹备中 / Planning</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Online Groups Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <MessageCircle className="text-purple-400" size={32} />
            <h2 className="text-3xl font-bold text-white">{t("groups")}</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {socialPlatforms.map((platform, index) => (
              <div
                key={index}
                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-colors text-center cursor-pointer group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {platform.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {platform.name}
                </h3>
                <p className="text-emerald-400">{platform.members} 成员</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Calendar className="text-purple-400" size={32} />
            <h2 className="text-3xl font-bold text-white">{t("activities")}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-purple-500/20 rounded text-purple-300 text-xs">
                    {activity.duration}
                  </span>
                  <span className="px-2 py-1 bg-emerald-500/20 rounded text-emerald-300 text-xs">
                    {activity.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {activity.title}
                </h3>
                <p className="text-gray-400 text-sm">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Physical Spaces Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Home className="text-purple-400" size={32} />
            <h2 className="text-3xl font-bold text-white">
              实体社区 / Physical Communities
            </h2>
          </div>

          <div className="bg-gradient-to-r from-purple-900/30 to-emerald-900/30 rounded-3xl p-8 md:p-12 border border-purple-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                蜂巢计划 / Hive Project
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto mb-6">
                通过Web3众筹，在全球各地建立心灵家园实体社区。
                每个社区都是一个独立的蜂巢，通过DAO治理连接成一个全球网络。
              </p>
              <p className="text-gray-400 text-sm mb-8">
                Through Web3 crowdfunding, we establish Spiritual Oasis physical communities worldwide.
                Each community is an independent hive, connected through DAO governance into a global network.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="px-6 py-3 bg-purple-500/20 rounded-full">
                  <span className="text-purple-300">预约住宿 / Book Stay</span>
                </div>
                <div className="px-6 py-3 bg-emerald-500/20 rounded-full">
                  <span className="text-emerald-300">参与众筹 / Join Crowdfunding</span>
                </div>
                <div className="px-6 py-3 bg-pink-500/20 rounded-full">
                  <span className="text-pink-300">申请志愿者 / Volunteer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
