import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ClassPicturesSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const navigateImage = (direction: "prev" | "next") => {
    setCurrentImageIndex((prev) => {
      if (direction === "prev") {
        return prev === 0 ? classImages.length - 1 : prev - 1;
      } else {
        return prev === classImages.length - 1 ? 0 : prev + 1;
      }
    });
  };

  const openDialog = (index: number) => {
    setCurrentImageIndex(index);
    setIsDialogOpen(true);
  };

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

          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrollable images */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth px-12 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {classImages.map((image, index) => (
              <Card 
                key={image.id}
                className="flex-shrink-0 w-80 border-gold/20 bg-card/50 cursor-pointer hover:border-gold/40 transition-all hover:scale-105"
                onClick={() => openDialog(index)}
              >
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

      {/* Full screen image dialog with navigation */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl w-full p-0 bg-black/95">
          <div className="relative">
            {/* Previous Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            {/* Next Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            {/* Image */}
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={classImages[currentImageIndex].src}
                alt={classImages[currentImageIndex].alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {classImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}