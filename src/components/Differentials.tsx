import { useReveal } from "@/hooks/use-reveal";
import { Settings, BarChart3, TrendingUp, Users } from "lucide-react";

const differentials = [
  {
    icon: Settings,
    title: "Autonomia e personalização",
    text: "Cada editora define seus objetivos e limites. A estratégia é construída respeitando seu modelo de negócio.",
  },
  {
    icon: BarChart3,
    title: "Dados e tecnologia",
    text: "Usamos análise de dados, inteligência artificial e leitura de mercado para melhorar visibilidade e performance.",
  },
  {
    icon: TrendingUp,
    title: "Crescimento sustentável",
    text: "Estruturamos as vendas com eficiência operacional e visão de longo prazo, alinhados com os objetivos de nossos clientes.",
  },
  {
    icon: Users,
    title: "Execução conjunta",
    text: "Entramos lado a lado com a editora, do diagnóstico à entrega dos resultados.",
  },
];

const Differentials = () => {
  const ref = useReveal();

  return (
    <section id="diferenciais" aria-label="Diferenciais da Lexa Go" className="py-24 md:py-32 section-padding surface-warm">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Diferenciais</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-16 max-w-lg">
          Como trabalhamos
        </h2>

        <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
          {differentials.map((item, i) => (
            <div key={item.title} className={`reveal reveal-delay-${i + 1}`}>
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-sans text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
