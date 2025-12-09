import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, BookOpen, FileText, Calendar, Crown, Lock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MembersDashboard() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/?login=true");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isPremium = profile?.is_premium || false;

  const resources = [
    {
      title: "Video Library",
      description: "Complete collection of trading lessons",
      icon: Video,
      href: "/members/videos",
      locked: !isPremium,
      categories: ["Wyckoff", "SMC", "Order Flow", "Live Sessions"]
    },
    {
      title: "Downloadable Resources",
      description: "eBooks, guides, and trading templates",
      icon: BookOpen,
      href: "/members/downloads",
      locked: !isPremium,
      categories: ["eBooks", "Checklists", "Templates", "Guides"]
    },
    {
      title: "Technical Analysis Notes",
      description: "In-depth market analysis and strategies",
      icon: FileText,
      href: "/members/notes",
      locked: !isPremium,
      categories: ["Analysis", "Strategies", "Psychology", "Risk Management"]
    },
    {
      title: "Upcoming Classes",
      description: "Live Zoom sessions and recordings",
      icon: Calendar,
      href: "/members/classes",
      locked: !isPremium,
      categories: ["Live Sessions", "Recordings", "Q&A", "Workshops"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gold to-yellow-600 bg-clip-text text-transparent">
              Premium Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {profile?.full_name}! Access your exclusive premium content
            </p>
            {profile?.subscription_end_date && (
              <div className="mt-4 inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-lg px-4 py-2">
                <Crown className="w-4 h-4 text-gold" />
                <span className="text-sm">
                  Subscription renews: <span className="font-semibold text-gold">
                    {new Date(profile.subscription_end_date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Upgrade Banner for Free Members */}
          {!isPremium && (
            <Card className="mb-12 border-gold/50 bg-gradient-to-r from-gold/5 to-blue-500/5">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Crown className="w-6 h-6 text-gold" />
                      <h3 className="text-2xl font-bold">Unlock Premium Access</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Get unlimited access to all video lessons, downloadable resources, exclusive community, and live trading sessions
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="text-gold">✓</span>
                        Complete video library (50+ lessons)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-gold">✓</span>
                        Downloadable eBooks and trading guides
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-gold">✓</span>
                        Premium Telegram community access
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-gold">✓</span>
                        Monthly live Zoom sessions
                      </li>
                    </ul>
                  </div>
                  <Button className="bg-gold hover:bg-gold/90 text-black font-semibold h-12 px-8" asChild>
                    <Link href="/#membership">
                      Upgrade Now
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card 
                key={index} 
                className={`border-border/50 hover:border-gold/50 transition-all ${
                  resource.locked ? "opacity-60" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 ${resource.locked ? "bg-muted/50" : "bg-gold/10"} rounded-xl flex items-center justify-center`}>
                      <resource.icon className={`w-8 h-8 ${resource.locked ? "text-muted-foreground" : "text-gold"}`} />
                    </div>
                    {resource.locked && (
                      <div className="bg-muted/50 border border-border/50 rounded-full px-3 py-1 flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        <span className="text-xs font-semibold">Premium Only</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-2xl mb-2">{resource.title}</CardTitle>
                  <p className="text-muted-foreground">{resource.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {resource.categories.map((category, idx) => (
                      <span key={idx} className="text-xs bg-muted/50 rounded-full px-3 py-1">
                        {category}
                      </span>
                    ))}
                  </div>
                  <Button 
                    className="w-full" 
                    variant={resource.locked ? "outline" : "default"}
                    disabled={resource.locked}
                    asChild={!resource.locked}
                  >
                    {resource.locked ? (
                      <span>Locked - Upgrade Required</span>
                    ) : (
                      <Link href={resource.href}>
                        Access Now
                      </Link>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Link href="/members/videos">
              <Card className="hover:shadow-lg hover:border-gold transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-gold" />
                    Video Library
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">93+ training videos</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/members/downloads">
              <Card className="hover:shadow-lg hover:border-gold transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-gold" />
                    eBook Library
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">103 comprehensive eBooks</p>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-lg hover:border-gold transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  TradingView Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">Premium indicators access</p>
                <Button className="w-full bg-gold hover:bg-gold/90 text-black text-sm" asChild>
                  <a href="https://www.tradingview.com/" target="_blank" rel="noopener noreferrer">
                    Access Now
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Link href="/members/notes">
              <Card className="hover:shadow-lg hover:border-gold transition-all cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gold" />
                    Trading Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Your personal trading journal</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Quick Stats */}
          {isPremium && (
            <div className="mt-12 grid md:grid-cols-4 gap-6">
              <Card className="border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gold mb-2">50+</div>
                  <p className="text-sm text-muted-foreground">Video Lessons</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gold mb-2">15+</div>
                  <p className="text-sm text-muted-foreground">Downloadable Resources</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gold mb-2">25+</div>
                  <p className="text-sm text-muted-foreground">Technical Notes</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-gold mb-2">12</div>
                  <p className="text-sm text-muted-foreground">Live Sessions/Year</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
