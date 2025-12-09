-- Drop existing INSERT policy for profiles
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Create new INSERT policy that allows users to create their own profile
CREATE POLICY "Users can insert their own profile" ON profiles
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = id);

-- Also ensure the SELECT policy exists
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" ON profiles
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Ensure UPDATE policy exists
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
FOR UPDATE 
TO authenticated
USING (auth.uid() = id);