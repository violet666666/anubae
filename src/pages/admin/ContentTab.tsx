import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cardStyle, inputStyle, labelStyle, primaryBtn } from './shared-styles';
import ImageUploadField from '@/components/admin/ImageUploadField';

/* ── types ── */
type WeddingPkg = { name: string; price: string; features: string[]; featured: boolean; templateKey: string };
type MultimediaPkg = { name: string; badge: string; price: string; features: string[]; featured: boolean; templateKey: string };
type VideotronPkg = { title: string; price: string; description: string; features: string[]; templateKey: string };

type ContentKey =
  | 'hero_bg_image' | 'hero_tagline'
  | 'about_image' | 'about_title' | 'about_paragraph1' | 'about_paragraph2'
  | 'wedding_section_title' | 'wedding_section_desc' | 'wedding_packages' | 'wedding_disclaimer'
  | 'multimedia_section_title' | 'multimedia_section_desc' | 'multimedia_promo_text' | 'multimedia_packages' | 'multimedia_disclaimer'
  | 'videotron_section_title' | 'videotron_section_desc' | 'videotron_promo_text' | 'videotron_packages' | 'videotron_disclaimer';

const CONTENT_KEYS: ContentKey[] = [
  'hero_bg_image', 'hero_tagline',
  'about_image', 'about_title', 'about_paragraph1', 'about_paragraph2',
  'wedding_section_title', 'wedding_section_desc', 'wedding_packages', 'wedding_disclaimer',
  'multimedia_section_title', 'multimedia_section_desc', 'multimedia_promo_text', 'multimedia_packages', 'multimedia_disclaimer',
  'videotron_section_title', 'videotron_section_desc', 'videotron_promo_text', 'videotron_packages', 'videotron_disclaimer',
];

/* ── defaults ── */
const DEFAULT_WEDDING: WeddingPkg[] = [
  { name: 'Basic Package', price: 'Rp 3.999.999', features: ['1 Set Album Magazine 30x30, 20 Sheet', 'Trailer Video 3 Menit FHD', '16R With Frame', 'Dokumentasi Video 90 Menit', '3 Prosesi'], featured: false, templateKey: 'wedding_basic' },
  { name: 'Premium Package', price: 'Rp 4.999.999', features: ['1 Set Album Magazine 30x40, 20 Sheet', 'Highlight Video 3 Menit FHD', 'Dokumentasi Video 90 Menit', 'All File in Flashdisk', '20R With Frame', '4 Prosesi'], featured: true, templateKey: 'wedding_premium' },
  { name: 'Luxury Package', price: 'Rp 6.999.999', features: ['2 Set Album Magazine 30x40, 20 Sheet', 'Cinema Video 3 Menit FHD', '20R With Frame', 'Dokumentasi Video 90 Menit', 'Live Cam 1 Prosesi + TV', 'All File in Flashdisk', '4 Prosesi', 'Foto Banner 1 Set'], featured: false, templateKey: 'wedding_luxury' },
];

const DEFAULT_MULTIMEDIA: MultimediaPkg[] = [
  { name: '1 Camera', badge: 'Starter', price: 'Rp 1.500.000', features: ['1 Unit Kamera', 'Recording File', 'Hollyland RX & TX (Wireless)', 'Laptop', 'Operator Cam Profesional'], featured: false, templateKey: 'livecam_1cam' },
  { name: '2 Camera', badge: 'Terpopuler', price: 'Rp 2.500.000', features: ['2 Unit Kamera', 'Recording File', 'Hollyland RX & TX (Wireless)', 'Laptop', 'VJ VMix Software', 'HDMI Kabel'], featured: true, templateKey: 'livecam_2cam' },
  { name: '3 Camera', badge: 'Professional', price: 'Rp 3.500.000', features: ['3 Unit Kamera', 'Recording File', 'Hollyland RX & TX (Wireless)', 'Laptop', 'VJ VMix Software', 'Instalasi HDMI Lengkap'], featured: false, templateKey: 'livecam_3cam' },
];

