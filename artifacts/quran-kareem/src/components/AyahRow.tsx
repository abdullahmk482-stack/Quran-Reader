import { Ayah } from "@/hooks/use-quran";
import { useSettings } from "@/contexts/SettingsContext";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { useAudio } from "@/contexts/AudioContext";
import { useNotes } from "@/contexts/NotesContext";
import { Copy, Share2, Bookmark as BookmarkIcon, Play, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface AyahRowProps {
  surahNumber: number;
  surahName: string;
  arabic: Ayah;
  english?: Ayah;
  urdu?: Ayah;
  hindi?: Ayah;
  transliteration?: Ayah;
}

export function AyahRow({ surahNumber, surahName, arabic, english, urdu, hindi, transliteration }: AyahRowProps) {
  const { fontSize, translations, showTransliteration } = useSettings();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const { getNoteForAyah, addNote, updateNote } = useNotes();
  const { playAyah, globalAyah, isPlaying } = useAudio();
  const { toast } = useToast();

  const id = `${surahNumber}:${arabic.numberInSurah}`;
  const bookmarked = isBookmarked(id);
  const isCurrentlyPlaying = globalAyah === arabic.number && isPlaying;
  
  const existingNote = getNoteForAyah(id);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState(existingNote?.note || "");

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
    playAyah(arabic.number, surahNumber, arabic.numberInSurah);
  };

  const handleSaveNote = () => {
    if (noteText.trim() === "") return;
    if (existingNote) {
      updateNote(id, noteText);
    } else {
      addNote({
        id,
        surahNumber,
        ayahNumber: arabic.numberInSurah,
        note: noteText,
        surahName,
        arabicText: arabic.text,
      });
    }
    setIsNoteOpen(false);
    toast({ description: "Note saved." });
  };

  return (
    <div id={`ayah-${arabic.numberInSurah}`} className={`py-8 border-b border-border/50 transition-colors ${isCurrentlyPlaying ? 'bg-primary/5' : ''}`}>
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

        {/* Translations & Transliteration */}
        <div className="space-y-4 max-w-4xl text-left">
          {showTransliteration && transliteration && (
            <div className="text-lg text-primary/80 font-sans italic leading-relaxed bg-primary/5 p-4 rounded-lg">
              {transliteration.text}
            </div>
          )}
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

        {/* Note Editor inline */}
        {isNoteOpen && (
          <div className="mt-4 p-4 border rounded-xl bg-card shadow-sm max-w-4xl">
            <Textarea 
              placeholder="Write your reflection here..." 
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="mb-3 min-h-[100px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsNoteOpen(false)}>Cancel</Button>
              <Button size="sm" onClick={handleSaveNote}>Save Note</Button>
            </div>
          </div>
        )}

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
          <Button variant="ghost" size="sm" className={`gap-2 ${existingNote ? 'text-primary' : ''}`} onClick={() => setIsNoteOpen(!isNoteOpen)}>
            <Pencil className={`h-4 w-4 ${existingNote ? 'fill-primary' : ''}`} />
            <span className="hidden sm:inline">
              {existingNote ? 'Edit Note' : 'Add Note'}
            </span>
          </Button>
        </div>

      </div>
    </div>
  );
}
