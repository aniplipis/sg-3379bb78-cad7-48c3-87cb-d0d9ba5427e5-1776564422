
import { Card, CardContent } from "@/components/ui/card";
import { GitBranch, KeyRound, BarChartHorizontal } from "lucide-react";

export function TradingApproachSection() {
  return (
    <section id="approach" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-mono text-gold mb-2">METHODOLOGY</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Max Saham Trading <span className="text-neon-blue">Approach</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              My strategy is built on three core pillars to identify high-probability trades.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur border-border hover:border-gold/50 transition-all group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GitBranch className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-4">The Wyckoff Method</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We analyze market cycles to identify accumulation and distribution phases, allowing us to anticipate major market moves before they happen.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start"><span className="text-gold mr-2">•</span>Phases & Events</li>
                  <li className="flex items-start"><span className="text-gold mr-2">•</span>Volume Spread Analysis</li>
                  <li className="flex items-start"><span className="text-gold mr-2">•</span>Composite Man Theory</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border hover:border-neon-blue/50 transition-all group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <KeyRound className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Smart Money Concepts</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  By tracking the "smart money," we pinpoint key liquidity zones and high-precision entry points that institutional traders use.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start"><span className="text-neon-blue mr-2">•</span>BOS/CHoCH Structure</li>
                  <li className="flex items-start"><span className="text-neon-blue mr-2">•</span>Order Blocks & FVGs</li>
                  <li className="flex items-start"><span className="text-neon-blue mr-2">•</span>Liquidity Sweeps</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border hover:border-gold/50 transition-all group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChartHorizontal className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Order Flow & Volume</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We confirm our trade ideas by analyzing real-time buying and selling pressure, giving us the ultimate edge in execution.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start"><span className="text-gold mr-2">•</span>Volume Profile</li>
                  <li className="flex items-start"><span className="text-gold mr-2">•</span>Cumulative Delta</li>
                  <li className="flex items-start"><span className="text-gold mr-2">•</span>Absorption & Exhaustion</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
