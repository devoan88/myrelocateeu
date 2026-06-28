export const SCHENGEN_COUNTRIES = [
  "Austria",
  "Belgium",
  "Croatia",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "Italy",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
] as const;

export type SchengenCountry = (typeof SCHENGEN_COUNTRIES)[number];

export type SchengenVisit = {
  id: string;
  country: SchengenCountry;
  entryDate: string;
  exitDate: string;
  stillHere: boolean;
};

export const FINE_ESTIMATES = [
  { country: "Austria", fine: "€50 – €150 per day overstayed" },
  { country: "Germany", fine: "€1,000 – €5,000 flat fine" },
  { country: "France", fine: "€2,000 – €3,750 fine + possible deportation" },
  { country: "Switzerland", fine: "CHF 500 – CHF 1,500" },
  { country: "Netherlands", fine: "€3,350 fine" },
] as const;

export const MAX_SCHENGEN_DAYS = 90;
export const WINDOW_DAYS = 180;

function parseDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/** Inclusive day count between two dates (reserved for tests). */
export function daysBetweenInclusive(start: Date, end: Date): number {
  const ms = startOfDay(end).getTime() - startOfDay(start).getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
}

function getSchengenDayKeys(
  visits: SchengenVisit[],
  rangeStart: Date,
  rangeEnd: Date
): Set<string> {
  const days = new Set<string>();
  const refEnd = startOfDay(rangeEnd);

  for (const visit of visits) {
    if (!visit.entryDate) continue;

    const entry = startOfDay(parseDate(visit.entryDate));
    let exit: Date;

    if (visit.stillHere) {
      exit = refEnd;
    } else {
      if (!visit.exitDate) continue;
      exit = startOfDay(parseDate(visit.exitDate));
    }

    if (exit < entry) continue;

    const overlapStart = entry > rangeStart ? entry : rangeStart;
    const overlapEnd = exit < refEnd ? exit : refEnd;

    if (overlapStart > overlapEnd) continue;

    let cursor = overlapStart;
    while (cursor <= overlapEnd) {
      days.add(formatDateKey(cursor));
      cursor = addDays(cursor, 1);
    }
  }

  return days;
}

export function calculateSchengenDays(
  visits: SchengenVisit[],
  referenceDate: Date = new Date()
): number {
  const ref = startOfDay(referenceDate);
  const windowStart = addDays(ref, -(WINDOW_DAYS - 1));
  return getSchengenDayKeys(visits, windowStart, ref).size;
}

export type TimelineDay = {
  date: Date;
  inSchengen: boolean;
  isToday: boolean;
};

export function getTimelineDays(
  visits: SchengenVisit[],
  referenceDate: Date = new Date()
): TimelineDay[] {
  const ref = startOfDay(referenceDate);
  const windowStart = addDays(ref, -(WINDOW_DAYS - 1));
  const schengenDays = getSchengenDayKeys(visits, windowStart, ref);
  const todayKey = formatDateKey(ref);
  const days: TimelineDay[] = [];

  for (let i = 0; i < WINDOW_DAYS; i++) {
    const date = addDays(windowStart, i);
    const key = formatDateKey(date);
    days.push({
      date,
      inSchengen: schengenDays.has(key),
      isToday: key === todayKey,
    });
  }

  return days;
}

export function getDaysRemaining(visits: SchengenVisit[], referenceDate?: Date): number {
  return Math.max(0, MAX_SCHENGEN_DAYS - calculateSchengenDays(visits, referenceDate));
}

export function getNextRefreshDate(
  visits: SchengenVisit[],
  referenceDate: Date = new Date()
): Date | null {
  const ref = startOfDay(referenceDate);
  const used = calculateSchengenDays(visits, ref);
  if (used < MAX_SCHENGEN_DAYS) return null;

  for (let i = 1; i <= WINDOW_DAYS; i++) {
    const future = addDays(ref, i);
    if (calculateSchengenDays(visits, future) < MAX_SCHENGEN_DAYS) {
      return future;
    }
  }

  return null;
}

export function getEarliestSafeEntryDate(
  visits: SchengenVisit[],
  referenceDate: Date = new Date()
): Date | null {
  const ref = startOfDay(referenceDate);
  const used = calculateSchengenDays(visits, ref);

  if (used <= MAX_SCHENGEN_DAYS) return null;

  for (let i = 1; i <= 365; i++) {
    const future = addDays(ref, i);
    if (calculateSchengenDays(visits, future) < MAX_SCHENGEN_DAYS) {
      return future;
    }
  }

  return null;
}

export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getUsageColor(daysUsed: number): string {
  if (daysUsed > 80) return "#DC2626";
  if (daysUsed > 60) return "#D97706";
  return "#16A34A";
}

export function createEmptyVisit(): SchengenVisit {
  return {
    id: crypto.randomUUID(),
    country: "Germany",
    entryDate: "",
    exitDate: "",
    stillHere: false,
  };
}
