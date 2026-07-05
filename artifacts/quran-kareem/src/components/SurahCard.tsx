import { Link } from "wouter";
import { SurahMeta } from "@/hooks/use-quran";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function SurahCard({ surah, index }: { surah: SurahMeta; index: number }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("quran_favorites") || "[]");
    setIsFav(favs.includes(surah.number));
  }, [surah.number]);

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    let favs = JSON.parse(localStorage.getItem("quran_favorites") || "[]");
    if (favs.includes(surah.number)) {
      favs = favs.filter((n: number) => n !== surah.number);
      setIsFav(false);
    } else {
      favs.push(surah.number);
      setIsFav(true);
    }
    localStorage.setItem("quran_favorites", JSON.stringify(favs));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
    >
      <Link href={`/quran/${surah.number}`}>
        <div className="group relative bg-card hover:bg-accent/30 border border-border/60 hover:border-primary/50 transition-all rounded-xl p-5 flex items-center justify-between cursor-pointer shadow-sm hover:shadow-md">
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {surah.number}
            </div>
            
            <div>
              <h3 className="font-semibold text-lg">{surah.englishName}</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{surah.englishNameTranslation}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="font-arabic text-xl text-primary">{surah.name}</div>
              <p className="text-xs text-muted-foreground">{surah.numberOfAyahs} Ayahs • {surah.revelationType}</p>
            </div>
            
            <button 
              onClick={toggleFav}
              className={`p-2 rounded-full transition-colors ${isFav ? 'text-destructive bg-destructive/10' : 'text-muted-foreground hover:bg-muted'}`}
            >
              <Heart className={`h-5 w-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
