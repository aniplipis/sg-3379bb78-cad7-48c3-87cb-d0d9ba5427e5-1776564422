import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Play, Lock, Clock, ChevronRight, Folder, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VideoLibrary() {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedSubfolder, setSelectedSubfolder] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/?login=true");
    }
    // Redirect free users to free dashboard
    if (!isLoading && user && !profile?.is_premium) {
      router.push("/members/free-dashboard");
    }
  }, [user, profile, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile?.is_premium) {
    return null;
  }

  const isPremium = profile?.is_premium || false;

  const categories = [
    { id: "all", label: "All Videos", count: 97 },
    { id: "class-recordings", label: "Class Recordings", count: 42, icon: Folder },
    { id: "wyckoff", label: "Wyckoff Lessons", count: 12 },
    { id: "smc", label: "Smart Money Concepts", count: 15 },
    { id: "fcpo", label: "FCPO Strategy", count: 10 },
    { id: "orderflow", label: "Order Flow & Delta", count: 8 },
    { id: "volume", label: "Volume Profile", count: 5 },
    { id: "risk", label: "Risk Management", count: 7 },
    { id: "live", label: "Live Trading Replays", count: 18 },
    { id: "psychology", label: "Trading Psychology", count: 6 }
  ];

  const subfolders = [
  { id: "HYBRID SMC APRIL 2026", label: "HYBRID SMC APRIL 2026", count: 2 },
    { id: "PROJEK DUIT RAYA 2026", label: "PROJEK DUIT RAYA 2026", count: 2 },
    { id: "HYBRID SMC JANUARY 2026", label: "HYBRID SMC JANUARY 2026", count: 3 },
    { id: "HYBRID SMC OCTOBER 2025", label: "HYBRID SMC OCTOBER 2025", count: 3 },
    { id: "CHATGPT", label: "CHATGPT", count: 1 },
    { id: "HYBRID SMC AUGUST 2025", label: "HYBRID SMC AUGUST 2025", count: 3 },
    { id: "HYBRID SMC JULY 2025", label: "HYBRID SMC JULY 2025", count: 3 },
    { id: "HYBRID SMC JUNE 2025", label: "HYBRID SMC JUNE 2025", count: 4 },
    { id: "HYBRID SMC APRIL 2025", label: "HYBRID SMC APRIL 2025", count: 4 },
    { id: "HYBRID SMC JANUARY 2025", label: "HYBRID SMC JANUARY 2025", count: 4 },
    { id: "HYBRID SMC NOVEMBER 2024", label: "HYBRID SMC NOVEMBER 2024", count: 4 },
    { id: "HYBRID SMC OCTOBER 2024", label: "HYBRID SMC OCTOBER 2024", count: 4 },
    { id: "HYBRID SMC AUGUST 2024", label: "HYBRID SMC AUGUST 2024", count: 4 },
    { id: "HYBRID SMC MAY 2024", label: "HYBRID SMC MAY 2024", count: 4 }
  ];

  const videos = [
    // PROJEK DUIT RAYA 2026 Series (NEWEST - REPLACES FEATURED)
    {
      id: "projek-duit-raya-1",
      title: "PROJEK DUIT RAYA 2026 PART 1",
      category: "class-recordings",
      subcategory: "PROJEK DUIT RAYA 2026",
      duration: "Video Length",
      vimeoId: "1171831741",
      thumbnail: "https://vumbnail.com/1171831741.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1171831741?badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="PROJEK DUIT RAYA 2026 PART 1"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "First session of the Projek Duit Raya 2026 special series"
    },
    {
      id: "projek-duit-raya-2",
      title: "PROJEK DUIT RAYA 2026 PART 2",
      category: "class-recordings",
      subcategory: "PROJEK DUIT RAYA 2026",
      duration: "Video Length",
      vimeoId: "1171832268",
      thumbnail: "https://vumbnail.com/1171832268.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1171832268?badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="PROJEK DUIT RAYA 2026 PART 2"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Second session covering advanced concepts from Projek Duit Raya 2026"
    },
    // Class Recordings - HYBRID SMC JANUARY 2026
    {
      id: "hybrid-jan26-1",
      title: "HYBRID SMC 2026 PART 1",
      category: "class-recordings",
      subcategory: "HYBRID SMC JANUARY 2026",
      duration: "Video Length",
      vimeoId: "1157466337",
      thumbnail: "https://vumbnail.com/1157466337.jpg",
      vimeoEmbed: `<div style="padding:75% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1157466337?badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HYBRID SMC 2026 PART 1"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "First session of the Hybrid SMC 2026 methodology training"
    },
    {
      id: "hybrid-jan26-2",
      title: "HYBRID SMC 2026 PART 2",
      category: "class-recordings",
      subcategory: "HYBRID SMC JANUARY 2026",
      duration: "Video Length",
      vimeoId: "1157467269",
      thumbnail: "https://vumbnail.com/1157467269.jpg",
      vimeoEmbed: `<div style="padding:75% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1157467269?badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HYBRID SMC 2026 PART 2"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Second session covering advanced Hybrid SMC 2026 concepts"
    },
    {
      id: "hybrid-jan26-3",
      title: "HYBRID SMC 2026 PART 3",
      category: "class-recordings",
      subcategory: "HYBRID SMC JANUARY 2026",
      duration: "Video Length",
      vimeoId: "1162132424",
      thumbnail: "https://vumbnail.com/1162132424.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1162132424?badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HYBRID SMC 2026 PART 3"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Third session completing the Hybrid SMC 2026 methodology training"
    },
    // Class Recordings - HYBRID SMC OCTOBER 2025
    {
      id: "hybrid-oct-1",
      title: "HYBRID SMC PART 1",
      category: "class-recordings",
      subcategory: "HYBRID SMC OCTOBER 2025",
      duration: "Video Length",
      vimeoId: "1144396134",
      thumbnail: "https://vumbnail.com/1144396134.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144396134?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HYBRID PART 1"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "First session of the Hybrid SMC methodology training"
    },
    {
      id: "hybrid-oct-2",
      title: "HYBRID SMC PART 2",
      category: "class-recordings",
      subcategory: "HYBRID SMC OCTOBER 2025",
      duration: "Video Length",
      vimeoId: "1144395840",
      thumbnail: "https://vumbnail.com/1144395840.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144395840?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HYBRID SMC PART 2"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Second session covering advanced Hybrid SMC concepts"
    },
    {
      id: "hybrid-oct-3",
      title: "HYBRID SMC PART 3",
      category: "class-recordings",
      subcategory: "HYBRID SMC OCTOBER 2025",
      duration: "Video Length",
      vimeoId: "1144395923",
      thumbnail: "https://vumbnail.com/1144395923.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144395923?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HYBRID SMC PART 3"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Final session with practical application and examples"
    },
    // Class Recordings - CHATGPT
    {
      id: "chatgpt-1",
      title: "HARNESS THE POWER OF CHATGPT",
      category: "class-recordings",
      subcategory: "CHATGPT",
      duration: "Video Length",
      vimeoId: "1144412616",
      thumbnail: "https://vumbnail.com/1144412616.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144412616?badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HARNESS THE POWER OF CHATGPT"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Learn how to leverage ChatGPT for trading analysis and research"
    },
    // Class Recordings - HYBRID SMC AUGUST 2025
    {
      id: "hybrid-aug-1",
      title: "HYBRID SMC PART 1",
      category: "class-recordings",
      subcategory: "HYBRID SMC AUGUST 2025",
      duration: "Video Length",
      vimeoId: "1144395701",
      thumbnail: "https://vumbnail.com/1144395701.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144395701?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HYBRID SMC PART 1"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "August 2025 session - Introduction to Hybrid SMC methodology"
    },
    {
      id: "hybrid-aug-2",
      title: "HYBRID SMC PART 2",
      category: "class-recordings",
      subcategory: "HYBRID SMC AUGUST 2025",
      duration: "Video Length",
      vimeoId: "1144395300",
      thumbnail: "https://vumbnail.com/1144395300.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144395300?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HYBRID SMC PART 2"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "August 2025 session - Advanced Hybrid SMC concepts"
    },
    {
      id: "hybrid-aug-3",
      title: "HYBRID SMC PART 3",
      category: "class-recordings",
      subcategory: "HYBRID SMC AUGUST 2025",
      duration: "Video Length",
      vimeoId: "1144395489",
      thumbnail: "https://vumbnail.com/1144395489.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144395489?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HYBRID SMC PART 3"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "August 2025 session - Practical applications and examples"
    },
    // Class Recordings - HYBRID SMC JULY 2025
    {
      id: "hybrid-jul-1",
      title: "HYBRID SMC PART 1",
      category: "class-recordings",
      subcategory: "HYBRID SMC JULY 2025",
      duration: "Video Length",
      vimeoId: "1142017799",
      thumbnail: "https://vumbnail.com/1142017799.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1142017799?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HYBRID SMC PART 1"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "July 2025 session - Introduction to Hybrid SMC methodology"
    },
    {
      id: "hybrid-jul-2",
      title: "HYBRID SMC PART 2",
      category: "class-recordings",
      subcategory: "HYBRID SMC JULY 2025",
      duration: "Video Length",
      vimeoId: "1142017987",
      thumbnail: "https://vumbnail.com/1142017987.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1142017987?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HYBRID SMC PART 2"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "July 2025 session - Advanced Hybrid SMC concepts"
    },
    {
      id: "hybrid-jul-3",
      title: "HYBRID SMC PART 3",
      category: "class-recordings",
      subcategory: "HYBRID SMC JULY 2025",
      duration: "Video Length",
      vimeoId: "1142018335",
      thumbnail: "https://vumbnail.com/1142018335.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1142018335?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="HYBRID SMC PART 3"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "July 2025 session - Practical applications and examples"
    },
    // Class Recordings - HYBRID SMC JUNE 2025
    {
      id: "hybrid-jun-1",
      title: "KRK FUTURES TRADING (PART 1)",
      category: "class-recordings",
      subcategory: "HYBRID SMC JUNE 2025",
      duration: "Video Length",
      vimeoId: "1144426249",
      thumbnail: "https://vumbnail.com/1144426249.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144426249?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 1) 16_06_2025"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 16/06/2025"
    },
    {
      id: "hybrid-jun-2",
      title: "KRK FUTURES TRADING (PART 2)",
      category: "class-recordings",
      subcategory: "HYBRID SMC JUNE 2025",
      duration: "Video Length",
      youtubeId: "iFudDnPoh24",
      thumbnail: "https://img.youtube.com/vi/iFudDnPoh24/maxresdefault.jpg",
      youtubeEmbed: `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/iFudDnPoh24?si=IakXyM988xoyWB0D" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>`,
      description: "Kelas Rancangan Khas Futures Trading - Part 2 (YouTube)"
    },
    {
      id: "hybrid-jun-3",
      title: "KRK FUTURES TRADING (PART 3)",
      category: "class-recordings",
      subcategory: "HYBRID SMC JUNE 2025",
      duration: "Video Length",
      vimeoId: "1144426029",
      thumbnail: "https://vumbnail.com/1144426029.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144426029?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 3) 18_06_2025"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 18/06/2025"
    },
    {
      id: "hybrid-jun-4",
      title: "KRK FUTURES TRADING (PART 4)",
      category: "class-recordings",
      subcategory: "HYBRID SMC JUNE 2025",
      duration: "Video Length",
      vimeoId: "1144426135",
      thumbnail: "https://vumbnail.com/1144426135.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144426135?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 4) 20_06_2025"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 20/06/2025"
    },
    // Class Recordings - HYBRID SMC APRIL 2025
    {
      id: "hybrid-apr-1",
      title: "KRK FUTURES TRADING (PART 1)",
      category: "class-recordings",
      subcategory: "HYBRID SMC APRIL 2025",
      duration: "Video Length",
      vimeoId: "1144425810",
      thumbnail: "https://vumbnail.com/1144425810.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144425810?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 1) 21_04_2025"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 21/04/2025"
    },
    {
      id: "hybrid-apr-2",
      title: "FCPO SPREAD TRADING 101 (PART 2)",
      category: "class-recordings",
      subcategory: "HYBRID SMC APRIL 2025",
      duration: "Video Length",
      vimeoId: "1144413998",
      thumbnail: "https://vumbnail.com/1144413998.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144413998?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="FCPO SPREAD TRADING 101 - KRK FUTURES TRADING (PART 2)"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "FCPO Spread Trading 101 - KRK Futures Trading"
    },
    {
      id: "hybrid-apr-3",
      title: "KRK FUTURES TRADING (PART 3)",
      category: "class-recordings",
      subcategory: "HYBRID SMC APRIL 2025",
      duration: "Video Length",
      vimeoId: "1144425423",
      thumbnail: "https://vumbnail.com/1144425423.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144425423?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 3) 23_04_2025"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 23/04/2025"
    },
    {
      id: "hybrid-apr-4",
      title: "KRK FUTURES TRADING (PART 4)",
      category: "class-recordings",
      subcategory: "HYBRID SMC APRIL 2025",
      duration: "Video Length",
      vimeoId: "1144425527",
      thumbnail: "https://vumbnail.com/1144425527.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144425527?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 4) 25_04_2025"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 25/04/2025"
    },
    // Class Recordings - HYBRID SMC JANUARY 2025
    {
      id: "hybrid-jan-1",
      title: "FUNDAMENTALS OF HYBRID SMC (PART 1)",
      category: "class-recordings",
      subcategory: "HYBRID SMC JANUARY 2025",
      duration: "Video Length",
      vimeoId: "1144413911",
      thumbnail: "https://vumbnail.com/1144413911.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144413911?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="MAX SAHAM FUNDAMENTALS OF HYBRID SMC - KRK FUTURES TRADING (PART 1)"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "MAX SAHAM Fundamentals of Hybrid SMC - KRK Futures Trading"
    },
    {
      id: "hybrid-jan-2",
      title: "KRK FUTURES TRADING (PART 2)",
      category: "class-recordings",
      subcategory: "HYBRID SMC JANUARY 2025",
      duration: "Video Length",
      vimeoId: "1144413528",
      thumbnail: "https://vumbnail.com/1144413528.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144413528?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 2) 03_01_2025"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 03/01/2025"
    },
    {
      id: "hybrid-jan-3",
      title: "KRK FUTURES TRADING (PART 3)",
      category: "class-recordings",
      subcategory: "HYBRID SMC JANUARY 2025",
      duration: "Video Length",
      vimeoId: "1144413615",
      thumbnail: "https://vumbnail.com/1144413615.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144413615?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 3) 06_01_2025"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 06/01/2025"
    },
    {
      id: "hybrid-jan-4",
      title: "KRK FUTURES TRADING (PART 4)",
      category: "class-recordings",
      subcategory: "HYBRID SMC JANUARY 2025",
      duration: "Video Length",
      vimeoId: "1144413749",
      thumbnail: "https://vumbnail.com/1144413749.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144413749?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 4) 07_01_2025"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 07/01/2025"
    },
    // Class Recordings - HYBRID SMC NOVEMBER 2024
    {
      id: "hybrid-nov24-1",
      title: "FUNDAMENTALS OF HYBRID SMC (PART 1)",
      category: "class-recordings",
      subcategory: "HYBRID SMC NOVEMBER 2024",
      duration: "Video Length",
      vimeoId: "1144428516",
      thumbnail: "https://vumbnail.com/1144428516.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144428516?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="MAX SAHAM FUNDAMENTALS OF HYBRID SMC - KRK FUTURES TRADING (PART 1)"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "MAX SAHAM Fundamentals of Hybrid SMC - KRK Futures Trading - November 2024"
    },
    {
      id: "hybrid-nov24-2",
      title: "KRK FUTURES TRADING (PART 2)",
      category: "class-recordings",
      subcategory: "HYBRID SMC NOVEMBER 2024",
      duration: "Video Length",
      vimeoId: "1144428652",
      thumbnail: "https://vumbnail.com/1144428652.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144428652?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 2) 19_11_2024"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 19/11/2024"
    },
    {
      id: "hybrid-nov24-3",
      title: "KRK FUTURES TRADING (PART 3)",
      category: "class-recordings",
      subcategory: "HYBRID SMC NOVEMBER 2024",
      duration: "Video Length",
      vimeoId: "1144428835",
      thumbnail: "https://vumbnail.com/1144428835.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144428835?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 3) 20_11_2024"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 20/11/2024"
    },
    {
      id: "hybrid-nov24-4",
      title: "KRK FUTURES TRADING (PART 4)",
      category: "class-recordings",
      subcategory: "HYBRID SMC NOVEMBER 2024",
      duration: "Video Length",
      vimeoId: "1144428993",
      thumbnail: "https://vumbnail.com/1144428993.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144428993?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 4) 26_11_2024"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 26/11/2024"
    },
    // Class Recordings - HYBRID SMC OCTOBER 2024
    {
      id: "hybrid-oct24-1",
      title: "SCALPING SECRETS FOUNDATIONS (PART 1)",
      category: "class-recordings",
      subcategory: "HYBRID SMC OCTOBER 2024",
      duration: "Video Length",
      vimeoId: "1144427938",
      thumbnail: "https://vumbnail.com/1144427938.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144427938?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="MAX SAHAM X FINLEARN - SCALPING SECRETS FOUNDATIONS OF HYBRID SMC - KRK FUTURES TRADING (PART 1)"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "MAX SAHAM X FINLEARN - Scalping Secrets Foundations of Hybrid SMC"
    },
    {
      id: "hybrid-oct24-2",
      title: "KRK FUTURES TRADING (PART 2)",
      category: "class-recordings",
      subcategory: "HYBRID SMC OCTOBER 2024",
      duration: "Video Length",
      vimeoId: "1144428070",
      thumbnail: "https://vumbnail.com/1144428070.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144428070?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 2) 01_10_2024"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 01/10/2024"
    },
    {
      id: "hybrid-oct24-3",
      title: "KRK FUTURES TRADING (PART 3)",
      category: "class-recordings",
      subcategory: "HYBRID SMC OCTOBER 2024",
      duration: "Video Length",
      vimeoId: "1144395300",
      thumbnail: "https://vumbnail.com/1144395300.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144395300?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 3) 04_10_2024"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 04/10/2024"
    },
    {
      id: "hybrid-oct24-4",
      title: "KRK FUTURES TRADING (PART 4)",
      category: "class-recordings",
      subcategory: "HYBRID SMC OCTOBER 2024",
      duration: "Video Length",
      vimeoId: "1144395489",
      thumbnail: "https://vumbnail.com/1144395489.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144395489?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 4) 07_10_2024"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 07/10/2024"
    },
    // Class Recordings - HYBRID SMC AUGUST 2024
    {
      id: "hybrid-aug24-1",
      title: "FOUNDATIONS OF HYBRID SMC (PART 1)",
      category: "class-recordings",
      subcategory: "HYBRID SMC AUGUST 2024",
      duration: "Video Length",
      vimeoId: "1144427601",
      thumbnail: "https://vumbnail.com/1144427601.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144427601?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="MAX SAHAM X FINLEARN SPOTLIGHT SESSION - FOUNDATIONS OF HYBRID SMC - KRK FUTURES TRADING (PART 1)"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "MAX SAHAM X FINLEARN SPOTLIGHT SESSION - Foundations of Hybrid SMC"
    },
    {
      id: "hybrid-aug24-2",
      title: "KRK FUTURES TRADING (PART 2)",
      category: "class-recordings",
      subcategory: "HYBRID SMC AUGUST 2024",
      duration: "Video Length",
      vimeoId: "1144427707",
      thumbnail: "https://vumbnail.com/1144427707.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144427707?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 2) 13_08_2024"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 13/08/2024"
    },
    {
      id: "hybrid-aug24-3",
      title: "KRK FUTURES TRADING (PART 3)",
      category: "class-recordings",
      subcategory: "HYBRID SMC AUGUST 2024",
      duration: "Video Length",
      vimeoId: "1144427817",
      thumbnail: "https://vumbnail.com/1144427817.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144427817?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 3) 14_08_2024"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 14/08/2024"
    },
    {
      id: "hybrid-aug24-4",
      title: "KRK FUTURES TRADING (PART 4)",
      category: "class-recordings",
      subcategory: "HYBRID SMC AUGUST 2024",
      duration: "Video Length",
      vimeoId: "1144427430",
      thumbnail: "https://vumbnail.com/1144427430.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144427430?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 4) 16_08_2024"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 16/08/2024"
    },
    // Class Recordings - HYBRID SMC MAY 2024
    {
      id: "hybrid-may24-1",
      title: "HIGH WIN RATE UNTUK FCPO, ZL & CL (PART 1)",
      category: "class-recordings",
      subcategory: "HYBRID SMC MAY 2024",
      duration: "Video Length",
      vimeoId: "1144427159",
      thumbnail: "https://vumbnail.com/1144427159.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144427159?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS UNTUK FUTURES TRADING (PART 1) KAEDAH HIGH WIN RATE UNTUK MARKET FCPO, ZL & CL"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas - Kaedah High Win Rate untuk Market FCPO, ZL & CL"
    },
    {
      id: "hybrid-may24-2",
      title: "KRK FUTURES TRADING (PART 2)",
      category: "class-recordings",
      subcategory: "HYBRID SMC MAY 2024",
      duration: "Video Length",
      vimeoId: "1144427293",
      thumbnail: "https://vumbnail.com/1144427293.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144427293?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 2) 21_05_2024"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 21/05/2024"
    },
    {
      id: "hybrid-may24-3",
      title: "KRK FUTURES TRADING (PART 3)",
      category: "class-recordings",
      subcategory: "HYBRID SMC MAY 2024",
      duration: "Video Length",
      vimeoId: "1144426503",
      thumbnail: "https://vumbnail.com/1144426503.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144426503?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 3) 22_05_2024"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 22/05/2024"
    },
    {
      id: "hybrid-may24-4",
      title: "KRK FUTURES TRADING (PART 4)",
      category: "class-recordings",
      subcategory: "HYBRID SMC MAY 2024",
      duration: "Video Length",
      vimeoId: "1144426917",
      thumbnail: "https://vumbnail.com/1144426917.jpg",
      vimeoEmbed: `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1144426917?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="KELAS RANCANGAN KHAS FUTURES TRADING (PART 4) 24_05_2024"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>`,
      description: "Kelas Rancangan Khas Futures Trading - 24/05/2024"
    }
  ];

  const filteredVideos = selectedCategory === "all" 
    ? videos 
    : selectedSubfolder 
      ? videos.filter(v => v.category === selectedCategory && v.subcategory === selectedSubfolder)
      : videos.filter(v => v.category === selectedCategory);

  const handleVideoClick = (video: any) => {
    if (isPremium && (video.vimeoEmbed || video.youtubeEmbed)) {
      setSelectedVideo(video);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubfolder(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-7xl mx-auto">
          {/* Back to Dashboard Link */}
          <Link 
            href={isPremium ? "/members" : "/members/free-dashboard"} 
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 mb-4 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>Back to Dashboard</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gold to-yellow-600 bg-clip-text text-transparent">
              Video Library
            </h1>
            <p className="text-muted-foreground">
              {isPremium ? "Access our complete collection of trading education videos" : "Premium membership required to access video content"}
            </p>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`${
                    selectedCategory === category.id 
                      ? "bg-gold hover:bg-gold/90 text-black" 
                      : "hover:bg-gold/10 hover:text-gold"
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.icon && <category.icon className="mr-2 h-4 w-4" />}
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Subfolder Navigation for Class Recordings */}
          {selectedCategory === "class-recordings" && (
            <div className="mb-8 p-6 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Folder className="h-5 w-5 text-gold" />
                <h2 className="text-xl font-bold">Class Recording Series</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {subfolders.map((subfolder) => (
                  <button
                    key={subfolder.id}
                    onClick={() => setSelectedSubfolder(selectedSubfolder === subfolder.id ? null : subfolder.id)}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                      selectedSubfolder === subfolder.id
                        ? "bg-gold/10 border-gold text-gold"
                        : "bg-background border-border hover:border-gold/50 hover:bg-gold/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gold"></div>
                      <span className="font-medium">{subfolder.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {subfolder.count} video{subfolder.count !== 1 ? 's' : ''}
                    </span>
                  </button>
                ))}
              </div>
              {selectedSubfolder && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedSubfolder(null)}
                  className="mt-4 text-gold hover:text-gold/90 hover:bg-gold/10"
                >
                  Show all class recordings
                </Button>
              )}
            </div>
          )}

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card 
                key={video.id}
                className={`overflow-hidden transition-all ${
                  isPremium && (video.vimeoEmbed || video.youtubeEmbed)
                    ? "hover:shadow-lg hover:border-gold cursor-pointer" 
                    : ""
                }`}
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative aspect-video bg-muted">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    {isPremium ? (
                      <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center">
                        <Play className="h-8 w-8 text-black" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-red-500/90 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>
                  {video.subcategory && (
                    <div className="absolute top-2 right-2 bg-black/80 text-gold text-xs px-2 py-1 rounded">
                      {video.subcategory}
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{video.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Video className="h-4 w-4" />
                      <span>{video.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Premium CTA */}
          {!isPremium && (
            <Card className="mt-8 border-gold bg-gradient-to-br from-gold/5 to-transparent">
              <CardContent className="p-8 text-center">
                <Lock className="h-12 w-12 text-gold mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Unlock Full Video Library</h3>
                <p className="text-muted-foreground mb-6">
                  Get premium access to all {categories.find(c => c.id === "all")?.count || 0} trading education videos
                </p>
                <Link href="/#membership">
                  <Button className="bg-gold hover:bg-gold/90 text-black">
                    Upgrade to Premium
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Video Player Modal */}
      {selectedVideo && isPremium && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedVideo(null)}>
          <div className="bg-background rounded-lg max-w-6xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedVideo(null)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="aspect-video bg-black">
              {selectedVideo.vimeoEmbed && (
                <div dangerouslySetInnerHTML={{ __html: selectedVideo.vimeoEmbed }} className="w-full h-full" />
              )}
              {selectedVideo.youtubeEmbed && !selectedVideo.vimeoEmbed && (
                <div dangerouslySetInnerHTML={{ __html: selectedVideo.youtubeEmbed }} className="w-full h-full" />
              )}
            </div>
            <div className="p-6">
              <p className="text-muted-foreground">{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}