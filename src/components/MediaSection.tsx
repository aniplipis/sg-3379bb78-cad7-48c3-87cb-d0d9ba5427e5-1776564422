
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Music, Facebook, Send, MessageCircle } from "lucide-react";

export function MediaSection() {
  return (
    <section id="media" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm font-mono text-gold mb-2">STAY CONNECTED</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Media Hub</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Follow our content across multiple platforms for daily market insights and trading education
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-card/50 backdrop-blur border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-bold">YouTube</h3>
                </div>
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center mb-4">
                  <p className="text-muted-foreground">YouTube Video Embed Placeholder</p>
                </div>
                <p className="text-muted-foreground mb-4">
                  Watch our latest trading analysis, strategy breakdowns, and live trading sessions
                </p>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  <Youtube className="w-5 h-5 mr-2" />
                  Subscribe to Channel
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border-border">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <Music className="w-6 h-6 text-pink-500" />
                  </div>
                  <h3 className="text-2xl font-bold">TikTok</h3>
                </div>
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center mb-4">
                  <p className="text-muted-foreground">TikTok Video Embed Placeholder</p>
                </div>
                <p className="text-muted-foreground mb-4">
                  Quick tips, market updates, and bite-sized trading lessons for busy traders
                </p>
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">
                  <Music className="w-5 h-5 mr-2" />
                  Follow on TikTok
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-gold/10 to-neon-blue/10 border-gold/30">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Connect With Our Community</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Facebook className="w-5 h-5 mr-2" />
                  Facebook
                </Button>
                <Button size="lg" className="bg-neon-blue hover:bg-neon-blue/90 text-black">
                  <Send className="w-5 h-5 mr-2" />
                  Telegram
                </Button>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </Button>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  <Youtube className="w-5 h-5 mr-2" />
                  YouTube
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
