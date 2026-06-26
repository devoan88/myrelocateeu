"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  DESTINATION_CITIES,
  ORIGIN_CITIES,
  STORY_TAG_OPTIONS,
} from "@/lib/stories/data";

const inputClass =
  "mt-1 w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2.5 font-sans text-sm text-[#0F172A] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#EFF6FF]";

export default function ShareStoryForm() {
  const [firstName, setFirstName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [story, setStory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const storyValid = story.trim().length >= 100;
  const canSubmit = firstName.trim() && from && to && storyValid;

  function toggleTag(tag: string) {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-[600px] rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 text-center">
        <p className="font-sans text-xl font-semibold text-[#0F172A]">
          Thank you!
        </p>
        <p className="mt-2 font-sans text-sm text-[#475569]">
          Your story was received. We&apos;ll review it and may publish it soon.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8">
        <h2 className="font-sans text-xl font-semibold text-[#0F172A]">
          Share your story
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="story-first-name"
              className="font-sans text-[13px] font-medium text-[#475569]"
            >
              First name
            </label>
            <input
              id="story-first-name"
              type="text"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="story-from"
                className="font-sans text-[13px] font-medium text-[#475569]"
              >
                From
              </label>
              <select
                id="story-from"
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className={inputClass}
              >
                <option value="" disabled>
                  Select city
                </option>
                {ORIGIN_CITIES.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="story-to"
                className="font-sans text-[13px] font-medium text-[#475569]"
              >
                To
              </label>
              <select
                id="story-to"
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className={inputClass}
              >
                <option value="" disabled>
                  Select city
                </option>
                {DESTINATION_CITIES.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="story-body"
              className="font-sans text-[13px] font-medium text-[#475569]"
            >
              Your story
            </label>
            <textarea
              id="story-body"
              required
              minLength={100}
              rows={5}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="What helped you most? What would you tell someone just starting out?"
              className={cn(inputClass, "resize-y")}
            />
            <p
              className={cn(
                "mt-1 font-sans text-xs",
                story.length > 0 && !storyValid
                  ? "text-[#D97706]"
                  : "text-[#94A3B8]"
              )}
            >
              {story.trim().length}/100 characters minimum
            </p>
          </div>

          <div>
            <p className="font-sans text-[13px] font-medium text-[#475569]">
              Tags
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {STORY_TAG_OPTIONS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "rounded-md px-2 py-1 font-sans text-xs transition-colors",
                    tags.includes(tag)
                      ? "bg-[#2563EB] text-white"
                      : "bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-sans text-[13px] font-medium text-[#475569]">
              Star rating
            </p>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-2xl leading-none transition-transform hover:scale-110"
                  style={{ color: star <= rating ? "#FBBF24" : "#E2E8F0" }}
                  aria-label={`Rate ${star} stars`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-2 w-full rounded-lg bg-[#2563EB] py-3 font-sans text-[15px] font-medium text-white transition-colors hover:bg-[#1D4ED8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit story →
          </button>
        </form>
      </div>

      <p className="mt-4 text-center font-sans text-xs text-[#94A3B8]">
        Stories are reviewed before publishing. First name and first letter of
        surname only are shown. Your email is never displayed.
      </p>
    </div>
  );
}
