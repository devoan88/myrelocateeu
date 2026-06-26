import MonacoCountryPageView from "@/components/countries/MonacoCountryPageView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relocate to Monaco",
  description:
    "Premium residency guide for Monaco — accommodation, bank reference, Section de Résidents process, and official government sources.",
};

export default function MonacoCountryPage() {
  return <MonacoCountryPageView />;
}
