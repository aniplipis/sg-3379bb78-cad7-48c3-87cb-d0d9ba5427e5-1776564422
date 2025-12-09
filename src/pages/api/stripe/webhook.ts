import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import { buffer } from 'micro';

// Disable body parser to handle raw body
export const config = {
  api: {
    bodyParser: false,
  },
};

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

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    return res.status(400).json({ error: 'Missing stripe signature' });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.supabase_user_id;

        if (userId) {
          // Grant premium access
          await supabase
            .from('profiles')
            .update({ 
              is_premium: true,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
            })
            .eq('id', userId);

          console.log(`✅ Premium access granted to user: ${userId}`);

          // Get user details for email
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', userId)
            .single();

          if (profile) {
            // Send payment confirmation email via Edge Function
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-email`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
                  },
                  body: JSON.stringify({
                    to: profile.email || session.customer_email,
                    subject: '✅ Payment Successful - Team Max Saham',
                    type: 'payment',
                    userName: profile.full_name,
                    membershipType: 'Premium Membership',
                  }),
                }
              );

              if (!response.ok) {
                console.error('Failed to send payment confirmation email');
              }
            } catch (emailError) {
              console.error('Error sending payment email:', emailError);
              // Don't fail the webhook if email fails
            }
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const userId = subscription.metadata?.supabase_user_id;

        if (userId) {
          // Update subscription status
          const isActive = subscription.status === 'active';
          await supabase
            .from('profiles')
            .update({ 
              is_premium: isActive,
              stripe_subscription_status: subscription.status,
            })
            .eq('id', userId);

          console.log(`✅ Subscription updated for user: ${userId}, status: ${subscription.status}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const userId = subscription.metadata?.supabase_user_id;

        if (userId) {
          // Remove premium access
          await supabase
            .from('profiles')
            .update({ 
              is_premium: false,
              stripe_subscription_status: 'canceled',
            })
            .eq('id', userId);

          console.log(`✅ Premium access removed from user: ${userId}`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer as string;

        // Find user by customer ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          // Optionally: send email notification or take action
          console.log(`⚠️ Payment failed for user: ${profile.id}`);
        }
        break;
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}