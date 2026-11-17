import { Link } from "react-router-dom";
import lucianeImg from "@/assets/luciane.webp";
import joyceImg from "@/assets/joyce.webp";
import { CLIENTS, PARTNERS, PARTNERS_STATEMENT, SHOW_CLIENTS } from "@/content/company";
import Breadcrumbs from "@/layout/Breadcrumbs";
import { EmailLink } from "@/layout/ContactLinks";
import { CheckList, Container, Eyebrow } from "@/layout/Section";

const PHOTOS: Record<string, string> = { "Luciane Dorigam": lucianeImg, "Joyce Fabris": joyceImg };

const About = () => (
  <>
    <section className="border-b border-border bg-warm">
      <Container className="py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Sobre", path: "/sobre" }]} />
        <Eyebrow className="mt-8">Sobre a LEXA Go</Eyebrow>
        <h1 className="max-w-3xl text-4xl leading-[1.08] md:text-5xl">Uma parceira que conecta criação editorial e vendas</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/85 md:text-xl">{PARTNERS_STATEMENT}</p>
      </Container>
    </section>

    <section aria-labelledby="socias" className="py-16 md:py-20">
      <Container>
        <h2 id="socias" className="text-3xl md:text-4xl">Quem lidera a LEXA Go</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {PARTNERS.map((p) => (
            <article key={p.name} className="grid grid-cols-[120px_1fr] gap-5 sm:grid-cols-[160px_1fr]">
              <img src={PHOTOS[p.name]} alt={`Foto de ${p.name}`} width={480} height={600} loading="lazy" className="aspect-[4/5] w-full rounded-lg object-cover" />
              <div>
                <h3 className="text-2xl font-semibold">{p.name}</h3>
                <p className="text-sm font-semibold uppercase tracking-wider text-accent">{p.role}</p>
                <p className="mt-3 leading-relaxed text-foreground/85">{p.bio}</p>
                <p className="mt-3 text-sm"><EmailLink email={p.email} /></p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>

    <section aria-labelledby="atuacao" className="bg-warm py-16 md:py-20">
      <Container className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 id="atuacao" className="text-3xl md:text-4xl">Como atuamos</h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/85">
            Combinamos visão estratégica e atuação operacional. Acompanhamos o livro desde a ideia ou o recebimento do
            original até a preparação para publicação, a impressão, a entrada nos canais de venda e o acompanhamento
            comercial.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-foreground/85">
            Também atendemos quem precisa de apenas uma dessas etapas. Uma editora pode contratar somente a operação
            comercial; uma pessoa autora pode contratar o desenvolvimento do livro; um catálogo já publicado pode precisar
            de Amazon Ads ou de uma estratégia de distribuição.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Frentes de atuação</h3>
          <CheckList
            className="mt-4"
            items={[
              "Desenvolvimento e produção de livros.",
              "Planejamento e gestão comercial.",
              "Operação de canais físicos e digitais.",
              "Amazon Ads: publicidade para livros na Amazon.",
              "Conversão de arquivos em e-books e expansão de catálogos em e-books e audiobooks.",
              "Análise de dados e identificação de oportunidades.",
            ]}
          />
          <p className="mt-6 text-sm text-muted-foreground">
            A LEXA Go não é a editora responsável por todas as obras em que atua. Modelo de publicação, selo, direitos e
            responsabilidades são definidos em cada projeto.
          </p>
        </div>
      </Container>
    </section>

    {SHOW_CLIENTS && (
      <section aria-labelledby="clientes" className="py-16">
        <Container>
          <h2 id="clientes" className="text-2xl md:text-3xl">Alguns de nossos clientes</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {CLIENTS.map((c) => (
              <li key={c} className="rounded-md border border-border px-4 py-2.5 font-semibold text-foreground/80">{c}</li>
            ))}
          </ul>
        </Container>
      </section>
    )}

    <section className="border-t border-border py-16">
      <Container className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl md:text-3xl">Vamos conversar sobre o seu projeto?</h2>
        <Link to="/contato" className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3.5 font-semibold text-accent-foreground hover:bg-accent/90">
          Conversar sobre meu projeto
        </Link>
      </Container>
    </section>
  </>
);

export default About;
