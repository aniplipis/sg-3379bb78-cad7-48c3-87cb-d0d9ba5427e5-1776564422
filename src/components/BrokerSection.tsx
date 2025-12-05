import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, ExternalLink, CheckCircle2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Building2, Award } from "lucide-react";

export function BrokerSection() {
  const brokers = [
    {
      name: "Phillip Capital Malaysia",
      logo: "/placeholder-phillip.svg",
      features: ["Low commissions", "Advanced trading platform", "24/5 support"],
      url: "https://www.poems.com.my"
    },
    {
      name: "UOB Kay Hian Futures",
      logo: "/placeholder-uob.svg",
      features: ["Professional tools", "Real-time data", "Expert guidance"],
      url: "https://www.uobkayhian.com.my"
    }
  ];

  return (
    <section id="broker" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold">Trusted Partners</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Open Your <span className="text-gold">FCPO Trading Account</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start trading with regulated Malaysian brokers recognized by Securities Commission Malaysia
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {brokers.map((broker, index) => (
            <Card key={index} className="border-border/50 hover:border-gold/50 transition-all duration-300 bg-card/50 backdrop-blur">
              <CardContent className="p-8">
                <div className="h-20 flex items-center justify-center mb-6 bg-muted/30 rounded-lg">
                  <span className="text-2xl font-bold text-gold">{broker.name}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {broker.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full bg-gold hover:bg-gold/90 text-black font-semibold h-12"
                  asChild
                >
                  <a href={broker.url} target="_blank" rel="noopener noreferrer">
                    Open Account
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Prominent CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16">
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-gold via-yellow-500 to-gold hover:from-yellow-500 hover:via-gold hover:to-yellow-500 text-black font-bold text-xl px-16 py-8 rounded-2xl shadow-2xl shadow-gold/50 relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }} />
              <TrendingUp className="w-6 h-6 mr-3 relative z-10" />
              <span className="relative z-10">Start Trading FCPO Today</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="relative z-10 ml-2">
                →
              </motion.div>
            </Button>
          </motion.div>
          <p className="text-sm text-muted-foreground mt-4">
            Open your account with our recommended brokers and start your FCPO journey
          </p>
        </motion.div>

        <div className="bg-muted/30 border border-border/50 rounded-xl p-6 text-center">
          <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
          <p className="text-foreground font-semibold mb-2">
            Both brokers are regulated by Securities Commission Malaysia (SC)
          </p>
          <p className="text-sm text-muted-foreground">
            Your funds are protected under Malaysian securities laws and regulations
          </p>
        </div>
      </div>
    </section>
  );
}
