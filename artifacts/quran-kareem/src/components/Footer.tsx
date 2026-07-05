import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif font-bold text-xl text-primary mb-4">Quran Kareem</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              A premium, modern Quran reading companion. Deeply personal, spiritually warm, and beautifully crafted for your daily reading.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/quran" className="hover:text-primary transition-colors">Read Quran</Link></li>
              <li><Link href="/audio" className="hover:text-primary transition-colors">Listen Audio</Link></li>
              <li><Link href="/bookmarks" className="hover:text-primary transition-colors">Bookmarks</Link></li>
              <li><Link href="/search" className="hover:text-primary transition-colors">Search</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Quran Kareem. Powered by alquran.cloud.</p>
        </div>
      </div>
    </footer>
  );
}
