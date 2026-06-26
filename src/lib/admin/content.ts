export type EditHistoryEntry = {
  updated_by: string;
  updated_at: string;
  action: "edit" | "verify" | "create";
  changes?: Record<string, { from: unknown; to: unknown }>;
};

export type ContentItem = {
  id: string;
  country: string;
  step_id: string;
  category: string;
  title: string;
  description: string | null;
  documents: string[] | null;
  official_url: string;
  official_name: string;
  time_estimate: string | null;
  cost: string | null;
  important_note: string | null;
  last_verified: string | null;
  verified_by: string | null;
  is_active: boolean;
  edit_history: EditHistoryEntry[] | null;
  created_at: string;
  updated_at: string;
};

export type ContentStatus = "current" | "review_due" | "overdue" | "new";

export type OutdatedReport = {
  id: string;
  content_item_id: string | null;
  reported_by: string | null;
  reason: string | null;
  status: string;
  created_at: string;
  content_item?: Pick<ContentItem, "title" | "country" | "category"> | null;
  reporter?: { email: string; full_name: string | null } | null;
};

export type AdminStats = {
  totalUsers: number;
  premiumUsers: number;
  pendingReports: number;
  itemsNeedingReview: number;
};

const STATUS_ORDER: Record<ContentStatus, number> = {
  overdue: 0,
  review_due: 1,
  new: 2,
  current: 3,
};

export function daysSinceVerified(lastVerified: string | null): number | null {
  if (!lastVerified) return null;
  const verified = new Date(lastVerified);
  const now = new Date();
  return Math.floor((now.getTime() - verified.getTime()) / (1000 * 60 * 60 * 24));
}

export function getContentStatus(
  lastVerified: string | null,
  verifiedBy: string | null
): ContentStatus {
  if (!lastVerified || !verifiedBy) return "new";
  const days = daysSinceVerified(lastVerified);
  if (days === null) return "new";
  if (days <= 30) return "current";
  if (days <= 60) return "review_due";
  return "overdue";
}

export function statusLabel(status: ContentStatus): string {
  switch (status) {
    case "current":
      return "Current";
    case "review_due":
      return "Review due";
    case "overdue":
      return "Overdue";
    default:
      return "New";
  }
}

export function statusEmoji(status: ContentStatus): string {
  switch (status) {
    case "current":
      return "🟢";
    case "review_due":
      return "🟡";
    case "overdue":
      return "🔴";
    default:
      return "⚪";
  }
}

export function sortContentItems(items: ContentItem[]): ContentItem[] {
  return [...items].sort((a, b) => {
    const statusA = getContentStatus(a.last_verified, a.verified_by);
    const statusB = getContentStatus(b.last_verified, b.verified_by);
    const orderDiff = STATUS_ORDER[statusA] - STATUS_ORDER[statusB];
    if (orderDiff !== 0) return orderDiff;

    const daysA = daysSinceVerified(a.last_verified) ?? 999;
    const daysB = daysSinceVerified(b.last_verified) ?? 999;
    return daysB - daysA;
  });
}

export function itemNeedsReview(item: ContentItem): boolean {
  const status = getContentStatus(item.last_verified, item.verified_by);
  return status !== "current";
}

export function appendEditHistory(
  existing: EditHistoryEntry[] | null,
  entry: EditHistoryEntry
): EditHistoryEntry[] {
  return [...(existing ?? []), entry];
}

export function buildChangeSet(
  before: ContentItem,
  after: Partial<ContentItem>
): Record<string, { from: unknown; to: unknown }> {
  const changes: Record<string, { from: unknown; to: unknown }> = {};
  const fields: (keyof ContentItem)[] = [
    "title",
    "description",
    "documents",
    "official_url",
    "important_note",
    "last_verified",
  ];

  for (const field of fields) {
    if (field in after && after[field] !== undefined) {
      const fromVal = before[field];
      const toVal = after[field];
      if (JSON.stringify(fromVal) !== JSON.stringify(toVal)) {
        changes[field] = { from: fromVal, to: toVal };
      }
    }
  }

  return changes;
}
