import { useState, useEffect } from "react";
import { useSearch } from "@/hooks/use-quran";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";

export function Search() {
  const [location] = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (q) setQuery(q);
  }, [location]);

  const { data, isLoading } = useSearch(query);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <SearchIcon className="w-12 h-12 text-primary mx-auto mb-4" />
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">Search Quran</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Search the English translation (Asad) across all surahs.
        </p>
        
        <div className="max-w-2xl mx-auto relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-6 w-6" />
          <Input 
            type="text" 
            placeholder="Type a word or phrase (e.g. 'light', 'prayer')..." 
            className="pl-14 h-16 text-xl rounded-full border-2 border-primary/20 focus-visible:ring-primary shadow-sm"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              window.history.replaceState(null, '', `?q=${encodeURIComponent(e.target.value)}`);
            }}
          />
        </div>
      </motion.div>

      {query.length > 0 && query.length < 3 && (
        <div className="text-center text-muted-foreground py-10">
          Please enter at least 3 characters to search.
        </div>
      )}

      {isLoading && (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      )}

      {data && data.matches && data.matches.length > 0 && (
        <div className="space-y-6">
          <div className="text-sm text-muted-foreground font-medium mb-4">
            Found {data.count} results for "{query}"
          </div>
          
          {data.matches.map((match: any, idx: number) => {
            // Highlight search term
            const regex = new (window as any).RegExp(`(${query})`, "gi");
            const highlightedText = match.text.replace(regex, `<span class="bg-primary/20 text-primary font-bold px-1 rounded">$1</span>`);
            
            return (
              <motion.div
                key={`${match.surah.number}-${match.numberInSurah}-${idx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-card border rounded-xl p-6 hover:border-primary/50 transition-colors group relative shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {match.surah.englishName} <span className="opacity-50">•</span> {match.surah.number}:{match.numberInSurah}
                  </div>
                  
                  <Link href={`/quran/${match.surah.number}`}>
                    <span className="text-sm font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      Read <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>
                
                <p className="text-lg font-serif leading-relaxed text-foreground/90" dangerouslySetText={{__html: highlightedText}} />
              </motion.div>
            );
          })}
        </div>
      )}

      {data && data.matches && data.matches.length === 0 && query.length >= 3 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-card border rounded-2xl"
        >
          <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
          <div className="text-xl font-medium mb-2">No results found</div>
          <p className="text-muted-foreground max-w-sm mx-auto">We couldn't find any verses matching "{query}". Try searching with different keywords.</p>
        </motion.div>
      )}
    </div>
  );
}
