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

// Log environment variable presence (not values)
console.log('✅ Environment check:');
console.log('SUPABASE_URL?', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SERVICE_ROLE?', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
console.log('STRIPE_SECRET?', !!process.env.STRIPE_SECRET_KEY);

// Create Supabase server client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for server-side operations
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
    console.log('📝 Request body:', { userId: userId ? 'provided' : 'missing', promoCode: promoCode || 'none' });

    // Validate userId
    if (!userId) {
      console.error('❌ No userId provided in request');
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Validate userId format (should be a UUID)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(userId)) {
      console.error('❌ Invalid userId format:', userId);
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    console.log('✅ Valid userId format:', userId);

    // Step 1: Try to get the user from auth.users first to verify they exist
    console.log('🔍 Verifying user exists in auth system...');
    let authData;
    let authError;
    
    try {
      const result = await supabase.auth.admin.getUserById(userId);
      authData = result.data;
      authError = result.error;
    } catch (error) {
      console.error('❌ Exception calling auth.admin.getUserById:', error);
      return res.status(500).json({
        error: 'Failed to verify user authentication',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    if (authError || !authData?.user) {
      console.error('❌ User not found in auth system:', {
        error: authError,
        userId: userId
      });
      return res.status(404).json({
        error: 'User not found in authentication system',
        details: 'Please ensure you are logged in. Try logging out and logging back in, then try again.'
      });
    }

    console.log('✅ User exists in auth system:', {
      email: authData.user.email,
      created_at: authData.user.created_at
    });

    // Step 2: Get or create profile from Supabase
    console.log('🔍 Fetching user profile from database...');
    let profile;
    let profileError;
    
    try {
      const result = await supabase
        .from('profiles')
        .select('email, stripe_customer_id, full_name, is_premium')
        .eq('id', userId)
        .maybeSingle();
      
      profile = result.data;
      profileError = result.error;
    } catch (error) {
      console.error('❌ Exception fetching profile:', error);
      return res.status(500).json({
        error: 'Failed to fetch user profile',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Log the actual Supabase error for debugging
    if (profileError) {
      console.error('❌ Supabase profile error:', {
        code: profileError.code,
        message: profileError.message,
        details: profileError.details,
        hint: profileError.hint
      });
      return res.status(500).json({
        error: 'Database query failed',
        details: profileError.message
      });
    }

    // Create profile if it doesn't exist
    let profileToUse = profile;
    
    if (!profile) {
      console.log('⚠️  No profile found, creating one...');
      
      const profileData = {
        id: userId,
        email: authData.user.email || '',
        full_name: authData.user.user_metadata?.full_name || authData.user.email?.split('@')[0] || 'User',
        avatar_url: authData.user.user_metadata?.avatar_url || null,
      };

      console.log('📝 Profile data to insert:', {
        ...profileData,
        avatar_url: profileData.avatar_url ? 'provided' : 'null'
      });

      let newProfile;
      let createError;
      
      try {
        const result = await supabase
          .from('profiles')
          .insert([profileData])
          .select('email, stripe_customer_id, full_name, is_premium')
          .single();
        
        newProfile = result.data;
        createError = result.error;
      } catch (error) {
        console.error('❌ Exception creating profile:', error);
        return res.status(500).json({
          error: 'Failed to create user profile',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }

      if (createError) {
        console.error('❌ Failed to create profile:', {
          code: createError.code,
          message: createError.message,
          details: createError.details,
          hint: createError.hint
        });
        return res.status(500).json({
          error: 'Failed to create user profile',
          details: createError.message
        });
      }

      console.log('✅ Profile created successfully');
      profileToUse = newProfile;
    }

    if (!profileToUse) {
      console.error('❌ Profile is null after fetch/create');
      return res.status(500).json({
        error: 'Profile data is missing',
        details: 'Unable to retrieve or create your profile. Please try again.'
      });
    }

    console.log('✅ Profile data:', {
      email: profileToUse.email,
      hasStripeCustomer: !!profileToUse.stripe_customer_id,
      isPremium: profileToUse.is_premium
    });

    if (!profileToUse.email) {
      console.error('❌ Profile has no email:', userId);
      return res.status(400).json({
        error: 'User email not found',
        details: 'Your account must have an email address. Please contact support.'
      });
    }

    // Step 3: Ensure Stripe customer exists
    console.log('💳 Checking Stripe customer...');
    let customerId = profileToUse.stripe_customer_id;

    if (!customerId) {
      console.log('📝 Creating new Stripe customer...');
      
      let customer;
      try {
        customer = await stripe.customers.create({
          email: profileToUse.email,
          name: profileToUse.full_name || undefined,
          metadata: { supabase_user_id: userId },
        });
      } catch (error) {
        console.error('❌ Failed to create Stripe customer:', error);
        return res.status(500).json({
          error: 'Failed to create Stripe customer',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }

      customerId = customer.id;
      console.log('✅ Created Stripe customer:', customerId);

      // Update profile with Stripe customer ID
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ stripe_customer_id: customerId })
        .eq('id', userId);

      if (updateError) {
        console.error('⚠️  Failed to save Stripe customer ID:', updateError);
        // Continue anyway - we have the customer ID in memory
      } else {
        console.log('✅ Saved Stripe customer ID to profile');
      }
    } else {
      console.log('✅ Using existing Stripe customer:', customerId);
    }

    // Determine the price based on promo code
    const price = promoCode?.toLowerCase() === 'premium363' 
      ? PREMIUM_MEMBERSHIP.discountPrice 
      : PREMIUM_MEMBERSHIP.price;

    console.log('💰 Price calculation:', {
      originalPrice: PREMIUM_MEMBERSHIP.price,
      promoCode: promoCode || 'none',
      finalPrice: price,
      discount: PREMIUM_MEMBERSHIP.price - price
    });

    // Step 4: Create checkout session
    console.log('🎫 Creating Stripe checkout session...');
    
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        customer: customerId,
        line_items: [
          {
            price_data: {
              currency: PREMIUM_MEMBERSHIP.currency,
              product_data: {
                name: PREMIUM_MEMBERSHIP.name,
                description: PREMIUM_MEMBERSHIP.description,
                images: [`${process.env.NEXT_PUBLIC_SITE_URL}/LOGO-square-for-rounded-crop.jpg`],
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
          original_price: PREMIUM_MEMBERSHIP.price.toString(),
          final_price: price.toString(),
        },
        subscription_data: {
          metadata: {
            supabase_user_id: userId,
          },
        },
      });
    } catch (error) {
      console.error('❌ Failed to create checkout session:', error);
      return res.status(500).json({
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    console.log('✅ Checkout session created:', session.id);
    console.log('=== CHECKOUT REQUEST SUCCESS ===');

    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error('=== CHECKOUT REQUEST FAILED ===');
    console.error('❌ Fatal error:', error);
    
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    return res.status(500).json({
      error: 'Internal server error creating checkout session',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}