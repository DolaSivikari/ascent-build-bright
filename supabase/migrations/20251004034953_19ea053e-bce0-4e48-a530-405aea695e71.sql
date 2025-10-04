-- Phase 1: Critical RLS Policy Hardening
-- Add explicit deny policies for sensitive tables to prevent any potential RLS bypass

-- Deny public SELECT on contact_submissions (contains PII)
CREATE POLICY "Deny public select on contact submissions"
ON public.contact_submissions
FOR SELECT
TO public
USING (false);

-- Deny public SELECT on estimate_requests (contains PII and financial data)
CREATE POLICY "Deny public select on estimate requests"
ON public.estimate_requests
FOR SELECT
TO public
USING (false);

-- Deny public SELECT on form_rate_limits (security-sensitive metadata)
CREATE POLICY "Deny public select on rate limits"
ON public.form_rate_limits
FOR SELECT
TO public
USING (false);

-- Add explicit deny for UPDATE/DELETE on contact_submissions
CREATE POLICY "Deny all updates on contact submissions"
ON public.contact_submissions
FOR UPDATE
TO public
USING (false);

CREATE POLICY "Deny all deletes on contact submissions"
ON public.contact_submissions
FOR DELETE
TO public
USING (false);

-- Add explicit deny for UPDATE/DELETE on estimate_requests
CREATE POLICY "Deny all updates on estimate requests"
ON public.estimate_requests
FOR UPDATE
TO public
USING (false);

CREATE POLICY "Deny all deletes on estimate requests"
ON public.estimate_requests
FOR DELETE
TO public
USING (false);