import { Ayah } from "@/hooks/use-quran";
import { useSettings } from "@/contexts/SettingsContext";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { useAudio } from "@/contexts/AudioContext";
import { Copy, Share2, Bookmark as BookmarkIcon, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface AyahRowProps {
  surahNumber: number;
  surahName: string;
  arabic: Ayah;
  english?: Ayah;
  urdu?: Ayah;
  hindi?: Ayah;
}

export function AyahRow({ surahNumber, surahName, arabic, english, urdu, hindi }: AyahRowProps) {
  const { fontSize, translations } = useSettings();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const { playAyah, globalAyah, isPlaying } = useAudio();
  const { toast } = useToast();

  const id = `${surahNumber}:${arabic.numberInSurah}`;
  const bookmarked = isBookmarked(id);
  const isCurrentlyPlaying = globalAyah === arabic.number && isPlaying;

  const handleCopy = () => {
    let text = `${arabic.text}\n\n`;
    if (translations.english && english) text += `${english.text}\n`;
    text += `\n— Surah ${surahName} [${surahNumber}:${arabic.numberInSurah}]`;
    
    navigator.clipboard.writeText(text);
    toast({ description: "Ayah copied to clipboard." });
  };

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(id);
      toast({ description: "Bookmark removed." });
    } else {
      addBookmark({
        id,
        surahNumber,
        ayahNumber: arabic.numberInSurah,
        arabicText: arabic.text,
        translation: english?.text || "",
        surahName,
      });
      toast({ description: "Ayah bookmarked." });
    }
  };

  const playThisAyah = () => {
    // Note: API returns 'number' as the global ayah number
    playAyah(arabic.number, surahNumber, arabic.numberInSurah);
  };

  return (
    <div className={`py-8 border-b border-border/50 transition-colors ${isCurrentlyPlaying ? 'bg-primary/5' : ''}`}>
      <div className="flex flex-col gap-6">
        
        {/* Arabic Header Section */}
        <div className="flex justify-between items-start gap-4 flex-row-reverse">
          <div className="flex-1 text-right">
            <div 
              className="font-arabic text-primary leading-loose" 
              style={{ fontSize: `${fontSize}px` }}
              dir="rtl"
            >
              {arabic.text}
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-secondary text-secondary-foreground text-sm font-sans mx-2 align-middle">
                {arabic.numberInSurah}
              </span>
            </div>
          </div>
        </div>

        {/* Translations */}
        <div className="space-y-4 max-w-4xl text-left">
          {translations.english && english && (
            <div className="text-lg text-foreground/90 font-serif leading-relaxed">
              {english.text}
            </div>
          )}
          {translations.urdu && urdu && (
            <div className="text-lg text-foreground/90 font-arabic leading-relaxed" dir="rtl">
              {urdu.text}
            </div>
          )}
          {translations.hindi && hindi && (
            <div className="text-lg text-foreground/90 font-sans leading-relaxed">
              {hindi.text}
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-2 text-muted-foreground mt-4">
          <Button variant="ghost" size="sm" className="gap-2" onClick={playThisAyah}>
            <Play className={`h-4 w-4 ${isCurrentlyPlaying ? 'text-primary fill-primary' : ''}`} />
            <span className="hidden sm:inline">Play</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
            <span className="hidden sm:inline">Copy</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2" onClick={toggleBookmark}>
            <BookmarkIcon className={`h-4 w-4 ${bookmarked ? 'fill-primary text-primary' : ''}`} />
            <span className="hidden sm:inline">{bookmarked ? 'Saved' : 'Bookmark'}</span>
          </Button>
        </div>

      </div>
    </div>
  );
}
