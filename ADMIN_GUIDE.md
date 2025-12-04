# Max Saham Website - Admin Guide

## Managing Premium Members

### How to Manually Add/Remove Premium Members

Since Stripe integration is a placeholder, you can manually manage premium members through the Supabase dashboard:

#### **Add Premium Access:**

1. Go to Supabase Dashboard → Table Editor
2. Select the `profiles` table
3. Find the user by email or ID
4. Update the `is_premium` column to `true`
5. User immediately gets access to all premium content

#### **Remove Premium Access:**

1. Follow same steps as above
2. Update the `is_premium` column to `false`
3. User loses access to premium content immediately

#### **SQL Query for Bulk Updates:**

```sql
-- Grant premium to specific user
UPDATE profiles 
SET is_premium = true 
WHERE email = 'user@example.com';

-- Remove premium from specific user
UPDATE profiles 
SET is_premium = false 
WHERE email = 'user@example.com';

-- Grant premium to multiple users
UPDATE profiles 
SET is_premium = true 
WHERE email IN ('user1@example.com', 'user2@example.com', 'user3@example.com');
```

---

## Future Stripe Integration Checklist

When you're ready to implement automatic Stripe subscriptions:

### **1. Stripe Setup:**
- [ ] Create Stripe account
- [ ] Create subscription product in Stripe
- [ ] Get Stripe API keys (publishable & secret)
- [ ] Add keys to `.env.local`

### **2. Backend Implementation:**
- [ ] Create Stripe checkout session endpoint in `/api/stripe/create-checkout`
- [ ] Create webhook endpoint in `/api/stripe/webhook`
- [ ] Handle subscription events (created, cancelled, updated)
- [ ] Update `profiles.is_premium` based on subscription status

### **3. Frontend Updates:**
- [ ] Add Stripe.js library
- [ ] Update "Upgrade to Premium" buttons to trigger Stripe checkout
- [ ] Add customer portal link for managing subscription

### **4. Webhook Events to Handle:**
- `checkout.session.completed` - Grant premium access
- `customer.subscription.updated` - Update subscription status
- `customer.subscription.deleted` - Remove premium access
- `invoice.payment_failed` - Handle failed payments

---

## Content Management

### **Adding New Videos:**

1. Upload video to Vimeo
2. Get Vimeo video ID
3. Update `src/pages/members/videos.tsx` with new video entry
4. Include: title, category, duration, description, vimeoId

### **Adding New Downloadable Resources:**

1. Upload PDF/file to Supabase Storage or external hosting
2. Update `src/pages/members/downloads.tsx` with new resource
3. Include: title, description, file size, download link

### **Adding New Technical Notes:**

1. Update `src/pages/members/notes.tsx` with new article
2. Include: title, category, date, read time, excerpt, tags
3. Create full article page if needed

### **Scheduling Live Classes:**

1. Update `src/pages/members/classes.tsx` with new class details
2. Include: title, date, time, platform (Zoom), spots available
3. Send Zoom link to premium members 24 hours before session

---

## Social Media Links

All social media links are placeholders. Update them in:

- `src/components/Navigation.tsx` - Hero section buttons
- `src/components/MediaSection.tsx` - Social media grid
- `src/components/ContactSection.tsx` - Contact options
- `src/components/Footer.tsx` - Footer social icons

**Update these URLs:**
- YouTube: `https://youtube.com/@maxsaham`
- TikTok: `https://tiktok.com/@maxsaham`
- Facebook: `https://facebook.com/maxsaham`
- Telegram: `https://t.me/maxsaham`
- WhatsApp: `https://wa.me/60123456789`

---

## Broker Affiliate Links

Update broker URLs in `src/components/BrokerSection.tsx`:
- Phillip Capital Malaysia
- UOB Kay Hian Futures

These should link to your affiliate/referral URLs if you have them.

---

## SC Verification Link

Update the Securities Commission Malaysia verification link in:
- `src/components/VerificationSection.tsx`

Replace `https://www.sc.com.my` with your actual SC registration verification URL.

---

## Database Backup

### **Regular Backups:**
1. Go to Supabase Dashboard → Database → Backups
2. Enable automatic daily backups
3. Download manual backups before major changes

### **Export User Data:**
```sql
-- Export all users and profiles
SELECT 
  au.email,
  p.full_name,
  p.is_premium,
  au.created_at
FROM auth.users au
LEFT JOIN profiles p ON p.id = au.id
ORDER BY au.created_at DESC;
```

---

## Security Notes

### **Important Security Practices:**

1. **Never share Supabase credentials** publicly
2. **Enable RLS** on all tables (already done)
3. **Regularly review** user access logs
4. **Keep dependencies updated** with `npm update`
5. **Monitor failed login attempts** in Supabase auth logs
6. **Use strong passwords** for admin accounts

### **RLS Policies Already Implemented:**
- ✅ Users can only read/update their own profiles
- ✅ Premium content requires authentication + premium status
- ✅ Public content accessible to everyone

---

## Troubleshooting

### **User Can't Login:**
1. Check if email is confirmed in Supabase auth users
2. Verify profile record exists in profiles table
3. Send password reset email from Supabase dashboard
4. Check for any RLS policy errors in browser console

### **Premium Content Not Showing:**
1. Verify `is_premium = true` in profiles table
2. Check browser console for auth errors
3. Ensure user is logged in (check session)
4. Clear browser cache and refresh

### **Database Errors:**
1. Check Supabase project status
2. Verify API keys in `.env.local`
3. Check RLS policies haven't been modified
4. Review error logs in Supabase dashboard

---

## Contact Information

For technical support or questions:
- Email: contact@maxsaham.com
- Documentation: See `SUPABASE_SETUP_INSTRUCTIONS.md`
- Premium Setup: See `HOW_TO_CREATE_PREMIUM_ACCOUNT.md`
