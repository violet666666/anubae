import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const AdminPanel = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Admin Panel</h1>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h2 className="text-lg font-medium mb-2">Selamat datang</h2>
          <p className="text-sm text-muted-foreground">
            Manajemen galeri dan pengaturan situs akan ditambahkan di sini.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
