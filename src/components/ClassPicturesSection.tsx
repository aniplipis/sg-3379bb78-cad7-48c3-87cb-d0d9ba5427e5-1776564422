import { Card, CardContent } from "@/components/ui/card";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ClassPicturesSection() {
  const classImages = [
    { id: 1, src: "/PHYSICAL_1_.jpg", alt: "Physical Class Session 1" },
    { id: 2, src: "/PHYSICAL_2_.jpg", alt: "Physical Class Session 2" },
    { id: 3, src: "/PHYSICAL_3_.jpg", alt: "Physical Class Session 3" },
    { id: 4, src: "/PHYSICAL_4_.jpg", alt: "Physical Class Session 4" },
    { id: 5, src: "/PHYSICAL_5_.jpg", alt: "Physical Class Session 5" },
    { id: 6, src: "/PHYSICAL_6_.jpg", alt: "Physical Class Session 6" },
    { id: 7, src: "/PHYSICAL_7_.jpg", alt: "Physical Class Session 7" },
    { id: 8, src: "/PHYSICAL_8_.jpg", alt: "Physical Class Session 8" },
    { id: 9, src: "/PHYSICAL_9_.jpg", alt: "Physical Class Session 9" },
    { id: 10, src: "/PHYSICAL_10_.jpg", alt: "Physical Class Session 10" },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Class <span className="text-gold">Pictures</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Moments from our FCPO trading classes and student workshops
          </p>
        </div>

        {/* Scrolling Images Container */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling animation container */}
          <div className="flex gap-6 animate-scroll">
            {classImages.map((image) => (
              <Dialog key={image.id}>
                <DialogTrigger asChild>
                  <Card className="flex-shrink-0 w-80 border-gold/20 bg-card/50 cursor-pointer hover:border-gold/40 transition-all hover:scale-105">
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-5xl w-full p-0 bg-black/90">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
            {/* Duplicate for seamless loop */}
            {classImages.map((image) => (
              <Dialog key={`duplicate-${image.id}`}>
                <DialogTrigger asChild>
                  <Card className="flex-shrink-0 w-80 border-gold/20 bg-card/50 cursor-pointer hover:border-gold/40 transition-all hover:scale-105">
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-5xl w-full p-0 bg-black/90">
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 80vw"
                    />
                  </div>
                </DialogContent>
              </Dialog>
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
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}