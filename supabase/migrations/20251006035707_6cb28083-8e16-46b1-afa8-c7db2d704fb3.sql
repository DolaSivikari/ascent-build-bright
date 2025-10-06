-- Create first admin user
-- Replace 'your-email@example.com' and 'your-secure-password' with your actual credentials

-- This is a helper function to create the first admin
-- After running this, you can delete it or keep it for creating more admins

CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email text,
  admin_password text,
  admin_name text DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_user_id uuid;
  result json;
BEGIN
  -- This function should only be called by superusers/service role
  -- In production, remove this function after creating your admin
  
  -- Note: This creates a user in auth.users which requires service role
  -- For now, we'll just prepare the profile and role
  -- You'll need to sign up manually first, then this will add the role
  
  RAISE NOTICE 'Please sign up manually at /admin/login first';
  RAISE NOTICE 'Then run: SELECT grant_admin_role(''your-user-id-here'');';
  
  RETURN json_build_object(
    'message', 'Please sign up manually first, then grant admin role'
  );
END;
$$;

-- Helper function to grant admin role to an existing user
CREATE OR REPLACE FUNCTION grant_admin_role(user_email text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  target_user_id uuid;
  result json;
BEGIN
  -- Find user by email from profiles
  SELECT id INTO target_user_id
  FROM public.profiles
  WHERE email = user_email;
  
  IF target_user_id IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'message', 'User not found with email: ' || user_email
    );
  END IF;
  
  -- Check if already has admin role
  IF EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = target_user_id AND role = 'admin'
  ) THEN
    RETURN json_build_object(
      'success', false,
      'message', 'User already has admin role'
    );
  END IF;
  
  -- Grant admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (target_user_id, 'admin');
  
  RETURN json_build_object(
    'success', true,
    'message', 'Admin role granted successfully',
    'user_id', target_user_id,
    'email', user_email
  );
END;
$$;