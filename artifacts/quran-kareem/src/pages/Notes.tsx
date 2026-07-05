import { useNotes } from "@/contexts/NotesContext";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function Notes() {
  const { allNotes, updateNote, deleteNote } = useNotes();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditContent(text);
  };

  const saveEdit = () => {
    if (editingId) {
      updateNote(editingId, editContent);
      setEditingId(null);
    }
  };

  // Group notes by surah
  const groupedNotes = allNotes.reduce((acc, note) => {
    if (!acc[note.surahNumber]) acc[note.surahNumber] = [];
    acc[note.surahNumber].push(note);
    return acc;
  }, {} as Record<number, typeof allNotes>);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 min-h-screen max-w-4xl">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold mb-2">My Notes</h1>
          <p className="text-muted-foreground">Personal reflections and study notes.</p>
        </div>
        <BookOpen className="w-10 h-10 text-primary/20" />
      </div>

      {allNotes.length === 0 ? (
        <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed">
          <Pencil className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h2 className="text-xl font-medium mb-2">No notes yet</h2>
          <p className="text-muted-foreground">Read the Quran and add notes to ayahs to see them here.</p>
          <Link href="/quran">
            <Button className="mt-6">Start Reading</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedNotes).map(([surahNum, notes]) => (
            <div key={surahNum} className="space-y-4">
              <div className="flex items-center gap-3 border-b pb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {surahNum}
                </div>
                <h2 className="font-serif text-2xl font-bold">{notes[0].surahName}</h2>
              </div>
              
              <div className="grid gap-4">
                {notes.map((note) => (
                  <motion.div
                    key={note.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border rounded-xl p-5 shadow-sm group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-muted px-2 py-1 rounded text-xs font-medium text-muted-foreground">
                        Ayah {note.ayahNumber}
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => handleEdit(note.id, note.note)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteNote(note.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="font-arabic text-xl text-primary text-right mb-4" dir="rtl">
                      {note.arabicText}
                    </div>
                    
                    <p className="text-foreground whitespace-pre-wrap">{note.note}</p>
                    
                    <div className="mt-4 pt-4 border-t flex justify-between items-center text-xs text-muted-foreground">
                      <span>{new Date(note.timestamp).toLocaleDateString()}</span>
                      <Link href={`/quran/${note.surahNumber}#ayah-${note.ayahNumber}`}>
                        <span className="flex items-center gap-1 text-primary hover:underline cursor-pointer font-medium">
                          Read in context <ArrowRight className="w-3 h-3" />
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!editingId} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
          </DialogHeader>
          <Textarea 
            value={editContent} 
            onChange={(e) => setEditContent(e.target.value)} 
            className="min-h-[150px]"
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
            <Button onClick={saveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}