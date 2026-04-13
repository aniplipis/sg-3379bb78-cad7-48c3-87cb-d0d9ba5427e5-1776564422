-- Add email_bounced column to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email_bounced boolean DEFAULT false;

-- Create index for faster filtering
CREATE INDEX IF NOT EXISTS idx_profiles_email_bounced ON profiles(email_bounced);

-- Mark the bounced emails from your list
UPDATE profiles 
SET email_bounced = true 
WHERE email IN (
  'syani1410@me.com',
  'fahida443485@gmail.com',
  'faezsyahmi1976@gmail.com',
  'webroken@gmail.com',
  'imkamaltalib@gmail.com'
);

-- Show the marked emails
SELECT email, full_name, is_premium, email_bounced 
FROM profiles 
WHERE email_bounced = true
ORDER BY email;