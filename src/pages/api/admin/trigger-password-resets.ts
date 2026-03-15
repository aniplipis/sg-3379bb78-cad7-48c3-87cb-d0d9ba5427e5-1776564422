import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";

/**
 * ADMIN ONLY - Trigger Password Resets
 * 
 * This endpoint triggers password reset emails for specified users.
 * 
 * Usage:
 * GET /api/admin/trigger-password-resets?emails=email1@example.com,email2@example.com
 * 
 * Security: Should be protected by admin authentication in production
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { emails } = req.query;

    if (!emails || typeof emails !== "string") {
      return res.status(400).json({
        error: "Missing or invalid emails parameter",
        usage: "?emails=email1@example.com,email2@example.com"
      });
    }

    const emailList = emails.split(",").map(e => e.trim().toLowerCase());
    const results = [];

    for (const email of emailList) {
      console.log(`\n🔄 Processing password reset for: ${email}`);

      try {
        // Get the redirect URL for password reset
        const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/reset-password`;

        // Trigger Supabase password reset
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo,
        });

        if (error) {
          console.error(`❌ Supabase reset failed for ${email}:`, error);
          results.push({
            email,
            success: false,
            supabaseError: error.message,
            customEmailSent: false
          });
          continue;
        }

        console.log(`✅ Supabase reset email sent for ${email}`);

        // Now send custom branded email via Edge Function
        let customEmailSent = false;
        try {
          const emailResponse = await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-email`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
              },
              body: JSON.stringify({
                to: email,
                type: "password-reset",
                resetLink: `${redirectTo}#access_token=PLACEHOLDER`, // Placeholder, actual token in Supabase email
              }),
            }
          );

          if (emailResponse.ok) {
            console.log(`✅ Custom branded email sent for ${email}`);
            customEmailSent = true;
          } else {
            const errorText = await emailResponse.text();
            console.error(`⚠️ Custom email failed for ${email}:`, errorText);
          }
        } catch (emailError) {
          console.error(`⚠️ Custom email error for ${email}:`, emailError);
        }

        results.push({
          email,
          success: true,
          supabaseEmailSent: true,
          customEmailSent,
          message: "Password reset initiated successfully"
        });

      } catch (error) {
        console.error(`❌ Error processing ${email}:`, error);
        results.push({
          email,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }

    // Summary
    const successCount = results.filter(r => r.success).length;
    const failCount = results.length - successCount;

    console.log(`\n📊 SUMMARY:`);
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Failed: ${failCount}`);

    return res.status(200).json({
      success: true,
      summary: {
        total: results.length,
        successful: successCount,
        failed: failCount
      },
      results,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ Fatal error in trigger-password-resets:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Internal server error"
    });
  }
}