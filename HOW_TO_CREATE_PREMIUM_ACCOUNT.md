
# How to Create a Premium Test Account

## 🎯 Quick Steps to Get a Premium Account

Since Supabase manages user creation through its Auth system, follow these simple steps:

### Option 1: Register and Set as Premium (Recommended)

**Step 1: Register a New Account**
1. Click the "Login" button in the navigation
2. Switch to the "Register" tab
3. Fill in the form:
   - Name: Premium User
   - Email: premium@maxsaham.com (or any email you prefer)
   - Password: Premium123! (or any password)
   - Accept terms and conditions
4. Click "Create Account"
5. Check your email and confirm the account (Supabase sends a confirmation email)

**Step 2: Set the Account as Premium**
Once registered, run this SQL query in your Supabase dashboard:

```sql
-- Make a user premium by their email
UPDATE profiles 
SET is_premium = true 
WHERE email = 'premium@maxsaham.com';
```

**To run this SQL:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click "SQL Editor" in the left sidebar
4. Paste the SQL query above
5. Click "Run"

---

### Option 2: Use Google Sign-In and Set as Premium

**Step 1: Set Up Google OAuth**
Follow the instructions in `SUPABASE_SETUP_INSTRUCTIONS.md` to configure Google OAuth

**Step 2: Sign in with Google**
1. Click "Login" button
2. Click "Continue with Google"
3. Select your Google account
4. Complete the sign-in flow

**Step 3: Set Your Google Account as Premium**
Run this SQL query with your Google email:

```sql
-- Make your Google account premium
UPDATE profiles 
SET is_premium = true 
WHERE email = 'your-google-email@gmail.com';
```

---

### Option 3: Quick SQL Solution (Advanced)

If you want to create a premium account directly, you can insert directly into the `profiles` table, but you MUST first create the user in Supabase Auth through the dashboard:

**Step 1: Create User in Supabase Auth Dashboard**
1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add User" > "Create new user"
3. Enter:
   - Email: premium@maxsaham.com
   - Password: Premium123!
   - Auto Confirm User: ✅ (check this box)
4. Click "Create User"

**Step 2: Set as Premium in Database**
Run this SQL:

```sql
-- Set the newly created user as premium
UPDATE profiles 
SET is_premium = true 
WHERE email = 'premium@maxsaham.com';
```

---

## ✅ Verify Premium Status

After setting a user as premium, verify it worked:

```sql
-- Check premium status
SELECT id, email, full_name, is_premium, created_at 
FROM profiles 
WHERE email = 'premium@maxsaham.com';
```

You should see `is_premium: true` for that user.

---

## 🎉 What Premium Users See

Once set as premium:
- Crown badge on their profile button in navigation
- "Premium Dashboard" option in user menu
- Access to premium content areas
- Premium-only features unlocked

---

## 💡 Making ANY User Premium

To make any existing user premium:

```sql
-- By email
UPDATE profiles 
SET is_premium = true 
WHERE email = 'any-user@example.com';

-- By user ID
UPDATE profiles 
SET is_premium = true 
WHERE id = 'user-uuid-here';

-- Make all users premium (for testing)
UPDATE profiles 
SET is_premium = true;
```

---

## 🔄 Remove Premium Status

To revoke premium access:

```sql
-- By email
UPDATE profiles 
SET is_premium = false 
WHERE email = 'user@example.com';
```

---

## 📝 Notes

- **Email confirmation is required** for email/password sign-ups
- **Google OAuth** doesn't require email confirmation
- **Premium status** is stored in the `profiles` table, not in Supabase Auth
- **Changes take effect immediately** after running the SQL query
- **Users must log out and log back in** to see premium status in the UI

