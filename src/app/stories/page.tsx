import ShareStoryForm from "@/components/stories/ShareStoryForm";
import StoryCard from "@/components/stories/StoryCard";
import { STORIES } from "@/lib/stories/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Relocation Stories",
  description:
    "Honest accounts from people who relocated to Austria, Germany, and Switzerland using RelocateEU.",
};

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-white px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-[13px] font-medium uppercase tracking-wider text-[#2563EB]">
            Community
          </p>
          <h1 className="mt-3 font-sans text-[44px] font-semibold leading-tight tracking-[-0.02em] text-[#0F172A]">
            From those who made the move
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-lg text-[#475569]">
            Honest accounts from people who relocated using RelocateEU
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      <section className="border-t border-[#E2E8F0] bg-white px-6 py-20">
        <ShareStoryForm />
      </section>
    </main>
  );
}
