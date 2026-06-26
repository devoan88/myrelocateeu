-- Per-user guide step completion (synced from client when authenticated)
create table if not exists public.guide_progress (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  destination text not null,
  step_id text not null,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (user_id, destination, step_id)
);

create index if not exists guide_progress_user_destination_idx
  on public.guide_progress (user_id, destination);

alter table public.guide_progress enable row level security;

-- Server uses service role key for reads/writes

create trigger guide_progress_updated_at
  before update on public.guide_progress
  for each row execute function public.set_updated_at();
