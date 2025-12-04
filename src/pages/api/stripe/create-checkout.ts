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

    console.log('🔍 Looking up user profile for userId:', userId);

    // Get user profile from Supabase
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('❌ Profile lookup error:', {
        code: profileError.code,
        message: profileError.message,
        details: profileError.details,
        hint: profileError.hint
      });
    }

    if (!profile || profileError) {
      console.log('⚠️ Profile not found, attempting to fetch user from auth...');
      
      // Try to get user from auth.users as fallback
      const { data: authData, error: userError } = await supabase.auth.admin.getUserById(userId);
      
      if (userError) {
        console.error('❌ Auth user lookup error:', {
          userId,
          error: userError.message
        });
      }

      const authUser = authData?.user;
      
      if (!authUser || userError) {
        console.error('❌ User not found in auth.users:', { userId });
        return res.status(404).json({ 
          error: 'User not found',
          details: 'Your account could not be found. Please try logging out and logging back in.',
          userId: userId
        });
      }

      console.log('✅ Found user in auth, creating profile...', {
        userId: authUser.id,
        email: authUser.email
      });

      // Create profile
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authUser.id,
            email: authUser.email || '',
            full_name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
            avatar_url: authUser.user_metadata?.avatar_url || null,
          },
        ])
        .select('email, full_name')
        .single();

      if (createError) {
        console.error('❌ Profile creation error:', {
          code: createError.code,
          message: createError.message,
          details: createError.details,
          hint: createError.hint
        });
        return res.status(500).json({ 
          error: 'Failed to create user profile',
          details: 'Please contact support for assistance',
          technicalDetails: createError.message
        });
      }

      if (!newProfile) {
        console.error('❌ Profile creation returned no data');
        return res.status(500).json({ 
          error: 'Failed to create user profile',
          details: 'Profile creation succeeded but returned no data'
        });
      }

      console.log('✅ Successfully created profile:', {
        userId: authUser.id,
        email: newProfile.email
      });

      // Use the newly created profile for checkout
      const customerEmail = newProfile.email;
      const customerName = newProfile.full_name;

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
    }

    // Profile exists, proceed with normal flow
    console.log('✅ Profile found:', {
      email: profile.email,
      name: profile.full_name
    });

    // Determine the price based on promo code
    const price = promoCode?.toLowerCase() === 'premium363' 
      ? PREMIUM_MEMBERSHIP.discountPrice 
      : PREMIUM_MEMBERSHIP.price;

    console.log('💳 Creating checkout session...', {
      email: profile.email,
      price: price,
      promoCode: promoCode || 'none'
    });

    // Create or retrieve Stripe customer
    let customer;
    const customers = await stripe.customers.list({
      email: profile.email,
      limit: 1,
    });

    if (customers.data.length > 0) {
      customer = customers.data[0];
      console.log('✅ Found existing Stripe customer:', customer.id);
    } else {
      customer = await stripe.customers.create({
        email: profile.email,
        name: profile.full_name,
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
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}