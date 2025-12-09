import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

export function TestimonialsSection() {
  // Placeholder testimonial data - replace with actual client testimonials
  const testimonials = [
    {
      id: 1,
      name: "Client Testimonial 1",
      image: "/uploads/testimonial-1.png", // Replace with actual image
      rating: 5,
      text: "Placeholder for client testimonial text. Replace with actual testimonial content."
    },
    {
      id: 2,
      name: "Client Testimonial 2",
      image: "/uploads/testimonial-2.png",
      rating: 5,
      text: "Placeholder for client testimonial text. Replace with actual testimonial content."
    },
    {
      id: 3,
      name: "Client Testimonial 3",
      image: "/uploads/testimonial-3.png",
      rating: 5,
      text: "Placeholder for client testimonial text. Replace with actual testimonial content."
    },
    {
      id: 4,
      name: "Client Testimonial 4",
      image: "/uploads/testimonial-4.png",
      rating: 5,
      text: "Placeholder for client testimonial text. Replace with actual testimonial content."
    },
    {
      id: 5,
      name: "Client Testimonial 5",
      image: "/uploads/testimonial-5.png",
      rating: 5,
      text: "Placeholder for client testimonial text. Replace with actual testimonial content."
    },
    {
      id: 6,
      name: "Client Testimonial 6",
      image: "/uploads/testimonial-6.png",
      rating: 5,
      text: "Placeholder for client testimonial text. Replace with actual testimonial content."
    },
    {
      id: 7,
      name: "Client Testimonial 7",
      image: "/uploads/testimonial-7.png",
      rating: 5,
      text: "Placeholder for client testimonial text. Replace with actual testimonial content."
    },
    {
      id: 8,
      name: "Client Testimonial 8",
      image: "/uploads/testimonial-8.png",
      rating: 5,
      text: "Placeholder for client testimonial text. Replace with actual testimonial content."
    },
    {
      id: 9,
      name: "Client Testimonial 9",
      image: "/uploads/testimonial-9.png",
      rating: 5,
      text: "Placeholder for client testimonial text. Replace with actual testimonial content."
    },
    {
      id: 10,
      name: "Client Testimonial 10",
      image: "/uploads/testimonial-10.png",
      rating: 5,
      text: "Placeholder for client testimonial text. Replace with actual testimonial content."
    }
  ];

  return (
    <section className="py-20 px-4 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
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

        {/* Scrolling Testimonials Container */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10"></div>
          
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -2000],
            }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {/* First set */}
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="min-w-[400px] border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop";
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="w-8 h-8 text-gold/20 absolute -top-2 -left-2" />
                    <p className="text-muted-foreground italic pl-6">
                      {testimonial.text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial) => (
              <Card key={`dup-${testimonial.id}`} className="min-w-[400px] border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop";
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <div className="flex gap-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="w-8 h-8 text-gold/20 absolute -top-2 -left-2" />
                    <p className="text-muted-foreground italic pl-6">
                      {testimonial.text}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            📸 <span className="font-semibold">Note to Admin:</span> Upload 10 testimonial images to /uploads/ folder named testimonial-1.png through testimonial-10.png
          </p>
        </div>
      </div>
    </section>
  );
}