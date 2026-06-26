import CostSimulator from "@/components/tools/CostSimulator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cost of Living Simulator",
  description:
    "Estimate monthly living costs in Vienna, Berlin, Munich, Zurich, Geneva, and Hamburg.",
};

export default function CostSimulatorPage() {
  return <CostSimulator />;
}
