import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, BookOpen, TrendingUp, Crown, Play, Lock, ChevronRight, Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FreeDashboard() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/?login=true");
    }
    // Redirect premium users to premium dashboard
    if (!isLoading && profile?.is_premium) {
      router.push("/members");
    }
  }, [user, profile, isLoading, router]);

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

  if (!user || profile?.is_premium) {
    return null;
  }

  const freeVideos = [
    {
      id: "free-1",
      title: "KRK FUTURES TRADING (PART 1) - June 2025",
      duration: "Video Length",
      vimeoId: "1144426249",
      thumbnail: "https://vumbnail.com/1144426249.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144426249?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 1) 16_06_2025"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Introduction to Futures Trading - Kelas Rancangan Khas"
    },
    {
      id: "free-2",
      title: "KRK FUTURES TRADING (PART 1) - April 2025",
      duration: "Video Length",
      vimeoId: "1144425810",
      thumbnail: "https://vumbnail.com/1144425810.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144425810?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 1) 21_04_2025"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading Fundamentals"
    },
    {
      id: "free-3",
      title: "FOUNDATIONS OF HYBRID SMC (PART 1) - August 2024",
      duration: "Video Length",
      vimeoId: "1144427601",
      thumbnail: "https://vumbnail.com/1144427601.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144427601?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="MAX SAHAM X FINLEARN SPOTLIGHT SESSION - FOUNDATIONS OF HYBRID SMC - KRK FUTURES TRADING (PART 1)"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "MAX SAHAM X FINLEARN SPOTLIGHT SESSION - Foundations of Hybrid SMC"
    },
    {
      id: "free-4",
      title: "HIGH WIN RATE UNTUK FCPO, ZL & CL (PART 1) - May 2024",
      duration: "Video Length",
      vimeoId: "1144427159",
      thumbnail: "https://vumbnail.com/1144427159.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144427159?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS UNTUK FUTURES TRADING (PART 1) KAEDAH HIGH WIN RATE UNTUK MARKET FCPO, ZL & CL"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kaedah High Win Rate untuk Market FCPO, ZL & CL"
    }
  ];

  const freeEbooks = [
    {
      id: 3,
      title: "212°: The Complete Trader - God & Rohan Mehta",
      category: ["Trading Mindset", "Trading Psychology"],
      link: "https://drive.google.com/file/d/1NQQ80TeeCm_Dg56UMvdAbBMR8DwbBG17/view?usp=drive_link"
    },
    {
      id: 5,
      title: "A Complete Guide to the Futures Market, Second Edition - Jack D.Schwager and Mark Etzkorn",
      category: ["Futures Trading", "Technical Analysis"],
      link: "https://drive.google.com/file/d/1LSVUv-YFlN2x42XOE6nwWEi1LQ6k-tGG/view?usp=drive_link"
    },
    {
      id: 4,
      title: "SUPER TRADER, MAKE CONSISTENT PROFITS IN GOOD AND BAD MARKETS - Van K. Tharp, Ph.D",
      category: ["Trading Systems", "Trading Psychology"],
      link: "https://drive.google.com/file/d/1kZS5Ew8Jn4-0GrMF9CKLv_gDFLd-k2Gi/view?usp=drive_link"
    }
  ];

  const indicators = [
    {
      name: "MAX SAHAM PUKAT V2",
      description: "🔸 Public Indicator - Add to Favorite untuk akses mudah",
      link: "https://www.tradingview.com/script/0KxsvHg7-MAX-SAHAM-PUKAT-V2/",
      icon: TrendingUp
    },
    {
      name: "MAX SAHAM ADX with DI",
      description: "🔸 Public Indicator - Add to Favorite untuk akses mudah",
      link: "https://www.tradingview.com/script/XCRNzzjn-MAX-SAHAM-ADX-with-DI/",
      icon: TrendingUp
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Banner */}
          <Card className="mb-8 border-gold/30 bg-gradient-to-r from-gold/10 to-blue-500/10">
            <CardContent className="p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome, {profile?.full_name}! 🎉</h1>
                  <p className="text-muted-foreground mb-4">
                    You have free access to essential FCPO trading resources
                  </p>
                </div>
                <Crown className="w-12 h-12 text-gold/50" />
              </div>
              <div className="bg-card/50 rounded-lg p-4 border border-gold/20">
                <p className="text-sm mb-3">🚀 Upgrade to Premium for full access:</p>
                <ul className="text-sm space-y-1 mb-4 text-muted-foreground">
                  <li>✓ 93+ complete training videos</li>
                  <li>✓ 103 comprehensive eBooks</li>
                  <li>✓ Exclusive indicators & tools</li>
                  <li>✓ Private community access</li>
                  <li>✓ Live trading sessions</li>
                </ul>
                <Link href="/#membership">
                  <Button className="bg-gold hover:bg-gold/90 text-black font-semibold">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Premium
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Free Training Videos */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Free Training Videos</h2>
                <p className="text-muted-foreground">4 essential lessons to get you started</p>
              </div>
              <Link href="/#membership">
                <Button variant="outline" className="border-gold/30 hover:bg-gold/10">
                  <Lock className="w-4 h-4 mr-2" />
                  Unlock 89 More Videos
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {freeVideos.map((video) => (
                <Card 
                  key={video.id}
                  className="overflow-hidden hover:shadow-lg hover:border-gold cursor-pointer transition-all"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center">
                        <Play className="h-8 w-8 text-black" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-sm line-clamp-2">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground line-clamp-2">{video.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* TradingView Indicators */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">🌐 Public TradingView Indicators</h2>
                <p className="text-muted-foreground">Free access to public indicators (Terus boleh guna)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {indicators.map((indicator, index) => (
                <Card key={index} className="border-gold/30 hover:border-gold/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{indicator.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{indicator.description}</p>
                      </div>
                      <indicator.icon className="w-8 h-8 text-gold" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gold hover:bg-gold/90 text-black font-semibold" asChild>
                      <a href={indicator.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open in TradingView
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Usage Note */}
            <Card className="mt-6 border-gold/20 bg-gradient-to-r from-gold/5 to-transparent">
              <CardContent className="p-6">
                <p className="text-center text-muted-foreground">
                  📌 <strong>Tip:</strong> Klik "Add to Favorite" dalam TradingView untuk akses mudah dalam chart
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Free eBooks */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Free eBooks</h2>
                <p className="text-muted-foreground">3 essential trading books</p>
              </div>
              <Link href="/#membership">
                <Button variant="outline" className="border-gold/30 hover:bg-gold/10">
                  <Lock className="w-4 h-4 mr-2" />
                  Unlock 100 More eBooks
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {freeEbooks.map((ebook) => (
                <Card key={ebook.id} className="border-border/50 hover:border-gold/50 transition-all">
                  <CardContent className="p-4">
                    <div className="w-full aspect-[3/4] rounded-lg mb-4 overflow-hidden shadow-lg">
                      <img 
                        src={`/${ebook.id}.PNG`}
                        alt={ebook.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-sm mb-2 line-clamp-2">{ebook.title}</h3>
                    <div className="mb-4 flex flex-wrap gap-1">
                      {ebook.category.map((cat, index) => (
                        <span key={index} className="text-xs bg-muted/50 rounded-full px-2 py-1">
                          {cat}
                        </span>
                      ))}
                    </div>
                    <Button 
                      className="w-full bg-gold hover:bg-gold/90 text-black font-semibold"
                      asChild
                    >
                      <a href={ebook.link} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Upgrade CTA */}
          <Card className="border-gold bg-gradient-to-br from-gold/10 to-blue-500/10">
            <CardContent className="p-8 text-center">
              <Crown className="w-16 h-16 text-gold mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-3">Ready for More?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Upgrade to premium and unlock the complete MAX SAHAM experience with 93+ videos, 103 eBooks, 
                exclusive indicators, and access to our private trading community.
              </p>
              <Link href="/#membership">
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-black font-bold text-lg px-8 py-6">
                  <Crown className="w-5 h-5 mr-2" />
                  Upgrade to Premium Now
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
          <div className="bg-background rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedVideo(null)}>
                <ChevronRight className="h-6 w-6 rotate-90" />
              </Button>
            </div>
            <div className="aspect-video bg-black">
              <div dangerouslySetInnerHTML={{ __html: selectedVideo.vimeoEmbed }} className="w-full h-full" />
            </div>
            <div className="p-6">
              <p className="text-muted-foreground">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}