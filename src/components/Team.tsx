import { useReveal } from "@/hooks/use-reveal";
import lucianeImg from "@/assets/luciane.jpg";
import joyceImg from "@/assets/joyce.jpg";

const team = [
  {
    name: "Luciane Dorigam",
    photo: lucianeImg,
    bio: "Experiência sênior em vendas, marketing e negociação no mercado editorial, com atuação em grandes players e projetos de transformação comercial.",
    email: "luciane@lexagobr.com",
  },
  {
    name: "Joyce Fabris",
    photo: joyceImg,
    bio: "Profissional com 15 anos de experiência na estratégia comercial de editoras, especializado na definição de planos sustentáveis para o crescimento do faturamento de livros físicos e digitais. Reconhecido pela capacidade de alinhar objetivos editoriais às demandas de mercado, com foco em resultados consistentes e expansão de canais de distribuição.",
    email: "joyce@lexagobr.com",
  },
];

const Team = () => {
  const ref = useReveal();

  return (
    <section id="equipe" aria-label="Equipe Lexa Go" className="py-24 md:py-32 section-padding">
      <div ref={ref} className="reveal max-w-7xl mx-auto">
        <p className="text-sm font-medium tracking-widest uppercase text-accent mb-4">Equipe</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-6 max-w-lg">
          Quem está por trás da Lexa Go
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-16">
          Experiência sênior em vendas, marketing, e-commerce, operação e negociação no mercado editorial.
        </p>

        <div className="grid sm:grid-cols-2 gap-12 max-w-3xl">
          {team.map((person, i) => (
            <div key={person.name} className={`reveal reveal-delay-${i + 1}`}>
              <img
                src={person.photo}
                alt={person.name}
                className="w-28 h-28 rounded-2xl object-cover mb-5 shadow-md"
              />
              <h3 className="font-sans text-lg font-semibold mb-1">{person.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{person.bio}</p>
              <div className="text-sm text-muted-foreground space-y-0.5">
                <p>{person.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
