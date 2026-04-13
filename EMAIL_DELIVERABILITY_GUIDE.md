# Email Deliverability Guide

## Current Implementation

### ✅ Completed
- **Sender Email**: Changed from `noreply@` to `admin@abgmax.maxsaham.com`
- **Rate Limiting**: 20 emails per batch, 5-minute intervals
- **Email Headers**: Added List-Unsubscribe and X-Entity-Ref-ID
- **Batch Progress**: Real-time tracking with pause functionality

---

## DNS Configuration Required

### 1. DMARC Setup

Add this TXT record to your DNS:

```
Record Type: TXT
Name: _dmarc.abgmax.maxsaham.com
Value: v=DMARC1; p=quarantine; rua=mailto:admin@abgmax.maxsaham.com; ruf=mailto:admin@abgmax.maxsaham.com; fo=1; pct=100
```

**What this does:**
- `p=quarantine`: Failed emails go to spam (use `p=reject` after testing)
- `rua`: Aggregate reports sent to admin email
- `ruf`: Forensic reports for failed emails
- `fo=1`: Generate reports for any failure
- `pct=100`: Apply policy to 100% of emails

**Testing DMARC:**
After adding, wait 24-48 hours, then check:
```bash
dig TXT _dmarc.abgmax.maxsaham.com
```

### 2. SPF Record (if not already configured)

Add this TXT record:

```
Record Type: TXT
Name: abgmax.maxsaham.com (or @)
Value: v=spf1 include:_spf.resend.com ~all
```

**Verify SPF:**
```bash
dig TXT abgmax.maxsaham.com
```

### 3. DKIM (Resend handles this automatically)

Resend automatically signs emails with DKIM when you verify your domain. 

**To verify domain in Resend:**
1. Go to Resend Dashboard → Domains
2. Add `abgmax.maxsaham.com`
3. Add the DNS records Resend provides
4. Wait for verification (usually 24-48 hours)

---

## Additional Deliverability Best Practices

### 📧 Email Content Guidelines

1. **Avoid Spam Triggers:**
   - ❌ Don't use ALL CAPS in subject lines
   - ❌ Avoid excessive exclamation marks!!!
   - ❌ Don't use words like "FREE", "GUARANTEED", "CLICK HERE"
   - ✅ Use professional, clear subject lines
   - ✅ Keep email HTML clean and simple

2. **Email Structure:**
   - ✅ Include plain text version (Resend does this automatically)
   - ✅ Add unsubscribe link (already implemented)
   - ✅ Include physical address in footer
   - ✅ Use proper HTML structure (already done)

3. **Image Best Practices:**
   - Use hosted images (already using maxsaham.com URLs)
   - Include alt text for images
   - Don't make entire email one big image
   - Text-to-image ratio should favor text

### 🎯 Sender Reputation

1. **Warm Up Your Domain:**
   - Week 1: Send to 20-50 engaged users
   - Week 2: Send to 100-200 users
   - Week 3: Send to 500+ users
   - Week 4+: Send to full list

2. **Monitor Engagement:**
   - Track open rates (good: >20%)
   - Track click rates
   - Remove inactive subscribers after 6 months
   - Keep bounce rate <5%

3. **List Hygiene:**
   - Remove hard bounces immediately
   - Remove soft bounces after 3 attempts
   - Verify email addresses before adding
   - Use double opt-in for new signups

### ⚡ Technical Optimizations

1. **Email Size:**
   - Keep HTML under 102KB
   - Compress images
   - Minimize CSS

2. **Authentication:**
   - ✅ SPF (include Resend)
   - ✅ DKIM (automatic with Resend)
   - ✅ DMARC (needs DNS setup - see above)

3. **Reverse DNS (rDNS):**
   - Resend handles this automatically
   - Their IPs have proper rDNS records

### 📊 Monitoring Tools

1. **Check Email Deliverability:**
   - [Mail Tester](https://www.mail-tester.com/) - Test spam score
   - [MXToolbox](https://mxtoolbox.com/SuperTool.aspx) - Check DNS records
   - [DMARC Analyzer](https://www.dmarcanalyzer.com/) - Monitor DMARC reports

2. **Email Authentication Check:**
   ```bash
   # Check SPF
   dig TXT abgmax.maxsaham.com
   
   # Check DMARC
   dig TXT _dmarc.abgmax.maxsaham.com
   
   # Check MX records
   dig MX abgmax.maxsaham.com
   ```

3. **Send Test Emails:**
   - Gmail account
   - Outlook/Hotmail account
   - Yahoo account
   - Check if they land in inbox or spam

---

## Rate Limiting Strategy

### Current Implementation (20 emails / 5 minutes)

**Why this works:**
- Avoids ISP rate limits (most allow 100-500/hour)
- Maintains sender reputation
- Reduces spam filter triggers
- Allows time for engagement metrics

### Scaling Guidelines

- **0-100 subscribers**: 20 emails / 5 min (current)
- **100-500 subscribers**: 50 emails / 5 min
- **500-1000 subscribers**: 100 emails / 5 min
- **1000+ subscribers**: Consider email service provider (SendGrid, Mailchimp)

---

## Troubleshooting

### Emails Going to Spam?

1. **Check DNS Records:**
   ```bash
   dig TXT abgmax.maxsaham.com        # SPF
   dig TXT _dmarc.abgmax.maxsaham.com # DMARC
   ```

2. **Test Email Score:**
   - Send test email to: `[email protected]`
   - Visit mail-tester.com
   - Check your score (aim for 8+/10)

3. **Check Blacklists:**
   - Visit [MXToolbox Blacklist Check](https://mxtoolbox.com/blacklists.aspx)
   - Enter: `abgmax.maxsaham.com`
   - If blacklisted, follow delisting process

4. **Review DMARC Reports:**
   - Check admin@abgmax.maxsaham.com for aggregate reports
   - Look for authentication failures
   - Adjust policy if needed

### Low Open Rates?

1. **Subject Line Issues:**
   - Test different subject lines
   - Avoid spam triggers
   - Keep under 50 characters

2. **Sending Time:**
   - Best times: Tuesday-Thursday, 10 AM - 2 PM
   - Avoid Monday mornings, Friday afternoons
   - Test different times for your audience

3. **List Quality:**
   - Remove inactive subscribers
   - Segment your list
   - Send to engaged users first

---

## Resend Dashboard Setup

1. **Verify Domain:**
   - Add `abgmax.maxsaham.com` to Resend
   - Add provided DNS records
   - Wait for verification

2. **Configure Settings:**
   - Enable DKIM signing (automatic)
   - Set up webhooks for bounce/spam tracking
   - Configure suppression list

3. **Monitor Analytics:**
   - Track delivery rates
   - Monitor bounce rates
   - Check spam complaints
   - Review open/click rates

---

## Next Steps

1. ✅ Change sender email to admin@ (DONE)
2. ✅ Implement rate limiting (DONE)
3. ⏳ Add DMARC DNS record (PENDING - DNS update required)
4. ⏳ Verify domain in Resend Dashboard
5. ⏳ Send test emails to multiple providers
6. ⏳ Monitor first batch results
7. ⏳ Adjust strategy based on metrics

---

## Emergency Contacts

**Resend Support:** support@resend.com
**DNS Provider:** Check your domain registrar
**Max Saham Admin:** admin@abgmax.maxsaham.com

---

Last Updated: 2026-04-13