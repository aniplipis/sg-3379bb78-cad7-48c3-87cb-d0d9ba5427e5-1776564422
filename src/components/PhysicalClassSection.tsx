import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export function PhysicalClassSection() {
  // Placeholder class photos - replace with actual training photos
  const classPhotos = [
    { id: 1, image: "/uploads/class-photo-1.png", alt: "Training Session 1" },
    { id: 2, image: "/uploads/class-photo-2.png", alt: "Training Session 2" },
    { id: 3, image: "/uploads/class-photo-3.png", alt: "Training Session 3" },
    { id: 4, image: "/uploads/class-photo-4.png", alt: "Training Session 4" },
    { id: 5, image: "/uploads/class-photo-5.png", alt: "Training Session 5" },
    { id: 6, image: "/uploads/class-photo-6.png", alt: "Training Session 6" },
    { id: 7, image: "/uploads/class-photo-7.png", alt: "Training Session 7" },
    { id: 8, image: "/uploads/class-photo-8.png", alt: "Training Session 8" },
    { id: 9, image: "/uploads/class-photo-9.png", alt: "Training Session 9" },
    { id: 10, image: "/uploads/class-photo-10.png", alt: "Training Session 10" }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neon-blue/10 border border-neon-blue/20 rounded-full px-6 py-2 mb-6">
            <Calendar className="w-5 h-5 text-neon-blue" />
            <span className="text-neon-blue font-semibold">Physical Training</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Live <span className="text-gold">Physical Classes</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Join our intensive hands-on training sessions and learn directly from Abg Max
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Upcoming Training Dates</h3>
                  <p className="text-muted-foreground">
                    Stay updated with the latest class schedules through our Max Clan Telegram channel
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="w-5 h-5 text-gold" />
                  <span>Small group training (15-20 participants max)</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-gold" />
                  <span>Premium training facilities in Kuala Lumpur</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5 text-gold" />
                  <span>3 intensive sessions + full recordings</span>
                </div>
              </div>

              <Button 
                className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black font-semibold h-12"
                asChild
              >
                <a href="https://t.me/maxsaham" target="_blank" rel="noopener noreferrer">
                  <Send className="w-5 h-5 mr-2" />
                  Join Max Clan Telegram for Latest Training Dates
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">What's Included</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <span>3 Sesi Kelas Intensif + Rakaman Lengkap</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <span>Access segera: Indicators + access to Max Clan portal</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <span>Koleksi Video Training</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <span>Technical Library (Ebook TA & FA)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <span>Free class revision</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <span>FCPO Alert Channel (Percuma)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold text-xl">✓</span>
                  <span>Support Komuniti MAX CLAN</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Scrolling Class Photos */}
        <div className="relative mb-8">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10"></div>
          
          <motion.div
            className="flex gap-4"
            animate={{
              x: [0, -1800],
            }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {/* First set */}
            {classPhotos.map((photo) => (
              <div
                key={photo.id}
                className="min-w-[300px] h-[200px] rounded-lg overflow-hidden bg-muted flex items-center justify-center"
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop";
                  }}
                />
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {classPhotos.map((photo) => (
              <div
                key={`dup-${photo.id}`}
                className="min-w-[300px] h-[200px] rounded-lg overflow-hidden bg-muted flex items-center justify-center"
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop";
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center text-muted-foreground">
          <p>
            📸 <span className="font-semibold">Note to Admin:</span> Upload 10 class photos to /uploads/ folder named class-photo-1.png through class-photo-10.png
          </p>
        </div>
      </div>
    </section>
  );
}