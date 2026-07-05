import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export function About() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <BookOpen className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">About Quran Kareem</h1>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg dark:prose-invert prose-p:leading-relaxed mx-auto"
        >
          <p>
            <strong>Quran Kareem</strong> is a premium, beautifully crafted web application designed to be your daily companion for reading and listening to the Holy Quran. 
          </p>
          <p>
            Our mission is to provide a deeply personal, spiritually warm, and serene digital environment for Muslims worldwide. We believe that interacting with the Quran online should feel as sacred and refined as holding a physical, leather-bound Mushaf in a softly lit room.
          </p>
          
          <h3 className="font-serif text-2xl text-primary mt-10">Features</h3>
          <ul>
            <li><strong>Elegant Reading Experience:</strong> Beautiful Uthmani Arabic typography with adjustable sizes.</li>
            <li><strong>Multiple Translations:</strong> Seamlessly toggle between English (Asad), Urdu (Jalandhry), and Hindi translations.</li>
            <li><strong>Immersive Audio:</strong> Listen to world-renowned reciters with a continuous global audio player.</li>
            <li><strong>Bookmarks & Favorites:</strong> Save your progress and favorite verses locally on your device.</li>
            <li><strong>Fast & Responsive:</strong> Built with modern web technologies to be lightning fast on any device.</li>
          </ul>

          <h3 className="font-serif text-2xl text-primary mt-10">Data Source</h3>
          <p>
            All Quranic text, translations, and audio are graciously provided by the free and open-source API from <strong><a href="https://alquran.cloud/" target="_blank" rel="noreferrer" className="text-primary hover:underline">alquran.cloud</a></strong>. 
          </p>
          
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mt-12 text-center">
            <div className="font-arabic text-3xl text-primary mb-4" dir="rtl">
              إِنَّ هَٰذَا ٱلْقُرْءَانَ يَهْدِى لِلَّتِى هِىَ أَقْوَمُ
            </div>
            <p className="font-serif text-lg italic text-muted-foreground">
              "Indeed, this Quran guides to that which is most suitable..."
            </p>
            <p className="text-sm text-muted-foreground mt-2">— Surah Al-Isra [17:9]</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
