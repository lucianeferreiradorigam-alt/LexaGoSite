import { useReveal } from "@/hooks/use-reveal";
import { Rocket, Store, BookOpen, BarChart3, Compass } from "lucide-react";

const services = [
  {
    icon: Rocket,
    title: "Marketplaces e aceleração de vendas",
    text: "Gestão de operações na Amazon, Mercado Livre e TikTok Shop. Diagnóstico comercial, negociação, otimização de catálogo, campanhas, logística, publicidade e acompanhamento de resultados.",
  },
  {
    icon: Store,
    title: "Expansão comercial e mercado físico",
    text: "Desenvolvimento de canais de distribuição, negociações com livrarias e redes varejistas, gestão de consignações, ações promocionais e expansão de pontos de venda.",
  },
  {
    icon: BookOpen,
    title: "E-books e audiobooks",
    text: "Estruturação da distribuição digital, conversão de catálogos, negociação com agregadores e plataformas de conteúdo, acompanhamento de receitas e novos negócios.",
  },
  {
    icon: BarChart3,
    title: "Inteligência comercial e metadados",
    text: "Diagnóstico de catálogo, otimização de metadados, integração com provedores especializados, análise de indicadores, precificação e identificação de oportunidades.",
  },
  {
    icon: Compass,
    title: "Gestão estratégica e desenvolvimento de negócios",
    text: "Planejamento comercial, avaliação de modelos de negócio, estruturação de processos, acompanhamento de indicadores e desenvolvimento de novas oportunidades para editoras.",
  },
];

const Services = () => {
  const ref = useReveal();

  return (
    <section id="servicos" aria-label="Soluções da Lexa Go" className="py-24 md:py-32 section-padding surface-warm">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Soluções</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-16 max-w-lg">
          Nossas soluções
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, i) => (
            <div
              key={item.title}
              className={`reveal reveal-delay-${(i % 3) + 1} group p-6 rounded-2xl bg-card border border-border/60 hover:shadow-lg hover:shadow-foreground/5 transition-shadow duration-300`}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-sans font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="reveal mt-12 text-lg text-muted-foreground max-w-2xl">
          Descubra novas oportunidades para o seu catálogo.
        </p>
      </div>
    </section>
  );
};

export default Services;
