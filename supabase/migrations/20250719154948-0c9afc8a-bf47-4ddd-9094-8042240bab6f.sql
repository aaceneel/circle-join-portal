
-- Create the applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  age TEXT NOT NULL,
  location TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  instagram TEXT,
  occupation TEXT NOT NULL,
  description TEXT,
  income TEXT NOT NULL,
  content_topic TEXT NOT NULL,
  proud_link TEXT NOT NULL,
  follower_count TEXT NOT NULL,
  open_to_call BOOLEAN NOT NULL DEFAULT true,
  goal TEXT DEFAULT '',
  trading_experience TEXT,
  expected_earnings TEXT,
  main_challenge TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create the admin_users table
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for applications (public read for recent applicants)
CREATE POLICY "Allow public read access to applications" 
  ON public.applications 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow public insert to applications" 
  ON public.applications 
  FOR INSERT 
  WITH CHECK (true);

-- Create policies for admin_users (only admins can manage)
CREATE POLICY "Allow admins to read admin_users" 
  ON public.admin_users 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Allow admins to insert admin_users" 
  ON public.admin_users 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users 
      WHERE user_id = auth.uid()
    )
  );

-- Create a view for user admin status
CREATE VIEW public.user_admin_status AS
SELECT 
  u.id,
  u.email,
  u.created_at as user_created_at,
  CASE WHEN au.user_id IS NOT NULL THEN true ELSE false END as is_admin,
  au.created_at as admin_granted_at
FROM auth.users u
LEFT JOIN public.admin_users au ON u.id = au.user_id;

-- Create function to add admin user by email
CREATE OR REPLACE FUNCTION public.add_admin_user(user_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_user_id UUID;
BEGIN
  -- Find user by email
  SELECT id INTO target_user_id
  FROM auth.users
  WHERE email = user_email;
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', user_email;
  END IF;
  
  -- Insert into admin_users (will fail if already exists due to unique constraint)
  INSERT INTO public.admin_users (user_id)
  VALUES (target_user_id);
END;
$$;

-- Create function to toggle admin status
CREATE OR REPLACE FUNCTION public.toggle_admin_status(user_id UUID, grant_admin BOOLEAN)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF grant_admin THEN
    -- Grant admin access
    INSERT INTO public.admin_users (user_id)
    VALUES (user_id)
    ON CONFLICT (user_id) DO NOTHING;
  ELSE
    -- Remove admin access
    DELETE FROM public.admin_users
    WHERE admin_users.user_id = toggle_admin_status.user_id;
  END IF;
END;
$$;

-- Create function to get recent applicants
CREATE OR REPLACE FUNCTION public.get_recent_applicants()
RETURNS TABLE (
  full_name TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT full_name, location, created_at
  FROM public.applications
  ORDER BY created_at DESC
  LIMIT 10;
$$;
