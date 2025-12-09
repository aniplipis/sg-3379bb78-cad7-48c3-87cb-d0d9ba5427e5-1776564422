-- Drop the problematic recursive admin policy
DROP POLICY IF EXISTS "Admins can manage all profiles" ON profiles;

-- Create a new admin policy that doesn't cause recursion
-- This checks if the user's ID matches a known admin ID directly
-- Or we can use a simpler approach: admins can be managed via direct database access
CREATE POLICY "Admins can manage all profiles" ON profiles
  FOR ALL
  USING (
    -- Allow if user is accessing their own profile OR if they have admin role in auth metadata
    (auth.uid() = id) OR 
    (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean = true
  );