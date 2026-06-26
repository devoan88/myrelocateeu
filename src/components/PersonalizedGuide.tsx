type PersonalizedGuideProps = {
  content: string;
  origin: string;
  destination: string;
};

export default function PersonalizedGuide({
  content,
  origin,
  destination,
}: PersonalizedGuideProps) {
  const paragraphs = content.split("\n").filter((line) => line.trim());

  return (
    <section className="mb-10 rounded-2xl border border-blue-200 bg-white p-6 shadow-lg shadow-blue-100/50 sm:p-8">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
          AI
        </span>
        <div>
          <p className="font-semibold text-slate-900">
            Your personalized guide
          </p>
          <p className="text-xs text-slate-500">
            {origin} → {destination} · Based on verified sources
          </p>
        </div>
      </div>

      <div className="space-y-3 text-sm leading-relaxed text-slate-700">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className="whitespace-pre-wrap">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
