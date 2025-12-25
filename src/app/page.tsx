"use client";

import Hero from "@/components/sections/Hero";
import Plan2026 from "@/components/sections/Plan2026";
import AcademyPreview from "@/components/sections/AcademyPreview";
import MetaversePreview from "@/components/sections/MetaversePreview";
import CommunityPreview from "@/components/sections/CommunityPreview";
import HolidaySection from "@/components/sections/HolidaySection";
import { isHolidaySeason } from "@/lib/holiday";

export default function Home() {
  const showHoliday = isHolidaySeason();

  return (
    <>
      <Hero />
      {showHoliday && <HolidaySection />}
      <Plan2026 />
      <AcademyPreview />
      <MetaversePreview />
      <CommunityPreview />
    </>
  );
}
