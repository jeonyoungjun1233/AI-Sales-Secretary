-- AI 사장님 매출 비서 MVP storage tables
-- Run this in the Supabase SQL editor before expecting server storage to persist.
-- For production, prefer a server-only secret key and tighten policies before launch.

create table if not exists public.app_business_profiles (
  id text primary key,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_faqs (
  id text primary key,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_calendar_events (
  id text primary key,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.app_generations (
  id text primary key,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on table
  public.app_business_profiles,
  public.app_faqs,
  public.app_calendar_events,
  public.app_generations
to service_role;

-- Temporary MVP demo access.
-- Remove these grants and replace them with authenticated RLS policies before public launch.
grant select, insert, update, delete on table
  public.app_business_profiles,
  public.app_faqs,
  public.app_calendar_events,
  public.app_generations
to anon, authenticated;

