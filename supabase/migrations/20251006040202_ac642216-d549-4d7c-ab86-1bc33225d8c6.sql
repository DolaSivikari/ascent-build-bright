-- Fix password reset tokens security issue (corrected version)
-- The previous policy was too broad - we need to be more restrictive

-- First, drop the overly permissive policy
DROP POLICY IF EXISTS "Service role only" ON public.password_reset_tokens;

-- Create a restrictive policy that explicitly blocks all public/authenticated access
-- and only allows service_role to perform operations
CREATE POLICY "Block all public access to password reset tokens"
  ON public.password_reset_tokens
  FOR ALL
  TO public
  USING (false)
  WITH CHECK (false);

-- Create a separate policy for authenticated users - also blocked
CREATE POLICY "Block authenticated user access to password reset tokens"
  ON public.password_reset_tokens
  FOR ALL
  TO authenticated
  USING (false)
  WITH CHECK (false);

-- Only service role (used by Edge Functions) can manage reset tokens
-- This is intentionally separated by operation for better security audit trail
CREATE POLICY "Service role can insert password reset tokens"
  ON public.password_reset_tokens
  FOR INSERT
  TO service_role
  WITH CHECK (
    -- Ensure expiry is in the future
    expires_at > now()
    AND token_hash IS NOT NULL
    AND user_id IS NOT NULL
  );

CREATE POLICY "Service role can select password reset tokens"
  ON public.password_reset_tokens
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update password reset tokens"
  ON public.password_reset_tokens
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);  -- Validation happens in Edge Function logic

CREATE POLICY "Service role can delete expired tokens"
  ON public.password_reset_tokens
  FOR DELETE
  TO service_role
  USING (
    -- Only allow deletion of expired or used tokens (cleanup operation)
    expires_at < now() OR used_at IS NOT NULL
  );

-- Add a comment explaining the security model
COMMENT ON TABLE public.password_reset_tokens IS 
'Password reset tokens - SECURITY CRITICAL: Only accessible via service_role (Edge Functions). 
All tokens must be hashed (SHA-256), single-use, and expire within 1 hour. 
Never expose raw tokens or this table to client-side queries. 
Token validation and security checks are enforced in Edge Functions.';