import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, Store, FileText } from "lucide-react";

// RASCUNHO: indicadores aguardando validação final antes da publicação.
// Para publicar, altere SHOW_DRAFT_NUMBERS para true após aprovação.
const SHOW_DRAFT_NUMBERS = false;

const useCountUp = (target: number, duration = 2000, startOnView = true) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView, started]);

  useEffect(() => {
    if (!started) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  return { count, ref };
};

const indicators = [
  {
    icon: TrendingUp,
    number: 55,
    prefix: "+",
    suffix: "%",
    label: "Crescimento de faturamento",
    description: "Em sete meses de operação comercial acompanhada.",
  },
  {
    icon: Store,
    number: 140,
    prefix: "+",
    suffix: "%",
    label: "Expansão da presença em lojas físicas",
    description: "Evolução de 10 para 24 lojas, condicionada à validação do total final.",
  },
  {
    icon: FileText,
    number: 500,
    prefix: "+",
    suffix: "",
    label: "Cadastros editoriais acompanhados",
    description: "Em oito meses, condicionado à confirmação do escopo de atuação da Lexa.",
  },
];

const IndicatorCard = ({
  item,
  index,
}: {
  item: (typeof indicators)[0];
  index: number;
}) => {
  const { count, ref } = useCountUp(item.number, 2000);
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${index + 1} group relative bg-card rounded-2xl p-8 border border-border/50 hover:border-accent/40 hover:shadow-lg transition-all duration-500`}
    >
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-500">
          <Icon className="w-6 h-6 text-accent" />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-4xl md:text-5xl font-serif tracking-tight text-foreground">
              {item.prefix}
              {count.toLocaleString("pt-BR")}
              {item.suffix}
            </span>
          </div>
          <p className="text-base font-medium text-foreground mb-1">{item.label}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

const Results = () => {
  const ref = useReveal();

  return (
    <section id="resultados" aria-label="Resultados da Lexa Go" className="py-24 md:py-32 section-padding bg-muted/30">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">
          Resultados
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-8 max-w-2xl">
          Experiência que se transforma em resultados
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-16">
          Unimos estratégia, execução e acompanhamento de indicadores para desenvolver operações comerciais e identificar novas oportunidades de crescimento no mercado editorial.
        </p>

        {SHOW_DRAFT_NUMBERS && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {indicators.map((item, i) => (
              <IndicatorCard key={i} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Results;
