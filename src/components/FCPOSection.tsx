
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

          <Card className="bg-gradient-to-r from-gold/5 via-transparent to-neon-blue/5 border-gold/30 mb-12">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-6">Shariah-Compliant (Patuh Syariah)</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    FCPO adalah kontrak derivatif halal, disokong oleh aset sebenar (CPO) dan penghantaran bersijil MSPO.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-lg mb-1">Kenapa penting?</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-muted-foreground">Tiada riba</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-muted-foreground">Aset wujud secara fizikal</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="text-muted-foreground">Seliaan penuh SC & Bursa Malaysia</p>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/30">
                      <p className="text-foreground font-semibold">
                        Halal, ethical, and fully asset-backed — ideal for Muslim traders.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-bold mb-6">Why FCPO Works With Hybrid SMC</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-lg mb-1">Clear BOS/CHoCH</div>
                        <p className="text-muted-foreground">Distinct break of structure patterns</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-lg mb-1">Clean Liquidity Sweeps</div>
                        <p className="text-muted-foreground">Easy to identify liquidity grabs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-lg mb-1">FVG & OB React Nicely</div>
                        <p className="text-muted-foreground">Fair value gaps and order blocks are clearly visible</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-neon-blue rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-lg mb-1">Institutional Volatility</div>
                        <p className="text-muted-foreground">Strong volume profile for order flow analysis</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <div className="font-semibold text-lg mb-1">Perfect for 10–20 Tick Scalping</div>
                        <p className="text-muted-foreground">Multiple killzone setups throughout trading sessions</p>
                      </div>
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
