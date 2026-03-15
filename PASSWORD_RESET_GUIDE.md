# Password Reset Guide for Team Max Saham

## Overview
This guide provides standardized instructions for resetting user passwords in the Team Max Saham platform.

---

## Method 1: Automated Password Reset Email (RECOMMENDED)

### Step 1: Trigger Password Reset via API
Use the test API endpoint to trigger a password reset email:

```bash
# Navigate to your browser and go to:
https://maxsaham.com/api/test/send-password-reset-email?email=USER_EMAIL_HERE

# Example:
https://maxsaham.com/api/test/send-password-reset-email?email=enraf@yahoo.com
```

### Step 2: User Receives Email
The user will receive an email with:
- ✅ Clear subject: "🔐 Reset Your Password - Team Max Saham"
- ✅ Professional HTML template
- ✅ Secure password reset link (expires in 1 hour)
- ✅ Step-by-step instructions
- ✅ Security warnings
- ✅ WhatsApp support contact

### Step 3: User Clicks Reset Link
The user clicks the "Reset Password Sekarang" button in the email, which:
- Takes them to the password reset page
- Allows them to enter a new password
- Confirms the new password
- Updates their account

### Step 4: User Logs In
The user can now log in with their new password.

---

## Method 2: Manual Password Reset via Supabase Dashboard

### Step 1: Access Supabase Dashboard
1. Go to Database tab in Softgen project settings
2. Click "Users" section
3. Find the user by email

### Step 2: Trigger Password Reset
1. Click on the user's row
2. Click "Send password recovery email"
3. User receives Supabase default email (not custom template)

### Step 3: User Follows Email Link
User clicks link in email and sets new password.

---

## Method 3: Admin Manual Password Update (LAST RESORT)

### Step 1: Access Supabase Dashboard
1. Go to Database tab → Users section
2. Find the user by email

### Step 2: Update Password Manually
1. Click "Update user"
2. Enter new password
3. Click "Save"
4. Contact user via WhatsApp/email with new password
5. Instruct user to change password after first login

---

## Testing Password Reset for enraf@yahoo.com

### Execute Reset
```bash
# Open in browser:
https://maxsaham.com/api/test/send-password-reset-email?email=enraf@yahoo.com
```

### Expected Result
```json
{
  "success": true,
  "message": "Password reset email sent to enraf@yahoo.com",
  "data": {
    "emailSent": true
  }
}
```

### User Flow
1. ✅ User (enraf@yahoo.com) receives email within 1-2 minutes
2. ✅ User clicks "Reset Password Sekarang" button
3. ✅ User is redirected to: `https://maxsaham.com/auth/reset-password?token=...`
4. ✅ User enters new password (minimum 6 characters)
5. ✅ User confirms new password
6. ✅ Password is updated
7. ✅ User can log in with new password

---

## Email Template Features

### Professional Design
- ✅ Team Max Saham logo
- ✅ Red gradient header for urgency
- ✅ Clear call-to-action button
- ✅ Mobile-responsive design

### Security Features
- ✅ Security warning notice
- ✅ 1-hour expiration notice
- ✅ "Didn't request this?" message
- ✅ WhatsApp support contact

### User Instructions
- ✅ Clear 6-step guide
- ✅ Visual emphasis on important steps
- ✅ Fallback instructions if link doesn't work
- ✅ Contact support section

---

## Troubleshooting

### User Didn't Receive Email
1. Check spam/junk folder
2. Verify email address is correct
3. Wait 5 minutes (email delivery can be slow)
4. Try Method 2 or 3 as backup

### Reset Link Expired
1. User can request new reset link
2. Links expire after 1 hour for security
3. Use API endpoint to send new email

### User Can't Access Email
1. Use Method 3 to manually set password
2. Contact user via WhatsApp: +60 11-5411 0086
3. Provide temporary password
4. Instruct user to change password after login

---

## Standard Operating Procedure

### For Regular Password Resets
1. **Use Method 1 (API endpoint)** - automated, professional, secure
2. **Verify email sent successfully**
3. **Monitor for user confirmation** (within 24 hours)
4. **Follow up via WhatsApp** if no response after 24 hours

### For Urgent Password Resets
1. **Use Method 3** - immediate manual update
2. **Contact user via WhatsApp immediately**
3. **Provide temporary password**
4. **Instruct user to change password on first login**

### For Bulk Password Resets
1. Create CSV file with user emails
2. Use bulk email API endpoint (to be created if needed)
3. Monitor success rate
4. Follow up with users who didn't receive email

---

## API Endpoint Details

### Send Password Reset Email
**Endpoint:** `/api/test/send-password-reset-email`  
**Method:** `GET`  
**Parameters:**
- `email` (required): User's email address

**Example:**
```
https://maxsaham.com/api/test/send-password-reset-email?email=user@example.com
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent to user@example.com",
  "data": {
    "emailSent": true
  }
}
```

---

## Security Best Practices

1. ✅ **Never share passwords via email or WhatsApp**
2. ✅ **Always use password reset links** (Method 1 preferred)
3. ✅ **Verify user identity before manual reset** (Method 3)
4. ✅ **Instruct users to change temporary passwords immediately**
5. ✅ **Monitor suspicious password reset requests**
6. ✅ **Log all password reset activities**

---

## Next Steps for enraf@yahoo.com

1. ✅ Navigate to: `https://maxsaham.com/api/test/send-password-reset-email?email=enraf@yahoo.com`
2. ✅ Verify API response shows success
3. ✅ Confirm with user that email was received
4. ✅ Guide user through password reset process if needed
5. ✅ Verify user can log in with new password

---

## Support Contact

**WhatsApp:** +60 11-5411 0086  
**Email:** noreply@abgmax.maxsaham.com  
**Website:** https://maxsaham.com

---

*Last Updated: March 15, 2026*  
*Version: 1.0*