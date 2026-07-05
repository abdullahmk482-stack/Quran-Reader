import { motion } from "framer-motion";
import { Link } from "wouter";

export function DailyVerse() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-8">Verse of the Day</h2>
          
          <div className="bg-card border border-border shadow-sm rounded-2xl p-8 md:p-12">
            <div className="font-arabic text-3xl md:text-4xl leading-loose mb-6 text-right" dir="rtl">
              ٱلَّذِينَ ءَامَنُوا۟ وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ ٱللَّهِ ۗ أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 font-serif">
              "Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured."
            </p>
            
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
              <span className="text-sm font-medium text-muted-foreground">Ar-Ra'd 13:28</span>
              <Link href="/quran/13">
                <span className="text-primary font-medium hover:underline cursor-pointer">Read Surah</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
