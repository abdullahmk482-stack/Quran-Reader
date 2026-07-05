import { useSurahs, SurahMeta } from "@/hooks/use-quran";
import { useAudio } from "@/contexts/AudioContext";
import { Play, Pause, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const RECITERS = [
  { id: "ar.alafasy", name: "Mishary Rashid Alafasy" },
  { id: "ar.abdulbasitmurattal", name: "Abdul Basit (Murattal)" },
  { id: "ar.abdullahbasfar", name: "Abdullah Basfar" },
  { id: "ar.abdurrahmaansudais", name: "Abdurrahmaan As-Sudais" },
  { id: "ar.hudhaify", name: "Ali Al Huthaify" },
  { id: "ar.husary", name: "Ali Hajjaj AlSuesy" },
  { id: "ar.minshawi", name: "Husary" },
  { id: "ar.muhammadayyoub", name: "Muhammad Ayyoub" },
];

export function AudioPage() {
  const { data: surahs, isLoading } = useSurahs();
  const { 
    reciter, 
    setReciter, 
    playSurah, 
    pause, 
    isPlaying, 
    currentSurah 
  } = useAudio();

  const handlePlay = (surahNumber: number) => {
    if (isPlaying && currentSurah === surahNumber) {
      pause();
    } else {
      // Find global offset for this surah (approximate, better to fetch real offset, but alquran API doesn't provide it simply in /surah. 
      // Actually we don't know the exact globalayah from just surah list.
      // We will just play it by navigating to it or we must calculate offset.
      // For a proper app, we'd calculate global offsets beforehand, or fetch surah detail first.
      // Since alquran API uses global ayah numbers for audio, and we don't have them here, we will just use a hack or route to reader.
      // Wait, we can fetch surah detail to get the exact global ayah. But to keep it synchronous, we'll just redirect to Reader, or we can use the SurahDetail hook inside a component.
      // Let's just play it and let the player handle it, but wait, AudioContext playSurah needs globalOffset.
      // It's better to just navigate to the reading page to play, or we can calculate it since we have numberOfAyahs for each surah!
      let offset = 0;
      for (let i = 0; i < surahNumber - 1; i++) {
        offset += surahs[i].numberOfAyahs;
      }
      playSurah(surahNumber, 1, offset);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <Headphones className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">Listen to Quran</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose your favorite reciter and listen to the Holy Quran.
        </p>
      </motion.div>

      <div className="max-w-md mx-auto mb-12">
        <label className="block text-sm font-medium mb-2">Select Reciter</label>
        <Select value={reciter} onValueChange={setReciter}>
          <SelectTrigger className="w-full bg-card h-12">
            <SelectValue placeholder="Select Reciter" />
          </SelectTrigger>
          <SelectContent>
            {RECITERS.map((r) => (
              <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))
        ) : (
          surahs?.map((surah: SurahMeta, i: number) => {
            const isActive = isPlaying && currentSurah === surah.number;
            return (
              <motion.div
                key={surah.number}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.01 }}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  isActive ? "border-primary bg-primary/5 shadow-md" : "bg-card border-border/60 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {surah.number}
                  </div>
                  <div>
                    <h3 className="font-semibold">{surah.englishName}</h3>
                    <p className="text-xs text-muted-foreground font-arabic">{surah.name}</p>
                  </div>
                </div>
                
                <Button 
                  variant={isActive ? "default" : "ghost"} 
                  size="icon" 
                  className="rounded-full"
                  onClick={() => handlePlay(surah.number)}
                >
                  {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-1" />}
                </Button>
              </motion.div>
            )
          })
        )}
      </div>
    </div>
  );
}
