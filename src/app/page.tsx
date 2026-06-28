import type { Metadata } from "next";
import CountriesSection from "@/components/home/CountriesSection";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import HowItWorks from "@/components/home/HowItWorks";
import StatsBar from "@/components/home/StatsBar";
import StoriesSection from "@/components/home/StoriesSection";
import ToolsSection from "@/components/home/ToolsSection";
import TrustSection from "@/components/home/TrustSection";

export const metadata: Metadata = {
  title: {
    absolute: "RelocateEU — Move to Europe with confidence",
  },
  description:
    "Step-by-step relocation guides for 7 European destinations. Every step verified against official government sources.",
};

export default function Home() {
  return (
    <>
      <HeroSlideshow />
      <StatsBar />
      <HowItWorks />
      <TrustSection />
      <CountriesSection />
      <ToolsSection />
      <StoriesSection />
    </>
  );
}
