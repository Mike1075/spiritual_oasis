"use client";

import { useTranslations } from "next-intl";
import { Heart, Mic, EyeOff, ArrowRight } from "lucide-react";

// 心镜 · MindOS 部署在独立子域名(同一 Vercel 账号,通配 *.spiritual-oasis.net 指向 Vercel)。
// 外站链接,新标签打开,不打断官网浏览。
const MINDOS_URL = "https://mind.spiritual-oasis.net";

export default function MindosPreview() {
  const t = useTranslations("mindos");

  const features = [
    {
      icon: Heart,
      title: t("features.presence"),
      description: t("features.presenceDesc"),
    },
    {
      icon: Mic,
      title: t("features.voice"),
      description: t("features.voiceDesc"),
    },
    {
      icon: EyeOff,
      title: t("features.anonymous"),
      description: t("features.anonymousDesc"),
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* 梦核氛围背景:深紫径向光晕 */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-block rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-300">
            {t("badge")}
          </div>
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-emerald-300 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="mb-3 text-xl text-gray-300">{t("subtitle")}</p>
          <p className="mx-auto max-w-2xl leading-relaxed text-gray-500">
            {t("description")}
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="relative h-full rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-900/50 p-8 transition-all duration-300 group-hover:border-purple-500/50">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-purple-500/20 to-transparent opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-emerald-500/20 transition-transform group-hover:scale-110">
                    <feature.icon className="text-purple-400" size={32} />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href={MINDOS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-9 py-4 text-lg font-bold text-white shadow-[0_0_30px_rgba(217,70,239,0.35)] transition hover:scale-[1.02]"
          >
            {t("cta")}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-gray-600">
            {t("note")}
          </p>
        </div>
      </div>
    </section>
  );
}
