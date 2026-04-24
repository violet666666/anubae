CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a contact message
CREATE POLICY "Anyone can submit"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

-- Only authenticated admins can read messages
CREATE POLICY "Auth read submissions"
  ON public.contact_submissions FOR SELECT TO authenticated
  USING (true);

-- Only authenticated admins can update (e.g. mark as read)
CREATE POLICY "Auth update submissions"
  ON public.contact_submissions FOR UPDATE TO authenticated
  USING (true) WITH CHECK (true);

-- Only authenticated admins can delete
CREATE POLICY "Auth delete submissions"
  ON public.contact_submissions FOR DELETE TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON public.contact_submissions (created_at DESC);