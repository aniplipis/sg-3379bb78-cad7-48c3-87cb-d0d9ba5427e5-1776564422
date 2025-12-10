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
    console.error('❌ Webhook signature verification failed:', error);
    return res.status(400).json({ error: 'Webhook signature verification failed' });
  }

  console.log('📥 Webhook received:', event.type);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.supabase_user_id;

        console.log('💳 Checkout completed for user:', userId);

        if (userId) {
          // Calculate subscription end date (1 year from now)
          const subscriptionEndDate = new Date();
          subscriptionEndDate.setFullYear(subscriptionEndDate.getFullYear() + 1);

          // Grant premium access with subscription details
          const { data: updateData, error: updateError } = await supabase
            .from('profiles')
            .update({ 
              is_premium: true,
              subscription_status: 'active',
              subscription_end_date: subscriptionEndDate.toISOString(),
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              stripe_subscription_status: 'active',
            })
            .eq('id', userId)
            .select();

          if (updateError) {
            console.error('❌ Failed to update profile:', updateError);
            throw updateError;
          }

          console.log('✅ Premium access granted to user:', userId);
          console.log('📅 Subscription end date:', subscriptionEndDate.toISOString());
          console.log('📊 Update result:', updateData);

          // Get user details for email
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', userId)
            .single();

          if (profile) {
            // Send payment confirmation email via Edge Function
            try {
              console.log('📧 Sending payment confirmation email to:', profile.email);
              
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
                console.error('❌ Failed to send payment confirmation email');
              } else {
                console.log('✅ Payment confirmation email sent successfully');
              }
            } catch (emailError) {
              console.error('❌ Error sending payment email:', emailError);
              // Don't fail the webhook if email fails
            }
          }
        } else {
          console.error('⚠️ No user ID found in session metadata');
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const userId = subscription.metadata?.supabase_user_id;

        console.log('🔄 Subscription updated for user:', userId, 'status:', subscription.status);

        if (userId) {
          // Update subscription status
          const isActive = subscription.status === 'active';
          
          // Calculate new end date if subscription is active
          const updateData: any = { 
            is_premium: isActive,
            stripe_subscription_status: subscription.status,
          };

          if (isActive && subscription.current_period_end) {
            const endDate = new Date(subscription.current_period_end * 1000);
            updateData.subscription_end_date = endDate.toISOString();
            console.log('📅 Updated subscription end date:', endDate.toISOString());
          }

          const { error: updateError } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', userId);

          if (updateError) {
            console.error('❌ Failed to update subscription:', updateError);
          } else {
            console.log('✅ Subscription updated for user:', userId, 'status:', subscription.status);
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const userId = subscription.metadata?.supabase_user_id;

        console.log('❌ Subscription deleted for user:', userId);

        if (userId) {
          // Remove premium access
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ 
              is_premium: false,
              subscription_status: 'canceled',
              stripe_subscription_status: 'canceled',
            })
            .eq('id', userId);

          if (updateError) {
            console.error('❌ Failed to cancel subscription:', updateError);
          } else {
            console.log('✅ Premium access removed from user:', userId);
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer as string;

        console.log('⚠️ Payment failed for customer:', customerId);

        // Find user by customer ID
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', customerId)
          .single();

        if (profile) {
          // Update subscription status to indicate payment failure
          await supabase
            .from('profiles')
            .update({ 
              stripe_subscription_status: 'past_due',
            })
            .eq('id', profile.id);

          console.log('⚠️ Payment failed for user:', profile.id);
        }
        break;
      }

      default:
        console.log('ℹ️ Unhandled event type:', event.type);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}