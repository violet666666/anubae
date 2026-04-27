CREATE TABLE IF NOT EXISTS public.wa_templates (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  template TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.wa_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read templates"
  ON public.wa_templates
  FOR SELECT
  USING (true);

CREATE POLICY "Auth insert templates"
  ON public.wa_templates
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Auth update templates"
  ON public.wa_templates
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Auth delete templates"
  ON public.wa_templates
  FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO public.wa_templates (id, label, template) VALUES
  ('wedding_basic',    'Wedding - Basic Package',    'Halo Anubae Organizer 👋, saya tertarik dengan *Basic Package Wedding* (Rp 3.999.999). Boleh saya tahu informasi lebih lanjut dan ketersediaan tanggal?'),
  ('wedding_premium',  'Wedding - Premium Package',  'Halo Anubae Organizer 👋, saya tertarik dengan *Premium Package Wedding* (Rp 4.999.999). Boleh saya tahu informasi lebih lanjut dan ketersediaan tanggal?'),
  ('wedding_luxury',   'Wedding - Luxury Package',   'Halo Anubae Organizer 👋, saya tertarik dengan *Luxury Package Wedding* (Rp 6.999.999). Boleh saya tahu informasi lebih lanjut dan ketersediaan tanggal?'),
  ('livecam_1cam',     'Live Cam - 1 Camera',        'Halo Anubae Organizer 👋, saya tertarik dengan *Paket Live Cam 1 Kamera* (Rp 1.500.000). Boleh info lebih lanjut?'),
  ('livecam_2cam',     'Live Cam - 2 Camera',        'Halo Anubae Organizer 👋, saya tertarik dengan *Paket Live Cam 2 Kamera* (Rp 2.500.000). Boleh info lebih lanjut?'),
  ('livecam_3cam',     'Live Cam - 3 Camera',        'Halo Anubae Organizer 👋, saya tertarik dengan *Paket Live Cam 3 Kamera* (Rp 3.500.000). Boleh info lebih lanjut?'),
  ('videotron_dalam',  'Videotron - Dalam Makassar', 'Halo Anubae Organizer 👋, saya ingin sewa *Videotron dalam kota Makassar* (Rp 500.000/meter). Boleh info ukuran dan ketersediaan?'),
  ('videotron_luar',   'Videotron - Luar Makassar',  'Halo Anubae Organizer 👋, saya ingin sewa *Videotron luar kota Makassar* (Rp 700.000/meter). Boleh info ukuran dan ketersediaan?'),
  ('konsultasi',       'Konsultasi Gratis',          'Halo Anubae Organizer 👋, saya ingin konsultasi gratis untuk acara saya. Apakah ada waktu yang tersedia?')
ON CONFLICT (id) DO NOTHING;
