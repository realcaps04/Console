-- ══════════════════════════════════════════════════════
-- Supabase SQL Schema — "Learners" table
-- Stores learner registration data from LearnerRegistration.jsx
-- ══════════════════════════════════════════════════════


-- 1. Create the Learners table
create table public."Learners" (
  id             uuid          primary key default gen_random_uuid(),
  first_name     text          not null,
  last_name      text          not null,
  email          text          not null unique,
  password_hash  text          not null,           -- ⚠ migrate to auth.signUp() for production
  qualification  text          not null,           -- e.g. 'bachelors', 'masters', 'diploma'
  primary_goal   text          not null,           -- 'career' | 'skills' | 'project'
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
-- Allow public inserts (anyone can register)
create policy "Anyone can register as a learner"
  on public."Learners"
  for insert
  to anon, authenticated
  with check (true);

-- Learners can only read their own row
create policy "Learners can view own profile"
  on public."Learners"
  for select
  to authenticated
  using (email = auth.jwt() ->> 'email');

-- Learners can update their own row
create policy "Learners can update own profile"
  on public."Learners"
  for update
  to authenticated
  using (email = auth.jwt() ->> 'email');


-- ══════════════════════════════════════════════════════
-- Column reference
-- ══════════════════════════════════════════════════════
--
--  id             uuid        Auto-generated primary key
--  first_name     text        From Profile form
--  last_name      text        From Profile form
--  email          text        Unique, used for login
--  password_hash  text        Raw for now — move to Supabase Auth signUp()
--  qualification  text        Dropdown: highschool|diploma|bachelors|masters|doctorate|other
--  primary_goal   text        Trajectory: career|skills|project
--  focus_areas    text[]      Multi-select tags: e.g. {Frontend,DevOps,Mobile}
--  agreed_terms   boolean     Must be true to submit
--  created_at     timestamptz Auto-set to now()
--
