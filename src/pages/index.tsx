
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { FuturesExplainedSection } from "@/components/FuturesExplainedSection";
import { FCPOSection } from "@/components/FCPOSection";
import { TradingApproachSection } from "@/components/TradingApproachSection";
import { BrokerSection } from "@/components/BrokerSection";
import { ClassSection } from "@/components/ClassSection";
import { MediaSection } from "@/components/MediaSection";
import { VerificationSection } from "@/components/VerificationSection";
import { MembershipSection } from "@/components/MembershipSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <FuturesExplainedSection />
      <FCPOSection />
      <TradingApproachSection />
      <BrokerSection />
      <ClassSection />
      <MediaSection />
      <VerificationSection />
      <MembershipSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
