"use client";

import Hero from "@/components/sections/Hero";
import MasLifePreview from "@/components/sections/MasLifePreview";
import Plan2026 from "@/components/sections/Plan2026";
import AcademyPreview from "@/components/sections/AcademyPreview";
import MetaversePreview from "@/components/sections/MetaversePreview";
import CommunityPreview from "@/components/sections/CommunityPreview";
import HolidaySection from "@/components/sections/HolidaySection";
import { isHolidaySeason } from "@/lib/holiday";
// radar-auto 2026-06-15: GEO（FAQPage schema + AI 摘要块）
import { JsonLdFaq, GeoSummary } from "@/components/geo/Geo";
import { HOME_FAQ } from "@/data/geoFaq";

export default function Home() {
  const showHoliday = isHolidaySeason();

  return (
    <>
      {/* radar-auto 2026-06-15: FAQPage 结构化数据 */}
      <JsonLdFaq items={HOME_FAQ} />
      <Hero />
      {/* radar-auto 2026-06-15: AI 摘要块（首屏可见，明确观点 + 场景 + 品牌词） */}
      <section className="mx-auto max-w-3xl px-5 pt-8 sm:px-8">
        <GeoSummary label="心灵家园是什么">
          心灵家园 Spiritual Oasis 把灵性成长和 AI 时代生存能力结合在一起：一边是 2026 全年免费公益的 365 天觉醒之旅，一边是 Spirit Academy 学院的付费系统课（MAS-Life OS 一人公司系统营、AI 定位罗盘）。它帮普通人从精神内耗走向内在清明，同时在 AI 时代找到自己的位置——既向内看，也向外做。
        </GeoSummary>
      </section>
      <MasLifePreview />
      {showHoliday && <HolidaySection />}
      <Plan2026 />
      <AcademyPreview />
      <MetaversePreview />
      <CommunityPreview />
    </>
  );
}
