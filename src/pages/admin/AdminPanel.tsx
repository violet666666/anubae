import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Star,
  Trash2,
  Play,
  LogOut,
  MessageSquare,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// ---------- Types ----------
type Category = 'wedding' | 'multimedia' | 'videotron' | 'lainnya';
type MediaType = 'image' | 'video';

type GalleryItem = {
  id: string;
  title: string | null;
  category: Category | null;
  media_type: MediaType | null;
  file_url: string;
  thumbnail_url: string | null;
  storage_path: string | null;
  is_featured: boolean | null;
  sort_order: number | null;
  created_at: string;
};

type ContactSubmission = {
  id: string;
  name: string;
  phone: string;
  service: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

type SiteSettingKey =
  | 'whatsapp_number'
  | 'instagram_url'
  | 'youtube_url'
  | 'maps_url';

type SettingsState = Record<SiteSettingKey, string>;

const SETTING_KEYS: SiteSettingKey[] = [
  'whatsapp_number',
  'instagram_url',
  'youtube_url',
  'maps_url',
];

// ---------- Shared styles ----------
const cardStyle: React.CSSProperties = {
  backgroundColor: '#111111',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '16px',
};

const inputStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  padding: '12px 16px',
  color: '#ffffff',
  width: '100%',
  outline: 'none',
  fontSize: '0.95rem',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
};

const labelStyle: React.CSSProperties = {
  color: '#999',
  fontSize: '0.875rem',
  marginBottom: '6px',
  display: 'block',
};

const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = '#80f0ff';
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(128,240,255,0.1)';
};

const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
  e.currentTarget.style.boxShadow = 'none';
};

const primaryBtn: React.CSSProperties = {
  backgroundColor: '#80f0ff',
  color: '#000',
  fontWeight: 700,
  borderRadius: '10px',
  padding: '12px 20px',
  border: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
};

