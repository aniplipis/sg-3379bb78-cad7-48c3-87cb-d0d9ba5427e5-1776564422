# 🔐 Google OAuth Login Verification Checklist

This document provides a step-by-step verification process for testing Google OAuth functionality on the Max Saham website.

---

## ✅ PRE-FLIGHT CHECKLIST

### 1. **Google Cloud Console Configuration**
- [ ] OAuth 2.0 Client ID is created
- [ ] Client ID: `938238593025-7qk8l4vrtc4ct2si9dtcq5cm96u5n7u4.apps.googleusercontent.com`
- [ ] Client Secret is configured
- [ ] **Authorized JavaScript origins** include:
  - `https://rfmdbomweaskbomjhbuq.supabase.co`
  - `http://localhost:3000`
- [ ] **Authorized redirect URIs** include:
  - `https://rfmdbomweaskbomjhbuq.supabase.co/auth/v1/callback` ✅ **CRITICAL**
  - `http://localhost:3000/auth/callback`
  - `https://3000-3379bb78-cad7-48c3-87cb-d0d9ba5427e5.softgen.dev/auth/callback` ✅ **CRITICAL**

### 2. **Supabase Dashboard Configuration**
- [ ] Navigate to: **Authentication** → **Providers** → **Google**
- [ ] "Enable Sign in with Google" toggle is **ON**
- [ ] Client ID matches Google Console
- [ ] Client Secret matches Google Console
- [ ] Callback URL is: `https://rfmdbomweaskbomjhbuq.supabase.co/auth/v1/callback`

### 3. **Environment Variables**
- [ ] `.env.local` contains:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://rfmdbomweaskbomjhbuq.supabase.co
  NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
  NEXT_PUBLIC_SITE_URL=https://3000-3379bb78-cad7-48c3-87cb-d0d9ba5427e5.softgen.dev
  ```

### 4. **Wait Period**
- [ ] **IMPORTANT:** Wait 5-10 minutes after saving Google Cloud Console changes
- [ ] Google OAuth settings need time to propagate across their servers

---

## 🧪 TESTING PROCEDURE

### **Test 1: Basic Google Login Flow**

1. [ ] Open the Max Saham website homepage
2. [ ] Click the **"Login"** button in the top-right navigation
3. [ ] Auth modal opens with Login/Register tabs
4. [ ] Click **"Continue with Google"** button (white button with Chrome icon)
5. [ ] **Expected:** Google OAuth popup/redirect appears
6. [ ] Select your Google account
7. [ ] Grant permissions if asked
8. [ ] **Expected:** Redirect back to Max Saham website
9. [ ] **Expected:** Callback page shows "Completing authentication..." spinner
10. [ ] **Expected:** Redirect to homepage with user logged in
11. [ ] **Expected:** "Login" button changes to user profile/logout button

**✅ Success Criteria:**
- No error messages
- User profile created in Supabase `profiles` table
- User stays logged in after page refresh

---

### **Test 2: Profile Creation**

After successful Google login:

1. [ ] Go to Supabase Dashboard → **Table Editor** → **profiles**
2. [ ] Find your newly created profile
3. [ ] Verify fields:
   - `id` matches Supabase Auth user ID
   - `email` matches your Google account email
   - `full_name` is populated (from Google profile)
   - `is_premium` is `false` (default for new users)
   - `created_at` timestamp is present

**✅ Success Criteria:**
- Profile automatically created on first login
- All fields properly populated
- No duplicate profiles created

---

### **Test 3: Session Persistence**

1. [ ] Log in with Google
2. [ ] Wait for successful login
3. [ ] **Refresh the page (F5)**
4. [ ] **Expected:** User remains logged in
5. [ ] **Close the browser tab**
6. [ ] **Open a new tab** with the Max Saham website
7. [ ] **Expected:** User still logged in

**✅ Success Criteria:**
- Session persists across page refreshes
- Session persists in new browser tabs
- No need to re-authenticate

---

### **Test 4: Logout Flow**

1. [ ] While logged in via Google
2. [ ] Click the logout button (top-right)
3. [ ] **Expected:** User is logged out
4. [ ] **Expected:** "Login" button reappears
5. [ ] **Refresh the page**
6. [ ] **Expected:** User remains logged out

**✅ Success Criteria:**
- Logout is immediate
- Session is properly cleared
- User must re-authenticate to log back in

---

### **Test 5: Return User Login**

1. [ ] Log in with Google (first time)
2. [ ] Log out
3. [ ] Click "Login" again
4. [ ] Click "Continue with Google"
5. [ ] **Expected:** Google recognizes you and signs in immediately (no account selection)
6. [ ] **Expected:** No profile duplication in Supabase

**✅ Success Criteria:**
- Faster login for returning users
- Same profile is reused (no duplicates)
- `is_premium` status is preserved

---

## ❌ COMMON ERRORS & SOLUTIONS

### **Error: "Redirect URI mismatch"**
**Cause:** The redirect URI in your Google Cloud Console doesn't match the Supabase callback URL.

**Solution:**
1. Go to Google Cloud Console
2. Add exact URL: `https://rfmdbomweaskbomjhbuq.supabase.co/auth/v1/callback`
3. Save and wait 5-10 minutes

---

