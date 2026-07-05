import { useSurahs, SurahMeta } from "@/hooks/use-quran";
import { SurahCard } from "@/components/SurahCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function QuranList() {
  const { data: surahs, isLoading } = useSurahs();
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const filteredSurahs = useMemo(() => {
    if (!surahs) return [];
    return surahs.filter((s: SurahMeta) => {
      const matchesSearch = s.englishName.toLowerCase().includes(search.toLowerCase()) ||
                            s.englishNameTranslation.toLowerCase().includes(search.toLowerCase()) ||
                            s.number.toString() === search;
      
      if (!matchesSearch) return false;
      
      if (tab === "meccan") return s.revelationType === "Meccan";
      if (tab === "medinan") return s.revelationType === "Medinan";
      
      return true;
    });
  }, [surahs, search, tab]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">Surahs</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Read and explore all 114 surahs of the Holy Quran.
        </p>
      </motion.div>

      <div className="max-w-xl mx-auto mb-10 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input 
          type="text" 
          placeholder="Search surah name or number..." 
          className="pl-10 h-12 text-lg rounded-full bg-card"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mb-8 flex justify-center">
        <Tabs defaultValue="all" value={tab} onValueChange={setTab} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="meccan">Meccan</TabsTrigger>
            <TabsTrigger value="medinan">Medinan</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))
        ) : (
          filteredSurahs.map((surah: SurahMeta, i: number) => (
            <SurahCard key={surah.number} surah={surah} index={i} />
          ))
        )}
      </div>
      
      {!isLoading && filteredSurahs.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          No surahs found matching your search.
        </div>
      )}
    </div>
  );
}
