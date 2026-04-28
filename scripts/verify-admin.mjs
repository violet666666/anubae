import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ieopfrsnrpwctmbmzwsu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllb3BmcnNucnB3Y3RtYm16d3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTcxNzYsImV4cCI6MjA5MjU5MzE3Nn0.aoCmv5E7nphxW-WBZEejs4yrsPQ_D8vpdkLm1l2doh8';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function main() {
  console.log('Trying to login with anubae@admin.com / anubae12345');

  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'anubae@admin.com',
    password: 'anubae12345',
  });

  if (error) {
    console.error('Login failed:', error.message);
    if (error.message.includes('Email not confirmed')) {
      console.log('\nThe user needs email confirmation before logging in.');
      console.log('Please go to Supabase Dashboard and either:');
      console.log('  1. Authentication > Users > Find user > Click "..." > "Confirm user"');
      console.log('  2. Or Authentication > Settings > Disable "Enable email confirmations"');
    }
    process.exit(1);
  }

  console.log('Login successful!');
  console.log('User ID:', data.user?.id);
  console.log('Email:', data.user?.email);
  console.log('Role:', data.user?.user_metadata?.role);
  console.log('Email confirmed:', data.user?.email_confirmed_at ? 'Yes' : 'No');
}

main();
