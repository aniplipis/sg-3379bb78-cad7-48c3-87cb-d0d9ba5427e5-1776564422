
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, Users, Sparkles } from "lucide-react";

export function MembershipSection() {
  const freeTier = {
    title: "Free Access",
    icon: Users,
    price: "Free",
    description: "Start your FCPO trading journey",
    features: [
      "Basic FCPO education videos",
      "Public Telegram community",
      "Free PDF guides",
      "Broker setup tutorials",
      "Weekly market updates",
      "Access to public webinars"
    ]
  };

  const premiumTier = {
    title: "Premium Membership",
    icon: Crown,
    price: "RM XXX/year",
    description: "Unlock the complete Max Saham experience",
    features: [
      "Complete video lesson library (Vimeo)",
      "Downloadable eBooks & trading guides",
      "Exclusive Premium Telegram (Max Clan)",
      "Advanced technical analysis notes",
      "Monthly live Zoom trading sessions",
      "One-on-one consultation slots",
      "Priority support & guidance",
      "Lifetime course updates",
      "Trading templates & checklists",
      "Recording of all live sessions"
    ],
    highlighted: true
  };

  return (
    <section id="membership" className="py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-gold font-semibold">Membership Tiers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your <span className="text-gold">Learning Path</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free or upgrade to premium for complete access to professional FCPO trading education
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Tier */}
          <Card className="border-border/50 hover:border-gold/30 transition-all">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <freeTier.icon className="w-8 h-8 text-foreground" />
              </div>
              <CardTitle className="text-3xl mb-2">{freeTier.title}</CardTitle>
              <p className="text-muted-foreground">{freeTier.description}</p>
              <div className="text-4xl font-bold mt-4">{freeTier.price}</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8">
                {freeTier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant="outline">
                Join Free Community
              </Button>
            </CardContent>
          </Card>

          {/* Premium Tier */}
          <Card className="border-gold/50 relative overflow-hidden hover:border-gold transition-all bg-gradient-to-br from-gold/5 to-blue-500/5">
            <div className="absolute top-0 right-0 bg-gold text-black text-xs font-bold px-4 py-1 rounded-bl-lg">
              MOST POPULAR
            </div>
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <premiumTier.icon className="w-8 h-8 text-gold" />
              </div>
              <CardTitle className="text-3xl mb-2">{premiumTier.title}</CardTitle>
              <p className="text-muted-foreground">{premiumTier.description}</p>
              <div className="text-4xl font-bold mt-4 text-gold">{premiumTier.price}</div>
              <p className="text-sm text-muted-foreground">Billed annually</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8">
                {premiumTier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gold hover:bg-gold/90 text-black font-semibold h-12">
                Upgrade to Premium
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                Secure payment via Stripe • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="border-border/50 bg-muted/30 inline-block">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-2">
                💡 <strong>Special Offer:</strong> Early members get lifetime access at founding member rates
              </p>
              <p className="text-xs text-muted-foreground">
                Optional referral program available for premium members
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
