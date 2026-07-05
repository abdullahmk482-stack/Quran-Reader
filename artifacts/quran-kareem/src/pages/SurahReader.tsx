import { useParams, Link } from "wouter";
import { useSurahDetail, Ayah } from "@/hooks/use-quran";
import { AyahRow } from "@/components/AyahRow";
import { Skeleton } from "@/components/ui/skeleton";
import { useSettings } from "@/contexts/SettingsContext";
import { useTheme } from "@/components/ThemeProvider";
import { Settings2, ArrowLeft, ArrowRight, Type, BookOpen, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect } from "react";
import { useAudio } from "@/contexts/AudioContext";
import { motion } from "framer-motion";

export function SurahReader() {
  const { surahNumber } = useParams<{ surahNumber: string }>();
  const num = parseInt(surahNumber || "1", 10);
  
  const { data, isLoading } = useSurahDetail(num);
  const { fontSize, setFontSize, translations, toggleTranslation } = useSettings();
  const { theme, setTheme } = useTheme();
  const { playSurah, pause, isPlaying, currentSurah } = useAudio();

  // Save to recently read
  useEffect(() => {
    if (data?.meta) {
      const recent = JSON.parse(localStorage.getItem("quran_recent") || "[]");
      const newRecent = [num, ...recent.filter((id: number) => id !== num)].slice(0, 5);
      localStorage.setItem("quran_recent", JSON.stringify(newRecent));
    }
  }, [data, num]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") return;
      
      if (e.code === "Space") {
        e.preventDefault();
        if (isPlaying && currentSurah === num) pause();
        else playSurah(num);
      } else if (e.key === "f") {
        setFontSize(fontSize >= 48 ? 20 : fontSize + 4);
      } else if (e.key === "t") {
        toggleTranslation("english");
      } else if (e.key === "d") {
        setTheme(theme === "dark" ? "light" : "dark");
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, currentSurah, num, playSurah, pause, fontSize, setFontSize, toggleTranslation, theme, setTheme]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-20 w-3/4 max-w-md mx-auto mb-12 rounded-lg" />
        <div className="space-y-8 max-w-4xl mx-auto">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="h-16 w-full ml-auto" />
              <Skeleton className="h-8 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) return <div className="p-8 text-center text-destructive">Failed to load surah.</div>;

  const handlePlaySurah = () => {
    if (isPlaying && currentSurah === num) {
      pause();
    } else {
      playSurah(num, 1, data.arabic[0].number - 1);
    }
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Sticky Top Control Bar */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            <Link href={`/quran/${num > 1 ? num - 1 : 1}`}>
              <Button variant="ghost" size="icon" disabled={num <= 1} title="Previous Surah">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            
            <div className="text-sm md:text-base font-semibold truncate hidden sm:block">
              {data.meta.englishName}
            </div>

            <Link href={`/quran/${num < 114 ? num + 1 : 114}`}>
              <Button variant="ghost" size="icon" disabled={num >= 114} title="Next Surah">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button 
              variant="default" 
              size="sm" 
              className="gap-2 hidden sm:flex"
              onClick={handlePlaySurah}
            >
              {isPlaying && currentSurah === num ? (
                <>Pause Audio</>
              ) : (
                <><Volume2 className="h-4 w-4" /> Play Audio</>
              )}
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Settings2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Settings</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Type className="h-4 w-4 text-primary" /> Arabic Font Size
                    </h4>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">A</span>
                      <Slider
                        value={[fontSize]}
                        min={20}
                        max={60}
                        step={2}
                        onValueChange={([val]) => setFontSize(val)}
                        className="flex-1"
                      />
                      <span className="text-lg">A</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" /> Translations
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="trans-en" className="cursor-pointer">English (Asad)</Label>
                        <Switch id="trans-en" checked={translations.english} onCheckedChange={() => toggleTranslation('english')} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="trans-ur" className="cursor-pointer">Urdu (Jalandhry)</Label>
                        <Switch id="trans-ur" checked={translations.urdu} onCheckedChange={() => toggleTranslation('urdu')} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="trans-hi" className="cursor-pointer">Hindi (Suhel Farooq)</Label>
                        <Switch id="trans-hi" checked={translations.hindi} onCheckedChange={() => toggleTranslation('hindi')} />
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="font-arabic text-5xl md:text-7xl text-primary mb-6">{data.meta.name}</div>
          <h1 className="font-serif text-3xl font-bold mb-2">{data.meta.englishName}</h1>
          <p className="text-muted-foreground">{data.meta.englishNameTranslation} • {data.meta.revelationType} • {data.meta.numberOfAyahs} Ayahs</p>
        </motion.div>

        {/* Bismillah for all surahs except Surah At-Tawbah (9) */}
        {num !== 9 && num !== 1 && (
          <div className="text-center font-arabic text-4xl py-10 mb-8 border-b border-border/40 text-foreground/80 leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        )}

        <div className="space-y-2">
          {data.arabic.map((ayah: Ayah, index: number) => {
            // Fix Bismillah included in first verse of some surahs
            let arabicText = ayah.text;
            if (num !== 1 && index === 0 && arabicText.startsWith("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ")) {
              arabicText = arabicText.replace("بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ", "");
            }

            return (
              <AyahRow
                key={ayah.numberInSurah}
                surahNumber={num}
                surahName={data.meta.englishName}
                arabic={{ ...ayah, text: arabicText }}
                english={data.translations.english?.[index]}
                urdu={data.translations.urdu?.[index]}
                hindi={data.translations.hindi?.[index]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
