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
  Loader2
} from "lucide-react";
import Link from "next/link";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface DashboardStats {
  totalVideos: number;
  totalNotes: number;
  totalDownloads: number;
  memberSince: string;
}

export default function MemberDashboard() {
  const { user, profile, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

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
        totalNotes: 9,   // From notes.tsx
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                    <p className="text-sm text-muted-foreground mb-1">Study Notes</p>
                    <p className="text-3xl font-bold text-gold">
                      {isLoadingStats ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.totalNotes || 0}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-gold/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Downloads</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <FileText className="w-5 h-5 text-gold" />
                  Study Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Read comprehensive trading notes and strategy guides
                </p>
                <Button className="w-full bg-gold hover:bg-gold/90 text-black" asChild>
                  <Link href="/members/notes">
                    View Notes
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-gold/20 hover:border-gold/40 transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-gold" />
                  Downloads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Download indicators, templates, and trading tools
                </p>
                <Button className="w-full bg-gold hover:bg-gold/90 text-black" asChild>
                  <Link href="/members/downloads">
                    View Downloads
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

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
