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
                Meet Abg Max
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-gold to-neon-blue rounded-full"></div>
            </div>

            <div className="text-lg text-muted-foreground space-y-4">
              <p>
                <span className="font-semibold text-gold">Muhammad Haniff</span>, professionally known as <span className="font-semibold">Abg Max</span>, is a seasoned FCPO futures trader and educator specializing in advanced technical analysis methodologies.
              </p>
              
              <p>
                With years of hands-on experience in the Malaysian derivatives market, Abg Max has mastered the art of combining <span className="font-semibold text-neon-blue">Wyckoff Method</span>, <span className="font-semibold text-neon-blue">Smart Money Concepts</span>, and <span className="font-semibold text-neon-blue">Order Flow Analysis</span> to identify high-probability trading opportunities.
              </p>

              <p>
                As a registered Marketing Representative with the Securities Commission Malaysia, Abg Max is committed to providing professional education and guidance to aspiring FCPO traders across the country.
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