
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Play, Lock, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VideoLibrary() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const categories = [
    { id: "all", label: "All Videos", count: 52 },
    { id: "wyckoff", label: "Wyckoff Lessons", count: 12 },
    { id: "smc", label: "Smart Money Concepts", count: 15 },
    { id: "fcpo", label: "FCPO Strategy", count: 10 },
    { id: "orderflow", label: "Order Flow & Delta", count: 8 },
    { id: "volume", label: "Volume Profile", count: 5 },
    { id: "risk", label: "Risk Management", count: 7 },
    { id: "live", label: "Live Trading Replays", count: 18 },
    { id: "psychology", label: "Trading Psychology", count: 6 }
  ];

  const videos = [
    {
      id: 1,
      title: "Introduction to Wyckoff Methodology",
      category: "wyckoff",
      duration: "45:32",
      thumbnail: "/placeholder-video.jpg",
      vimeoId: "placeholder123",
      description: "Understanding the four phases of the market cycle"
    },
    {
      id: 2,
      title: "Smart Money Concepts: Break of Structure",
      category: "smc",
      duration: "38:15",
      thumbnail: "/placeholder-video.jpg",
      vimeoId: "placeholder124",
      description: "Identifying institutional order flow through BOS patterns"
    },
    {
      id: 3,
      title: "FCPO Intraday Scalping Strategy",
      category: "fcpo",
      duration: "52:20",
      thumbnail: "/placeholder-video.jpg",
      vimeoId: "placeholder125",
      description: "Complete scalping system for FCPO futures"
    },
    {
      id: 4,
      title: "Order Flow Footprint Chart Analysis",
      category: "orderflow",
      duration: "41:45",
      thumbnail: "/placeholder-video.jpg",
      vimeoId: "placeholder126",
      description: "Reading aggressive buying and selling in real-time"
    },
    {
      id: 5,
      title: "Volume Profile and POC Trading",
      category: "volume",
      duration: "35:10",
      thumbnail: "/placeholder-video.jpg",
      vimeoId: "placeholder127",
      description: "Using volume profile to find key price levels"
    },
    {
      id: 6,
      title: "Risk Management Fundamentals",
      category: "risk",
      duration: "29:55",
      thumbnail: "/placeholder-video.jpg",
      vimeoId: "placeholder128",
      description: "Position sizing and capital preservation strategies"
    }
  ];

  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

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
              <span className="text-gold">Video Library</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Complete collection of FCPO trading lessons and strategies
            </p>
          </div>

          {!isPremium && (
            <Card className="mb-12 border-gold/50 bg-gradient-to-r from-gold/5 to-blue-500/5">
              <CardContent className="p-8 text-center">
                <Lock className="w-16 h-16 text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Premium Content Locked</h3>
                <p className="text-muted-foreground mb-6">
                  Upgrade to premium membership to access all video lessons
                </p>
                <Button className="bg-gold hover:bg-gold/90 text-black font-semibold" asChild>
                  <Link href="/#membership">Upgrade to Premium</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={selectedCategory === category.id ? "bg-gold hover:bg-gold/90 text-black" : ""}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
                <span className="ml-2 text-xs opacity-70">({category.count})</span>
              </Button>
            ))}
          </div>

          {/* Videos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card 
                key={video.id} 
                className={`border-border/50 hover:border-gold/50 transition-all group ${
                  !isPremium ? "opacity-60" : ""
                }`}
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-video bg-gradient-to-br from-gold/20 to-blue-500/20 rounded-t-xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-black/50 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        {isPremium ? (
                          <Play className="w-8 h-8 text-gold" />
                        ) : (
                          <Lock className="w-8 h-8 text-gold" />
                        )}
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur rounded-full px-3 py-1 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold" />
                      <span className="text-sm text-white">{video.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-xs text-gold uppercase tracking-wide mb-2">
                    {categories.find(c => c.id === video.category)?.label}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{video.description}</p>
                  <Button 
                    className="w-full" 
                    variant={isPremium ? "default" : "outline"}
                    disabled={!isPremium}
                  >
                    {isPremium ? (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Watch Now
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

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <Video className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No videos found in this category</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
