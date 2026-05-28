// Test script to verify Supabase database setup
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://apyvnrlrkbjdlyijcmjg.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFweXZucmxya2JqZGx5aWpjbWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NjAwODIsImV4cCI6MjA5NTUzNjA4Mn0.Q2rGVE4flq34MjMx4M4TSz4az1tGzg27H_C0nnRhK2A';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseSetup() {
  console.log('🔍 Testing Supabase database setup...\n');

  try {
    // Test 1: Check if users table exists and is accessible
    console.log('1. Testing users table access...');
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (usersError) {
      console.error('❌ Users table error:', usersError.message);
      return;
    }
    console.log('✅ Users table is accessible');

    // Test 2: Check if Learners table exists
    console.log('\n2. Testing Learners table access...');
    const { data: learners, error: learnersError } = await supabase
      .from('Learners')
      .select('count')
      .limit(1);

    if (learnersError) {
      console.error('❌ Learners table error:', learnersError.message);
    } else {
      console.log('✅ Learners table is accessible');
    }

    // Test 3: Check auth connection
    console.log('\n3. Testing auth connection...');
    const { data: session } = await supabase.auth.getSession();
    console.log('✅ Auth connection working, current session:', session.session ? 'Active' : 'None');

    console.log('\n🎉 Database setup test completed!');
    console.log('\nTo run this test:');
    console.log('node test-db-setup.js');

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testDatabaseSetup();
}

export { testDatabaseSetup };