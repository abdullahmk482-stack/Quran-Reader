import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { ThemeProvider } from "@/components/ThemeProvider";
import { BookmarkProvider } from "@/contexts/BookmarkContext";
import { AudioProvider } from "@/contexts/AudioContext";
import { SettingsProvider } from "@/contexts/SettingsContext";

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
          <Route path="/audio" component={AudioPage} />
          <Route path="/bookmarks" component={Bookmarks} />
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
            <AudioProvider>
              <TooltipProvider>
                <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                  <Router />
                </WouterRouter>
                <Toaster />
              </TooltipProvider>
            </AudioProvider>
          </BookmarkProvider>
        </SettingsProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
