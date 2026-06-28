import PremiumFeatureGate from "@/components/PremiumFeatureGate";
import BuddyMatching from "@/components/tools/BuddyMatching";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expat Buddy Matching",
  description:
    "Connect with fellow expats who have relocated to your destination country.",
};

export default function BuddyMatchingPage() {
  return (
    <PremiumFeatureGate feature="buddyMatching" featureLabel="Premium feature">
      <BuddyMatching />
    </PremiumFeatureGate>
  );
}
