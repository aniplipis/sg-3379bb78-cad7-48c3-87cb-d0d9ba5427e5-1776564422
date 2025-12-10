# Manual Premium Member Assignment Guide

This guide explains how to manually upgrade a user to premium membership and set their subscription details in Supabase.

## Prerequisites

- Access to Supabase Dashboard
- User's email address or user ID

---

## Step-by-Step Instructions

### 1. Access Supabase Dashboard

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Select your **Max Saham** project
4. Click on **"Table Editor"** in the left sidebar

### 2. Find the User Profile

1. Click on the **"profiles"** table
2. Use the search/filter to find the user by:
   - **Email address**, or
   - **User ID (UUID)**
3. Click on the row to open the edit form

### 3. Set Premium Status

Update the following fields:

#### **Required Fields:**

| Field Name | Value | Description |
|------------|-------|-------------|
| `is_premium` | `true` | Marks user as premium member |
| `subscription_status` | `active` | Sets subscription status |
| `subscription_end_date` | `2025-12-31 23:59:59+00` | End date (YYYY-MM-DD HH:MM:SS+00) |

#### **Optional Fields:**

| Field Name | Example Value | Description |
|------------|---------------|-------------|
| `stripe_customer_id` | `cus_xxxxxxxxxxxxx` | Only if they have a Stripe account |
| `stripe_subscription_id` | `sub_xxxxxxxxxxxxx` | Only if they have a Stripe subscription |
| `stripe_subscription_status` | `active` | Only if using Stripe |

### 4. Calculate Subscription End Date

**For 1-year membership:**
- If today is: `2024-12-10`
- End date should be: `2025-12-10 23:59:59+00`

**Format:** `YYYY-MM-DD 23:59:59+00`

**Example Values:**
```
2025-12-31 23:59:59+00  (Expires Dec 31, 2025)
2026-01-15 23:59:59+00  (Expires Jan 15, 2026)
2030-12-31 23:59:59+00  (Lifetime - far future date)
```

### 5. Save Changes

1. Click **"Save"** button at the bottom of the form
2. Verify the changes were applied
3. The user should now have premium access immediately

---

## Quick SQL Method (Alternative)

If you prefer using SQL, you can run this query in the **SQL Editor**:

### Option 1: Set 1-Year Premium Access

```sql
-- Replace 'user@example.com' with the actual user email
UPDATE profiles
SET 
  is_premium = true,
  subscription_status = 'active',
  subscription_end_date = NOW() + INTERVAL '1 year'
WHERE email = 'user@example.com';
```

### Option 2: Set Specific End Date

```sql
-- Replace with actual email and desired end date
UPDATE profiles
SET 
  is_premium = true,
  subscription_status = 'active',
  subscription_end_date = '2025-12-31 23:59:59+00'
WHERE email = 'user@example.com';
```

### Option 3: Set Lifetime Access

```sql
-- Set far future date for lifetime access
UPDATE profiles
SET 
  is_premium = true,
  subscription_status = 'active',
  subscription_end_date = '2050-12-31 23:59:59+00'
WHERE email = 'user@example.com';
```

### Option 4: Update by User ID

```sql
-- If you have the user ID instead of email
UPDATE profiles
SET 
  is_premium = true,
  subscription_status = 'active',
  subscription_end_date = NOW() + INTERVAL '1 year'
WHERE id = '550e8400-e29b-41d4-a716-446655440000';
```

---

## Verify Premium Access

After making changes, verify the user has premium access:

### Method 1: Check in Dashboard
1. Go back to the **profiles** table
2. Find the user's row
3. Verify `is_premium` = `true`
4. Verify `subscription_status` = `active`
5. Verify `subscription_end_date` is in the future

### Method 2: Test as User
1. Log in as the user (or ask them to log in)
2. Navigate to `/members` page
3. They should see the premium dashboard
4. Check their profile page shows "Premium Member" badge

---

## Subscription Status Values

Valid values for `subscription_status`:

| Status | Description |
|--------|-------------|
| `active` | Active subscription, user has access |
| `canceled` | Subscription canceled but still valid until end date |
| `past_due` | Payment failed, pending resolution |
| `trialing` | In trial period |
| `incomplete` | Subscription creation incomplete |
| `incomplete_expired` | Incomplete subscription expired |
| `unpaid` | Payment failed, access restricted |

**For manual assignments, always use: `active`**

---

## Common Scenarios

### Scenario 1: New Premium Member (No Stripe)
```sql
UPDATE profiles
SET 
  is_premium = true,
  subscription_status = 'active',
  subscription_end_date = NOW() + INTERVAL '1 year'
WHERE email = 'newmember@example.com';
```

### Scenario 2: Extend Existing Membership
```sql
-- Add 1 more year to current end date
UPDATE profiles
SET 
  subscription_end_date = subscription_end_date + INTERVAL '1 year'
WHERE email = 'existingmember@example.com';
```

### Scenario 3: Lifetime Access
```sql
UPDATE profiles
SET 
  is_premium = true,
  subscription_status = 'active',
  subscription_end_date = '2099-12-31 23:59:59+00'
WHERE email = 'vip@example.com';
```

### Scenario 4: Complimentary 3-Month Access
```sql
UPDATE profiles
SET 
  is_premium = true,
  subscription_status = 'active',
  subscription_end_date = NOW() + INTERVAL '3 months'
WHERE email = 'trial@example.com';
```

### Scenario 5: Revoke Premium Access
```sql
UPDATE profiles
SET 
  is_premium = false,
  subscription_status = 'canceled',
  subscription_end_date = NOW()
WHERE email = 'revoke@example.com';
```

---

## Troubleshooting

### Issue: User Still Shows as Free Member

**Solutions:**
1. **Clear browser cache** and refresh
2. **Log out and log back in**
3. Verify `is_premium = true` in database
4. Check `subscription_end_date` is in the future
5. Check `subscription_status = 'active'`

### Issue: Changes Not Saving

**Solutions:**
1. Check you have proper permissions in Supabase
2. Verify the user ID/email is correct
3. Check for database errors in the Supabase logs
4. Ensure date format is correct (include timezone `+00`)

### Issue: Premium Features Not Working

**Solutions:**
1. Verify RLS policies allow access
2. Check the frontend is reading `is_premium` correctly
3. Ensure `subscription_end_date` hasn't passed
4. Check browser console for errors

---

## Batch Updates (Multiple Users)

To upgrade multiple users at once:

```sql
-- Upgrade multiple users by email
UPDATE profiles
SET 
  is_premium = true,
  subscription_status = 'active',
  subscription_end_date = NOW() + INTERVAL '1 year'
WHERE email IN (
  'user1@example.com',
  'user2@example.com',
  'user3@example.com'
);
```

---

## Important Notes

⚠️ **Important Reminders:**

1. **Always set `subscription_end_date`** - Without it, users might lose access unexpectedly
2. **Use UTC timezone (+00)** - Always include `+00` in timestamps
3. **Test after changes** - Verify the user can access premium features
4. **Document manual changes** - Keep a record of who was upgraded and why
5. **No email notifications** - Manual upgrades don't trigger welcome emails

---

## Need Help?

If you encounter issues:
1. Check Supabase logs in the dashboard
2. Verify the SQL query syntax
3. Contact the development team
4. Check this project's GitHub issues

---

**Last Updated:** December 2024  
**Version:** 1.0