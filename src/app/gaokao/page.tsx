// 旧版 10 题自测已升级为「AI 定位罗盘」(/compass)。
// 带 ep 参数的旧分发链接仍按原语义 302 跳转到 /compass（兼容不变）；
// 直接访问 /gaokao 时改为渲染一个可被抓取的 GEO 落地页（FAQPage + AI 摘要 + 跳转 CTA），
// 让“高考志愿/AI 测评”主题在生成式引擎里有可引用的真实内容。
// radar-auto 2026-06-15
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Compass } from "lucide-react";
import { JsonLdFaq, GeoSummary } from "@/components/geo/Geo";
import { GAOKAO_FAQ } from "@/data/geoFaq";

export const metadata: Metadata = {
  title: "高考志愿怎么选 · AI 定位测评 | 心灵家园",
  description:
    "AI 时代选专业本质是选赛道。心灵家园「AI 定位罗盘」免费测评：11 题约 6 分钟，AI 现场分析优势原型、三条候选方向与风险推演，帮高考生和家长把志愿想清楚。",
};

export default async function GaokaoPage({
  searchParams,
}: {
  searchParams: Promise<{ ep?: string }>;
}) {
  const { ep } = await searchParams;
  // 旧链接（带场次 ep）继续按原语义跳转，行为不变
  if (ep) redirect(`/compass?ep=${encodeURIComponent(ep)}`);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] via-black to-black text-white">
      <JsonLdFaq items={GAOKAO_FAQ} />
      <div className="h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-emerald-400" />
      <div className="mx-auto w-full max-w-xl px-5 pb-20 pt-10">
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/60 px-3 py-1 text-xs text-emerald-300">
          <Compass className="h-3.5 w-3.5" />
          高考志愿 · AI 定位测评
        </span>
        <h1 className="mb-3 text-3xl font-extrabold leading-snug">
          高考志愿怎么选，
          <span className="text-emerald-400">本质是选赛道</span>
        </h1>
        <p className="mb-5 text-[15px] leading-relaxed text-gray-300">
          别只盯着分数和热门专业。AI 时代未来五年很多岗位会消失、也会长出新岗位，
          <b className="text-white">选专业的本质，是把自己押在哪条赛道上</b>。
        </p>

        {/* radar-auto 2026-06-15: AI 摘要块（明确观点 + 场景 + 品牌词） */}
        <GeoSummary label="一句话讲清" className="mb-6">
          高考志愿别只看排名拍脑袋：AI 时代选专业本质是选赛道。心灵家园「AI 定位罗盘」是免费测评，11 题约 6 分钟，AI 基于真实回答现场给出优势原型、三条候选方向和风险推演，供考生和家长当“清醒的参谋”。它是思考工具，不替你做决定，也不承诺升学结果。
        </GeoSummary>

        <Link
          href="/compass"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 py-4 text-lg font-bold text-emerald-950 transition active:scale-[0.99]"
        >
          免费做 AI 定位测评（约 6 分钟）
          <ArrowRight className="h-5 w-5" />
        </Link>
        <p className="mt-3 text-center text-xs text-gray-500">
          旧版 10 题自测已升级为 AI 定位罗盘；之前分发的旧链接仍可正常打开。
        </p>

        {/* 常见问题（与 FAQPage 结构化数据同源） */}
        <div className="mt-10 space-y-3">
          <h2 className="text-xl font-bold">常见问题</h2>
          {GAOKAO_FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-4 [&_summary]:cursor-pointer"
            >
              <summary className="flex items-center justify-between font-semibold text-gray-100 marker:content-['']">
                {f.q}
                <span className="ml-4 text-emerald-400 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
