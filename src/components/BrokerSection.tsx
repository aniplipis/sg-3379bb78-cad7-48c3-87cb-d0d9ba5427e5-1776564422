
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, ExternalLink, CheckCircle2 } from "lucide-react";

export function BrokerSection() {
  return (
    <section id="broker" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold">Trusted Partners</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Open Your <span className="text-gold">FCPO Trading Account</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trade FCPO with trusted, regulated Malaysian brokers below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* PhillipCapital - Team Max Saham X Dr Arif FCPO */}
          <Card className="border-border/50 hover:border-gold/50 transition-all duration-300 bg-card/50 backdrop-blur">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gold mb-2">Phillip Capital Malaysia</h3>
                <p className="text-lg font-semibold text-muted-foreground">Team Max Saham X Dr. Arif FCPO</p>
              </div>

              <h4 className="font-bold text-lg mb-4">Why Open Your FCPO Account with Team Max Saham X Dr Arif?</h4>
              
              <p className="text-muted-foreground mb-6">
                PhillipCapital is one of Malaysia's most established futures brokers — trusted, regulated, and ideal for FCPO traders seeking stability & professional support.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Client Portal lengkap — semua info dalam satu portal</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Grup & Alert Sawit Pro Trader</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Support Team Max Saham X Dr Arif</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Platform stabil & mesra scalper</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Edukasi asas futures & panduan risiko</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Akaun Islamic Futures (Patuh Syariah)</span>
                </li>
              </ul>

              <Button 
                className="w-full bg-gold hover:bg-gold/90 text-black font-semibold h-12 mb-3"
                asChild
              >
                <a href="https://oao.phillip.com.my/?aetag=MAP" target="_blank" rel="noopener noreferrer">
                  Open Account Now (PhillipCapital)
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>

              <div className="text-center">
                <a 
                  href="https://drive.google.com/file/d/1mEzGX4rN9s6NMIY_itEC5-aCAYIzWjNf/view" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gold hover:text-gold/80 underline"
                >
                  Panduan buka akaun
                </a>
              </div>
            </CardContent>
          </Card>

          {/* UOB Kay Hian - Team Max Saham X Coach Taro */}
          <Card className="border-border/50 hover:border-gold/50 transition-all duration-300 bg-card/50 backdrop-blur">
            <CardContent className="p-8">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gold mb-2">UOB Kay Hian Futures</h3>
                <p className="text-lg font-semibold text-muted-foreground">Team Max Saham X Coach Taro</p>
              </div>

              <h4 className="font-bold text-lg mb-4">Why Open Your FCPO Account with Team Max Saham X Coach Taro?</h4>
              
              <p className="text-muted-foreground mb-6">
                UOB Kay Hian is a reputable broker for serious FCPO traders.
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Support Group Coach Taro</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Grup & Alert Sawit Pro Trader</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Special Spread Trading Class</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Execution laju & konsisten</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Onboarding personal assistance</span>
                </li>
              </ul>

              <Button 
                className="w-full bg-gold hover:bg-gold/90 text-black font-semibold h-12"
                asChild
              >
                <a href="https://t.me/abgmax" target="_blank" rel="noopener noreferrer">
                  PM in Telegram
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/30 border border-border/50 rounded-xl p-6 text-center">
          <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
          <p className="text-foreground font-semibold mb-2">
            Both brokers are regulated by Securities Commission Malaysia (SC)
          </p>
          <p className="text-sm text-muted-foreground">
            Your funds are protected under Malaysian securities laws and regulations
          </p>
        </div>
      </div>
    </section>
  );
}
