const https = require('https');

// Load environment variables from .env.local
const fs = require('fs');
const path = require('path');

try {
  const envPath = path.join(__dirname, '.env.local');
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length) {
      const value = valueParts.join('=').trim();
      process.env[key.trim()] = value;
    }
  });
} catch (error) {
  console.error('Failed to load .env.local:', error.message);
  process.exit(1);
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing environment variables');
  console.error('SUPABASE_URL:', SUPABASE_URL);
  console.error('SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY ? 'Present' : 'Missing');
  process.exit(1);
}

const emailData = JSON.stringify({
  to: 'test-00a2crwhx@srv1.mail-tester.com',
  subject: 'Test Email from Max Saham - Deliverability Check',
  html: '', // Will use the registration template
  type: 'registration',
  userName: 'Mail Tester Team'
});

const url = new URL(`${SUPABASE_URL}/functions/v1/send-email`);

const options = {
  hostname: url.hostname,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Length': emailData.length
  }
};

console.log('📧 Sending test email to mail-tester.com...');
console.log('Target:', 'test-00a2crwhx@srv1.mail-tester.com');

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Response Status:', res.statusCode);
    console.log('Response Body:', body);
    
    if (res.statusCode === 200) {
      console.log('✅ Email sent successfully!');
      console.log('🔍 Check your mail-tester.com score now!');
    } else {
      console.log('❌ Failed to send email');
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Error:', e.message);
});

req.write(emailData);
req.end();