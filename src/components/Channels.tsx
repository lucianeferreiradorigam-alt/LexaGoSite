import { useReveal } from "@/hooks/use-reveal";
import { ShoppingCart, Store, Headphones, Database } from "lucide-react";

const categories = [
  {
    icon: ShoppingCart,
    title: "Marketplaces e comércio digital",
    items: ["Amazon", "Mercado Livre", "TikTok Shop"],
  },
  {
    icon: Store,
    title: "Mercado físico",
    items: ["Livrarias", "Redes varejistas", "Distribuidores", "Canais especializados"],
  },
  {
    icon: Headphones,
    title: "Distribuição digital",
    items: ["Bookwire", "Audible", "Skeelo", "Outras plataformas de e-books e audiobooks"],
  },
  {
    icon: Database,
    title: "Metadados e tecnologia editorial",
    items: ["Metabooks", "Bookinfo", "Sistemas de integração e gestão editorial"],
  },
];

const Channels = () => {
  const ref = useReveal();

  return (
    <section id="canais" aria-label="Canais de atuação da Lexa Go" className="py-24 md:py-32 section-padding">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Onde atuamos</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-16 max-w-2xl">
          Conectamos editoras aos principais canais do mercado
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`reveal reveal-delay-${(i % 2) + 1} p-6 rounded-2xl bg-card border border-border/60`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-sans font-semibold">{cat.title}</h3>
              </div>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Channels;
