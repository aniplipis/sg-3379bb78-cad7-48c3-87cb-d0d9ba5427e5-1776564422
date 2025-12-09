-- Add phone and tradingview_username columns to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS tradingview_username TEXT;

-- Add comments for clarity
COMMENT ON COLUMN profiles.phone IS 'User phone number for contact';
COMMENT ON COLUMN profiles.tradingview_username IS 'User TradingView platform username';