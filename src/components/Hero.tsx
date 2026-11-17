import { Phone } from "lucide-react";
import heroImg from "@/assets/hero-books.jpg";
import { useReveal } from "@/hooks/use-reveal";

const Hero = () => {
  const ref = useReveal();

  return (
    <section aria-label="Apresentação Lexa Go" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Livros e tecnologia digital representando o mercado editorial"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
      </div>

      <div className="relative max-w-7xl mx-auto section-padding py-24 md:py-32">
        <div ref={ref} className="reveal max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6">
            Seu catálogo tem potencial. Nós transformamos esse potencial em vendas.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
            A Lexa Go conecta experiência no mercado editorial, inteligência comercial e gestão de canais para ampliar a presença, a competitividade e os resultados de editoras no ambiente físico e digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/5511968526088"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-medium px-8 py-4 rounded-xl text-base hover:bg-accent/90 active:scale-[0.97] transition-all shadow-lg shadow-accent/20"
            >
              <Phone className="w-5 h-5" />
              Vamos conversar sobre sua editora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
