import { DailyVerse } from "@/components/DailyVerse";
import { useSurahs, SurahMeta } from "@/hooks/use-quran";
import { SurahCard } from "@/components/SurahCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Layers, FileText, Headphones, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const POPULAR_SURAHS = [1, 36, 67, 55, 18, 56, 2, 112];

export function Home() {
  const { data: surahs, isLoading } = useSurahs();
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  // Get recently read surahs from local storage
  const recentSurahIds = JSON.parse(localStorage.getItem("quran_recent") || "[]").slice(0, 5);
  const recentSurahs = surahs ? surahs.filter((s: SurahMeta) => recentSurahIds.includes(s.number)) : [];
  const popularSurahs = surahs ? surahs.filter((s: SurahMeta) => POPULAR_SURAHS.includes(s.number)) : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative w-full bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/60" />
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zMCAwIEw2MCAzMCBMMzAgNjAgTDAgMzAgTDMwIDBaIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=')] mix-blend-overlay" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center text-primary-foreground">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-arabic text-5xl md:text-7xl mb-6 text-primary-foreground/90 drop-shadow-lg"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-bold mb-4"
          >
            Read the Holy Quran
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl text-primary-foreground/80 mb-10"
          >
            Explore, read, and listen to the Quran with beautiful typography and an elegant experience.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-2xl"
          >
            <form onSubmit={handleSearch} className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-6 w-6" />
              <Input 
                type="text" 
                placeholder="Search Surah or Ayah..." 
                className="pl-14 h-16 text-lg rounded-full border-0 bg-background/95 backdrop-blur shadow-2xl text-foreground focus-visible:ring-2 focus-visible:ring-secondary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/quran">
                <Button size="lg" variant="secondary" className="px-8 h-12 text-base font-semibold">Start Reading</Button>
              </Link>
              <Link href="/audio">
                <Button size="lg" variant="outline" className="px-8 h-12 text-base font-semibold bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">Listen Now</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Access */}
      <section className="container mx-auto px-4 py-12 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/quran">
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-1">Surahs</h3>
              <p className="text-sm text-muted-foreground mb-4">All 114 Surahs</p>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
          <Link href="/juz">
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-1">Juz</h3>
              <p className="text-sm text-muted-foreground mb-4">Read by 30 parts</p>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
          <Link href="/pages">
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-1">Pages</h3>
              <p className="text-sm text-muted-foreground mb-4">Mushaf pages 1-604</p>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
          <Link href="/audio">
            <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-1">Listen</h3>
              <p className="text-sm text-muted-foreground mb-4">Multiple reciters</p>
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Link>
        </div>
      </section>

      {/* Continue Reading */}
      {recentSurahs.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <h2 className="font-serif text-2xl font-bold mb-6 flex items-center gap-2">
            Continue Reading
          </h2>
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 gap-4 snap-x md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible md:pb-0 md:px-0 md:mx-0">
            {recentSurahs.map((surah: SurahMeta, i: number) => (
              <div key={surah.number} className="min-w-[280px] snap-center">
                <SurahCard surah={surah} index={i} />
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-8">
        <DailyVerse />
      </div>

      {/* Popular Surahs */}
      <section className="container mx-auto px-4 py-12 bg-muted/10 rounded-3xl mb-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-serif text-2xl font-bold mb-2">Popular Surahs</h2>
            <p className="text-muted-foreground">Frequently read chapters</p>
          </div>
          <Link href="/quran">
            <Button variant="ghost" className="text-primary hidden sm:flex">View all</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))
          ) : (
            popularSurahs.map((surah: SurahMeta, i: number) => (
              <Link href={`/quran/${surah.number}`} key={surah.number}>
                <div className="bg-card border hover:border-primary/50 rounded-xl p-4 flex items-center gap-4 transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {surah.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{surah.englishName}</h3>
                    <p className="text-xs text-muted-foreground">{surah.englishNameTranslation}</p>
                  </div>
                  <div className="font-arabic text-xl text-primary/80">
                    {surah.name}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </div>
  );
}