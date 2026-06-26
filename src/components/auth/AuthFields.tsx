"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

export function AuthLogo() {
  return (
    <p className="text-center font-sans text-lg font-medium text-[#0F172A]">
      RelocateEU
    </p>
  );
}

export function AuthInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-sans text-[13px] font-medium text-[#475569]"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-[#E2E8F0] px-3 font-sans text-sm text-[#0F172A] outline-none transition-[border-color,box-shadow] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#EFF6FF]"
      />
    </div>
  );
}

export function AuthPasswordInput({
  id,
  label,
  value,
  onChange,
  required,
  autoComplete = "current-password",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block font-sans text-[13px] font-medium text-[#475569]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          autoComplete={autoComplete}
          className="h-11 w-full rounded-lg border border-[#E2E8F0] px-3 pr-10 font-sans text-sm text-[#0F172A] outline-none transition-[border-color,box-shadow] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#EFF6FF]"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#475569]"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" aria-hidden />
          ) : (
            <Eye className="h-4 w-4" aria-hidden />
          )}
        </button>
      </div>
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-[#E2E8F0]" />
      <span className="font-sans text-sm text-[#94A3B8]">or</span>
      <div className="h-px flex-1 bg-[#E2E8F0]" />
    </div>
  );
}

export function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function AuthButton({
  children,
  type = "button",
  disabled,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  variant?: "primary" | "google";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-11 w-full items-center justify-center gap-2 rounded-lg font-sans text-[15px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-[#2563EB] text-white hover:bg-[#1D4ED8]",
        variant === "google" &&
          "border border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]"
      )}
    >
      {children}
    </button>
  );
}

export function passwordStrength(password: string): {
  label: string;
  level: 0 | 1 | 2 | 3 | 4;
} {
  if (!password) return { label: "", level: 0 };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ["Weak", "Fair", "Good", "Strong"] as const;
  const level = Math.max(1, score) as 1 | 2 | 3 | 4;
  return { label: labels[level - 1], level };
}

export function PasswordStrengthBar({ password }: { password: string }) {
  const { label, level } = passwordStrength(password);
  if (!password) return null;

  const colors = ["#DC2626", "#D97706", "#2563EB", "#16A34A"];

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full bg-[#E2E8F0]"
            style={{
              backgroundColor: i <= level ? colors[level - 1] : undefined,
            }}
          />
        ))}
      </div>
      <p className="mt-1 font-sans text-xs text-[#64748B]">{label} password</p>
    </div>
  );
}
