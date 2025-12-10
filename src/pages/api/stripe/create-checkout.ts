import { NextApiRequest, NextApiResponse } from 'next';
import { stripe, PREMIUM_MEMBERSHIP } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

// Validate environment variables at module load time
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set');
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
}

// Create Supabase admin client with service role key (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, discountCode } = req.body;

    console.log('=== CHECKOUT REQUEST START ===');
    console.log('📝 Request:', { userId: userId ? 'provided' : 'missing', discountCode: discountCode || 'none' });

    // Validate userId
    if (!userId) {
      console.error('❌ No userId provided');
      return res.status(400).json({ 
        error: 'User ID is required',
        details: 'Please ensure you are logged in before upgrading to Premium.'
      });
    }

    // Validate userId format (UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userId)) {
      console.error('❌ Invalid userId format:', userId);
      return res.status(400).json({ 
        error: 'Invalid user ID format',
        details: 'Your session may be corrupted. Please log out and log back in.'
      });
    }

    console.log('✅ Valid userId format');

    // Step 1: Validate discount code if provided
    let finalPrice = PREMIUM_MEMBERSHIP.price;
    let discountInfo = null;

    if (discountCode && discountCode.trim()) {
      console.log('🎫 Validating discount code:', discountCode);
      
      const { data: discount, error: discountError } = await supabaseAdmin
        .from('discount_codes')
        .select('*')
        .eq('code', discountCode.trim().toLowerCase())
        .eq('is_active', true)
        .maybeSingle();

      if (discountError) {
        console.error('❌ Discount validation error:', discountError);
      } else if (!discount) {
        console.log('⚠️ Invalid discount code');
        return res.status(400).json({
          error: 'Invalid discount code',
          details: 'The discount code you entered is not valid.'
        });
      } else {
        // Check if code has expired
        if (discount.valid_until && new Date(discount.valid_until) < new Date()) {
          console.log('⚠️ Discount code expired');
          return res.status(400).json({
            error: 'Discount code expired',
            details: 'This discount code has expired.'
          });
        }

        // Check if code has reached max uses
        if (discount.max_uses !== null && discount.used_count >= discount.max_uses) {
          console.log('⚠️ Discount code usage limit reached');
          return res.status(400).json({
            error: 'Discount code limit reached',
            details: 'This discount code has reached its usage limit.'
          });
        }

        // Calculate discounted price
        switch (discount.discount_type) {
          case 'percentage':
            finalPrice = Math.round(PREMIUM_MEMBERSHIP.price * (1 - discount.discount_value / 100));
            break;
          case 'fixed':
            finalPrice = Math.max(0, PREMIUM_MEMBERSHIP.price - discount.discount_value);
            break;
          case 'override':
            finalPrice = discount.discount_value;
            break;
        }

        discountInfo = discount;
        console.log('✅ Discount applied:', { 
          code: discount.code, 
          type: discount.discount_type,
          originalPrice: PREMIUM_MEMBERSHIP.price, 
          finalPrice 
        });

        // Increment usage count
        const { error: incrementError } = await supabaseAdmin
          .from('discount_codes')
          .update({ used_count: discount.used_count + 1 })
          .eq('id', discount.id);

        if (incrementError) {
          console.error('⚠️ Failed to increment discount usage:', incrementError);
        }
      }
    }

    // Step 2: Try to get existing profile
    console.log('🔍 Checking if profile exists...');
    const { data: existingProfile, error: profileFetchError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, full_name, stripe_customer_id, is_premium')
      .eq('id', userId)
      .maybeSingle();

    // Log the EXACT error from Supabase
    if (profileFetchError) {
      console.error('❌ Profile query error:', {
        message: profileFetchError.message,
        details: profileFetchError.details,
        hint: profileFetchError.hint,
        code: profileFetchError.code
      });
      return res.status(500).json({
        error: 'Database error',
        details: `Failed to fetch profile: ${profileFetchError.message}`,
        supabaseError: profileFetchError
      });
    }

    let profile = existingProfile;
    let userEmail = existingProfile?.email || `anonymous_${Date.now()}@maxsaham.temporary`;
    let userName = existingProfile?.full_name || 'Anonymous User';

    // Step 3: Create profile if it doesn't exist
    if (!profile) {
      console.log('⚠️ Profile not found, creating new profile...');
      
      const newProfileData = {
        id: userId,
        email: userEmail,
        full_name: userName,
      };

      console.log('📝 Profile data to insert:', newProfileData);

      const { data: newProfile, error: createError } = await supabaseAdmin
        .from('profiles')
        .insert([newProfileData])
        .select('id, email, full_name, stripe_customer_id, is_premium')
        .single();

      // Log the EXACT error from Supabase
      if (createError) {
        console.error('❌ Profile creation failed:', {
          message: createError.message,
          details: createError.details,
          hint: createError.hint,
          code: createError.code
        });
        return res.status(500).json({
          error: 'Failed to create user profile',
          details: `Database error: ${createError.message}. Code: ${createError.code}`,
          supabaseError: createError
        });
      }

      if (!newProfile) {
        console.error('❌ Profile creation returned null');
        return res.status(500).json({
          error: 'Profile creation failed',
          details: 'Database returned no data after insert.'
        });
      }

      profile = newProfile;
      userEmail = newProfile.email || userEmail;
      userName = newProfile.full_name || userName;
      console.log('✅ Profile created successfully');
    } else {
      console.log('✅ Profile found:', { id: profile.id, email: profile.email, is_premium: profile.is_premium });
    }

    // Step 4: Get or create Stripe customer
    console.log('💳 Managing Stripe customer...');
    let customerId = profile.stripe_customer_id;

    if (!customerId) {
      console.log('📝 Creating Stripe customer...');
      
      try {
        const customer = await stripe.customers.create({
          email: userEmail,
          name: userName,
          metadata: { supabase_user_id: userId },
        });

        customerId = customer.id;
        console.log('✅ Stripe customer created:', customerId);

        // Save customer ID to profile
        const { error: updateError } = await supabaseAdmin
          .from('profiles')
          .update({ stripe_customer_id: customerId })
          .eq('id', userId);

        if (updateError) {
          console.error('⚠️ Failed to save customer ID:', updateError);
        } else {
          console.log('✅ Customer ID saved to profile');
        }
      } catch (stripeError: unknown) {
        console.error('❌ Stripe customer creation failed:', stripeError);
        return res.status(500).json({
          error: 'Payment system error',
          details: stripeError instanceof Error ? stripeError.message : 'Failed to create Stripe customer'
        });
      }
    } else {
      console.log('✅ Using existing Stripe customer:', customerId);
    }

    console.log('💰 Final price:', { original: PREMIUM_MEMBERSHIP.price, final: finalPrice, discount: discountCode || 'none' });

    // Step 5: Create checkout session
    console.log('🎫 Creating checkout session...');
    
    try {
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        customer: customerId,
        line_items: [
          {
            price_data: {
              currency: PREMIUM_MEMBERSHIP.currency,
              product_data: {
                name: PREMIUM_MEMBERSHIP.name,
                description: discountInfo 
                  ? `${PREMIUM_MEMBERSHIP.description} (Discount: ${discountInfo.code})`
                  : PREMIUM_MEMBERSHIP.description,
              },
              unit_amount: finalPrice,
              recurring: {
                interval: PREMIUM_MEMBERSHIP.interval,
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://maxsaham.com'}/members?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://maxsaham.com'}/#membership`,
        metadata: {
          supabase_user_id: userId,
          discount_code: discountCode || 'none',
          original_price: PREMIUM_MEMBERSHIP.price.toString(),
          final_price: finalPrice.toString(),
        },
        subscription_data: {
          metadata: {
            supabase_user_id: userId,
            discount_code: discountCode || 'none',
          },
        },
      });

      console.log('✅ Checkout session created:', session.id);
      console.log('=== CHECKOUT SUCCESS ===');

      return res.status(200).json({ url: session.url });

    } catch (stripeError: unknown) {
      console.error('❌ Stripe checkout session creation failed:', stripeError);
      return res.status(500).json({
        error: 'Payment system error',
        details: stripeError instanceof Error ? stripeError.message : 'Failed to create checkout session'
      });
    }

  } catch (error: unknown) {
    console.error('=== CHECKOUT FAILED ===');
    console.error('❌ Unexpected error:', error);
    
    return res.status(500).json({
      error: 'Checkout failed',
      details: error instanceof Error ? error.message : 'An unexpected error occurred',
      fullError: error
    });
  }
}