const DEFAULT_VIDEOTRON: VideotronPkg[] = [
  { title: 'Dalam Kota Makassar', price: 'Rp 500.000', description: 'Meliputi seluruh wilayah dalam Kota Makassar dan sekitarnya', features: ['Termasuk Operator', 'Instalasi & Uninstalasi', 'Konten Setup Awal'], templateKey: 'videotron_dalam' },
  { title: 'Luar Kota Makassar', price: 'Rp 700.000', description: 'Meliputi kota-kota lain di Sulawesi Selatan dan sekitarnya', features: ['Termasuk Operator', 'Instalasi & Uninstalasi', 'Konten Setup Awal', 'Biaya Transport Termasuk'], templateKey: 'videotron_luar' },
];

/* ── helpers ── */
const parseJSON = <T,>(str: string | undefined, fallback: T): T => {
  if (!str) return fallback;
  try { return JSON.parse(str) as T; } catch { return fallback; }
};

const featuresToText = (features: string[]) => features.join('\n');
const textToFeatures = (text: string) => text.split('\n').map((l) => l.trim()).filter(Boolean);

/* ── sub-section header ── */
const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <>
    <h2 className="text-white font-semibold text-lg mb-1">{title}</h2>
    <p className="text-sm mb-6" style={{ color: '#666' }}>{subtitle}</p>
  </>
);

