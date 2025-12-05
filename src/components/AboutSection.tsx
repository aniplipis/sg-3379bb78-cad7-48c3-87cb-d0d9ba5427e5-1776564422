import { Button } from "@/components/ui/button";
import { Award, TrendingUp, Target, Brain } from "lucide-react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-background via-background/95 to-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Content (moved from right) */}
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
                <p className="text-sm text-muted-foreground">Years of Active FCPO Trading</p>
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

            {/* CTA Button */}
            <div className="pt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-gold to-yellow-500 hover:from-gold/90 hover:to-yellow-500/90 text-black font-semibold shadow-lg">

                <Award className="w-5 h-5 mr-2" />
                View Full Biography
              </Button>
            </div>
          </div>

          {/* Right Column - Image (moved from left) */}
          <div className="relative h-full flex items-center">
            <div className="relative w-full h-[600px] md:h-[700px]">
              {/* Image without box - blends with background */}
              <Image
                src="/me.png"
                alt="Abg Max - FCPO Trading Educator"
                fill
                className="object-contain object-bottom"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-gold to-yellow-500 text-black px-6 py-3 rounded-xl shadow-lg border-2 border-background">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <div className="font-bold">SC Registered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}