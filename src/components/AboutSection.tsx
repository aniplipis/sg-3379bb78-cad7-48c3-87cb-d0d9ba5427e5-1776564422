
import { Button } from "@/components/ui/button";
import { Award, TrendingUp, Target, Brain } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <div className="text-sm font-mono text-gold mb-2">MEET YOUR MENTOR</div>
                <h2 className="text-4xl md:text-5xl font-bold">About Abg Max</h2>
              </div>

              <div className="w-full aspect-square bg-gradient-to-br from-gold/20 to-neon-blue/20 rounded-3xl flex items-center justify-center border border-gold/30">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 mx-auto bg-gold/20 rounded-full flex items-center justify-center">
                    <Award className="w-16 h-16 text-gold" />
                  </div>
                  <p className="text-muted-foreground">Professional Photo Placeholder</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gold">Muhammad Haniff (Abg Max)</h3>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                A seasoned FCPO (Crude Palm Oil Futures) trader with over 8 years of experience in the Malaysian derivatives market. Abg Max specializes in Smart Money Concepts (SMC), Wyckoff Method, and advanced Order Flow analysis.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                As a registered Marketing Representative with the Securities Commission Malaysia, Abg Max has trained over 500 traders in mastering intraday precision trading strategies specifically designed for FCPO markets.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-card border border-border rounded-xl p-4">
                  <TrendingUp className="w-8 h-8 text-gold mb-2" />
                  <div className="font-semibold">SMC Expert</div>
                  <div className="text-sm text-muted-foreground">Smart Money Concepts</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <Target className="w-8 h-8 text-neon-blue mb-2" />
                  <div className="font-semibold">Wyckoff Method</div>
                  <div className="text-sm text-muted-foreground">Accumulation & Distribution</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <Brain className="w-8 h-8 text-gold mb-2" />
                  <div className="font-semibold">Order Flow</div>
                  <div className="text-sm text-muted-foreground">Volume Profile Analysis</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <Award className="w-8 h-8 text-neon-blue mb-2" />
                  <div className="font-semibold">SC Registered</div>
                  <div className="text-sm text-muted-foreground">Marketing Representative</div>
                </div>
              </div>

              <Button size="lg" className="bg-gold hover:bg-gold/90 text-black font-semibold w-full md:w-auto">
                Read Full Biography
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
