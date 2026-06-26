"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useLanguage } from "@/context/LanguageContext";
import { LOCALES, type Locale } from "@/lib/i18n/translations";
import type { UserProfile } from "@/lib/dashboard/utils";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/cn";
import { DESTINATION_COUNTRY_NAMES } from "@/data/countries";

const DESTINATIONS = DESTINATION_COUNTRY_NAMES;

const NOTIF_KEYS = {
  weekly: "relocateeu_notif_weekly",
  deadlines: "relocateeu_notif_deadlines",
  updates: "relocateeu_notif_updates",
} as const;

type SettingsTabProps = {
  profile: UserProfile;
  onProfileUpdate: (profile: UserProfile) => void;
};

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="font-sans text-sm text-[#475569]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full transition-colors",
          checked ? "bg-[#2563EB]" : "bg-[#E2E8F0]"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform",
            checked ? "left-5" : "left-0.5"
          )}
        />
      </button>
    </div>
  );
}

function DeleteModal({
  open,
  onClose,
  onConfirm,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="delete-title">
      <h3
        id="delete-title"
        className="font-sans text-lg font-semibold text-[#0F172A]"
      >
        Delete your account?
      </h3>
      <p className="mt-2 font-sans text-sm text-[#475569]">
        This permanently removes your profile, checklist progress, and account
        data. This action cannot be undone.
      </p>
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="rounded-lg border border-[#E2E8F0] px-4 py-2 font-sans text-sm text-[#475569] hover:bg-[#F8FAFC]"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="rounded-lg bg-[#EF4444] px-4 py-2 font-sans text-sm font-medium text-white hover:bg-[#DC2626] disabled:opacity-50"
        >
          {loading ? "Deleting…" : "Delete account"}
        </button>
      </div>
    </Modal>
  );
}

export default function SettingsTab({
  profile,
  onProfileUpdate,
}: SettingsTabProps) {
  const router = useRouter();
  const { locale, setLocale } = useLanguage();

  const [fullName, setFullName] = useState(profile.full_name ?? "");
  const [email] = useState(profile.email);
  const [origin, setOrigin] = useState(profile.origin_country ?? "");
  const [destination, setDestination] = useState(
    profile.destination_country ?? ""
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [notifWeekly, setNotifWeekly] = useState(false);
  const [notifDeadlines, setNotifDeadlines] = useState(false);
  const [notifUpdates, setNotifUpdates] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setNotifWeekly(localStorage.getItem(NOTIF_KEYS.weekly) === "1");
    setNotifDeadlines(localStorage.getItem(NOTIF_KEYS.deadlines) === "1");
    setNotifUpdates(localStorage.getItem(NOTIF_KEYS.updates) === "1");
  }, []);

  function saveNotif(key: string, value: boolean) {
    localStorage.setItem(key, value ? "1" : "0");
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const supabase = createClient();
    const { data, error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim() || null,
        origin_country: origin || null,
        destination_country: destination || null,
      })
      .eq("id", profile.id)
      .select()
      .single();

    setSaving(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      onProfileUpdate(data as UserProfile);
      setMessage("Profile saved.");
    }
  }

  async function handleDeleteAccount() {
    setDeleting(true);
    try {
      const res = await fetch("/api/account/delete", { method: "POST" });
      if (!res.ok) {
        setMessage("Could not delete account. Please contact support.");
        setDeleting(false);
        setDeleteOpen(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setMessage("Could not delete account. Please contact support.");
      setDeleting(false);
      setDeleteOpen(false);
    }
  }

  return (
    <div className="max-w-xl space-y-10">
      <div>
        <h1 className="font-sans text-[28px] font-semibold text-[#0F172A]">
          Settings
        </h1>
        <p className="mt-2 font-sans text-sm text-[#475569]">
          Manage your profile and preferences.
        </p>
      </div>

      <section>
        <h2 className="font-sans text-base font-semibold text-[#0F172A]">
          Profile
        </h2>
        <form onSubmit={handleSaveProfile} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="full-name"
              className="mb-1.5 block font-sans text-[13px] font-medium text-[#475569]"
            >
              Full name
            </label>
            <input
              id="full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-11 w-full rounded-lg border border-[#E2E8F0] px-3 font-sans text-sm outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#EFF6FF]"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block font-sans text-[13px] font-medium text-[#475569]"
            >
              Email
            </label>
            <input
              id="email"
              value={email}
              disabled
              className="h-11 w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 font-sans text-sm text-[#64748B]"
            />
          </div>
          <div>
            <label
              htmlFor="origin"
              className="mb-1.5 block font-sans text-[13px] font-medium text-[#475569]"
            >
              Origin country
            </label>
            <input
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Georgia"
              className="h-11 w-full rounded-lg border border-[#E2E8F0] px-3 font-sans text-sm outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#EFF6FF]"
            />
          </div>
          <div>
            <label
              htmlFor="destination"
              className="mb-1.5 block font-sans text-[13px] font-medium text-[#475569]"
            >
              Destination country
            </label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="h-11 w-full rounded-lg border border-[#E2E8F0] px-3 font-sans text-sm outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#EFF6FF]"
            >
              <option value="">Select destination</option>
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-[#2563EB] px-5 py-2.5 font-sans text-sm font-medium text-white hover:bg-[#1D4ED8] disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save profile"}
          </button>
        </form>
      </section>

      <section>
        <h2 className="font-sans text-base font-semibold text-[#0F172A]">
          Notifications
        </h2>
        <div className="mt-2 divide-y divide-[#E2E8F0] rounded-lg border border-[#E2E8F0] px-4">
          <Toggle
            label="Email me weekly progress summary"
            checked={notifWeekly}
            onChange={(v) => {
              setNotifWeekly(v);
              saveNotif(NOTIF_KEYS.weekly, v);
            }}
          />
          <Toggle
            label="Remind me of upcoming deadlines"
            checked={notifDeadlines}
            onChange={(v) => {
              setNotifDeadlines(v);
              saveNotif(NOTIF_KEYS.deadlines, v);
            }}
          />
          <Toggle
            label="Alert me when guide content is updated"
            checked={notifUpdates}
            onChange={(v) => {
              setNotifUpdates(v);
              saveNotif(NOTIF_KEYS.updates, v);
            }}
          />
        </div>
      </section>

      <section>
        <h2 className="font-sans text-base font-semibold text-[#0F172A]">
          Language
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {LOCALES.map(({ code, label }) => (
            <label
              key={code}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 font-sans text-sm transition-colors",
                locale === code
                  ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]"
                  : "border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC]"
              )}
            >
              <input
                type="radio"
                name="language"
                value={code}
                checked={locale === code}
                onChange={() => setLocale(code as Locale)}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </section>

      {message && (
        <p className="font-sans text-sm text-[#475569]" role="status">
          {message}
        </p>
      )}

      <section className="border-t border-[#FEE2E2] pt-10">
        <h2 className="font-sans text-base font-semibold text-[#EF4444]">
          Danger zone
        </h2>
        <button
          type="button"
          onClick={() => setDeleteOpen(true)}
          className="mt-3 font-sans text-sm text-[#EF4444] hover:text-[#DC2626]"
        >
          Delete my account
        </button>
      </section>

      <DeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteAccount}
        loading={deleting}
      />
    </div>
  );
}