// ---------- Component ----------
const AdminPanel = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'media' | 'settings' | 'messages'>(
    'media',
  );

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  // ----- Submissions count for tab badge -----
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const submissionsCount = submissions.length;

  const loadSubmissions = async () => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Gagal memuat pesan', description: error.message, variant: 'destructive' });
      return;
    }
    setSubmissions((data ?? []) as ContactSubmission[]);
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  return (
    <div style={{ backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#cccccc' }}>
      {/* Top admin navbar */}
      <header
        className="sticky top-0 z-50"
        style={{
          backgroundColor: '#111111',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          height: '64px',
        }}
      >
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/anubae-logo2.png"
              alt="Anubae Organizer"
              className="h-10 w-auto object-contain"
            />
            <span
              className="text-xs px-2 py-1 rounded"
              style={{ backgroundColor: 'rgba(128,240,255,0.1)', color: '#80f0ff' }}
            >
              Admin Panel
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm hidden sm:inline" style={{ color: '#666' }}>
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              style={{
                border: '1px solid #444',
                color: '#999',
                background: 'transparent',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ff6b6b';
                e.currentTarget.style.borderColor = '#ff6b6b';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#999';
                e.currentTarget.style.borderColor = '#444';
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <nav
        style={{
          backgroundColor: '#111111',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="px-6 flex gap-8">
          {[
            { id: 'media' as const, label: '📸 Katalog Media' },
            { id: 'settings' as const, label: '⚙️ Pengaturan' },
            {
              id: 'messages' as const,
              label: `📬 Pesan Masuk${submissionsCount ? ` (${submissionsCount})` : ''}`,
            },
          ].map((t) => {
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
        {activeTab === 'messages' && (
          <MessagesTab submissions={submissions} reload={loadSubmissions} />
        )}
      </main>
    </div>
  );
};

export default AdminPanel;

// ============================================================
// TAB 1: MEDIA
// ============================================================
const MediaTab = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [category, setCategory] = useState<Category>('wedding');
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_media')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Gagal memuat media', description: error.message, variant: 'destructive' });
    } else {
      setItems((data ?? []) as GalleryItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const list = Array.from(files);
    const tooBig = list.find((f) => f.size > 50 * 1024 * 1024);
    if (tooBig) {
      toast({
        title: 'File terlalu besar',
        description: `${tooBig.name} melebihi 50MB.`,
        variant: 'destructive',
      });
      return;
    }
    setPendingFiles(list);
  };

  const uploadFile = async (file: File) => {
    const ext = file.name.split('.').pop();
    const path = `${category}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    setProgress((p) => ({ ...p, [file.name]: 10 }));

    const { error } = await supabase.storage
      .from('anubae-media')
      .upload(path, file, { cacheControl: '3600', upsert: false });
    if (error) throw error;

    setProgress((p) => ({ ...p, [file.name]: 70 }));

    const {
      data: { publicUrl },
    } = supabase.storage.from('anubae-media').getPublicUrl(path);

    const detectedType: MediaType = file.type.startsWith('video') ? 'video' : 'image';

    const { error: insertErr } = await supabase.from('gallery_media').insert({
      file_url: publicUrl,
      storage_path: path,
      category,
      media_type: mediaType || detectedType,
      title: file.name.replace(/\.[^.]+$/, ''),
    });
    if (insertErr) throw insertErr;

    setProgress((p) => ({ ...p, [file.name]: 100 }));
  };

  const handleUpload = async () => {
    if (pendingFiles.length === 0) {
      toast({ title: 'Pilih file terlebih dahulu', variant: 'destructive' });
      return;
    }
    setUploading(true);
    let successCount = 0;
    for (const file of pendingFiles) {
      try {
        await uploadFile(file);
        successCount += 1;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        toast({
          title: `Gagal upload ${file.name}`,
          description: message,
          variant: 'destructive',
        });
      }
    }
    setUploading(false);
    setPendingFiles([]);
    setProgress({});
    if (successCount > 0) {
      toast({ title: 'File berhasil diupload!', description: `${successCount} file ditambahkan.` });
    }
    await loadItems();
  };

  const toggleFeatured = async (item: GalleryItem) => {
    const next = !item.is_featured;
    const { error } = await supabase
      .from('gallery_media')
      .update({ is_featured: next })
      .eq('id', item.id);
    if (error) {
      toast({ title: 'Gagal update', description: error.message, variant: 'destructive' });
      return;
    }
    setItems((prev) =>
      prev.map((it) => (it.id === item.id ? { ...it, is_featured: next } : it)),
    );
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);

    if (target.storage_path) {
      const { error: storageErr } = await supabase.storage
        .from('anubae-media')
        .remove([target.storage_path]);
      if (storageErr) {
        toast({
          title: 'Peringatan',
          description: `File storage tidak terhapus: ${storageErr.message}`,
        });
      }
    }
    const { error } = await supabase.from('gallery_media').delete().eq('id', target.id);
    if (error) {
      toast({ title: 'Gagal hapus', description: error.message, variant: 'destructive' });
      return;
    }
    setItems((prev) => prev.filter((it) => it.id !== target.id));
    toast({ title: 'Media dihapus' });
  };

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((it) => it.category === filter)),
    [items, filter],
  );

  const filterTabs: Array<{ id: 'all' | Category; label: string }> = [
    { id: 'all', label: 'Semua' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'multimedia', label: 'Multimedia' },
    { id: 'videotron', label: 'Videotron' },
    { id: 'lainnya', label: 'Lainnya' },
  ];

  return (
    <div className="space-y-8">
      {/* Upload section */}
      <section style={{ ...cardStyle, padding: '24px' }}>
        <h2 className="text-white font-semibold text-lg mb-4">Upload Media</h2>

        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = '#80f0ff';
            e.currentTarget.style.backgroundColor = 'rgba(128,240,255,0.04)';
          }}
          onDragLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(128,240,255,0.3)';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.currentTarget.style.borderColor = 'rgba(128,240,255,0.3)';
            e.currentTarget.style.backgroundColor = 'transparent';
            handleFiles(e.dataTransfer.files);
          }}
          className="rounded-xl p-10 text-center cursor-pointer transition-colors"
          style={{
            border: '2px dashed rgba(128,240,255,0.3)',
          }}
        >
          <Upload size={40} color="#80f0ff" className="mx-auto mb-3" />
          <p className="text-white font-medium">
            Drag & drop foto/video di sini, atau klik untuk memilih
          </p>
          <p className="text-xs mt-2" style={{ color: '#666' }}>
            Mendukung JPG, PNG, WebP, MP4, MOV — Maks 50MB per file
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {pendingFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {pendingFiles.map((f) => (
              <div key={f.name} className="text-sm">
                <div className="flex justify-between mb-1">
                  <span style={{ color: '#ccc' }}>{f.name}</span>
                  <span style={{ color: '#666' }}>{(f.size / 1024 / 1024).toFixed(1)}MB</span>
                </div>
                <div
                  style={{
                    height: '4px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    borderRadius: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${progress[f.name] ?? 0}%`,
                      backgroundColor: '#80f0ff',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label style={labelStyle}>Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              style={{ ...inputStyle, appearance: 'none' }}
            >
              <option value="wedding">Wedding</option>
              <option value="multimedia">Multimedia</option>
              <option value="videotron">Videotron</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Tipe</label>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as MediaType)}
              style={{ ...inputStyle, appearance: 'none' }}
            >
              <option value="image">Foto</option>
              <option value="video">Video</option>
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpload}
            disabled={uploading || pendingFiles.length === 0}
            style={{
              ...primaryBtn,
              opacity: uploading || pendingFiles.length === 0 ? 0.6 : 1,
              cursor: uploading || pendingFiles.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <Upload size={16} />
            {uploading ? 'Mengupload…' : 'Upload File'}
          </button>
        </div>
      </section>

      {/* Filter + grid */}
      <section style={{ ...cardStyle, padding: '24px' }}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-white font-semibold text-lg">Galeri Media</h2>
          <div className="flex gap-2 flex-wrap">
            {filterTabs.map((t) => {
              const active = filter === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setFilter(t.id)}
                  className="px-3 py-1.5 rounded-lg text-sm transition-colors"
                  style={{
                    backgroundColor: active ? 'rgba(128,240,255,0.1)' : 'transparent',
                    color: active ? '#80f0ff' : '#999',
                    border: `1px solid ${active ? 'rgba(128,240,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    cursor: 'pointer',
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <p className="text-center py-12" style={{ color: '#666' }}>
            Memuat…
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-center py-12" style={{ color: '#666' }}>
            Belum ada media. Upload foto atau video pertama Anda.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group relative overflow-hidden rounded-xl"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.06)',
                  aspectRatio: '1 / 1',
                }}
              >
                {item.media_type === 'video' ? (
                  <>
                    <video
                      src={item.file_url}
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div
                        className="rounded-full p-3"
                        style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
                      >
                        <Play size={20} color="#fff" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={item.thumbnail_url || item.file_url}
                    alt={item.title || 'media'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}

                {/* Hover overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 p-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0))',
                  }}
                >
                  <span className="text-xs text-white truncate flex-1 mr-2">
                    {item.title || '—'}
                  </span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleFeatured(item)}
                      className="p-1.5 rounded hover:bg-white/10"
                      aria-label="Toggle featured"
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                      <Star
                        size={16}
                        color={item.is_featured ? '#facc15' : '#fff'}
                        fill={item.is_featured ? '#facc15' : 'none'}
                      />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="p-1.5 rounded hover:bg-white/10"
                      aria-label="Delete"
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} color="#ff6b6b" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus media ini?</AlertDialogTitle>
            <AlertDialogDescription>
              File akan dihapus dari storage dan database. Tindakan ini tidak bisa dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// ============================================================
// TAB 2: SETTINGS
// ============================================================
// TODO - connect public Footer to read from site_settings
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
        const next: SettingsState = {
          whatsapp_number: '',
          instagram_url: '',
          youtube_url: '',
          maps_url: '',
        };
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
    const { error } = await supabase
      .from('site_settings')
      .upsert(rows, { onConflict: 'key' });
    setSaving(false);
    if (error) {
      toast({ title: 'Gagal menyimpan', description: error.message, variant: 'destructive' });
      return;
    }
    toast({ title: 'Pengaturan berhasil disimpan!' });
  };

  const fields: Array<{
    key: SiteSettingKey;
    label: string;
    placeholder: string;
    helper?: string;
  }> = [
    {
      key: 'whatsapp_number',
      label: 'WhatsApp Number',
      placeholder: '6281242401771',
      helper: 'Format: 628xxxxxxxxxx (tanpa + atau -)',
    },
    {
      key: 'instagram_url',
      label: 'Instagram URL',
      placeholder: 'https://www.instagram.com/anubae.organizer',
    },
    {
      key: 'youtube_url',
      label: 'YouTube URL',
      placeholder: 'https://www.youtube.com/@Anubaeorganizer/videos',
    },
    {
      key: 'maps_url',
      label: 'Google Maps URL',
      placeholder: 'https://maps.app.goo.gl/...',
    },
  ];

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
              <label htmlFor={f.key} style={labelStyle}>
                {f.label}
              </label>
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
              {f.helper && (
                <p className="text-xs mt-1.5" style={{ color: '#555' }}>
                  {f.helper}
                </p>
              )}
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                ...primaryBtn,
                opacity: saving ? 0.7 : 1,
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? 'Menyimpan…' : 'Simpan Pengaturan'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

// ============================================================
// TAB 3: MESSAGES
// ============================================================
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
  const dd = d.getDate();
  const mm = months[d.getMonth()];
  const yyyy = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, '0');
  const mi = String(d.getMinutes()).padStart(2, '0');
  return `${dd} ${mm} ${yyyy}, ${hh}:${mi}`;
};

const MessagesTab = ({
  submissions,
  reload,
}: {
  submissions: ContactSubmission[];
  reload: () => Promise<void>;
}) => {
  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <article key={s.id} style={{ ...cardStyle, padding: '20px' }}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-white font-bold">{s.name}</h3>
                  {s.service && (
                    <span
                      className="text-xs px-2 py-0.5 rounded"
                      style={{ backgroundColor: color.bg, color: color.text }}
                    >
                      {s.service}
                    </span>
                  )}
                </div>
                <a
                  href={`tel:${phoneClean}`}
                  className="text-sm hover:underline inline-block mt-1"
                  style={{ color: '#80f0ff' }}
                >
                  {s.phone}
                </a>
                <p className="italic mt-3" style={{ color: '#999' }}>
                  {s.message}
                </p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={primaryBtn}
                >
                  Balas WA
                </a>
                <span className="text-xs" style={{ color: '#555' }}>
                  {formatDate(s.created_at)}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};
