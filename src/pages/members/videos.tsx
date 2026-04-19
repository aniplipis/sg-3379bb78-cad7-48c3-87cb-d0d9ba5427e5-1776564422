import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Lock, Clock } from "lucide-react";
import { SEO } from "@/components/SEO";

interface Video {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  vimeoId: string;
  description: string;
}

interface VideoSeries {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  isPremium: boolean;
  isFeatured?: boolean;
  videos: Video[];
}

const videoData: VideoSeries[] = [
  {
    id: "hybrid-smc-april-2026",
    title: "Hybrid SMC April 2026",
    description: "Latest Hybrid SMC trading strategies and market analysis for April 2026",
    thumbnail: "https://vumbnail.com/1184467185.jpg",
    isPremium: true,
    isFeatured: true,
    videos: [
      {
        id: "hybrid-smc-apr26-part1",
        title: "Hybrid SMC April 2026 - Part 1",
        duration: "TBD",
        thumbnail: "https://vumbnail.com/1184467185.jpg",
        vimeoId: "1184467185",
        description: "Hybrid SMC trading strategies and market analysis - Part 1"
      },
      {
        id: "hybrid-smc-apr26-part2",
        title: "Hybrid SMC April 2026 - Part 2",
        duration: "TBD",
        thumbnail: "https://vumbnail.com/1184467228.jpg",
        vimeoId: "1184467228",
        description: "Hybrid SMC trading strategies and market analysis - Part 2"
      }
    ]
  },
  {
    id: "hybrid-smc-march-2026",
    title: "Hybrid SMC March 2026",
    description: "Advanced Smart Money Concepts combined with hybrid trading strategies for March 2026",
    thumbnail: "https://vumbnail.com/1158028115.jpg",
    isPremium: true,
    isFeatured: false,
    videos: [
      {
        id: "hybrid-smc-mar26-part1",
        title: "Hybrid SMC March 2026 - Part 1",
        duration: "1:45:30",
        thumbnail: "https://vumbnail.com/1158028115.jpg",
        vimeoId: "1158028115",
        description: "Introduction to Hybrid SMC methodology and market structure analysis"
      },
      {
        id: "hybrid-smc-mar26-part2",
        title: "Hybrid SMC March 2026 - Part 2",
        duration: "1:52:15",
        thumbnail: "https://vumbnail.com/1158028161.jpg",
        vimeoId: "1158028161",
        description: "Advanced order blocks and liquidity concepts"
      },
      {
        id: "hybrid-smc-mar26-part3",
        title: "Hybrid SMC March 2026 - Part 3",
        duration: "1:38:45",
        thumbnail: "https://vumbnail.com/1158028196.jpg",
        vimeoId: "1158028196",
        description: "Entry and exit strategies using Hybrid SMC"
      },
      {
        id: "hybrid-smc-mar26-part4",
        title: "Hybrid SMC March 2026 - Part 4",
        duration: "1:41:20",
        thumbnail: "https://vumbnail.com/1158028244.jpg",
        vimeoId: "1158028244",
        description: "Risk management and position sizing in Hybrid SMC trading"
      }
    ]
  },
  {
    id: "ai-trading-view",
    title: "AI Trading View Masterclass",
    description: "Master AI-powered technical analysis using TradingView's advanced features and automation",
    thumbnail: "https://vumbnail.com/1139134881.jpg",
    isPremium: true,
    isFeatured: false,
    videos: [
      {
        id: "ai-tv-part1",
        title: "AI Trading View - Part 1: Platform Setup",
        duration: "1:23:45",
        thumbnail: "https://vumbnail.com/1139134881.jpg",
        vimeoId: "1139134881",
        description: "Complete TradingView setup and AI indicator configuration"
      },
      {
        id: "ai-tv-part2",
        title: "AI Trading View - Part 2: Advanced Indicators",
        duration: "1:31:20",
        thumbnail: "https://vumbnail.com/1139134936.jpg",
        vimeoId: "1139134936",
        description: "Deep dive into AI-powered indicators and signal generation"
      },
      {
        id: "ai-tv-part3",
        title: "AI Trading View - Part 3: Strategy Development",
        duration: "1:28:15",
        thumbnail: "https://vumbnail.com/1139134992.jpg",
        vimeoId: "1139134992",
        description: "Building and backtesting automated trading strategies"
      },
      {
        id: "ai-tv-part4",
        title: "AI Trading View - Part 4: Alerts & Automation",
        duration: "1:19:30",
        thumbnail: "https://vumbnail.com/1139135037.jpg",
        vimeoId: "1139135037",
        description: "Setting up smart alerts and trade automation workflows"
      }
    ]
  },
  {
    id: "futures-masterclass",
    title: "Futures Trading Masterclass",
    description: "Complete guide to trading FCPO futures with proven strategies and risk management",
    thumbnail: "https://vumbnail.com/1054736134.jpg",
    isPremium: true,
    isFeatured: false,
    videos: [
      {
        id: "futures-intro",
        title: "Introduction to FCPO Futures",
        duration: "45:30",
        thumbnail: "https://vumbnail.com/1054736134.jpg",
        vimeoId: "1054736134",
        description: "Understanding FCPO futures contracts and market dynamics"
      },
      {
        id: "futures-analysis",
        title: "Technical Analysis for Futures",
        duration: "52:15",
        thumbnail: "https://vumbnail.com/1054736167.jpg",
        vimeoId: "1054736167",
        description: "Advanced chart patterns and indicators for futures trading"
      },
      {
        id: "futures-strategies",
        title: "Proven Trading Strategies",
        duration: "58:45",
        thumbnail: "https://vumbnail.com/1054736193.jpg",
        vimeoId: "1054736193",
        description: "Battle-tested strategies for consistent profits"
      },
      {
        id: "futures-risk",
        title: "Risk Management & Psychology",
        duration: "48:20",
        thumbnail: "https://vumbnail.com/1054736221.jpg",
        vimeoId: "1054736221",
        description: "Protecting your capital and managing trading psychology"
      }
    ]
  },
  {
    id: "beginner-basics",
    title: "Trading Basics for Beginners",
    description: "Essential foundation for new traders - FREE access for all members",
    thumbnail: "https://vumbnail.com/1054736134.jpg",
    isPremium: false,
    isFeatured: false,
    videos: [
      {
        id: "basics-intro",
        title: "Getting Started with Trading",
        duration: "32:15",
        thumbnail: "https://vumbnail.com/1054736134.jpg",
        vimeoId: "1054736134",
        description: "Introduction to financial markets and trading concepts"
      },
      {
        id: "basics-charts",
        title: "Reading Charts & Candlesticks",
        duration: "38:45",
        thumbnail: "https://vumbnail.com/1054736167.jpg",
        vimeoId: "1054736167",
        description: "Understanding price action and candlestick patterns"
      },
      {
        id: "basics-indicators",
        title: "Essential Technical Indicators",
        duration: "41:30",
        thumbnail: "https://vumbnail.com/1054736193.jpg",
        vimeoId: "1054736193",
        description: "Key indicators every trader should know"
      }
    ]
  }
];

