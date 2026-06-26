import VisaCalculator from "@/components/tools/VisaCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visa Eligibility Calculator",
  description:
    "Estimate your visa eligibility for Austria, Germany, or Switzerland. Not legal advice — for guidance only.",
};

export default function VisaCalculatorPage() {
  return <VisaCalculator />;
}
