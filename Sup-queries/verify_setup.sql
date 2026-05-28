"-- ══════════════════════════════════════════════════════
-- Verification queries for Console database setup
-- Run these in Supabase SQL Editor to verify everything works
-- ══════════════════════════════════════════════════════

-- 1. Check if users table exists and has correct structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'users'
ORDER BY ordinal_position;

-- 2. Check if RLS is enabled on users table
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename = 'users';

-- 3. Check if trigger exists
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- 4. Check if function exists
SELECT 
  routine_name,
  routine_type,
  routine_definition
FROM information_schema.routines
WHERE routine_schema = 'public' 
  AND routine_name = 'handle_new_user';

-- 5. Test the function manually (optional - only run if you want to test)
-- SELECT public.handle_new_user();

-- 6. Check current users in the table
SELECT 
  id,
  first_name,
  last_name,
  email,
  created_at
FROM public.users
ORDER BY created_at DESC
LIMIT 10;

-- 7. Check auth.users table (to see if auth users exist)
SELECT 
  id,
  email,
  created_at,
  raw_user_meta_data
FROM auth.users
ORDER BY created_at DESC
LIMIT 5;"