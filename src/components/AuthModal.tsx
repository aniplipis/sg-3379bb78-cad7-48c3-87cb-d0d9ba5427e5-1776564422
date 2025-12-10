import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";
import { motion } from "framer-motion";
import { Sparkles, Shield } from "lucide-react";
import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register";
}

export function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-gold/30 p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader className="space-y-1 sm:space-y-2">
            <DialogTitle className="text-center">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <motion.div
                  className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-gold rounded-xl flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-black font-bold text-sm sm:text-xl">MS</span>
                </motion.div>
                <span className="text-lg sm:text-2xl font-bold text-gold">Max Saham</span>
              </div>
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground text-xs sm:text-sm">
              Join the elite community of professional FCPO traders
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "login" | "register")} className="mt-3 sm:mt-6">
            <TabsList className="grid w-full grid-cols-2 bg-muted/50 h-9 sm:h-10">
              <TabsTrigger 
                value="login"
                className="data-[state=active]:bg-gold data-[state=active]:text-black font-semibold text-xs sm:text-sm"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                className="data-[state=active]:bg-neon-blue data-[state=active]:text-black font-semibold text-xs sm:text-sm"
              >
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-3 sm:mt-6">
              <LoginForm onSuccess={onClose} />
            </TabsContent>

            <TabsContent value="register" className="mt-3 sm:mt-6">
              <RegisterForm 
                onSuccess={onClose} 
                onSwitchToLogin={() => setActiveTab("login")}
              />
            </TabsContent>
          </Tabs>

          <div className="mt-3 sm:mt-6 pt-3 sm:pt-6 border-t border-border">
            <div className="flex items-center justify-center gap-4 sm:gap-8 text-[10px] sm:text-xs text-muted-foreground">
              <div className="flex items-center gap-1 sm:gap-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span>Secure Login</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                <span>Free to Join</span>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
