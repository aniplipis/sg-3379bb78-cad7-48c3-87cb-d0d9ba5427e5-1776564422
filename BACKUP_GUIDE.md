# Website Backup Guide

This guide covers multiple backup methods for your MAX SAHAM website.

## 🎯 Quick Backup Checklist

### What to Backup:
- ✅ **Codebase** (all files in this project)
- ✅ **Database** (Supabase PostgreSQL data)
- ✅ **Storage** (uploaded files in Supabase Storage)
- ✅ **Environment Variables** (.env.local)
- ✅ **Configuration** (Stripe, Supabase settings)

---

## Method 1: Download from Softgen (Easiest)

### Step 1: Download Project ZIP
1. In Softgen interface, click the **Settings** icon (top right)
2. Select **"Download Project"**
3. This downloads a complete ZIP of all your code files
4. Save this ZIP file to your computer (e.g., `max-saham-backup-2025-12-16.zip`)

### What's Included:
- ✅ All source code files
- ✅ Configuration files
- ✅ Package.json dependencies
- ❌ NOT included: Database data, uploaded files, environment secrets

---

## Method 2: Clone from GitHub (Recommended)

### Step 1: Clone Repository
```bash
# On your local computer, open terminal and run:
git clone [your-github-repo-url] max-saham-backup
cd max-saham-backup

# This downloads the entire codebase with version history
```

### Step 2: Create a Complete Backup Archive
```bash
# Create a timestamped backup
tar -czf max-saham-backup-$(date +%Y%m%d).tar.gz .

# Or use ZIP
zip -r max-saham-backup-$(date +%Y%m%d).zip .
```

### What's Included:
- ✅ All source code with git history
- ✅ Configuration files
- ✅ Package.json dependencies
- ❌ NOT included: Database data, uploaded files, environment secrets

---

## Method 3: Backup Supabase Database (Critical!)

### Option A: Using Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project**: MAX SAHAM
3. **Database Backups**:
   - Click **"Database"** in left sidebar
   - Click **"Backups"** tab
   - Click **"Create Backup"** button
   - Name it: `max-saham-manual-backup-2025-12-16`

4. **Download Backup**:
   - Click the **"..."** menu on your backup
   - Select **"Download"**
   - Saves as `.sql` file to your computer

### Option B: Using SQL Query (Alternative)

I can help you export specific tables:

```sql
-- Export profiles table
COPY (SELECT * FROM profiles) TO STDOUT WITH CSV HEADER;

-- Export memberships table
COPY (SELECT * FROM memberships) TO STDOUT WITH CSV HEADER;

-- Export videos table
COPY (SELECT * FROM videos) TO STDOUT WITH CSV HEADER;

-- Export downloads table
COPY (SELECT * FROM downloads) TO STDOUT WITH CSV HEADER;
```

### What's Included:
- ✅ All database tables and data
- ✅ User profiles and memberships
- ✅ Content metadata (videos, downloads)
- ✅ Relationships and foreign keys
- ❌ NOT included: Actual files in storage

---

## Method 4: Backup Supabase Storage Files

### Using Supabase Dashboard:

1. **Go to Storage**: https://supabase.com/dashboard → Storage
2. **Download buckets**:
   - Click each bucket (e.g., `public`, `uploads`)
   - Select all files
   - Click **"Download"** button
   - Saves files to your computer

### What's Included:
- ✅ All uploaded images
- ✅ User avatars
- ✅ Testimonial photos
- ✅ Course materials (if any)

---

## Method 5: Backup Environment Variables

### Manually Save Your Secrets:

Create a file `env-backup.txt` (NEVER commit to git!) with:

```bash
# MAX SAHAM Environment Variables Backup
# Date: 2025-12-16
# KEEP THIS FILE SECURE - Contains sensitive data!

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Vercel (if using)
VERCEL_URL=your_vercel_url
```

**⚠️ SECURITY WARNING:**
- Store this file in a SECURE location (password-protected folder, encrypted drive)
- NEVER commit to GitHub
- NEVER share publicly
- Consider using a password manager like 1Password or LastPass

---

## Method 6: Complete Automated Backup Script

I can create a backup script that does everything automatically:

```bash
#!/bin/bash
# complete-backup.sh

DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="max-saham-backup-$DATE"

# Create backup directory
mkdir -p $BACKUP_DIR

# 1. Backup code
echo "Backing up code..."
git archive --format=zip HEAD > $BACKUP_DIR/code.zip

# 2. Backup environment (you'll need to provide actual values)
echo "Backing up environment variables..."
cp .env.local $BACKUP_DIR/env.backup

# 3. Instructions for manual steps
cat > $BACKUP_DIR/README.txt << EOF
MAX SAHAM Backup - $DATE

This backup includes:
✅ Source code (code.zip)
✅ Environment variables (env.backup)

MANUAL STEPS REQUIRED:
1. Download Supabase database backup from dashboard
2. Download Supabase storage files from dashboard
3. Save Stripe configuration settings

See BACKUP_GUIDE.md for detailed instructions.
EOF

echo "Backup created in: $BACKUP_DIR"
echo "Next: Follow manual steps in $BACKUP_DIR/README.txt"
```

---

## 📋 Complete Backup Checklist

### Weekly Backups:
- [ ] Download latest code from GitHub
- [ ] Create Supabase database backup
- [ ] Verify backups are accessible

### Monthly Backups:
- [ ] Full database export to .sql file
- [ ] Download all Supabase storage files
- [ ] Document any configuration changes
- [ ] Update environment variables backup

### Before Major Changes:
- [ ] Complete backup of everything
- [ ] Test restore process
- [ ] Document current state

---

## 🔄 How to Restore from Backup

### Restore Code:
1. Unzip the backup file
2. Run `npm install` to install dependencies
3. Copy `.env.local` with your secrets
4. Run `npm run dev` to test locally

### Restore Database:
1. In Supabase Dashboard → Database → Backups
2. Click **"Restore"** on your backup
3. Or use SQL: `psql -h your-db-url -U postgres -d postgres < backup.sql`

### Restore Storage Files:
1. In Supabase Dashboard → Storage
2. Upload files back to appropriate buckets
3. Verify file URLs are accessible

---

## 💡 Best Practices

### DO:
- ✅ Backup before major changes
- ✅ Keep multiple backup versions
- ✅ Test restore process regularly
- ✅ Store backups in multiple locations
- ✅ Encrypt sensitive backups

### DON'T:
- ❌ Commit `.env.local` to GitHub
- ❌ Store backups only in one place
- ❌ Forget to backup database regularly
- ❌ Share backup files containing secrets
- ❌ Wait until emergency to learn restore process

---

## 🆘 Emergency Recovery

If you lose access to everything:

1. **Code**: Clone from GitHub (always push changes!)
2. **Database**: Restore from Supabase automatic backups (7-day retention)
3. **Environment Variables**: Regenerate from respective services
4. **Storage**: Re-upload files if you have local copies

---

## 📞 Need Help?

If you're unsure about any backup step, I can:
- Export your database tables for you
- Create a custom backup script
- Guide you through the restore process
- Help document your specific configuration

Just ask! 🚀