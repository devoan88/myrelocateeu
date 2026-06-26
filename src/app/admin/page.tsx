import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { getAdminUser } from "@/lib/admin/auth";
import { getAdminDashboardData } from "@/lib/admin/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const adminUser = await getAdminUser();

  if (!adminUser) {
    redirect("/auth/login?next=/admin");
  }

  const { stats, contentItems, reports, adminEmail } =
    await getAdminDashboardData();

  return (
    <AdminDashboard
      stats={stats}
      contentItems={contentItems}
      reports={reports}
      adminEmail={adminUser.email ?? adminEmail}
    />
  );
}
