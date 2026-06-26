-- Link user plans to Clerk accounts and track AI rate limits

alter table public.user_plans
  add column if not exists clerk_user_id text unique;

create index if not exists user_plans_clerk_user_id_idx
  on public.user_plans (clerk_user_id);

create table if not exists public.ai_rate_limits (
  user_key text primary key,
  request_count integer not null default 0,
  window_start timestamptz not null default now()
);

alter table public.ai_rate_limits enable row level security;
