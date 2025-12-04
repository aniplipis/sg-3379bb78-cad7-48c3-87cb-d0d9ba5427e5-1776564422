
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, ExternalLink } from "lucide-react";

export function VerificationSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-4xl mx-auto">
        <Card className="border-gold/20 bg-gradient-to-r from-gold/5 to-blue-500/5">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-12 h-12 text-gold" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">
                  Verified <span className="text-gold">Marketing Representative</span>
                </h3>
                <p className="text-muted-foreground mb-6">
                  Check my official registration as a Marketing Representative with the Securities Commission Malaysia (SC). 
                  Your trust and safety are my top priorities.
                </p>
                <Button 
                  className="bg-gold hover:bg-gold/90 text-black font-semibold"
                  asChild
                >
                  <a href="https://www.sc.com.my" target="_blank" rel="noopener noreferrer">
                    Verify My SC Registration
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border/50">
              <div className="grid md:grid-cols-3 gap-6 text-center text-sm">
                <div>
                  <ShieldCheck className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="font-semibold">SC Registered</p>
                  <p className="text-muted-foreground text-xs">Official Marketing Rep</p>
                </div>
                <div>
                  <ShieldCheck className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="font-semibold">Compliant Operations</p>
                  <p className="text-muted-foreground text-xs">Following Malaysian Regulations</p>
                </div>
                <div>
                  <ShieldCheck className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="font-semibold">Transparent Education</p>
                  <p className="text-muted-foreground text-xs">Honest & Ethical Teaching</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
