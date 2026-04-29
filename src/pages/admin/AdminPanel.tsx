import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import MediaTab from './MediaTab';
import SettingsTab from './SettingsTab';
import TemplatesTab from './TemplatesTab';
import MessagesTab from './MessagesTab';

type ContactSubmission = {
  id: string;
  name: string;
  phone: string;
  service: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'media' | 'settings' | 'messages' | 'templates'>('media');
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const unreadCount = submissions.filter((s) => !s.is_read).length;
  const submissionsCount = submissions.length;

  const loadSubmissions = async () => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) return;
    setSubmissions((data ?? []) as ContactSubmission[]);
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const tabs = [
    { id: 'media' as const, label: '📸 Katalog Media' },
    { id: 'settings' as const, label: '⚙️ Pengaturan' },
    { id: 'templates' as const, label: '💬 Template Pesan' },
    {
      id: 'messages' as const,
      label: `📬 Pesan Masuk${unreadCount ? ` (${unreadCount} baru)` : submissionsCount ? ` (${submissionsCount})` : ''}`,
    },
  ];

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#cccccc' }}>
      {/* Top admin navbar */}
      <header
        className="sticky top-0 z-50"
        style={{ backgroundColor: '#111111', borderBottom: '1px solid rgba(255,255,255,0.06)', height: '64px' }}
      >
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/anubae-logo2.png" alt="Anubae Organizer" className="h-10 w-auto object-contain" />
            <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(128,240,255,0.1)', color: '#80f0ff' }}>
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:inline" style={{ color: '#666' }}>{user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              style={{ border: '1px solid #444', color: '#999', background: 'transparent', cursor: 'pointer' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#ff6b6b'; e.currentTarget.style.borderColor = '#ff6b6b'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#999'; e.currentTarget.style.borderColor = '#444'; }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <nav style={{ backgroundColor: '#111111', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="px-6 flex gap-8">
          {tabs.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className="py-4 text-sm font-medium transition-colors"
                style={{
                  color: active ? '#80f0ff' : '#666',
                  borderBottom: active ? '2px solid #80f0ff' : '2px solid transparent',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-[1200px] mx-auto px-6 py-8">
        {activeTab === 'media' && <MediaTab />}
        {activeTab === 'settings' && <SettingsTab />}
        {activeTab === 'templates' && <TemplatesTab />}
        {activeTab === 'messages' && <MessagesTab submissions={submissions} reload={loadSubmissions} />}
      </main>
    </div>
  );
};

export default AdminPanel;
