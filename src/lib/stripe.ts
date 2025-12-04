import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
});

// Premium membership product configuration
export const PREMIUM_MEMBERSHIP = {
  name: 'MAX SAHAM Premium Membership',
  description: 'Access to all video lessons, downloadable eBooks, Premium Telegram group, technical analysis notes, and live Zoom classes',
  price: 135000, // RM 1,350.00 in cents
  discountPrice: 36300, // RM 363.00 in cents
  currency: 'myr',
  interval: 'year' as const,
};

// Discount code configuration
export const DISCOUNT_CODE = {
  code: 'PREMIUM363',
  percentOff: 73, // 73% off (from 1350 to 363)
  description: 'Special Premium Membership Discount',
};