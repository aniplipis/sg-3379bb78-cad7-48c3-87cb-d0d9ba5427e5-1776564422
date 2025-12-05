import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send, Youtube, Music2, Facebook, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function ContactSection() {
  const contacts = [
    {
      icon: MessageCircle,
      title: "WhatsApp Direct",
      description: "Chat with me directly",
      action: "Start Chat",
      url: "https://wa.me/60123456789",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Send,
      title: "Telegram Channel",
      description: "Join the community",
      action: "Join Now",
      url: "https://t.me/maxsaham",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
    {
      icon: Youtube,
      title: "YouTube",
      description: "Educational videos",
      action: "Subscribe",
      url: "https://youtube.com/@maxsaham",
      color: "text-red-500",
      bgColor: "bg-red-500/10"
    },
    {
      icon: Music2,
      title: "TikTok",
      description: "Daily trading tips",
      action: "Follow",
      url: "https://tiktok.com/@maxsaham",
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10"
    },
    {
      icon: Facebook,
      title: "Facebook",
      description: "Community updates",
      action: "Like Page",
      url: "https://facebook.com/maxsaham",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Business inquiries",
      action: "Send Email",
      url: "mailto:contact@maxsaham.com",
      color: "text-gold",
      bgColor: "bg-gold/10"
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-6 py-2 mb-6">
            <MessageCircle className="w-5 h-5 text-gold" />
            <span className="text-gold font-semibold">Get Connected</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Contact & <span className="text-gold">Community</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with me and join thousands of FCPO traders in the Max Saham community
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {contacts.map((contact, index) => (
            <Card key={index} className="border-border/50 hover:border-gold/50 transition-all group">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${contact.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <contact.icon className={`w-8 h-8 ${contact.color}`} />
                </div>
                <h3 className="text-lg font-bold mb-2">{contact.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{contact.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full border-border/50 hover:border-gold/50"
                  asChild
                >
                  <a href={contact.url} target="_blank" rel="noopener noreferrer">
                    {contact.action}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="border-border/50 bg-gradient-to-r from-gold/5 to-blue-500/5 inline-block">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-3">Questions? Let's Talk!</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl">
                Whether you're new to FCPO trading or looking to refine your strategy, I'm here to help. 
                Reach out through any platform above.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="bg-muted/50 rounded-full px-4 py-2">📞 Fast Response</span>
                <span className="bg-muted/50 rounded-full px-4 py-2">🤝 Friendly Support</span>
                <span className="bg-muted/50 rounded-full px-4 py-2">💼 Professional Guidance</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center">

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-neon-blue via-blue-500 to-neon-blue hover:from-blue-500 hover:via-neon-blue hover:to-blue-500 text-black font-bold text-lg px-10 py-7 rounded-2xl shadow-2xl shadow-neon-blue/50 relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }} />
              <Send className="w-5 h-5 mr-3 relative z-10" />
              <span className="relative z-10">Join Telegram Community</span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              className="border-3 border-gold text-gold hover:bg-gold hover:text-black font-bold text-lg px-10 py-7 rounded-2xl shadow-xl shadow-gold/30 relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-gold/20"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }} />
              <Mail className="w-5 h-5 mr-3 relative z-10" />
              <span className="relative z-10">Email Us</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
