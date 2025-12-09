import { TrendingUp, Target, Brain, Trophy, Award } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-background via-background/95 to-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gold bg-clip-text text-transparent">
                Meet Abg Max (M. Haniff Hassan)
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-gold to-neon-blue rounded-full"></div>
            </div>

            <div className="text-lg text-muted-foreground space-y-4">
              <p>
                From struggling retail trader to respected FCPO mentor — this is <span className="font-semibold">Abg Max</span>, real name <span className="font-semibold text-gold">M. Haniff Hassan</span>.
              </p>
              
              <p>
                Starting with small capital & big dreams over 20 years ago, he went through every trader mistake imaginable. Instead of giving up, he committed to understanding how Smart Money truly moves.
              </p>

              <p>
                Today — with <span className="font-semibold text-neon-blue">1001+ students</span> and <span className="font-semibold text-neon-blue">6 years teaching FCPO</span> — he teaches the exact system he wished existed when he started:
              </p>

              <p className="text-gold font-semibold italic">
                Hybrid Smart Money Concept (SMC) — structured, clean, indicator-assisted, and designed specifically for FCPO.
              </p>

              <p className="text-foreground italic border-l-4 border-gold pl-4">
                "If you can follow structure, you can follow success. SMC bukan teori — ia adalah cara Smart Money berfikir."
              </p>
            </div>

            {/* Achievement Highlights */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-muted/30 p-4 rounded-xl border border-gold/20">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-gold" />
                  <h4 className="font-semibold">Experience</h4>
                </div>
                <p className="text-sm text-muted-foreground">20+ Years Active FCPO Trading</p>
              </div>

              <div className="bg-muted/30 p-4 rounded-xl border border-neon-blue/20">
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-neon-blue" />
                  <h4 className="font-semibold">Specialization</h4>
                </div>
                <p className="text-sm text-muted-foreground">Intraday FCPO Precision Trading</p>
              </div>

              <div className="bg-muted/30 p-4 rounded-xl border border-gold/20">
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-5 h-5 text-gold" />
                  <h4 className="font-semibold">Methodology</h4>
                </div>
                <p className="text-sm text-muted-foreground">Wyckoff + SMC + Order Flow</p>
              </div>

              <div className="bg-muted/30 p-4 rounded-xl border border-neon-blue/20">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-5 h-5 text-neon-blue" />
                  <h4 className="font-semibold">Registration</h4>
                </div>
                <p className="text-sm text-muted-foreground">SC Malaysia Approved</p>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-full flex items-center">
            <div className="relative w-full h-[600px] md:h-[700px]">
              <Image
                src="/me.png"
                alt="Abg Max - FCPO Trading Educator"
                fill
                className="object-contain object-bottom"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Awards & Rankings Section */}
        <div className="mt-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Proven Track Record & <span className="text-gold">Championship Results</span>
            </h3>
            <p className="text-xl text-muted-foreground">
              Multiple #1 rankings and top 5 finishes in major trading competitions
            </p>
          </div>

          {/* Bursa Malaysia DVTC Rankings */}
          <div className="mb-16">
            <Card className="border-gold/30 bg-gradient-to-br from-gold/5 to-transparent">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="w-8 h-8 text-gold" />
                  <h4 className="text-2xl font-bold">Bursa Malaysia DVTC Rankings - All First Place 🏆</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Placeholder for 3 DVTC Ranking Images */}
                  <div className="aspect-[3/4] bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg border-2 border-gold/30 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Trophy className="w-16 h-16 text-gold mx-auto mb-3" />
                      <p className="text-gold font-bold text-lg">DVTC Ranking #1</p>
                      <p className="text-sm text-muted-foreground mt-2">Image Placeholder 1</p>
                    </div>
                  </div>
                  <div className="aspect-[3/4] bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg border-2 border-gold/30 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Trophy className="w-16 h-16 text-gold mx-auto mb-3" />
                      <p className="text-gold font-bold text-lg">DVTC Ranking #1</p>
                      <p className="text-sm text-muted-foreground mt-2">Image Placeholder 2</p>
                    </div>
                  </div>
                  <div className="aspect-[3/4] bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg border-2 border-gold/30 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Trophy className="w-16 h-16 text-gold mx-auto mb-3" />
                      <p className="text-gold font-bold text-lg">DVTC Ranking #1</p>
                      <p className="text-sm text-muted-foreground mt-2">Image Placeholder 3</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* TradingView Championship */}
          <Card className="border-neon-blue/30 bg-gradient-to-br from-neon-blue/5 to-transparent">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-8 h-8 text-neon-blue" />
                <h4 className="text-2xl font-bold">TradingView The Leap Trading Championship - Top 5 of 50,000 Traders 🌟</h4>
              </div>
              <div className="aspect-video bg-gradient-to-br from-neon-blue/20 to-neon-blue/5 rounded-lg border-2 border-neon-blue/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <Trophy className="w-20 h-20 text-neon-blue mx-auto mb-4" />
                  <p className="text-neon-blue font-bold text-2xl mb-2">Top 5 Finalist</p>
                  <p className="text-xl text-muted-foreground mb-2">Out of 50,000+ Traders Worldwide</p>
                  <p className="text-sm text-muted-foreground">TradingView Championship Image Placeholder</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}