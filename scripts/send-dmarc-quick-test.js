const https = require('https');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
try {
  const envPath = path.join(__dirname, '..', '.env.local');
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
  process.exit(1);
}

// Quick test with 10 emails
const testEmails = [
  'lucindasmith7291@gmail.com',
  'marcusrodriguez5042@gmail.com',
  'felicitynguyen9015@gmail.com',
  'donovanwilliams2876@gmail.com',
  'cynthiawilson6329@gmail.com',
  'elliotthughes4158@gmail.com',
  'mackenzieparker92032@gmail.com',
  'lincolnadams5634@gmail.com',
  'isabellahall3816@gmail.com',
  'gabrielcooper8973@gmail.com'
];

// DMARC verification email template
const createDMARCEmail = (code) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .content {
      background: #ffffff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-top: none;
      border-radius: 0 0 8px 8px;
    }
    .code-box {
      background: #f5f5f5;
      border: 2px solid #667eea;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      margin: 20px 0;
    }
    .code {
      font-size: 32px;
      font-weight: bold;
      color: #667eea;
      letter-spacing: 4px;
      font-family: 'Courier New', monospace;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔐 DMARC Verification Test</h1>
    <p>Max Saham Email Authentication</p>
  </div>
  <div class="content">
    <h2>DMARC Configuration Test</h2>
    <p>This email is part of a DMARC authentication test for <strong>abgmax.maxsaham.com</strong></p>
    
    <div class="code-box">
      <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Verification Code:</p>
      <div class="code">${code}</div>
    </div>
    
    <p><strong>Test Details:</strong></p>
    <ul>
      <li>Domain: abgmax.maxsaham.com</li>
      <li>Sender: admin@abgmax.maxsaham.com</li>
      <li>Test Type: DMARC Authentication</li>
      <li>Date: ${new Date().toISOString().split('T')[0]}</li>
    </ul>
    
    <p style="color: #666; font-size: 14px; margin-top: 30px;">
      This is an automated test email. No action is required from you.
    </p>
  </div>
  <div class="footer">
    <p>© ${new Date().getFullYear()} Max Saham - Team Max Saham</p>
    <p>This email was sent as part of email authentication testing</p>
  </div>
</body>
</html>
`;

// Send email function
function sendEmail(email) {
  return new Promise((resolve, reject) => {
    const functionUrl = new URL(SUPABASE_URL);
    const emailData = JSON.stringify({
      to: email,
      subject: 'DMARC Verification Test - Max Saham',
      html: createDMARCEmail('3NENODWAMKA'),
      type: 'custom'
    });

    const options = {
      hostname: functionUrl.hostname,
      path: '/functions/v1/send-email',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Length': Buffer.byteLength(emailData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ email, success: true });
        } else {
          resolve({ email, success: false, error: data });
        }
      });
    });

    req.on('error', (e) => {
      resolve({ email, success: false, error: e.message });
    });

    req.write(emailData);
    req.end();
  });
}

// Quick test - send all at once
async function runQuickTest() {
  console.log('🚀 Quick DMARC Test (10 emails)');
  console.log('📊 Verification Code: 3NENODWAMKA');
  console.log('⏱️  Estimated time: ~30 seconds\n');

  let successCount = 0;
  let failCount = 0;

  console.log('📤 Sending to 10 test addresses...\n');
  
  // Send all emails simultaneously
  const results = await Promise.all(testEmails.map(email => sendEmail(email)));
  
  // Display results
  results.forEach(result => {
    if (result.success) {
      successCount++;
      console.log(`  ✅ ${result.email}`);
    } else {
      failCount++;
      console.log(`  ❌ ${result.email} - ${result.error}`);
    }
  });
  
  console.log('\n' + '='.repeat(60));
  console.log('🎉 Quick Test Complete!');
  console.log(`✅ Successfully sent: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📊 Total: ${testEmails.length}`);
  console.log('='.repeat(60));
  
  if (successCount > 0) {
    console.log('\n✅ Test successful! Ready to run full campaign with all 130 emails.');
    console.log('💡 Run: node scripts/send-dmarc-test.js (for full campaign)');
  }
}

// Run the quick test
runQuickTest().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});