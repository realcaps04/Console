-- Supabase SQL Schema for the "users" table

-- 1. Create the users table
create table public.users (
  id uuid references auth.users not null primary key,
  first_name text,
  last_name text,
  email text,
  role text default 'user' not null, -- enforces base level role
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS)
alter table public.users enable row level security;

-- 3. Create RLS Policies
create policy "Users can view their own profile" on public.users for select using ( auth.uid() = id );
create policy "Users can update their own profile" on public.users for update using ( auth.uid() = id );
create policy "Users can insert their own profile" on public.users for insert with check ( auth.uid() = id );

-- 4. Create an Auth Trigger (Best Practice)
-- Automatically insert into public.users when a user signs up via GetStarted.jsx!
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, first_name, last_name)
  values (
    new.id,
    new.email,`
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
