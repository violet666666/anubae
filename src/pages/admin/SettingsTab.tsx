import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cardStyle, inputStyle, labelStyle, primaryBtn, handleInputFocus, handleInputBlur } from './shared-styles';

type SiteSettingKey = 'whatsapp_number' | 'instagram_url' | 'youtube_url' | 'maps_url';
type SettingsState = Record<SiteSettingKey, string>;

const SETTING_KEYS: SiteSettingKey[] = ['whatsapp_number', 'instagram_url', 'youtube_url', 'maps_url'];

const fields: Array<{ key: SiteSettingKey; label: string; placeholder: string; helper?: string }> = [
  { key: 'whatsapp_number', label: 'WhatsApp Number', placeholder: '6281242401771', helper: 'Format: 628xxxxxxxxxx (tanpa + atau -)' },
  { key: 'instagram_url', label: 'Instagram URL', placeholder: 'https://www.instagram.com/anubae.organizer' },
  { key: 'youtube_url', label: 'YouTube URL', placeholder: 'https://www.youtube.com/@Anubaeorganizer/videos' },
  { key: 'maps_url', label: 'Google Maps URL', placeholder: 'https://maps.app.goo.gl/...' },
];

const SettingsTab = () => {
  const [values, setValues] = useState<SettingsState>({
    whatsapp_number: '',
    instagram_url: '',
    youtube_url: '',
    maps_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) {
        toast({ title: 'Gagal memuat pengaturan', description: error.message, variant: 'destructive' });
      } else {
        const next: SettingsState = { whatsapp_number: '', instagram_url: '', youtube_url: '', maps_url: '' };
        (data ?? []).forEach((row: { key: string; value: string }) => {
          if (SETTING_KEYS.includes(row.key as SiteSettingKey)) {
            next[row.key as SiteSettingKey] = row.value;
          }
        });
        setValues(next);
      }
      setLoading(false);
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const rows = SETTING_KEYS.map((key) => ({
      key,
      value: values[key] ?? '',
      updated_at: new Date().toISOString(),
    }));
    const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' });
    setSaving(false);
    if (error) {
      toast({ title: 'Gagal menyimpan', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Pengaturan berhasil disimpan!' });
  };

  return (
    <section style={{ ...cardStyle, padding: '24px' }}>
      <h2 className="text-white font-semibold text-lg mb-1">Kontak & Sosial Media</h2>
      <p className="text-sm mb-6" style={{ color: '#666' }}>
        Nilai ini ditampilkan di footer dan tombol kontak situs publik.
      </p>

      {loading ? (
        <p style={{ color: '#666' }}>Memuat…</p>
      ) : (
        <div className="space-y-5">
          {fields.map((f) => (
            <div key={f.key}>
              <label htmlFor={f.key} style={labelStyle}>{f.label}</label>
              <input
                id={f.key}
                type="text"
                placeholder={f.placeholder}
                value={values[f.key]}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                style={inputStyle}
              />
              {f.helper && <p className="text-xs mt-1.5" style={{ color: '#555' }}>{f.helper}</p>}
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              style={{ ...primaryBtn, opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}
            >
              {saving ? 'Menyimpan…' : 'Simpan Pengaturan'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default SettingsTab;
