
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Music2, Facebook, Send, MessageCircle } from "lucide-react";

export function MediaSection() {
  const socialLinks = [
    { icon: Youtube, label: "YouTube", url: "https://youtube.com/@maxsaham", color: "text-red-500" },
    { icon: Music2, label: "TikTok", url: "https://tiktok.com/@maxsaham", color: "text-cyan-400" },
    { icon: Facebook, label: "Facebook", url: "https://facebook.com/maxsaham", color: "text-blue-500" },
    { icon: Send, label: "Telegram", url: "https://t.me/maxsaham", color: "text-blue-400" },
    { icon: MessageCircle, label: "WhatsApp", url: "https://wa.me/60123456789", color: "text-green-500" }
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
            Follow My <span className="text-gold">Trading Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Daily market analysis, trading insights, and educational content across all platforms
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* YouTube Video Embed */}
          <Card className="border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-red-500/20 to-black flex items-center justify-center">
                <div className="text-center">
                  <Youtube className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <p className="text-muted-foreground">YouTube Video Embed</p>
                  <p className="text-sm text-muted-foreground/60">Video URL to be added</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TikTok Embed */}
          <Card className="border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video bg-gradient-to-br from-cyan-400/20 to-black flex items-center justify-center">
                <div className="text-center">
                  <Music2 className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">TikTok Embed</p>
                  <p className="text-sm text-muted-foreground/60">Video URL to be added</p>
                </div>
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
    </section>
  );
}
