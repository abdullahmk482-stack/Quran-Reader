import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { ThemeProvider } from "@/components/ThemeProvider";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { AudioProvider } from "@/contexts/AudioContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { NotesProvider } from "@/contexts/NotesContext";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AudioPlayer } from "@/components/AudioPlayer";

import { Home } from "@/pages/Home";
import { QuranList } from "@/pages/QuranList";
import { SurahReader } from "@/pages/SurahReader";
import { AudioPage } from "@/pages/AudioPage";
import { Bookmarks } from "@/pages/Bookmarks";
import { Search } from "@/pages/Search";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { JuzList } from "@/pages/JuzList";
import { JuzReader } from "@/pages/JuzReader";
import { PageReader } from "@/pages/PageReader";
import { Notes } from "@/pages/Notes";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/quran" component={QuranList} />
          <Route path="/quran/:surahNumber" component={SurahReader} />
          <Route path="/juz" component={JuzList} />
          <Route path="/juz/:number" component={JuzReader} />
          <Route path="/pages" component={PageReader} />
          <Route path="/audio" component={AudioPage} />
          <Route path="/bookmarks" component={Bookmarks} />
          <Route path="/notes" component={Notes} />
          <Route path="/search" component={Search} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <AudioPlayer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="quran_theme">
        <SettingsProvider>
          <BookmarkProvider>
            <NotesProvider>
              <AudioProvider>
                <TooltipProvider>
                  <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                    <Router />
                  </WouterRouter>
                  <Toaster />
                </TooltipProvider>
              </AudioProvider>
            </NotesProvider>
          </BookmarkProvider>
        </SettingsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
