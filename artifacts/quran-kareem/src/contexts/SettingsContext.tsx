import { createContext, useContext, useState } from "react";

type TranslationPrefs = {
  english: boolean;
  urdu: boolean;
  hindi: boolean;
};

type SettingsState = {
  fontSize: number;
  setFontSize: (size: number) => void;
  translations: TranslationPrefs;
  toggleTranslation: (lang: keyof TranslationPrefs) => void;
};

const defaultState: SettingsState = {
  fontSize: 32,
  setFontSize: () => {},
  translations: { english: true, urdu: false, hindi: false },
  toggleTranslation: () => {},
};

export const SettingsContext = createContext<SettingsState>(defaultState);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState(() => {
    const saved = localStorage.getItem("quran_font_size");
    return saved ? parseInt(saved, 10) : 32;
  });

  const [translations, setTranslations] = useState<TranslationPrefs>(() => {
    const saved = localStorage.getItem("quran_translations");
    return saved ? JSON.parse(saved) : { english: true, urdu: false, hindi: false };
  });

  const setFontSize = (size: number) => {
    const newSize = Math.max(20, Math.min(60, size));
    setFontSizeState(newSize);
    localStorage.setItem("quran_font_size", newSize.toString());
  };

  const toggleTranslation = (lang: keyof TranslationPrefs) => {
    setTranslations((prev) => {
      const next = { ...prev, [lang]: !prev[lang] };
      localStorage.setItem("quran_translations", JSON.stringify(next));
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{ fontSize, setFontSize, translations, toggleTranslation }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
