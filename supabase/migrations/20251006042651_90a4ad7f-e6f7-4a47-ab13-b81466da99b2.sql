-- Phase 1: Fix Critical Admin View Exposure
-- Drop the view that has no RLS protection
DROP VIEW IF EXISTS admin_users_view CASCADE;

-- Create the security definer function to safely access admin data
CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  roles text[]
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- Only admins can access admin user data
  SELECT 
    p.id,
    p.email,
    p.full_name,
    p.created_at,
    p.updated_at,
    COALESCE(ARRAY_AGG(ur.role::text) FILTER (WHERE ur.role IS NOT NULL), ARRAY[]::text[]) as roles
  FROM profiles p
  LEFT JOIN user_roles ur ON p.id = ur.user_id
  WHERE has_role(auth.uid(), 'admin')
  GROUP BY p.id, p.email, p.full_name, p.created_at, p.updated_at;
$$;

-- Grant execute to authenticated users (function itself checks for admin role)
GRANT EXECUTE ON FUNCTION public.get_admin_users() TO authenticated;

-- Add security comment
COMMENT ON FUNCTION public.get_admin_users() IS 
  'SECURITY: This is the ONLY approved method to access admin user data. Do not create admin_users_view as a materialized view or regular view. All access must go through this security definer function.';

-- Phase 2: Clean Up Redundant RLS Policies on profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;

-- Phase 3: Add Explicit Deny Policy for Contact Submissions (PII protection)
CREATE POLICY "Public cannot view contact submissions"
  ON contact_submissions
  FOR SELECT
  TO public
  USING (false);

-- Phase 4: Clean Up Material Packages Schema
ALTER TABLE material_packages 
  ALTER COLUMN user_identifier DROP NOT NULL;

COMMENT ON COLUMN material_packages.user_identifier IS 
  'DEPRECATED: Use user_id instead. Kept for backward compatibility with existing records.';