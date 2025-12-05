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
    const { userId, promoCode } = req.body;

    console.log('=== CHECKOUT REQUEST START ===');
    console.log('📝 Request:', { userId: userId ? 'provided' : 'missing', promoCode: promoCode || 'none' });

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

    // Step 1: Try to get existing profile
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
    let userEmail = existingProfile?.email || `user_${userId.substring(0, 8)}@maxsaham.temporary`;
    let userName = existingProfile?.full_name || 'Premium Member';

    // Step 2: Create profile if it doesn't exist
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

    // Step 3: Get or create Stripe customer
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

    // Step 4: Determine price
    const price = promoCode?.toLowerCase() === 'premium363' 
      ? PREMIUM_MEMBERSHIP.discountPrice 
      : PREMIUM_MEMBERSHIP.price;

    console.log('💰 Price:', { original: PREMIUM_MEMBERSHIP.price, final: price, promoCode: promoCode || 'none' });

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
                description: PREMIUM_MEMBERSHIP.description,
              },
              unit_amount: price,
              recurring: {
                interval: PREMIUM_MEMBERSHIP.interval,
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/members?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/#membership`,
        metadata: {
          supabase_user_id: userId,
          promo_code: promoCode || 'none',
        },
        subscription_data: {
          metadata: {
            supabase_user_id: userId,
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