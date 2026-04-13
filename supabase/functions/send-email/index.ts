import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  type?: 'registration' | 'payment' | 'password-reset' | 'custom';
  userName?: string;
  membershipType?: string;
}

async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { to, subject, html, type, userName, membershipType } = await req.json() as EmailRequest;
    
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    let emailContent = html;
    
    // Generate email templates based on type
    if (type === 'registration') {
      emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.8; 
              color: #333; 
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 20px auto; 
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #D4AF37 0%, #1E90FF 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .logo {
              max-width: 150px;
              height: auto;
              margin-bottom: 20px;
              border-radius: 8px;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            .content { 
              padding: 40px 30px;
              background: white;
            }
            .greeting {
              font-size: 20px;
              font-weight: bold;
              color: #333;
              margin-bottom: 20px;
            }
            .intro {
              font-size: 16px;
              color: #555;
              margin-bottom: 30px;
              line-height: 1.8;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #D4AF37;
              margin: 30px 0 15px 0;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .steps {
              background: #f9f9f9;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #D4AF37;
              margin: 20px 0;
            }
            .step {
              margin: 12px 0;
              padding-left: 10px;
              font-size: 15px;
              color: #444;
            }
            .benefits {
              background: #f0f9ff;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #1E90FF;
              margin: 20px 0;
            }
            .benefit-item {
              margin: 10px 0;
              padding-left: 10px;
              font-size: 15px;
              color: #444;
            }
            .button { 
              display: inline-block; 
              background: #D4AF37; 
              color: white !important; 
              padding: 16px 40px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 25px 0;
              font-weight: bold;
              font-size: 16px;
              text-align: center;
              box-shadow: 0 4px 6px rgba(212, 175, 55, 0.3);
            }
            .button:hover {
              background: #c49b2e;
            }
            .whatsapp-button {
              display: inline-block;
              background: #25D366;
              color: white !important;
              padding: 14px 30px;
              text-decoration: none;
              border-radius: 8px;
              margin: 20px 0;
              font-weight: bold;
              font-size: 15px;
              text-align: center;
              box-shadow: 0 4px 6px rgba(37, 211, 102, 0.3);
            }
            .whatsapp-button:hover {
              background: #20bd5a;
            }
            .disclaimer {
              background: #fff9e6;
              border: 2px solid #ffd700;
              border-radius: 8px;
              padding: 25px;
              margin: 30px 0;
              font-size: 13px;
              color: #666;
              line-height: 1.8;
            }
            .disclaimer-title {
              font-size: 16px;
              font-weight: bold;
              color: #d97706;
              margin-bottom: 15px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .disclaimer p {
              margin: 10px 0;
            }
            .disclaimer ul {
              margin: 15px 0;
              padding-left: 20px;
            }
            .disclaimer li {
              margin: 8px 0;
            }
            .footer { 
              text-align: center; 
              padding: 30px 20px; 
              background: #f9f9f9;
              color: #666; 
              font-size: 14px;
              border-top: 1px solid #eee;
            }
            .footer-tagline {
              font-size: 16px;
              color: #D4AF37;
              font-weight: bold;
              margin: 15px 0;
            }
            .emoji {
              font-size: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header with Logo -->
            <div class="header">
              <img src="https://maxsaham.com/LOGO-square-for-rounded-crop.jpg" alt="Max Saham Logo" class="logo">
              <h1><span class="emoji">🎉</span> Welcome to Team Max Saham!</h1>
            </div>
            
            <!-- Main Content -->
            <div class="content">
              <!-- Greeting -->
              <div class="greeting">
                Hi ${userName || 'Trader'}, <span class="emoji">🚀</span>
              </div>
              
              <!-- Introduction -->
              <div class="intro">
                Terima kasih kerana mendaftar dengan <strong>Team Max Saham</strong>! Kami amat berbesar hati untuk bantu anda dalam perjalanan belajar FCPO trading dengan lebih jelas, tersusun, serta berfokus kepada pengurusan risiko.
              </div>
              
              <!-- What You Can Do Now -->
              <div class="section-title">
                <span class="emoji">✔</span> Apa yang anda boleh lakukan sekarang
              </div>
              <div class="steps">
                <div class="step">1️⃣ Log masuk ke akaun anda</div>
                <div class="step">2️⃣ Lengkapkan profil</div>
                <div class="step">3️⃣ Pilih plan / membership yang sesuai</div>
                <div class="step">4️⃣ Akses video, notes & resources</div>
                <div class="step">5️⃣ Join Telegram Support Group (jika berkenaan)</div>
              </div>
              
              <!-- Dashboard Button -->
              <div style="text-align: center;">
                <a href="${Deno.env.get('NEXT_PUBLIC_APP_URL') || 'https://maxsaham.com'}/members" class="button">
                  👉 Access Dashboard
                </a>
              </div>
              
              <!-- What You Will Get -->
              <div class="section-title">
                <span class="emoji">🧑‍💻</span> Apa yang anda akan dapat
              </div>
              <div class="benefits">
                <div class="benefit-item">📚 Basic learning material</div>
                <div class="benefit-item">🎥 Video tutorial peringkat asas</div>
                <div class="benefit-item">📖 Akses ke eBook</div>
                <div class="benefit-item">📊 Akses ke indicator terpilih</div>
              </div>
              
              <!-- Need Help -->
              <div class="section-title">
                <span class="emoji">💬</span> Perlu bantuan?
              </div>
              <p style="margin-bottom: 10px; color: #555;">Hubungi kami bila-bila masa!</p>
              <div style="text-align: center;">
                <a href="https://wa.me/60115411008" class="whatsapp-button">
                  👉 Hubungi melalui WhatsApp
                </a>
              </div>
              
              <!-- Disclaimer -->
              <div class="disclaimer">
                <div class="disclaimer-title">
                  ⚠️ Penting – Disclaimer
                </div>
                
                <p><strong>Max Saham bukan penasihat pelaburan atau broker berdaftar.</strong></p>
                
                <p>Semua kandungan adalah untuk <strong>tujuan pendidikan sahaja</strong> dan bukan saranan untuk membeli atau menjual sebarang sekuriti atau derivatif.</p>
                
                <p><strong>Trading futures melibatkan risiko kerugian modal.</strong> Prestasi lalu tidak menjamin keputusan pada masa hadapan. Sila rujuk licensed Financial Planner / Advisor sekiranya memerlukan nasihat profesional.</p>
                
                <p style="margin-top: 15px;"><strong>Dengan meneruskan pendaftaran & penggunaan platform, anda bersetuju bahawa:</strong></p>
                
                <ul>
                  <li>anda memahami risiko FCPO,</li>
                  <li>anda bertanggungjawab ke atas keputusan trading anda,</li>
                  <li>dan Team Max Saham tidak bertanggungjawab terhadap sebarang kerugian kewangan.</li>
                </ul>
              </div>
              
              <!-- Closing -->
              <div style="margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f0f0;">
                <h3 style="color: #D4AF37; font-size: 20px; margin-bottom: 15px;">
                  <span class="emoji">🚀</span> Selamat datang ke komuniti Max Saham!
                </h3>
                <p style="font-size: 16px; color: #555; line-height: 1.8;">
                  Kami percaya bahawa <strong>pendidikan + disiplin = longevity</strong> dalam futures market.<br>
                  Let's grow together!
                </p>
                <p style="font-size: 16px; color: #555; margin-top: 20px;">
                  Jumpa anda dalam dashboard! <span class="emoji">💛</span>
                </p>
                <p style="font-size: 15px; color: #888; margin-top: 25px; font-style: italic;">
                  — Team Max Saham
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <div class="footer-tagline">Professional FCPO Trading Education</div>
              <p style="margin: 10px 0;">© 2025 Team Max Saham. All rights reserved.</p>
              <p style="margin: 10px 0; font-size: 13px;">
                <a href="https://maxsaham.com" style="color: #D4AF37; text-decoration: none;">maxsaham.com</a> | 
                <a href="https://wa.me/60115411008" style="color: #25D366; text-decoration: none;">WhatsApp Support</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (type === 'payment') {
      emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #333;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 20px auto; 
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #10B981 0%, #059669 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .logo {
              max-width: 150px;
              height: auto;
              margin-bottom: 20px;
              border-radius: 8px;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            .content { 
              padding: 40px 30px;
              background: white;
            }
            .success-badge { 
              background: #10B981; 
              color: white; 
              padding: 12px 24px; 
              border-radius: 25px; 
              display: inline-block; 
              margin: 20px 0;
              font-weight: bold;
              font-size: 18px;
            }
            .button { 
              display: inline-block; 
              background: #D4AF37; 
              color: white !important; 
              padding: 16px 40px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 25px 0;
              font-weight: bold;
              font-size: 16px;
              text-align: center;
              box-shadow: 0 4px 6px rgba(212, 175, 55, 0.3);
            }
            .button:hover {
              background: #c49b2e;
            }
            .details { 
              background: #f0f9ff; 
              padding: 25px; 
              border-radius: 8px; 
              margin: 25px 0;
              border-left: 4px solid #1E90FF;
            }
            .details h3 {
              margin-top: 0;
              color: #1E90FF;
              font-size: 18px;
            }
            .details p {
              margin: 10px 0;
              font-size: 15px;
            }
            .benefits {
              margin: 25px 0;
            }
            .benefits h3 {
              color: #D4AF37;
              font-size: 18px;
              margin-bottom: 15px;
            }
            .benefits ul {
              list-style: none;
              padding: 0;
            }
            .benefits li {
              padding: 8px 0;
              font-size: 15px;
              color: #444;
            }
            .contact-section {
              background: #f9f9f9;
              padding: 20px;
              border-radius: 8px;
              margin: 25px 0;
              text-align: center;
            }
            .whatsapp-link {
              color: #25D366;
              text-decoration: none;
              font-weight: bold;
              font-size: 16px;
            }
            .footer { 
              text-align: center; 
              padding: 30px 20px; 
              background: #f9f9f9;
              color: #666; 
              font-size: 14px;
              border-top: 1px solid #eee;
            }
            .footer-tagline {
              font-size: 16px;
              color: #D4AF37;
              font-weight: bold;
              margin: 15px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://maxsaham.com/LOGO-square-for-rounded-crop.jpg" alt="Max Saham Logo" class="logo">
              <h1>✅ Payment Successful!</h1>
            </div>
            <div class="content">
              <div style="text-align: center;">
                <div class="success-badge">🎉 Pembayaran Berjaya!</div>
              </div>
              
              <h2 style="color: #333; font-size: 22px; margin: 30px 0 20px 0;">Terima Kasih, ${userName || 'Trader'}!</h2>
              <p style="font-size: 16px; color: #555; line-height: 1.8;">
                Pembayaran anda telah berjaya diproses. Sekarang anda boleh akses semua content premium kami!
              </p>
              
              <div class="details">
                <h3>Membership Details:</h3>
                <p><strong>Package:</strong> ${membershipType || 'Premium Membership'}</p>
                <p><strong>Status:</strong> Active ✓</p>
                <p><strong>Access:</strong> Full Access to All Resources</p>
              </div>
              
              <div class="benefits">
                <h3>Apa Yang Anda Dapat:</h3>
                <ul>
                  <li>✅ Access to all premium video tutorials</li>
                  <li>✅ Downloadable trading notes and guides</li>
                  <li>✅ Live class recordings</li>
                  <li>✅ Private Telegram group access</li>
                  <li>✅ Weekly market analysis</li>
                </ul>
              </div>
              
              <div style="text-align: center;">
                <a href="${Deno.env.get('NEXT_PUBLIC_APP_URL') || 'https://maxsaham.com'}/members" class="button">
                  Start Learning Now 🚀
                </a>
              </div>
              
              <div class="contact-section">
                <p style="margin-bottom: 10px;"><strong>Questions?</strong> Reach out anytime:</p>
                <p>WhatsApp: <a href="https://wa.me/60115411008" class="whatsapp-link">+60 11-5411 0086</a></p>
              </div>
            </div>
            <div class="footer">
              <div class="footer-tagline">Professional FCPO Trading Education</div>
              <p style="margin: 10px 0;">© 2025 Team Max Saham. All rights reserved.</p>
              <p style="margin: 10px 0; font-size: 13px;">
                <a href="https://maxsaham.com" style="color: #D4AF37; text-decoration: none;">maxsaham.com</a> | 
                <a href="https://wa.me/60115411008" style="color: #25D366; text-decoration: none;">WhatsApp Support</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (type === 'password-reset') {
      emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.8; 
              color: #333; 
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 20px auto; 
              background: white;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header { 
              background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); 
              color: white; 
              padding: 40px 30px; 
              text-align: center;
            }
            .logo {
              max-width: 150px;
              height: auto;
              margin-bottom: 20px;
              border-radius: 8px;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: bold;
            }
            .content { 
              padding: 40px 30px;
              background: white;
            }
            .greeting {
              font-size: 20px;
              font-weight: bold;
              color: #333;
              margin-bottom: 20px;
            }
            .intro {
              font-size: 16px;
              color: #555;
              margin-bottom: 30px;
              line-height: 1.8;
            }
            .security-notice {
              background: #fef3c7;
              border: 2px solid #fbbf24;
              border-radius: 8px;
              padding: 20px;
              margin: 25px 0;
              font-size: 14px;
              color: #92400e;
            }
            .security-notice-title {
              font-size: 16px;
              font-weight: bold;
              color: #b45309;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .button { 
              display: inline-block; 
              background: #EF4444; 
              color: white !important; 
              padding: 16px 40px; 
              text-decoration: none; 
              border-radius: 8px; 
              margin: 25px 0;
              font-weight: bold;
              font-size: 16px;
              text-align: center;
              box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
            }
            .button:hover {
              background: #dc2626;
            }
            .expiry-notice {
              background: #f9f9f9;
              padding: 15px;
              border-radius: 8px;
              border-left: 4px solid #6b7280;
              margin: 20px 0;
              font-size: 14px;
              color: #374151;
            }
            .contact-section {
              background: #f0f9ff;
              padding: 20px;
              border-radius: 8px;
              margin: 25px 0;
              text-align: center;
              border-left: 4px solid #1E90FF;
            }
            .whatsapp-link {
              color: #25D366;
              text-decoration: none;
              font-weight: bold;
              font-size: 16px;
            }
            .footer { 
              text-align: center; 
              padding: 30px 20px; 
              background: #f9f9f9;
              color: #666; 
              font-size: 14px;
              border-top: 1px solid #eee;
            }
            .footer-tagline {
              font-size: 16px;
              color: #D4AF37;
              font-weight: bold;
              margin: 15px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header with Logo -->
            <div class="header">
              <img src="https://maxsaham.com/LOGO-square-for-rounded-crop.jpg" alt="Max Saham Logo" class="logo">
              <h1>🔐 Password Reset Request</h1>
            </div>
            
            <!-- Main Content -->
            <div class="content">
              <!-- Greeting -->
              <div class="greeting">
                Hi ${userName || 'Trader'}, 👋
              </div>
              
              <!-- Introduction -->
              <div class="intro">
                Kami menerima permintaan untuk reset password akaun <strong>Team Max Saham</strong> anda. Jika anda tidak membuat permintaan ini, sila abaikan email ini.
              </div>
              
              <!-- Security Notice -->
              <div class="security-notice">
                <div class="security-notice-title">
                  ⚠️ Amaran Keselamatan
                </div>
                <p style="margin: 10px 0;">
                  • Jangan kongsikan link ini dengan sesiapa<br>
                  • Link ini hanya sah untuk <strong>1 jam</strong><br>
                  • Jika anda tidak request password reset, sila hubungi kami segera
                </p>
              </div>
              
              <!-- Reset Button -->
              <div style="text-align: center;">
                <p style="font-size: 16px; color: #555; margin-bottom: 15px;">
                  Klik butang di bawah untuk set password baru:
                </p>
                <a href="${html || '#'}" class="button">
                  🔑 Reset Password Sekarang
                </a>
              </div>
              
              <!-- Expiry Notice -->
              <div class="expiry-notice">
                <strong>⏰ Link akan expire dalam 1 jam.</strong><br>
                Jika link sudah expire, sila request password reset yang baru di halaman login.
              </div>
              
              <!-- Alternative Instructions -->
              <div style="margin: 30px 0; padding: 20px; background: #f9f9f9; border-radius: 8px;">
                <h3 style="color: #333; font-size: 18px; margin-top: 0;">Cara Reset Password:</h3>
                <ol style="color: #555; font-size: 15px; line-height: 1.8; padding-left: 20px;">
                  <li>Klik butang "Reset Password Sekarang" di atas</li>
                  <li>Anda akan dibawa ke page untuk set password baru</li>
                  <li>Masukkan password baru anda (minimum 6 karakter)</li>
                  <li>Confirm password baru anda</li>
                  <li>Klik "Update Password"</li>
                  <li>Login dengan password baru anda</li>
                </ol>
              </div>
              
              <!-- Need Help -->
              <div class="contact-section">
                <p style="margin-bottom: 10px; font-size: 16px; color: #333;">
                  <strong>💬 Perlukan bantuan?</strong>
                </p>
                <p style="color: #555;">Hubungi kami jika anda menghadapi sebarang masalah:</p>
                <p style="margin-top: 15px;">
                  WhatsApp: <a href="https://wa.me/60115411008" class="whatsapp-link">+60 11-5411 0086</a>
                </p>
              </div>
              
              <!-- Closing -->
              <div style="margin-top: 40px; padding-top: 30px; border-top: 2px solid #f0f0f0;">
                <p style="font-size: 15px; color: #888; font-style: italic;">
                  — Team Max Saham
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <div class="footer-tagline">Professional FCPO Trading Education</div>
              <p style="margin: 10px 0;">© 2025 Team Max Saham. All rights reserved.</p>
              <p style="margin: 10px 0; font-size: 13px;">
                <a href="https://maxsaham.com" style="color: #D4AF37; text-decoration: none;">maxsaham.com</a> | 
                <a href="https://wa.me/60115411008" style="color: #25D366; text-decoration: none;">WhatsApp Support</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // Send email via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Abg Max - Team Max Saham <admin@abgmax.maxsaham.com>',
        to: [to],
        subject: subject,
        html: emailContent,
        headers: {
          'X-Entity-Ref-ID': `maxsaham-${Date.now()}`,
          'List-Unsubscribe': `<mailto:admin@abgmax.maxsaham.com?subject=unsubscribe>`,
          'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend API Error:', data);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: res.status,
      });
    }

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
}

serve(handler);