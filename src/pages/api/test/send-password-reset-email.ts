import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.query;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ 
        success: false, 
        error: "Email parameter is required" 
      });
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user by email to get their name
    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("email", email)
      .single();

    const userName = userData?.full_name || email.split("@")[0];

    // Send password reset email via Supabase Auth
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'https://maxsaham.com'}/auth/reset-password`,
      }
    );

    if (resetError) {
      console.error("Error sending password reset:", resetError);
      return res.status(400).json({
        success: false,
        error: resetError.message,
      });
    }

    // Send custom password reset email via Edge Function
    const { data: emailData, error: emailError } = await supabase.functions.invoke('send-email', {
      body: {
        to: email,
        subject: '🔐 Reset Your Password - Team Max Saham',
        type: 'password-reset',
        userName: userName,
        html: `${process.env.NEXT_PUBLIC_APP_URL || 'https://maxsaham.com'}/auth/reset-password`, // Reset link will be in template
      },
    });

    if (emailError) {
      console.error("Error sending custom reset email:", emailError);
      // Don't fail the request if custom email fails, Supabase default email was already sent
    }

    return res.status(200).json({
      success: true,
      message: `Password reset email sent to ${email}`,
      data: {
        emailSent: true,
        customEmailSent: !emailError,
      },
    });
  } catch (error: any) {
    console.error("Password reset error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to send password reset email",
    });
  }
}