import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { cardStyle, inputStyle, labelStyle, primaryBtn } from './shared-styles';
import ImageUploadField from '@/components/admin/ImageUploadField';

/* ── types ── */
type WeddingPkg = { name: string; price: string; features: string[]; featured: boolean; templateKey: string };
type MultimediaPkg = { name: string; badge: string; price: string; features: string[]; featured: boolean; templateKey: string };
type VideotronPkg = { title: string; price: string; description: string; features: string[]; templateKey: string };

type ContentKey =
  | 'hero_bg_image' | 'hero_tagline' | 'hero_rotating_words'
  | 'about_image' | 'about_title' | 'about_paragraph1' | 'about_paragraph2'
  | 'wedding_section_title' | 'wedding_section_desc' | 'wedding_packages' | 'wedding_disclaimer'
  | 'multimedia_section_title' | 'multimedia_section_desc' | 'multimedia_promo_text' | 'multimedia_packages' | 'multimedia_disclaimer'
  | 'videotron_section_title' | 'videotron_section_desc' | 'videotron_promo_text' | 'videotron_packages' | 'videotron_disclaimer'
  | 'katalog_title' | 'katalog_foto_title' | 'katalog_foto_desc' | 'katalog_video_title' | 'katalog_video_desc';

const CONTENT_KEYS: ContentKey[] = [
  'hero_bg_image', 'hero_tagline', 'hero_rotating_words',
  'about_image', 'about_title', 'about_paragraph1', 'about_paragraph2',
  'wedding_section_title', 'wedding_section_desc', 'wedding_packages', 'wedding_disclaimer',
  'multimedia_section_title', 'multimedia_section_desc', 'multimedia_promo_text', 'multimedia_packages', 'multimedia_disclaimer',
  'videotron_section_title', 'videotron_section_desc', 'videotron_promo_text', 'videotron_packages', 'videotron_disclaimer',
  'katalog_title', 'katalog_foto_title', 'katalog_foto_desc', 'katalog_video_title', 'katalog_video_desc',
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

  /* dynamic sections state */
  type DynSection = { id: string; title: string; content: string; layout_type: string; image_url: string; background: string; sort_order: number; is_active: boolean };
  const [dynSections, setDynSections] = useState<DynSection[]>([]);
  const [dynSaving, setDynSaving] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [settingsRes, dynRes] = await Promise.all([
        supabase.from('site_settings').select('key, value'),
        supabase.from('dynamic_sections').select('*').order('sort_order', { ascending: true }),
      ]);
      if (!settingsRes.error && settingsRes.data) {
        const next = {} as Record<ContentKey, string>;
        CONTENT_KEYS.forEach((k) => { next[k] = ''; });
        (settingsRes.data as { key: string; value: string }[]).forEach((row) => {
          if (CONTENT_KEYS.includes(row.key as ContentKey)) {
            next[row.key as ContentKey] = row.value;
          }
        });
        setValues(next);
      }
      if (!dynRes.error && dynRes.data) {
        setDynSections(dynRes.data as DynSection[]);
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

  /* dynamic section CRUD */
  const addDynSection = async () => {
    const nextOrder = dynSections.length > 0 ? Math.max(...dynSections.map((s) => s.sort_order)) + 1 : 0;
    const { data, error } = await supabase.from('dynamic_sections').insert({
      title: 'Section Baru', content: '', layout_type: 'text-only', background: 'default', sort_order: nextOrder, is_active: true,
    }).select().single();
    if (error) { toast({ title: 'Gagal menambah section', description: error.message, variant: 'destructive' }); return; }
    setDynSections((prev) => [...prev, data as DynSection]);
  };

  const updateDynSection = async (id: string, updates: Partial<DynSection>) => {
    setDynSaving(id);
    const { error } = await supabase.from('dynamic_sections').update({ ...updates, updated_at: new Date().toISOString() }).eq('id', id);
    setDynSaving(null);
    if (error) { toast({ title: 'Gagal update', description: error.message, variant: 'destructive' }); return; }
    setDynSections((prev) => prev.map((s) => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteDynSection = async (id: string) => {
    const { error } = await supabase.from('dynamic_sections').delete().eq('id', id);
    if (error) { toast({ title: 'Gagal hapus', description: error.message, variant: 'destructive' }); return; }
    setDynSections((prev) => prev.filter((s) => s.id !== id));
    toast({ title: 'Section dihapus' });
  };

  const moveDynSection = async (index: number, direction: 'up' | 'down') => {
    const swapIdx = direction === 'up' ? index - 1 : index + 1;
    if (swapIdx < 0 || swapIdx >= dynSections.length) return;
    const a = dynSections[index];
    const b = dynSections[swapIdx];
    await Promise.all([
      supabase.from('dynamic_sections').update({ sort_order: b.sort_order }).eq('id', a.id),
      supabase.from('dynamic_sections').update({ sort_order: a.sort_order }).eq('id', b.id),
    ]);
    const next = [...dynSections];
    next[index] = { ...a, sort_order: b.sort_order };
    next[swapIdx] = { ...b, sort_order: a.sort_order };
    setDynSections(next.sort((x, y) => x.sort_order - y.sort_order));
  };

  const setDynField = (id: string, field: keyof DynSection, value: string | boolean) => {
    setDynSections((prev) => prev.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  const LAYOUT_OPTIONS = [
    { value: 'text-only', label: 'Teks Saja' },
    { value: 'text-image-left', label: 'Gambar Kiri + Teks Kanan' },
    { value: 'text-image-right', label: 'Teks Kiri + Gambar Kanan' },
    { value: 'full-banner', label: 'Full Banner (Background)' },
  ];
  const BG_OPTIONS = [
    { value: 'default', label: 'Default' },
    { value: 'dark', label: 'Gelap' },
    { value: 'primary', label: 'Aksen Cyan' },
    { value: 'muted', label: 'Muted' },
  ];

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
          <div>
            <label style={labelStyle}>Kata Rotasi (pisah dengan koma)</label>
            <input value={values.hero_rotating_words} onChange={set('hero_rotating_words')} placeholder="Wedding Impian, Momen Istimewa, Kenangan Abadi, Acara Profesional, Hari Spesialmu" style={inputStyle} />
            <p className="text-xs mt-1.5" style={{ color: '#555' }}>Kata-kata yang bergantian di hero. Pisah dengan koma.</p>
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

      {/* KATALOG */}
      <section style={{ ...cardStyle, padding: '24px' }}>
        <SectionHeader title="Katalog / Portofolio" subtitle="Judul section katalog foto dan video." />
        <div className="space-y-5">
          <div>
            <label style={labelStyle}>Judul Portofolio</label>
            <input value={values.katalog_title} onChange={set('katalog_title')} placeholder="Portofolio Kami" style={inputStyle} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Judul Katalog Foto</label>
              <input value={values.katalog_foto_title} onChange={set('katalog_foto_title')} placeholder="Katalog Foto" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Deskripsi Katalog Foto</label>
              <input value={values.katalog_foto_desc} onChange={set('katalog_foto_desc')} placeholder="Dokumentasi foto acara-acara terbaik…" style={inputStyle} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Judul Katalog Video</label>
              <input value={values.katalog_video_title} onChange={set('katalog_video_title')} placeholder="Katalog Video" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Deskripsi Katalog Video</label>
              <input value={values.katalog_video_desc} onChange={set('katalog_video_desc')} placeholder="Highlight video sinematik…" style={inputStyle} />
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC SECTIONS */}
      <section style={{ ...cardStyle, padding: '24px' }}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-white font-semibold text-lg mb-1">Section Tambahan</h2>
            <p className="text-sm" style={{ color: '#666' }}>Tambah section custom di halaman depan. Tersimpan langsung.</p>
          </div>
          <button onClick={addDynSection} style={{ ...primaryBtn }} className="flex-shrink-0">
            <Plus size={16} /> Tambah Section
          </button>
        </div>

        {dynSections.length === 0 && (
          <p className="text-center py-8" style={{ color: '#555' }}>Belum ada section tambahan. Klik "Tambah Section" untuk membuat baru.</p>
        )}

        <div className="space-y-4">
          {dynSections.map((sec, i) => (
            <div key={sec.id} className="rounded-xl p-4 space-y-3" style={{ backgroundColor: '#1a1a1a', border: `1px solid ${sec.is_active ? 'rgba(128,240,255,0.15)' : 'rgba(255,255,255,0.06)'}`, opacity: sec.is_active ? 1 : 0.6 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{sec.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(128,240,255,0.1)', color: '#80f0ff' }}>{LAYOUT_OPTIONS.find((o) => o.value === sec.layout_type)?.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => moveDynSection(i, 'up')} disabled={i === 0} className="p-1 rounded hover:bg-white/10" style={{ background: 'transparent', border: 'none', cursor: i === 0 ? 'not-allowed' : 'pointer', opacity: i === 0 ? 0.3 : 1 }}><ChevronUp size={16} color="#fff" /></button>
                  <button onClick={() => moveDynSection(i, 'down')} disabled={i === dynSections.length - 1} className="p-1 rounded hover:bg-white/10" style={{ background: 'transparent', border: 'none', cursor: i === dynSections.length - 1 ? 'not-allowed' : 'pointer', opacity: i === dynSections.length - 1 ? 0.3 : 1 }}><ChevronDown size={16} color="#fff" /></button>
                  <label className="flex items-center gap-1.5 ml-2 cursor-pointer text-xs" style={{ color: sec.is_active ? '#80f0ff' : '#555' }}>
                    <input type="checkbox" checked={sec.is_active} onChange={(e) => updateDynSection(sec.id, { is_active: e.target.checked })} className="accent-[#80f0ff]" />
                    Aktif
                  </label>
                  <button onClick={() => deleteDynSection(sec.id)} className="p-1 rounded hover:bg-white/10 ml-1" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><Trash2 size={16} color="#ff6b6b" /></button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={labelStyle}>Judul</label>
                  <input value={sec.title} onChange={(e) => setDynField(sec.id, 'title', e.target.value)} onBlur={() => updateDynSection(sec.id, { title: sec.title })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Layout</label>
                  <select value={sec.layout_type} onChange={(e) => { setDynField(sec.id, 'layout_type', e.target.value); updateDynSection(sec.id, { layout_type: e.target.value }); }} style={{ ...inputStyle, appearance: 'none' }}>
                    {LAYOUT_OPTIONS.map((o) => <option key={o.value} value={o.value} style={{ backgroundColor: '#1a1a1a' }}>{o.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Konten</label>
                <textarea value={sec.content} onChange={(e) => setDynField(sec.id, 'content', e.target.value)} onBlur={() => updateDynSection(sec.id, { content: sec.content })} rows={3} placeholder="Tulis konten section di sini…" style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} />
              </div>

              {(sec.layout_type === 'text-image-left' || sec.layout_type === 'text-image-right' || sec.layout_type === 'full-banner') && (
                <ImageUploadField
                  value={sec.image_url || ''}
                  onChange={(url) => { setDynField(sec.id, 'image_url', url); updateDynSection(sec.id, { image_url: url }); }}
                  label="Gambar Section"
                />
              )}

              <div>
                <label style={labelStyle}>Background</label>
                <select value={sec.background} onChange={(e) => { setDynField(sec.id, 'background', e.target.value); updateDynSection(sec.id, { background: e.target.value }); }} style={{ ...inputStyle, appearance: 'none', maxWidth: 200 }}>
                  {BG_OPTIONS.map((o) => <option key={o.value} value={o.value} style={{ backgroundColor: '#1a1a1a' }}>{o.label}</option>)}
                </select>
              </div>

              {dynSaving === sec.id && <p className="text-xs" style={{ color: '#80f0ff' }}>Menyimpan…</p>}
            </div>
          ))}
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
