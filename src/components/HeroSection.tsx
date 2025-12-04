
"use client";

import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [counters, setCounters] = useState({ years: 0, students: 0, success: 0 });

  useEffect(() => {
    const timer1 = setInterval(() => {
      setCounters(prev => ({
        years: prev.years < 8 ? prev.years + 1 : 8,
        students: prev.students < 500 ? prev.students + 25 : 500,
        success: prev.success < 95 ? prev.success + 5 : 95,
      }));
    }, 100);

    return () => clearInterval(timer1);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 chart-pattern opacity-20">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      </div>

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-neon-blue/5"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Orbs with Different Timings */}
      <motion.div
        className="absolute top-1/4 left-10 w-64 h-64 bg-gold/20 rounded-full blur-3xl"
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-10 w-80 h-80 bg-neon-blue/20 rounded-full blur-3xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -30, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/4 w-48 h-48 bg-gold/10 rounded-full blur-2xl"
        animate={{
          y: [0, -30, 0],
          x: [0, 40, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gold/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <motion.div
              className="flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-6 py-2"
              whileHover={{ scale: 1.05, borderColor: "rgba(255, 215, 0, 0.6)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Award className="w-5 h-5 text-gold" />
              </motion.div>
              <span className="text-gold font-mono text-sm">SC Registered Marketing Representative</span>
            </motion.div>
          </motion.div>

          {/* Main Headline - Staggered Animation */}
          <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <motion.span
              variants={itemVariants}
              className="block text-gold"
              style={{ display: "inline-block" }}
            >
              Max Saham
            </motion.span>
            <br />
            <motion.span
              variants={itemVariants}
              className="block text-foreground"
              style={{ display: "inline-block" }}
            >
              Smart Money Futures Trader
            </motion.span>
            <br />
            <motion.span
              variants={itemVariants}
              className="block text-neon-blue"
              style={{ display: "inline-block" }}
            >
              & FCPO Educator
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Learn <span className="text-gold font-semibold">Wyckoff</span> +{" "}
            <span className="text-gold font-semibold">Smart Money</span> +{" "}
            <span className="text-neon-blue font-semibold">Order Flow</span> for FCPO Trading. Master
            intraday precision with Abg Max.
          </motion.p>

          {/* CTA Buttons with Advanced Hover Effects */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="bg-neon-blue hover:bg-neon-blue/90 text-black font-semibold text-lg px-8 py-6 rounded-xl relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <Users className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Join Free Telegram</span>
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(0, 217, 255, 0.3)",
                      "0 0 40px rgba(0, 217, 255, 0.6)",
                      "0 0 20px rgba(0, 217, 255, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gold text-gold hover:bg-gold hover:text-black font-semibold text-lg px-8 py-6 rounded-xl relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gold/10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <TrendingUp className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Open FCPO Account</span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="bg-gold hover:bg-gold/90 text-black font-semibold text-lg px-8 py-6 rounded-xl relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(255,215,0,0) 0%, rgba(255,215,0,0.3) 50%, rgba(255,215,0,0) 100%)",
                      "linear-gradient(225deg, rgba(255,215,0,0) 0%, rgba(255,215,0,0.3) 50%, rgba(255,215,0,0) 100%)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Sparkles className="w-5 h-5 mr-2 relative z-10" />
                <span className="relative z-10">Enter Premium Area</span>
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(255, 215, 0, 0.3)",
                      "0 0 40px rgba(255, 215, 0, 0.6)",
                      "0 0 20px rgba(255, 215, 0, 0.3)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Cards with Counter Animation */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto"
          >
            <motion.div
              className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 relative overflow-hidden group"
              whileHover={{
                borderColor: "rgba(255, 215, 0, 0.5)",
                y: -5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="text-4xl font-bold text-gold mb-2"
                animate={{ scale: counters.years === 8 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {counters.years}+
              </motion.div>
              <div className="text-muted-foreground">Years Trading FCPO</div>
            </motion.div>

            <motion.div
              className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 relative overflow-hidden group"
              whileHover={{
                borderColor: "rgba(0, 217, 255, 0.5)",
                y: -5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="text-4xl font-bold text-neon-blue mb-2"
                animate={{ scale: counters.students === 500 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {counters.students}+
              </motion.div>
              <div className="text-muted-foreground">Students Trained</div>
            </motion.div>

            <motion.div
              className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 relative overflow-hidden group"
              whileHover={{
                borderColor: "rgba(255, 215, 0, 0.5)",
                y: -5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="text-4xl font-bold text-gold mb-2"
                animate={{ scale: counters.success === 95 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                {counters.success}%
              </motion.div>
              <div className="text-muted-foreground">Success Rate</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-gold rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
