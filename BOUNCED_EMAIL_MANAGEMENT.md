<![CDATA[
# Bounced Email Management Guide

## Overview
The system automatically tracks and excludes bounced email addresses to maintain sender reputation and improve deliverability.

## Current Bounced Emails (Marked)
The following emails have been marked as bounced and will be automatically excluded from bulk sends:

1. ✖️ syani1410@me.com
2. ✖️ fahida443485@gmail.com
3. ✖️ faezsyahmi1976@gmail.com
4. ✖️ webroken@gmail.com
5. ✖️ imkamaltalib@gmail.com

---

## How It Works

### Automatic Detection
The send-email Edge Function automatically detects bounces and marks emails:
- Invalid email format (422 errors)
- Hard bounces (permanent failures)
- Mailbox doesn't exist

### Manual Marking
You can manually mark additional bounced emails:

```sql
-- Mark a single email as bounced
UPDATE profiles 
SET email_bounced = true 
WHERE email = 'user@example.com';

-- Mark multiple emails as bounced
UPDATE profiles 
SET email_bounced = true 
WHERE email IN (
  'email1@example.com',
  'email2@example.com'
);
```

### View All Bounced Emails
```sql
SELECT email, full_name, is_premium, created_at
FROM profiles 
WHERE email_bounced = true
ORDER BY email;
```

### Unmark an Email (if verified/fixed)
```sql
UPDATE profiles 
SET email_bounced = false 
WHERE email = 'user@example.com';
```

---

## Prevention Strategies

### 1. Email Validation on Signup
- ✅ Already implemented: Email verification required
- Consider: Double opt-in for critical communications

### 2. Regular List Hygiene
- Monthly: Review bounced emails
- Quarterly: Check inactive subscribers
- Annually: Full list audit

### 3. Monitor Bounce Patterns
Check for common issues:
```sql
-- Count bounces by domain
SELECT 
  SPLIT_PART(email, '@', 2) as domain,
  COUNT(*) as bounce_count
FROM profiles
WHERE email_bounced = true
GROUP BY domain
ORDER BY bounce_count DESC;
```

---

## Best Practices

### DO:
✅ Remove hard bounces immediately
✅ Monitor bounce rates (keep < 2%)
✅ Use double opt-in for new subscribers
✅ Verify emails before importing lists
✅ Keep detailed bounce logs

### DON'T:
❌ Send to bounced addresses (damages reputation)
❌ Buy email lists (high bounce rates)
❌ Ignore bounce notifications
❌ Send too frequently (increases complaints)
❌ Use generic subject lines (triggers spam filters)

---

## Resend Dashboard Monitoring

### Access Your Bounce Reports:
1. Login to resend.com
2. Go to "Logs" or "Analytics"
3. Filter by "Bounced" status
4. Review and mark in database

### Bounce Types:
- **Hard Bounce**: Permanent failure (mailbox doesn't exist)
  - Action: Mark as bounced immediately
  
- **Soft Bounce**: Temporary failure (mailbox full, server down)
  - Action: Retry 2-3 times over 3 days, then mark as bounced
  
- **Block**: Email blocked by recipient server
  - Action: Investigate and potentially mark as bounced

---

## SQL Queries for Management

### Get Bounce Statistics
```sql
SELECT 
  COUNT(*) FILTER (WHERE email_bounced = true) as total_bounced,
  COUNT(*) FILTER (WHERE email_bounced = false) as active_emails,
  COUNT(*) as total_profiles,
  ROUND(
    COUNT(*) FILTER (WHERE email_bounced = true)::numeric / 
    COUNT(*)::numeric * 100, 
    2
  ) as bounce_percentage
FROM profiles;
```

### Export Bounced Emails for Review
```sql
SELECT 
  email,
  full_name,
  is_premium,
  subscription_status,
  created_at
FROM profiles
WHERE email_bounced = true
ORDER BY created_at DESC;
```

### Clean Up Old Bounced Profiles (Use with Caution!)
```sql
-- Archive bounced emails older than 6 months
-- DO NOT DELETE - keep for records
SELECT email, full_name, created_at
FROM profiles
WHERE email_bounced = true 
  AND created_at < NOW() - INTERVAL '6 months';
```

---

## Impact on Sender Reputation

### Healthy Metrics:
- Bounce Rate: < 2%
- Spam Complaint Rate: < 0.1%
- Unsubscribe Rate: < 0.5%

### Current Status:
To check your current bounce rate:
```sql
SELECT 
  ROUND(
    COUNT(*) FILTER (WHERE email_bounced = true)::numeric / 
    NULLIF(COUNT(*), 0)::numeric * 100, 
    2
  ) as bounce_rate_percentage
FROM profiles;
```

---

## Automated Cleanup Schedule

### Weekly:
- Review new bounces from Resend dashboard
- Mark hard bounces in database

### Monthly:
- Export bounce report
- Analyze bounce patterns
- Update suppression list

### Quarterly:
- Full list audit
- Remove inactive subscribers who haven't opened in 90 days
- Verify email verification flow working

---

## Emergency: High Bounce Rate

If bounce rate exceeds 5%:

1. **Immediate Actions:**
   - Pause all bulk sends
   - Review recent email list imports
   - Check for data entry errors

2. **Investigation:**
   ```sql
   -- Find recent signups with bounces
   SELECT email, created_at
   FROM profiles
   WHERE email_bounced = true 
     AND created_at > NOW() - INTERVAL '7 days'
   ORDER BY created_at DESC;
   ```

3. **Remediation:**
   - Implement stricter email validation
   - Add CAPTCHA to signup
   - Enable email verification
   - Contact Resend support

---

## Support & Resources

- **Resend Support**: support@resend.com
- **Email Deliverability Guide**: See EMAIL_DELIVERABILITY_GUIDE.md
- **Database Access**: Supabase Dashboard → Database → SQL Editor

---

Last Updated: 2026-04-13
Maintained by: Team Max Saham Admin
</file_contents>
