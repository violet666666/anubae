import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ieopfrsnrpwctmbmzwsu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imllb3BmcnNucnB3Y3RtYm16d3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTcxNzYsImV4cCI6MjA5MjU5MzE3Nn0.aoCmv5E7nphxW-WBZEejs4yrsPQ_D8vpdkLm1l2doh8';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const EMAIL = 'anubae@admin.com';
const PASSWORD = 'anubae12345';

async function main() {
  console.log(`Creating admin user: ${EMAIL}`);

  const { data, error } = await supabase.auth.signUp({
    email: EMAIL,
    password: PASSWORD,
    options: {
      data: {
        role: 'admin',
      },
    },
  });

  if (error) {
    console.error('Error:', error.message);
    if (error.message.includes('already registered')) {
      console.log('User already exists. Trying to sign in to verify...');

      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: EMAIL,
        password: PASSWORD,
      });

      if (signInError) {
        console.error('Sign in failed:', signInError.message);
        console.log('The user exists but the password may be different, or email confirmation is required.');
      } else {
        console.log('Login successful! Admin account is working.');
        console.log('User ID:', signInData.user?.id);
        console.log('Email:', signInData.user?.email);
        console.log('Role:', signInData.user?.user_metadata?.role);
      }
    } else {
      console.log('If error is about email confirmation, please:');
      console.log('1. Go to Supabase Dashboard > Authentication > Settings');
      console.log('2. Disable "Enable email confirmations" OR');
      console.log('3. Check the email inbox for confirmation link');
    }
    process.exit(1);
  }

  console.log('Admin user created successfully!');
  console.log('User ID:', data.user?.id);
  console.log('Email:', data.user?.email);
  console.log('Role:', data.user?.user_metadata?.role);

  if (data.session) {
    console.log('\nUser is automatically logged in (email confirmation may be disabled).');
  } else {
    console.log('\nNOTE: No session returned.');
    console.log('Email confirmation may be required.');
    console.log('Please check the Supabase Dashboard:');
    console.log('1. Go to Authentication > Users');
    console.log('2. Find the user and manually confirm if needed');
    console.log('3. Or disable email confirmation in Authentication > Settings');
  }
}

main();
