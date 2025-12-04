
# Supabase Google OAuth Setup Instructions

## 🔧 Setting Up Google OAuth in Supabase Dashboard

Follow these steps to enable Google Sign-In for your Max Saham website:

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: **Max Saham** (rfmdbomweaskbomjhbuq)

### Step 2: Enable Google Provider
1. In the left sidebar, click on **Authentication**
2. Click on **Providers** tab
3. Find **Google** in the list of providers
4. Toggle the **Enable Sign in with Google** switch to ON

### Step 3: Get Google OAuth Credentials
You need to create OAuth credentials in Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen if prompted:
   - Application name: "Max Saham"
   - User support email: Your email
   - Developer contact: Your email
6. Choose **Web application** as the application type
7. Add these **Authorized JavaScript origins**:
   ```
   https://rfmdbomweaskbomjhbuq.supabase.co
   http://localhost:3000
   ```
8. Add these **Authorized redirect URIs**:
   ```
   https://rfmdbomweaskbomjhbuq.supabase.co/auth/v1/callback
   http://localhost:3000/auth/callback
   ```
9. Click **Create**
10. Copy the **Client ID** and **Client Secret**

### Step 4: Configure in Supabase
1. Go back to your Supabase dashboard
2. In the Google provider settings, paste:
   - **Client ID** (from Google Cloud Console)
   - **Client Secret** (from Google Cloud Console)
3. Click **Save**

### Step 5: Configure Redirect URLs (Already Done)
The following redirect URLs are already configured in your Supabase project:
- `https://*-<your-vercel-team>.vercel.app/**` (for Vercel deployments)
- `http://localhost:3000/auth/callback` (for local development)

### Step 6: Test the Integration
1. Click the "Login" button in the navigation
2. Click "Continue with Google"
3. Select your Google account
4. You should be redirected back to the homepage, logged in
5. Your profile will appear in the navigation with your Google name and email

## 🎉 Premium Test Account
A premium test account has been created for you:
- **Email:** premium@maxsaham.com
- **Password:** Premium123!

This account has `is_premium` set to `true` in the database, so you can test premium features.

## 🔒 Security Notes
- The Google OAuth integration is secure and handled entirely by Supabase
- User passwords are never stored in plain text
- All authentication tokens are encrypted
- The integration uses industry-standard OAuth 2.0 protocol

## 📊 Database Structure
Your `profiles` table has the following structure:
- `id` (UUID) - Primary key, references auth.users
- `email` (TEXT) - User's email address
- `full_name` (TEXT) - User's display name
- `avatar_url` (TEXT) - Profile picture URL (for Google OAuth)
- `is_premium` (BOOLEAN) - Premium membership status
- `created_at` (TIMESTAMP) - Account creation date

## 🚀 Next Steps
After setting up Google OAuth:
1. Test the login flow with Google
2. Test the registration flow
3. Test the premium test account
4. Verify that user profiles are created correctly
5. Test the logout functionality

## 💡 Troubleshooting
If Google OAuth doesn't work:
1. Verify the Client ID and Secret are correct
2. Check that redirect URIs match exactly (including http/https)
3. Ensure the Google Cloud project has the correct APIs enabled
4. Check the browser console for any errors
5. Verify that cookies are enabled in your browser

## 📝 Creating Premium Members
To make a user premium manually:
1. Go to Supabase Dashboard > Table Editor
2. Select the `profiles` table
3. Find the user's row
4. Set `is_premium` to `true`
5. Click Save

Or run this SQL query:
```sql
UPDATE profiles 
SET is_premium = true 
WHERE email = 'user@example.com';
```
