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

// All test email addresses
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
  'gabrielcooper8973@gmail.com',
  'paigebrown6148@gmail.com',
  'zacharythompson2847@gmail.com',
  'emilysanchez4791@gmail.com',
  'owenrussell7921@gmail.com',
  'carterbutler5682@gmail.com',
  'averymartin4018@gmail.com',
  'lilygonzalez8261@gmail.com',
  'ethanmurphy9407@gmail.com',
  'savannahturner6053@gmail.com',
  'hudsonwright4196@gmail.com',
  'nataliehill7281@gmail.com',
  'jacobroberts58291@gmail.com',
  'zoeycollins9087@gmail.com',
  'dylanmorris2547@gmail.com',
  'madelinecook6398@gmail.com',
  'owenjackson7015@gmail.com',
  'audreymorgan1285@gmail.com',
  'noahwoodward9456@gmail.com',
  'clairekelly3769@gmail.com',
  'brooklynrogers2937@gmail.com',
  'ronaldtaylor1265@mail.ru',
  'lindadavis451@mail.ru',
  'torben.russel@yandex.ru',
  'karan.bell@yandex.ru',
  'team-ed@m365.easydmarc.com',
  'team-ed@m365.easydmarc.co.uk',
  'team-ed@m365.easydmarc.nl',
  'team-ed@m365.easydmarc.email',
  'team-ed@m365.easydmarc.help',
  'jonathan.shumacher@freenet.de',
  'easydmarc@interia.pl',
  'clarapearce16@aol.com',
  'victoryoung939@aol.com',
  'holmes_abel@aol.com',
  'lucidodson585@aol.com',
  'westemily343@aol.com',
  'adalinemcintosh69@aol.com',
  'leejack380@aol.com',
  'ed-global@seznam.cz',
  'ed-global2@seznam.cz',
  'easydmarc@sfr.fr',
  'hag@checkphishing.com',
  'ed-global@workmail.easydmarc.com',
  'ed-global2@workmail.easydmarc.com',
  'amayathompson6274@gmx.com',
  'finleyroberts9501@gmx.com',
  'arianawalker3816@gmx.com',
  'asherrussell7192@gmx.com',
  'adrianawilson5031@gmx.com',
  'lucahamilton2954@gmx.com',
  'elliebutler6109@gmx.com',
  'xaviercook1982@gmx.com',
  'skylarhughes5287@gmx.com',
  'oliverrodriguez8173@gmx.com',
  'evelynedwards6947@gmx.com',
  'elliotprice4138@gmx.com',
  'saranichols8625@gmx.com',
  'milesward2517@gmx.com',
  'paigehoward2421@gmx.com',
  'ziggybeltran@yahoo.com',
  'myers.ridley@yahoo.com',
  'aiylacortes@yahoo.com',
  'miller.burton35@yahoo.com',
  'sandy.allen7663@yahoo.com',
  'burriscassidy156@yahoo.com',
  'hillnancy886@yahoo.com',
  'fitzpatrickedgar@yahoo.com',
  'ed-global@op.pl',
  'ed-global@onet.pl',
  'team-ed@dmarc.am',
  'team-ed@easydmarc.co.uk',
  'team-ed@easydmarc.email',
  'team-ed@easydmarc.help',
  'team-ed@easydmarc.nl',
  'norawoodard6719@zohomail.com',
  'henrymartinez2864@zohomail.com',
  'leohenderson1295@zohomail.com',
  'jackcoleman2964@zohomail.com',
  'harperroberts9350@zohomail.com',
  'sydneypeterson9012@zohomail.com',
  'evabennett2045@zohomail.com',
  'julianramirez4758@zohomail.com',
  'arielturner5704@zohomail.com',
  'ivycollins6097@zohomail.com',
  'ed-global@libero.it',
  'vincentmarshall9240@outlook.com',
  'sophiawright1707@outlook.com',
  'nataliemorris4018@outlook.com',
  'lucasrivera5629@outlook.com',
  'camillemurray5964@outlook.com',
  'alexandergreen31867@outlook.com',
  'ameliawilson5167@outlook.com',
  'isaacperry6239@outlook.com',
  'zarahamilton3196@outlook.com',
  'sebastiansanders4862@outlook.com',
  'elisabethpowell7854@outlook.com',
  'joshuarobinson1629@outlook.com',
  'madisonharris4185@outlook.com',
  'jonathanrodriguez7549@outlook.com',
  'benjaminprice2195@outlook.com',
  'lillianwoodard64191@outlook.com',
  'elijahbailey39781@outlook.com',
  'scarlettcoleman6237@outlook.com',
  'victoriaroberts85075@outlook.com',
  'ryangonzalez2164@outlook.com',
  'easydmarc@laposte.net',
  'hkhatchoian@icloud.com',
  'ed-global@bluetiehome.com',
  'ed-global@centrum.cz',
  'easydmarc@free.fr',
  'jonathan.shumacher@web.de',
  'ed-global@att.net',
  'jonathan.shumacher@t-online.de',
  'jonathan.shumacher@gmx.de'
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

// Batch sending with rate limiting
async function sendInBatches() {
  const BATCH_SIZE = 20;
  const BATCH_DELAY = 300000; // 5 minutes in milliseconds
  const totalBatches = Math.ceil(testEmails.length / BATCH_SIZE);
  
  console.log('🚀 Starting DMARC Test Email Campaign');
  console.log(`📊 Total emails: ${testEmails.length}`);
  console.log(`📦 Batches: ${totalBatches} (${BATCH_SIZE} emails per batch)`);
  console.log(`⏱️  Estimated time: ~${(totalBatches - 1) * 5} minutes\n`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < totalBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, testEmails.length);
    const batch = testEmails.slice(start, end);
    
    console.log(`\n📤 Batch ${i + 1}/${totalBatches} - Sending to ${batch.length} addresses...`);
    
    // Send all emails in current batch with rate limiting
    const results = [];
    for (const email of batch) {
      const result = await sendEmail(email);
      results.push(result);
      // Respect Resend's 2 req/sec rate limit
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Count successes and failures
    results.forEach(result => {
      if (result.success) {
        successCount++;
        console.log(`  ✅ ${result.email}`);
      } else {
        failCount++;
        console.log(`  ❌ ${result.email} - ${result.error}`);
      }
    });
    
    console.log(`\n✅ Batch ${i + 1} complete: ${successCount} sent, ${failCount} failed`);
    
    // Wait 5 minutes before next batch (except for last batch)
    if (i < totalBatches - 1) {
      console.log(`⏳ Waiting 5 minutes before next batch...`);
      await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('🎉 DMARC Test Campaign Complete!');
  console.log(`✅ Successfully sent: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📊 Total: ${testEmails.length}`);
  console.log('='.repeat(60));
  console.log('\n💡 Next steps:');
  console.log('1. Wait 10-15 minutes for emails to be processed');
  console.log('2. Check your DMARC test results dashboard');
  console.log('3. Verify SPF, DKIM, and DMARC alignment');
}

// Run the batch sending
sendInBatches().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});