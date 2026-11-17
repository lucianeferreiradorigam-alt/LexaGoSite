import { useReveal } from "@/hooks/use-reveal";

const steps = [
  {
    title: "Diagnóstico",
    text: "Avaliamos o catálogo, os canais de venda, a operação e os indicadores comerciais.",
  },
  {
    title: "Planejamento",
    text: "Construímos um plano de trabalho alinhado às prioridades e aos objetivos de cada editora.",
  },
  {
    title: "Execução",
    text: "Atuamos na implementação das estratégias, nas negociações e no desenvolvimento dos canais.",
  },
  {
    title: "Resultados",
    text: "Acompanhamos indicadores, apresentamos relatórios e ajustamos as ações para aumentar a eficiência comercial.",
  },
];

const Process = () => {
  const ref = useReveal();

  return (
    <section id="processo" aria-label="Como a Lexa Go trabalha" className="py-24 md:py-32 section-padding surface-warm">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Metodologia</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-8 max-w-lg">
          Como trabalhamos
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-16">
          A Lexa oferece acompanhamento contínuo e atuação prática, não apenas recomendações estratégicas.
        </p>

        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <div key={step.title} className={`reveal reveal-delay-${i + 1} flex items-start gap-6 py-6 border-b border-border/60 last:border-0`}>
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-sm font-sans">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-sans font-semibold mb-1">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
