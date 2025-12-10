import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, Users, Sparkles, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export function MembershipSection({ onOpenAuthModal }: { onOpenAuthModal?: () => void }) {
  const { user, profile } = useAuth();
  const [discountCode, setDiscountCode] = useState("");
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [discountError, setDiscountError] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const handlePremiumCheckout = async () => {
    if (!user) {
      setCheckoutError("Please sign in to upgrade to Premium");
      return;
    }

    try {
      setIsLoadingCheckout(true);
      setDiscountError("");
      setCheckoutError("");

      console.log("Starting checkout for user:", user.id);

      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          discountCode: discountCode.trim(),
        }),
      });

      const data = await response.json();
      
      console.log("Checkout response:", { 
        status: response.status, 
        ok: response.ok,
        data: data,
      });

      if (!response.ok) {
        console.error("Checkout failed:", data);
        
        // Handle discount-specific errors
        if (data.error?.includes('discount')) {
          setDiscountError(data.details || data.error);
          return;
        }
        
        throw new Error(data.error || data.details || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        console.log("Redirecting to Stripe Checkout:", data.url);
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received from server");
      }
    } catch (error) {
      console.error('Checkout error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setCheckoutError(errorMessage);
    } finally {
      setIsLoadingCheckout(false);
    }
  };

  const handleApplyDiscount = () => {
    const code = discountCode.trim().toLowerCase();
    if (code === 'finalboss2025') {
      setDiscountError("");
      setDiscountApplied(true);
    } else if (code === 'mymaxclan363') {
      setDiscountError("");
      setDiscountApplied(true);
    } else if (code !== "") {
      setDiscountError("Invalid discount code");
      setDiscountApplied(false);
    }
  };

  const displayPrice = discountApplied 
    ? discountCode.trim().toLowerCase() === 'finalboss2025' 
      ? 'RM 1.00' 
      : discountCode.trim().toLowerCase() === 'mymaxclan363'
        ? 'RM 363.00'
        : 'RM 1,350'
    : 'RM 1,350';

  const savingsAmount = discountApplied
    ? discountCode.trim().toLowerCase() === 'finalboss2025'
      ? 'RM 1,349'
      : discountCode.trim().toLowerCase() === 'mymaxclan363'
        ? 'RM 987'
        : null
    : null;

  return (
    <section id="membership" className="py-24 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="text-gold font-semibold">Membership Tiers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Membership — <span className="text-gold">Free vs Premium</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free or upgrade to premium for complete access to professional FCPO trading education
          </p>
        </div>

        {/* Error Display */}
        {checkoutError && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-red-400 mb-1">Checkout Failed</h4>
                <p className="text-sm text-red-300">{checkoutError}</p>
                <p className="text-xs text-red-300/70 mt-2">
                  If this problem persists, please contact support or try refreshing the page.
                </p>
              </div>
              <button
                onClick={() => setCheckoutError("")}
                className="text-red-400 hover:text-red-300"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <Card className="relative border-2 border-muted hover:border-gold/30 transition-all duration-300 bg-card/50 backdrop-blur">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-foreground" />
              </div>
              <CardTitle className="text-3xl mb-2">Free Access</CardTitle>
              <p className="text-muted-foreground">Essential FCPO trading resources</p>
              <div className="text-4xl font-bold mt-4">Free</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Access to basic SMC training videos (SMC Basics)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Free TradingView indicators</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">How to use indicator videos</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Access to eBooks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Public Telegram community</span>
                </li>
              </ul>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={onOpenAuthModal}
              >
                Join Free Community
              </Button>
            </CardContent>
          </Card>

          {/* Premium Tier */}
          <Card className="relative border-2 border-gold hover:border-gold/70 transition-all duration-300 bg-gradient-to-br from-card via-card to-gold/5 backdrop-blur">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="bg-gradient-to-r from-gold to-yellow-500 text-black px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                MOST POPULAR
              </div>
            </div>

            <CardHeader className="text-center pb-8 pt-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-gold to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Crown className="w-8 h-8 text-black" />
              </div>
              <CardTitle className="text-3xl mb-2 bg-gradient-to-r from-white to-gold bg-clip-text text-transparent">
                Premium Member
              </CardTitle>
              <div className="space-y-2">
                {discountApplied && (
                  <div className="text-2xl text-muted-foreground line-through">
                    RM 1,350
                  </div>
                )}
                <div className="text-5xl font-bold text-gold">
                  {displayPrice}
                </div>
                <div className="text-muted-foreground">
                  {discountApplied ? "Special offer pricing" : "onboarding + RM 363/year renewal"}
                </div>
                {discountApplied && (
                  <div className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                    Save {savingsAmount}! 🎉
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Discount Code Input */}
              <div className="space-y-2">
                <label htmlFor="discountCode" className="text-sm font-medium text-muted-foreground">
                  Have a discount code?
                </label>
                <div className="flex gap-2">
                  <input
                    id="discountCode"
                    type="text"
                    placeholder="Enter code"
                    value={discountCode}
                    onChange={(e) => {
                      setDiscountCode(e.target.value.toLowerCase());
                      setDiscountApplied(false);
                      setDiscountError("");
                    }}
                    className="flex-1 px-4 py-2 bg-background/50 border border-muted rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                  />
                  <Button
                    variant="outline"
                    onClick={handleApplyDiscount}
                    className="border-gold/30 hover:border-gold hover:bg-gold/10"
                  >
                    Apply
                  </Button>
                </div>
                {discountError && (
                  <p className="text-sm text-red-400">{discountError}</p>
                )}
                {discountApplied && (
                  <p className="text-sm text-green-400 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Discount code applied successfully!
                  </p>
                )}
              </div>

              <div className="space-y-4 py-6">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span>All classes + recordings</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span>Indicators</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span>Alerts</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span>Technical Library (Ebook TA & FA)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span>MAX CLAN community access</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span>Templates & tools</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span>Affiliate program</span>
                </div>
              </div>

              <Button
                onClick={handlePremiumCheckout}
                disabled={isLoadingCheckout || !user}
                className="w-full bg-gradient-to-r from-gold to-yellow-500 hover:from-gold/90 hover:to-yellow-500/90 text-black font-bold text-lg py-6 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Crown className="w-5 h-5 mr-2" />
                {isLoadingCheckout ? 'Processing...' : user ? 'Upgrade Now — Sertai MAX CLAN' : 'Sign in to Upgrade'}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secure payment powered by Stripe
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Card className="border-border/50 bg-muted/30 inline-block">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                💡 <strong>Special Offer:</strong> Existing MAX CLAN members - please contact Abg Max for special discounts
              </p>
              <Button
                asChild
                variant="outline"
                className="border-green-500/30 hover:bg-green-500/10 text-green-400"
              >
                <a href="https://wa.me/60115411008" target="_blank" rel="noopener noreferrer">
                  WhatsApp Abg Max
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}