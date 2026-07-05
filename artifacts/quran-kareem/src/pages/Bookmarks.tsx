import { useBookmarks } from "@/contexts/BookmarkContext";
import { Link } from "wouter";
import { Bookmark, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Bookmarks() {
  const { bookmarks, removeBookmark, clearBookmarks } = useBookmarks();

  // Group bookmarks by surah
  const grouped = bookmarks.reduce((acc, curr) => {
    if (!acc[curr.surahNumber]) {
      acc[curr.surahNumber] = {
        surahName: curr.surahName,
        items: []
      };
    }
    acc[curr.surahNumber].items.push(curr);
    return acc;
  }, {} as Record<number, { surahName: string, items: typeof bookmarks }>);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Bookmark className="w-8 h-8 text-primary fill-primary/20" />
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary">My Bookmarks</h1>
        </motion.div>

        {bookmarks.length > 0 && (
          <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={clearBookmarks}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-20 bg-card rounded-2xl border border-dashed">
          <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-medium mb-2">No bookmarks yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Save your favorite verses while reading to easily find them later.
          </p>
          <Link href="/quran">
            <Button>Start Reading</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([surahNum, data]) => (
            <motion.div 
              key={surahNum}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border rounded-2xl overflow-hidden"
            >
              <div className="bg-muted/50 px-6 py-4 border-b flex justify-between items-center">
                <h2 className="font-serif text-xl font-bold">
                  Surah {data.surahName}
                </h2>
                <Link href={`/quran/${surahNum}`}>
                  <Button variant="ghost" size="sm" className="gap-1 text-primary">
                    Go to Surah <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="divide-y">
                {data.items.map((b) => (
                  <div key={b.id} className="p-6 relative group">
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => removeBookmark(b.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="pr-12">
                      <div className="text-sm font-medium text-muted-foreground mb-3">Ayah {b.ayahNumber}</div>
                      <div className="font-arabic text-2xl text-primary leading-loose text-right mb-4" dir="rtl">
                        {b.arabicText}
                      </div>
                      <div className="text-foreground/90 font-serif leading-relaxed">
                        {b.translation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
