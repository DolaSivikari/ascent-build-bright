-- Phase 1: Core tables for construction-management CMS

-- Blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id),
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  featured BOOLEAN DEFAULT false,
  read_time INTEGER, -- in minutes
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Case studies table (detailed project write-ups)
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  client_name TEXT,
  location TEXT,
  project_type TEXT NOT NULL,
  sector TEXT, -- commercial, industrial, institutional, residential
  year INTEGER,
  duration_months INTEGER,
  budget_range TEXT,
  square_footage INTEGER,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results TEXT NOT NULL,
  featured_image_url TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  services_provided TEXT[] DEFAULT '{}',
  materials_used TEXT[] DEFAULT '{}',
  technologies_used TEXT[] DEFAULT '{}', -- Procore, Bluebeam, Autodesk, etc.
  testimonial_text TEXT,
  testimonial_author TEXT,
  testimonial_role TEXT,
  featured BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Job postings table
CREATE TABLE IF NOT EXISTS public.job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL, -- Construction, Engineering, Admin, etc.
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL, -- Full-time, Part-time, Contract, Internship
  experience_level TEXT NOT NULL, -- Entry, Mid, Senior
  description TEXT NOT NULL,
  responsibilities TEXT[] DEFAULT '{}',
  requirements TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  salary_range TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'filled')),
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  closes_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Resume submissions table
CREATE TABLE IF NOT EXISTS public.resume_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_posting_id UUID REFERENCES public.job_postings(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  resume_url TEXT NOT NULL, -- stored in Supabase Storage
  cover_letter TEXT,
  years_experience INTEGER,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'shortlisted', 'rejected', 'hired')),
  notes TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES public.profiles(id)
);

-- Industry insights/resources table
CREATE TABLE IF NOT EXISTS public.industry_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL, -- article, guide, whitepaper, video, podcast
  category TEXT NOT NULL, -- Innovation, Regulations, Best Practices, Technology
  excerpt TEXT,
  content TEXT,
  external_url TEXT, -- for videos, podcasts, external resources
  thumbnail_url TEXT,
  pdf_url TEXT, -- for downloadable guides
  author_id UUID REFERENCES public.profiles(id),
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Service categories table (replaces static service pages)
CREATE TABLE IF NOT EXISTS public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  description TEXT NOT NULL,
  icon_name TEXT, -- lucide icon name
  featured_image_url TEXT,
  overview TEXT,
  benefits JSONB DEFAULT '[]', -- [{title, description, icon}]
  features JSONB DEFAULT '[]', -- [{title, description}]
  process_steps JSONB DEFAULT '[]', -- [{title, description, duration}]
  pricing_info TEXT,
  faq JSONB DEFAULT '[]', -- [{question, answer}]
  related_case_studies UUID[] DEFAULT '{}',
  related_services UUID[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  cta_text TEXT DEFAULT 'Request Consultation',
  cta_link TEXT DEFAULT '/contact',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Public can view published content
CREATE POLICY "Public can view published blog posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can view published case studies"
  ON public.case_studies FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can view open job postings"
  ON public.job_postings FOR SELECT
  USING (status = 'open');

CREATE POLICY "Public can submit resumes"
  ON public.resume_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can view published insights"
  ON public.industry_insights FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can view active service categories"
  ON public.service_categories FOR SELECT
  USING (is_active = true);

-- Admin policies for all tables
CREATE POLICY "Admins can manage all blog posts"
  ON public.blog_posts FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage all case studies"
  ON public.case_studies FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage all job postings"
  ON public.job_postings FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all resume submissions"
  ON public.resume_submissions FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage all industry insights"
  ON public.industry_insights FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage all service categories"
  ON public.service_categories FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_case_studies_updated_at BEFORE UPDATE ON public.case_studies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at BEFORE UPDATE ON public.job_postings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_industry_insights_updated_at BEFORE UPDATE ON public.industry_insights
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_categories_updated_at BEFORE UPDATE ON public.service_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

CREATE INDEX idx_case_studies_slug ON public.case_studies(slug);
CREATE INDEX idx_case_studies_status ON public.case_studies(status);
CREATE INDEX idx_case_studies_sector ON public.case_studies(sector);

CREATE INDEX idx_job_postings_slug ON public.job_postings(slug);
CREATE INDEX idx_job_postings_status ON public.job_postings(status);

CREATE INDEX idx_industry_insights_slug ON public.industry_insights(slug);
CREATE INDEX idx_industry_insights_type ON public.industry_insights(type);

CREATE INDEX idx_service_categories_slug ON public.service_categories(slug);
CREATE INDEX idx_service_categories_display_order ON public.service_categories(display_order);