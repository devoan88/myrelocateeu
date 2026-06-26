import StoryCard from "@/components/stories/StoryCard";
import { STORIES } from "@/lib/stories/data";

export default function StoriesSection() {
  return (
    <section
      className="bg-[#F8FAFC] px-6 py-20"
      aria-labelledby="stories-heading"
    >
      <div className="mx-auto max-w-[1200px]">
        <h2
          id="stories-heading"
          className="text-center font-sans text-[36px] font-semibold leading-tight tracking-[-0.02em] text-[#0F172A]"
        >
          From those who made the move
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STORIES.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}
