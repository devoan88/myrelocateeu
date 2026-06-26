"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import GuideDisclaimer from "@/components/guide/GuideDisclaimer";
import GuideSidebar from "@/components/guide/GuideSidebar";
import GuideSkeleton from "@/components/guide/GuideSkeleton";
import GuideStepCard from "@/components/guide/GuideStepCard";
import type { DestinationCountry } from "@/lib/checklists";
import {
  fetchRemoteProgress,
  loadLocalProgress,
  saveLocalProgress,
  saveRemoteProgress,
} from "@/lib/guide/progress";
import { getGuideSteps } from "@/lib/guide/steps";
import type { GuideStepCategory } from "@/lib/guide/types";
import {
  toastProgressSaved,
  toastSaveError,
  toastStepCompleted,
} from "@/lib/toast";

type GuideClientProps = {
  destination: DestinationCountry;
  origin: string;
  hasChildren: boolean;
  userId: string | null;
};

const ORIGIN_CITIZENS: Record<string, string> = {
  Georgia: "Georgian citizens",
  Ukraine: "Ukrainian citizens",
  Armenia: "Armenian citizens",
  India: "Indian citizens",
};

function formatOriginCitizens(origin: string): string {
  return ORIGIN_CITIZENS[origin] ?? `${origin} citizens`;
}

export default function GuideClient({
  destination,
  origin,
  hasChildren,
  userId,
}: GuideClientProps) {
  const steps = useMemo(
    () => getGuideSteps(destination, hasChildren),
    [destination, hasChildren]
  );

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const saveToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      if (userId) {
        const remote = await fetchRemoteProgress(destination);
        if (!cancelled && remote) {
          setChecked(remote);
          saveLocalProgress(destination, remote);
          setHydrated(true);
          return;
        }
      }

      if (!cancelled) {
        setChecked(loadLocalProgress(destination));
        setHydrated(true);
      }
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, [destination, userId]);

  useEffect(() => {
    if (!hydrated) return;

    saveLocalProgress(destination, checked);

    if (!userId) return;

    void saveRemoteProgress(destination, checked).then((ok) => {
      if (saveToastTimer.current) {
        clearTimeout(saveToastTimer.current);
      }
      saveToastTimer.current = setTimeout(() => {
        if (ok) {
          toastProgressSaved();
        } else {
          toastSaveError();
        }
      }, 600);
    });

    return () => {
      if (saveToastTimer.current) {
        clearTimeout(saveToastTimer.current);
      }
    };
  }, [checked, destination, hydrated, userId]);

  const completedCount = steps.filter((s) => checked[s.id]).length;

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = !prev[id];
      if (next) {
        toastStepCompleted();
      }
      return { ...prev, [id]: next };
    });
  }, []);

  const scrollToCategory = useCallback((category: GuideStepCategory) => {
    setActiveCategory(category);
    const el = document.querySelector(`[data-category="${category}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const subtitleOrigin = formatOriginCitizens(origin);

  if (!hydrated) {
    return <GuideSkeleton />;
  }

  if (steps.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-sans text-xl font-semibold text-foreground">
            No guide found for this combination
          </h1>
          <p className="mt-2 font-sans text-sm text-muted-foreground">
            We don&apos;t have a guide for {origin} → {destination} yet. Try
            another destination from the homepage.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-background lg:flex-row">
      <GuideSidebar
        origin={origin}
        destination={destination}
        hasChildren={hasChildren}
        completed={completedCount}
        total={steps.length}
        steps={steps}
        checked={checked}
        activeCategory={activeCategory}
        onCategoryClick={scrollToCategory}
      />

      <div className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[800px] p-6 lg:p-8">
          <GuideDisclaimer />

          <h1 className="font-sans text-[28px] font-semibold text-foreground">
            {destination} Relocation Guide
          </h1>
          <p className="mt-2 font-sans text-base text-muted-foreground">
            Personalised for {subtitleOrigin} · Last reviewed June 2026
          </p>

          <div className="mt-8">
            {steps.map((step) => (
              <GuideStepCard
                key={step.id}
                step={step}
                checked={Boolean(checked[step.id])}
                onToggle={() => toggle(step.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
