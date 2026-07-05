import { createContext, useContext, useState, useRef, useEffect } from "react";

type AudioState = {
  isPlaying: boolean;
  currentSurah: number | null;
  currentAyah: number | null; // relative to surah
  globalAyah: number | null; // absolute 1-6236
  reciter: string;
  playbackRate: number;
  duration: number;
  currentTime: number;
  playSurah: (surahNumber: number, startAyah?: number, globalOffset?: number) => void;
  playAyah: (globalAyahNumber: number, surahNumber?: number, ayahNumber?: number) => void;
  pause: () => void;
  resume: () => void;
  nextAyah: () => void;
  prevAyah: () => void;
  setReciter: (reciter: string) => void;
  setPlaybackRate: (rate: number) => void;
  seek: (time: number) => void;
};

const defaultState: AudioState = {
  isPlaying: false,
  currentSurah: null,
  currentAyah: null,
  globalAyah: null,
  reciter: "ar.alafasy",
  playbackRate: 1,
  duration: 0,
  currentTime: 0,
  playSurah: () => {},
  playAyah: () => {},
  pause: () => {},
  resume: () => {},
  nextAyah: () => {},
  prevAyah: () => {},
  setReciter: () => {},
  setPlaybackRate: () => {},
  seek: () => {},
};

export const AudioContext = createContext<AudioState>(defaultState);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSurah, setCurrentSurah] = useState<number | null>(null);
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);
  const [globalAyah, setGlobalAyah] = useState<number | null>(null);
  const [reciter, setReciterState] = useState(() => {
    return localStorage.getItem("quran_reciter") || "ar.alafasy";
  });
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.onended = () => {
      // Auto-play next ayah
      setGlobalAyah((prev) => (prev ? prev + 1 : null));
      setCurrentAyah((prev) => (prev ? prev + 1 : null)); // simplistic, doesn't handle surah boundaries well yet without full data
    };
    audioRef.current.ontimeupdate = () => {
      setCurrentTime(audioRef.current?.currentTime || 0);
    };
    audioRef.current.ondurationchange = () => {
      setDuration(audioRef.current?.duration || 0);
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (globalAyah && audioRef.current) {
      audioRef.current.src = `https://cdn.islamic.network/quran/audio/128/${reciter}/${globalAyah}.mp3`;
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  }, [globalAyah, reciter]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  const playSurah = (surahNumber: number, startAyah: number = 1, globalOffset: number = 0) => {
    setCurrentSurah(surahNumber);
    setCurrentAyah(startAyah);
    setGlobalAyah(globalOffset + startAyah);
  };

  const playAyah = (globalNumber: number, surah?: number, ayah?: number) => {
    setGlobalAyah(globalNumber);
    if (surah) setCurrentSurah(surah);
    if (ayah) setCurrentAyah(ayah);
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const resume = () => {
    audioRef.current?.play().then(() => setIsPlaying(true)).catch(console.error);
  };

  const nextAyah = () => {
    setGlobalAyah((prev) => (prev ? prev + 1 : null));
    setCurrentAyah((prev) => (prev ? prev + 1 : null));
  };

  const prevAyah = () => {
    setGlobalAyah((prev) => (prev && prev > 1 ? prev - 1 : prev));
    setCurrentAyah((prev) => (prev && prev > 1 ? prev - 1 : prev));
  };

  const setReciter = (r: string) => {
    setReciterState(r);
    localStorage.setItem("quran_reciter", r);
  };
  const setPlaybackRate = (r: number) => setPlaybackRateState(r);
  const seek = (t: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = t;
      setCurrentTime(t);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        currentSurah,
        currentAyah,
        globalAyah,
        reciter,
        playbackRate,
        duration,
        currentTime,
        playSurah,
        playAyah,
        pause,
        resume,
        nextAyah,
        prevAyah,
        setReciter,
        setPlaybackRate,
        seek,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export const useAudio = () => useContext(AudioContext);
