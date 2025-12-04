import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, Crown } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, profile, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <motion.div 
                className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-black font-bold text-xl">MS</span>
              </motion.div>
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

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-gold hover:bg-gold/90 text-black font-semibold relative">
                      <User className="w-4 h-4 mr-2" />
                      {profile?.full_name}
                      {profile?.is_premium && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-5 h-5 bg-neon-blue rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Crown className="w-3 h-3 text-black" />
                        </motion.div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card border-gold/30">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{profile?.full_name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {profile?.is_premium ? (
                      <DropdownMenuItem asChild>
                        <Link href="/members" className="text-neon-blue">
                          <Crown className="w-4 h-4 mr-2" />
                          Premium Dashboard
                        </Link>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem asChild>
                        <Link href="#membership" className="text-gold">
                          <Crown className="w-4 h-4 mr-2" />
                          Upgrade to Premium
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gold hover:bg-gold/90 text-black font-semibold"
                >
                  Login
                </Button>
              )}
            </div>

            <button
              className="md:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <div className="pb-6 space-y-4">
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
                  
                  {isAuthenticated ? (
                    <>
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-gold" />
                          </div>
                          <div>
                            <div className="font-semibold">{profile?.full_name}</div>
                            <div className="text-xs text-muted-foreground">{user?.email}</div>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full border-destructive text-destructive hover:bg-destructive/10"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gold hover:bg-gold/90 text-black font-semibold"
                    >
                      Login
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
