-- Create discount_codes table
CREATE TABLE IF NOT EXISTS discount_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed', 'override')),
  discount_value NUMERIC NOT NULL,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active discount codes (for validation)
CREATE POLICY "Anyone can view active discount codes" 
  ON discount_codes 
  FOR SELECT 
  USING (is_active = true AND (valid_until IS NULL OR valid_until > NOW()));

-- Only admins can manage discount codes
CREATE POLICY "Admins can manage discount codes" 
  ON discount_codes 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

-- Insert the finalboss2025 discount code
INSERT INTO discount_codes (code, discount_type, discount_value, max_uses, description)
VALUES ('finalboss2025', 'override', 1, 1000, 'Special discount - RM1 for premium membership');