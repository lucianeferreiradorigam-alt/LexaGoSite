import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="py-12 section-padding border-t border-border/60">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <img src={logo} alt="Lexa Go" className="h-10 w-auto" />
          <p className="text-sm text-muted-foreground mt-2">
            <a href="https://www.lexagobr.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              www.lexagobr.com
            </a>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 text-sm text-muted-foreground">
          <div>
            <p className="font-sans font-semibold text-foreground mb-1">Joyce Fabris</p>
            <p>joyce@lexagobr.com</p>
          </div>
          <div>
            <p className="font-sans font-semibold text-foreground mb-1">Luciane Dorigam</p>
            <p>luciane@lexagobr.com</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-border/40">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Lexa Go. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