### **Error: "Invalid OAuth credentials"**
**Cause:** Client ID or Client Secret mismatch between Google Console and Supabase.

**Solution:**
1. Go to Google Cloud Console → Credentials
2. Copy the **Client ID** and **Client Secret**
3. Go to Supabase Dashboard → Authentication → Providers → Google
4. Paste the correct credentials
5. Click "Save"

---

### **Error: Stuck on "Completing authentication..."**
**Cause:** OAuth callback isn't properly handling the session.

**Solution:**
1. Check browser console for errors (F12 → Console tab)
2. Verify `src/pages/auth/callback.tsx` is working
3. Check if Supabase session is being created
4. Try clearing browser cache and cookies

---

### **Error: Profile not created in database**
**Cause:** RLS (Row Level Security) policies blocking insert.

**Solution:**
1. Go to Supabase Dashboard → SQL Editor
2. Run:
```sql
-- Check if RLS is blocking profile creation
SELECT * FROM profiles WHERE id = 'your-user-id';

-- If needed, temporarily disable RLS to test
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
```

---

### **Error: "Google hasn't verified this app"**
**Warning screen during OAuth flow.**

**Solution:**
This is normal for apps in development:
1. Click "Advanced" on the warning screen
2. Click "Go to [Your App Name] (unsafe)"
3. This only appears for unverified apps
4. Production apps should go through Google verification process

---

## 🔍 DEBUGGING TOOLS

### **Browser Console**
- Open DevTools (F12) → Console tab
- Look for errors during OAuth flow
- Check for Supabase client errors

### **Network Tab**
- Open DevTools (F12) → Network tab
- Filter: "supabase.co"
- Check for failed requests during login

### **Supabase Dashboard**
- **Authentication** → **Users**: See all registered users
- **Table Editor** → **profiles**: Verify profile creation
- **Logs**: Check for authentication errors

### **Google Cloud Console**
- **APIs & Services** → **Credentials**: Verify OAuth configuration
- Check that all redirect URIs are saved correctly

---

## 📊 SUCCESS METRICS

After completing all tests, verify:

✅ **User Experience:**
- [ ] Google login works in 1 click (after permission grant)
- [ ] No error messages during flow
- [ ] Smooth redirect experience
- [ ] User profile displays correctly

✅ **Technical:**
- [ ] No console errors
- [ ] Supabase session created successfully
- [ ] Profile record created in database
- [ ] RLS policies allow proper access

✅ **Security:**
- [ ] OAuth credentials are secure
- [ ] No API keys exposed in client code
- [ ] Redirect URIs are whitelisted only
- [ ] Sessions are properly encrypted

---

## 🚀 PRODUCTION READINESS

Before launching to production:

- [ ] **Google App Verification**: Submit for verification if serving >100 users
- [ ] **Privacy Policy**: Add privacy policy URL to Google OAuth consent screen
- [ ] **Terms of Service**: Add ToS URL to Google OAuth consent screen
- [ ] **Branding**: Upload app logo and brand colors to OAuth consent screen
- [ ] **Scope Justification**: Document why you need each OAuth scope
- [ ] **Production Redirect URIs**: Add your production domain redirect URIs
- [ ] **Remove Development URIs**: Remove localhost and staging URIs from production OAuth client

---

## 📝 FINAL VERIFICATION CHECKLIST

Before marking Google OAuth as "complete":

- [ ] All 5 test scenarios pass successfully
- [ ] No errors in browser console
- [ ] Profile creation works for new users
- [ ] Returning users can log in instantly
- [ ] Session persists across page refreshes
- [ ] Logout works correctly
- [ ] Google Cloud Console URIs are correct
- [ ] Supabase provider settings are correct
- [ ] Environment variables are set
- [ ] 10+ minute wait period after Google Console changes

---

## 🎯 NEXT STEPS AFTER VERIFICATION

Once Google OAuth is fully verified:

1. **Test with Multiple Google Accounts**
   - Personal Gmail
   - Work/Organization email
   - Different browsers

2. **Test Premium Upgrade Flow**
   - Login with Google
   - Upgrade to premium membership
   - Verify `is_premium` flag updates

3. **Test Access Control**
   - Free user cannot access premium content
   - Premium user can access premium content
   - Proper redirects for unauthorized access

4. **Monitor Supabase Auth Logs**
   - Check for failed login attempts
   - Monitor for suspicious activity
   - Track user registration rate

---

## ⚠️ IMPORTANT NOTES

1. **First-Time Setup Delay**: Google OAuth changes take 5-10 minutes to propagate
2. **Development Warning**: Google shows a warning for unverified apps in development mode
3. **Email Confirmation**: Supabase may require email confirmation depending on your settings
4. **Rate Limits**: Google OAuth has rate limits (handle gracefully in production)
5. **HTTPS Required**: OAuth only works over HTTPS (except localhost)

---

## 📞 SUPPORT RESOURCES

- **Supabase Auth Docs**: https://supabase.com/docs/guides/auth
- **Google OAuth Setup**: https://developers.google.com/identity/protocols/oauth2
- **Next.js Auth Guide**: https://nextjs.org/docs/authentication
- **Softgen Support**: Contact if you encounter persistent issues

---

**Last Updated:** 2025-12-04  
**Status:** Ready for Testing  
**Priority:** High - Required for user authentication
