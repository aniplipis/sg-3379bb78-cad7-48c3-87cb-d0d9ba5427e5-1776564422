import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, Send, Utensils, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PhysicalClassSection() {
  // Testimonial images - actual student testimonials
  const testimonialImages = [
    { id: 1, image: "/uploads/testimonial-1.jpg", alt: "Student Testimonial 1" },
    { id: 2, image: "/uploads/testimonial-2.jpg", alt: "Student Testimonial 2" },
    { id: 3, image: "/uploads/testimonial-3.jpg", alt: "Student Testimonial 3" },
    { id: 4, image: "/uploads/testimonial-4.jpg", alt: "Student Testimonial 4" },
    { id: 5, image: "/uploads/testimonial-5.jpg", alt: "Student Testimonial 5" },
    { id: 6, image: "/uploads/testimonial-6.jpg", alt: "Student Testimonial 6" },
    { id: 7, image: "/uploads/testimonial-7.jpg", alt: "Student Testimonial 7" },
    { id: 8, image: "/uploads/testimonial-8.jpg", alt: "Student Testimonial 8" },
    { id: 9, image: "/uploads/testimonial-9.jpg", alt: "Student Testimonial 9" },
    { id: 10, image: "/uploads/testimonial-10.jpg", alt: "Student Testimonial 10" }
  ];

  // Duplicate the array for infinite scroll effect
  const duplicatedTestimonials = [...testimonialImages, ...testimonialImages];

  return (
    <section className="py-16 md:py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-neon-blue/10 border border-neon-blue/20 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-neon-blue" />
            <span className="text-neon-blue font-semibold text-sm md:text-base">Physical Training</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Live <span className="text-gold">Physical Classes</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 md:mb-8 px-2">
            Everything from Online Class + 2 face-to-face sessions with Abg Max
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-4 md:p-6 lg:p-8">
              <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Upcoming Training Dates</h3>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Stay updated with latest class schedules
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                <div className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-muted-foreground">
                  <Users className="w-4 h-4 md:w-5 md:h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Small group training (15-20 max)</span>
                </div>
                <div className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-muted-foreground">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>2 face-to-face sessions in KL</span>
                </div>
                <div className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-muted-foreground">
                  <Utensils className="w-4 h-4 md:w-5 md:h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Meals included during sessions</span>
                </div>
                <div className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-muted-foreground">
                  <Building2 className="w-4 h-4 md:w-5 md:h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>Premium training facilities</span>
                </div>
                <div className="flex items-start gap-2 md:gap-3 text-sm md:text-base text-muted-foreground">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>3-day online + full recordings</span>
                </div>
              </div>

              <Button 
                className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black font-semibold h-11 md:h-12 text-sm md:text-base"
                asChild
              >
                <a href="https://t.me/maxsaham" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <Send className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="md:hidden">Join MAX CLAN Telegram</span>
                  <span className="hidden md:inline">Join Max Clan Telegram for Latest Training Dates</span>
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-4 md:p-6 lg:p-8">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">What's Included</h3>
              <div className="mb-3 md:mb-4 bg-neon-blue/10 border border-neon-blue/20 rounded-lg p-2 md:p-3">
                <p className="text-xs md:text-sm font-semibold text-neon-blue">✨ Everything from Online Class (3 Days) PLUS:</p>
              </div>
              <ul className="space-y-2 md:space-y-3">
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-gold text-lg md:text-xl flex-shrink-0">✓</span>
                  <span className="text-sm md:text-base font-semibold">2 Sesi Face-to-Face dengan Abg Max</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-gold text-lg md:text-xl flex-shrink-0">✓</span>
                  <span className="text-sm md:text-base">Makanan disediakan semasa sesi fizikal</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-gold text-lg md:text-xl flex-shrink-0">✓</span>
                  <span className="text-sm md:text-base">Kemudahan latihan premium</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-gold text-lg md:text-xl flex-shrink-0">✓</span>
                  <span className="text-sm md:text-base">3 Sesi Kelas Online Intensif + Rakaman Lengkap</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-gold text-lg md:text-xl flex-shrink-0">✓</span>
                  <span className="text-sm md:text-base">Access segera: Indicators + access to Max Clan portal</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-gold text-lg md:text-xl flex-shrink-0">✓</span>
                  <span className="text-sm md:text-base">Koleksi Video Training</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-gold text-lg md:text-xl flex-shrink-0">✓</span>
                  <span className="text-sm md:text-base">Technical Library (Ebook TA & FA)</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-gold text-lg md:text-xl flex-shrink-0">✓</span>
                  <span className="text-sm md:text-base">Free class revision</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-gold text-lg md:text-xl flex-shrink-0">✓</span>
                  <span className="text-sm md:text-base">FCPO Alert Channel (Percuma)</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="text-gold text-lg md:text-xl flex-shrink-0">✓</span>
                  <span className="text-sm md:text-base">Support Komuniti MAX CLAN</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Student Testimonials with Scrolling Effect */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <Users className="w-5 h-5 md:w-6 md:h-6 text-gold" />
            <h3 className="text-2xl md:text-3xl font-bold">Student Testimonials</h3>
          </div>

          {/* Scrolling Container */}
          <div className="relative overflow-hidden">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none"></div>

            {/* Scrolling Track */}
            <motion.div
              className="flex gap-4 md:gap-6"
              animate={{
                x: [0, -3040] // Move by width of 10 items (280px + 24px gap = 304px * 10 = 3040px)
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <Dialog key={`${testimonial.id}-${index}`}>
                  <DialogTrigger asChild>
                    <div className="flex-shrink-0 w-[240px] md:w-[280px] cursor-pointer">
                      <Card className="border-gold/30 bg-card/80 backdrop-blur overflow-hidden hover:border-gold hover:scale-105 transition-all">
                        <CardContent className="p-0">
                          <img
                            src={testimonial.image}
                            alt={testimonial.alt}
                            className="w-full h-[300px] md:h-[350px] object-cover"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full p-0 bg-black/90">
                    <div className="relative w-full h-[80vh]">
                      <img
                        src={testimonial.image}
                        alt={testimonial.alt}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </motion.div>
          </div>

          <div className="text-center mt-6 md:mt-8">
            <p className="text-muted-foreground text-xs md:text-sm px-4">
              Join hundreds of successful traders who transformed their FCPO trading with MAX SAHAM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}