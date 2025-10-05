-- Security Enhancement: Implement Phase 1 & 2 Fixes

-- 1. TIGHTEN ACCESS TO SENSITIVE CUSTOMER DATA
-- Remove staff access to contact_submissions (PII protection)

DROP POLICY IF EXISTS "Admins and staff can view contact submissions" ON public.contact_submissions;

CREATE POLICY "Only admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Remove staff access to estimate_requests (financial data protection)

DROP POLICY IF EXISTS "Admins and staff can view estimate requests" ON public.estimate_requests;

CREATE POLICY "Only admins can view estimate requests"
ON public.estimate_requests
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 2. ENABLE ADMIN PROFILE MANAGEMENT (Customer Support)
-- Allow admins to view all user profiles

CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = id OR 
  public.has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to update user profiles for support purposes

CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
USING (
  auth.uid() = id OR 
  public.has_role(auth.uid(), 'admin'::app_role)
);

-- 3. ENABLE ADMIN ROLE MANAGEMENT
-- Allow admins to assign roles to users

CREATE POLICY "Admins can insert user roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to modify user roles

CREATE POLICY "Admins can update user roles"
ON public.user_roles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to remove user roles

CREATE POLICY "Admins can delete user roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to view all user roles

CREATE POLICY "Admins can view all user roles"
ON public.user_roles
FOR SELECT
USING (
  auth.uid() = user_id OR 
  public.has_role(auth.uid(), 'admin'::app_role)
);