import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  type?: "welcome" | "payment" | "password-reset" | "custom";
  userName?: string;
  membershipType?: string;
  amount?: string;
  transactionId?: string;
  resetLink?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { to, subject, html, type, userName, membershipType, amount, transactionId, resetLink } = await req.json() as EmailRequest;

    if (!to || !subject) {
      throw new Error("Missing required fields: to, subject");
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    let emailHtml = html;

    // Generate email template based on type
    if (type === "welcome") {
      emailHtml = `
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
              font-size: 24px;
              font-weight: bold;
              color: #D4AF37;
              margin-bottom: 20px;
            }
            .welcome-message {
              font-size: 18px;
              color: #333;
              line-height: 1.8;
              margin-bottom: 30px;
            }
            .section-title {
              font-size: 20px;
              font-weight: bold;
              color: #1E90FF;
              margin: 30px 0 15px 0;
              display: flex;
              align-items: center;
              gap: 10px;
            }
            .emoji {
              font-size: 24px;
            }
            .benefits-list {
              background: #f8f9fa;
              border-left: 4px solid #D4AF37;
              padding: 20px;
              margin: 20px 0;
            }
            .benefit-item {
              display: flex;
              align-items: start;
              margin-bottom: 15px;
              gap: 10px;
            }
            .benefit-item:last-child {
              margin-bottom: 0;
            }
            .checkmark {
              color: #28a745;
              font-size: 20px;
              flex-shrink: 0;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #D4AF37 0%, #1E90FF 100%);
              color: white;
              padding: 15px 40px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              font-size: 16px;
              margin: 20px 0;
              text-align: center;
            }
            .cta-button:hover {
              opacity: 0.9;
            }
            .important-note {
              background: #fff3cd;
              border: 2px solid #ffc107;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .important-note strong {
              color: #856404;
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
            .contact-info {
              margin: 15px 0;
              padding: 15px;
              background: #f8f9fa;
              border-radius: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- Header -->
            <div class="header">
              <img src="https://maxsaham.com/LOGO-square-for-rounded-crop.jpg" alt="Max Saham Logo" class="logo">
              <h1>Selamat Datang ke Team Max Saham!</h1>
            </div>

            <!-- Content -->
            <div class="content">
              <div class="greeting">Halo ${userName || "Trader"}! 👋</div>
              
              <p class="welcome-message">
                Terima kasih kerana mendaftar dengan <strong>Team Max Saham</strong> — platform pendidikan trading FCPO terkemuka di Malaysia! 🚀
              </p>

              <p>
                Kami sangat gembira menyambut anda ke dalam komuniti trader profesional kami. Anda kini telah mengambil langkah pertama untuk menguasai dunia <strong>Futures Trading</strong> dengan bimbingan pakar.
              </p>

              <!-- What's Next Section -->
              <div class="section-title">
                <span class="emoji">📋</span> Apa yang perlu anda lakukan sekarang?
              </div>

              <div class="benefits-list">
                <div class="benefit-item">
                  <span class="checkmark">✅</span>
                  <div>
                    <strong>Login ke Dashboard Anda:</strong><br>
                    Akses dashboard ahli anda di <a href="https://maxsaham.com" style="color: #1E90FF; text-decoration: none;">maxsaham.com</a>
                  </div>
                </div>
                <div class="benefit-item">
                  <span class="checkmark">✅</span>
                  <div>
                    <strong>Terokai Kandungan Percuma:</strong><br>
                    Lihat video, nota, dan sumber percuma yang tersedia untuk anda
                  </div>
                </div>
                <div class="benefit-item">
                  <span class="checkmark">✅</span>
                  <div>
                    <strong>Upgrade ke Premium:</strong><br>
                    Dapatkan akses penuh ke semua kelas, strategi, dan bimbingan 1-on-1
                  </div>
                </div>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://maxsaham.com/members" class="cta-button">
                  🚀 Pergi ke Dashboard Saya
                </a>
              </div>

              <!-- Premium Benefits Section -->
              <div class="section-title">
                <span class="emoji">⭐</span> Kenapa Upgrade ke Premium?
              </div>

              <div class="benefits-list">
                <div class="benefit-item">
                  <span class="checkmark">💎</span>
                  <div><strong>Akses 24/7</strong> ke semua kelas video dan nota strategi</div>
                </div>
                <div class="benefit-item">
                  <span class="checkmark">📊</span>
                  <div><strong>Strategi Hybrid SMC</strong> — gabungan Smart Money Concept & Technical Analysis</div>
                </div>
                <div class="benefit-item">
                  <span class="checkmark">🎯</span>
                  <div><strong>Live Trading Sessions</strong> setiap minggu dengan Abg Max</div>
                </div>
                <div class="benefit-item">
                  <span class="checkmark">👥</span>
                  <div><strong>Komuniti Premium</strong> — diskusi dengan trader berpengalaman</div>
                </div>
                <div class="benefit-item">
                  <span class="checkmark">📈</span>
                  <div><strong>Support 1-on-1</strong> untuk tanya soalan dan dapatkan bimbingan</div>
                </div>
              </div>

              <!-- Important Note -->
              <div class="important-note">
                <p style="margin: 0 0 10px 0;">
                  <strong>📌 Penting:</strong>
                </p>
                <p style="margin: 0;">
                  Akaun percuma anda memberi akses kepada sebahagian kecil kandungan sahaja. Untuk mendapat manfaat penuh, upgrade ke <strong>Ahli Premium</strong> dan mulakan perjalanan trading anda dengan betul!
                </p>
              </div>

              <!-- Need Help -->
              <div class="section-title">
                <span class="emoji">💬</span> Perlu bantuan?
              </div>
              <p style="margin-bottom: 10px; color: #555;">Hubungi kami melalui email di <a href="mailto:admin@abgmax.maxsaham.com" style="color: #D4AF37; text-decoration: none;">admin@abgmax.maxsaham.com</a></p>

              <p style="margin-top: 40px; color: #666; font-style: italic;">
                Terima kasih sekali lagi kerana menyertai kami. Kami tidak sabar untuk melihat kejayaan anda dalam trading!
              </p>

              <p style="margin-top: 20px; font-weight: bold; color: #D4AF37;">
                See you in the charts! 📈<br>
                — Team Max Saham
              </p>
            </div>

            <!-- Footer -->
            <div class="footer">
              <div class="footer-tagline">Professional FCPO Trading Education</div>
              <p style="margin: 10px 0;">© 2025 Team Max Saham. All rights reserved.</p>
              <p style="margin: 10px 0; font-size: 13px;">
                <a href="https://maxsaham.com" style="color: #D4AF37; text-decoration: none;">maxsaham.com</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (type === "payment") {
      emailHtml = `
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
              background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
            }
            .success-icon {
              font-size: 64px;
              margin-bottom: 20px;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
              font-weight: bold;
            }
            .content {
              padding: 40px 30px;
              background: white;
            }
            .greeting {
              font-size: 24px;
              font-weight: bold;
              color: #28a745;
              margin-bottom: 20px;
            }
            .payment-details {
              background: #f8f9fa;
              border: 2px solid #28a745;
              border-radius: 12px;
              padding: 25px;
              margin: 30px 0;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 12px 0;
              border-bottom: 1px solid #dee2e6;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: bold;
              color: #666;
            }
            .detail-value {
              color: #333;
              font-weight: 600;
            }
            .cta-button {
              display: inline-block;
              background: linear-gradient(135deg, #D4AF37 0%, #1E90FF 100%);
              color: white;
              padding: 15px 40px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              font-size: 16px;
              margin: 20px 0;
              text-align: center;
            }
            .benefits-section {
              background: #fff8e1;
              border-left: 4px solid #D4AF37;
              padding: 20px;
              margin: 30px 0;
            }
            .benefit-item {
              display: flex;
              align-items: start;
              margin-bottom: 12px;
              gap: 10px;
            }
            .contact-section {
              margin-top: 30px;
              padding: 20px;
              background: #f8f9fa;
              border-radius: 8px;
              text-align: center;
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
            <!-- Header -->
            <div class="header">
              <div class="success-icon">✅</div>
              <h1>Payment Confirmed!</h1>
              <p style="margin: 10px 0 0 0; font-size: 18px;">Welcome to Premium Membership</p>
            </div>

            <!-- Content -->
            <div class="content">
              <div class="greeting">Hi ${userName || "Trader"}! 🎉</div>
              
              <p style="font-size: 18px; line-height: 1.8;">
                <strong>Congratulations!</strong> Your payment has been successfully processed, and your <strong>${membershipType || "Premium"} Membership</strong> is now active! 🚀
              </p>

              <!-- Payment Details -->
              <div class="payment-details">
                <h3 style="margin-top: 0; color: #28a745;">📋 Payment Details</h3>
                <div class="detail-row">
                  <span class="detail-label">Membership Type:</span>
                  <span class="detail-value">${membershipType || "Premium Membership"}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Amount Paid:</span>
                  <span class="detail-value">RM ${amount || "0.00"}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Transaction ID:</span>
                  <span class="detail-value">${transactionId || "N/A"}</span>
                </div>
                <div class="detail-row">
                  <span class="detail-label">Status:</span>
                  <span class="detail-value" style="color: #28a745;">✅ Confirmed</span>
                </div>
              </div>

              <p style="font-size: 16px; color: #555;">
                You now have <strong>full access</strong> to all premium content, including:
              </p>

              <!-- Benefits -->
              <div class="benefits-section">
                <div class="benefit-item">
                  <span style="color: #D4AF37; font-size: 20px;">🎓</span>
                  <div><strong>All Premium Classes & Video Tutorials</strong></div>
                </div>
                <div class="benefit-item">
                  <span style="color: #D4AF37; font-size: 20px;">📊</span>
                  <div><strong>Advanced Trading Strategies (Hybrid SMC)</strong></div>
                </div>
                <div class="benefit-item">
                  <span style="color: #D4AF37; font-size: 20px;">📈</span>
                  <div><strong>Live Trading Sessions with Abg Max</strong></div>
                </div>
                <div class="benefit-item">
                  <span style="color: #D4AF37; font-size: 20px;">💬</span>
                  <div><strong>Exclusive Community & 1-on-1 Support</strong></div>
                </div>
                <div class="benefit-item">
                  <span style="color: #D4AF37; font-size: 20px;">📥</span>
                  <div><strong>Downloadable Resources & Trading Tools</strong></div>
                </div>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://maxsaham.com/members" class="cta-button">
                  🚀 Access Your Premium Dashboard
                </a>
              </div>

              <p style="background: #e7f3ff; border-left: 4px solid #1E90FF; padding: 15px; margin: 20px 0;">
                <strong>💡 Pro Tip:</strong> Start with the "Fundamentals" section if you're new, or jump straight into "Advanced Strategies" if you already have trading experience.
              </p>

              <!-- Contact Section -->
              <div class="contact-section">
                <p style="margin-bottom: 10px;"><strong>Questions?</strong> Reach out anytime:</p>
                <p>Email: <a href="mailto:admin@abgmax.maxsaham.com" style="color: #D4AF37; text-decoration: none; font-weight: bold;">admin@abgmax.maxsaham.com</a></p>
              </div>

              <p style="margin-top: 40px; color: #666; font-style: italic;">
                Thank you for trusting Team Max Saham with your trading education. We're here to support you every step of the way!
              </p>

              <p style="margin-top: 20px; font-weight: bold; color: #28a745;">
                Welcome to the family! 🎊<br>
                — Team Max Saham
              </p>
            </div>

            <!-- Footer -->
            <div class="footer">
              <div class="footer-tagline">Professional FCPO Trading Education</div>
              <p style="margin: 10px 0;">© 2025 Team Max Saham. All rights reserved.</p>
              <p style="margin: 10px 0; font-size: 13px;">
                <a href="https://maxsaham.com" style="color: #D4AF37; text-decoration: none;">maxsaham.com</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (type === "password-reset") {
      emailHtml = `
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
              background: linear-gradient(135deg, #1E90FF 0%, #D4AF37 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
            }
            .icon {
              font-size: 64px;
              margin-bottom: 20px;
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
              font-size: 22px;
              font-weight: bold;
              color: #1E90FF;
              margin-bottom: 20px;
            }
            .reset-button {
              display: inline-block;
              background: linear-gradient(135deg, #1E90FF 0%, #D4AF37 100%);
              color: white;
              padding: 16px 50px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              font-size: 18px;
              margin: 30px 0;
              text-align: center;
            }
            .important-box {
              background: #fff3cd;
              border: 2px solid #ffc107;
              border-radius: 8px;
              padding: 20px;
              margin: 25px 0;
            }
            .security-tips {
              background: #f8f9fa;
              border-left: 4px solid #D4AF37;
              padding: 20px;
              margin: 25px 0;
            }
            .security-tip {
              margin: 10px 0;
              display: flex;
              align-items: start;
              gap: 10px;
            }
            .contact-section {
              margin-top: 30px;
              padding: 20px;
              background: #e7f3ff;
              border-radius: 8px;
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
            <!-- Header -->
            <div class="header">
              <div class="icon">🔐</div>
              <h1>Reset Password Anda</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px;">Permintaan untuk tukar kata laluan</p>
            </div>

            <!-- Content -->
            <div class="content">
              <div class="greeting">Hi ${userName || "Trader"}! 👋</div>
              
              <p style="font-size: 16px; line-height: 1.8; color: #555;">
                Kami telah menerima permintaan untuk reset password akaun anda di <strong>Team Max Saham</strong>.
              </p>

              <p style="font-size: 16px; color: #555;">
                Klik butang di bawah untuk menetapkan kata laluan baharu:
              </p>

              <div style="text-align: center; margin: 35px 0;">
                <a href="${resetLink}" class="reset-button">
                  🔓 Reset Password Saya
                </a>
              </div>

              <!-- Important Notice -->
              <div class="important-box">
                <p style="margin: 0 0 10px 0; font-weight: bold; color: #856404;">
                  ⚠️ Penting:
                </p>
                <ul style="margin: 0; padding-left: 20px; color: #856404;">
                  <li>Link ini akan <strong>expired dalam 1 jam</strong></li>
                  <li>Jika anda tidak meminta reset password, <strong>abaikan email ini</strong></li>
                  <li>Jangan kongsikan link ini dengan sesiapa</li>
                </ul>
              </div>

              <!-- Security Tips -->
              <div class="security-tips">
                <h3 style="margin-top: 0; color: #333;">🛡️ Tips Keselamatan Password:</h3>
                <div class="security-tip">
                  <span style="color: #28a745; font-weight: bold;">✓</span>
                  <span>Gunakan sekurang-kurangnya 8 karakter</span>
                </div>
                <div class="security-tip">
                  <span style="color: #28a745; font-weight: bold;">✓</span>
                  <span>Campurkan huruf besar, huruf kecil, nombor & simbol</span>
                </div>
                <div class="security-tip">
                  <span style="color: #28a745; font-weight: bold;">✓</span>
                  <span>Jangan guna password yang sama untuk platform lain</span>
                </div>
                <div class="security-tip">
                  <span style="color: #28a745; font-weight: bold;">✓</span>
                  <span>Jangan kongsikan password dengan sesiapa</span>
                </div>
              </div>

              <!-- Need Help -->
              <div class="contact-section">
                <p style="margin-bottom: 10px; font-size: 16px; color: #333;">
                  <strong>💬 Perlukan bantuan?</strong>
                </p>
                <p style="color: #555;">Hubungi kami jika anda menghadapi sebarang masalah:</p>
                <p style="margin-top: 15px;">
                  Email: <a href="mailto:admin@abgmax.maxsaham.com" style="color: #D4AF37; text-decoration: none; font-weight: bold;">admin@abgmax.maxsaham.com</a>
                </p>
              </div>

              <p style="margin-top: 30px; color: #666; font-size: 14px; font-style: italic;">
                Jika butang di atas tidak berfungsi, copy dan paste link ini ke browser anda:<br>
                <a href="${resetLink}" style="color: #1E90FF; word-break: break-all;">${resetLink}</a>
              </p>

              <p style="margin-top: 30px; font-weight: bold; color: #1E90FF;">
                Stay secure! 🔒<br>
                — Team Max Saham
              </p>
            </div>

            <!-- Footer -->
            <div class="footer">
              <div class="footer-tagline">Professional FCPO Trading Education</div>
              <p style="margin: 10px 0;">© 2025 Team Max Saham. All rights reserved.</p>
              <p style="margin: 10px 0; font-size: 13px;">
                <a href="https://maxsaham.com" style="color: #D4AF37; text-decoration: none;">maxsaham.com</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // Create timeout promise for Resend API call (8 seconds max)
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Email send timeout after 8 seconds')), 8000)
    );

    // Send email via Resend with timeout
    const sendEmailPromise = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Abg Max - Team Max Saham <admin@abgmax.maxsaham.com>",
        to: [to],
        subject: subject,
        html: emailHtml,
        headers: {
          'List-Unsubscribe': '<mailto:admin@abgmax.maxsaham.com?subject=Unsubscribe>',
          'X-Entity-Ref-ID': Math.random().toString(36).substring(7),
        },
      }),
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send email");
      }
      return data;
    });

    // Race between timeout and email send
    const data = await Promise.race([sendEmailPromise, timeoutPromise]);

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    
    // Return error response but don't block
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to send email",
        note: "Email may be sent with delay"
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200, // Return 200 even on error to prevent blocking registration
      }
    );
  }
});