import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function AITradingViewPromoSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        <Card className="border-2 border-gold/30 bg-gradient-to-br from-gold/5 via-background to-green-500/5 overflow-hidden shadow-2xl">
          <CardContent className="p-0">
            {/* Badge */}
            <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 py-3 px-6 text-center">
              <p className="text-white font-bold text-lg flex items-center justify-center gap-2">
                🔥🌴 SPECIAL PROMOTION
              </p>
            </div>

            {/* Main Content */}
            <div className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent">
                Kelas Rancangan Khas Futures (Online)
              </h2>

              {/* Promotional Poster */}
              <a
                href="https://t.me/maxsaham"
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-8 group"
              >
                <div className="relative overflow-hidden rounded-xl border-4 border-gold/40 shadow-2xl transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-gold/30 group-hover:border-gold/60">
                  <img
                    src="/futures-class-promo-2026.png"
                    alt="Kelas Rancangan Khas Futures Online Promotion"
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                    <div className="bg-gold/90 text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ExternalLink className="w-5 h-5" />
                      Klik untuk Daftar di Telegram
                    </div>
                  </div>
                </div>
              </a>

              {/* Caption Content */}
              <div className="bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl p-6 md:p-8 border border-gold/20 space-y-4">
                <div className="space-y-3 text-foreground/90">
                  <p className="text-lg font-semibold text-gold">
                    🔥🌴 KELAS RANCANGAN KHAS FUTURES (ONLINE)<br />
                    PERTAMA 2026
                  </p>
                  
                  <div className="space-y-2 text-base">
                    <p>📅 <strong>19 – 23 Januari 2026</strong></p>
                    <p>🕘 <strong>9.00 Malam – 11.00 Malam</strong></p>
                    <p>📍 <strong>Online (Zoom) — Rakaman Disediakan</strong></p>
                  </div>

                  <div className="pt-4 space-y-2">
                    <p className="text-base">
                      🚀 <strong>Syllabus baharu, lebih MUDAH & PADU</strong><br />
                      💸 "Rahsia Buat Duit di Pasaran Futures"<br />
                      📈 Kaedah yang senang faham, berstruktur & sesuai untuk semua peringkat — dari beginner sampai trader yang nak kemaskan execution.
                    </p>
                  </div>

                  <div className="pt-4">
                    <p className="text-lg font-semibold text-green-400 mb-3">✨ Apa yang anda akan dapat:</p>
                    <div className="space-y-2 pl-4">
                      <p>✅ 3 sesi kelas intensif + rakaman penuh</p>
                      <p>✅ Lepas daftar → terus dapat Indicator Max Saham + rakaman kelas (boleh mula belajar awal)</p>
                      <p>✅ Akses Channel ALERT FCPO secara PERCUMA</p>
                      <p>✅ Koleksi video training sebelum ini</p>
                      <p>✅ Technical Library (Ebook premium TA & FA)</p>
                      <p>✅ Support berterusan bersama komuniti MAX CLAN</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gold/20 mt-4">
                    <p className="text-base italic text-muted-foreground">
                      🎯 Kelas ini fokus pada struktur pasaran, disiplin & execution —<br />
                      bukan teka arah, bukan janji kosong.
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-6 flex justify-center">
                  <a
                    href="https://t.me/maxsaham"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 bg-gradient-to-r from-gold via-yellow-400 to-gold text-black font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-2xl hover:shadow-gold/50 transition-all duration-300 hover:scale-105"
                  >
                    <span>👉 Daftar Sekarang di Telegram</span>
                    <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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