"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AuthButton,
  AuthDivider,
  AuthInput,
  AuthLogo,
  AuthPasswordInput,
  GoogleIcon,
  PasswordStrengthBar,
} from "@/components/auth/AuthFields";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { DESTINATION_COUNTRY_NAMES } from "@/data/countries";

const DESTINATIONS = DESTINATION_COUNTRY_NAMES;

export default function RegisterForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [destination, setDestination] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!agreed) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setError(null);

    if (!isSupabaseConfigured()) {
      setError(
        "Registration is not configured yet. Add your Supabase keys to .env.local and restart the dev server."
      );
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        data: { destination_country: destination },
      },
    });

    if (signUpError) {
      setLoading(false);
      setError(signUpError.message);
      return;
    }

    if (data.user && destination) {
      await supabase
        .from("profiles")
        .update({ destination_country: destination })
        .eq("id", data.user.id);
    }

    setLoading(false);

    if (data.session) {
      window.location.assign("/dashboard");
    } else {
      router.push("/auth/login?message=confirm-email");
    }
  }

  async function handleGoogle() {
    if (!agreed) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setError(null);

    if (!isSupabaseConfigured()) {
      setError(
        "Registration is not configured yet. Add your Supabase keys to .env.local and restart the dev server."
      );
      return;
    }

    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
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
          Create your account
        </h1>
        <p className="mt-2 text-center font-sans text-sm text-[#475569]">
          Start your free relocation checklist
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-4">
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

          <div>
            <AuthPasswordInput
              id="password"
              label="Password"
              value={password}
              onChange={setPassword}
              required
              autoComplete="new-password"
            />
            <PasswordStrengthBar password={password} />
          </div>

          <div>
            <label
              htmlFor="destination"
              className="mb-1.5 block font-sans text-[13px] font-medium text-[#475569]"
            >
              Where are you moving?
            </label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="h-11 w-full rounded-lg border border-[#E2E8F0] px-3 font-sans text-sm text-[#0F172A] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#EFF6FF]"
            >
              <option value="" disabled>
                Select destination
              </option>
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-[#CBD5E1] accent-[#2563EB]"
            />
            <span className="font-sans text-sm text-[#475569]">
              I agree to the{" "}
              <Link
                href="/privacy-policy"
                className="text-[#2563EB] no-underline hover:text-[#1D4ED8]"
              >
                Terms of Service and Privacy Policy
              </Link>
            </span>
          </label>

          {error && (
            <p className="font-sans text-sm text-[#DC2626]" role="alert">
              {error}
            </p>
          )}

          <AuthButton type="submit" disabled={loading || !agreed}>
            {loading ? "Creating account…" : "Create free account"}
          </AuthButton>
        </form>

        <div className="my-6">
          <AuthDivider />
        </div>

        <AuthButton variant="google" onClick={handleGoogle} disabled={!agreed}>
          <GoogleIcon />
          Continue with Google
        </AuthButton>

        <p className="mt-6 text-center font-sans text-sm text-[#475569]">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-[#2563EB] no-underline hover:text-[#1D4ED8]"
          >
            Sign in
          </Link>
        </p>

        <p className="mt-10 text-center font-sans text-xs text-[#94A3B8]">
          🔒 Your data is encrypted and never sold
        </p>
      </div>
    </main>
  );
}
