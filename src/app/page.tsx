import HeroHome from "@/components/sections/home/HeroHome";
import WayHome from "@/components/sections/home/WayHome";
import Companions from "@/components/sections/home/Companions";
import Needs from "@/components/sections/home/Needs";
import GuideInvite from "@/components/sections/home/GuideInvite";
import ClosingHome from "@/components/sections/home/ClosingHome";

export default function Home() {
  return (
    <>
      <HeroHome />
      <WayHome />
      <Companions />
      <Needs />
      <GuideInvite />
      <ClosingHome />
    </>
  );
}
