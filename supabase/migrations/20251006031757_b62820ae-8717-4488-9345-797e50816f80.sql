-- Grant admin role to hebun.isik.ca@gmail.com
INSERT INTO user_roles (user_id, role) 
VALUES (
  (SELECT id FROM auth.users WHERE email = 'hebun.isik.ca@gmail.com'),
  'admin'
)
ON CONFLICT (user_id, role) DO NOTHING;