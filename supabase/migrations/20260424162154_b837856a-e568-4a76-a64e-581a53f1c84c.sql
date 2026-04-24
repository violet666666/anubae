-- Site settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated can insert settings"
  ON public.site_settings FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated can update settings"
  ON public.site_settings FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can delete settings"
  ON public.site_settings FOR DELETE TO authenticated
  USING (true);

INSERT INTO public.site_settings (key, value) VALUES
  ('whatsapp_number', '6281242401771'),
  ('instagram_url', 'https://www.instagram.com/anubae.organizer'),
  ('youtube_url', 'https://www.youtube.com/@Anubaeorganizer/videos'),
  ('maps_url', 'https://maps.app.goo.gl/7yRLUaKsPGzbwHvy8')
ON CONFLICT (key) DO NOTHING;

-- Gallery media table
CREATE TABLE IF NOT EXISTS public.gallery_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  category TEXT CHECK (category IN ('wedding', 'multimedia', 'videotron', 'lainnya')),
  media_type TEXT CHECK (media_type IN ('image', 'video')) DEFAULT 'image',
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  storage_path TEXT,
  is_featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read gallery"
  ON public.gallery_media FOR SELECT USING (true);

CREATE POLICY "Auth insert gallery"
  ON public.gallery_media FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Auth update gallery"
  ON public.gallery_media FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Auth delete gallery"
  ON public.gallery_media FOR DELETE TO authenticated USING (true);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('anubae-media', 'anubae-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read anubae-media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'anubae-media');

CREATE POLICY "Auth upload anubae-media"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'anubae-media');

CREATE POLICY "Auth update anubae-media"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'anubae-media') WITH CHECK (bucket_id = 'anubae-media');

CREATE POLICY "Auth delete anubae-media"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'anubae-media');