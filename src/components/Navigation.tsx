
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">MS</span>
            </div>
            <span className="text-2xl font-bold text-gold">Max Saham</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-foreground/80 hover:text-gold transition-colors">
              About
            </Link>
            <Link href="#approach" className="text-foreground/80 hover:text-gold transition-colors">
              Trading Approach
            </Link>
            <Link href="#class" className="text-foreground/80 hover:text-gold transition-colors">
              Classes
            </Link>
            <Link href="#media" className="text-foreground/80 hover:text-gold transition-colors">
              Media
            </Link>
            <Link href="#membership" className="text-foreground/80 hover:text-gold transition-colors">
              Membership
            </Link>
            <Button className="bg-gold hover:bg-gold/90 text-black font-semibold">
              Login
            </Button>
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-6 space-y-4">
            <Link href="#about" className="block text-foreground/80 hover:text-gold transition-colors">
              About
            </Link>
            <Link href="#approach" className="block text-foreground/80 hover:text-gold transition-colors">
              Trading Approach
            </Link>
            <Link href="#class" className="block text-foreground/80 hover:text-gold transition-colors">
              Classes
            </Link>
            <Link href="#media" className="block text-foreground/80 hover:text-gold transition-colors">
              Media
            </Link>
            <Link href="#membership" className="block text-foreground/80 hover:text-gold transition-colors">
              Membership
            </Link>
            <Button className="w-full bg-gold hover:bg-gold/90 text-black font-semibold">
              Login
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
