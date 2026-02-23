import { Card, CardContent } from "@/components/ui/card";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    { id: 1, src: "/uploads/testimonial-1.jpg", alt: "Testimonial 1" },
    { id: 2, src: "/uploads/testimonial-2.jpg", alt: "Testimonial 2" },
    { id: 3, src: "/uploads/testimonial-3.jpg", alt: "Testimonial 3" },
    { id: 4, src: "/uploads/testimonial-4.jpg", alt: "Testimonial 4" },
    { id: 5, src: "/uploads/testimonial-5.jpg", alt: "Testimonial 5" },
    { id: 6, src: "/uploads/testimonial-6.jpg", alt: "Testimonial 6" },
    { id: 7, src: "/uploads/testimonial-7.jpg", alt: "Testimonial 7" },
    { id: 8, src: "/uploads/testimonial-8.jpg", alt: "Testimonial 8" },
    { id: 9, src: "/uploads/testimonial-9.jpg", alt: "Testimonial 9" },
    { id: 10, src: "/uploads/testimonial-10.jpg", alt: "Testimonial 10" },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollPosition = 
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
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

        {/* Scrolling Container with Controls */}
        <div className="relative">
          {/* Left Scroll Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm border-gold/30 hover:bg-gold/10 hover:border-gold/50"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="w-6 h-6 text-gold" />
          </Button>

          {/* Right Scroll Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm border-gold/30 hover:bg-gold/10 hover:border-gold/50"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="w-6 h-6 text-gold" />
          </Button>

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

          {/* Scrollable testimonials */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth px-12 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((testimonial) => (
              <Card 
                key={testimonial.id}
                className="flex-shrink-0 w-80 border-gold/20 bg-card/50 hover:border-gold/40 transition-all hover:scale-105"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={testimonial.src}
                      alt={testimonial.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Info text */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Join our growing community of 1001+ successful FCPO traders
          </p>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}