import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, ExternalLink, Trophy } from "lucide-react";
import Image from "next/image";

export function VerificationSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Regulatory Status & <span className="text-gold">Professional Registrations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Team Max Saham is composed of individuals who are officially registered with Malaysian financial authorities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-gold/20 bg-card/50">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-center">Suruhanjaya Sekuriti Malaysia (SC)</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">Registered Individual</p>
              <Button 
                variant="outline"
                size="sm"
                className="w-full border-gold/30 hover:border-gold"
                asChild
              >
                <a href="https://www.sc.com.my/regulation/licensing/licensed-and-registered-persons" target="_blank" rel="noopener noreferrer">
                  SC Check
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-gold/20 bg-card/50">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-center">Registered Financial Consultant</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">PhillipCapital (FIMM)</p>
              <Button 
                variant="outline"
                size="sm"
                className="w-full border-gold/30 hover:border-gold"
                asChild
              >
                <a href="https://fcs.fimm.com.my/Publics/cons_details/T2NNMWhFU2lFcFFBNnlnaFRBSG1zUT09" target="_blank" rel="noopener noreferrer">
                  FIMM Check
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-gold/20 bg-card/50">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-gold" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-center">Registered Takaful Consultant</h3>
              <p className="text-sm text-muted-foreground mb-4 text-center">Takaful Registration</p>
              <Button 
                variant="outline"
                size="sm"
                className="w-full border-gold/30 hover:border-gold"
                asChild
              >
                <a href="https://sso.ism.net.my/MTAOARS/Enquiry/Result?code=p%2fi1Ck6BCf7g3Hs%2fmP70iw%3d%3d&mta=hbVC74Kbf84%3d" target="_blank" rel="noopener noreferrer">
                  Takaful Check
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gold/30 bg-gradient-to-r from-gold/5 to-neon-blue/5 mb-12">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-3">Why This Matters</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <ShieldCheck className="w-8 h-8 text-gold mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Credible & Transparent</h4>
                <p className="text-sm text-muted-foreground">Officially registered professionals</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="w-8 h-8 text-gold mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Patuh Syariah</h4>
                <p className="text-sm text-muted-foreground">Islamic-compliant operations</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="w-8 h-8 text-gold mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Avoid Scams</h4>
                <p className="text-sm text-muted-foreground">No fake gurus here</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="w-8 h-8 text-gold mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Expert Guidance</h4>
                <p className="text-sm text-muted-foreground">Licensed professionals support</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DVTC Rankings Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-gold" />
              <h3 className="text-3xl md:text-4xl font-bold">
                Bursa Malaysia DVTC Rankings - <span className="text-gold">All First Place</span>
              </h3>
              <Trophy className="w-8 h-8 text-gold" />
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-gold/20 bg-gradient-to-br from-gold/5 to-gold/10 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-gradient-to-br from-gold/20 to-gold/5 flex flex-col items-center justify-center">
                  <Trophy className="w-24 h-24 text-gold mb-4" />
                  <h4 className="text-xl font-bold text-gold mb-2">DVTC Ranking #1</h4>
                  <p className="text-muted-foreground">Image Placeholder 1</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold/20 bg-gradient-to-br from-gold/5 to-gold/10 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-gradient-to-br from-gold/20 to-gold/5 flex flex-col items-center justify-center">
                  <Trophy className="w-24 h-24 text-gold mb-4" />
                  <h4 className="text-xl font-bold text-gold mb-2">DVTC Ranking #1</h4>
                  <p className="text-muted-foreground">Image Placeholder 2</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gold/20 bg-gradient-to-br from-gold/5 to-gold/10 overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[3/4] bg-gradient-to-br from-gold/20 to-gold/5 flex flex-col items-center justify-center">
                  <Trophy className="w-24 h-24 text-gold mb-4" />
                  <h4 className="text-xl font-bold text-gold mb-2">DVTC Ranking #1</h4>
                  <p className="text-muted-foreground">Image Placeholder 3</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* TradingView Championship Section */}
        <div>
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-neon-blue" />
              <h3 className="text-3xl md:text-4xl font-bold">
                TradingView The Leap Trading Championship - <span className="text-neon-blue">Top 6 of 52,946 Traders</span> ⭐
              </h3>
              <Trophy className="w-8 h-8 text-neon-blue" />
            </div>
          </div>

          <Card className="border-neon-blue/20 bg-gradient-to-br from-neon-blue/5 to-neon-blue/10 overflow-hidden max-w-4xl mx-auto">
            <CardContent className="p-0">
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src="/10.PNG"
                  alt="TradingView Leaderboard - MaxSaham ranked #6 out of 52,946 traders"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="p-6 text-center bg-gradient-to-r from-neon-blue/10 to-neon-blue/5">
                <p className="text-lg font-semibold mb-2">
                  Position #6 | +4.08% Profit | +$10,209.57 USD
                </p>
                <p className="text-sm text-muted-foreground">
                  Out of 52,946 registered traders in the competition
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}