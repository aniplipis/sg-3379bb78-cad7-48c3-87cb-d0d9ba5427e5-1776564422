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
                  {/* DVTC 2021 */}
                  <div>
                    <div className="aspect-[3/4] bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg border-2 border-gold/30 overflow-hidden mb-3">
                      <div className="relative w-full h-full">
                        <Image
                          src="/dvtc2021.jpg"
                          alt="DVTC 2021 Ranking #1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                    <p className="text-center text-lg font-semibold text-gold">2021 Championship</p>
                  </div>
                  {/* DVTC 2022 */}
                  <div>
                    <div className="aspect-[3/4] bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg border-2 border-gold/30 overflow-hidden mb-3">
                      <div className="relative w-full h-full">
                        <Image
                          src="/dvtc2022.jpg"
                          alt="DVTC 2022 Ranking #1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                    <p className="text-center text-lg font-semibold text-gold">2022 Championship</p>
                  </div>
                  {/* DVTC 2024 */}
                  <div>
                    <div className="aspect-[3/4] bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg border-2 border-gold/30 overflow-hidden mb-3">
                      <div className="relative w-full h-full">
                        <Image
                          src="/dvtc2024.jpg"
                          alt="DVTC 2024 Ranking #1"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                    <p className="text-center text-lg font-semibold text-gold">2024 Championship</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* TradingView Championship Section */}
          <Card className="border-neon-blue/30 bg-gradient-to-r from-neon-blue/5 to-neon-blue/10 mb-16">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Trophy className="w-8 h-8 text-neon-blue" />
                <h3 className="text-2xl md:text-3xl font-bold text-center">
                  TradingView The Leap Trading Championship - Top 6 of 50,000+ Traders ⭐
                </h3>
              </div>
              
              <div className="bg-card/30 rounded-lg overflow-hidden border border-neon-blue/20">
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/Tradingview.jpg"
                    alt="TradingView Championship Leaderboard - MaxSaham Top 6 Position"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
                <div className="p-6 text-center bg-gradient-to-b from-transparent to-neon-blue/5">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="w-6 h-6 text-neon-blue" />
                    <h4 className="text-xl font-bold text-neon-blue">Position #6 - MaxSaham</h4>
                  </div>
                  <p className="text-lg text-muted-foreground">+4.08% Profit | +$10,209.57 USD</p>
                  <p className="text-sm text-muted-foreground mt-2">Out of 52,946 registered traders worldwide</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Affin Hwang Simulation Challenge 2024 */}
          <Card className="border-gold/30 bg-gradient-to-r from-gold/5 to-gold/10">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Trophy className="w-8 h-8 text-gold" />
                <h3 className="text-2xl md:text-3xl font-bold text-center">
                  Affin Hwang Simulation Challenge 2024 - 1st Place 🥇
                </h3>
              </div>
              
              <div className="bg-card/30 rounded-lg overflow-hidden border border-gold/20">
                <div className="relative w-full aspect-[16/10]">
                  <Image
                    src="/affin.jpg"
                    alt="Affin Hwang Simulation Challenge 2024 - 1st Place Winner"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </div>
                <div className="p-6 text-center bg-gradient-to-b from-transparent to-gold/5">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="w-6 h-6 text-gold" />
                    <h4 className="text-xl font-bold text-gold">Champion - 1st Place</h4>
                  </div>
                  <p className="text-lg text-muted-foreground">Affin Hwang Investment Bank Trading Simulation</p>
                  <p className="text-sm text-muted-foreground mt-2">Proven excellence in simulated trading environment</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}