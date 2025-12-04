
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Video, Lock, ChevronRight, Clock, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Classes() {
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

  const upcomingClasses = [
    {
      title: "Monthly Live Trading Session",
      date: "December 15, 2025",
      time: "2:00 PM - 5:00 PM MYT",
      platform: "Zoom",
      spots: 50,
      description: "Live market analysis and real-time trading demonstrations",
      topics: ["FCPO market review", "Live trade setups", "Q&A session"]
    },
    {
      title: "Wyckoff Master Workshop",
      date: "December 28, 2025",
      time: "10:00 AM - 4:00 PM MYT",
      platform: "Zoom",
      spots: 30,
      description: "Deep dive into Wyckoff methodology with practical applications",
      topics: ["Phase analysis", "Volume spread", "Spring setups", "Live examples"]
    }
  ];

  const pastSessions = [
    {
      title: "November Live Trading Session",
      date: "Nov 15, 2025",
      duration: "3 hours",
      recording: true
    },
    {
      title: "Smart Money Concepts Workshop",
      date: "Nov 8, 2025",
      duration: "5 hours",
      recording: true
    },
    {
      title: "October Live Trading Session",
      date: "Oct 20, 2025",
      duration: "3 hours",
      recording: true
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
              <span className="text-gold">Live Classes & Sessions</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Join live Zoom sessions and access recordings of past workshops
            </p>
          </div>

          {!isPremium && (
            <Card className="mb-12 border-gold/50 bg-gradient-to-r from-gold/5 to-blue-500/5">
              <CardContent className="p-8 text-center">
                <Lock className="w-16 h-16 text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">Premium Content Locked</h3>
                <p className="text-muted-foreground mb-6">
                  Upgrade to premium membership to join live classes
                </p>
                <Button className="bg-gold hover:bg-gold/90 text-black font-semibold" asChild>
                  <Link href="/#membership">Upgrade to Premium</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Classes */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-gold" />
              Upcoming Classes
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingClasses.map((session, index) => (
                <Card 
                  key={index} 
                  className={`border-border/50 hover:border-gold/50 transition-all ${
                    !isPremium ? "opacity-60" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="bg-gold/10 rounded-full px-3 py-1">
                        <span className="text-xs font-semibold text-gold">LIVE SESSION</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{session.spots} spots</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2">{session.title}</CardTitle>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gold" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gold" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-gold" />
                        <span>{session.platform}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{session.description}</p>
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-foreground/80 uppercase tracking-wide mb-2">Topics Covered:</p>
                      <ul className="space-y-1">
                        {session.topics.map((topic, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-gold">•</span>
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button 
                      className="w-full" 
                      variant={isPremium ? "default" : "outline"}
                      disabled={!isPremium}
                    >
                      {isPremium ? (
                        "Register for Class"
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
          </div>

          {/* Past Sessions */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Video className="w-6 h-6 text-gold" />
              Session Recordings
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {pastSessions.map((session, index) => (
                <Card 
                  key={index} 
                  className={`border-border/50 hover:border-gold/50 transition-all ${
                    !isPremium ? "opacity-60" : ""
                  }`}
                >
                  <CardHeader>
                    <div className="bg-muted/50 rounded-full px-3 py-1 inline-block mb-3">
                      <span className="text-xs font-semibold">RECORDING</span>
                    </div>
                    <CardTitle className="text-lg mb-2">{session.title}</CardTitle>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{session.duration}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      variant={isPremium ? "default" : "outline"}
                      disabled={!isPremium}
                      size="sm"
                    >
                      {isPremium ? (
                        <>
                          <Video className="w-4 h-4 mr-2" />
                          Watch Recording
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
          </div>

          {isPremium && (
            <Card className="mt-12 border-border/50 bg-muted/30">
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Monthly Live Sessions</h3>
                <p className="text-muted-foreground mb-4">
                  Premium members get access to 12 live sessions per year plus all recordings
                </p>
                <p className="text-sm text-muted-foreground">
                  Zoom link sent 24 hours before each session via email and Telegram
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
