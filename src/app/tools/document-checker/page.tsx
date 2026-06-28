import PremiumFeatureGate from "@/components/PremiumFeatureGate";
import DocumentChecker from "@/components/tools/DocumentChecker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Document Checker",
  description:
    "Verify your relocation documents against official requirements before you apply.",
};

export default function DocumentCheckerPage() {
  return (
    <PremiumFeatureGate feature="documentChecker" featureLabel="Premium feature">
      <DocumentChecker />
    </PremiumFeatureGate>
  );
}
