-- Add is_admin column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_admin BOOLEAN NOT NULL DEFAULT FALSE;

-- Create policy for admin access
CREATE POLICY "Admins can view all profiles" ON profiles 
  FOR SELECT 
  USING (auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE));

-- Allow admins to update any profile
CREATE POLICY "Admins can update all profiles" ON profiles 
  FOR UPDATE 
  USING (auth.uid() IN (SELECT id FROM profiles WHERE is_admin = TRUE));