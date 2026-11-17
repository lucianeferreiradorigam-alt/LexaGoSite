import { useReveal } from "@/hooks/use-reveal";

const clients = [
  "CEDET",
  "CNBB",
  "GEMA Editora",
  "Valete",
  "Intelítera",
  "Vida & Consciência",
];

const Clients = () => {
  const ref = useReveal();

  return (
    <section id="clientes" aria-label="Clientes da Lexa Go" className="py-24 md:py-32 section-padding">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Clientes</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-16 max-w-lg">
          Alguns de nossos clientes
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {clients.map((name, i) => (
            <div
              key={name}
              className={`reveal reveal-delay-${(i % 3) + 1} flex items-center justify-center h-24 rounded-2xl bg-card border border-border/60 hover:border-accent/40 hover:shadow-lg transition-all duration-300 px-4`}
            >
              <span className="font-sans font-semibold text-lg text-foreground/80 text-center leading-tight">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
