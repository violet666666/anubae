import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { galleryImages, type GalleryImage } from '@/data/galleryData';

type MediaItem = {
  id: string;
  title: string | null;
  category: string | null;
  media_type: string | null;
  file_url: string;
  thumbnail_url: string | null;
};

const mapToGalleryImage = (item: MediaItem): GalleryImage => ({
  id: item.id,
  src: item.media_type === 'video' ? (item.thumbnail_url || item.file_url) : item.file_url,
  alt: item.title || 'Gallery media',
  caption: item.title || 'Untitled',
  student: item.category || '',
  course: item.category || '',
  camera: '',
  settings: '',
  description: '',
  date: '',
});

type GalleryMediaContextType = {
  images: GalleryImage[];
  videos: MediaItem[];
  loading: boolean;
  refetch: () => void;
};

const GalleryMediaContext = createContext<GalleryMediaContextType>({
  images: [],
  videos: [],
  loading: true,
  refetch: () => {},
});

export const GalleryMediaProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMedia = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery_media')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error || !data) {
      setImages(galleryImages);
      setVideos([]);
      setLoading(false);
      return;
    }

    if (data.length === 0) {
      setImages([]);
      setVideos([]);
      setLoading(false);
      return;
    }

    const media = data as MediaItem[];
    const imageItems = media.filter((m) => m.media_type !== 'video');
    const videoItems = media.filter((m) => m.media_type === 'video');

    setImages(imageItems.map(mapToGalleryImage));
    setVideos(videoItems);
    setLoading(false);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <GalleryMediaContext.Provider value={{ images, videos, loading, refetch: fetchMedia }}>
      {children}
    </GalleryMediaContext.Provider>
  );
};

export const useGalleryMedia = () => useContext(GalleryMediaContext);
