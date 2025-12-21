"use client";

import { useTranslations } from "next-intl";
import { Sun, Moon, Globe2, CheckCircle2 } from "lucide-react";

export default function Plan2026() {
  const t = useTranslations("plan2026");

  const schedules = [
    {
      icon: Sun,
      time: t("morning.time"),
      title: t("morning.title"),
      subtitle: t("morning.subtitle"),
      description: t("morning.description"),
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Moon,
      time: t("evening.time"),
      title: t("evening.title"),
      subtitle: t("evening.subtitle"),
      description: t("evening.description"),
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: Globe2,
      time: t("allDay.time"),
      title: t("allDay.title"),
      subtitle: t("allDay.subtitle"),
      description: t("allDay.description"),
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section id="plan2026" className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
              {t("title")}
            </span>
          </h2>
          <p className="text-xl text-gray-400">{t("subtitle")}</p>
        </div>

        {/* Timeline */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {schedules.map((item, index) => (
            <div
              key={index}
              className="group relative bg-gray-900/50 rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
              >
                <item.icon className="text-white" size={32} />
              </div>

              {/* Time badge */}
              <div className="inline-block px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm mb-4">
                {item.time}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
              <p className="text-emerald-400 text-sm mb-3">{item.subtitle}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Commitment Card */}
        <div className="bg-gradient-to-r from-purple-900/50 to-emerald-900/50 rounded-3xl p-8 md:p-12 border border-purple-500/30">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center">
                <CheckCircle2 className="text-white" size={40} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {t("commitment.title")}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {t("commitment.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
