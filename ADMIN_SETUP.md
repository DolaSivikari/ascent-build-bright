# Admin Access Setup Guide

This guide explains how to set up admin access for the Ascent Group Construction admin dashboard.

## Security Architecture

The application uses a secure role-based access control (RBAC) system:
- Roles are stored in a separate `user_roles` table (NOT on profiles or user metadata)
- The `has_role()` security definer function prevents privilege escalation
- Row Level Security (RLS) policies protect all sensitive data

## Creating Your First Admin Account

### Step 1: Create a User Account

1. Navigate to `/admin/login` in your application
2. There's no signup link on the login page (this is intentional for security)
3. You need to manually create the first admin user via the backend

### Step 2: Access the Backend Console

<lov-actions>
<lov-open-backend>Open Backend Console</lov-open-backend>
</lov-actions>

### Step 3: Create Admin User and Grant Role

In the backend SQL Editor, run these commands:

```sql
-- 1. First, create a user account (replace with your email/password)
-- Note: This creates the user in the auth system
-- You'll need to do this via the Auth section in Supabase, or have the user sign up first

-- 2. After the user is created, get their user_id from the auth.users table
-- Run this to see all users:
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC;

-- 3. Grant admin role to the user (replace USER_ID_HERE with actual user ID from step 2)
INSERT INTO user_roles (user_id, role) 
VALUES ('USER_ID_HERE', 'admin');
```

**Alternative: One-Step Process**

If you want to create a user and grant admin access in one step, use this SQL:

```sql
-- Create user and immediately grant admin role
-- Replace 'admin@ascentgroup.com' and 'YourSecurePassword123!' with your credentials
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Note: You'll need to create the user via Supabase Auth UI first,
  -- then run the INSERT below with their ID
  
  -- Get the most recently created user (or specify email)
  SELECT id INTO new_user_id 
  FROM auth.users 
  WHERE email = 'admin@ascentgroup.com';
  
  -- Grant admin role
  IF new_user_id IS NOT NULL THEN
    INSERT INTO user_roles (user_id, role) 
    VALUES (new_user_id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    
    RAISE NOTICE 'Admin role granted to user: %', new_user_id;
  ELSE
    RAISE EXCEPTION 'User not found. Create the user first via Supabase Auth.';
  END IF;
END $$;
```

### Step 4: Verify Access

1. Navigate to `/admin/login`
2. Log in with the credentials you created
3. You should be redirected to `/admin/dashboard`
4. You should now see contact submissions and estimate requests

## Creating Additional Admin or Staff Users

To create additional users with admin or staff access:

```sql
-- Grant admin role
INSERT INTO user_roles (user_id, role) 
VALUES ('USER_ID_HERE', 'admin');

-- OR grant staff role
INSERT INTO user_roles (user_id, role) 
VALUES ('USER_ID_HERE', 'staff');
```

## Available Roles

- **admin**: Full access to all data and dashboard features
- **staff**: Same access as admin (can view contact submissions and estimate requests)

## Security Notes

⚠️ **IMPORTANT SECURITY PRACTICES**:

1. **Never store roles in localStorage or user metadata** - This can be manipulated by attackers
2. **Always use the `has_role()` function** in RLS policies to check permissions
3. **Use strong passwords** for admin accounts (minimum 8 characters)
4. **Enable 2FA** in production (recommended future enhancement)
5. **Audit admin access regularly** - Review the `user_roles` table periodically

## Troubleshooting

### "Access Denied" Error After Login

This means the user exists but doesn't have the admin or staff role assigned:

```sql
-- Check if user has any roles
SELECT ur.role, u.email 
FROM user_roles ur
JOIN auth.users u ON ur.user_id = u.id
WHERE u.email = 'admin@ascentgroup.com';

-- If no results, grant the role
INSERT INTO user_roles (user_id, role) 
VALUES (
  (SELECT id FROM auth.users WHERE email = 'admin@ascentgroup.com'),
  'admin'
);
```

### Cannot See Submissions in Dashboard

Verify RLS policies are working:

```sql
-- This should return data if you're an admin
SELECT * FROM contact_submissions LIMIT 5;
SELECT * FROM estimate_requests LIMIT 5;
```

## Production Checklist

Before deploying to production:

- [ ] Change default admin password
- [ ] Remove or restrict development localhost origins from CORS
- [ ] Enable email verification (currently auto-confirm is enabled for testing)
- [ ] Set up email notifications for new submissions
- [ ] Configure backup admin accounts
- [ ] Document admin credentials securely (use a password manager)
- [ ] Review and test all RLS policies
- [ ] Enable audit logging for admin actions (future enhancement)
