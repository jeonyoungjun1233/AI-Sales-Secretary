-- AI 사장님 매출 비서 MVP storage tables
-- Run this in the Supabase SQL editor before expecting server storage to persist.
-- Do not paste API keys into SQL, code, or documents.
-- Day 9 adds owner_key so beta/demo users do not see each other's data before login.
-- After Supabase Auth is introduced, replace this temporary owner_key strategy with user_id + strict RLS.

create table if not exists public.app_business_profiles (
  owner_key text not null,
  id text not null,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (owner_key, id)
);

create table if not exists public.app_faqs (
  owner_key text not null,
  id text not null,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (owner_key, id)
);

create table if not exists public.app_calendar_events (
  owner_key text not null,
  id text not null,
  date text,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (owner_key, id)
);

create table if not exists public.app_generations (
  owner_key text not null,
  id text not null,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (owner_key, id)
);

-- If the Day 8 version was already applied, this block upgrades those tables.
alter table public.app_business_profiles add column if not exists owner_key text;
alter table public.app_faqs add column if not exists owner_key text;
alter table public.app_calendar_events add column if not exists owner_key text;
alter table public.app_calendar_events add column if not exists date text;
alter table public.app_generations add column if not exists owner_key text;

update public.app_business_profiles set owner_key = 'legacy-owner' where owner_key is null;
update public.app_faqs set owner_key = 'legacy-owner' where owner_key is null;
update public.app_calendar_events set owner_key = 'legacy-owner' where owner_key is null;
update public.app_calendar_events
set date = payload->>'date'
where date is null and payload ? 'date';
update public.app_generations set owner_key = 'legacy-owner' where owner_key is null;

alter table public.app_business_profiles alter column owner_key set not null;
alter table public.app_faqs alter column owner_key set not null;
alter table public.app_calendar_events alter column owner_key set not null;
alter table public.app_generations alter column owner_key set not null;

do $$
begin
  if exists (
    select 1 from pg_constraint
    where conname = 'app_business_profiles_pkey'
      and conrelid = 'public.app_business_profiles'::regclass
  ) then
    alter table public.app_business_profiles drop constraint app_business_profiles_pkey;
  end if;

  alter table public.app_business_profiles
    add constraint app_business_profiles_pkey primary key (owner_key, id);
exception
  when duplicate_object then null;
end $$;

do $$
begin
  if exists (
    select 1 from pg_constraint
    where conname = 'app_faqs_pkey'
      and conrelid = 'public.app_faqs'::regclass
  ) then
    alter table public.app_faqs drop constraint app_faqs_pkey;
  end if;

  alter table public.app_faqs
    add constraint app_faqs_pkey primary key (owner_key, id);
exception
  when duplicate_object then null;
end $$;

do $$
begin
  if exists (
    select 1 from pg_constraint
    where conname = 'app_calendar_events_pkey'
      and conrelid = 'public.app_calendar_events'::regclass
  ) then
    alter table public.app_calendar_events drop constraint app_calendar_events_pkey;
  end if;

  alter table public.app_calendar_events
    add constraint app_calendar_events_pkey primary key (owner_key, id);
exception
  when duplicate_object then null;
end $$;

do $$
begin
  if exists (
    select 1 from pg_constraint
    where conname = 'app_generations_pkey'
      and conrelid = 'public.app_generations'::regclass
  ) then
    alter table public.app_generations drop constraint app_generations_pkey;
  end if;

  alter table public.app_generations
    add constraint app_generations_pkey primary key (owner_key, id);
exception
  when duplicate_object then null;
end $$;

create index if not exists app_business_profiles_owner_key_idx
  on public.app_business_profiles(owner_key);

create index if not exists app_faqs_owner_key_idx
  on public.app_faqs(owner_key);

create index if not exists app_calendar_events_owner_date_idx
  on public.app_calendar_events(owner_key, date);

create index if not exists app_generations_owner_created_at_idx
  on public.app_generations(owner_key, created_at desc);

grant select, insert, update, delete on table
  public.app_business_profiles,
  public.app_faqs,
  public.app_calendar_events,
  public.app_generations
to service_role;

-- Temporary MVP demo access.
-- Use a server-only Supabase key in Vercel before public beta.
-- Remove these grants and replace them with authenticated RLS policies after login is added.
grant select, insert, update, delete on table
  public.app_business_profiles,
  public.app_faqs,
  public.app_calendar_events,
  public.app_generations
to anon, authenticated;
