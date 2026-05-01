import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { labelStyle } from '@/pages/admin/shared-styles';

type Props = {
  value: string;
  onChange: (url: string) => void;
  label: string;
  helper?: string;
};

const ImageUploadField = ({ value, onChange, label, helper }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: 'File terlalu besar', description: 'Maks 10MB.', variant: 'destructive' });
      return;
    }
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `content/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('anubae-media').upload(path, file, { cacheControl: '3600', upsert: false });
    if (error) {
      toast({ title: 'Gagal upload', description: error.message, variant: 'destructive' });
      setUploading(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from('anubae-media').getPublicUrl(path);
    onChange(publicUrl);
    setUploading(false);
  };

  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {value ? (
        <div className="relative group rounded-xl overflow-hidden" style={{ maxWidth: 400 }}>
          <img src={value} alt={label} className="w-full h-48 object-cover rounded-xl" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ backgroundColor: 'rgba(128,240,255,0.2)', color: '#80f0ff', border: '1px solid rgba(128,240,255,0.3)', cursor: 'pointer' }}
            >Ganti</button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ backgroundColor: 'rgba(255,107,107,0.2)', color: '#ff6b6b', border: '1px solid rgba(255,107,107,0.3)', cursor: 'pointer' }}
            ><X size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> Hapus</button>
          </div>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
          className="rounded-xl p-8 text-center cursor-pointer transition-colors"
          style={{ border: '2px dashed rgba(128,240,255,0.3)' }}
        >
          <Upload size={28} color="#80f0ff" className="mx-auto mb-2" />
          <p className="text-sm" style={{ color: '#999' }}>{uploading ? 'Mengupload…' : 'Klik untuk upload gambar'}</p>
        </div>
      )}
      {helper && <p className="text-xs mt-1.5" style={{ color: '#555' }}>{helper}</p>}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFile(file); e.target.value = ''; }}
      />
    </div>
  );
};

export default ImageUploadField;
