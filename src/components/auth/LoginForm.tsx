"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AuthButton,
  AuthDivider,
  AuthInput,
  AuthLogo,
  AuthPasswordInput,
  GoogleIcon,
} from "@/components/auth/AuthFields";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError === "auth-callback") {
      setError("Sign-in could not be completed. Please try again.");
      return;
    }
    if (urlError === "not-configured") {
      setError(
        "Sign-in is not configured yet. Add your Supabase keys to .env.local and restart the dev server."
      );
      return;
    }
    if (!isSupabaseConfigured()) {
      setError(
        "Sign-in is not configured yet. Add your Supabase keys to .env.local and restart the dev server."
      );
    }
  }, [searchParams]);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(
        "Sign-in is not configured yet. Add your Supabase keys to .env.local and restart the dev server."
      );
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    window.location.assign(next);
  }

  async function handleGoogle() {
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(
        "Sign-in is not configured yet. Add your Supabase keys to .env.local and restart the dev server."
      );
      return;
    }

    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-[400px]">
        <AuthLogo />

        <h1 className="mt-8 text-center font-sans text-2xl font-semibold text-[#0F172A]">
          Welcome back
        </h1>
        <p className="mt-2 text-center font-sans text-sm text-[#475569]">
          Sign in to access your checklist
        </p>

        <form onSubmit={handleSignIn} className="mt-8 space-y-4">
          <AuthInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
          <AuthPasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={setPassword}
            required
          />

          {error && (
            <p className="font-sans text-sm text-[#DC2626]" role="alert">
              {error}
            </p>
          )}

          <AuthButton type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </AuthButton>
        </form>

        <div className="my-6">
          <AuthDivider />
        </div>

        <AuthButton variant="google" onClick={handleGoogle}>
          <GoogleIcon />
          Continue with Google
        </AuthButton>

        <p className="mt-6 text-center font-sans text-sm text-[#475569]">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-medium text-[#2563EB] no-underline hover:text-[#1D4ED8]"
          >
            Get started →
          </Link>
        </p>

        <p className="mt-10 text-center font-sans text-xs text-[#94A3B8]">
          🔒 Your data is encrypted and never sold
        </p>
      </div>
    </main>
  );
}
