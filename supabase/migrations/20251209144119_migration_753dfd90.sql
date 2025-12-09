-- Drop the problematic admin policy
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;

-- Create a new admin policy that checks a column in profiles table instead
-- This assumes admins will have is_admin = true in their profiles table
CREATE POLICY "Admins can manage all profiles" 
ON profiles 
FOR ALL 
TO public
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_admin = true
  )
);