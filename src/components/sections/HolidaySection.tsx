"use client";

import { useEffect, useState } from "react";
import { Snowflake, Gift, Star, ExternalLink } from "lucide-react";

// 节日期间：12月20日 - 1月4日
export function isHolidaySeason(): boolean {
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const day = now.getDate();

  // 12月20日-31日 或 1月1日-4日
  return (month === 11 && day >= 20) || (month === 0 && day <= 4);
}

export default function HolidaySection() {
  const [showIframe, setShowIframe] = useState(false);
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    // 生成随机雪花
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      size: 10 + Math.random() * 20,
    }));
    setSnowflakes(flakes);
  }, []);

  const CHRISTMAS_TREE_URL = "https://aivibecodinglove.netlify.app/";

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#1a0a28] to-black">
      {/* 飘落的雪花 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute text-white/30 animate-snowfall"
            style={{
              left: `${flake.left}%`,
              animationDelay: `${flake.delay}s`,
              animationDuration: `${flake.duration}s`,
              fontSize: `${flake.size}px`,
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* 装饰光效 */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 节日问候 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Star className="text-yellow-400 animate-pulse" size={32} />
            <Snowflake className="text-blue-300 animate-spin-slow" size={28} />
            <Gift className="text-red-400" size={32} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-400 via-green-400 to-red-400 bg-clip-text text-transparent">
              🎄 圣诞快乐 & 新年快乐 🎆
            </span>
          </h2>
          <p className="text-2xl text-white/80 mb-2">
            Merry Christmas & Happy New Year!
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            心灵家园祝您节日快乐！用手势控制属于您的圣诞树，每一份礼物都是一段珍贵的回忆
          </p>
        </div>

        {/* 互动圣诞树区域 */}
        <div className="relative max-w-4xl mx-auto">
          {!showIframe ? (
            // 预览卡片
            <div
              className="relative bg-gradient-to-br from-green-900/40 to-red-900/40 rounded-3xl border border-white/10 p-8 cursor-pointer group hover:border-green-500/50 transition-all duration-300"
              onClick={() => setShowIframe(true)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-red-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="text-center relative z-10">
                <div className="text-8xl mb-6">🎄</div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  互动圣诞树 / Interactive Christmas Tree
                </h3>
                <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                  点击开启互动体验，使用手势控制圣诞树上的礼物，每个礼物都是一张珍贵的照片
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-red-600 rounded-full text-white font-medium hover:scale-105 transition-transform">
                  <span>开启互动体验</span>
                  <Gift size={20} />
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  * 需要摄像头权限来识别手势
                </p>
              </div>

              {/* 装饰礼物 */}
              <div className="absolute -top-4 -left-4 text-4xl animate-bounce">🎁</div>
              <div className="absolute -top-4 -right-4 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>🎁</div>
              <div className="absolute -bottom-4 left-1/4 text-3xl animate-bounce" style={{ animationDelay: '1s' }}>🎀</div>
              <div className="absolute -bottom-4 right-1/4 text-3xl animate-bounce" style={{ animationDelay: '1.5s' }}>⭐</div>
            </div>
          ) : (
            // iframe 嵌入
            <div className="relative">
              <div className="aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-green-500/10">
                <iframe
                  src={CHRISTMAS_TREE_URL}
                  className="w-full h-full"
                  allow="camera; microphone"
                  title="Interactive Christmas Tree"
                />
              </div>

              {/* 控制按钮 */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => setShowIframe(false)}
                  className="px-6 py-2 bg-gray-800 rounded-full text-gray-300 hover:bg-gray-700 transition-colors"
                >
                  收起
                </button>
                <a
                  href={CHRISTMAS_TREE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-red-600 rounded-full text-white hover:scale-105 transition-transform"
                >
                  全屏体验
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 新年倒计时或祝福 */}
        <div className="text-center mt-16">
          <div className="inline-block px-8 py-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-gray-400 mb-2">心灵家园 · 2026全球公益计划</p>
            <p className="text-xl text-white">
              愿新的一年，你与内在的光芒相遇 ✨
            </p>
            <p className="text-gray-500 mt-1">
              May you meet your inner light in the new year
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
