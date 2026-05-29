-- ══════════════════════════════════════════════════════
-- Supabase SQL Schema — "support_users" table
-- Captures support queries submitted via the home-page
-- "Submit a Query" popup modal (email + message fields).
-- ══════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────
-- 1. Create the support_users table
-- ─────────────────────────────────────────────────────
create table if not exists public.support_users (
  id          bigint generated always as identity primary key,
  email       text        not null,
  message     text        not null,
  created_at  timestamptz not null default now()
);

comment on table  public.support_users              is 'Support queries submitted from the home-page contact popup.';
comment on column public.support_users.email        is 'Email address entered by the visitor in the "Email Address" field.';
comment on column public.support_users.message      is 'Question / message entered in the "Your Question" textarea.';
comment on column public.support_users.created_at   is 'Timestamp at which the support query was submitted (UTC).';


-- ─────────────────────────────────────────────────────
-- 2. Enable Row Level Security
-- ─────────────────────────────────────────────────────
alter table public.support_users enable row level security;


-- ─────────────────────────────────────────────────────
-- 3. RLS Policies
--    • Anyone (including anonymous visitors) can INSERT
--      a new support query — no auth required.
--    • Only authenticated service-role / admin users
--      should SELECT / UPDATE / DELETE rows.
-- ─────────────────────────────────────────────────────

-- Allow any visitor (even unauthenticated) to submit a query
create policy "Anyone can submit a support query"
  on public.support_users
  for insert
  to anon, authenticated
  with check (true);

-- Prevent public reads — only service-role can read support queries
create policy "Only service role can read support queries"
  on public.support_users
  for select
  using (false);   -- use Supabase Dashboard / service key to query rows


-- ─────────────────────────────────────────────────────
-- 4. INSERT query — called from the React form onSubmit
--    Replace the placeholder values with the actual
--    form-field values in your application code.
-- ─────────────────────────────────────────────────────

-- Example: plain SQL insert (use in Supabase SQL editor for testing)
insert into public.support_users (email, message)
values (
  'user@example.com',          -- value from the "Email Address" input
  'How can I reset my password?' -- value from the "Your Question" textarea
);


-- ─────────────────────────────────────────────────────
-- 5. Supabase JS client equivalent (for reference)
--    Use this pattern inside the React onSubmit handler
--    in App.jsx (inside the isQueryModalOpen form).
-- ─────────────────────────────────────────────────────
/*
  const { error } = await supabase
    .from('support_users')
    .insert([
      {
        email:   emailValue,    // state bound to the "Email Address" input
        message: messageValue,  // state bound to the "Your Question" textarea
      }
    ]);

  if (error) {
    console.error('Support query error:', error.message);
  } else {
    setIsQueryModalOpen(false);
    alert('Your query has been sent to our team!');
  }
*/


-- ══════════════════════════════════════════════════════
-- Column reference
--
--  id          bigint (identity)   Auto-incrementing primary key
--  email       text                "Email Address" form field  (required)
--  message     text                "Your Question" textarea    (required)
--  created_at  timestamptz         Auto-set to now() (UTC)
-- ══════════════════════════════════════════════════════
