-- RelocateEU core schema (run in Supabase SQL editor or via CLI)

-- ---------------------------------------------------------------------------
-- Helpers
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  origin_country text,
  destination_country text,
  has_children boolean default false,
  num_children integer default 0,
  plan text default 'free',
  plan_expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.guide_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  country text not null,
  step_id text not null,
  completed boolean default false,
  completed_at timestamptz,
  unique (user_id, country, step_id)
);

create table if not exists public.content_items (
  id uuid default gen_random_uuid() primary key,
  country text not null,
  step_id text not null,
  category text not null,
  title text not null,
  description text,
  documents text[],
  official_url text not null,
  official_name text not null,
  time_estimate text,
  cost text,
  important_note text,
  last_verified date,
  verified_by text,
  is_active boolean default true,
  edit_history jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.outdated_reports (
  id uuid default gen_random_uuid() primary key,
  content_item_id uuid references public.content_items(id) on delete set null,
  reported_by uuid references public.profiles(id) on delete set null,
  reason text,
  status text default 'pending',
  created_at timestamptz default now()
);

-- ---------------------------------------------------------------------------
-- Triggers
-- ---------------------------------------------------------------------------

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists content_items_updated_at on public.content_items;
create trigger content_items_updated_at
  before update on public.content_items
  for each row execute function public.set_updated_at();

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.guide_progress enable row level security;
alter table public.content_items enable row level security;
alter table public.outdated_reports enable row level security;

-- profiles: users can read/update only their own row
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- guide_progress: users can CRUD only their own rows
drop policy if exists "guide_progress_select_own" on public.guide_progress;
create policy "guide_progress_select_own"
  on public.guide_progress for select
  using (auth.uid() = user_id);

drop policy if exists "guide_progress_insert_own" on public.guide_progress;
create policy "guide_progress_insert_own"
  on public.guide_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "guide_progress_update_own" on public.guide_progress;
create policy "guide_progress_update_own"
  on public.guide_progress for update
  using (auth.uid() = user_id);

drop policy if exists "guide_progress_delete_own" on public.guide_progress;
create policy "guide_progress_delete_own"
  on public.guide_progress for delete
  using (auth.uid() = user_id);

-- content_items: anyone can read; only service role can write (no write policies)
drop policy if exists "content_items_select_public" on public.content_items;
create policy "content_items_select_public"
  on public.content_items for select
  using (true);

-- outdated_reports: users can insert; service role reads/updates (no select policy for users)
drop policy if exists "outdated_reports_insert_own" on public.outdated_reports;
create policy "outdated_reports_insert_own"
  on public.outdated_reports for insert
  with check (auth.uid() = reported_by);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

create index if not exists guide_progress_user_country_idx
  on public.guide_progress (user_id, country);

create index if not exists content_items_country_step_idx
  on public.content_items (country, step_id);

create index if not exists outdated_reports_status_idx
  on public.outdated_reports (status);
