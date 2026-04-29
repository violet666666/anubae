import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cardStyle, primaryBtn } from './shared-styles';

type WATemplate = {
  id: string;
  label: string;
  template: string;
  updated_at: string;
};

const TemplatesTab = () => {
  const [rows, setRows] = useState<WATemplate[]>([]);
  const [edits, setEdits] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('wa_templates')
        .select('*')
        .order('id');
      if (error) {
        toast({ title: 'Gagal memuat template', description: error.message, variant: 'destructive' });
      } else {
        const list = (data ?? []) as WATemplate[];
        setRows(list);
        setEdits(list.reduce<Record<string, string>>((acc, r) => { acc[r.id] = r.template; return acc; }, {}));
      }
      setLoading(false);
    })();
  }, []);

  const handleChange = (id: string, value: string) => {
    setEdits((prev) => ({ ...prev, [id]: value }));
  };

  const handlePreview = (id: string) => {
    const text = edits[id] ?? '';
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleSaveAll = async () => {
    setSaving(true);
    const changed = rows
      .filter((r) => (edits[r.id] ?? '') !== r.template)
      .map((r) => ({
        id: r.id,
        label: r.label,
        template: edits[r.id] ?? '',
        updated_at: new Date().toISOString(),
      }));

    if (changed.length === 0) {
      setSaving(false);
      toast({ title: 'Tidak ada perubahan untuk disimpan.' });
      return;
    }

    const { error } = await supabase.from('wa_templates').upsert(changed, { onConflict: 'id' });
    setSaving(false);

    if (error) {
      toast({ title: 'Gagal menyimpan template', description: error.message, variant: 'destructive' });
      return;
    }

    setRows((prev) => prev.map((r) => edits[r.id] !== undefined ? { ...r, template: edits[r.id] } : r));
    toast({ title: 'Template berhasil disimpan!' });
  };

  return (
    <div className="space-y-6">
      <section style={{ ...cardStyle, padding: '24px' }}>
        <h2 className="text-white font-semibold text-lg mb-1">Template Pesan WhatsApp</h2>
        <p className="text-sm mb-6" style={{ color: '#666' }}>
          Edit pesan WhatsApp yang dikirim saat user klik tombol pemesanan di setiap paket.
        </p>

        {loading ? (
          <p style={{ color: '#666' }}>Memuat…</p>
        ) : rows.length === 0 ? (
          <p style={{ color: '#666' }}>Belum ada template tersimpan.</p>
        ) : (
          <div className="space-y-5">
            {rows.map((row) => {
              const value = edits[row.id] ?? '';
              return (
                <div
                  key={row.id}
                  style={{
                    backgroundColor: '#0f0f0f',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '16px',
                  }}
                >
                  <div className="text-sm mb-2" style={{ color: '#999' }}>{row.label}</div>
                  <textarea
                    value={value}
                    onChange={(e) => handleChange(row.id, e.target.value)}
                    rows={4}
                    style={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#ffffff',
                      borderRadius: '10px',
                      padding: '12px',
                      width: '100%',
                      outline: 'none',
                      fontSize: '0.9rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  />
                  <div className="flex items-center justify-between mt-2 gap-3 flex-wrap">
                    <button
                      onClick={() => handlePreview(row.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors"
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(128,240,255,0.3)',
                        color: '#80f0ff',
                        cursor: 'pointer',
                      }}
                    >
                      <MessageCircle size={14} />
                      Preview WA
                    </button>
                    <span className="text-xs" style={{ color: '#555' }}>{value.length} karakter</span>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSaveAll}
                disabled={saving}
                style={{ ...primaryBtn, opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}
              >
                {saving ? 'Menyimpan…' : 'Simpan Semua Template'}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default TemplatesTab;
