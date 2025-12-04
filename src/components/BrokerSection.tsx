
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export function BrokerSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-sm font-mono text-neon-blue mb-2">GET STARTED</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Open an FCPO Trading Account</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Start your trading journey with a regulated Malaysian broker.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-8 mb-8">
            <div className="bg-card border-border rounded-2xl p-8 flex flex-col items-center justify-center space-y-6">
              <div className="w-48 h-16 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">Broker Logo</div>
              <h3 className="text-2xl font-semibold">Phillip Capital Malaysia</h3>
              <Button size="lg" className="w-full bg-gold hover:bg-gold/90 text-black font-semibold">
                Open Account
              </Button>
            </div>
            <div className="bg-card border-border rounded-2xl p-8 flex flex-col items-center justify-center space-y-6">
              <div className="w-48 h-16 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">Broker Logo</div>
              <h3 className="text-2xl font-semibold">UOB Kay Hian Futures</h3>
              <Button size="lg" className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black font-semibold">
                Open Account
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <span>Both are regulated Malaysian brokers recognized by Securities Commission Malaysia.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
