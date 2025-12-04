
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Brain, Activity, BarChart2 } from "lucide-react";

export function TradingApproachSection() {
  const pillars = [
    {
      icon: TrendingUp,
      title: "Wyckoff Method",
      description: "Master market phases: Accumulation, Markup, Distribution, and Markdown. Understand institutional footprints and smart money positioning.",
      highlights: [
        "Market cycle analysis",
        "Volume spread analysis",
        "Cause and effect principle",
        "Trading ranges identification"
      ]
    },
    {
      icon: Brain,
      title: "Smart Money Concepts",
      description: "Track institutional order flow through Break of Structure (BOS), Change of Character (CHoCH), liquidity sweeps, Order Blocks (OB), and Fair Value Gaps (FVG).",
      highlights: [
        "BOS & CHoCH patterns",
        "Liquidity grab setups",
        "Order block confirmation",
        "Fair value gap entries"
      ]
    },
    {
      icon: Activity,
      title: "Order Flow & Volume",
      description: "Decode real-time market intentions through footprint charts, delta analysis, volume profile, and aggressive buying/selling patterns.",
      highlights: [
        "Footprint chart reading",
        "Delta divergence signals",
        "Volume profile levels",
        "Aggressive order detection"
      ]
    }
  ];

  return (
    <section id="approach" className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-6 py-2 mb-6">
            <BarChart2 className="w-5 h-5 text-gold" />
            <span className="text-gold font-semibold">Trading Methodology</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Max Saham <span className="text-gold">Trading Approach</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive trading system combining institutional analysis, smart money tracking, and order flow precision
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <Card key={index} className="border-border/50 hover:border-gold/50 transition-all duration-300 group bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="w-16 h-16 bg-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <pillar.icon className="w-8 h-8 text-gold" />
                </div>
                <CardTitle className="text-2xl mb-2">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  {pillar.description}
                </p>
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">Key Elements:</p>
                  <ul className="space-y-2">
                    {pillar.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-gold mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-6">
            These three pillars work together to provide a complete picture of market structure, institutional behavior, and optimal entry timing.
          </p>
          <div className="inline-flex items-center gap-2 text-gold">
            <Activity className="w-5 h-5" />
            <span className="font-semibold">Precision • Confirmation • Execution</span>
          </div>
        </div>
      </div>
    </section>
  );
}
