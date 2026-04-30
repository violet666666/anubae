import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const [authState, setAuthState] = useState<'checking' | 'authorized' | 'unauthorized'>('checking');

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      // Use context user if available, otherwise verify session directly.
      // This handles the race condition where navigate() fires before
      // onAuthStateChange updates the context.
      let currentUser = user;
      if (!currentUser) {
        const { data: { session } } = await supabase.auth.getSession();
        currentUser = session?.user ?? null;
      }

      if (cancelled) return;

      if (!currentUser) {
        setAuthState('unauthorized');
        return;
      }

      // Primary: verify role via admin_users table
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', currentUser.id)
        .single();

      if (cancelled) return;

      if (!error && data) {
        setAuthState('authorized');
        return;
      }

      // Fallback: check user_metadata.role
      setAuthState(currentUser.user_metadata?.role === 'admin' ? 'authorized' : 'unauthorized');
    };

    checkAuth();

    return () => { cancelled = true; };
  }, [user]);

  if (loading || authState === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-10 w-10 rounded-full border-2 border-muted border-t-primary animate-spin" />
      </div>
    );
  }

  if (authState === 'unauthorized') {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
