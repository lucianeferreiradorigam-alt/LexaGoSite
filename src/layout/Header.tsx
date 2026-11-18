import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-header.png";

const NAV = [
  { to: "/servicos", label: "Serviços" },
  { to: "/projetos-editoriais", label: "Projetos editoriais" },
  { to: "/amazon-ads-para-livros", label: "Amazon Ads" },
  { to: "/conversao-de-livros-em-ebook", label: "E-books" },
  { to: "/conteudos", label: "Conteúdos" },
  { to: "/sobre", label: "Sobre" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-foreground focus:px-3 focus:py-2 focus:text-background">
        Ir para o conteúdo
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link to="/" className="shrink-0" aria-label="LEXA Go, página inicial">
          <img src={logo} alt="LEXA Go" width={84} height={48} className="h-9 w-auto" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-[15px]">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `transition-colors hover:text-accent ${isActive ? "text-accent font-semibold" : "text-foreground/80"}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contato"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 sm:inline-flex"
          >
            Conversar sobre meu projeto
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movel"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movel" aria-label="Principal" className="border-t border-border bg-background lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            {[{ to: "/", label: "Início" }, ...NAV, { to: "/contato", label: "Contato" }].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `block py-3 text-base ${isActive ? "font-semibold text-accent" : "text-foreground"}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
