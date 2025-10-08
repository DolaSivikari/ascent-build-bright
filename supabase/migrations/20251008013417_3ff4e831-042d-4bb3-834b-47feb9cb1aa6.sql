-- Add explicit restrictive policy to block public access to profiles table
-- This prevents unauthenticated users from enumerating customer emails

CREATE POLICY "Block public access to profiles" 
ON public.profiles 
FOR SELECT 
TO anon 
USING (false);