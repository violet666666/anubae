import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cardStyle, inputStyle, labelStyle, primaryBtn, handleInputFocus, handleInputBlur } from './shared-styles';

type SiteSettingKey =
  | 'company_name' | 'description' | 'address' | 'phone' | 'business_hours'
  | 'whatsapp_number' | 'instagram_url' | 'youtube_url' | 'maps_url';
type SettingsState = Record<SiteSettingKey, string>;

const SETTING_KEYS: SiteSettingKey[] = [
  'company_name', 'description', 'address', 'phone', 'business_hours',
  'whatsapp_number', 'instagram_url', 'youtube_url', 'maps_url',
];

const sections: Array<{
  title: string;
  subtitle: string;
  fields: Array<{ key: SiteSettingKey; label: string; placeholder: string; helper?: string; multiline?: boolean }>;
}> = [
  {
    title: 'Informasi Perusahaan',
    subtitle: 'Data ini tampil di footer dan bagian About website.',
    fields: [
      { key: 'company_name', label: 'Nama Perusahaan', placeholder: 'Anubae Organizer' },
      { key: 'description', label: 'Deskripsi / Tagline', placeholder: 'Mewujudkan momen tak terlupakan untuk setiap acara Anda.', multiline: true },
      { key: 'address', label: 'Alamat', placeholder: 'Makassar, Sulawesi Selatan' },
      { key: 'phone', label: 'Nomor Telepon', placeholder: '6281242401771', helper: 'Format: 628xxxxxxxxxx' },
      { key: 'business_hours', label: 'Jam Operasional', placeholder: 'Senin - Sabtu, 08:00 - 17:00' },
    ],
  },
  {
    title: 'Kontak & Sosial Media',
    subtitle: 'WhatsApp dan link sosial media yang tampil di footer dan tombol kontak.',
    fields: [
      { key: 'whatsapp_number', label: 'WhatsApp Number', placeholder: '6281242401771', helper: 'Format: 628xxxxxxxxxx (tanpa + atau -)' },
      { key: 'instagram_url', label: 'Instagram URL', placeholder: 'https://www.instagram.com/anubae.organizer' },
      { key: 'youtube_url', label: 'YouTube URL', placeholder: 'https://www.youtube.com/@Anubaeorganizer/videos' },
      { key: 'maps_url', label: 'Google Maps URL', placeholder: 'https://maps.app.goo.gl/...' },
    ],
  },
];

const SettingsTab = () => {
  const [values, setValues] = useState<SettingsState>({
    company_name: '', description: '', address: '', phone: '', business_hours: '',
    whatsapp_number: '', instagram_url: '', youtube_url: '', maps_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) {
        toast({ title: 'Gagal memuat pengaturan', description: error.message, variant: 'destructive' });
      } else {
        const next = {} as SettingsState;
        SETTING_KEYS.forEach((k) => { next[k] = ''; });
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

  if (loading) {
    return <section style={{ ...cardStyle, padding: '24px' }}><p style={{ color: '#666' }}>Memuat…</p></section>;
  }

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <section key={section.title} style={{ ...cardStyle, padding: '24px' }}>
          <h2 className="text-white font-semibold text-lg mb-1">{section.title}</h2>
          <p className="text-sm mb-6" style={{ color: '#666' }}>{section.subtitle}</p>

          <div className="space-y-5">
            {section.fields.map((f) => (
              <div key={f.key}>
                <label htmlFor={f.key} style={labelStyle}>{f.label}</label>
                {f.multiline ? (
                  <textarea
                    id={f.key}
                    placeholder={f.placeholder}
                    value={values[f.key]}
                    onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
                  />
                ) : (
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
                )}
                {f.helper && <p className="text-xs mt-1.5" style={{ color: '#555' }}>{f.helper}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          style={{ ...primaryBtn, opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}
        >
          {saving ? 'Menyimpan…' : 'Simpan Semua Pengaturan'}
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
