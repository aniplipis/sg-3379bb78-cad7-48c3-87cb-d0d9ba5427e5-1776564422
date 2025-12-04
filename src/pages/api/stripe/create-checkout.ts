import { NextApiRequest, NextApiResponse } from 'next';
import { stripe, PREMIUM_MEMBERSHIP } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
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

    if (!userId) {
      console.error('❌ No userId provided in request');
      return res.status(400).json({ error: 'User ID is required' });
    }

    console.log('🔍 Starting checkout process for userId:', userId);

    // First, verify the user exists in auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.getUserById(userId);
    
    if (authError || !authData?.user) {
      console.error('❌ User not found in auth.users:', {
        userId,
        error: authError?.message || 'User does not exist'
      });
      return res.status(404).json({ 
        error: 'User not found',
        details: 'Your account could not be found. Please try logging out and logging back in.',
        userId: userId
      });
    }

    console.log('✅ User exists in auth.users:', {
      userId: authData.user.id,
      email: authData.user.email
    });

    // Now try to get the profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email, full_name, is_premium')
      .eq('id', userId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('❌ Profile lookup error:', {
        code: profileError.code,
        message: profileError.message,
        details: profileError.details
      });
    }

    let customerEmail: string;
    let customerName: string;

    if (!profile) {
      console.log('⚠️ Profile not found, creating new profile...');
      
      // Create profile using auth user data
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            email: authData.user.email || '',
            full_name: authData.user.user_metadata?.full_name || authData.user.email?.split('@')[0] || 'User',
            avatar_url: authData.user.user_metadata?.avatar_url || null,
            is_premium: false,
          },
        ])
        .select('email, full_name')
        .single();

      if (createError) {
        console.error('❌ Profile creation error:', {
          code: createError.code,
          message: createError.message,
          details: createError.details
        });
        return res.status(500).json({ 
          error: 'Failed to create user profile',
          details: 'Please contact support for assistance'
        });
      }

      console.log('✅ Successfully created profile:', {
        userId: authData.user.id,
        email: newProfile.email
      });

      customerEmail = newProfile.email;
      customerName = newProfile.full_name;
    } else {
      console.log('✅ Profile found:', {
        email: profile.email,
        name: profile.full_name,
        isPremium: profile.is_premium
      });

      customerEmail = profile.email;
      customerName = profile.full_name;
    }

    // Determine the price based on promo code
    const price = promoCode?.toLowerCase() === 'premium363' 
      ? PREMIUM_MEMBERSHIP.discountPrice 
      : PREMIUM_MEMBERSHIP.price;

    console.log('💳 Creating checkout session...', {
      email: customerEmail,
      price: price,
      promoCode: promoCode || 'none'
    });

    // Create or retrieve Stripe customer
    let customer;
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    if (customers.data.length > 0) {
      customer = customers.data[0];
      console.log('✅ Found existing Stripe customer:', customer.id);
    } else {
      customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        metadata: {
          supabase_user_id: userId,
        },
      });
      console.log('✅ Created new Stripe customer:', customer.id);
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card', 'fpx'],
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
      mode: 'subscription',
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
    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('❌ Error creating checkout session:', error);
    return res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}