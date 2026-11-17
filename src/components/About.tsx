import { useReveal } from "@/hooks/use-reveal";

const About = () => {
  const ref = useReveal();

  return (
    <section id="sobre" aria-label="Sobre a Lexa Go" className="py-24 md:py-32 section-padding">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Sobre a Lexa Go</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-8">
           Especialistas em vendas para editoras
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            A Lexa Go nasceu para apoiar editoras em um mercado cada vez mais competitivo e em transformação.
            Atuamos para posicionar catálogos nos principais canais de venda, com estratégia comercial,
            inteligência de mercado, tecnologia e execução próxima ao negócio.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
