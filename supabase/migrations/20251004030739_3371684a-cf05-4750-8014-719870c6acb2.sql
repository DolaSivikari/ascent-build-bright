-- Create table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for estimate requests
CREATE TABLE public.estimate_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  -- Project basics
  service TEXT NOT NULL,
  sqft INTEGER NOT NULL,
  stories TEXT NOT NULL,
  -- Scope details
  prep_complexity TEXT NOT NULL,
  finish_quality TEXT NOT NULL,
  region TEXT NOT NULL,
  -- Add-ons
  scaffolding TEXT,
  color_consultation BOOLEAN DEFAULT false,
  rush_scheduling BOOLEAN DEFAULT false,
  warranty_extension BOOLEAN DEFAULT false,
  site_cleanup BOOLEAN DEFAULT false,
  -- Estimate
  estimate_min DECIMAL(10, 2),
  estimate_max DECIMAL(10, 2),
  -- Contact info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  preferred_contact TEXT,
  notes TEXT,
  -- Meta
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for rate limiting
CREATE TABLE public.form_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  form_type TEXT NOT NULL,
  submission_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_submission TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(ip_address, form_type)
);

-- Enable Row Level Security (public forms - no user auth required)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estimate_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_rate_limits ENABLE ROW LEVEL SECURITY;

-- Allow public inserts only (read access restricted to admin/backend)
CREATE POLICY "Allow public contact submissions"
ON public.contact_submissions
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow public estimate requests"
ON public.estimate_requests
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow public rate limit checks"
ON public.form_rate_limits
FOR ALL
TO anon
USING (true)
WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX idx_estimate_requests_created_at ON public.estimate_requests(created_at DESC);
CREATE INDEX idx_form_rate_limits_lookup ON public.form_rate_limits(ip_address, form_type, window_start);