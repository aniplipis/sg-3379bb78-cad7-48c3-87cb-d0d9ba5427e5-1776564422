import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mail, AlertCircle, CheckCircle } from "lucide-react";

export default function SendBulkEmail() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "info" | null;
    message: string;
  }>({ type: null, message: "" });
  const [recipientCount, setRecipientCount] = useState(0);

  // Load recipient count on mount
  useState(() => {
    loadRecipientCount();
  });

  const loadRecipientCount = async () => {
    try {
      const { count, error } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("is_premium", true);

      if (error) throw error;
      setRecipientCount(count || 0);
    } catch (error) {
      console.error("Error loading recipient count:", error);
    }
  };

  const handleSendEmails = async () => {
    if (!subject || !message) {
      setStatus({
        type: "error",
        message: "Please fill in both subject and message fields",
      });
      return;
    }

    setIsSending(true);
    setStatus({ type: "info", message: "Fetching premium subscribers..." });

    try {
      // Get all premium subscribers
      const { data: premiumUsers, error: fetchError } = await supabase
        .from("profiles")
        .select("email, full_name")
        .eq("is_premium", true);

      if (fetchError) throw fetchError;

      if (!premiumUsers || premiumUsers.length === 0) {
        setStatus({
          type: "error",
          message: "No premium subscribers found",
        });
        setIsSending(false);
        return;
      }

      setStatus({
        type: "info",
        message: `Sending emails to ${premiumUsers.length} premium subscribers...`,
      });

      // Send emails one by one (you can batch this for better performance)
      let successCount = 0;
      let errorCount = 0;

      for (const user of premiumUsers) {
        try {
          const { error: emailError } = await supabase.functions.invoke(
            "send-email",
            {
              body: {
                to: user.email,
                subject: subject,
                html: generateEmailHTML(message, user.full_name),
                type: "custom",
                userName: user.full_name,
              },
            }
          );

          if (emailError) {
            console.error(`Failed to send to ${user.email}:`, emailError);
            errorCount++;
          } else {
            successCount++;
          }

          // Add small delay to avoid rate limiting
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Error sending to ${user.email}:`, error);
          errorCount++;
        }
      }

      setStatus({
        type: successCount > 0 ? "success" : "error",
        message: `✅ Successfully sent: ${successCount} | ❌ Failed: ${errorCount}`,
      });

      // Clear form on success
      if (successCount > 0) {
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending bulk emails:", error);
      setStatus({
        type: "error",
        message: "Failed to send emails. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const generateEmailHTML = (content: string, userName: string) => {
    return `
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
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
          }
          .message {
            font-size: 16px;
            color: #555;
            line-height: 1.8;
            white-space: pre-wrap;
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
            <h1>Team Max Saham</h1>
          </div>
          <div class="content">
            <div class="greeting">Hi ${userName || "Trader"}, 🚀</div>
            <div class="message">${content}</div>
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
  };

  // Check if user is admin (you can add admin check logic here)
  // For now, just check if user is logged in
  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background py-8 px-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <Card className="border-gold/20">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Mail className="w-8 h-8 text-gold" />
                Send Bulk Email to Premium Subscribers
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Send announcements, updates, or important information to all premium members
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recipient Count */}
              <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold">
                  📊 Total Recipients: {recipientCount} premium subscribers
                </p>
              </div>

              {/* Status Messages */}
              {status.type && (
                <div
                  className={`p-4 rounded-lg border flex items-start gap-3 ${
                    status.type === "success"
                      ? "bg-green-50 border-green-200"
                      : status.type === "error"
                      ? "bg-red-50 border-red-200"
                      : "bg-blue-50 border-blue-200"
                  }`}
                >
                  {status.type === "success" && (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  )}
                  {status.type === "error" && (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  {status.type === "info" && (
                    <Loader2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 animate-spin" />
                  )}
                  <p
                    className={`text-sm ${
                      status.type === "success"
                        ? "text-green-800"
                        : status.type === "error"
                        ? "text-red-800"
                        : "text-blue-800"
                    }`}
                  >
                    {status.message}
                  </p>
                </div>
              )}

              {/* Email Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Enter email subject..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={isSending}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Email Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message here... (supports line breaks)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSending}
                    rows={12}
                    className="mt-1 font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    💡 Tip: Your message will be automatically formatted in a professional email template
                  </p>
                </div>
              </div>

              {/* Preview Section */}
              <div className="border border-border rounded-lg p-4 bg-muted/30">
                <h3 className="font-semibold mb-2">Email Preview:</h3>
                <div className="text-sm space-y-2">
                  <p>
                    <strong>Subject:</strong> {subject || "(No subject)"}
                  </p>
                  <p>
                    <strong>Message:</strong>
                  </p>
                  <div className="bg-background rounded p-3 whitespace-pre-wrap text-muted-foreground">
                    {message || "(No message)"}
                  </div>
                </div>
              </div>

              {/* Send Button */}
              <div className="flex gap-4">
                <Button
                  onClick={handleSendEmails}
                  disabled={isSending || !subject || !message}
                  className="flex-1 bg-gold hover:bg-gold/90 text-black font-semibold"
                  size="lg"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending Emails...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Send to All Premium Subscribers
                    </>
                  )}
                </Button>
              </div>

              {/* Warning */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  ⚠️ <strong>Important:</strong> This will send emails to ALL premium subscribers. 
                  Please review your message carefully before sending.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}