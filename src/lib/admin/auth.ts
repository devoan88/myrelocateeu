import { createClient } from "@/lib/supabase/server";

export function getAdminEmail(): string | undefined {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase();
}

export async function getAdminUser() {
  const adminEmail = getAdminEmail();
  if (!adminEmail) return null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return null;
  if (user.email.toLowerCase() !== adminEmail) return null;

  return user;
}

export async function isAdminUser(): Promise<boolean> {
  const user = await getAdminUser();
  return Boolean(user);
}

/** @deprecated Legacy cookie auth — use isAdminUser() */
export async function isAdminAuthenticated(): Promise<boolean> {
  return isAdminUser();
}

export function verifyCronAuth(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return process.env.NODE_ENV === "development";

  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${secret}`;
}
