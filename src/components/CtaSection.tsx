import { Phone } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const CtaSection = () => {
  const ref = useReveal();

  return (
    <section id="contato" aria-label="Entre em contato" className="py-24 md:py-32 section-padding surface-warm">
      <div ref={ref} className="reveal max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-6 max-w-3xl mx-auto">
          Vamos conversar sobre sua editora?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Converse com a Lexa sobre os desafios comerciais da sua editora e descubra como desenvolver novos canais de receita para seus livros.
        </p>
        <a
          href="https://wa.me/5511968526088"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-medium px-8 py-4 rounded-xl text-base hover:bg-accent/90 active:scale-[0.97] transition-all shadow-lg shadow-accent/20"
        >
          <Phone className="w-5 h-5" />
          Agendar conversa
        </a>
      </div>
    </section>
  );
};

export default CtaSection;
