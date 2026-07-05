import { Play, Pause, SkipBack, SkipForward, FastForward, Repeat, ChevronDown } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export const RECITERS = [
  { id: 'ar.alafasy', name: 'Mishary Rashid Alafasy' },
  { id: 'ar.abdurrahmaansudais', name: 'Abdurrahmaan As-Sudais' },
  { id: 'ar.husary', name: 'Mahmoud Khalil Al-Husary' },
  { id: 'ar.minshawi', name: 'Mohammad Siddiq Al-Minshawi' },
  { id: 'ar.saoodshuraym', name: 'Saud Al-Shuraim' },
];

export function AudioPlayer() {
  const { 
    isPlaying, 
    currentSurah, 
    currentAyah, 
    currentTime, 
    duration,
    playbackRate,
    reciter,
    playSurah,
    pause,
    resume,
    nextAyah,
    prevAyah,
    setPlaybackRate,
    setReciter,
    seek
  } = useAudio();

  if (!currentSurah) return null;

  const togglePlay = () => {
    if (isPlaying) pause();
    else resume();
  };

  const cycleSpeed = () => {
    const rates = [0.5, 1, 1.25, 1.5, 2];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    setPlaybackRate(rates[nextIdx]);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t shadow-lg pb-safe">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-4">
        
        <div className="flex-1 flex flex-col w-full md:w-auto">
          <div className="text-sm font-medium mb-1 truncate text-center md:text-left flex items-center justify-center md:justify-start gap-2">
            <span>Surah {currentSurah}, Ayah {currentAyah}</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-muted-foreground gap-1">
                  {RECITERS.find(r => r.id === reciter)?.name} <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {RECITERS.map(r => (
                  <DropdownMenuItem key={r.id} onClick={() => setReciter(r.id)} className={reciter === r.id ? "bg-primary/10 text-primary font-medium" : ""}>
                    {r.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={([val]) => seek(val)}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-10">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 w-full md:w-auto">
          <Button variant="ghost" size="icon" onClick={cycleSpeed} className="text-xs font-mono w-10 h-10" title="Playback Speed">
            {playbackRate}x
          </Button>
          <Button variant="ghost" size="icon" onClick={prevAyah} title="Previous Ayah">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button variant="default" size="icon" className="h-12 w-12 rounded-full" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextAyah} title="Next Ayah">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
