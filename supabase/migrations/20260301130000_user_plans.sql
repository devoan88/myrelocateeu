-- User subscription plans (synced from Stripe)
create table if not exists public.user_plans (
  id uuid primary key default gen_random_uuid(),
  stripe_customer_id text unique,
  stripe_subscription_id text unique,
  email text,
  plan text not null default 'free' check (plan in ('free', 'premium', 'pro')),
  subscription_status text,
  chat_messages_used integer not null default 0,
  chat_period_start date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists user_plans_stripe_subscription_idx
  on public.user_plans (stripe_subscription_id);

create index if not exists user_plans_email_idx
  on public.user_plans (email);

alter table public.user_plans enable row level security;

-- No public policies: server uses service role key for reads/writes

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger user_plans_updated_at
  before update on public.user_plans
  for each row execute function public.set_updated_at();
