import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Target, CheckCircle2, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HybridSMCPromoSection() {
  return (
    <section className="py-8 md:py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            MAX SAHAM HYBRID SMC SPECIAL
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-2">
            PROJEK DUIT RAYA – Live Execution Series
          </p>
          <div className="inline-block px-3 sm:px-4 md:px-6 py-2 bg-primary/10 rounded-full border border-primary/20 mt-3 md:mt-4">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-primary">Limited Time Special Training</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Left: Poster */}
          <div className="relative group w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <Card className="relative overflow-hidden border-2 border-primary/20 shadow-2xl hover:shadow-primary/20 transition-all duration-500">
              <CardContent className="p-0">
                <Image
                  src="/poster_0326.PNG"
                  alt="MAX SAHAM HYBRID SMC SPECIAL - Projek Duit Raya"
                  width={800}
                  height={1200}
                  className="w-full h-auto object-contain"
                  priority
                />
              </CardContent>
            </Card>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center space-y-4 md:space-y-6 lg:space-y-8 w-full">
            {/* Event Details */}
            <Card className="border-2 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 md:p-6 lg:p-8">
                <div className="space-y-3 md:space-y-4 lg:space-y-6">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-1" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm md:text-base lg:text-lg">Date</p>
                      <p className="text-xs md:text-sm lg:text-base text-muted-foreground">8 – 11 March 2026</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-1" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm md:text-base lg:text-lg">Time</p>
                      <p className="text-xs md:text-sm lg:text-base text-muted-foreground">9.30 PM onwards</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-1" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm md:text-base lg:text-lg">Platform</p>
                      <p className="text-xs md:text-sm lg:text-base text-muted-foreground">Live via Zoom</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0 mt-1" />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-sm md:text-base lg:text-lg">Format</p>
                      <p className="text-xs md:text-sm lg:text-base text-muted-foreground">4 Special Focused Sessions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Message */}
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
              <CardContent className="p-4 md:p-6 lg:p-8">
                <p className="text-base md:text-lg lg:text-xl font-bold text-center mb-2 md:mb-3 lg:mb-4">This is not a theory class.</p>
                <p className="text-xs md:text-sm lg:text-base text-center text-muted-foreground leading-relaxed">
                  This is a <span className="font-semibold text-foreground">LIVE MARKET APPLICATION</span> training designed specifically to sharpen your execution using <span className="font-semibold text-foreground">Hybrid Smart Money Concept (SMC)</span>.
                </p>
              </CardContent>
            </Card>

            {/* Why Different */}
            <div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 lg:mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-primary flex-shrink-0" />
                <span className="min-w-0">Why This Series Is Different</span>
              </h3>
              <Card className="border-2 border-muted">
                <CardContent className="p-4 md:p-6">
                  <p className="text-xs md:text-sm lg:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                    Most traders understand structure. <span className="font-semibold text-foreground">Few traders know how to execute during live candles.</span>
                  </p>
                  <div className="space-y-2 md:space-y-3">
                    {[
                      "We apply Hybrid SMC during live market",
                      "We break down real setups",
                      "We refine entry confirmation",
                      "We filter fake breakouts",
                      "We improve risk positioning"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-xs md:text-sm lg:text-base text-foreground min-w-0">{item}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-center font-bold text-sm md:text-base lg:text-lg mt-4 md:mt-6 text-primary">This is execution training.</p>
                </CardContent>
              </Card>
            </div>

            {/* Special Indicator */}
            <Card className="bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary shadow-lg">
              <CardContent className="p-4 md:p-6 lg:p-8">
                <div className="text-center mb-3 md:mb-4">
                  <p className="text-lg md:text-xl lg:text-2xl font-bold mb-2">🎯 NEW SPECIAL INDICATOR</p>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">(Exclusive Release)</p>
                </div>
                <p className="text-center font-semibold text-sm md:text-base lg:text-lg mb-3 md:mb-4 lg:mb-6">
                  A NEW SPECIAL CONFIRMATION INDICATOR
                </p>
                <p className="text-center text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                  (Integrated on top of our existing Hybrid SMC system)
                </p>
                <div className="space-y-2">
                  {[
                    "Improve entry precision",
                    "Reduce emotional hesitation",
                    "Filter weak structure",
                    "Strengthen confirmation during volatility"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                      <p className="text-xs md:text-sm lg:text-base text-foreground min-w-0">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Who Should Join */}
            <div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4">Who Should Join?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "Traders already familiar with SMC",
                  "Futures & intraday traders",
                  "Max Clan members preparing for Ramadan momentum",
                  "Traders serious about structured execution"
                ].map((item, index) => (
                  <Card key={index} className="border border-muted hover:border-primary/50 transition-colors">
                    <CardContent className="p-3 md:p-4">
                      <p className="text-xs md:text-sm font-medium text-center break-words">{item}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Card className="bg-gradient-to-r from-primary to-primary/80 border-0 shadow-xl">
              <CardContent className="p-4 md:p-6 lg:p-8 text-center">
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-primary-foreground mb-2">
                  🔥 Projek Duit Raya Starts Here
                </p>
                <p className="text-xs md:text-sm lg:text-base text-primary-foreground/90 mb-2">This is your structured preparation for market opportunities leading into Raya.</p>
                <div className="space-y-1 mb-4 md:mb-6">
                  <p className="text-xs md:text-sm lg:text-base text-primary-foreground font-medium">Sharpen execution.</p>
                  <p className="text-xs md:text-sm lg:text-base text-primary-foreground font-medium">Strengthen discipline.</p>
                  <p className="text-xs md:text-sm lg:text-base text-primary-foreground font-medium">Trade with clarity.</p>
                </div>
                <Link href="/#membership">
                  <Button 
                    size="lg" 
                    className="bg-background text-primary hover:bg-background/90 font-bold text-sm md:text-base lg:text-lg px-6 md:px-8 lg:px-12 py-3 md:py-4 lg:py-6 h-auto shadow-2xl hover:scale-105 transition-all duration-300 w-full"
                  >
                    💻 REGISTER NOW - Become Premium Member
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}