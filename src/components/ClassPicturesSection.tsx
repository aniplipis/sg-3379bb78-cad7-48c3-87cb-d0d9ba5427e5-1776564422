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
  const placeholders = Array.from({ length: 10 }, (_, i) => i + 1);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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
            {placeholders.map((num) => (
              <Dialog key={num}>
                <DialogTrigger asChild>
                  <Card className="flex-shrink-0 w-80 border-gold/20 bg-card/50 cursor-pointer hover:border-gold/40 transition-all hover:scale-105">
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-gold/10 to-muted/20 flex items-center justify-center overflow-hidden">
                        <div className="text-center">
                          <Camera className="w-16 h-16 text-gold/40 mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">Class Picture {num}</p>
                          <p className="text-xs text-muted-foreground/60 mt-1">Click to zoom</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-5xl w-full p-0 bg-black/90">
                  <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gold/10 to-muted/20 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-24 h-24 text-gold/40 mx-auto mb-4" />
                      <p className="text-lg text-muted-foreground">Class Picture {num}</p>
                      <p className="text-sm text-muted-foreground/60 mt-2">Upload image to display</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
            {/* Duplicate for seamless loop */}
            {placeholders.map((num) => (
              <Dialog key={`duplicate-${num}`}>
                <DialogTrigger asChild>
                  <Card className="flex-shrink-0 w-80 border-gold/20 bg-card/50 cursor-pointer hover:border-gold/40 transition-all hover:scale-105">
                    <CardContent className="p-0">
                      <div className="relative aspect-[4/3] bg-gradient-to-br from-gold/10 to-muted/20 flex items-center justify-center overflow-hidden">
                        <div className="text-center">
                          <Camera className="w-16 h-16 text-gold/40 mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">Class Picture {num}</p>
                          <p className="text-xs text-muted-foreground/60 mt-1">Click to zoom</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-5xl w-full p-0 bg-black/90">
                  <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gold/10 to-muted/20 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-24 h-24 text-gold/40 mx-auto mb-4" />
                      <p className="text-lg text-muted-foreground">Class Picture {num}</p>
                      <p className="text-sm text-muted-foreground/60 mt-2">Upload image to display</p>
                    </div>
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