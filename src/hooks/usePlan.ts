"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  PLAN_FEATURES,
  type PlanFeatures,
  type PlanTier,
} from "@/lib/features";

export function usePlan() {
  const [plan, setPlan] = useState<PlanTier>("free");
  const [destinationCountry, setDestinationCountry] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPlan() {
      try {
        const supabase = createClient();
        const { data: authData } = await supabase.auth.getUser();
        if (cancelled) return;

        if (authData.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("plan, destination_country")
            .eq("id", authData.user.id)
            .single();

          if (!cancelled) {
            if (profile?.plan) setPlan(profile.plan as PlanTier);
            if (profile?.destination_country) {
              setDestinationCountry(profile.destination_country);
            }
          }
        }
      } catch {
        /* Supabase not configured or request failed */
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadPlan();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    plan,
    features: PLAN_FEATURES[plan] as PlanFeatures,
    destinationCountry,
    loading,
  };
}
