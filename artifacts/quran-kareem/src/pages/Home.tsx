import { HeroSection } from "@/components/HeroSection";
import { DailyVerse } from "@/components/DailyVerse";
import { useSurahs, SurahMeta } from "@/hooks/use-quran";
import { SurahCard } from "@/components/SurahCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Home() {
  const { data: surahs, isLoading } = useSurahs();

  // Get recently read surahs from local storage
  const recentSurahIds = JSON.parse(localStorage.getItem("quran_recent") || "[]").slice(0, 4);
  const recentSurahs = surahs ? surahs.filter((s: SurahMeta) => recentSurahIds.includes(s.number)) : [];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      <DailyVerse />

      {recentSurahIds.length > 0 && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold mb-6">Continue Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))
              ) : (
                recentSurahs.map((surah: SurahMeta, i: number) => (
                  <SurahCard key={surah.number} surah={surah} index={i} />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold mb-6">Explore the Quran</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Browse through all 114 surahs, search by topic, or listen to beautiful recitations from world-renowned Qaris.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/quran">
              <Button size="lg" className="px-8">Browse Surahs</Button>
            </Link>
            <Link href="/audio">
              <Button size="lg" variant="outline" className="px-8">Listen Audio</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
