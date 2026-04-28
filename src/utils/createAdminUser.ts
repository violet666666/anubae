import { supabase } from '@/integrations/supabase/client';

export const createAdminUser = async (
  email = 'anubae@admin.com',
  password = 'anubae12345',
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'admin',
      },
    },
  });

  if (error) {
    console.error('Failed to create admin user:', error.message);
    return { success: false, error: error.message };
  }

  console.log('Admin user created:', data.user?.email);
  return { success: true, user: data.user };
};
