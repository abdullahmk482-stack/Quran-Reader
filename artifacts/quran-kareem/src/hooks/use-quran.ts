import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://api.alquran.cloud/v1";

export type SurahMeta = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
};

export type Ayah = {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | object;
};

export type SurahDetail = SurahMeta & {
  ayahs: Ayah[];
};

export const useSurahs = () => {
  return useQuery({
    queryKey: ["surahs"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/surah`);
      const data = await res.json();
      return data.data as SurahMeta[];
    },
    staleTime: Infinity,
  });
};

export const useSurahDetail = (surahNumber: number) => {
  return useQuery({
    queryKey: ["surah", surahNumber, "editions"],
    queryFn: async () => {
      // Fetch arabic + english + urdu + hindi in one go
      const res = await fetch(`${BASE_URL}/surah/${surahNumber}/editions/ar.uthmani,en.asad,ur.jalandhry,hi.hindi`);
      const data = await res.json();
      
      const arabic = data.data.find((e: any) => e.edition.language === "ar");
      const english = data.data.find((e: any) => e.edition.language === "en");
      const urdu = data.data.find((e: any) => e.edition.language === "ur");
      const hindi = data.data.find((e: any) => e.edition.language === "hi");

      return {
        meta: arabic as SurahMeta,
        arabic: arabic.ayahs as Ayah[],
        translations: {
          english: english?.ayahs as Ayah[],
          urdu: urdu?.ayahs as Ayah[],
          hindi: hindi?.ayahs as Ayah[],
        }
      };
    },
    enabled: !!surahNumber,
    staleTime: Infinity,
  });
};

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      if (!query || query.length < 3) return null;
      const res = await fetch(`${BASE_URL}/search/${query}/all/en`);
      const data = await res.json();
      return data.data;
    },
    enabled: !!query && query.length >= 3,
    staleTime: 1000 * 60 * 5, // 5 mins
  });
}
