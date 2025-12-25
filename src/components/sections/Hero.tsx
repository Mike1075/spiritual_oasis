"use client";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { isHolidaySeason } from "./HolidaySection";

export default function Hero() {
  const t = useTranslations("hero");
  const [isBreathing, setIsBreathing] = useState(false);
  const isHoliday = isHolidaySeason();

  // Breathing animation on mouse hold
  const handleMouseDown = () => setIsBreathing(true);
  const handleMouseUp = () => setIsBreathing(false);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/50 to-black">
        {/* Particle effect overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.1)_0%,_transparent_50%)] animate-pulse" />

        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.7 + 0.3,
              }}
            />
          ))}
        </div>

        {/* Aurora effect */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            isBreathing ? "opacity-40" : "opacity-20"
          }`}
        >
          <div className={`absolute top-0 left-1/4 w-96 h-96 ${isHoliday ? 'bg-red-500/20' : 'bg-purple-500/30'} rounded-full blur-3xl animate-float`} />
          <div className={`absolute top-1/3 right-1/4 w-80 h-80 ${isHoliday ? 'bg-green-500/20' : 'bg-emerald-500/20'} rounded-full blur-3xl animate-float-delayed`} />
          <div className={`absolute bottom-1/4 left-1/3 w-72 h-72 ${isHoliday ? 'bg-red-400/15' : 'bg-purple-400/20'} rounded-full blur-3xl animate-float`} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Main Title */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-4 transition-transform duration-1000 ${
            isBreathing ? "scale-105" : "scale-100"
          }`}
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-emerald-400 bg-clip-text text-transparent">
            {t("title")}
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-6">{t("subtitle")}</p>

        {/* Slogan */}
        <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light mb-6 leading-relaxed">
          {t("slogan")}
        </p>

        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          {t("description")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#plan2026"
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-emerald-500 rounded-full text-white font-medium text-lg overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10">{t("cta")}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <span className="text-emerald-400 text-sm">{t("ctaFree")}</span>
        </div>

        {/* Breathing hint */}
        <p className="mt-12 text-gray-500 text-sm animate-pulse">
          长按屏幕，深呼吸... / Hold to breathe...
        </p>

        {/* Holiday greeting */}
        {isHoliday && (
          <div className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/20 to-green-500/20 rounded-full border border-white/10">
            <span className="text-2xl">🎄</span>
            <span className="text-white/80">圣诞快乐 · Merry Christmas</span>
            <span className="text-2xl">🎅</span>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-gray-400" size={32} />
      </div>
    </section>
  );
}
