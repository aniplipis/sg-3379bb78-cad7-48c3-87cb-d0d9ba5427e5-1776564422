import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Clock } from "lucide-react";

export function FuturesExplainedSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-mono text-gold mb-2">EDUCATION</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Futures & FCPO?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Benefits to traders using Hybrid Smart Money Concepts for FCPO trading
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-card/50 backdrop-blur border-gold/30 hover:border-gold transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6">
                  <DollarSign className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Benefits to Traders</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>Clean structure for SMC</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>Daily intraday opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>Predictable liquidity behavior</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>Ideal volatility for 10–20 tick scalping</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>Low entry capital</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>No overnight risk (T+0)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-neon-blue/30 hover:border-neon-blue transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-2xl font-bold mb-4">With Hybrid SMC, You Will Learn To:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">•</span>
                    <span>Identify liquidity zones</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">•</span>
                    <span>Use structure-based entries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">•</span>
                    <span>Confirm setups with indicators</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">•</span>
                    <span>Manage risk like a professional</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-neon-blue mr-2">•</span>
                    <span>Build consistent growth</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-br from-gold/10 to-neon-blue/10 border-gold/50">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">What is FCPO / Apa Itu FCPO?</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    FCPO (Crude Palm Oil Futures) ialah kontrak niaga hadapan untuk minyak sawit mentah, diniagakan di Bursa Malaysia Derivatives (BMD). Ia adalah penanda aras global (global benchmark) untuk harga sawit.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-6">
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="text-gold font-bold text-lg mb-1">Contract Size</div>
                      <div className="text-sm text-muted-foreground">25MT</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="text-gold font-bold text-lg mb-1">Currency</div>
                      <div className="text-sm text-muted-foreground">MYR</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="text-gold font-bold text-lg mb-1">Sessions</div>
                      <div className="text-sm text-muted-foreground">Morning / Afternoon / Night (T+1)</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="text-gold font-bold text-lg mb-1">Features</div>
                      <div className="text-sm text-muted-foreground">High liquidity, Low capital</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
