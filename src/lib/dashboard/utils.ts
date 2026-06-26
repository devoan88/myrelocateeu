export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function getInitials(name: string | null, email: string): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  }
  return email.slice(0, 2).toUpperCase();
}

export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  }
  const months = Math.floor(diffDays / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

export type DashboardTab =
  | "overview"
  | "checklists"
  | "tools"
  | "settings"
  | "billing";

export const DASHBOARD_TABS: { id: DashboardTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "checklists", label: "My checklists" },
  { id: "tools", label: "Tools" },
  { id: "settings", label: "Settings" },
  { id: "billing", label: "Billing" },
];

export type UserProfile = {
  id: string;
  email: string;
  full_name: string | null;
  origin_country: string | null;
  destination_country: string | null;
  has_children: boolean;
  num_children: number;
  plan: string;
  plan_expires_at: string | null;
};
