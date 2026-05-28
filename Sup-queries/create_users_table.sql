-- ══════════════════════════════════════════════════════
-- Supabase SQL Schema — "users" table
-- Stores public profile data for enterprise users
-- Password is managed entirely by Supabase Auth (bcrypt)
-- ══════════════════════════════════════════════════════

-- 1. Create the users table
create table public.users (
  id            uuid references auth.users(id) on delete cascade not null primary key,
  first_name    text not null,
  last_name     text not null,
  email         text not null unique,
  created_at    timestamptz not null default now()
);

-- 2. Enable Row Level Security
alter table public.users enable row level security;

-- 3. RLS Policies
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- 4. Auto-insert into public.users when someone signs up via Supabase Auth
--    Password is handled entirely by Supabase Auth (bcrypt hashed) — never stored here
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, first_name, last_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    new.email
  );
  return new;
end;
$$;

-- 5. Trigger that fires the function on every new signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ══════════════════════════════════════════════════════
-- Column reference
--
--  id          uuid        FK → auth.users.id (primary key)
--  first_name  text        From signUp metadata
--  last_name   text        From signUp metadata
--  email       text        Unique, mirrors auth.users.email
--  created_at  timestamptz Auto-set to now()
--
--  NOTE: Password is stored hashed in auth.users by Supabase.
--        Never store passwords in public.users.
-- ══════════════════════════════════════════════════════
