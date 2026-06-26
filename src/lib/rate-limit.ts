import { FREE_AI_HOURLY_LIMIT } from "@/lib/legal/constants";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

const WINDOW_MS = 60 * 60 * 1000;

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
};

export async function checkHourlyRateLimit(
  userKey: string,
  limit: number = FREE_AI_HOURLY_LIMIT
): Promise<RateLimitResult> {
  const admin = createSupabaseAdmin();
  const now = new Date();

  if (!admin) {
    return { allowed: true, remaining: limit, resetAt: new Date(now.getTime() + WINDOW_MS) };
  }

  const { data } = await admin
    .from("ai_rate_limits")
    .select("*")
    .eq("user_key", userKey)
    .maybeSingle();

  if (!data) {
    return { allowed: true, remaining: limit, resetAt: new Date(now.getTime() + WINDOW_MS) };
  }

  const windowStart = new Date(data.window_start);
  const windowExpired = now.getTime() - windowStart.getTime() >= WINDOW_MS;

  if (windowExpired) {
    return { allowed: true, remaining: limit, resetAt: new Date(now.getTime() + WINDOW_MS) };
  }

  const remaining = Math.max(0, limit - data.request_count);
  const resetAt = new Date(windowStart.getTime() + WINDOW_MS);

  return {
    allowed: remaining > 0,
    remaining,
    resetAt,
  };
}

export async function incrementHourlyRateLimit(userKey: string): Promise<void> {
  const admin = createSupabaseAdmin();
  if (!admin) return;

  const now = new Date();
  const { data } = await admin
    .from("ai_rate_limits")
    .select("*")
    .eq("user_key", userKey)
    .maybeSingle();

  if (!data) {
    await admin.from("ai_rate_limits").insert({
      user_key: userKey,
      request_count: 1,
      window_start: now.toISOString(),
    });
    return;
  }

  const windowStart = new Date(data.window_start);
  const windowExpired = now.getTime() - windowStart.getTime() >= WINDOW_MS;

  if (windowExpired) {
    await admin
      .from("ai_rate_limits")
      .update({ request_count: 1, window_start: now.toISOString() })
      .eq("user_key", userKey);
  } else {
    await admin
      .from("ai_rate_limits")
      .update({ request_count: data.request_count + 1 })
      .eq("user_key", userKey);
  }
}
