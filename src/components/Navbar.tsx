import { Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto section-padding flex items-center justify-between h-16">
        <img src={logo} alt="Lexa Go" className="h-12 w-auto" />
        <div className="flex items-center gap-4">
          <a
            href="mailto:luciane@lexagobr.com"
            className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Contato</span>
          </a>
          <a
            href="https://wa.me/5511968526088"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-accent text-accent-foreground text-sm font-medium px-4 py-2 rounded-lg hover:bg-accent/90 active:scale-[0.97] transition-all"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Quero conversar</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
