-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-photos', 'project-photos', true);

-- RLS Policy: Authenticated users can upload project photos
CREATE POLICY "Authenticated users can upload project photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'project-photos');

-- RLS Policy: Public can view project photos
CREATE POLICY "Public can view project photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-photos');

-- RLS Policy: Admins can delete project photos
CREATE POLICY "Admins can delete project photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'project-photos' 
  AND EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Create indexes for better project query performance
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_year ON public.projects(year DESC);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);