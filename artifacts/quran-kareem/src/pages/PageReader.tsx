import { useState, useEffect } from "react";
import { usePage, Ayah } from "@/hooks/use-quran";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings } from "@/contexts/SettingsContext";

export function PageReader() {
  const [pageNum, setPageNum] = useState(1);
  const { data, isLoading } = usePage(pageNum);
  const { fontSize } = useSettings();

  const handleNext = () => setPageNum((p) => Math.min(604, p + 1));
  const handlePrev = () => setPageNum((p) => Math.max(1, p - 1));

  // Determine which surahs are on this page
  const surahsOnPage = data?.ayahs
    ? Array.from(new Set(data.ayahs.map((a: any) => a.surah.englishName)))
    : [];

  return (
    <div className="min-h-screen pb-20">
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b shadow-sm py-4">
        <div className="container mx-auto px-4 max-w-3xl flex items-center justify-between gap-4">
          <Button variant="outline" size="icon" onClick={handlePrev} disabled={pageNum <= 1}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 flex flex-col items-center">
            <div className="text-sm font-medium mb-2">Page {pageNum} of 604</div>
            <Slider
              value={[pageNum]}
              min={1}
              max={604}
              step={1}
              onValueChange={([val]) => setPageNum(val)}
              className="w-full max-w-xs"
            />
          </div>

          <Button variant="outline" size="icon" onClick={handleNext} disabled={pageNum >= 604}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8 flex flex-col items-center justify-center gap-2">
          <BookOpen className="w-8 h-8 text-primary/40" />
          {surahsOnPage.length > 0 && (
            <div className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
              {surahsOnPage.join(" • ")}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 15 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        ) : (
          <div className="bg-card border rounded-2xl p-6 md:p-12 shadow-sm text-center">
            <div
              className="font-arabic text-foreground leading-[2.5] md:leading-[3]"
              style={{ fontSize: `${fontSize}px` }}
              dir="rtl"
            >
              {data?.ayahs.map((ayah: any, i: number) => {
                const isFirstAyah = ayah.numberInSurah === 1;
                const isBismillah = ayah.text.startsWith("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ");
                let text = ayah.text;
                let bismillah = null;

                if (isFirstAyah && isBismillah && ayah.surah.number !== 1 && ayah.surah.number !== 9) {
                  text = text.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ", "");
                  bismillah = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
                }

                return (
                  <span key={ayah.number}>
                    {isFirstAyah && ayah.surah.number !== 1 && (
                      <div className="w-full flex flex-col items-center my-8">
                        <div className="w-full border-t-2 border-primary/20 mb-4" />
                        <div className="text-primary font-bold text-2xl mb-4 font-sans">{ayah.surah.name}</div>
                        {bismillah && (
                          <div className="text-foreground/80 mb-6 text-3xl">{bismillah}</div>
                        )}
                      </div>
                    )}
                    {text}
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-secondary text-secondary-foreground text-sm font-sans mx-2 align-middle">
                      {ayah.numberInSurah}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}