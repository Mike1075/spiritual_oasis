"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

// 共建者截图列表
const cofounderImages = [
  "/images/cofounders/IMG_9761.jpg",
  "/images/cofounders/IMG_9762.jpg",
  "/images/cofounders/IMG_9764.jpg",
  "/images/cofounders/IMG_9765.jpg",
  "/images/cofounders/IMG_9767.jpg",
  "/images/cofounders/IMG_9768.jpg",
  "/images/cofounders/IMG_9769.jpg",
  "/images/cofounders/IMG_9770.jpg",
  "/images/cofounders/IMG_9771.jpg",
  "/images/cofounders/IMG_9772.jpg",
];

// 随机生成 Ken Burns 效果参数
function generateKenBurnsEffect() {
  const effects = [
    // 从左上角放大
    { startScale: 1, endScale: 1.3, startX: 0, startY: 0, endX: -15, endY: -10 },
    // 从右上角放大
    { startScale: 1, endScale: 1.3, startX: 0, startY: 0, endX: 15, endY: -10 },
    // 从左下角放大
    { startScale: 1, endScale: 1.3, startX: 0, startY: 0, endX: -15, endY: 10 },
    // 从右下角放大
    { startScale: 1, endScale: 1.3, startX: 0, startY: 0, endX: 15, endY: 10 },
    // 从中心放大
    { startScale: 1, endScale: 1.4, startX: 0, startY: 0, endX: 0, endY: 0 },
    // 缩小效果
    { startScale: 1.3, endScale: 1, startX: -10, startY: -10, endX: 0, endY: 0 },
    { startScale: 1.3, endScale: 1, startX: 10, startY: -10, endX: 0, endY: 0 },
    { startScale: 1.3, endScale: 1, startX: -10, startY: 10, endX: 0, endY: 0 },
    { startScale: 1.3, endScale: 1, startX: 10, startY: 10, endX: 0, endY: 0 },
    // 横向平移
    { startScale: 1.2, endScale: 1.2, startX: -10, startY: 0, endX: 10, endY: 0 },
    { startScale: 1.2, endScale: 1.2, startX: 10, startY: 0, endX: -10, endY: 0 },
  ];
  return effects[Math.floor(Math.random() * effects.length)];
}

// 随机生成聚光灯位置
function generateSpotlightPosition() {
  // 5x6 或 5x7 网格中随机选择一个区域
  const col = Math.floor(Math.random() * 5);
  const row = Math.floor(Math.random() * 6);
  return {
    x: 10 + col * 20, // 10% - 90%
    y: 10 + row * 15, // 10% - 85%
  };
}

export default function CoFounderGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [kenBurnsEffect, setKenBurnsEffect] = useState(generateKenBurnsEffect());
  const [spotlight, setSpotlight] = useState(generateSpotlightPosition());
  const [showSpotlight, setShowSpotlight] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 6000; // 每张图片展示6秒
  const TRANSITION_DURATION = 1000; // 过渡动画1秒

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setNextIndex((currentIndex + 1) % cofounderImages.length);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cofounderImages.length);
      setIsTransitioning(false);
      setKenBurnsEffect(generateKenBurnsEffect());
      setSpotlight(generateSpotlightPosition());
      setProgress(0);
    }, TRANSITION_DURATION);
  }, [currentIndex]);

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(goToNext, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [goToNext]);

  // 进度条动画
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 100 / (SLIDE_DURATION / 100), 100));
    }, 100);
    return () => clearInterval(progressInterval);
  }, [currentIndex]);

  // 随机显示聚光灯效果
  useEffect(() => {
    const spotlightInterval = setInterval(() => {
      setShowSpotlight(true);
      setSpotlight(generateSpotlightPosition());
      setTimeout(() => setShowSpotlight(false), 2000);
    }, 3000);
    return () => clearInterval(spotlightInterval);
  }, []);

  const goToSlide = (index: number) => {
    if (index === currentIndex || isTransitioning) return;
    setNextIndex(index);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
      setKenBurnsEffect(generateKenBurnsEffect());
      setSpotlight(generateSpotlightPosition());
      setProgress(0);
    }, TRANSITION_DURATION);
  };

  return (
    <div className="relative w-full">
      {/* 主轮播区域 */}
      <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden bg-gray-900 shadow-2xl shadow-purple-500/20">
        {/* 当前图片 - Ken Burns 效果 */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          <div
            className="absolute inset-0 transition-transform ease-linear"
            style={{
              transitionDuration: `${SLIDE_DURATION}ms`,
              transform: `scale(${kenBurnsEffect.endScale}) translate(${kenBurnsEffect.endX}%, ${kenBurnsEffect.endY}%)`,
            }}
          >
            <Image
              src={cofounderImages[currentIndex]}
              alt={`共建者截图 ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* 下一张图片（过渡时显示） */}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: isTransitioning ? 1 : 0 }}
        >
          <Image
            src={cofounderImages[nextIndex]}
            alt={`共建者截图 ${nextIndex + 1}`}
            fill
            className="object-cover"
          />
        </div>

        {/* 聚光灯效果 */}
        {showSpotlight && (
          <div
            className="absolute pointer-events-none transition-all duration-500"
            style={{
              left: `${spotlight.x}%`,
              top: `${spotlight.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* 发光圆环 */}
            <div className="relative">
              <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-yellow-400/80 animate-ping" />
              <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-yellow-400 animate-pulse" />
              <div
                className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%)",
                  transform: "translate(-25%, -25%)",
                }}
              />
            </div>
          </div>
        )}

        {/* 渐变遮罩 - 顶部 */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/60 to-transparent" />

        {/* 渐变遮罩 - 底部 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />

        {/* 图片信息 */}
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div>
            <p className="text-white/80 text-sm mb-1">共建者风采展示</p>
            <p className="text-white text-lg md:text-xl font-medium">
              第 {currentIndex + 1} / {cofounderImages.length} 组
            </p>
          </div>

          {/* 进度指示器 */}
          <div className="flex gap-2">
            {cofounderImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`group relative h-2 rounded-full overflow-hidden transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-white/30" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              >
                {index === currentIndex && (
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400 to-emerald-400 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 装饰边框 */}
        <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />

        {/* 角标装饰 */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-white/80 text-xs">自动播放中</span>
        </div>
      </div>

      {/* 缩略图导航 */}
      <div className="mt-6 flex justify-center gap-2 overflow-x-auto pb-2 px-4">
        {cofounderImages.map((src, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden transition-all duration-300 ${
              index === currentIndex
                ? "ring-2 ring-purple-400 ring-offset-2 ring-offset-black scale-110"
                : "opacity-50 hover:opacity-80"
            }`}
          >
            <Image
              src={src}
              alt={`缩略图 ${index + 1}`}
              fill
              className="object-cover"
            />
            {index === currentIndex && (
              <div className="absolute inset-0 bg-purple-500/20" />
            )}
          </button>
        ))}
      </div>

      {/* 说明文字 */}
      <p className="text-center text-gray-500 text-sm mt-4">
        点击缩略图可切换查看 · 聚光灯随机高亮展示
      </p>
    </div>
  );
}
