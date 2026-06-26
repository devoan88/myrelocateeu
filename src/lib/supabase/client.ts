import { createBrowserClient } from "@supabase/ssr";
import type { RelocationInfoRow } from "@/lib/supabase/types";
import { getSupabaseEnv, isSupabaseConfigured } from "./config";

export { isSupabaseConfigured };

export function createClient() {
  const env = getSupabaseEnv();
  if (!env) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  return createBrowserClient(env.url, env.anonKey);
}

/** @deprecated Prefer createClient() — kept for existing callers */
export function createSupabaseClient() {
  const env = getSupabaseEnv();
  if (!env) {
    return null;
  }

  return createBrowserClient(env.url, env.anonKey);
}

export type { RelocationInfoRow };
