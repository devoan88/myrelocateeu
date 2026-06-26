-- Add edit_history audit trail to content_items
alter table public.content_items
  add column if not exists edit_history jsonb default '[]'::jsonb;

-- Allow nullable last_verified for never-verified items
alter table public.content_items
  alter column last_verified drop not null;

create index if not exists content_items_last_verified_idx
  on public.content_items (last_verified);
