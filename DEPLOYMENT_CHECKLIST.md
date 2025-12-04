# Max Saham Website - Deployment Checklist

## Pre-Deployment Checklist

### **1. Environment Variables**
- [ ] Verify all `.env.local` variables are correct
- [ ] Add environment variables to Vercel/hosting platform
- [ ] Confirm Supabase connection works
- [ ] Test with production Supabase keys (not development)

### **2. Content Updates**
- [ ] Replace all placeholder images with actual images
- [ ] Update all social media links (YouTube, TikTok, Facebook, Telegram, WhatsApp)
- [ ] Add real WhatsApp number (currently +60123456789)
- [ ] Update broker affiliate links
- [ ] Add SC verification link
- [ ] Update Abg Max's biography and photo
- [ ] Add real class registration links

### **3. Premium Content**
- [ ] Upload videos to Vimeo
- [ ] Update video IDs in videos.tsx
- [ ] Upload PDFs to storage
- [ ] Update download links
- [ ] Write technical analysis articles
- [ ] Schedule upcoming live classes

### **4. Stripe Integration (Optional)**
- [ ] Create Stripe account
- [ ] Set up subscription product
- [ ] Add Stripe API keys to environment
- [ ] Implement checkout flow
- [ ] Set up webhook endpoint
- [ ] Test subscription flow
- [ ] Test cancellation flow

### **5. Testing**
- [ ] Test user registration flow
- [ ] Test login/logout
- [ ] Test password reset
- [ ] Test free member experience
- [ ] Test premium member experience
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Check all links work
- [ ] Verify all sections scroll correctly

### **6. SEO & Meta Tags**
- [ ] Add proper page titles
- [ ] Add meta descriptions
- [ ] Add Open Graph tags
- [ ] Add Twitter card tags
- [ ] Create sitemap
- [ ] Add robots.txt
- [ ] Set up Google Analytics (optional)

### **7. Performance**
- [ ] Optimize images (use Next.js Image component)
- [ ] Enable Vercel CDN
- [ ] Test loading speed
- [ ] Check Lighthouse scores
- [ ] Minimize JavaScript bundle size

### **8. Security**
- [ ] Enable HTTPS
- [ ] Review RLS policies
- [ ] Set up rate limiting (optional)
- [ ] Enable CORS properly
- [ ] Review authentication flow
- [ ] Check for exposed secrets

---

## Deployment Steps (Vercel)

### **1. Connect to Vercel:**
```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel --prod
```

### **2. Environment Variables in Vercel:**
Go to Vercel Dashboard → Project → Settings → Environment Variables

Add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Any Stripe keys (when ready)

### **3. Domain Setup:**
- [ ] Connect custom domain
- [ ] Set up SSL certificate (automatic with Vercel)
- [ ] Update Supabase redirect URLs to include production domain

### **4. Supabase Redirect URLs:**
Add production URL to Supabase:
```
https://yourdomain.com/**
https://yourdomain.com/auth/callback
```

---

## Post-Deployment

### **1. Testing:**
- [ ] Test full user journey on production
- [ ] Verify all links work
- [ ] Check mobile responsiveness
- [ ] Test authentication flow
- [ ] Verify premium content protection

### **2. Monitoring:**
- [ ] Set up uptime monitoring
- [ ] Monitor Supabase usage
- [ ] Check error logs regularly
- [ ] Monitor user signups

### **3. Backup:**
- [ ] Enable Supabase automatic backups
- [ ] Export user data weekly
- [ ] Keep local backup of content

---

## Content Updates After Launch

### **Regular Updates:**
1. **Weekly:**
   - Add new technical analysis notes
   - Update social media embeds
   - Post new free content

2. **Monthly:**
   - Add new videos to premium library
   - Upload new downloadable resources
   - Schedule live trading sessions
   - Review and update pricing

3. **Quarterly:**
   - Review and update trading approach content
   - Add new case studies
   - Update broker recommendations
   - Refresh testimonials

---

## Marketing Checklist

### **Launch Announcements:**
- [ ] Announce on social media (YouTube, TikTok, Facebook)
- [ ] Post in Telegram community
- [ ] Send WhatsApp broadcast
- [ ] Email existing students
- [ ] Create launch promotion

### **SEO Setup:**
- [ ] Submit to Google Search Console
- [ ] Create social media posts with links
- [ ] Get backlinks from trading forums
- [ ] Create YouTube video about the platform
- [ ] Add Google Analytics

### **Community Building:**
- [ ] Engage in Telegram group daily
- [ ] Post regular content updates
- [ ] Host live Q&A sessions
- [ ] Share member success stories
- [ ] Create referral program

---

## Support System

### **User Support:**
1. **Free Members:**
   - Public Telegram group
   - FAQ section (to be added)
   - Email support

2. **Premium Members:**
   - Premium Telegram group
   - Priority email support
   - Live session Q&A
   - One-on-one consultations

### **Common Issues & Solutions:**
- Can't login → Send password reset
- Can't access premium → Verify `is_premium = true`
- Video won't play → Check Vimeo embed
- Download link broken → Update file URL

---

## Legal Requirements

### **Pages to Add:**
- [ ] Privacy Policy
- [ ] Terms of Service
- [ ] Refund Policy
- [ ] Risk Disclaimer
- [ ] SC Compliance Statement

### **Compliance:**
- [ ] Verify SC registration is current
- [ ] Display risk disclaimers
- [ ] Include proper legal notices
- [ ] Add contact information
- [ ] Display company registration (if applicable)

---

## Success Metrics

### **Track These KPIs:**
1. **User Metrics:**
   - Total signups
   - Free vs premium members
   - Conversion rate
   - Churn rate
   - Active users

2. **Engagement:**
   - Video views
   - Download counts
   - Class attendance
   - Community activity
   - Time on site

3. **Revenue:**
   - Monthly recurring revenue (MRR)
   - Annual recurring revenue (ARR)
   - Customer lifetime value (CLV)
   - Customer acquisition cost (CAC)

---

## Maintenance Schedule

### **Daily:**
- Check error logs
- Respond to user questions
- Monitor Telegram community

### **Weekly:**
- Review user signups
- Check system performance
- Backup database
- Add new content

### **Monthly:**
- Review analytics
- Update content library
- Host live session
- Send newsletter (optional)

### **Quarterly:**
- Security audit
- Performance optimization
- Feature updates
- Pricing review
