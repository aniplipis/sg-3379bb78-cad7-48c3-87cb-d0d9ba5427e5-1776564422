
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Video, BookOpen, Users } from "lucide-react";

export function ClassSection() {
  return (
    <section id="class" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="text-sm font-mono text-gold mb-2">ONLINE TRAINING</div>
              <h2 className="text-4xl md:text-5xl font-bold">Max Saham Online Class</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join our next intensive online class and learn the exact strategies I use to trade FCPO profitably. This is a hands-on training program designed for serious traders.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center"><BookOpen className="w-6 h-6 text-gold"/></div>
                  <div>
                    <div className="font-semibold text-lg">Comprehensive Syllabus</div>
                    <p className="text-muted-foreground">From fundamentals to advanced execution.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neon-blue/20 rounded-lg flex items-center justify-center"><Video className="w-6 h-6 text-neon-blue"/></div>
                  <div>
                    <div className="font-semibold text-lg">Live Trading Sessions</div>
                    <p className="text-muted-foreground">Watch and learn in a real market environment.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center"><Users className="w-6 h-6 text-gold"/></div>
                  <div>
                    <div className="font-semibold text-lg">Community Support</div>
                    <p className="text-muted-foreground">Join a network of professional traders.</p>
                  </div>
                </div>
              </div>
              
              <Button size="lg" className="w-full md:w-auto bg-neon-blue hover:bg-neon-blue/90 text-black font-semibold mt-6">
                <Calendar className="w-5 h-5 mr-2" />
                Register for Next Class
              </Button>
            </div>
            
            <Card className="bg-card/50 backdrop-blur border-gold/30">
              <CardContent className="p-8">
                <div className="aspect-[4/5] bg-muted rounded-2xl flex items-center justify-center mb-6">
                  <p className="text-muted-foreground">Training Poster Placeholder</p>
                </div>
                <h3 className="text-2xl font-bold mb-3">What You'll Master:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start"><span className="text-gold mr-3 mt-1">•</span>Wyckoff Market Cycles</li>
                  <li className="flex items-start"><span className="text-gold mr-3 mt-1">•</span>Smart Money Concepts (BOS/CHoCH, OB, FVG)</li>
                  <li className="flex items-start"><span className="text-gold mr-3 mt-1">•</span>Advanced Order Flow & Volume Profile</li>
                  <li className="flex items-start"><span className="text-gold mr-3 mt-1">•</span>High-Precision Entry & Exit Triggers</li>
                  <li className="flex items-start"><span className="text-gold mr-3 mt-1">•</span>Risk Management for FCPO</li>
                  <li className="flex items-start"><span className="text-gold mr-3 mt-1">•</span>Intraday Scalping Strategies</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
