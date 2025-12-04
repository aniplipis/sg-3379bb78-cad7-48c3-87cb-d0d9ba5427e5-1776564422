
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Lock, ChevronRight, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function TechnicalNotes() {
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

  const notes = [
    {
      title: "Understanding Wyckoff Market Phases",
      category: "Wyckoff",
      date: "Dec 1, 2025",
      readTime: "12 min",
      excerpt: "Deep dive into accumulation, markup, distribution, and markdown phases with FCPO examples",
      tags: ["Phase Analysis", "Market Structure", "Institutional"]
    },
    {
      title: "Liquidity Mapping in FCPO Markets",
      category: "Smart Money",
      date: "Nov 28, 2025",
      readTime: "10 min",
      excerpt: "Identifying liquidity pools and understanding how smart money targets stop losses",
      tags: ["Liquidity", "Stop Hunts", "SMC"]
    },
    {
      title: "BOS vs CHoCH: Understanding the Difference",
      category: "Smart Money",
      date: "Nov 25, 2025",
      readTime: "8 min",
      excerpt: "Clear explanation of Break of Structure and Change of Character with practical examples",
      tags: ["BOS", "CHoCH", "Trend Change"]
    },
    {
      title: "Killzone Execution Strategy",
      category: "Strategy",
      date: "Nov 20, 2025",
      readTime: "15 min",
      excerpt: "Optimal entry timing using London and New York killzones for FCPO trading",
      tags: ["Killzones", "Timing", "Execution"]
    },
    {
      title: "FCPO Volatility Patterns",
      category: "FCPO Analysis",
      date: "Nov 15, 2025",
      readTime: "11 min",
      excerpt: "Analyzing seasonal and daily volatility patterns specific to palm oil futures",
      tags: ["Volatility", "Patterns", "FCPO"]
    },
    {
      title: "Order Block Confirmation Techniques",
      category: "Smart Money",
      date: "Nov 10, 2025",
      readTime: "9 min",
      excerpt: "How to confirm valid order blocks and filter out false signals",
      tags: ["Order Blocks", "Confirmation", "Entry"]
    },
    {
      title: "Fair Value Gap Trading Rules",
      category: "Smart Money",
      date: "Nov 5, 2025",
      readTime: "7 min",
      excerpt: "Complete guide to trading FVG fills with proper risk management",
      tags: ["FVG", "Imbalance", "Trading Rules"]
    },
    {
      title: "Volume Profile POC Strategy",
      category: "Volume Analysis",
      date: "Nov 1, 2025",
      readTime: "13 min",
      excerpt: "Using Point of Control for high-probability trade entries and exits",
      tags: ["Volume Profile", "POC", "Value Area"]
    },
    {
      title: "Delta Divergence Signals",
      category: "Order Flow",
      date: "Oct 28, 2025",
      readTime: "10 min",
      excerpt: "Spotting institutional accumulation and distribution through delta analysis",
      tags: ["Delta", "Divergence", "Footprint"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link href="/members" className="inline-flex items-center gap-2 text-gold hover:text-gold/80 mb-4">
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gold">Technical Analysis Notes</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              In-depth articles on trading concepts, strategies, and market analysis
            </p>
          </div>

          {!isPremium && (
            <Card className="mb-12 border-gold/50 bg-gradient-to-r from-gold/5 to-blue-500/5">
              <CardContent className="p-8 text-center">
                <Lock className="w-16 h-16 text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Premium Content Locked</h3>
                <p className="text-muted-foreground mb-6">
                  Upgrade to premium membership to access all technical notes
                </p>
                <Button className="bg-gold hover:bg-gold/90 text-black font-semibold" asChild>
                  <Link href="/#membership">Upgrade to Premium</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Notes List */}
          <div className="space-y-6">
            {notes.map((note, index) => (
              <Card 
                key={index} 
                className={`border-border/50 hover:border-gold/50 transition-all ${
                  !isPremium ? "opacity-60" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-gold/10 rounded-full px-3 py-1">
                        <span className="text-xs font-semibold text-gold">{note.category}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{note.readTime} read</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{note.date}</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{note.title}</CardTitle>
                  <p className="text-muted-foreground">{note.excerpt}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs bg-muted/50 rounded-full px-3 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button 
                    variant={isPremium ? "default" : "outline"}
                    disabled={!isPremium}
                  >
                    {isPremium ? (
                      <>
                        <FileText className="w-4 h-4 mr-2" />
                        Read Full Article
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Locked
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {isPremium && (
            <Card className="mt-12 border-border/50 bg-gradient-to-r from-gold/5 to-blue-500/5">
              <CardContent className="p-8 text-center">
                <TrendingUp className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">New Content Added Weekly</h3>
                <p className="text-muted-foreground">
                  Stay updated with fresh market analysis, trading insights, and educational content every week
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
