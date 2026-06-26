import type { Story } from "@/lib/stories/data";

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="mt-3 flex gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-base leading-none"
          style={{ color: i < rating ? "#FBBF24" : "#E2E8F0" }}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function StoryCard({ story }: { story: Story }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-6">
      <div className="flex items-start gap-3">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-sans text-sm font-semibold text-[#0F172A]"
          style={{ backgroundColor: story.avatarBg }}
        >
          {story.initials}
        </div>
        <div className="min-w-0">
          <p className="font-sans text-[15px] font-semibold text-[#0F172A]">
            {story.name}
          </p>
          <p className="mt-0.5 font-sans text-[13px] text-[#475569]">
            {story.originFlag} {story.origin} → {story.destinationFlag}{" "}
            {story.destination}
          </p>
        </div>
      </div>

      <StarRating rating={story.rating} />

      <blockquote className="mt-3 flex-1 font-sans text-[15px] italic leading-[1.65] text-[#0F172A]">
        &ldquo;{story.quote}&rdquo;
      </blockquote>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {story.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-[#F1F5F9] px-2 py-0.5 font-sans text-xs text-[#475569]"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
