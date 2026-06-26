"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getContentStatus,
  sortContentItems,
  statusEmoji,
  statusLabel,
  type ContentItem,
  type ContentStatus,
} from "@/lib/admin/content";
import { cn } from "@/lib/cn";

type ContentHealthTableProps = {
  items: ContentItem[];
  adminEmail: string;
  onItemUpdated: (item: ContentItem) => void;
  highlightItemId?: string | null;
};

const STATUS_OPTIONS: (ContentStatus | "all")[] = [
  "all",
  "overdue",
  "review_due",
  "current",
  "new",
];

export default function ContentHealthTable({
  items,
  adminEmail,
  onItemUpdated,
  highlightItemId,
}: ContentHealthTableProps) {
  const [countryFilter, setCountryFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState<ContentStatus | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(
    highlightItemId ?? null
  );
  const [loadingId, setLoadingId] = useState<string | null>(null);

  useEffect(() => {
    if (highlightItemId) {
      setExpandedId(highlightItemId);
    }
  }, [highlightItemId]);

  const countries = useMemo(
    () => [...new Set(items.map((i) => i.country))].sort(),
    [items]
  );
  const categories = useMemo(
    () => [...new Set(items.map((i) => i.category))].sort(),
    [items]
  );

  const filtered = useMemo(() => {
    let list = sortContentItems(items);
    if (countryFilter !== "all") {
      list = list.filter((i) => i.country === countryFilter);
    }
    if (categoryFilter !== "all") {
      list = list.filter((i) => i.category === categoryFilter);
    }
    if (statusFilter !== "all") {
      list = list.filter(
        (i) => getContentStatus(i.last_verified, i.verified_by) === statusFilter
      );
    }
    return list;
  }, [items, countryFilter, categoryFilter, statusFilter]);

  async function handleMarkVerified(item: ContentItem) {
    setLoadingId(item.id);
    const res = await fetch(`/api/admin/content-items/${item.id}/verify`, {
      method: "POST",
    });
    const data = await res.json();
    if (res.ok) {
      onItemUpdated(data.item as ContentItem);
    }
    setLoadingId(null);
  }

  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-sans text-lg font-semibold text-[#0F172A]">
            Content health
          </h2>
          <p className="mt-1 font-sans text-sm text-[#475569]">
            Keep guide information accurate — overdue items first.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterSelect
            label="Country"
            value={countryFilter}
            onChange={setCountryFilter}
            options={["all", ...countries]}
          />
          <FilterSelect
            label="Category"
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={["all", ...categories]}
          />
          <FilterSelect
            label="Status"
            value={statusFilter}
            onChange={(v) => setStatusFilter(v as ContentStatus | "all")}
            options={STATUS_OPTIONS}
            formatOption={(v) =>
              v === "all" ? "All statuses" : `${statusEmoji(v as ContentStatus)} ${statusLabel(v as ContentStatus)}`
            }
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#E2E8F0] bg-white">
        <table className="w-full min-w-[900px] text-left font-sans text-sm">
          <thead className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-xs font-medium uppercase text-[#64748B]">
            <tr>
              <th className="px-4 py-3">Country</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Step title</th>
              <th className="px-4 py-3">Last verified</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-[#64748B]"
                >
                  No content items match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const status = getContentStatus(
                  item.last_verified,
                  item.verified_by
                );
                const isExpanded = expandedId === item.id;

                return (
                  <ItemRows
                    key={item.id}
                    item={item}
                    status={status}
                    isExpanded={isExpanded}
                    isHighlighted={highlightItemId === item.id}
                    loading={loadingId === item.id}
                    adminEmail={adminEmail}
                    onToggleEdit={() =>
                      setExpandedId(isExpanded ? null : item.id)
                    }
                    onMarkVerified={() => handleMarkVerified(item)}
                    onSaved={(updated) => {
                      onItemUpdated(updated);
                      setExpandedId(null);
                    }}
                    onCancel={() => setExpandedId(null)}
                  />
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  formatOption,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  formatOption?: (v: string) => string;
}) {
  return (
    <label className="font-sans text-xs text-[#64748B]">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-1.5 rounded-lg border border-[#E2E8F0] bg-white px-2 py-1.5 text-sm text-[#0F172A] capitalize"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {formatOption ? formatOption(opt) : opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function ItemRows({
  item,
  status,
  isExpanded,
  isHighlighted,
  loading,
  adminEmail,
  onToggleEdit,
  onMarkVerified,
  onSaved,
  onCancel,
}: {
  item: ContentItem;
  status: ContentStatus;
  isExpanded: boolean;
  isHighlighted: boolean;
  loading: boolean;
  adminEmail: string;
  onToggleEdit: () => void;
  onMarkVerified: () => void;
  onSaved: (item: ContentItem) => void;
  onCancel: () => void;
}) {
  const rowBg =
    status === "overdue"
      ? "bg-red-50/60"
      : status === "review_due"
        ? "bg-amber-50/40"
        : isHighlighted
          ? "bg-[#EFF6FF]"
          : "";

  return (
    <>
      <tr className={cn("hover:bg-[#F8FAFC]/80", rowBg)}>
        <td className="px-4 py-3 font-medium text-[#0F172A]">{item.country}</td>
        <td className="px-4 py-3 capitalize text-[#475569]">{item.category}</td>
        <td className="max-w-xs px-4 py-3 text-[#0F172A]">{item.title}</td>
        <td className="px-4 py-3 text-[#475569]">
          {item.last_verified ?? "—"}
        </td>
        <td className="px-4 py-3">
          <StatusBadge status={status} />
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-wrap gap-2">
            <ActionButton onClick={onToggleEdit}>
              {isExpanded ? "Close" : "Edit"}
            </ActionButton>
            <ActionButton onClick={onMarkVerified} disabled={loading}>
              {loading ? "…" : "Mark verified"}
            </ActionButton>
            <a
              href={item.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-[#E2E8F0] px-2.5 py-1 text-xs font-medium text-[#2563EB] no-underline hover:bg-[#F8FAFC]"
            >
              View official source
            </a>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={6} className="bg-[#F8FAFC] px-4 py-4">
            <InlineEditForm
              item={item}
              adminEmail={adminEmail}
              onSaved={onSaved}
              onCancel={onCancel}
            />
          </td>
        </tr>
      )}
    </>
  );
}

function StatusBadge({ status }: { status: ContentStatus }) {
  const styles: Record<ContentStatus, string> = {
    current: "bg-green-50 text-green-800",
    review_due: "bg-amber-50 text-amber-800",
    overdue: "bg-red-50 text-red-800",
    new: "bg-[#F1F5F9] text-[#64748B]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        styles[status]
      )}
    >
      {statusEmoji(status)} {statusLabel(status)}
    </span>
  );
}

function ActionButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg bg-[#EFF6FF] px-2.5 py-1 text-xs font-medium text-[#2563EB] hover:bg-[#DBEAFE] disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function InlineEditForm({
  item,
  adminEmail,
  onSaved,
  onCancel,
}: {
  item: ContentItem;
  adminEmail: string;
  onSaved: (item: ContentItem) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description ?? "");
  const [documents, setDocuments] = useState<string[]>(item.documents ?? []);
  const [docInput, setDocInput] = useState("");
  const [officialUrl, setOfficialUrl] = useState(item.official_url);
  const [lastVerified, setLastVerified] = useState(
    item.last_verified ?? new Date().toISOString().slice(0, 10)
  );
  const [importantNote, setImportantNote] = useState(item.important_note ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lastEdit = item.edit_history?.[item.edit_history.length - 1];

  function addDocument() {
    const tag = docInput.trim();
    if (tag && !documents.includes(tag)) {
      setDocuments([...documents, tag]);
    }
    setDocInput("");
  }

  function removeDocument(tag: string) {
    setDocuments(documents.filter((d) => d !== tag));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const res = await fetch(`/api/admin/content-items/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        documents,
        official_url: officialUrl,
        last_verified: lastVerified,
        important_note: importantNote,
      }),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? "Save failed");
      return;
    }

    onSaved(data.item as ContentItem);
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Title">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            required
          />
        </Field>
        <Field label="Official URL">
          <input
            value={officialUrl}
            onChange={(e) => setOfficialUrl(e.target.value)}
            className={inputClass}
            required
          />
        </Field>
      </div>

      <Field label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={inputClass}
        />
      </Field>

      <Field label="Documents">
        <div className="flex flex-wrap gap-2">
          {documents.map((doc) => (
            <span
              key={doc}
              className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs text-[#475569] ring-1 ring-[#E2E8F0]"
            >
              {doc}
              <button
                type="button"
                onClick={() => removeDocument(doc)}
                className="text-[#94A3B8] hover:text-[#EF4444]"
                aria-label={`Remove ${doc}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            value={docInput}
            onChange={(e) => setDocInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addDocument();
              }
            }}
            placeholder="Add document and press Enter"
            className={inputClass}
          />
          <button
            type="button"
            onClick={addDocument}
            className="shrink-0 rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm text-[#475569] hover:bg-white"
          >
            Add
          </button>
        </div>
      </Field>

      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Last verified">
          <input
            type="date"
            value={lastVerified}
            onChange={(e) => setLastVerified(e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Important note">
          <textarea
            value={importantNote}
            onChange={(e) => setImportantNote(e.target.value)}
            rows={2}
            className={inputClass}
          />
        </Field>
      </div>

      <p className="font-sans text-xs text-[#94A3B8]">
        {lastEdit
          ? `Last updated by ${lastEdit.updated_by} on ${new Date(lastEdit.updated_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`
          : `Changes will be recorded as ${adminEmail}`}
      </p>

      {error && (
        <p className="font-sans text-sm text-[#EF4444]" role="alert">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-[#2563EB] px-5 py-2 font-sans text-sm font-medium text-white hover:bg-[#1D4ED8] disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-[#E2E8F0] px-5 py-2 font-sans text-sm text-[#475569] hover:bg-white"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-sans text-xs font-medium text-[#475569]">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 font-sans text-sm text-[#0F172A] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#EFF6FF]";
