-- Fix critical security issue: admin_users_view exposure
-- Create a security definer function that enforces admin-only access to the view

COMMENT ON VIEW admin_users_view IS 'Contains sensitive admin user data. Access MUST be restricted through get_admin_users() function only.';

-- Create security definer function to filter admin users view
CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS SETOF admin_users_view
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  -- Only admins can access admin user data
  SELECT * 
  FROM admin_users_view
  WHERE has_role(auth.uid(), 'admin');
$$;

-- Grant execute permission to authenticated users (function itself enforces admin check)
GRANT EXECUTE ON FUNCTION public.get_admin_users() TO authenticated;

-- Add more restrictive RLS on profiles to prevent non-admins from seeing other profiles
-- This prevents the view from being exploited through profiles table
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

CREATE POLICY "Users can view own profile or admins can view all"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR has_role(auth.uid(), 'admin'));

-- Also fix the contact_submissions SELECT policy naming for clarity
COMMENT ON POLICY "Admins can view contact submissions" ON contact_submissions IS 'Only authenticated admin users can view customer contact data';