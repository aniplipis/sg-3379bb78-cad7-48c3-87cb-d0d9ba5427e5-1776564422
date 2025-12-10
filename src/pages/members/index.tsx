import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { 
  Video, 
  FileText, 
  Download, 
  BookOpen,
  TrendingUp,
  Users,
  Calendar,
  Award,
  Loader2,
  Check
} from "lucide-react";
import Link from "next/link";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface DashboardStats {
  totalVideos: number;
  totalDownloads: number;
  memberSince: string;
}

export default function MemberDashboard() {
  const { user, profile, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Check for Stripe checkout success
  useEffect(() => {
    const sessionId = router.query.session_id;
    if (sessionId) {
      console.log('✅ Stripe checkout session detected:', sessionId);
      setShowSuccessMessage(true);
      
      // Clear the session_id from URL after 3 seconds
      setTimeout(() => {
        router.replace('/members', undefined, { shallow: true });
      }, 3000);
    }
  }, [router.query.session_id]);

  useEffect(() => {
    // Don't redirect immediately - give time for webhook to update premium status
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    // Only redirect to free dashboard if user is confirmed as non-premium AND no checkout session
    if (!authLoading && user && profile && !profile.is_premium && !router.query.session_id) {
      // Add a small delay to ensure webhook has processed
      const timer = setTimeout(() => {
        if (!profile.is_premium) {
          router.push("/members/free-dashboard");
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [user, profile, authLoading, router, router.query.session_id]);

  useEffect(() => {
    if (user && profile) {
      loadDashboardStats();
    }
  }, [user, profile]);

  const loadDashboardStats = async () => {
    try {
      setIsLoadingStats(true);
      setError(null);

      // Content counts are based on available content in respective pages
      // Database tables for content don't exist yet, so we use static counts
      // to prevent query errors and infinite loading states
      setStats({
        totalVideos: 93, // From videos.tsx
        totalDownloads: 103, // From downloads.tsx
        memberSince: profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "N/A"
      });
    } catch (err: any) {
      console.error("Error loading dashboard stats:", err);
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setIsLoadingStats(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isPremium = profile?.is_premium === true;

  return (
    <>
      <SEO 
        title="Member Dashboard - Max Saham"
        description="Access your exclusive FCPO trading resources, videos, and community features"
      />
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8 px-4 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Success Message from Stripe Checkout */}
          {showSuccessMessage && (
            <Card className="mb-8 border-green-500/50 bg-gradient-to-r from-green-500/10 to-green-500/5 animate-in fade-in slide-in-from-top duration-500">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-green-500 mb-2">🎉 Payment Successful!</h3>
                    <p className="text-muted-foreground mb-4">
                      Your premium membership has been activated. Welcome to MAX CLAN! 🚀
                    </p>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 space-y-2">
                      <p className="text-sm">✅ Full access to all premium videos</p>
                      <p className="text-sm">✅ Download all 103 eBooks</p>
                      <p className="text-sm">✅ Exclusive indicators & tools</p>
                      <p className="text-sm">✅ Join MAX CLAN Telegram group</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, <span className="text-gold">{profile?.full_name || "Member"}</span>
            </h1>
            <p className="text-muted-foreground">
              {isPremium ? "Premium Member" : "Free Member"} • Member since {stats?.memberSince || "..."}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <Card className="mb-6 border-destructive/50 bg-destructive/10">
              <CardContent className="p-4">
                <p className="text-destructive">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={loadDashboardStats}
                  className="mt-2"
                >
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <Card className="border-gold/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Videos</p>
                    <p className="text-3xl font-bold text-gold">
                      {isLoadingStats ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.totalVideos || 0}
                    </p>
                  </div>
                  <Video className="w-8 h-8 text-gold/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">E-Books</p>
                    <p className="text-3xl font-bold text-gold">
                      {isLoadingStats ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.totalDownloads || 0}
                    </p>
                  </div>
                  <Download className="w-8 h-8 text-gold/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Status</p>
                    <p className="text-xl font-bold text-gold">
                      {isPremium ? "Premium" : "Free"}
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-gold/50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="border-gold/20 hover:border-gold/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-gold" />
                  Training Videos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access exclusive FCPO trading video tutorials and live session recordings
                </p>
                <Button className="w-full bg-gold hover:bg-gold/90 text-black" asChild>
                  <Link href="/members/videos">
                    View Videos
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gold/20 hover:border-gold/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-gold" />
                  Downloads / E-Books
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Download 103 comprehensive trading eBooks covering technical analysis, psychology, and strategies
                </p>
                <Button className="w-full bg-gold hover:bg-gold/90 text-black" asChild>
                  <Link href="/members/downloads">
                    View E-Books
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gold/20 hover:border-gold/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  TradingView Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Access exclusive and public TradingView indicators for your trading setup
                </p>
                <Button className="w-full bg-gold hover:bg-gold/90 text-black" asChild>
                  <Link href="#indicators">
                    View Indicators
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* TradingView Indicators Section */}
          <Card id="indicators" className="mb-8 border-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <TrendingUp className="w-6 h-6 text-gold" />
                TradingView Indicators
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Exclusive Indicators */}
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  🎯 INDICATOR EKSKLUSIF (INVITE-ONLY)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    "MAX SAHAM DIVERGENCE",
                    "MAX SAHAM TRIPLE PLATINUM",
                    "MAX SAHAM SILENT MACD PRO",
                    "MAX SAHAM DUAL RSI PRO",
                    "MAX SAHAM SCALPER MASTER",
                    "MAX SAHAM SMC COMBO V2"
                  ].map((indicator, index) => (
                    <div key={index} className="p-4 bg-muted/50 rounded-lg border border-gold/20">
                      <p className="font-semibold text-gold">{indicator}</p>
                      <p className="text-xs text-muted-foreground mt-1">Premium Members Only</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Indicators */}
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  🪀 INDICATOR TAMBAHAN (Add ke Favorite)
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="font-semibold mb-2">🔹 HYBRID SMC</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-gold/30 hover:bg-gold/10"
                      asChild
                    >
                      <a href="https://www.tradingview.com/script/3OyVf6Vo-MAX-SAHAM-HYBRID-SMC/" target="_blank" rel="noopener noreferrer">
                        Open in TradingView →
                      </a>
                    </Button>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="font-semibold mb-2">🔹 VOLUME BREAKDOWN</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-gold/30 hover:bg-gold/10"
                      asChild
                    >
                      <a href="https://www.tradingview.com/script/0ryTGU3u-Max-Saham-Vol-Breakdown/" target="_blank" rel="noopener noreferrer">
                        Open in TradingView →
                      </a>
                    </Button>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="font-semibold mb-2">🔹 HEIKIN ASYIK (SND T3 TEMP)</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-gold/30 hover:bg-gold/10"
                      asChild
                    >
                      <a href="https://www.tradingview.com/script/DyWlMNem-MAX-SAHAM-KING-SND-ASYIK-T3-TEMP/" target="_blank" rel="noopener noreferrer">
                        Open in TradingView →
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Public Indicators */}
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  🌐 PUBLIC INDICATOR (Terus boleh guna)
                </h3>
                <div className="space-y-3">
                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="font-semibold mb-2">🔸 MAX SAHAM PUKAT V2</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-gold/30 hover:bg-gold/10"
                      asChild
                    >
                      <a href="https://www.tradingview.com/script/0KxsvHg7-MAX-SAHAM-PUKAT-V2/" target="_blank" rel="noopener noreferrer">
                        Open in TradingView →
                      </a>
                    </Button>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="font-semibold mb-2">🔸 MAX SAHAM ADX with DI</p>
                    <Button 
                      variant="outline" 
                      className="w-full border-gold/30 hover:bg-gold/10"
                      asChild
                    >
                      <a href="https://www.tradingview.com/script/XCRNzzjn-MAX-SAHAM-ADX-with-DI/" target="_blank" rel="noopener noreferrer">
                        Open in TradingView →
                      </a>
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  📌 Klik "Add to Favorite" untuk akses mudah dalam chart
                </p>
                <p className="text-sm text-gold mt-2">
                  🔥 Gunakan bersama setup kelas untuk hasil trade yang lebih mantap!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Online Class Invites Section */}
          <Card className="mb-8 border-gold/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Calendar className="w-6 h-6 text-gold" />
                Online Class Invites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Join our live Zoom classes to learn directly from Max Saham. Check your email for upcoming class schedules and Zoom links.
              </p>
              <div className="p-4 bg-gradient-to-r from-gold/10 to-blue-500/10 rounded-lg border border-gold/20">
                <p className="font-semibold mb-2">📅 Upcoming Classes</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Premium members receive Zoom invitations via email before each live session.
                </p>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  asChild
                >
                  <a href="mailto:maxsaham@example.com?subject=Class Schedule Request">
                    Request Class Schedule
                  </a>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                💡 Tip: Add class times to your calendar and join 5 minutes early to test your connection.
              </p>
            </CardContent>
          </Card>

          {/* Premium Upgrade CTA for Free Members */}
          {!isPremium && (
            <Card className="mt-8 border-gold/20 bg-gradient-to-r from-gold/5 to-blue-500/5">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Upgrade to Premium</h3>
                    <p className="text-muted-foreground">
                      Get access to live classes, advanced strategies, and exclusive community features
                    </p>
                  </div>
                  <Button className="bg-gold hover:bg-gold/90 text-black font-semibold" asChild>
                    <Link href="/#membership">
                      Upgrade Now
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
