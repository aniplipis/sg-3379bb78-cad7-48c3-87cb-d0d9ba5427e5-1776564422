
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles } from "lucide-react";

export function MembershipSection() {
  return (
    <section id="membership" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-mono text-gold mb-2">MEMBERSHIP</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="text-neon-blue">Learning Path</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Start with free resources or unlock everything with premium access
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Free Tier */}
            <Card className="bg-card/50 backdrop-blur border-border hover:border-gold/50 transition-all">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Free Member</h3>
                    <p className="text-muted-foreground">Get started with the basics</p>
                  </div>
                </div>

                <div className="text-4xl font-bold mb-6">RM 0<span className="text-lg text-muted-foreground font-normal">/forever</span></div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>Basic FCPO education content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>Public Telegram channel access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>Selected free video lessons</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>Free PDF guides</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>Broker setup guides</span>
                  </li>
                </ul>

                <Button size="lg" className="w-full bg-gold hover:bg-gold/90 text-black font-semibold">
                  Join Free Now
                </Button>
              </CardContent>
            </Card>

            {/* Premium Tier */}
            <Card className="bg-gradient-to-br from-gold/10 to-neon-blue/10 border-gold relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-gold text-black px-4 py-1 rounded-full text-sm font-semibold">
                BEST VALUE
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold to-neon-blue rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Premium Member</h3>
                    <p className="text-muted-foreground">Full access to everything</p>
                  </div>
                </div>

                <div className="text-4xl font-bold mb-6">RM 997<span className="text-lg text-muted-foreground font-normal">/year</span></div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">Everything in Free, plus:</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                    <span>Complete video lesson library (Vimeo)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                    <span>All downloadable eBooks & PDFs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                    <span>Exclusive "Max Clan" Telegram group</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                    <span>Technical analysis notes & templates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                    <span>Priority access to live Zoom classes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                    <span>Direct mentorship & support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                    <span>Weekly market analysis & trade setups</span>
                  </li>
                </ul>

                <Button size="lg" className="w-full bg-gradient-to-r from-gold to-neon-blue hover:opacity-90 text-black font-semibold">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              All premium memberships are securely processed through Stripe. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
