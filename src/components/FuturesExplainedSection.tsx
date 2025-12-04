
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Clock } from "lucide-react";

export function FuturesExplainedSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-mono text-gold mb-2">EDUCATION</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What is Futures Trading?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the fundamentals of futures contracts and how traders profit from market movements
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-card/50 backdrop-blur border-gold/30 hover:border-gold transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mb-6">
                  <DollarSign className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Futures Contract Basics</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A futures contract is an agreement to buy or sell an asset at a predetermined price at a specified time in the future. Unlike stocks, you don't own the underlying asset.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>Leverage allows trading with smaller capital</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>Standardized contracts with fixed specifications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>Highly liquid markets for easy entry and exit</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-neon-blue/30 hover:border-neon-blue transition-all">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Profit in Both Directions</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Futures trading allows you to profit whether the market goes up or down. This flexibility is what makes it attractive to active traders.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-background/50 rounded-xl p-4">
                    <TrendingUp className="w-8 h-8 text-green-500" />
                    <div>
                      <div className="font-semibold">Long Position (Buy)</div>
                      <div className="text-sm text-muted-foreground">Profit when price rises</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-background/50 rounded-xl p-4">
                    <TrendingDown className="w-8 h-8 text-red-500" />
                    <div>
                      <div className="font-semibold">Short Position (Sell)</div>
                      <div className="text-sm text-muted-foreground">Profit when price falls</div>
                    </div>
                  </div>
                </div>
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
                  <h3 className="text-2xl font-bold mb-3">Why Malaysians Trade FCPO</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    FCPO (Crude Palm Oil Futures) is one of the most popular futures contracts among Malaysian traders. Malaysia is the world's second-largest palm oil producer, making FCPO markets highly relevant and actively traded.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mt-6">
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="text-gold font-bold text-lg mb-1">Low Capital</div>
                      <div className="text-sm text-muted-foreground">Start with small amounts</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="text-gold font-bold text-lg mb-1">High Volatility</div>
                      <div className="text-sm text-muted-foreground">More trading opportunities</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="text-gold font-bold text-lg mb-1">Local Market</div>
                      <div className="text-sm text-muted-foreground">Bursa Malaysia regulated</div>
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
