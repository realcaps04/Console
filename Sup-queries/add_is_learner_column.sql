-- ══════════════════════════════════════════════════════
-- Migration: Add is_learner column to public.users
-- Run this in Supabase SQL Editor
-- ══════════════════════════════════════════════════════

-- 1. Add is_learner column (defaults to false for all existing users)
alter table public.users
  add column if not exists is_learner boolean not null default false;

-- 2. Update the trigger function to also set is_learner = false on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, first_name, last_name, email, is_learner)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', ''),
    new.email,
    false
  );
  return new;
exception
  when others then
    raise log 'Error in handle_new_user trigger: %', sqlerrm;
    return new;
end;
$$;

-- 3. When a learner registers via LearnerRegistration.jsx and logs in,
--    mark them as a learner by matching email across both tables.
--    Run this manually or via a Supabase Edge Function after learner login.
-- UPDATE public.users u
--   SET is_learner = true
--   FROM public."Learners" l
--   WHERE lower(u.email) = lower(l.email);
