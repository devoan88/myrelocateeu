export type RelocationCategory =
  | "visa"
  | "bank"
  | "school"
  | "healthcare"
  | "work";

export type RelocationLanguage = "ka" | "en" | "de";

export type RelocationInfo = {
  id: string;
  country: string;
  category: RelocationCategory;
  title: string;
  content: string;
  source_url: string;
  last_updated: string;
  language: RelocationLanguage;
};

export type RelocationInfoRow = RelocationInfo;

export type SourceSnapshot = {
  id: string;
  source_url: string;
  domain: string;
  country: string;
  label: string;
  content_hash: string;
  content_snapshot: string;
  last_checked_at: string;
  created_at: string;
};

export type PendingContentUpdate = {
  id: string;
  source_url: string;
  domain: string;
  country: string;
  label: string;
  old_content: string;
  new_content: string;
  diff_summary: string | null;
  status: "pending" | "approved" | "rejected";
  affected_entry_ids: string[];
  reviewed_at: string | null;
  created_at: string;
};
