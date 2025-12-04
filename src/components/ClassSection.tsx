
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, CheckCircle2, Calendar, Users, Video, BookOpen } from "lucide-react";

export function ClassSection() {
  const syllabus = [
    "Wyckoff Market Phases & Cycle Analysis",
    "Smart Money Concepts (BOS, CHoCH, OB, FVG)",
    "Order Flow & Volume Profile Reading",
    "FCPO Market Structure & Behavior",
    "Live Trading Session Analysis",
    "Risk Management & Position Sizing",
    "Trading Psychology & Discipline",
    "Q&A and Personalized Guidance"
  ];

  return (
    <section id="class" className="py-20 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-6 py-2 mb-6">
            <GraduationCap className="w-5 h-5 text-gold" />
            <span className="text-gold font-semibold">Education</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Max Saham <span className="text-gold">Online Trading Class</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive FCPO trading education combining theory, strategy, and live market analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Class Poster/Image */}
          <Card className="border-border/50 bg-gradient-to-br from-gold/5 to-blue-500/5 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[4/3] bg-gradient-to-br from-gold/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <GraduationCap className="w-24 h-24 text-gold mx-auto mb-4" />
                  <h3 className="text-3xl font-bold mb-2">FCPO Trading Masterclass</h3>
                  <p className="text-muted-foreground">Professional Training Program</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Class Details */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-6">What You'll Learn</h3>
                <ul className="space-y-3">
                  {syllabus.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              <Card className="border-border/50 bg-card/50">
                <CardContent className="p-4 text-center">
                  <Calendar className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">Full Day</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Format</p>
                  <p className="font-semibold">Online Live</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50">
                <CardContent className="p-4 text-center">
                  <Video className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Platform</p>
                  <p className="font-semibold">Zoom</p>
                </CardContent>
              </Card>
            </div>

            <Button className="w-full bg-gold hover:bg-gold/90 text-black font-semibold h-14 text-lg">
              Register for Next Class
            </Button>
          </div>
        </div>

        <Card className="border-gold/20 bg-gradient-to-r from-gold/5 to-blue-500/5">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Bonus Materials Included</h3>
            <p className="text-muted-foreground mb-4">
              All students receive comprehensive study materials, trading templates, and lifetime access to course recordings
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-gold/10 border border-gold/20 rounded-full px-4 py-2">Trading Checklist</span>
              <span className="bg-gold/10 border border-gold/20 rounded-full px-4 py-2">Strategy Templates</span>
              <span className="bg-gold/10 border border-gold/20 rounded-full px-4 py-2">Course Recordings</span>
              <span className="bg-gold/10 border border-gold/20 rounded-full px-4 py-2">Community Access</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
