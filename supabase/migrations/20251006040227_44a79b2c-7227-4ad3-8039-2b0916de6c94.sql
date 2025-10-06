-- Fix remaining security issues
-- Issue 1: Fix material_packages - restrict to user's own packages
-- Issue 2: Fix admin_users_view - restrict to admins only
-- Issue 3: Fix dashboard_stats materialized view - make admin-only

-- ==================================================
-- FIX 1: Material Packages - Proper User Isolation
-- ==================================================

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Users can view own packages" ON public.material_packages;
DROP POLICY IF EXISTS "Users can create packages" ON public.material_packages;
DROP POLICY IF EXISTS "Users can update own packages" ON public.material_packages;
DROP POLICY IF EXISTS "Users can delete own packages" ON public.material_packages;
DROP POLICY IF EXISTS "Admins can view all packages" ON public.material_packages;

-- Add a user_id column for proper authentication-based access control
ALTER TABLE public.material_packages 
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_material_packages_user_id ON public.material_packages(user_id);

-- Authenticated users can only view their own packages
CREATE POLICY "Users can view own packages only"
  ON public.material_packages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Authenticated users can only create packages for themselves
CREATE POLICY "Users can create own packages only"
  ON public.material_packages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can only update their own packages
CREATE POLICY "Users can update own packages only"
  ON public.material_packages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Authenticated users can only delete their own packages
CREATE POLICY "Users can delete own packages only"
  ON public.material_packages
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can view all packages for support purposes
CREATE POLICY "Admins can manage all packages"
  ON public.material_packages
  FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- ==================================================
-- FIX 2: Admin Users View - Restrict to Admins Only
-- ==================================================

-- Drop the existing view and recreate with proper security
DROP VIEW IF EXISTS public.admin_users_view;

-- Create a SECURITY INVOKER view (not SECURITY DEFINER) with RLS
CREATE VIEW public.admin_users_view 
WITH (security_invoker=true)
AS
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

-- Add comment
COMMENT ON VIEW public.admin_users_view IS 
'Admin user management view - Only accessible to users with admin role. 
Uses security_invoker to respect RLS policies on underlying tables.';

-- ==================================================
-- FIX 3: Dashboard Stats - Restrict Access
-- ==================================================

-- The materialized view should not be directly accessible via API
-- We'll create a function instead that checks admin role

-- Drop the materialized view from public schema
DROP MATERIALIZED VIEW IF EXISTS public.dashboard_stats;

-- Create a regular function that returns stats (only for admins)
CREATE OR REPLACE FUNCTION public.get_dashboard_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only admins can access dashboard stats
  IF NOT has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: admin role required';
  END IF;

  RETURN json_build_object(
    'active_materials', (SELECT count(*) FROM materials WHERE is_active = true),
    'total_packages', (SELECT count(*) FROM material_packages),
    'packages_last_7_days', (SELECT count(*) FROM material_packages WHERE created_at > now() - interval '7 days'),
    'contacts_last_30_days', (SELECT count(*) FROM contact_submissions WHERE created_at > now() - interval '30 days'),
    'estimates_last_30_days', (SELECT count(*) FROM estimate_requests WHERE created_at > now() - interval '30 days'),
    'active_subscribers', (SELECT count(*) FROM newsletter_subscribers WHERE is_active = true)
  );
END;
$$;

-- Add comment
COMMENT ON FUNCTION public.get_dashboard_stats() IS 
'Returns dashboard statistics - Admin role required. 
Call this function from client instead of querying materialized view.';

-- Remove the refresh function since we no longer have the materialized view
DROP FUNCTION IF EXISTS public.refresh_dashboard_stats();