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

    console.log('🔍 Starting checkout process for userId:', userId);

    // Step 1: Verify Supabase connection
    try {
      const { error: connectionError } = await supabase
        .from('profiles')
        .select('count')
        .limit(1);
      
      if (connectionError) {
        console.error('❌ Supabase connection error:', connectionError);
        return res.status(500).json({ 
          error: 'Database connection failed',
          details: 'Unable to connect to the database. Please try again later.'
        });
      }
      console.log('✅ Supabase connection verified');
    } catch (connError) {
      console.error('❌ Supabase connection test failed:', connError);
      return res.status(500).json({ 
        error: 'Database connection failed',
        details: 'Unable to connect to the database. Please try again later.'
      });
    }

    // Step 2: Try to get user from profiles first (faster and more reliable)
    let userEmail: string | null = null;
    let userName: string | null = null;
    let userAvatar: string | null = null;

    const { data: existingProfile, error: profileFetchError } = await supabase
      .from('profiles')
      .select('email, full_name, avatar_url, is_premium')
      .eq('id', userId)
      .maybeSingle();

    if (profileFetchError) {
      console.error('❌ Error fetching profile:', {
        code: profileFetchError.code,
        message: profileFetchError.message,
        details: profileFetchError.details
      });
      // Continue to try auth.users lookup
    }

    if (existingProfile) {
      console.log('✅ Profile found in profiles table:', {
        email: existingProfile.email,
        name: existingProfile.full_name,
        isPremium: existingProfile.is_premium
      });
      
      userEmail = existingProfile.email;
      userName = existingProfile.full_name;
      userAvatar = existingProfile.avatar_url;
    } else {
      console.log('⚠️ Profile not found in profiles table, checking auth.users...');
      
      // Step 3: If no profile, try auth.users
      try {
        const { data: authData, error: authError } = await supabase.auth.admin.getUserById(userId);
        
        if (authError) {
          console.error('❌ Auth.users lookup error:', {
            code: authError.code,
            message: authError.message,
            status: authError.status
          });
        }
        
        if (!authData?.user) {
          console.error('❌ User not found in auth.users:', { userId });
          return res.status(404).json({ 
            error: 'User not found',
            details: 'Your account could not be found. Please try logging out and logging back in, then try again.'
          });
        }

        console.log('✅ User found in auth.users:', {
          userId: authData.user.id,
          email: authData.user.email,
          created_at: authData.user.created_at
        });

        userEmail = authData.user.email || null;
        userName = authData.user.user_metadata?.full_name || 
                   authData.user.email?.split('@')[0] || 
                   'User';
        userAvatar = authData.user.user_metadata?.avatar_url || null;

        // Try to create profile for this auth user
        if (userEmail) {
          console.log('⚠️ Creating profile for auth user...');
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              {
                id: userId,
                email: userEmail,
                full_name: userName,
                avatar_url: userAvatar,
                is_premium: false,
              },
            ])
            .select()
            .single();

          if (createError) {
            console.error('❌ Failed to create profile:', {
              code: createError.code,
              message: createError.message,
              details: createError.details
            });
            // Continue anyway with auth data
          } else {
            console.log('✅ Profile created successfully');
          }
        }
      } catch (authErr) {
        console.error('❌ Unexpected error during auth.users lookup:', authErr);
        return res.status(500).json({ 
          error: 'User verification failed',
          details: 'Unable to verify your account. Please try again later.'
        });
      }
    }

    // Validate we have user email
    if (!userEmail) {
      console.error('❌ No email found for user:', { userId });
      return res.status(400).json({ 
        error: 'User email not found',
        details: 'Your account must have an email address. Please contact support.'
      });
    }

    console.log('📧 Using user data:', {
      email: userEmail,
      name: userName
    });

    // Determine the price based on promo code
    const price = promoCode?.toLowerCase() === 'premium363' 
      ? PREMIUM_MEMBERSHIP.discountPrice 
      : PREMIUM_MEMBERSHIP.price;

    console.log('💳 Creating Stripe checkout session...', {
      email: userEmail,
      name: userName,
      price: price,
      promoCode: promoCode || 'none'
    });

    // Create or retrieve Stripe customer
    let customer;
    try {
      const customers = await stripe.customers.list({
        email: userEmail,
        limit: 1,
      });

      if (customers.data.length > 0) {
        customer = customers.data[0];
        console.log('✅ Found existing Stripe customer:', customer.id);
      } else {
        customer = await stripe.customers.create({
          email: userEmail,
          name: userName || 'User',
          metadata: {
            supabase_user_id: userId,
          },
        });
        console.log('✅ Created new Stripe customer:', customer.id);
      }
    } catch (stripeError) {
      console.error('❌ Stripe customer creation error:', stripeError);
      return res.status(500).json({ 
        error: 'Payment provider error',
        details: 'Unable to create payment session. Please try again later.'
      });
    }

    // Create checkout session
    try {
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

      console.log('✅ Checkout session created successfully:', session.id);
      return res.status(200).json({ sessionId: session.id, url: session.url });
    } catch (sessionError) {
      console.error('❌ Stripe session creation error:', sessionError);
      return res.status(500).json({ 
        error: 'Payment session creation failed',
        details: 'Unable to create payment session. Please try again later.'
      });
    }
  } catch (error) {
    console.error('❌ Unexpected error in checkout handler:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('Full error details:', {
      message: errorMessage,
      stack: errorStack
    });
    
    return res.status(500).json({ 
      error: 'Internal server error',
      details: 'An unexpected error occurred. Please try again later.'
    });
  }
}