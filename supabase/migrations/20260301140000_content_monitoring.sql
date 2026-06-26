-- Content monitoring snapshots and pending update approvals

create table if not exists public.source_snapshots (
  id uuid primary key default gen_random_uuid(),
  source_url text not null unique,
  domain text not null,
  country text not null,
  label text not null,
  content_hash text not null,
  content_snapshot text not null,
  last_checked_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.pending_content_updates (
  id uuid primary key default gen_random_uuid(),
  source_url text not null,
  domain text not null,
  country text not null,
  label text not null,
  old_content text not null,
  new_content text not null,
  diff_summary text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  affected_entry_ids uuid[] not null default '{}',
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists pending_content_updates_status_idx
  on public.pending_content_updates (status, created_at desc);

alter table public.source_snapshots enable row level security;
alter table public.pending_content_updates enable row level security;

-- Server uses service role key for all access
