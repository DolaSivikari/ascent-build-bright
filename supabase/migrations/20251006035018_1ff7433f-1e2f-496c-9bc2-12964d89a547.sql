-- =====================================================
-- PHASE 1: Material Management & User Management
-- =====================================================

-- Create materials table
CREATE TABLE public.materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  brand text NOT NULL,
  category text NOT NULL CHECK (category IN ('paint', 'eifs', 'cladding', 'sealant', 'coating', 'primer', 'scaffolding')),
  suitable_substrates text[] NOT NULL DEFAULT '{}',
  cost_index int NOT NULL CHECK (cost_index BETWEEN 1 AND 5),
  durability_years int NOT NULL,
  maintenance_level text NOT NULL CHECK (maintenance_level IN ('low', 'medium', 'high')),
  finish_options text[] DEFAULT '{}',
  r_value numeric DEFAULT 0,
  uv_resistance text CHECK (uv_resistance IN ('low', 'medium', 'high')),
  moisture_resistance text CHECK (moisture_resistance IN ('low', 'medium', 'high')),
  salt_tolerance text CHECK (salt_tolerance IN ('low', 'medium', 'high')),
  voc_level text CHECK (voc_level IN ('low', 'standard', 'high')),
  recycled_content_pct int DEFAULT 0 CHECK (recycled_content_pct BETWEEN 0 AND 100),
  warranty_years int DEFAULT 0,
  datasheet_url text,
  images text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on materials
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

-- Public can view active materials
CREATE POLICY "Anyone can view active materials"
  ON public.materials FOR SELECT
  USING (is_active = true);

-- Admins can manage all materials
CREATE POLICY "Admins can manage materials"
  ON public.materials FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Create material_packages table for saved user selections
CREATE TABLE public.material_packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier text NOT NULL,
  project_type text NOT NULL CHECK (project_type IN ('residential', 'commercial', 'renovation', 'new-build')),
  substrate text NOT NULL,
  climate_tags text[] DEFAULT '{}',
  selected_materials uuid[] DEFAULT '{}',
  user_weights jsonb,
  package_name text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on material_packages
ALTER TABLE public.material_packages ENABLE ROW LEVEL SECURITY;

-- Users can view their own packages (by identifier)
CREATE POLICY "Users can view own packages"
  ON public.material_packages FOR SELECT
  USING (true);

-- Users can create packages
CREATE POLICY "Users can create packages"
  ON public.material_packages FOR INSERT
  WITH CHECK (true);

-- Users can update own packages
CREATE POLICY "Users can update own packages"
  ON public.material_packages FOR UPDATE
  USING (true);

-- Users can delete own packages
CREATE POLICY "Users can delete own packages"
  ON public.material_packages FOR DELETE
  USING (true);

-- Admins can view all packages
CREATE POLICY "Admins can view all packages"
  ON public.material_packages FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Create admin users view for easier management
CREATE VIEW public.admin_users_view AS
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.created_at,
  p.updated_at,
  array_agg(DISTINCT ur.role) FILTER (WHERE ur.role IS NOT NULL) as roles
FROM public.profiles p
LEFT JOIN public.user_roles ur ON ur.user_id = p.id
GROUP BY p.id, p.email, p.full_name, p.created_at, p.updated_at;

-- Create audit_logs table
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_logs_user ON public.audit_logs(user_id);
CREATE INDEX idx_audit_logs_resource ON public.audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_created ON public.audit_logs(created_at DESC);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Service role can insert audit logs
CREATE POLICY "Service role can insert audit logs"
  ON public.audit_logs FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Create password_reset_tokens table
CREATE TABLE public.password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  token_hash text NOT NULL UNIQUE,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_reset_tokens_hash ON public.password_reset_tokens(token_hash);
CREATE INDEX idx_reset_tokens_expires ON public.password_reset_tokens(expires_at);

-- Enable RLS on password_reset_tokens
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Only service role can manage reset tokens
CREATE POLICY "Service role only"
  ON public.password_reset_tokens FOR ALL
  TO service_role
  USING (true);

-- Add unsubscribe token to newsletter_subscribers
ALTER TABLE public.newsletter_subscribers 
ADD COLUMN IF NOT EXISTS unsubscribe_token uuid DEFAULT gen_random_uuid() UNIQUE;

CREATE INDEX IF NOT EXISTS idx_newsletter_active ON public.newsletter_subscribers(is_active, subscribed_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON public.newsletter_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_token ON public.newsletter_subscribers(unsubscribe_token);

-- Create updated_at trigger for materials
CREATE TRIGGER update_materials_updated_at
  BEFORE UPDATE ON public.materials
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- Create dashboard stats materialized view
CREATE MATERIALIZED VIEW public.dashboard_stats AS
SELECT
  (SELECT count(*) FROM public.materials WHERE is_active = true) as active_materials,
  (SELECT count(*) FROM public.material_packages) as total_packages,
  (SELECT count(*) FROM public.material_packages WHERE created_at > now() - interval '7 days') as packages_last_7_days,
  (SELECT count(*) FROM public.contact_submissions WHERE created_at > now() - interval '30 days') as contacts_last_30_days,
  (SELECT count(*) FROM public.estimate_requests WHERE created_at > now() - interval '30 days') as estimates_last_30_days,
  (SELECT count(*) FROM public.newsletter_subscribers WHERE is_active = true) as active_subscribers;

-- Function to refresh dashboard stats
CREATE OR REPLACE FUNCTION public.refresh_dashboard_stats()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW public.dashboard_stats;
END;
$$;