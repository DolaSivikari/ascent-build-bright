-- =====================================================
-- CRITICAL FIX: Create Missing CMS Tables
-- Phase 1: Articles, Projects, Services, Media
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. ARTICLES TABLE (Blog CMS)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  body TEXT NOT NULL,
  featured_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS for articles
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Public can view published articles
CREATE POLICY "Public can view published articles"
ON public.articles FOR SELECT
USING (status = 'published');

-- Admins can manage all articles
CREATE POLICY "Admins can manage all articles"
ON public.articles FOR ALL
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Authors can manage their own articles
CREATE POLICY "Authors can manage own articles"
ON public.articles FOR ALL
USING (auth.uid() = author_id)
WITH CHECK (auth.uid() = author_id);

-- Indexes for performance
CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_articles_status ON public.articles(status);
CREATE INDEX idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX idx_articles_author_id ON public.articles(author_id);
CREATE INDEX idx_articles_tags ON public.articles USING GIN(tags);

-- =====================================================
-- 2. ARTICLE VERSIONS TABLE (Version Control)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.article_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  version_number INT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  excerpt TEXT,
  changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  change_summary TEXT,
  snapshot JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(article_id, version_number)
);

-- RLS for article versions
ALTER TABLE public.article_versions ENABLE ROW LEVEL SECURITY;

-- Admins can view all versions
CREATE POLICY "Admins can view all versions"
ON public.article_versions FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Authors can view versions of their articles
CREATE POLICY "Authors can view own article versions"
ON public.article_versions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.articles
    WHERE id = article_versions.article_id
    AND author_id = auth.uid()
  )
);

CREATE INDEX idx_article_versions_article_id ON public.article_versions(article_id, version_number DESC);

-- =====================================================
-- 3. PROJECTS TABLE (Portfolio CMS)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  year INT,
  client_name TEXT,
  project_type TEXT,
  square_footage INT,
  budget_range TEXT,
  duration_months INT,
  featured BOOLEAN DEFAULT FALSE,
  images JSONB DEFAULT '[]',
  before_image_url TEXT,
  after_image_url TEXT,
  gallery JSONB DEFAULT '[]',
  services_provided TEXT[] DEFAULT '{}',
  materials_used TEXT[] DEFAULT '{}',
  challenges TEXT,
  solutions TEXT,
  results TEXT,
  testimonial_text TEXT,
  testimonial_author TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS for projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public can view published projects
CREATE POLICY "Public can view published projects"
ON public.projects FOR SELECT
USING (status = 'published');

-- Admins can manage all projects
CREATE POLICY "Admins can manage all projects"
ON public.projects FOR ALL
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Indexes for performance
CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_year ON public.projects(year DESC);
CREATE INDEX idx_projects_featured ON public.projects(featured) WHERE featured = TRUE;
CREATE INDEX idx_projects_tags ON public.projects USING GIN(tags);

-- =====================================================
-- 4. SERVICES TABLE (Service Pages CMS)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  icon_name TEXT,
  featured_image_url TEXT,
  overview TEXT,
  process_steps JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  benefits JSONB DEFAULT '[]',
  pricing_info TEXT,
  faq JSONB DEFAULT '[]',
  related_projects UUID[] DEFAULT '{}',
  related_services UUID[] DEFAULT '{}',
  cta_text TEXT,
  cta_link TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS for services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Public can view active services
CREATE POLICY "Public can view active services"
ON public.services FOR SELECT
USING (is_active = TRUE);

-- Admins can manage all services
CREATE POLICY "Admins can manage all services"
ON public.services FOR ALL
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Indexes for performance
CREATE INDEX idx_services_slug ON public.services(slug);
CREATE INDEX idx_services_active ON public.services(is_active);
CREATE INDEX idx_services_display_order ON public.services(display_order);

-- =====================================================
-- 5. MEDIA TABLE (Media Library)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename TEXT NOT NULL,
  original_filename TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  width INT,
  height INT,
  alt_text TEXT,
  caption TEXT,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS for media
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Public can view all media (used in published content)
CREATE POLICY "Public can view all media"
ON public.media FOR SELECT
USING (TRUE);

-- Admins can manage all media
CREATE POLICY "Admins can manage all media"
ON public.media FOR ALL
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Indexes for performance
CREATE INDEX idx_media_filename ON public.media(filename);
CREATE INDEX idx_media_uploaded_by ON public.media(uploaded_by);
CREATE INDEX idx_media_created_at ON public.media(created_at DESC);

-- =====================================================
-- 6. TRIGGERS FOR UPDATED_AT
-- =====================================================
-- Reuse existing update_updated_at() function

CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_media_updated_at
BEFORE UPDATE ON public.media
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

-- =====================================================
-- 7. COMMENTS (for future enhancement)
-- =====================================================
COMMENT ON TABLE public.articles IS 'Blog articles and content';
COMMENT ON TABLE public.article_versions IS 'Version history for articles';
COMMENT ON TABLE public.projects IS 'Portfolio projects and case studies';
COMMENT ON TABLE public.services IS 'Service pages and offerings';
COMMENT ON TABLE public.media IS 'Media library for images and files';

-- =====================================================
-- END OF MIGRATION
-- =====================================================