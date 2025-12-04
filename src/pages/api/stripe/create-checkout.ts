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

    // Step 1: Get user / profile from Supabase
    console.log('🔍 Fetching user profile from database...');
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email, stripe_customer_id, full_name, is_premium')
      .eq('id', userId)
      .maybeSingle();

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

    if (!profile) {
      console.error('❌ No profile found for userId:', userId);
      return res.status(404).json({
        error: 'User profile not found',
        details: 'Please ensure you are logged in and try again. If the issue persists, try logging out and logging back in.'
      });
    }

    console.log('✅ Profile found:', {
      email: profile.email,
      hasStripeCustomer: !!profile.stripe_customer_id,
      isPremium: profile.is_premium
    });

    if (!profile.email) {
      console.error('❌ Profile has no email:', userId);
      return res.status(400).json({
        error: 'User email not found',
        details: 'Your account must have an email address. Please contact support.'
      });
    }

    // Step 2: Ensure Stripe customer exists
    console.log('💳 Checking Stripe customer...');
    let customerId = profile.stripe_customer_id;

    if (!customerId) {
      console.log('📝 Creating new Stripe customer...');
      const customer = await stripe.customers.create({
        email: profile.email,
        name: profile.full_name || undefined,
        metadata: { supabase_user_id: userId },
      });
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

    // Step 3: Create checkout session
    console.log('🎫 Creating Stripe checkout session...');
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