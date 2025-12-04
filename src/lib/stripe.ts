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
  price: 135000, // RM 1,350.00 in cents (multiply by 100)
  discountPrice: 36300, // RM 363.00 in cents (multiply by 100)
  currency: 'myr',
  interval: 'year' as const,
};

// Discount code configuration
export const DISCOUNT_CODE = {
  code: 'PREMIUM363',
  percentOff: 73, // 73.11% off (1350 - 363 = 987, 987/1350 = 73.11%)
  amountOff: 98700, // RM 987.00 in cents
  description: 'Special Premium Membership Discount - Save RM 987',
};