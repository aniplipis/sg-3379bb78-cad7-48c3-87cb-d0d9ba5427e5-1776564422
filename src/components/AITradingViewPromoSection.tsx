import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export function AITradingViewPromoSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block px-6 py-2 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
            <span className="text-green-500 font-semibold text-sm uppercase tracking-wide">
              🔥 Special Promotion
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI for TradingView Class
          </h2>
        </div>

        <Card className="overflow-hidden border-2 border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/10">
          <CardContent className="p-0">
            <a
              href="https://t.me/maxsaham"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src="/ai-tradingview-promo.png"
                  alt="AI for TradingView Class Promotion"
                  width={1200}
                  height={630}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span className="font-semibold">Daftar Sekarang</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </a>

            <div className="p-6 md:p-8 bg-gradient-to-b from-muted/50 to-background">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg mb-4 leading-relaxed">
                  🚀 Trader, stop buang masa trial & error buat indicator.
                </p>
                <p className="mb-4">
                  Dalam kelas <strong>AI for TradingView</strong>, saya tunjuk cara sebenar guna AI untuk:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✅</span>
                    <span>bina indicator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✅</span>
                    <span>setup alert real-time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✅</span>
                    <span>tukar idea → strategy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✅</span>
                    <span>test terus LIVE market (FCPO, CL, ZL)</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-4 mb-4">
                  <p className="text-green-400 font-semibold mb-2">🎁 PERCUMA untuk Max Clan Premium</p>
                  <p className="text-blue-400 font-semibold mb-2">💰 Non-member: RM80 sahaja</p>
                  <p className="text-yellow-400 font-semibold">👥 Terhad 50 orang</p>
                </div>

                <div className="text-center">
                  <p className="mb-4 text-muted-foreground">👉 Daftar sekarang di:</p>
                  <a
                    href="https://t.me/maxsaham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50 hover:scale-105"
                  >
                    <span>🌐 https://t.me/maxsaham</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}