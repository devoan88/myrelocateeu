import type { RelocationInfo, RelocationLanguage } from "@/lib/supabase/types";
import { sourceLabels } from "@/lib/relocation-info";

type RelocationInfoBlockProps = {
  info: RelocationInfo;
  language: RelocationLanguage;
};

export default function RelocationInfoBlock({
  info,
  language,
}: RelocationInfoBlockProps) {
  const paragraphs = info.content.split("\n\n").filter(Boolean);

  return (
    <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
      <div className="space-y-3 text-sm leading-relaxed text-slate-700">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-4 border-t border-blue-100 pt-3">
        <a
          href={info.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          {sourceLabels[language]}
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
