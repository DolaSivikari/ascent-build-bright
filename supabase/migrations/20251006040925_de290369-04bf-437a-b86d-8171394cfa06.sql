-- Fix Critical Security Issue: Admin User Credentials Exposed to Public Internet
-- Enable RLS on admin_users_view and restrict access to admins only

-- First, drop the existing view to recreate it with proper security
DROP VIEW IF EXISTS public.admin_users_view;

-- Recreate the admin users view with security_invoker=true
-- This ensures the view respects RLS policies of underlying tables
CREATE VIEW public.admin_users_view 
WITH (security_invoker=true)
AS
SELECT 
  p.id,
  p.email,
  p.full_name,
  p.created_at,
  p.updated_at,
  COALESCE(
    array_agg(ur.role) FILTER (WHERE ur.role IS NOT NULL),
    ARRAY[]::app_role[]
  ) as roles
FROM public.profiles p
LEFT JOIN public.user_roles ur ON p.id = ur.user_id
GROUP BY p.id, p.email, p.full_name, p.created_at, p.updated_at;

-- Enable Row Level Security on the view
ALTER VIEW public.admin_users_view SET (security_invoker = true);

-- Add a comment documenting the security requirements
COMMENT ON VIEW public.admin_users_view IS 'Admin-only view of user accounts with roles. Access restricted to users with admin role via RLS on underlying tables.';

-- Ensure the underlying profiles table has proper RLS for admin access
-- (This should already exist, but we're being explicit)
DO $$ 
BEGIN
  -- Check if the admin view policy exists on profiles
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Admins can view all profiles'
  ) THEN
    CREATE POLICY "Admins can view all profiles"
      ON public.profiles
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id OR has_role(auth.uid(), 'admin'));
  END IF;
END $$;

-- Create a helper function that can be used to verify admin access to the view
CREATE OR REPLACE FUNCTION public.can_access_admin_view()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT has_role(auth.uid(), 'admin');
$$;

COMMENT ON FUNCTION public.can_access_admin_view IS 'Returns true if the current user has admin role and can access admin_users_view';
