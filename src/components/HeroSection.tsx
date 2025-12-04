
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Award } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 chart-pattern opacity-30"></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-neon-blue/5"></div>
      
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-neon-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8 animate-slide-up">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-6 py-2">
              <Award className="w-5 h-5 text-gold" />
              <span className="text-gold font-mono text-sm">SC Registered Marketing Representative</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="text-gold">Max Saham</span>
            <br />
            <span className="text-foreground">Smart Money Futures Trader</span>
            <br />
            <span className="text-neon-blue">& FCPO Educator</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Learn Wyckoff + Smart Money + Order Flow for FCPO Trading. Master intraday precision with Abg Max.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button size="lg" className="bg-neon-blue hover:bg-neon-blue/90 text-black font-semibold text-lg px-8 py-6 rounded-xl">
              <Users className="w-5 h-5 mr-2" />
              Join Free Telegram
            </Button>
            <Button size="lg" variant="outline" className="border-gold text-gold hover:bg-gold hover:text-black font-semibold text-lg px-8 py-6 rounded-xl">
              <TrendingUp className="w-5 h-5 mr-2" />
              Open FCPO Account
            </Button>
            <Button size="lg" className="bg-gold hover:bg-gold/90 text-black font-semibold text-lg px-8 py-6 rounded-xl">
              Enter Premium Area
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 hover:border-gold/50 transition-all">
              <div className="text-4xl font-bold text-gold mb-2">8+</div>
              <div className="text-muted-foreground">Years Trading FCPO</div>
            </div>
            <div className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 hover:border-gold/50 transition-all">
              <div className="text-4xl font-bold text-neon-blue mb-2">500+</div>
              <div className="text-muted-foreground">Students Trained</div>
            </div>
            <div className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 hover:border-gold/50 transition-all">
              <div className="text-4xl font-bold text-gold mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
