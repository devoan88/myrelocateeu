"use client";

import { useState } from "react";
import type { RelocationInfo } from "@/lib/supabase/types";

type EditEntryFormProps = {
  entry: RelocationInfo;
  onClose: () => void;
  onSaved: (entry: RelocationInfo) => void;
};

export default function EditEntryForm({
  entry,
  onClose,
  onSaved,
}: EditEntryFormProps) {
  const [form, setForm] = useState({ ...entry });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const response = await fetch(`/api/admin/relocation-info/${entry.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (response.ok) {
      onSaved(data.entry);
      onClose();
    } else {
      setError(data.error ?? "Save failed");
    }
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Edit entry</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <p className="mb-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-900">
          Saving will set <strong>last verified</strong> to today (
          {new Date().toISOString().slice(0, 10)}).
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Country" value={form.country} onChange={(v) => setForm({ ...form, country: v })} />
            <Field label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v as RelocationInfo["category"] })} />
            <Field label="Language" value={form.language} onChange={(v) => setForm({ ...form, language: v as RelocationInfo["language"] })} />
            <Field label="Source URL" value={form.source_url} onChange={(v) => setForm({ ...form, source_url: v })} />
          </div>
          <Field label="Title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
          <div>
            <label className="block text-sm font-medium text-slate-700">Content</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={10}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
