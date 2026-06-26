import { createSupabaseAdmin } from "@/lib/supabase/admin";
import {
  itemNeedsReview,
  type AdminStats,
  type ContentItem,
  type OutdatedReport,
} from "@/lib/admin/content";

export async function getAdminDashboardData(): Promise<{
  stats: AdminStats;
  contentItems: ContentItem[];
  reports: OutdatedReport[];
  adminEmail: string;
}> {
  const admin = createSupabaseAdmin();
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@relocateeu.com";

  if (!admin) {
    return {
      stats: {
        totalUsers: 0,
        premiumUsers: 0,
        pendingReports: 0,
        itemsNeedingReview: 0,
      },
      contentItems: [],
      reports: [],
      adminEmail,
    };
  }

  const [
    profilesRes,
    premiumRes,
    reportsRes,
    contentRes,
  ] = await Promise.all([
    admin.from("profiles").select("id", { count: "exact", head: true }),
    admin
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .in("plan", ["premium", "pro"]),
    admin
      .from("outdated_reports")
      .select(
        `
        id,
        content_item_id,
        reported_by,
        reason,
        status,
        created_at,
        content_items ( title, country, category ),
        profiles ( email, full_name )
      `
      )
      .eq("status", "pending")
      .order("created_at", { ascending: false }),
    admin
      .from("content_items")
      .select("*")
      .eq("is_active", true)
      .order("country"),
  ]);

  const contentItems = (contentRes.data ?? []) as ContentItem[];

  const reports: OutdatedReport[] = (reportsRes.data ?? []).map((row) => {
    const r = row as Record<string, unknown>;
    const contentItemsJoin = r.content_items as
      | { title: string; country: string; category: string }
      | { title: string; country: string; category: string }[]
      | null;
    const profilesJoin = r.profiles as
      | { email: string; full_name: string | null }
      | { email: string; full_name: string | null }[]
      | null;

    const content_item = Array.isArray(contentItemsJoin)
      ? contentItemsJoin[0] ?? null
      : contentItemsJoin;
    const reporter = Array.isArray(profilesJoin)
      ? profilesJoin[0] ?? null
      : profilesJoin;

    return {
      id: r.id as string,
      content_item_id: r.content_item_id as string | null,
      reported_by: r.reported_by as string | null,
      reason: r.reason as string | null,
      status: r.status as string,
      created_at: r.created_at as string,
      content_item,
      reporter,
    };
  });

  return {
    stats: {
      totalUsers: profilesRes.count ?? 0,
      premiumUsers: premiumRes.count ?? 0,
      pendingReports: reports.length,
      itemsNeedingReview: contentItems.filter(itemNeedsReview).length,
    },
    contentItems,
    reports,
    adminEmail,
  };
}
