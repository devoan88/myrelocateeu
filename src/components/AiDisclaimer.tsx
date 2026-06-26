import { AI_LEGAL_DISCLAIMER } from "@/lib/legal/constants";

type AiDisclaimerProps = {
  className?: string;
  compact?: boolean;
};

export default function AiDisclaimer({
  className = "",
  compact = false,
}: AiDisclaimerProps) {
  return (
    <p
      className={`text-xs leading-relaxed text-amber-800 ${
        compact
          ? "mt-2 border-t border-amber-100 pt-2"
          : "rounded-lg border border-amber-200 bg-amber-50 px-3 py-2"
      } ${className}`}
      role="note"
    >
      {compact && "⚠ "}
      {AI_LEGAL_DISCLAIMER}
    </p>
  );
}
