import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  type?: 'registration' | 'payment' | 'custom';
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
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #1E90FF 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #D4AF37; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to Team Max Saham!</h1>
            </div>
            <div class="content">
              <h2>Selamat Datang, ${userName || 'Trader'}! 🚀</h2>
              <p>Terima kasih kerana mendaftar dengan <strong>Team Max Saham</strong>. Kami excited untuk membantu anda dalam journey FCPO trading!</p>
              
              <h3>Langkah Seterusnya:</h3>
              <ol>
                <li>Log masuk ke portal anda</li>
                <li>Lengkapkan profile anda</li>
                <li>Pilih membership package yang sesuai</li>
                <li>Akses video tutorials dan notes</li>
              </ol>
              
              <a href="${Deno.env.get('NEXT_PUBLIC_APP_URL') || 'https://maxsaham.com'}/members" class="button">Access Your Dashboard</a>
              
              <p><strong>Need help?</strong> Contact us anytime!</p>
              <p>WhatsApp: <a href="https://wa.me/60177815808">+60 17-781 5808</a></p>
            </div>
            <div class="footer">
              <p>© 2025 Team Max Saham. All rights reserved.</p>
              <p>Professional FCPO Trading Education</p>
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
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #D4AF37 0%, #1E90FF 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .success-badge { background: #10B981; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; margin: 20px 0; }
            .button { display: inline-block; background: #D4AF37; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Payment Successful!</h1>
            </div>
            <div class="content">
              <div class="success-badge">🎉 Pembayaran Berjaya!</div>
              
              <h2>Terima Kasih, ${userName || 'Trader'}!</h2>
              <p>Pembayaran anda telah berjaya diproses. Sekarang anda boleh akses semua content premium kami!</p>
              
              <div class="details">
                <h3>Membership Details:</h3>
                <p><strong>Package:</strong> ${membershipType || 'Premium Membership'}</p>
                <p><strong>Status:</strong> Active ✓</p>
                <p><strong>Access:</strong> Full Access to All Resources</p>
              </div>
              
              <h3>Apa Yang Anda Dapat:</h3>
              <ul>
                <li>✅ Access to all premium video tutorials</li>
                <li>✅ Downloadable trading notes and guides</li>
                <li>✅ Live class recordings</li>
                <li>✅ Private Telegram group access</li>
                <li>✅ Weekly market analysis</li>
              </ul>
              
              <a href="${Deno.env.get('NEXT_PUBLIC_APP_URL') || 'https://maxsaham.com'}/members" class="button">Start Learning Now</a>
              
              <p><strong>Questions?</strong> Reach out anytime:</p>
              <p>WhatsApp: <a href="https://wa.me/60177815808">+60 17-781 5808</a></p>
            </div>
            <div class="footer">
              <p>© 2025 Team Max Saham. All rights reserved.</p>
              <p>Professional FCPO Trading Education</p>
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
        from: 'Team Max Saham <onboarding@resend.dev>',
        to: [to],
        subject: subject,
        html: emailContent,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(`Resend API error: ${JSON.stringify(data)}`);
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