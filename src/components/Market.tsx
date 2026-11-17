import { useReveal } from "@/hooks/use-reveal";

const Market = () => {
  const ref = useReveal();

  return (
    <section id="mercado" aria-label="Mercado editorial" className="py-24 md:py-32 section-padding surface-dark">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Mercado</p>
           <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-8">
             Um mercado em plena transformação
           </h2>
           <p className="text-lg leading-relaxed opacity-80 mb-6">
             O mercado editorial brasileiro faturou mais de R$ 7 bilhões em 2024, com crescimento
             consistente nos últimos anos. O segmento digital, incluindo e-books, audiobooks e vendas em
             marketplaces, é o que mais avança, impulsionado pela expansão da Amazon, Mercado Livre
             e outras plataformas que investem cada vez mais na categoria de livros.
           </p>
           <p className="text-lg leading-relaxed opacity-80">
             Nichos como o religioso, infantojuvenil, autoajuda e didático lideram em volume e
             representam oportunidades concretas para editoras que querem ampliar sua presença digital
             com estratégia, dados e operação eficiente. A Lexa Go atua exatamente nesse espaço,
             conectando catálogos aos canais certos para gerar vendas reais.
           </p>
        </div>
      </div>
    </section>
  );
};

export default Market;
