import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-6 py-2 mb-6">
            <Quote className="w-5 h-5 text-gold" />
            <span className="text-gold font-semibold">Client Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-gold">Traders Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real testimonials from traders who transformed their FCPO trading with MAX SAHAM
          </p>
        </div>
      </div>
    </section>
  );
}