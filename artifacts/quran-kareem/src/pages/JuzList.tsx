import { Link } from "wouter";
import { motion } from "framer-motion";

export const JUZ_DATA = [
  { number: 1, name: "Alif Lam Mim", start: "Al-Fatiha 1", end: "Al-Baqarah 141", pages: "1–21" },
  { number: 2, name: "Sayaqulu", start: "Al-Baqarah 142", end: "Al-Baqarah 252", pages: "22–41" },
  { number: 3, name: "Tilkal Rusull", start: "Al-Baqarah 253", end: "Al-'Imran 92", pages: "42–61" },
  { number: 4, name: "Lan Tana Loo", start: "Al-'Imran 93", end: "An-Nisa 23", pages: "62–81" },
  { number: 5, name: "Wal Mohsanat", start: "An-Nisa 24", end: "An-Nisa 147", pages: "82–101" },
  { number: 6, name: "La Yuhibbullah", start: "An-Nisa 148", end: "Al-Ma'idah 81", pages: "102–121" },
  { number: 7, name: "Wa Iza Samiu", start: "Al-Ma'idah 82", end: "Al-An'am 110", pages: "122–141" },
  { number: 8, name: "Wa Lau Annana", start: "Al-An'am 111", end: "Al-A'raf 87", pages: "142–161" },
  { number: 9, name: "Qalal Malao", start: "Al-A'raf 88", end: "Al-Anfal 40", pages: "162–181" },
  { number: 10, name: "Wa A'lamu", start: "Al-Anfal 41", end: "At-Tawbah 92", pages: "182–201" },
  { number: 11, name: "Yatazeroon", start: "At-Tawbah 93", end: "Hud 5", pages: "202–221" },
  { number: 12, name: "Wa Mamin Da'abat", start: "Hud 6", end: "Yusuf 52", pages: "222–241" },
  { number: 13, name: "Wa Ma Ubarri'o", start: "Yusuf 53", end: "Ibrahim 52", pages: "242–261" },
  { number: 14, name: "Rubama", start: "Al-Hijr 1", end: "An-Nahl 128", pages: "262–281" },
  { number: 15, name: "Subhanallah", start: "Al-Isra 1", end: "Al-Kahf 74", pages: "282–301" },
  { number: 16, name: "Qal Alam", start: "Al-Kahf 75", end: "Ta-Ha 135", pages: "302–321" },
  { number: 17, name: "Aqtarabo", start: "Al-Anbiya 1", end: "Al-Hajj 78", pages: "322–341" },
  { number: 18, name: "Qadd Aflaha", start: "Al-Mu'minun 1", end: "Al-Furqan 20", pages: "342–361" },
  { number: 19, name: "Wa Qalallazina", start: "Al-Furqan 21", end: "An-Naml 55", pages: "362–381" },
  { number: 20, name: "A'man Khalaqa", start: "An-Naml 56", end: "Al-Ankabut 45", pages: "382–401" },
  { number: 21, name: "Utlu Ma Oohi", start: "Al-Ankabut 46", end: "Al-Ahzab 30", pages: "402–421" },
  { number: 22, name: "Wa Manyaqnut", start: "Al-Ahzab 31", end: "Ya-Sin 27", pages: "422–441" },
  { number: 23, name: "Wa Mali", start: "Ya-Sin 28", end: "Az-Zumar 31", pages: "442–461" },
  { number: 24, name: "Faman Azlam", start: "Az-Zumar 32", end: "Fussilat 46", pages: "462–481" },
  { number: 25, name: "Ilahe Yuruddo", start: "Fussilat 47", end: "Al-Jathiyah 37", pages: "482–501" },
  { number: 26, name: "Ha'a Meem", start: "Al-Ahqaf 1", end: "Az-Zariyat 30", pages: "502–521" },
  { number: 27, name: "Qala Fama Khatbukum", start: "Az-Zariyat 31", end: "Al-Hadid 29", pages: "522–541" },
  { number: 28, name: "Qadd Sami Allah", start: "Al-Mujadilah 1", end: "At-Tahrim 12", pages: "542–561" },
  { number: 29, name: "Tabarakallazi", start: "Al-Mulk 1", end: "Al-Mursalat 50", pages: "562–581" },
  { number: 30, name: "Amma Yatasa'aloon", start: "An-Naba 1", end: "An-Nas 6", pages: "582–604" },
];

export function JuzList() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Read by Juz</h1>
          <p className="text-muted-foreground">The Quran is divided into 30 equal parts (Juz) to facilitate reading over a month.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {JUZ_DATA.map((juz, index) => (
            <motion.div
              key={juz.number}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
            >
              <Link href={`/juz/${juz.number}`}>
                <div className="group bg-card border rounded-xl p-5 hover:border-primary/50 transition-colors cursor-pointer flex flex-col h-full shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {juz.number}
                    </div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{juz.name}</h3>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mt-auto flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span>Start:</span>
                      <span className="font-medium text-foreground">{juz.start}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>End:</span>
                      <span className="font-medium text-foreground">{juz.end}</span>
                    </div>
                    <div className="flex justify-between mt-2 pt-2 border-t text-xs">
                      <span>Pages:</span>
                      <span>{juz.pages}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}