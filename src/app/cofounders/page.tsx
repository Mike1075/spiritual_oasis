"use client";

import { useEffect, useState, useMemo } from "react";
import { cofounders, totalCofounders } from "@/data/cofounders";
import { Heart, Star, Sparkles, Users, Award, Camera } from "lucide-react";
import CoFounderGallery from "@/components/CoFounderGallery";

export default function CoFoundersPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // 为每个共建者生成随机但稳定的动画延迟和颜色
  const founderStyles = useMemo(() => {
    return cofounders.map((_, index) => ({
      delay: (index * 0.02) % 2,
      hue: (index * 7) % 360,
      scale: 0.9 + (index % 3) * 0.1,
    }));
  }, []);

  // 生成背景星星
  const stars = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="min-h-screen bg-black pt-20 relative overflow-hidden">
      {/* 星空背景 */}
      <div className="fixed inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* 渐变光晕背景 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-3/4 right-1/3 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="relative z-10">
        {/* 页面标题 */}
        <section className="py-16 text-center">
          <div className="max-w-4xl mx-auto px-4">
            {/* 装饰图标 */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <Star className="text-yellow-400 animate-pulse" size={32} />
              <Heart className="text-pink-400" size={36} />
              <Star className="text-yellow-400 animate-pulse" size={32} />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                光荣共建者
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 mb-4">
              Honor Roll of Co-Founders
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              感谢每一位共建者四年来的无私付出与贡献，是你们共同铸就了心灵家园的辉煌
            </p>
            <p className="text-gray-500">
              Thank you for 4 years of selfless dedication. Together, we built Spiritual Oasis.
            </p>

            {/* 统计数字 */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
                  <Users size={28} />
                  <span className="text-4xl font-bold">{totalCofounders}</span>
                </div>
                <p className="text-gray-400">共建者 / Co-Founders</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-pink-400 mb-2">
                  <Heart size={28} />
                  <span className="text-4xl font-bold">4</span>
                </div>
                <p className="text-gray-400">年 / Years</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                  <Award size={28} />
                  <span className="text-4xl font-bold">∞</span>
                </div>
                <p className="text-gray-400">感恩 / Gratitude</p>
              </div>
            </div>
          </div>
        </section>

        {/* 致敬语 */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-block px-8 py-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-3xl border border-purple-500/20">
              <Sparkles className="mx-auto text-yellow-400 mb-4" size={32} />
              <p className="text-xl md:text-2xl text-white/90 italic leading-relaxed">
                "每一个名字，都是一束光。<br />
                每一份付出，都是一颗星。<br />
                汇聚成河，照亮归途。"
              </p>
              <p className="text-gray-400 mt-4">
                "Every name is a ray of light. Every contribution is a star.<br />
                Together, they form a river of light, illuminating the way home."
              </p>
            </div>
          </div>
        </section>

        {/* 共建者风采展示 - 图片轮播 */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Camera className="text-purple-400" size={28} />
                <h2 className="text-3xl font-bold text-white">
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    共建者风采
                  </span>
                </h2>
              </div>
              <p className="text-gray-400">
                Co-Founders Gallery · 每一张面孔都闪耀着光芒
              </p>
            </div>

            <CoFounderGallery />
          </div>
        </section>

        {/* 共建者名单 - 星空般的展示 */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  心灵家园的星辰们
                </span>
              </h2>
              <p className="text-gray-400">The Stars of Spiritual Oasis</p>
            </div>

            {/* 名单网格 - 以星座般的方式展示 */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {cofounders.map((founder, index) => (
                <div
                  key={founder.id}
                  className={`group relative transition-all duration-500 ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: `${founderStyles[index].delay}s`,
                  }}
                  onMouseEnter={() => setHoveredId(founder.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <div
                    className={`
                      relative px-4 py-2 rounded-full cursor-pointer
                      transition-all duration-300 ease-out
                      ${hoveredId === founder.id
                        ? "bg-gradient-to-r from-purple-600/80 to-pink-600/80 scale-110 shadow-lg shadow-purple-500/30"
                        : "bg-white/5 hover:bg-white/10"
                      }
                      border border-white/10 hover:border-purple-400/50
                    `}
                  >
                    {/* 悬浮时的光芒效果 */}
                    {hoveredId === founder.id && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-xl -z-10" />
                    )}

                    <span
                      className={`
                        text-sm md:text-base font-medium
                        transition-colors duration-300
                        ${hoveredId === founder.id ? "text-white" : "text-gray-300"}
                      `}
                    >
                      {founder.name}
                    </span>

                    {/* 悬浮时显示的小星星 */}
                    {hoveredId === founder.id && (
                      <>
                        <Star
                          className="absolute -top-2 -right-2 text-yellow-400 animate-pulse"
                          size={14}
                          fill="currentColor"
                        />
                        <Star
                          className="absolute -bottom-1 -left-1 text-yellow-400 animate-pulse"
                          size={10}
                          fill="currentColor"
                          style={{ animationDelay: "0.3s" }}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 底部感言 */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="bg-gradient-to-br from-gray-900/80 to-purple-900/30 rounded-3xl p-12 border border-purple-500/20">
              <Heart className="mx-auto text-pink-400 mb-6" size={48} />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                感谢有你，一路同行
              </h3>
              <p className="text-xl text-gray-300 mb-4">
                Thank You for Walking This Journey with Us
              </p>
              <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
                从2020年到2024年，心灵家园从一个小小的在线社区，成长为如今的多维灵性成长平台。
                这一切，都源于每一位共建者的信任、支持与无私奉献。
                你们是心灵家园最珍贵的财富，是照亮彼此的星光。
              </p>
              <p className="text-gray-500 mt-4 text-sm">
                From 2020 to 2024, Spiritual Oasis grew from a small online community to a multidimensional spiritual growth platform.
                This is all because of the trust, support, and selfless dedication of every co-founder.
              </p>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-purple-400 font-medium">心灵家园 · Spiritual Oasis</p>
                <p className="text-gray-500 text-sm mt-2">2020 - 2024 · 四年共建 · Four Years Together</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
