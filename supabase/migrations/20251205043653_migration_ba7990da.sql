-- Drop the problematic admin policies that cause infinite recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- Recreate simpler policies that don't cause recursion
-- Simple policy: Users can view all profiles (needed for the app to function)
-- We already have "Public profiles are viewable by everyone" which should cover this

-- Add a safer admin update policy that doesn't query profiles recursively
CREATE POLICY "Admins can manage all profiles" ON profiles
FOR ALL
TO public
USING (
  EXISTS (
    SELECT 1 FROM auth.users
    WHERE auth.users.id = auth.uid()
    AND auth.users.raw_user_meta_data->>'is_admin' = 'true'
  )
);