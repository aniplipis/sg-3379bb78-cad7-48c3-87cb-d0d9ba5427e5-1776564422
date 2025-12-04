
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send, Youtube, Music, Facebook } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-sm font-mono text-neon-blue mb-2">GET IN TOUCH</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Contact & Community</h2>
            <p className="text-xl text-muted-foreground">
              Join our growing community of professional FCPO traders
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur border-gold/30 mb-8">
            <CardContent className="p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <Button size="lg" className="h-20 bg-green-600 hover:bg-green-700 text-white flex-col gap-2">
                  <MessageCircle className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">WhatsApp Direct Chat</div>
                    <div className="text-xs opacity-80">Quick response guaranteed</div>
                  </div>
                </Button>

                <Button size="lg" className="h-20 bg-neon-blue hover:bg-neon-blue/90 text-black flex-col gap-2">
                  <Send className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">Telegram Public Channel</div>
                    <div className="text-xs opacity-80">Daily market updates</div>
                  </div>
                </Button>

                <Button size="lg" className="h-20 bg-red-600 hover:bg-red-700 text-white flex-col gap-2">
                  <Youtube className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">YouTube Subscribe</div>
                    <div className="text-xs opacity-80">Trading tutorials</div>
                  </div>
                </Button>

                <Button size="lg" className="h-20 bg-pink-600 hover:bg-pink-700 text-white flex-col gap-2">
                  <Music className="w-6 h-6" />
                  <div>
                    <div className="font-semibold">TikTok Follow</div>
                    <div className="text-xs opacity-80">Quick trading tips</div>
                  </div>
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Facebook className="w-6 h-6 mr-2" />
                  Follow on Facebook
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-muted-foreground">
            <p className="mb-2">Average response time: Under 2 hours</p>
            <p className="text-sm">Available Monday - Friday, 9 AM - 6 PM (MYT)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
