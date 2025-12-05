import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Coins, Shield, TrendingUp, Users, CheckCircle2 } from "lucide-react";

export function PublicGoldSection() {
  return (
    <section id="publicgold" className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-6 py-2 mb-6">
            <Coins className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-500 font-semibold">Savings & Investment</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Daftar Akaun <span className="text-gold">Public Gold</span> — Team Max Saham
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Public Gold adalah platform beli emas fizikal patuh Syariah, mudah, telus, dan sesuai untuk simpanan jangka panjang.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Benefits Card */}
          <Card className="border-border/50 hover:border-gold/50 transition-all bg-card/50 backdrop-blur">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-2xl font-bold">Kelebihan Public Gold</h3>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Patuh Syariah</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Emas fizikal milik anda</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Modal serendah RM100</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Tiada upah simpan (0% untuk GAP)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Beli/jual 24 jam online</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Buy-back guarantee</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Syarikat kukuh & stabil</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Sesuai untuk simpanan jangka panjang</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Target Audience Card */}
          <Card className="border-border/50 hover:border-gold/50 transition-all bg-card/50 backdrop-blur">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-2xl font-bold">Siapa Sesuai Buka Akaun?</h3>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Penyimpan emas jangka panjang</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Ibubapa simpan emas untuk anak (Akaun Junior)</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Trader yang mahu diversify simpanan</span>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Muslim yang mahu aset patuh Syariah</span>
                </li>
              </ul>

              <div className="space-y-4">
                <Button
                  className="w-full bg-gold hover:bg-gold/90 text-black font-semibold h-12"
                  asChild
                >
                  <a 
                    href="https://publicgold.com.my/index.php?route=account/register&intro_pgcode=PG00463477&is_dealer=1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Daftar Akaun Public Gold (Dewasa)
                  </a>
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-gold/30 hover:border-gold hover:bg-gold/10 font-semibold h-12"
                  asChild
                >
                  <a 
                    href="https://publicgold.com.my/index.php?route=account/register&form_type=ja&intro_pgcode=PG00463477&is_dealer=1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Daftar Akaun Public Gold (Junior)
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gold/20 bg-gradient-to-r from-gold/5 to-yellow-500/5">
          <CardContent className="p-6 text-center">
            <Coins className="w-12 h-12 text-gold mx-auto mb-4" />
            <h4 className="font-semibold text-lg mb-2">Diversify Your Wealth</h4>
            <p className="text-sm text-muted-foreground">
              Combine FCPO trading with physical gold savings for a balanced wealth-building strategy
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}