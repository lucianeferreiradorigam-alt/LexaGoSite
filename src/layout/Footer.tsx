import { Link } from "react-router-dom";
import logo from "@/assets/logo-header.png";
import { CONTACT } from "@/lib/site";
import { SERVICES, SERVICE_ORDER } from "@/content/services";
import { EmailLink, WhatsAppLink } from "./ContactLinks";

const Footer = () => (
  <footer className="border-t border-border bg-warm">
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr]">
      <div>
        <img src={logo} alt="LEXA Go" width={84} height={48} className="h-10 w-auto" loading="lazy" />
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Desenvolvimento editorial e estratégia comercial para livros. Atendemos editoras, autores e empresas em
          todo o Brasil.
        </p>
        <div className="mt-5 space-y-2 text-sm">
          <WhatsAppLink label={`WhatsApp ${CONTACT.whatsappDisplay}`} />
          {CONTACT.partners.map((p) => (
            <p key={p.email}>
              <span className="block font-semibold text-foreground">{p.name}</span>
              <EmailLink email={p.email} />
            </p>
          ))}
        </div>
      </div>

      <nav aria-label="Serviços">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">Serviços</p>
        <ul className="space-y-2 text-sm">
          {SERVICE_ORDER.map((k) => (
            <li key={k}>
              <Link to={SERVICES[k].path} className="text-muted-foreground hover:text-accent">
                {SERVICES[k].shortName}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/servicos" className="text-muted-foreground hover:text-accent">
              Todos os serviços
            </Link>
          </li>
        </ul>
      </nav>

      <nav aria-label="Institucional">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">LEXA Go</p>
        <ul className="space-y-2 text-sm">
          <li><Link to="/sobre" className="text-muted-foreground hover:text-accent">Sobre</Link></li>
          <li><Link to="/conteudos" className="text-muted-foreground hover:text-accent">Conteúdos</Link></li>
          <li><Link to="/contato" className="text-muted-foreground hover:text-accent">Contato</Link></li>
          <li><Link to="/privacidade" className="text-muted-foreground hover:text-accent">Política de privacidade</Link></li>
        </ul>
      </nav>
    </div>
    <div className="border-t border-border/70">
      <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} LEXA Go. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
