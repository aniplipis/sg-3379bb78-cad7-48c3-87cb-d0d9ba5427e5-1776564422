import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Music2, Facebook, Send, MessageCircle } from "lucide-react";
import Script from "next/script";

export function MediaSection() {
  const socialLinks = [
    { icon: Youtube, label: "YouTube", url: "https://youtube.com/@maxsaham", color: "text-red-500" },
    { icon: Music2, label: "TikTok", url: "https://tiktok.com/@maxsaham", color: "text-cyan-400" },
    { icon: Facebook, label: "Facebook", url: "https://facebook.com/maxsaham", color: "text-blue-500" },
    { icon: Send, label: "Telegram", url: "https://t.me/maxsaham", color: "text-blue-400" },
    { icon: MessageCircle, label: "WhatsApp", url: "https://api.whatsapp.com/send/?phone=601154110086&text&type=phone_number&app_absent=0", color: "text-green-500" }
  ];

  return (
    <section id="media" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 mb-6">
            <Youtube className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold">Media & Community</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured Content — <span className="text-gold">Intro to FCPO</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Daily market analysis, trading insights, and educational content across all platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* YouTube Video Embed */}
          <Card className="border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/tsKPL07KcXw?start=3156"
                  title="Intro to FCPO Trading"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          {/* TikTok Embed */}
          <Card className="border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video flex items-center justify-center bg-black">
                <blockquote 
                  className="tiktok-embed" 
                  cite="https://www.tiktok.com/@maxsaham/video/7262882963258461447" 
                  data-video-id="7262882963258461447" 
                  style={{ maxWidth: '100%', minWidth: '325px', width: '100%', height: '100%' }}
                >
                  <section style={{ width: '100%', height: '100%' }}>
                    <a 
                      target="_blank" 
                      title="@maxsaham" 
                      href="https://www.tiktok.com/@maxsaham?refer=embed"
                      rel="noopener noreferrer"
                    >
                      @maxsaham
                    </a>
                  </section>
                </blockquote>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Media Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {socialLinks.map((social, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto flex-col gap-3 p-6 border-border/50 hover:border-gold/50 transition-all"
              asChild
            >
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                <social.icon className={`w-8 h-8 ${social.color}`} />
                <span className="text-sm font-semibold">{social.label}</span>
              </a>
            </Button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Join thousands of traders learning FCPO strategies and market analysis daily
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-muted/50 rounded-full px-4 py-2">📊 Daily Market Updates</span>
            <span className="bg-muted/50 rounded-full px-4 py-2">📈 Live Trading Analysis</span>
            <span className="bg-muted/50 rounded-full px-4 py-2">🎓 Educational Content</span>
            <span className="bg-muted/50 rounded-full px-4 py-2">💬 Community Discussion</span>
          </div>
        </div>
      </div>
      
      {/* TikTok Embed Script */}
      <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
    </section>
  );
}