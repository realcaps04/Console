-- ══════════════════════════════════════════════════════
-- Supabase SQL Schema — "Learners" table
-- Stores learner profile data from LearnerRegistration.jsx
-- Auth (password hashing + JWT) handled by Supabase Auth
-- ══════════════════════════════════════════════════════

-- 1. Create the Learners table
--    id links to auth.users so password is managed by Supabase Auth (bcrypt)
create table public."Learners" (
  id             uuid          primary key references auth.users(id) on delete cascade,
  first_name     text          not null,
  last_name      text          not null,
  email          text          not null unique,
  qualification  text          not null,           -- highschool|diploma|bachelors|masters|doctorate|other
  primary_goal   text          not null,           -- career|skills|project
  focus_areas    text[]        not null default '{}',
  agreed_terms   boolean       not null default false,
  created_at     timestamptz   not null default now()
);

-- 2. Performance index on email (used for login lookups)
create index if not exists learners_email_idx
  on public."Learners" (email);

-- 3. Enable Row Level Security (RLS)
alter table public."Learners" enable row level security;

-- 4. RLS Policies
-- Allow inserts only for the authenticated user's own row
create policy "Learner can insert own profile"
  on public."Learners"
  for insert
  to authenticated
  with check (auth.uid() = id);

-- Learners can only read their own row
create policy "Learners can view own profile"
  on public."Learners"
  for select
  to authenticated
  using (auth.uid() = id);

-- Learners can update their own row
create policy "Learners can update own profile"
  on public."Learners"
  for update
  to authenticated
  using (auth.uid() = id);

-- 5. Auto-insert base row into Learners when a learner signs up
--    Full profile (qualification, goal, focus_areas) is upserted after
--    the multi-step registration form completes.
--    NOTE: This trigger only fires if you use supabase.auth.signUp() for learners.
--    If you keep a separate Learners-only auth flow, skip this trigger.

-- ══════════════════════════════════════════════════════
-- Column reference
--
--  id             uuid        FK → auth.users.id (primary key)
--  first_name     text        From Profile form (Step 1)
--  last_name      text        From Profile form (Step 1)
--  email          text        Unique, mirrors auth.users.email
--  qualification  text        Dropdown: highschool|diploma|bachelors|masters|doctorate|other
--  primary_goal   text        Trajectory (Step 2): career|skills|project
--  focus_areas    text[]      Multi-select tags (Step 2): {Frontend,DevOps,Mobile,...}
--  agreed_terms   boolean     Must be true to submit (Step 1)
--  created_at     timestamptz Auto-set to now()
--
--  PASSWORD: Stored hashed in auth.users by Supabase — never in this table.
-- ══════════════════════════════════════════════════════
