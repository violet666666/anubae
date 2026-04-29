import { useEffect, useState } from 'react';
import { MessageSquare, Check, Mail, MailOpen } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cardStyle, primaryBtn } from './shared-styles';

type ContactSubmission = {
  id: string;
  name: string;
  phone: string;
  service: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

const SERVICE_COLORS: Record<string, { bg: string; text: string }> = {
  Wedding: { bg: 'rgba(128,240,255,0.12)', text: '#80f0ff' },
  'Live Cam': { bg: 'rgba(168,85,247,0.15)', text: '#c4a3ff' },
  Videotron: { bg: 'rgba(249,115,22,0.15)', text: '#ffb37a' },
  Multimedia: { bg: 'rgba(34,197,94,0.15)', text: '#86efac' },
  Lainnya: { bg: 'rgba(255,255,255,0.06)', text: '#bbb' },
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const MessagesTab = ({
  submissions,
  reload,
}: {
  submissions: ContactSubmission[];
  reload: () => Promise<void>;
}) => {
  const [readLoading, setReadLoading] = useState<string | null>(null);

  useEffect(() => {
    reload();
  }, [reload]);

  const toggleRead = async (id: string, currentRead: boolean) => {
    setReadLoading(id);
    const { error } = await supabase
      .from('contact_submissions')
      .update({ is_read: !currentRead })
      .eq('id', id);
    setReadLoading(null);
    if (error) {
      toast({ title: 'Gagal update status', description: error.message, variant: 'destructive' });
      return;
    }
    await reload();
  };

  if (submissions.length === 0) {
    return (
      <section style={{ ...cardStyle, padding: '48px' }} className="text-center">
        <MessageSquare size={40} color="#444" className="mx-auto mb-3" />
        <p style={{ color: '#666' }}>Belum ada pesan masuk.</p>
      </section>
    );
  }

  return (
    <div className="space-y-4">
      {submissions.map((s) => {
        const color = SERVICE_COLORS[s.service ?? 'Lainnya'] ?? SERVICE_COLORS.Lainnya;
        const phoneClean = s.phone.replace(/[^0-9]/g, '');
        const waUrl = `https://wa.me/${phoneClean}?text=${encodeURIComponent(`Halo ${s.name}, terima kasih telah menghubungi Anubae Organizer.`)}`;
        return (
          <article
            key={s.id}
            style={{
              ...cardStyle,
              padding: '20px',
              borderLeft: s.is_read ? 'none' : '3px solid #80f0ff',
              opacity: s.is_read ? 0.7 : 1,
            }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  {s.is_read ? <MailOpen size={16} color="#666" /> : <Mail size={16} color="#80f0ff" />}
                  <h3 className="text-white font-bold">{s.name}</h3>
                  {s.service && (
                    <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: color.bg, color: color.text }}>
                      {s.service}
                    </span>
                  )}
                </div>
                <a href={`tel:${phoneClean}`} className="text-sm hover:underline inline-block mt-1" style={{ color: '#80f0ff' }}>
                  {s.phone}
                </a>
                <p className="italic mt-3" style={{ color: '#999' }}>{s.message}</p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex gap-2">
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" style={primaryBtn}>
                    Balas WA
                  </a>
                  <button
                    onClick={() => toggleRead(s.id, s.is_read)}
                    disabled={readLoading === s.id}
                    className="px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors"
                    style={{
                      border: `1px solid ${s.is_read ? '#444' : 'rgba(128,240,255,0.3)'}`,
                      color: s.is_read ? '#666' : '#80f0ff',
                      background: 'transparent',
                      cursor: readLoading === s.id ? 'not-allowed' : 'pointer',
                    }}
                    title={s.is_read ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
                  >
                    <Check size={14} />
                    {s.is_read ? 'Baca' : 'Baru'}
                  </button>
                </div>
                <span className="text-xs" style={{ color: '#555' }}>{formatDate(s.created_at)}</span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default MessagesTab;
