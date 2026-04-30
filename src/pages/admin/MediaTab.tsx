import { useEffect, useMemo, useRef, useState } from 'react';
import { Upload, Star, Trash2, Play, Pencil, Check, X, ChevronUp, ChevronDown, Image, Film } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
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
import { cardStyle, inputStyle, labelStyle, primaryBtn } from './shared-styles';

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

const CATEGORY_LABELS: Record<Category, string> = {
  wedding: 'Wedding',
  multimedia: 'Multimedia',
  videotron: 'Videotron',
  lainnya: 'Lainnya',
};

const CATEGORY_COLORS: Record<Category, string> = {
  wedding: '#f9a8d4',
  multimedia: '#80f0ff',
  videotron: '#a78bfa',
  lainnya: '#fbbf24',
};

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<Category>('wedding');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_media')
      .select('*')
      .order('sort_order', { ascending: true })
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
      toast({ title: 'File terlalu besar', description: `${tooBig.name} melebihi 50MB.`, variant: 'destructive' });
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

    const { data: { publicUrl } } = supabase.storage.from('anubae-media').getPublicUrl(path);
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
        toast({ title: `Gagal upload ${file.name}`, description: message, variant: 'destructive' });
      }
    }
    setUploading(false);
    setPendingFiles([]);
    setProgress({});
    if (successCount > 0) {
      toast({ title: `${successCount} file berhasil diupload!` });
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
    setItems((prev) => prev.map((it) => (it.id === item.id ? { ...it, is_featured: next } : it)));
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    setDeleteTarget(null);

    if (target.storage_path) {
      await supabase.storage.from('anubae-media').remove([target.storage_path]);
    }
    const { error } = await supabase.from('gallery_media').delete().eq('id', target.id);
    if (error) {
      toast({ title: 'Gagal hapus', description: error.message, variant: 'destructive' });
      return;
    }
    setItems((prev) => prev.filter((it) => it.id !== target.id));
    toast({ title: 'Media dihapus' });
  };

  const startEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setEditTitle(item.title || '');
    setEditCategory(item.category || 'wedding');
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const { error } = await supabase
      .from('gallery_media')
      .update({ title: editTitle || null, category: editCategory })
      .eq('id', editingId);
    if (error) {
      toast({ title: 'Gagal update', description: error.message, variant: 'destructive' });
      return;
    }
    setItems((prev) =>
      prev.map((it) => (it.id === editingId ? { ...it, title: editTitle || null, category: editCategory } : it)),
    );
    setEditingId(null);
    toast({ title: 'Media diperbarui' });
  };

  const moveItem = async (item: GalleryItem, direction: 'up' | 'down') => {
    const sorted = [...filtered];
    const idx = sorted.findIndex((it) => it.id === item.id);
    if (idx < 0) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const swapItem = sorted[swapIdx];
    const orderA = item.sort_order ?? 0;
    const orderB = swapItem.sort_order ?? 0;

    await supabase.from('gallery_media').update({ sort_order: orderB }).eq('id', item.id);
    await supabase.from('gallery_media').update({ sort_order: orderA }).eq('id', swapItem.id);
    await loadItems();
  };

  const filtered = useMemo(
    () => (filter === 'all' ? items : items.filter((it) => it.category === filter)),
    [items, filter],
  );

  const imageCount = items.filter((i) => i.media_type === 'image').length;
  const videoCount = items.filter((i) => i.media_type === 'video').length;

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
        <h2 className="text-white font-semibold text-lg mb-1">Upload Media Baru</h2>
        <p className="text-sm mb-4" style={{ color: '#666' }}>File yang diupload akan tampil di bagian "Portofolio Kami" pada halaman utama website.</p>

        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
          onDragOver={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = '#80f0ff'; e.currentTarget.style.backgroundColor = 'rgba(128,240,255,0.04)'; }}
          onDragLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(128,240,255,0.3)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
          onDrop={(e) => { e.preventDefault(); e.currentTarget.style.borderColor = 'rgba(128,240,255,0.3)'; e.currentTarget.style.backgroundColor = 'transparent'; handleFiles(e.dataTransfer.files); }}
          className="rounded-xl p-10 text-center cursor-pointer transition-colors"
          style={{ border: '2px dashed rgba(128,240,255,0.3)' }}
        >
          <Upload size={40} color="#80f0ff" className="mx-auto mb-3" />
          <p className="text-white font-medium">Drag & drop foto/video di sini, atau klik untuk memilih</p>
          <p className="text-xs mt-2" style={{ color: '#666' }}>JPG, PNG, WebP, MP4, MOV — Maks 50MB per file</p>
          <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple hidden onChange={(e) => handleFiles(e.target.files)} />
        </div>

        {pendingFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            {pendingFiles.map((f) => (
              <div key={f.name} className="text-sm">
                <div className="flex justify-between mb-1">
                  <span style={{ color: '#ccc' }}>{f.name}</span>
                  <span style={{ color: '#666' }}>{(f.size / 1024 / 1024).toFixed(1)}MB</span>
                </div>
                <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${progress[f.name] ?? 0}%`, backgroundColor: '#80f0ff', transition: 'width 0.3s ease' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div>
            <label style={labelStyle}>Kategori</label>
            <div style={{ position: 'relative' }}>
              <select value={category} onChange={(e) => setCategory(e.target.value as Category)} style={{ ...inputStyle, appearance: 'none', paddingRight: '36px' }}>
                <option value="wedding" style={{ backgroundColor: '#1a1a1a' }}>Wedding</option>
                <option value="multimedia" style={{ backgroundColor: '#1a1a1a' }}>Multimedia</option>
                <option value="videotron" style={{ backgroundColor: '#1a1a1a' }}>Videotron</option>
                <option value="lainnya" style={{ backgroundColor: '#1a1a1a' }}>Lainnya</option>
              </select>
              <svg style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="#999" strokeWidth="1.5" fill="none" /></svg>
            </div>
          </div>
          <div>
            <label style={labelStyle}>Tipe</label>
            <div style={{ position: 'relative' }}>
              <select value={mediaType} onChange={(e) => setMediaType(e.target.value as MediaType)} style={{ ...inputStyle, appearance: 'none', paddingRight: '36px' }}>
                <option value="image" style={{ backgroundColor: '#1a1a1a' }}>Foto</option>
                <option value="video" style={{ backgroundColor: '#1a1a1a' }}>Video</option>
              </select>
              <svg style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="12" height="8" viewBox="0 0 12 8"><path d="M1 1l5 5 5-5" stroke="#999" strokeWidth="1.5" fill="none" /></svg>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={handleUpload} disabled={uploading || pendingFiles.length === 0} style={{ ...primaryBtn, opacity: uploading || pendingFiles.length === 0 ? 0.6 : 1, cursor: uploading || pendingFiles.length === 0 ? 'not-allowed' : 'pointer' }}>
            <Upload size={16} />
            {uploading ? 'Mengupload…' : 'Upload File'}
          </button>
        </div>
      </section>

      {/* Gallery grid */}
      <section style={{ ...cardStyle, padding: '24px' }}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h2 className="text-white font-semibold text-lg">Kelola Portofolio</h2>
            <p className="text-xs mt-0.5" style={{ color: '#666' }}>
              <Image size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              {imageCount} foto &nbsp;
              <Film size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              {videoCount} video — Klik nama untuk edit, geser urutan dengan panah
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {filterTabs.map((t) => {
              const active = filter === t.id;
              return (
                <button key={t.id} onClick={() => setFilter(t.id)} className="px-3 py-1.5 rounded-lg text-sm transition-colors" style={{ backgroundColor: active ? 'rgba(128,240,255,0.1)' : 'transparent', color: active ? '#80f0ff' : '#999', border: `1px solid ${active ? 'rgba(128,240,255,0.3)' : 'rgba(255,255,255,0.08)'}`, cursor: 'pointer' }}>
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <p className="text-center py-12" style={{ color: '#666' }}>Memuat…</p>
        ) : filtered.length === 0 ? (
          <p className="text-center py-12" style={{ color: '#666' }}>Belum ada media. Upload foto atau video pertama Anda.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item, idx) => {
              const isEditing = editingId === item.id;
              return (
                <div key={item.id} className="group relative overflow-hidden rounded-xl" style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', aspectRatio: '1 / 1' }}>
                  {item.media_type === 'video' ? (
                    <>
                      <video src={item.file_url} className="w-full h-full object-cover" muted preload="metadata" />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="rounded-full p-3" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}><Play size={20} color="#fff" /></div>
                      </div>
                    </>
                  ) : (
                    <img src={item.thumbnail_url || item.file_url} alt={item.title || 'media'} className="w-full h-full object-cover" loading="lazy" />
                  )}

                  {item.is_featured && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-bold" style={{ backgroundColor: 'rgba(250,204,21,0.2)', color: '#facc15', border: '1px solid rgba(250,204,21,0.3)' }}>
                      <Star size={10} fill="#facc15" style={{ display: 'inline', verticalAlign: 'middle', marginRight: '3px' }} /> Utama
                    </div>
                  )}

                  {item.category && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-medium" style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: CATEGORY_COLORS[item.category] || '#999' }}>
                      {CATEGORY_LABELS[item.category]}
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))' }}>
                    {isEditing ? (
                      <div className="space-y-1.5" onClick={(e) => e.stopPropagation()}>
                        <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Judul media" className="w-full text-xs px-2 py-1.5 rounded" style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(128,240,255,0.4)', color: '#fff', outline: 'none' }} />
                        <select value={editCategory} onChange={(e) => setEditCategory(e.target.value as Category)} className="w-full text-xs px-2 py-1.5 rounded" style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(128,240,255,0.4)', color: '#fff', outline: 'none' }}>
                          <option value="wedding" style={{ backgroundColor: '#1a1a1a' }}>Wedding</option>
                          <option value="multimedia" style={{ backgroundColor: '#1a1a1a' }}>Multimedia</option>
                          <option value="videotron" style={{ backgroundColor: '#1a1a1a' }}>Videotron</option>
                          <option value="lainnya" style={{ backgroundColor: '#1a1a1a' }}>Lainnya</option>
                        </select>
                        <div className="flex gap-1">
                          <button onClick={saveEdit} className="flex-1 py-1 rounded text-xs font-medium" style={{ backgroundColor: 'rgba(128,240,255,0.2)', color: '#80f0ff', border: 'none', cursor: 'pointer' }}><Check size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Simpan</button>
                          <button onClick={() => setEditingId(null)} className="py-1 px-2 rounded text-xs" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#999', border: 'none', cursor: 'pointer' }}><X size={12} /></button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white truncate flex-1 mr-2 cursor-pointer" onClick={() => startEdit(item)} title="Klik untuk edit">{item.title || '—'}</span>
                        <div className="flex gap-0.5">
                          <button onClick={() => moveItem(item, 'up')} disabled={idx === 0} className="p-1 rounded hover:bg-white/10" aria-label="Move up" style={{ background: 'transparent', border: 'none', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.3 : 1 }}><ChevronUp size={14} color="#fff" /></button>
                          <button onClick={() => moveItem(item, 'down')} disabled={idx === filtered.length - 1} className="p-1 rounded hover:bg-white/10" aria-label="Move down" style={{ background: 'transparent', border: 'none', cursor: idx === filtered.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === filtered.length - 1 ? 0.3 : 1 }}><ChevronDown size={14} color="#fff" /></button>
                          <button onClick={() => startEdit(item)} className="p-1 rounded hover:bg-white/10" aria-label="Edit" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><Pencil size={14} color="#80f0ff" /></button>
                          <button onClick={() => toggleFeatured(item)} className="p-1 rounded hover:bg-white/10" aria-label="Toggle featured" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><Star size={14} color={item.is_featured ? '#facc15' : '#fff'} fill={item.is_featured ? '#facc15' : 'none'} /></button>
                          <button onClick={() => setDeleteTarget(item)} className="p-1 rounded hover:bg-white/10" aria-label="Delete" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><Trash2 size={14} color="#ff6b6b" /></button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <AlertDialog open={!!deleteTarget} onOpenChange={(o) => !o && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus media ini?</AlertDialogTitle>
            <AlertDialogDescription>File akan dihapus dari storage dan database. Tindakan ini tidak bisa dibatalkan.</AlertDialogDescription>
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

export default MediaTab;
