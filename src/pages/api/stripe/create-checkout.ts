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
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Get user profile from Supabase
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    // Determine the price based on promo code
    const price = promoCode?.toLowerCase() === 'premium363' 
      ? PREMIUM_MEMBERSHIP.discountPrice 
      : PREMIUM_MEMBERSHIP.price;

    // Create or retrieve Stripe customer
    let customer;
    const customers = await stripe.customers.list({
      email: profile.email,
      limit: 1,
    });

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: profile.email,
        name: profile.full_name,
        metadata: {
          supabase_user_id: userId,
        },
      });
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

    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}