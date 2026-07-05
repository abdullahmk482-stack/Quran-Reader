import { createContext, useContext, useState, useEffect } from "react";

export type Note = {
  id: string; // "surahNum:ayahNum"
  surahNumber: number;
  ayahNumber: number;
  note: string;
  timestamp: number;
  surahName: string;
  arabicText: string;
};

type NotesState = {
  allNotes: Note[];
  addNote: (note: Omit<Note, "timestamp">) => void;
  updateNote: (id: string, text: string) => void;
  deleteNote: (id: string) => void;
  getNoteForAyah: (id: string) => Note | undefined;
};

export const NotesContext = createContext<NotesState>({
  allNotes: [],
  addNote: () => {},
  updateNote: () => {},
  deleteNote: () => {},
  getNoteForAyah: () => undefined,
});

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("quranNotes");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  const saveNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem("quranNotes", JSON.stringify(newNotes));
  };

  const addNote = (note: Omit<Note, "timestamp">) => {
    const existingIndex = notes.findIndex((n) => n.id === note.id);
    let updated;
    if (existingIndex >= 0) {
      updated = [...notes];
      updated[existingIndex] = { ...note, timestamp: Date.now() };
    } else {
      updated = [...notes, { ...note, timestamp: Date.now() }];
    }
    saveNotes(updated);
  };

  const updateNote = (id: string, text: string) => {
    const updated = notes.map((n) =>
      n.id === id ? { ...n, note: text, timestamp: Date.now() } : n
    );
    saveNotes(updated);
  };

  const deleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    saveNotes(updated);
  };

  const getNoteForAyah = (id: string) => {
    return notes.find((n) => n.id === id);
  };

  return (
    <NotesContext.Provider value={{ allNotes: notes, addNote, updateNote, deleteNote, getNoteForAyah }}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => useContext(NotesContext);
