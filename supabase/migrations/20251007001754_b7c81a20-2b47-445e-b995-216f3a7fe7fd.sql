-- Security Fix: Prevent exposure of admin account information
-- Split the overly permissive policy into two separate policies

-- Drop the existing policy that has the security issue
DROP POLICY IF EXISTS "Admins can view all user roles" ON user_roles;
DROP POLICY IF EXISTS "Users can view their own roles" ON user_roles;

-- Create separate policies:
-- 1. Policy for regular users to view ONLY their own roles
CREATE POLICY "Users can view own roles only"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 2. Policy for admins to view all roles (admin-only access)
CREATE POLICY "Admins can view all roles"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Add comment explaining the security rationale
COMMENT ON POLICY "Users can view own roles only" ON user_roles IS 
  'SECURITY: Users can only see their own roles. This prevents attackers from identifying admin accounts by querying the user_roles table.';

COMMENT ON POLICY "Admins can view all roles" ON user_roles IS 
  'SECURITY: Admins can view all user roles for administrative purposes. This is a separate policy to ensure proper access control.';
