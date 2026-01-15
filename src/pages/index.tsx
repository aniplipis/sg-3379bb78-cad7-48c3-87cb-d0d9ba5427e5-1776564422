import { HeroSection } from "@/components/HeroSection";
import { AITradingViewPromoSection } from "@/components/AITradingViewPromoSection";
import { AboutSection } from "@/components/AboutSection";
import { TradingApproachSection } from "@/components/TradingApproachSection";
import { ClassSection } from "@/components/ClassSection";
import { PhysicalClassSection } from "@/components/PhysicalClassSection";
import { ClassPicturesSection } from "@/components/ClassPicturesSection";
import { FCPOSection } from "@/components/FCPOSection";
import { FuturesExplainedSection } from "@/components/FuturesExplainedSection";
import { MembershipSection } from "@/components/MembershipSection";
import { PublicGoldSection } from "@/components/PublicGoldSection";
import { BrokerSection } from "@/components/BrokerSection";
import { VerificationSection } from "@/components/VerificationSection";
import { MediaSection } from "@/components/MediaSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import SEO from "@/components/SEO";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";

export default function Home() {
  const router = useRouter();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("register");

  useEffect(() => {
    // Check for payment success parameter
    if (router.query.payment === 'success') {
      setShowPaymentSuccess(true);
      
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => {
        setShowPaymentSuccess(false);
        // Clean up URL
        router.replace('/', undefined, { shallow: true });
      }, 10000);

      return () => clearTimeout(timer);
    }

    // Check for auth modal parameters
    if (router.query.auth === 'register' || router.query.register === 'true') {
      setAuthModalTab("register");
      setAuthModalOpen(true);
      // Clean up URL
      router.replace('/', undefined, { shallow: true });
    } else if (router.query.auth === 'login' || router.query.login === 'true') {
      setAuthModalTab("login");
      setAuthModalOpen(true);
      // Clean up URL
      router.replace('/', undefined, { shallow: true });
    }
  }, [router.query.payment, router.query.auth, router.query.register, router.query.login]);

  const handleDismissSuccess = () => {
    setShowPaymentSuccess(false);
    router.replace('/', undefined, { shallow: true });
  };

  return (
    <>
      <SEO />
      <Navigation />
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
      
      {/* Payment Success Banner */}
      {showPaymentSuccess && (
        <div className="fixed top-20 left-0 right-0 z-50 px-4 animate-in slide-in-from-top duration-500">
          <Card className="max-w-2xl mx-auto border-green-500/50 bg-gradient-to-r from-green-500/10 to-green-500/5 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-green-500 mb-2">🎉 Payment Successful!</h3>
                  <p className="text-muted-foreground mb-4">
                    Your premium membership is being activated. This may take a few moments...
                  </p>
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 space-y-2">
                    <p className="text-sm">✅ Payment processed successfully</p>
                    <p className="text-sm">✅ Membership upgrade in progress</p>
                    <p className="text-sm">✅ Welcome email sent</p>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button
                      onClick={() => router.push('/members')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                      onClick={handleDismissSuccess}
                      variant="outline"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
                <button
                  onClick={handleDismissSuccess}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <HeroSection onOpenAuthModal={() => setAuthModalOpen(true)} />
      <AITradingViewPromoSection />
      <AboutSection />
      <TradingApproachSection />
      <ClassSection />
      <PhysicalClassSection />
      <ClassPicturesSection />
      <FCPOSection />
      <FuturesExplainedSection />
      <MembershipSection onOpenAuthModal={() => setAuthModalOpen(true)} />
      <PublicGoldSection />
      <BrokerSection />
      <VerificationSection />
      <MediaSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
