import type { DestinationCountry } from "@/lib/checklists";
import { getProgressStorageKey } from "./steps";

export type GuideProgress = Record<string, boolean>;

export function loadLocalProgress(destination: DestinationCountry): GuideProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(getProgressStorageKey(destination));
    return raw ? (JSON.parse(raw) as GuideProgress) : {};
  } catch {
    return {};
  }
}

export function saveLocalProgress(
  destination: DestinationCountry,
  progress: GuideProgress
): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(getProgressStorageKey(destination), JSON.stringify(progress));
}

export async function fetchRemoteProgress(
  destination: DestinationCountry
): Promise<GuideProgress | null> {
  try {
    const res = await fetch(
      `/api/guide/progress?destination=${encodeURIComponent(destination)}`,
      { credentials: "include" }
    );
    if (res.status === 401) return null;
    if (!res.ok) return null;
    const data = (await res.json()) as { progress: GuideProgress };
    return data.progress ?? {};
  } catch {
    return null;
  }
}

export async function saveRemoteProgress(
  destination: DestinationCountry,
  progress: GuideProgress
): Promise<boolean> {
  try {
    const res = await fetch("/api/guide/progress", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destination, progress }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