/* ── main component ── */
const ContentTab = () => {
  const [values, setValues] = useState<Record<ContentKey, string>>(() => {
    const init = {} as Record<ContentKey, string>;
    CONTENT_KEYS.forEach((k) => { init[k] = ''; });
    return init;
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('site_settings').select('key, value');
      if (!error && data) {
        const next = {} as Record<ContentKey, string>;
        CONTENT_KEYS.forEach((k) => { next[k] = ''; });
        (data as { key: string; value: string }[]).forEach((row) => {
          if (CONTENT_KEYS.includes(row.key as ContentKey)) {
            next[row.key as ContentKey] = row.value;
          }
        });
        setValues(next);
      }
      setLoading(false);
    })();
  }, []);

  const set = (key: ContentKey) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  const setImage = (key: ContentKey) => (url: string) =>
    setValues((v) => ({ ...v, [key]: url }));

  /* wedding packages state */
  const [wedPkgs, setWedPkgs] = useState<WeddingPkg[]>(DEFAULT_WEDDING);
  const [mulPkgs, setMulPkgs] = useState<MultimediaPkg[]>(DEFAULT_MULTIMEDIA);
  const [vidPkgs, setVidPkgs] = useState<VideotronPkg[]>(DEFAULT_VIDEOTRON);

  useEffect(() => {
    setWedPkgs(parseJSON(values.wedding_packages, DEFAULT_WEDDING));
    setMulPkgs(parseJSON(values.multimedia_packages, DEFAULT_MULTIMEDIA));
    setVidPkgs(parseJSON(values.videotron_packages, DEFAULT_VIDEOTRON));
  }, [loading]);

  const handleSave = async () => {
    setSaving(true);
    const rows = CONTENT_KEYS.map((key) => {
      let value = values[key];
      if (key === 'wedding_packages') value = JSON.stringify(wedPkgs);
      if (key === 'multimedia_packages') value = JSON.stringify(mulPkgs);
      if (key === 'videotron_packages') value = JSON.stringify(vidPkgs);
      return { key, value, updated_at: new Date().toISOString() };
    });
    const { error } = await supabase.from('site_settings').upsert(rows, { onConflict: 'key' });
    setSaving(false);
    if (error) {
      toast({ title: 'Gagal menyimpan', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Konten berhasil disimpan!' });
  };

  if (loading) {
    return <section style={{ ...cardStyle, padding: '24px' }}><p style={{ color: '#666' }}>Memuat…</p></section>;
  }

  /* ── render ── */
  return (
    <div className="space-y-6">
      {/* HERO */}
      <section style={{ ...cardStyle, padding: '24px' }}>
        <SectionHeader title="Hero Section" subtitle="Background dan tagline utama di halaman depan." />
        <div className="space-y-5">
          <ImageUploadField value={values.hero_bg_image} onChange={setImage('hero_bg_image')} label="Background Image" helper="Rekomendasi: gambar landscape, min 1920px lebar" />
          <div>
            <label style={labelStyle}>Tagline</label>
            <input value={values.hero_tagline} onChange={set('hero_tagline')} placeholder="Wujudkan acara impian Anda bersama kami" style={inputStyle} />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ ...cardStyle, padding: '24px' }}>
        <SectionHeader title="Tentang Kami" subtitle="Gambar dan teks di section Tentang Kami." />
        <div className="space-y-5">
          <ImageUploadField value={values.about_image} onChange={setImage('about_image')} label="Gambar Section" />
          <div>
            <label style={labelStyle}>Judul</label>
            <input value={values.about_title} onChange={set('about_title')} placeholder="Kenapa Memilih Anubae?" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Paragraf 1 (dengan border kiri)</label>
            <textarea value={values.about_paragraph1} onChange={set('about_paragraph1')} rows={4} placeholder="Anubae Organizer adalah tim event organizer profesional…" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
          <div>
            <label style={labelStyle}>Paragraf 2</label>
            <textarea value={values.about_paragraph2} onChange={set('about_paragraph2')} rows={4} placeholder="Mulai dari pernikahan romantis…" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
        </div>
      </section>

      {/* WEDDING */}
      <section style={{ ...cardStyle, padding: '24px' }}>
        <SectionHeader title="Paket Wedding" subtitle="Judul, deskripsi, dan daftar paket wedding." />
        <div className="space-y-5">
          <div>
            <label style={labelStyle}>Judul Section</label>
            <input value={values.wedding_section_title} onChange={set('wedding_section_title')} placeholder="Wedding Organizer" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Deskripsi Section</label>
            <textarea value={values.wedding_section_desc} onChange={set('wedding_section_desc')} rows={2} placeholder="Wujudkan pernikahan impian…" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
          {wedPkgs.map((pkg, i) => (
            <div key={pkg.templateKey} className="rounded-xl p-4 space-y-3" style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: '#80f0ff' }}>Paket {i + 1}</span>
                <span className="text-xs" style={{ color: '#555' }}>{pkg.templateKey}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={labelStyle}>Nama Paket</label>
                  <input value={pkg.name} onChange={(e) => { const next = [...wedPkgs]; next[i] = { ...next[i], name: e.target.value }; setWedPkgs(next); }} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Harga</label>
                  <input value={pkg.price} onChange={(e) => { const next = [...wedPkgs]; next[i] = { ...next[i], price: e.target.value }; setWedPkgs(next); }} style={inputStyle} />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer" style={labelStyle}>
                  <input type="checkbox" checked={pkg.featured} onChange={(e) => { const next = [...wedPkgs]; next[i] = { ...next[i], featured: e.target.checked }; setWedPkgs(next); }} className="accent-[#80f0ff]" />
                  Tandai sebagai populer
                </label>
              </div>
              <div>
                <label style={labelStyle}>Fitur (1 per baris)</label>
                <textarea value={featuresToText(pkg.features)} onChange={(e) => { const next = [...wedPkgs]; next[i] = { ...next[i], features: textToFeatures(e.target.value) }; setWedPkgs(next); }} rows={5} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
            </div>
          ))}
          <div>
            <label style={labelStyle}>Disclaimer</label>
            <input value={values.wedding_disclaimer} onChange={set('wedding_disclaimer')} placeholder="*Harga dapat berubah sewaktu-waktu…" style={inputStyle} />
          </div>
        </div>
      </section>

      {/* MULTIMEDIA */}
      <section style={{ ...cardStyle, padding: '24px' }}>
        <SectionHeader title="Paket Multimedia" subtitle="Judul, promo, dan daftar paket live cam." />
        <div className="space-y-5">
          <div>
            <label style={labelStyle}>Judul Section</label>
            <input value={values.multimedia_section_title} onChange={set('multimedia_section_title')} placeholder="Layanan Multimedia" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Deskripsi Section</label>
            <textarea value={values.multimedia_section_desc} onChange={set('multimedia_section_desc')} rows={2} placeholder="Solusi dokumentasi dan produksi multimedia…" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
          <div>
            <label style={labelStyle}>Teks Promo Banner</label>
            <input value={values.multimedia_promo_text} onChange={set('multimedia_promo_text')} placeholder="🎉 FREE LED TV 43 INCH UNTUK SEMUA PAKET LIVE CAM" style={inputStyle} />
          </div>
          {mulPkgs.map((pkg, i) => (
            <div key={pkg.templateKey} className="rounded-xl p-4 space-y-3" style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: '#80f0ff' }}>Paket {i + 1}</span>
                <span className="text-xs" style={{ color: '#555' }}>{pkg.templateKey}</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label style={labelStyle}>Nama</label>
                  <input value={pkg.name} onChange={(e) => { const next = [...mulPkgs]; next[i] = { ...next[i], name: e.target.value }; setMulPkgs(next); }} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Badge</label>
                  <input value={pkg.badge} onChange={(e) => { const next = [...mulPkgs]; next[i] = { ...next[i], badge: e.target.value }; setMulPkgs(next); }} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Harga</label>
                  <input value={pkg.price} onChange={(e) => { const next = [...mulPkgs]; next[i] = { ...next[i], price: e.target.value }; setMulPkgs(next); }} style={inputStyle} />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer" style={labelStyle}>
                  <input type="checkbox" checked={pkg.featured} onChange={(e) => { const next = [...mulPkgs]; next[i] = { ...next[i], featured: e.target.checked }; setMulPkgs(next); }} className="accent-[#80f0ff]" />
                  Tandai sebagai populer
                </label>
              </div>
              <div>
                <label style={labelStyle}>Fitur (1 per baris)</label>
                <textarea value={featuresToText(pkg.features)} onChange={(e) => { const next = [...mulPkgs]; next[i] = { ...next[i], features: textToFeatures(e.target.value) }; setMulPkgs(next); }} rows={5} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
            </div>
          ))}
          <div>
            <label style={labelStyle}>Disclaimer</label>
            <input value={values.multimedia_disclaimer} onChange={set('multimedia_disclaimer')} placeholder="*Harga belum termasuk transportasi…" style={inputStyle} />
          </div>
        </div>
      </section>

      {/* VIDEOTRON */}
      <section style={{ ...cardStyle, padding: '24px' }}>
        <SectionHeader title="Paket Videotron" subtitle="Judul, promo, dan daftar paket sewa videotron." />
        <div className="space-y-5">
          <div>
            <label style={labelStyle}>Judul Section</label>
            <input value={values.videotron_section_title} onChange={set('videotron_section_title')} placeholder="Harga Sewa Videotron" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Deskripsi Section</label>
            <textarea value={values.videotron_section_desc} onChange={set('videotron_section_desc')} rows={2} placeholder="Solusi layar LED profesional…" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
          </div>
          <div>
            <label style={labelStyle}>Teks Promo</label>
            <input value={values.videotron_promo_text} onChange={set('videotron_promo_text')} placeholder="📺 Tersedia berbagai ukuran…" style={inputStyle} />
          </div>
          {vidPkgs.map((pkg, i) => (
            <div key={pkg.templateKey} className="rounded-xl p-4 space-y-3" style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: '#80f0ff' }}>Paket {i + 1}</span>
                <span className="text-xs" style={{ color: '#555' }}>{pkg.templateKey}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={labelStyle}>Judul</label>
                  <input value={pkg.title} onChange={(e) => { const next = [...vidPkgs]; next[i] = { ...next[i], title: e.target.value }; setVidPkgs(next); }} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Harga</label>
                  <input value={pkg.price} onChange={(e) => { const next = [...vidPkgs]; next[i] = { ...next[i], price: e.target.value }; setVidPkgs(next); }} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Deskripsi</label>
                <textarea value={pkg.description} onChange={(e) => { const next = [...vidPkgs]; next[i] = { ...next[i], description: e.target.value }; setVidPkgs(next); }} rows={2} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
              <div>
                <label style={labelStyle}>Fitur (1 per baris)</label>
                <textarea value={featuresToText(pkg.features)} onChange={(e) => { const next = [...vidPkgs]; next[i] = { ...next[i], features: textToFeatures(e.target.value) }; setVidPkgs(next); }} rows={4} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>
            </div>
          ))}
          <div>
            <label style={labelStyle}>Disclaimer</label>
            <input value={values.videotron_disclaimer} onChange={set('videotron_disclaimer')} placeholder="*Harga per meter per hari…" style={inputStyle} />
          </div>
        </div>
      </section>

      {/* SAVE */}
      <div className="flex justify-end">
        <button onClick={handleSave} disabled={saving} style={{ ...primaryBtn, opacity: saving ? 0.7 : 1, cursor: saving ? 'not-allowed' : 'pointer' }}>
          <Save size={16} />
          {saving ? 'Menyimpan…' : 'Simpan Semua Konten'}
        </button>
      </div>
    </div>
  );
};

export default ContentTab;
