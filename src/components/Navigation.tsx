import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, Crown, Home } from "lucide-react";
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

  // Get display name from profile or email
  const displayName = profile?.full_name || user?.email?.split('@')[0] || "User";

  return (
    <>
      {/* Desktop Navigation - Full Width */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/LOGO-square-for-rounded-crop.jpg"
                  alt="Max Saham Logo"
                  width={180}
                  height={60}
                  className="h-14 w-auto rounded-lg"
                  priority
                />
              </motion.div>
            </Link>

            <div className="flex items-center space-x-8">
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
                    <Button className={`${profile?.is_premium ? 'bg-gold' : 'bg-blue-500'} hover:opacity-90 text-black font-semibold px-6 py-2 h-auto relative`}>
                      <User className="w-4 h-4 mr-2" />
                      <span className="text-base">{displayName}</span>
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
                        <p className="text-sm font-medium leading-none">{displayName}</p>
                        <p className="text-xs text-muted-foreground leading-none mt-1">{user?.email}</p>
                        <div className="mt-2 pt-2 border-t border-border">
                          {profile?.is_premium ? (
                            <p className="text-xs text-gold font-semibold">⭐ Premium Member</p>
                          ) : (
                            <p className="text-xs text-blue-500 font-semibold">Free Member</p>
                          )}
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/account">
                        <User className="w-4 h-4 mr-2" />
                        Account Settings
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
                      <>
                        <DropdownMenuItem asChild>
                          <Link href="/members/free-dashboard" className="text-blue-500">
                            <User className="w-4 h-4 mr-2" />
                            Free Dashboard
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/#membership" className="text-gold">
                            <Crown className="w-4 h-4 mr-2" />
                            Upgrade to Premium
                          </Link>
                        </DropdownMenuItem>
                      </>
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
                  className="bg-gold hover:bg-gold/90 text-black font-semibold px-6 py-2 h-auto"
                >
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-base">Login</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Floating Logo - Top Left */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-4 z-50"
        >
          <Link href="/" onClick={() => setIsMenuOpen(false)}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/LOGO-square-for-rounded-crop.jpg"
                alt="Max Saham Logo"
                width={50}
                height={50}
                className="rounded-lg shadow-lg"
                priority
              />
            </motion.div>
          </Link>
        </motion.div>

        {/* Floating Menu Button - Top Right */}
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-4 right-4 z-50 w-14 h-14 rounded-full bg-gold shadow-lg flex items-center justify-center text-black"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>

        {/* Full Screen Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Menu Content - Centered & Optimized */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-4 z-40 bg-background/95 backdrop-blur-xl rounded-3xl border border-gold/30 shadow-2xl overflow-y-auto"
              >
                <div className="p-6 space-y-6 h-full flex flex-col">
                  {/* Header with Logo */}
                  <div className="flex items-center justify-center mb-4">
                    <Image
                      src="/LOGO-square-for-rounded-crop.jpg"
                      alt="Max Saham Logo"
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                  </div>

                  {/* User Profile Section */}
                  {isAuthenticated && (
                    <div className="pb-6 border-b border-border">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 ${profile?.is_premium ? 'bg-gold/20' : 'bg-blue-500/20'} rounded-full flex items-center justify-center`}>
                          <User className={`w-6 h-6 ${profile?.is_premium ? 'text-gold' : 'text-blue-500'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-foreground truncate">{displayName}</div>
                          <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
                          <div className="text-xs mt-1">
                            {profile?.is_premium ? (
                              <span className="text-gold font-semibold flex items-center gap-1">
                                <Crown className="w-3 h-3" />
                                Premium Member
                              </span>
                            ) : (
                              <span className="text-blue-500 font-semibold">Free Member</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Quick Access Buttons */}
                      <div className="grid grid-cols-1 gap-2">
                        {profile?.is_premium ? (
                          <Link href="/members" onClick={() => setIsMenuOpen(false)}>
                            <Button className="w-full justify-start bg-gold hover:bg-gold/90 text-black">
                              <Crown className="w-4 h-4 mr-2" />
                              Premium Dashboard
                            </Button>
                          </Link>
                        ) : (
                          <>
                            <Link href="/members/free-dashboard" onClick={() => setIsMenuOpen(false)}>
                              <Button variant="outline" className="w-full justify-start border-blue-500/30 hover:bg-blue-500/10 text-blue-500">
                                <User className="w-4 h-4 mr-2" />
                                Free Dashboard
                              </Button>
                            </Link>
                            <Link href="/#membership" onClick={() => setIsMenuOpen(false)}>
                              <Button className="w-full justify-start bg-gold hover:bg-gold/90 text-black">
                                <Crown className="w-4 h-4 mr-2" />
                                Upgrade to Premium
                              </Button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation Links - Centered Grid */}
                  <div className="flex-1 flex items-center">
                    <div className="w-full grid grid-cols-1 gap-3">
                      <Link 
                        href="/" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-gold/10 to-transparent hover:from-gold/20 transition-all text-foreground border border-gold/20"
                      >
                        <Home className="w-5 h-5 text-gold" />
                        <span className="font-semibold text-lg">Home</span>
                      </Link>
                      
                      <Link 
                        href="#about" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl hover:bg-gold/10 transition-all text-foreground border border-border"
                      >
                        <span className="font-semibold text-lg">About Abg Max</span>
                      </Link>
                      
                      <Link 
                        href="#approach" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl hover:bg-gold/10 transition-all text-foreground border border-border"
                      >
                        <span className="font-semibold text-lg">Trading Approach</span>
                      </Link>
                      
                      <Link 
                        href="#class" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl hover:bg-gold/10 transition-all text-foreground border border-border"
                      >
                        <span className="font-semibold text-lg">Classes</span>
                      </Link>
                      
                      <Link 
                        href="#media" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl hover:bg-gold/10 transition-all text-foreground border border-border"
                      >
                        <span className="font-semibold text-lg">Media</span>
                      </Link>
                      
                      <Link 
                        href="#membership" 
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl hover:bg-gold/10 transition-all text-foreground border border-border"
                      >
                        <span className="font-semibold text-lg">Membership</span>
                      </Link>
                    </div>
                  </div>

                  {/* Account Actions */}
                  {isAuthenticated ? (
                    <div className="pt-4 border-t border-border grid grid-cols-2 gap-2">
                      <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-center border-gold/30 hover:bg-gold/10 text-sm">
                          <User className="w-4 h-4 mr-1" />
                          Profile
                        </Button>
                      </Link>
                      
                      <Link href="/account" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-center border-gold/30 hover:bg-gold/10 text-sm">
                          <User className="w-4 h-4 mr-1" />
                          Settings
                        </Button>
                      </Link>
                      
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="col-span-2 justify-center border-destructive/30 text-destructive hover:bg-destructive/10"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => {
                        setIsAuthModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full bg-gold hover:bg-gold/90 text-black font-semibold py-6 text-lg"
                    >
                      <User className="w-5 h-5 mr-2" />
                      Login / Sign Up
                    </Button>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}