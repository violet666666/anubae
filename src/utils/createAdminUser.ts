import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async () => {
  const { data, error } = await supabase.auth.signUp({
    email: 'anubae@admin.com',
    password: 'anubae12345',
    options: {
      data: {
        role: 'admin',
      },
    },
  });
  if (error) {
    console.log('Admin user may already exist:', error.message);
  } else {
    console.log('Admin user created:', data.user?.email);
  }
};
