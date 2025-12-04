
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Lock, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Downloads() {
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

  const downloadables = [
    {
      title: "FCPO Smart Money Playbook",
      description: "Complete guide to institutional trading patterns in FCPO markets",
      pages: 85,
      size: "12 MB",
      type: "eBook",
      icon: BookOpen
    },
    {
      title: "Wyckoff Summary Notes",
      description: "Condensed reference guide for Wyckoff methodology and market phases",
      pages: 32,
      size: "4 MB",
      type: "Guide",
      icon: FileText
    },
    {
      title: "Trading Checklist Master",
      description: "Pre-trade, during-trade, and post-trade checklists for consistent execution",
      pages: 8,
      size: "1 MB",
      type: "Template",
      icon: FileText
    },
    {
      title: "Volume & Delta Analysis Guide",
      description: "Understanding footprint charts, delta divergence, and volume profile",
      pages: 45,
      size: "8 MB",
      type: "eBook",
      icon: BookOpen
    },
    {
      title: "FCPO Trend Mapping Notes",
      description: "Visual guide to identifying and trading FCPO market trends",
      pages: 28,
      size: "6 MB",
      type: "Guide",
      icon: FileText
    },
    {
      title: "Risk Management Calculator",
      description: "Excel template for position sizing and risk-reward calculations",
      pages: 0,
      size: "2 MB",
      type: "Template",
      icon: FileText
    },
    {
      title: "Smart Money Concepts Reference",
      description: "Quick reference guide for BOS, CHoCH, OB, FVG, and liquidity concepts",
      pages: 18,
      size: "3 MB",
      type: "Guide",
      icon: FileText
    },
    {
      title: "Trading Psychology Workbook",
      description: "Exercises and strategies for maintaining discipline and emotional control",
      pages: 42,
      size: "5 MB",
      type: "Workbook",
      icon: BookOpen
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
              <span className="text-gold">Downloadable Resources</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              eBooks, guides, templates, and trading tools for offline learning
            </p>
          </div>

          {!isPremium && (
            <Card className="mb-12 border-gold/50 bg-gradient-to-r from-gold/5 to-blue-500/5">
              <CardContent className="p-8 text-center">
                <Lock className="w-16 h-16 text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Premium Content Locked</h3>
                <p className="text-muted-foreground mb-6">
                  Upgrade to premium membership to download all resources
                </p>
                <Button className="bg-gold hover:bg-gold/90 text-black font-semibold" asChild>
                  <Link href="/#membership">Upgrade to Premium</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Downloads Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadables.map((item, index) => (
              <Card 
                key={index} 
                className={`border-border/50 hover:border-gold/50 transition-all ${
                  !isPremium ? "opacity-60" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${isPremium ? "bg-gold/10" : "bg-muted/50"} rounded-xl flex items-center justify-center`}>
                      <item.icon className={`w-7 h-7 ${isPremium ? "text-gold" : "text-muted-foreground"}`} />
                    </div>
                    <div className="bg-muted/50 rounded-full px-3 py-1">
                      <span className="text-xs font-semibold">{item.type}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    {item.pages > 0 && <span>{item.pages} pages</span>}
                    <span>•</span>
                    <span>{item.size}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    variant={isPremium ? "default" : "outline"}
                    disabled={!isPremium}
                  >
                    {isPremium ? (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
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
            <Card className="mt-12 border-border/50 bg-muted/30">
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">All Resources Included</h3>
                <p className="text-muted-foreground mb-4">
                  Download and keep all materials permanently. New resources added monthly for premium members.
                </p>
                <p className="text-sm text-muted-foreground">
                  Last updated: December 2025
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
