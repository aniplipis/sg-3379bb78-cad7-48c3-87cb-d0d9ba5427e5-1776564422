
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, ExternalLink } from "lucide-react";

export function VerificationSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur border-gold/30">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-24 h-24 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-12 h-12 text-gold" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold mb-3">Verify My Registration</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Check my registration as a Marketing Representative with the Securities Commission Malaysia. 
                    Transparency and compliance are at the heart of my practice.
                  </p>
                  <Button size="lg" className="bg-gold hover:bg-gold/90 text-black font-semibold">
                    View SC Registration
                    <ExternalLink className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
