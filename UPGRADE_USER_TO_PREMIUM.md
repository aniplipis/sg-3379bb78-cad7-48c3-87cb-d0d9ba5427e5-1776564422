# How to Manually Upgrade Users to Premium in Supabase

## Quick Method (Supabase Dashboard UI)

### **Step 1: Access Supabase Dashboard**
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your **Max Saham** project

### **Step 2: Open Table Editor**
1. Click **"Table Editor"** in the left sidebar
2. Select the **"profiles"** table from the dropdown

### **Step 3: Find the User**
1. Use the search/filter to find the user by email
2. Or scroll through the list to find them
3. Click on the row to expand details

### **Step 4: Edit the Profile**
1. Find the **"is_premium"** column
2. Change the value from `false` to `true`
3. Click **"Save"** or press Enter

**✅ Done!** The user now has premium access immediately.

---

## SQL Method (Faster for Multiple Users)

### **Step 1: Open SQL Editor**
1. In Supabase Dashboard, click **"SQL Editor"** in left sidebar
2. Click **"New query"**

### **Step 2: Run One of These Queries**

#### **Upgrade Single User by Email:**
```sql
UPDATE profiles 
SET is_premium = true 
WHERE email = 'user@example.com';
```

#### **Upgrade Multiple Users at Once:**
```sql
UPDATE profiles 
SET is_premium = true 
WHERE email IN (
  'user1@example.com',
  'user2@example.com',
  'user3@example.com'
);
```

#### **Upgrade User by ID:**
```sql
UPDATE profiles 
SET is_premium = true 
WHERE id = 'user-uuid-here';
```

### **Step 3: Execute the Query**
1. Paste the query
2. Replace `user@example.com` with actual email
3. Click **"Run"** button (or press Ctrl+Enter / Cmd+Enter)
4. Check for success message

---

## Verify Premium Status

### **Check in Table Editor:**
1. Go to Table Editor → profiles table
2. Find the user
3. Verify **is_premium** column shows `true`

### **Check with SQL:**
```sql
SELECT 
  id,
  email,
  full_name,
  is_premium,
  created_at
FROM profiles
WHERE email = 'user@example.com';
```

### **Test on Website:**
1. Have the user log out and log back in
2. They should now see:
   - "Premium Member" badge in navigation
   - Access to all premium member pages
   - Members dashboard with all content
   - Video library, downloads, notes, classes

---

## Remove Premium Access (Downgrade)

### **UI Method:**
1. Table Editor → profiles table
2. Find user
3. Change **is_premium** from `true` to `false`
4. Save

### **SQL Method:**
```sql
UPDATE profiles 
SET is_premium = false 
WHERE email = 'user@example.com';
```

---

## Bulk Operations

### **Upgrade All Users (USE WITH CAUTION!):**
```sql
-- ⚠️ WARNING: This makes ALL users premium
UPDATE profiles 
SET is_premium = true;
```

### **Check How Many Premium Users:**
```sql
SELECT 
  COUNT(*) as total_premium_users
FROM profiles
WHERE is_premium = true;
```

### **List All Premium Users:**
```sql
SELECT 
  email,
  full_name,
  created_at,
  is_premium
FROM profiles
WHERE is_premium = true
ORDER BY created_at DESC;
```

### **Find Users Who Need Premium:**
```sql
-- List all registered users who are NOT premium
SELECT 
  email,
  full_name,
  created_at
FROM profiles
WHERE is_premium = false
ORDER BY created_at DESC;
```

---

## Example: Your Current User

Based on the test results from earlier, here's how to upgrade your current test user:

```sql
UPDATE profiles 
SET is_premium = true 
WHERE email = 'premium@maxsaham.com';
```

**User Details:**
- Email: `premium@maxsaham.com`
- ID: `97256bbb-313f-46ec-aab3-576ba37eebc0`
- Current Status: Already premium! ✅

---

## Troubleshooting

### **User doesn't see premium content after upgrade:**
1. Have them log out completely
2. Clear browser cache
3. Log back in
4. Check profile page shows "Premium Member" badge

### **SQL query fails:**
- Verify email is typed correctly (case-sensitive)
- Check that the profiles table exists
- Ensure you have proper permissions
- Try refreshing the Supabase dashboard

### **RLS Policy Issues:**
If users can't see their premium status:
```sql
-- Verify RLS policies are enabled
SELECT * FROM pg_policies WHERE tablename = 'profiles';
```

---

## Best Practices

### **Before Upgrading Users:**
1. ✅ Verify they have paid (if using manual payments)
2. ✅ Confirm their email is verified in auth.users table
3. ✅ Check they have a profile record
4. ✅ Document the upgrade (keep a spreadsheet/log)

### **After Upgrading Users:**
1. ✅ Send them a welcome email
2. ✅ Invite them to premium Telegram group
3. ✅ Provide login instructions
4. ✅ Share premium member onboarding guide

### **Regular Maintenance:**
1. Weekly: Review new signups and upgrade paid members
2. Monthly: Verify premium status matches payment records
3. Quarterly: Clean up expired/cancelled memberships

---

## Quick Reference Commands

### **Most Common Operations:**

```sql
-- Upgrade user
UPDATE profiles SET is_premium = true WHERE email = 'user@example.com';

-- Downgrade user
UPDATE profiles SET is_premium = false WHERE email = 'user@example.com';

-- Check user status
SELECT email, is_premium FROM profiles WHERE email = 'user@example.com';

-- Count premium users
SELECT COUNT(*) FROM profiles WHERE is_premium = true;

-- List all premium users
SELECT email, full_name FROM profiles WHERE is_premium = true;
```

---

## When to Use Each Method

| Method | Best For |
|--------|----------|
| **UI (Table Editor)** | Single user upgrades, visual confirmation |
| **SQL (Single Query)** | Quick upgrades, automation |
| **SQL (Bulk)** | Multiple users, batch processing |

---

## Future: Automatic Stripe Integration

When you implement Stripe, this manual process will be replaced with:
- Automatic upgrade on successful payment
- Automatic downgrade on subscription cancellation
- Webhook handling for payment events
- No manual intervention needed

Until then, this manual method works perfectly! ✅

---

## Support

If you encounter any issues:
1. Check the ADMIN_GUIDE.md for detailed troubleshooting
2. Review Supabase dashboard logs
3. Verify RLS policies are correct
4. Check browser console for errors

**Contact:** For technical support, refer to the main documentation files in the project root.
