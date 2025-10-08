-- Create quote_submissions table
CREATE TABLE IF NOT EXISTS public.quote_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text,
  phone text NOT NULL,
  address text,
  package text CHECK (package IN ('starter', 'refresh', 'weekend', 'custom')),
  message text,
  photo_urls text[] DEFAULT '{}',
  source_variant text CHECK (source_variant IN ('A', 'B', 'C')),
  utm jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quote_submissions ENABLE ROW LEVEL SECURITY;

-- Public can insert (for form submissions)
CREATE POLICY "Allow public inserts on quote_submissions"
  ON public.quote_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only admins can view
CREATE POLICY "Admins can view quote_submissions"
  ON public.quote_submissions
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_quote_submissions_created_at ON public.quote_submissions(created_at DESC);
CREATE INDEX idx_quote_submissions_variant ON public.quote_submissions(source_variant);
CREATE INDEX idx_quote_submissions_package ON public.quote_submissions(package);

-- Create storage bucket for quote photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('quote-photos', 'quote-photos', false)
ON CONFLICT (id) DO NOTHING;

-- RLS Policy: Allow service role to upload quote photos
CREATE POLICY "Service role can upload quote photos"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'quote-photos');

-- RLS Policy: Allow public reading via signed URL
CREATE POLICY "Public can read quote photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'quote-photos');