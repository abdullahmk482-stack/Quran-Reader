import { useParams, Link } from "wouter";
import { JUZ_DATA } from "./JuzList";
import { useSurahs, SurahMeta } from "@/hooks/use-quran";
import { SurahCard } from "@/components/SurahCard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

// Helper to determine which surahs are in a given Juz
const JUZ_SURAHS: Record<number, number[]> = {
  1: [1, 2], 2: [2], 3: [2, 3], 4: [3, 4], 5: [4], 6: [4, 5],
  7: [5, 6], 8: [6, 7], 9: [7, 8], 10: [8, 9], 11: [9, 10, 11],
  12: [11, 12], 13: [12, 13, 14], 14: [15, 16], 15: [17, 18],
  16: [18, 19, 20], 17: [21, 22], 18: [23, 24, 25], 19: [25, 26, 27],
  20: [27, 28, 29], 21: [29, 30, 31, 32, 33], 22: [33, 34, 35, 36],
  23: [36, 37, 38, 39], 24: [39, 40, 41], 25: [41, 42, 43, 44, 45],
  26: [46, 47, 48, 49, 50, 51], 27: [51, 52, 53, 54, 55, 56, 57],
  28: [58, 59, 60, 61, 62, 63, 64, 65, 66],
  29: [67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77],
  30: Array.from({ length: 37 }, (_, i) => i + 78), // 78 to 114
};

export function JuzReader() {
  const { number } = useParams<{ number: string }>();
  const juzNum = parseInt(number || "1", 10);
  const { data: surahs, isLoading } = useSurahs();

  const juz = JUZ_DATA.find((j) => j.number === juzNum);
  const surahIds = JUZ_SURAHS[juzNum] || [];

  const juzSurahs = surahs?.filter((s) => surahIds.includes(s.number)) || [];

  if (!juz) return <div className="p-8 text-center">Juz not found.</div>;

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary text-2xl font-bold mb-4">
          {juz.number}
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">{juz.name}</h1>
        <p className="text-muted-foreground text-lg">
          {juz.start} to {juz.end} • Pages {juz.pages}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl" />
            ))
          : juzSurahs.map((surah: SurahMeta, i: number) => (
              <SurahCard key={surah.number} surah={surah} index={i} />
            ))}
      </div>
    </div>
  );
}