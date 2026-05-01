-- Run this SQL in Supabase SQL Editor (https://supabase.com/dashboard/project/xnmuitedrkskbrzkhdct/sql)
-- to create the dynamic_sections table needed for the admin content management feature.

CREATE TABLE IF NOT EXISTS public.dynamic_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  layout_type TEXT NOT NULL DEFAULT 'text-only',
  image_url TEXT,
  background TEXT NOT NULL DEFAULT 'default',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.dynamic_sections ENABLE ROW LEVEL SECURITY;

-- Allow public read (for frontend to display sections)
CREATE POLICY "Anyone can view active dynamic sections" ON public.dynamic_sections
  FOR SELECT USING (true);

-- Allow authenticated users to manage sections (admin)
CREATE POLICY "Authenticated users can insert dynamic sections" ON public.dynamic_sections
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update dynamic sections" ON public.dynamic_sections
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete dynamic sections" ON public.dynamic_sections
  FOR DELETE USING (auth.role() = 'authenticated');
