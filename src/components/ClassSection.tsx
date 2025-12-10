import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, CheckCircle2, Calendar, Users, Video, BookOpen } from "lucide-react";
import Link from "next/link";

export function ClassSection() {
  const syllabus = [
    "3 Sesi Kelas Intensif + Rakaman Lengkap",
    "Access segera: Indicators + access to MAX CLAN portal",
    "Koleksi Video Training",
    "Technical Library (Ebook TA & FA)",
    "Free class revision",
    "FCPO Alert Channel (Percuma)",
    "Support Komuniti MAX CLAN"
  ];

  return (
    <section id="class" className="py-16 md:py-20 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 md:px-6 py-2 mb-4 md:mb-6">
            <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-gold" />
            <span className="text-gold font-semibold text-sm md:text-base">Online Class</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            Join <span className="text-gold">MAX CLAN</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto mb-3 md:mb-4">
            Hybrid SMC Masterclass - Master FCPO trading with structured, repeatable Hybrid Smart Money Concepts
          </p>
          <a 
            href="https://t.me/maxsaham" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-base md:text-lg text-gold font-semibold hover:text-gold/80 transition-colors underline decoration-gold/50 hover:decoration-gold"
          >
            Join MAX CLAN Telegram for latest training dates
          </a>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Class Poster/Image */}
          <Card className="border-border/50 bg-gradient-to-br from-gold/5 to-blue-500/5 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[4/3] bg-gradient-to-br from-gold/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-center p-6 md:p-8">
                  <GraduationCap className="w-16 h-16 md:w-24 md:h-24 text-gold mx-auto mb-3 md:mb-4" />
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">Hybrid SMC Masterclass</h3>
                  <p className="text-sm md:text-base text-muted-foreground">Professional FCPO Trading Program</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Class Details */}
          <div className="space-y-4 md:space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">What You Will Receive / Apa Anda Akan Dapat</h3>
                <ul className="space-y-2 md:space-y-3">
                  {syllabus.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 md:gap-3">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-sm md:text-base text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <Card className="border-border/50 bg-card/50">
                <CardContent className="p-3 md:p-4 text-center">
                  <Calendar className="w-6 h-6 md:w-8 md:h-8 text-gold mx-auto mb-1 md:mb-2" />
                  <p className="text-xs md:text-sm text-muted-foreground">Duration</p>
                  <p className="text-sm md:text-base font-semibold">3 Days</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50">
                <CardContent className="p-3 md:p-4 text-center">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-gold mx-auto mb-1 md:mb-2" />
                  <p className="text-xs md:text-sm text-muted-foreground">Format</p>
                  <p className="text-sm md:text-base font-semibold">Online Live</p>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50">
                <CardContent className="p-3 md:p-4 text-center">
                  <Video className="w-6 h-6 md:w-8 md:h-8 text-gold mx-auto mb-1 md:mb-2" />
                  <p className="text-xs md:text-sm text-muted-foreground">Platform</p>
                  <p className="text-sm md:text-base font-semibold">Zoom</p>
                </CardContent>
              </Card>
            </div>

            <Button className="w-full bg-gold hover:bg-gold/90 text-black font-semibold h-12 md:h-14 text-sm md:text-base" asChild>
              <Link href="/#membership">
                <span className="md:hidden">Daftar Sekarang</span>
                <span className="hidden md:inline">Daftar Sekarang / Register Now - Become Premium Member</span>
              </Link>
            </Button>
          </div>
        </div>

        <Card className="border-gold/20 bg-gradient-to-r from-gold/5 to-blue-500/5">
          <CardContent className="p-6 md:p-8 text-center">
            <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-gold mx-auto mb-3 md:mb-4" />
            <h3 className="text-xl md:text-2xl font-bold mb-2">Join MAX CLAN Community</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4">
              All students receive comprehensive study materials, trading templates, indicators, and lifetime access to the MAX CLAN community
            </p>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm">
              <span className="bg-gold/10 border border-gold/20 rounded-full px-3 py-1.5 md:px-4 md:py-2">Trading Indicators</span>
              <span className="bg-gold/10 border border-gold/20 rounded-full px-3 py-1.5 md:px-4 md:py-2">Strategy Templates</span>
              <span className="bg-gold/10 border border-gold/20 rounded-full px-3 py-1.5 md:px-4 md:py-2">Course Recordings</span>
              <span className="bg-gold/10 border border-gold/20 rounded-full px-3 py-1.5 md:px-4 md:py-2">MAX CLAN Portal Access</span>
              <span className="bg-gold/10 border border-gold/20 rounded-full px-3 py-1.5 md:px-4 md:py-2">Free Class Revision</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}