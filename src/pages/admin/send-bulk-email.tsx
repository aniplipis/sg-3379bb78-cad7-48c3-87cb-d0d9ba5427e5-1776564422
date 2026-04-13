import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mail, AlertCircle, CheckCircle, Send, Users, RefreshCw } from "lucide-react";

interface Recipient {
  email: string;
  full_name: string;
  is_premium: boolean;
  selected: boolean;
}

type RecipientFilter = "premium-only" | "all" | "non-premium-only";

export default function SendBulkEmail() {
  const { user, profile, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "info" | null;
    message: string;
  }>({ type: null, message: "" });
  
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [recipientFilter, setRecipientFilter] = useState<RecipientFilter>("premium-only");
  const [sendProgress, setSendProgress] = useState({ sent: 0, failed: 0, total: 0 });
  const [failedEmails, setFailedEmails] = useState<string[]>([]);
  const [showManualSelect, setShowManualSelect] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [batchSize, setBatchSize] = useState<number>(20); // 0 = off, 20 = default, 50 = large batches

  // Handle authentication redirect
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  // Load recipients on mount and when filter changes
  useEffect(() => {
    if (user) {
      loadRecipients();
    }
  }, [user, recipientFilter]);

  const loadRecipients = async () => {
    try {
      let query = supabase
        .from("profiles")
        .select("email, full_name, is_premium")
        .eq("email_bounced", false) // Exclude bounced emails
        .order("full_name");

      if (recipientFilter === "premium-only") {
        query = query.eq("is_premium", true);
      } else if (recipientFilter === "non-premium-only") {
        query = query.eq("is_premium", false);
      }
      // If "all", no filter applied

      const { data, error } = await query;

      if (error) throw error;

      const recipientsWithSelection = (data || []).map((r) => ({
        ...r,
        selected: true, // All selected by default
      }));

      setRecipients(recipientsWithSelection);
    } catch (error) {
      console.error("Error loading recipients:", error);
      setStatus({
        type: "error",
        message: "Failed to load recipients",
      });
    }
  };

  const handleSendTestEmail = async () => {
    if (!subject || !message) {
      setStatus({
        type: "error",
        message: "Please fill in both subject and message fields",
      });
      return;
    }

    if (!user?.email) {
      setStatus({
        type: "error",
        message: "No user email found for test",
      });
      return;
    }

    setIsSending(true);
    setStatus({ type: "info", message: "Sending test email..." });

    try {
      const { error: emailError } = await supabase.functions.invoke(
        "send-email",
        {
          body: {
            to: user.email,
            subject: `[TEST] ${subject}`,
            html: generateEmailHTML(message, "Test User"),
            type: "custom",
            userName: "Test User",
          },
        }
      );

      if (emailError) {
        throw emailError;
      }

      setStatus({
        type: "success",
        message: `✅ Test email sent successfully to ${user.email}`,
      });
    } catch (error) {
      console.error("Error sending test email:", error);
      setStatus({
        type: "error",
        message: "Failed to send test email. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSendBulkEmails = async (resendMode = false) => {
    if (!subject || !message) {
      setStatus({
        type: "error",
        message: "Please fill in both subject and message fields",
      });
      return;
    }

    const selectedRecipients = resendMode
      ? recipients.filter((r) => failedEmails.includes(r.email))
      : recipients.filter((r) => r.selected);

    if (selectedRecipients.length === 0) {
      setStatus({
        type: "error",
        message: resendMode ? "No failed emails to resend" : "No recipients selected",
      });
      return;
    }

    // Calculate batches and estimated time
    const BATCH_SIZE = batchSize; // Use selected batch size
    const BATCH_DELAY_MS = 5 * 60 * 1000; // 5 minutes
    const totalBatches = BATCH_SIZE === 0 ? 1 : Math.ceil(selectedRecipients.length / BATCH_SIZE);
    const estimatedMinutes = BATCH_SIZE === 0 ? 0 : Math.ceil((totalBatches - 1) * 5);
    
    setEstimatedTime(
      BATCH_SIZE === 0
        ? "Sending all emails at once..."
        : estimatedMinutes > 0
        ? `Estimated time: ~${estimatedMinutes} minutes for ${totalBatches} batches`
        : "Sending in one batch..."
    );

    setIsSending(true);
    setIsPaused(false);
    setSendProgress({ sent: 0, failed: 0, total: selectedRecipients.length });
    setFailedEmails([]);
    
    const statusMessage = BATCH_SIZE === 0
      ? `Sending to all ${selectedRecipients.length} recipients at once...`
      : `Starting batch send to ${selectedRecipients.length} recipients (${BATCH_SIZE} per batch, 5 min intervals)...`;
    
    setStatus({
      type: "info",
      message: statusMessage,
    });

    let successCount = 0;
    let errorCount = 0;
    const newFailedEmails: string[] = [];

    // Process in batches (or all at once if BATCH_SIZE = 0)
    const batchesToProcess = BATCH_SIZE === 0 
      ? [selectedRecipients] 
      : Array.from({ length: totalBatches }, (_, i) => {
          const start = i * BATCH_SIZE;
          const end = Math.min(start + BATCH_SIZE, selectedRecipients.length);
          return selectedRecipients.slice(start, end);
        });

    for (let batchIndex = 0; batchIndex < batchesToProcess.length; batchIndex++) {
      // Check if paused
      if (isPaused) {
        setStatus({
          type: "info",
          message: `Sending paused. Sent: ${successCount}, Failed: ${errorCount}`,
        });
        break;
      }

      const batch = batchesToProcess[batchIndex];

      if (BATCH_SIZE > 0) {
        setStatus({
          type: "info",
          message: `Processing batch ${batchIndex + 1}/${totalBatches} (${batch.length} emails)...`,
        });
      }

      // Send emails in current batch
      for (const recipient of batch) {
        try {
          const { error: emailError } = await supabase.functions.invoke(
            "send-email",
            {
              body: {
                to: recipient.email,
                subject: subject,
                html: generateEmailHTML(message, recipient.full_name),
                type: "custom",
                userName: recipient.full_name,
              },
            }
          );

          if (emailError) {
            console.error(`Failed to send to ${recipient.email}:`, emailError);
            errorCount++;
            newFailedEmails.push(recipient.email);
          } else {
            successCount++;
          }

          // Update progress in real-time
          setSendProgress({
            sent: successCount,
            failed: errorCount,
            total: selectedRecipients.length,
          });

          // Small delay between individual emails (100ms)
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Error sending to ${recipient.email}:`, error);
          errorCount++;
          newFailedEmails.push(recipient.email);
          setSendProgress({
            sent: successCount,
            failed: errorCount,
            total: selectedRecipients.length,
          });
        }
      }

      // Wait 5 minutes before next batch (except for last batch)
      if (batchIndex < batchesToProcess.length - 1 && !isPaused && BATCH_SIZE > 0) {
        const remainingBatches = batchesToProcess.length - batchIndex - 1;
        setStatus({
          type: "info",
          message: `Batch ${batchIndex + 1}/${totalBatches} complete. Waiting 5 minutes before next batch... (${remainingBatches} batches remaining)`,
        });

        // Wait with countdown
        for (let i = 0; i < 300; i++) {
          if (isPaused) break;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // Update countdown every 30 seconds
          if (i % 30 === 0 && i > 0) {
            const remainingSeconds = 300 - i;
            const minutes = Math.floor(remainingSeconds / 60);
            const seconds = remainingSeconds % 60;
            setStatus({
              type: "info",
              message: `Waiting ${minutes}m ${seconds}s before next batch... (${successCount} sent, ${errorCount} failed so far)`,
            });
          }
        }
      }
    }

    setFailedEmails(newFailedEmails);
    
    const finalMessage = BATCH_SIZE === 0
      ? `✅ Successfully sent: ${successCount} | ❌ Failed: ${errorCount} | Sent all at once`
      : `✅ Successfully sent: ${successCount} | ❌ Failed: ${errorCount} | Total batches: ${totalBatches}`;
    
    setStatus({
      type: successCount > 0 ? "success" : "error",
      message: finalMessage,
    });

    // Clear form on complete success
    if (successCount > 0 && errorCount === 0) {
      setSubject("");
      setMessage("");
    }

    setIsSending(false);
    setEstimatedTime("");
  };

  const handlePauseSending = () => {
    setIsPaused(true);
    setStatus({
      type: "info",
      message: "Pausing after current batch completes...",
    });
  };

  const toggleRecipient = (email: string) => {
    setRecipients((prev) =>
      prev.map((r) => (r.email === email ? { ...r, selected: !r.selected } : r))
    );
  };

  const toggleAllRecipients = (selected: boolean) => {
    setRecipients((prev) => prev.map((r) => ({ ...r, selected })));
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
            <p style="margin: 10px 0;">© 2026 Team Max Saham. All rights reserved.</p>
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

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gold" />
        </div>
        <Footer />
      </>
    );
  }

  // Don't render anything if not authenticated
  if (!user) {
    return null;
  }

  const selectedCount = recipients.filter((r) => r.selected).length;
  const premiumCount = recipients.filter((r) => r.is_premium).length;
  const nonPremiumCount = recipients.length - premiumCount;

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background py-8 px-4 pt-24">
        <div className="max-w-5xl mx-auto">
          <Card className="border-gold/20">
            <CardHeader>
              <CardTitle className="text-3xl flex items-center gap-2">
                <Mail className="w-8 h-8 text-gold" />
                Send Bulk Email to Subscribers
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Send announcements, updates, or important information to your subscribers
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recipient Filter & Count */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-5 h-5 text-gold" />
                    <p className="font-semibold text-gold">Recipient Filter</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="premium-only"
                        name="recipient-filter"
                        checked={recipientFilter === "premium-only"}
                        onChange={() => setRecipientFilter("premium-only")}
                        className="w-4 h-4 text-gold border-gray-300 focus:ring-gold"
                      />
                      <label
                        htmlFor="premium-only"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Premium members only
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="all-members"
                        name="recipient-filter"
                        checked={recipientFilter === "all"}
                        onChange={() => setRecipientFilter("all")}
                        className="w-4 h-4 text-gold border-gray-300 focus:ring-gold"
                      />
                      <label
                        htmlFor="all-members"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        All members (Premium + Non-Premium)
                      </label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="non-premium-only"
                        name="recipient-filter"
                        checked={recipientFilter === "non-premium-only"}
                        onChange={() => setRecipientFilter("non-premium-only")}
                        className="w-4 h-4 text-gold border-gray-300 focus:ring-gold"
                      />
                      <label
                        htmlFor="non-premium-only"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Non-premium members only
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    📊 Recipient Statistics
                  </p>
                  <div className="space-y-1 text-sm">
                    <p>✅ Premium: {premiumCount}</p>
                    <p>👥 Non-Premium: {nonPremiumCount}</p>
                    <p className="font-bold text-blue-700 dark:text-blue-300">
                      🎯 Selected: {selectedCount} / {recipients.length}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                      ℹ️ Bounced emails are automatically excluded
                    </p>
                  </div>
                </div>
              </div>

              {/* Batch Size Selector */}
              <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Send className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <p className="font-semibold text-purple-600 dark:text-purple-400">Batch Sending Mode</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="batch-off"
                      name="batch-size"
                      checked={batchSize === 0}
                      onChange={() => setBatchSize(0)}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-600"
                    />
                    <label
                      htmlFor="batch-off"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-700 dark:text-gray-300"
                    >
                      Off - Send all emails at once (fastest, but may trigger spam filters)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="batch-20"
                      name="batch-size"
                      checked={batchSize === 20}
                      onChange={() => setBatchSize(20)}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-600"
                    />
                    <label
                      htmlFor="batch-20"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-700 dark:text-gray-300"
                    >
                      20 emails per batch - Recommended (best deliverability, 5 min intervals)
                    </label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="batch-50"
                      name="batch-size"
                      checked={batchSize === 50}
                      onChange={() => setBatchSize(50)}
                      className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-600"
                    />
                    <label
                      htmlFor="batch-50"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-700 dark:text-gray-300"
                    >
                      50 emails per batch - Faster (moderate deliverability, 5 min intervals)
                    </label>
                  </div>
                </div>
              </div>

              {/* Send Progress */}
              {isSending && (
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                      <p className="font-semibold text-blue-600 dark:text-blue-400">Sending in progress...</p>
                    </div>
                    <Button
                      onClick={handlePauseSending}
                      variant="outline"
                      size="sm"
                      disabled={isPaused}
                      className="border-red-500 text-red-600 hover:bg-red-50"
                    >
                      {isPaused ? "Pausing..." : "Pause Sending"}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>✅ Sent: {sendProgress.sent}</span>
                      <span>❌ Failed: {sendProgress.failed}</span>
                      <span>📊 Total: {sendProgress.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${((sendProgress.sent + sendProgress.failed) / sendProgress.total) * 100}%`,
                        }}
                      />
                    </div>
                    {estimatedTime && (
                      <p className="text-xs text-blue-600 dark:text-blue-400 text-center">
                        {estimatedTime}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Status Messages */}
              {status.type && (
                <div
                  className={`p-4 rounded-lg border flex items-start gap-3 ${
                    status.type === "success"
                      ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                      : status.type === "error"
                      ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                      : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
                  }`}
                >
                  {status.type === "success" && (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  )}
                  {status.type === "error" && (
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  {status.type === "info" && (
                    <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5 animate-spin" />
                  )}
                  <p
                    className={`text-sm ${
                      status.type === "success"
                        ? "text-green-800 dark:text-green-300"
                        : status.type === "error"
                        ? "text-red-800 dark:text-red-300"
                        : "text-blue-800 dark:text-blue-300"
                    }`}
                  >
                    {status.message}
                  </p>
                </div>
              )}

              {/* Failed Emails - Resend Option */}
              {failedEmails.length > 0 && !isSending && (
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-amber-700 dark:text-amber-400">
                      ⚠️ Failed Emails ({failedEmails.length})
                    </p>
                    <Button
                      onClick={() => handleSendBulkEmails(true)}
                      variant="outline"
                      size="sm"
                      className="border-amber-500 text-amber-700 hover:bg-amber-100"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Resend Failed
                    </Button>
                  </div>
                  <div className="max-h-32 overflow-y-auto text-sm space-y-1">
                    {failedEmails.map((email) => (
                      <p key={email} className="text-amber-700 dark:text-amber-300">
                        • {email}
                      </p>
                    ))}
                  </div>
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

              {/* Manual Recipient Selection */}
              <div className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Manual Recipient Selection</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowManualSelect(!showManualSelect)}
                  >
                    {showManualSelect ? "Hide" : "Show"} Recipients
                  </Button>
                </div>

                {showManualSelect && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAllRecipients(true)}
                      >
                        Select All
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAllRecipients(false)}
                      >
                        Deselect All
                      </Button>
                    </div>

                    <div className="max-h-64 overflow-y-auto border border-border rounded p-3 space-y-2">
                      {recipients.map((recipient) => (
                        <div
                          key={recipient.email}
                          className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded"
                        >
                          <Checkbox
                            checked={recipient.selected}
                            onCheckedChange={() => toggleRecipient(recipient.email)}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{recipient.full_name}</p>
                            <p className="text-xs text-muted-foreground">{recipient.email}</p>
                          </div>
                          {recipient.is_premium && (
                            <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded">
                              Premium
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleSendTestEmail}
                  disabled={isSending || !subject || !message}
                  variant="outline"
                  className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50"
                  size="lg"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Test Email to Me
                    </>
                  )}
                </Button>

                <Button
                  onClick={() => handleSendBulkEmails(false)}
                  disabled={isSending || !subject || !message || selectedCount === 0}
                  className="flex-1 bg-gold hover:bg-gold/90 text-black font-semibold"
                  size="lg"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5 mr-2" />
                      Send to {selectedCount} Recipients
                    </>
                  )}
                </Button>
              </div>

              {/* Warning */}
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <p className="text-sm text-amber-800 dark:text-amber-300">
                  ⚠️ <strong>Important:</strong> Always send a test email to yourself first. Review carefully before sending to all subscribers.
                </p>
                {batchSize > 0 ? (
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">
                    📧 <strong>Rate Limiting:</strong> Emails are sent in batches of {batchSize} every 5 minutes to ensure optimal deliverability and avoid spam filters.
                  </p>
                ) : (
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">
                    ⚡ <strong>Batch Mode Off:</strong> All emails will be sent at once. This is faster but may trigger spam filters for large campaigns.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}