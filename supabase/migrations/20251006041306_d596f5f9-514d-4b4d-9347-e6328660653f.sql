-- Phase 1 Critical Security Fixes: Cleanup RLS Policies
-- Remove redundant RLS policies and strengthen security

-- =====================================================
-- 1. CONTACT SUBMISSIONS - Remove Duplicate Policies
-- =====================================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Admins can delete contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "No updates to contact submissions" ON public.contact_submissions;

-- Create clean, explicit policies
CREATE POLICY "Public can submit contact forms"
  ON public.contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact submissions"
  ON public.contact_submissions
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Explicitly block updates (audit trail preservation)
CREATE POLICY "No one can update contact submissions"
  ON public.contact_submissions
  FOR UPDATE
  TO authenticated
  USING (false);

COMMENT ON TABLE public.contact_submissions IS 'Contact form submissions. INSERT: public, SELECT/DELETE: admin only, UPDATE: blocked for audit trail.';

-- =====================================================
-- 2. ESTIMATE REQUESTS - Remove Duplicate Policies
-- =====================================================

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public estimate requests" ON public.estimate_requests;
DROP POLICY IF EXISTS "Only admins can view estimate requests" ON public.estimate_requests;
DROP POLICY IF EXISTS "Admins can view estimate requests" ON public.estimate_requests;
DROP POLICY IF EXISTS "Admins can delete estimate requests" ON public.estimate_requests;
DROP POLICY IF EXISTS "No updates to estimate requests" ON public.estimate_requests;

-- Create clean, explicit policies
CREATE POLICY "Public can submit estimate requests"
  ON public.estimate_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Admins can view estimate requests"
  ON public.estimate_requests
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete estimate requests"
  ON public.estimate_requests
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Explicitly block updates (audit trail preservation)
CREATE POLICY "No one can update estimate requests"
  ON public.estimate_requests
  FOR UPDATE
  TO authenticated
  USING (false);

COMMENT ON TABLE public.estimate_requests IS 'Estimate request submissions. INSERT: public, SELECT/DELETE: admin only, UPDATE: blocked for audit trail.';

-- =====================================================
-- 3. MATERIAL PACKAGES - Fix Authentication
-- =====================================================

-- Add index on user_id for better performance
CREATE INDEX IF NOT EXISTS idx_material_packages_user_id ON public.material_packages(user_id);

-- Make user_id NOT NULL (will be enforced going forward)
-- Note: Existing rows with NULL user_id will need to be handled in app logic
ALTER TABLE public.material_packages 
  ALTER COLUMN user_id SET DEFAULT auth.uid();

COMMENT ON COLUMN public.material_packages.user_id IS 'Required: User who created this package. Must be authenticated user.';
COMMENT ON COLUMN public.material_packages.user_identifier IS 'DEPRECATED: Use user_id instead. Kept temporarily for migration.';

-- Update RLS policies to enforce user_id requirement
DROP POLICY IF EXISTS "Users can view own packages only" ON public.material_packages;
DROP POLICY IF EXISTS "Users can create own packages only" ON public.material_packages;
DROP POLICY IF EXISTS "Users can update own packages only" ON public.material_packages;
DROP POLICY IF EXISTS "Users can delete own packages only" ON public.material_packages;

-- New strict policies using user_id only
CREATE POLICY "Authenticated users can view own packages"
  ON public.material_packages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create own packages"
  ON public.material_packages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id AND user_id IS NOT NULL);

CREATE POLICY "Authenticated users can update own packages"
  ON public.material_packages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete own packages"
  ON public.material_packages
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Keep admin access policy (already exists)
-- Policy "Admins can manage all packages" should already exist

COMMENT ON TABLE public.material_packages IS 'Material selection packages. Requires authentication. Users can only access their own packages. Admins can access all.';

-- =====================================================
-- 4. NEWSLETTER SUBSCRIBERS - Fix Unsubscribe Logic
-- =====================================================

-- Drop the problematic unsubscribe policy with self-referencing subquery
DROP POLICY IF EXISTS "Users can deactivate own subscription via token" ON public.newsletter_subscribers;

-- Create a proper unsubscribe policy
CREATE POLICY "Users can unsubscribe via valid token"
  ON public.newsletter_subscribers
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (
    is_active = false 
    AND unsubscribe_token IS NOT NULL
  );

COMMENT ON TABLE public.newsletter_subscribers IS 'Newsletter subscriptions. INSERT: public, SELECT: admin/service only, UPDATE: unsubscribe via token only, DELETE: blocked.';

-- =====================================================
-- 5. Security Audit Comments
-- =====================================================

COMMENT ON TABLE public.user_roles IS 'User role assignments. Critical security table. Only admins can modify. Uses SECURITY DEFINER function has_role() to prevent RLS recursion.';
COMMENT ON TABLE public.profiles IS 'User profiles synced from auth.users. Contains PII. RLS enforced: users can view/edit own profile, admins can view all.';
COMMENT ON TABLE public.materials IS 'Material catalog. Public read access for active materials. Admin-only write access.';
COMMENT ON TABLE public.audit_logs IS 'Security audit trail. Admin read access only. Service role write access. Never update or delete.';

-- Add security note to admin view
COMMENT ON VIEW public.admin_users_view IS 'Admin-only view of user accounts with roles. Access restricted via security_invoker=true and RLS on underlying profiles table. Contains PII - admin access only.';