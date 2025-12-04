
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, BarChart3, Zap, Shield } from "lucide-react";

export function FCPOSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-mono text-neon-blue mb-2">FCPO MARKET</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Crude Palm Oil <span className="text-gold">Futures</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Why FCPO is the perfect market for intraday scalpers and smart money traders
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-card border-border hover:border-gold/50 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2">Malaysian Product</h3>
                <p className="text-sm text-muted-foreground">
                  Palm oil is Malaysia's key commodity, making it highly relevant locally
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-neon-blue/50 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="font-bold text-lg mb-2">High Liquidity</h3>
                <p className="text-sm text-muted-foreground">
                  Thousands of contracts traded daily with tight spreads
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-gold/50 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-bold text-lg mb-2">Perfect Volatility</h3>
                <p className="text-sm text-muted-foreground">
                  Strong price movements ideal for intraday trading strategies
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-neon-blue/50 transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-neon-blue/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-neon-blue" />
                </div>
                <h3 className="font-bold text-lg mb-2">Low Capital</h3>
                <p className="text-sm text-muted-foreground">
                  Start trading with smaller margin requirements
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-gold/5 via-transparent to-neon-blue/5 border-gold/30">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">Why FCPO Works Perfect with SMC + Wyckoff</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-lg mb-1">Clear Market Structure</div>
                        <p className="text-muted-foreground">FCPO shows distinct accumulation and distribution phases perfect for Wyckoff analysis</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-lg mb-1">Liquidity Sweeps</div>
                        <p className="text-muted-foreground">High volatility creates frequent liquidity grabs ideal for SMC setups</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-lg mb-1">Order Flow Visibility</div>
                        <p className="text-muted-foreground">Strong volume profile makes order blocks and fair value gaps clearly visible</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-lg mb-1">Intraday Opportunities</div>
                        <p className="text-muted-foreground">Multiple killzone setups throughout Asian, European, and US sessions</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-card/50 backdrop-blur rounded-2xl p-6 border border-gold/30">
                    <div className="text-sm font-mono text-gold mb-2">CONTRACT SPECIFICATIONS</div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contract Size:</span>
                        <span className="font-semibold">25 metric tonnes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tick Size:</span>
                        <span className="font-semibold">RM 1 per tonne</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Trading Hours:</span>
                        <span className="font-semibold">10:30 AM - 12:30 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Evening Session:</span>
                        <span className="font-semibold">3:00 PM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Exchange:</span>
                        <span className="font-semibold">Bursa Malaysia</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gold/20 to-neon-blue/20 rounded-2xl p-6 border border-gold/30">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gold mb-2">RM 500 - 1,000</div>
                      <div className="text-muted-foreground">Initial margin per contract</div>
                      <div className="text-sm text-muted-foreground mt-2">(Varies by broker and market conditions)</div>
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
