import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { FuturesExplainedSection } from "@/components/FuturesExplainedSection";
import { FCPOSection } from "@/components/FCPOSection";
import { TradingApproachSection } from "@/components/TradingApproachSection";
import { BrokerSection } from "@/components/BrokerSection";
import { ClassSection } from "@/components/ClassSection";
import { PhysicalClassSection } from "@/components/PhysicalClassSection";
import { PublicGoldSection } from "@/components/PublicGoldSection";
import { MediaSection } from "@/components/MediaSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { VerificationSection } from "@/components/VerificationSection";
import { MembershipSection } from "@/components/MembershipSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { useState } from "react";

export default function HomePage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      <AboutSection />
      <FuturesExplainedSection />
      <FCPOSection />
      <TradingApproachSection />
      <BrokerSection />
      <ClassSection />
      <PhysicalClassSection />
      <PublicGoldSection />
      <MediaSection />
      <TestimonialsSection />
      <VerificationSection />
      <MembershipSection onOpenAuthModal={() => setIsAuthModalOpen(true)} />
      <ContactSection />
      <Footer />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
