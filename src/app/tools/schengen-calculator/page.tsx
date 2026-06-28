import SchengenCalculator from "@/components/tools/SchengenCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schengen Stay Calculator",
  description:
    "Check your 90/180 day Schengen allowance and avoid costly overstay fines. Free tool for Georgian and visa-free travelers.",
};

export default function SchengenCalculatorPage() {
  return <SchengenCalculator />;
}
