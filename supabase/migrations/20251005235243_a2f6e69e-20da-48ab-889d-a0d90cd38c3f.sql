-- Fix newsletter_subscribers RLS policy to prevent public email harvesting
-- Drop the vulnerable policy that allows public read access
DROP POLICY IF EXISTS "Only service role can read subscribers" ON public.newsletter_subscribers;

-- Create secure policy that only allows service role and admin users to read subscribers
CREATE POLICY "Only admins and service role can read subscribers" 
ON public.newsletter_subscribers 
FOR SELECT 
USING (
  auth.role() = 'service_role' OR 
  has_role(auth.uid(), 'admin'::app_role)
);