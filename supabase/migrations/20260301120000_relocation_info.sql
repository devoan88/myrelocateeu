-- RelocateEU: relocation_info table
create table if not exists public.relocation_info (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  category text not null check (category in ('visa', 'bank', 'school', 'healthcare', 'work')),
  title text not null,
  content text not null,
  source_url text not null,
  last_updated date not null default current_date,
  language text not null check (language in ('ka', 'en', 'de')),
  created_at timestamptz not null default now(),
  unique (country, category, language)
);

create index if not exists relocation_info_country_lang_idx
  on public.relocation_info (country, language);

alter table public.relocation_info enable row level security;

create policy "Allow public read access"
  on public.relocation_info
  for select
  using (true);
