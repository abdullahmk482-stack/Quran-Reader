import { createContext, useContext, useState } from "react";

export type Bookmark = {
  id: string; // surahNumber:ayahNumber
  surahNumber: number;
  ayahNumber: number;
  arabicText: string;
  translation: string;
  surahName: string;
};

type BookmarkState = {
  bookmarks: Bookmark[];
  addBookmark: (b: Bookmark) => void;
  removeBookmark: (id: string) => void;
  clearBookmarks: () => void;
  isBookmarked: (id: string) => boolean;
};

const defaultState: BookmarkState = {
  bookmarks: [],
  addBookmark: () => {},
  removeBookmark: () => {},
  clearBookmarks: () => {},
  isBookmarked: () => false,
};

export const BookmarkContext = createContext<BookmarkState>(defaultState);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem("quran_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const addBookmark = (b: Bookmark) => {
    setBookmarks((prev) => {
      if (prev.some((x) => x.id === b.id)) return prev;
      const next = [...prev, b];
      localStorage.setItem("quran_bookmarks", JSON.stringify(next));
      return next;
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => {
      const next = prev.filter((x) => x.id !== id);
      localStorage.setItem("quran_bookmarks", JSON.stringify(next));
      return next;
    });
  };

  const clearBookmarks = () => {
    setBookmarks([]);
    localStorage.removeItem("quran_bookmarks");
  };

  const isBookmarked = (id: string) => bookmarks.some((b) => b.id === id);

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, clearBookmarks, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => useContext(BookmarkContext);