export default function VideosPage() {
  const { user, isPremium, loading } = useAuth();
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const filteredSeries = videoData.filter(series => {
    if (activeTab === "all") return true;
    if (activeTab === "premium") return series.isPremium;
    if (activeTab === "free") return !series.isPremium;
    return true;
  });

  const featuredSeries = videoData.find(series => series.isFeatured);

  return (
    <>
      <SEO 
        title="Video Library - Max Saham"
        description="Access premium trading education videos and courses"
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Video Library</h1>
            <p className="text-muted-foreground">
              Access our comprehensive collection of trading education videos
            </p>
          </div>

          {/* Featured Series */}
          {featuredSeries && (
            <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">Featured Series</Badge>
                  {featuredSeries.isPremium && (
                    <Badge variant="secondary" className="gap-1">
                      <Lock className="h-3 w-3" />
                      Premium
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl">{featuredSeries.title}</CardTitle>
                <CardDescription>{featuredSeries.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {featuredSeries.videos.slice(0, 2).map((video) => (
                    <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="relative aspect-video">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                          <Button
                            size="lg"
                            className="rounded-full"
                            onClick={() => {
                              if (!featuredSeries.isPremium || isPremium) {
                                setSelectedVideo(video);
                              }
                            }}
                            disabled={featuredSeries.isPremium && !isPremium}
                          >
                            {featuredSeries.isPremium && !isPremium ? (
                              <>
                                <Lock className="mr-2 h-5 w-5" />
                                Premium Only
                              </>
                            ) : (
                              <>
                                <Play className="mr-2 h-5 w-5" />
                                Play
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{video.title}</CardTitle>
                        <CardDescription>{video.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs for filtering */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Videos</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
              <TabsTrigger value="free">Free</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Video Series Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSeries.map((series) => (
              <Card key={series.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative aspect-video">
                  <img 
                    src={series.thumbnail} 
                    alt={series.title}
                    className="w-full h-full object-cover"
                  />
                  {series.isPremium && (
                    <Badge className="absolute top-2 right-2 gap-1">
                      <Lock className="h-3 w-3" />
                      Premium
                    </Badge>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{series.title}</CardTitle>
                  <CardDescription>{series.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {series.videos.length} video{series.videos.length !== 1 ? "s" : ""}
                    </p>
                    <div className="space-y-2">
                      {series.videos.map((video) => (
                        <Button
                          key={video.id}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => {
                            if (!series.isPremium || isPremium) {
                              setSelectedVideo(video);
                            }
                          }}
                          disabled={series.isPremium && !isPremium}
                        >
                          {series.isPremium && !isPremium ? (
                            <>
                              <Lock className="mr-2 h-4 w-4" />
                              {video.title}
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              {video.title}
                            </>
                          )}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upgrade prompt for non-premium users */}
          {!isPremium && (
            <Card className="mt-8 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Unlock Premium Content
                </CardTitle>
                <CardDescription>
                  Get access to all premium video series and advanced trading strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => router.push("/profile")}>
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          )}
        </main>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div 
              className="bg-background rounded-lg max-w-4xl w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video">
                <iframe
                  src={`https://player.vimeo.com/video/${selectedVideo.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  title={selectedVideo.title}
                ></iframe>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                <p className="text-muted-foreground mb-4">{selectedVideo.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {selectedVideo.duration}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setSelectedVideo(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}