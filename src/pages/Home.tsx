import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-books.webp";
import lucianeImg from "@/assets/luciane.webp";
import joyceImg from "@/assets/joyce.webp";
import { GENERAL_FAQ, SERVICES } from "@/content/services";
import { CLIENTS, SHOW_CLIENTS } from "@/content/company";
import Faq from "@/layout/Faq";
import LeadForm from "@/layout/LeadForm";
import { WhatsAppLink } from "@/layout/ContactLinks";
import { CheckList, Container, Eyebrow } from "@/layout/Section";

const PATHS = [
  { need: "Quero escrever um livro", hint: "Ou tenho um original e quero transformá-lo em livro.", to: SERVICES["projetos-editoriais"].path },
  { need: "Preciso de alguém para escrever meu livro", hint: "Ghostwriting a partir das suas ideias e materiais.", to: `${SERVICES["projetos-editoriais"].path}#ghostwriting` },
  { need: "Quero vender meu livro", hint: "Canais, metadados, preço e operação comercial.", to: SERVICES.comercializacao.path },
  { need: "Como divulgar meu livro na Amazon?", hint: "Gestão de Amazon Ads para autores e editoras.", to: SERVICES["amazon-ads"].path },
  { need: "Quero ampliar as vendas da minha editora", hint: "Consultoria e gestão comercial.", to: SERVICES["consultoria-comercial"].path },
  { need: "Procuro representação comercial para livros", hint: "Canais, compradores e negociação.", to: SERVICES["representacao-comercial"].path },
  { need: "Quero converter meu livro em e-book", hint: "Word, PDF ou InDesign para EPUB.", to: SERVICES.ebooks.path },
];

const HOW = [
  { t: "Diagnóstico", d: "Entendemos o projeto, o catálogo ou o livro, os objetivos e o momento em que você está." },
  { t: "Definição de escopo", d: "Indicamos as etapas necessárias, quem participa, prazos e investimento." },
  { t: "Execução", d: "Coordenamos e executamos o trabalho, com profissionais e parceiros quando necessário." },
  { t: "Acompanhamento", d: "Acompanhamos indicadores, apresentamos relatórios e ajustamos as ações." },
];

const OTHER = [
  { key: "consultoria-comercial" as const, text: "Diagnóstico, estratégia por título e canal, precificação, metadados e dados comerciais." },
  { key: "representacao-comercial" as const, text: "Desenvolvimento de canais, relacionamento com compradores, negociação e acompanhamento." },
  { key: "comercializacao" as const, text: "Para livros já publicados: canais, página do livro, preço e operação de vendas." },
];

const Home = () => {
  const editorial = SERVICES["projetos-editoriais"];
  const steps = editorial.sections.find((s) => s.kind === "steps");
  const ads = SERVICES["amazon-ads"];
  const ebooks = SERVICES.ebooks;

  return (
    <>
      {/* 1. Abertura */}
      <section className="relative overflow-hidden border-b border-border bg-warm">
        <img
          src={heroImg}
          alt=""
          aria-hidden
          width={1600}
          height={900}
          {...{ fetchpriority: "high" }}
          className="absolute inset-y-0 right-0 hidden h-full w-[45%] object-cover opacity-90 lg:block"
        />
        <div className="absolute inset-y-0 right-0 hidden w-[45%] bg-gradient-to-r from-warm to-transparent lg:block" aria-hidden />
        <Container className="relative py-16 md:py-24 lg:py-28">
          <div className="max-w-2xl">
            <Eyebrow>Consultoria editorial e comercial</Eyebrow>
            <h1 className="text-[2.15rem] leading-[1.06] sm:text-5xl md:text-6xl">
              Da ideia ao mercado: desenvolvimento editorial e estratégia comercial para livros
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/80 md:text-xl">
              A LEXA Go conecta produção editorial, canais de venda e gestão comercial para apoiar editoras, autores e
              empresas em cada etapa do livro.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#contato" className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3.5 font-semibold text-accent-foreground hover:bg-accent/90">
                Conversar sobre meu projeto
              </a>
              <WhatsAppLink variant="button" message="Olá! Quero conversar sobre meu projeto." />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Escolha do caminho */}
      <section aria-labelledby="caminhos" className="py-16 md:py-24">
        <Container>
          <Eyebrow>Por onde começar</Eyebrow>
          <h2 id="caminhos" className="max-w-2xl text-3xl md:text-4xl">Qual destas frases parece com a sua?</h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            Escolha a sua situação e veja como podemos ajudar. Atendemos o projeto completo ou apenas a etapa de que você
            precisa.
          </p>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {PATHS.map((p) => (
              <li key={p.need} className="bg-background">
                <Link to={p.to} className="group flex h-full flex-col justify-between gap-3 p-6 transition-colors hover:bg-warm">
                  <span className="font-serif text-xl leading-snug group-hover:text-accent">“{p.need}”</span>
                  <span className="flex items-end justify-between gap-3 text-sm text-muted-foreground">
                    {p.hint}
                    <ArrowRight className="h-5 w-5 shrink-0 text-accent transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
            <li className="bg-background">
              <Link to="/servicos" className="group flex h-full flex-col justify-between gap-3 p-6 hover:bg-warm">
                <span className="font-serif text-xl leading-snug group-hover:text-accent">Ver todos os serviços</span>
                <ArrowRight className="h-5 w-5 text-accent" aria-hidden />
              </Link>
            </li>
          </ul>
        </Container>
      </section>

      {/* 3. Projetos editoriais */}
      <section aria-labelledby="projetos" className="border-y border-border bg-warm py-16 md:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <Eyebrow>Projetos editoriais</Eyebrow>
              <h2 id="projetos" className="text-3xl md:text-5xl">Seu livro, da ideia ao mercado</h2>
            </div>
            <p className="text-lg leading-relaxed text-foreground/80">{editorial.lead}</p>
          </div>
          {steps?.kind === "steps" && (
            <ol className="mt-12 grid gap-4 md:grid-cols-5">
              {steps.steps.map((s, i) => (
                <li key={s.title} className={`rounded-lg border p-5 ${i === 4 ? "border-accent bg-background" : "border-border bg-background/70"}`}>
                  <span className="font-serif text-3xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-lg font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.items.slice(0, 3).join(" ")}</p>
                </li>
              ))}
            </ol>
          )}
          <p className="mt-8 max-w-3xl text-lg font-medium">
            Além de ajudar a produzir seu livro, podemos cuidar da estratégia e da operação para levá-lo ao mercado.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to={editorial.path} className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3.5 font-semibold text-background hover:bg-foreground/90">
              Conhecer as cinco etapas <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link to="/contato?assunto=projetos-editoriais" className="inline-flex items-center justify-center rounded-md border border-foreground/25 px-6 py-3.5 font-semibold hover:border-accent hover:text-accent">
              Quero desenvolver meu livro
            </Link>
          </div>
        </Container>
      </section>

      {/* 4. Amazon Ads */}
      <section aria-labelledby="amazon-ads" className="bg-dark py-16 text-[hsl(var(--text-on-dark))] md:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow className="!text-[hsl(var(--accent-light))]">Amazon Ads</Eyebrow>
            <h2 id="amazon-ads" className="text-3xl text-white md:text-5xl">Coloque seus livros diante de leitores que estão buscando o que ler</h2>
            <p className="mt-5 text-lg leading-relaxed opacity-85">
              Amazon Ads: publicidade para livros na Amazon. Planejamos, gerenciamos e acompanhamos campanhas para editoras
              e autores que querem divulgar seus livros, ampliar a visibilidade e trabalhar as vendas dentro da plataforma.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={ads.path} className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 font-semibold text-accent-foreground hover:bg-accent/90">
                Quero anunciar meus livros <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider opacity-70">Na gestão de Amazon Ads</p>
            <div className="mt-4 [&_svg]:text-[hsl(var(--accent-light))]">
              <CheckList
                items={[
                  "Diagnóstico dos títulos e da conta.",
                  "Seleção de livros e pesquisa de palavras-chave.",
                  "Campanhas, lances e otimização contínua.",
                  "Relatórios com interpretação e próximos passos.",
                ]}
              />
            </div>
            <p className="mt-6 text-sm opacity-70">A verba de mídia é separada da remuneração pela gestão. Resultados variam conforme demanda, preço, página do produto, concorrência e disponibilidade.</p>
          </div>
        </Container>
      </section>

      {/* E-books */}
      <section aria-labelledby="ebooks" className="py-16 md:py-20">
        <Container className="grid gap-8 rounded-lg border border-border p-6 md:grid-cols-[1.2fr_1fr] md:p-10">
          <div>
            <Eyebrow>Novo serviço</Eyebrow>
            <h2 id="ebooks" className="text-3xl md:text-4xl">{ebooks.h1}</h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">{ebooks.lead}</p>
            <Link to={ebooks.path} className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 font-semibold text-accent-foreground hover:bg-accent/90">
              Quero converter meu livro em e-book <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <CheckList
            className="self-center"
            items={[
              "Word, PDF ou arquivos de diagramação para EPUB.",
              "Layout fluido ou fixo, conforme o conteúdo.",
              "Sumário navegável, imagens, tabelas e notas adaptadas.",
              "Capa, metadados e testes de leitura.",
            ]}
          />
        </Container>
      </section>

      {/* 5. Demais soluções */}
      <section aria-labelledby="solucoes" className="bg-warm py-16 md:py-24">
        <Container>
          <Eyebrow>Para editoras</Eyebrow>
          <h2 id="solucoes" className="max-w-3xl text-3xl md:text-4xl">Consultoria comercial, representação e operação de canais</h2>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
            A força da LEXA Go está na conexão entre catálogo, canais de venda e execução comercial.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {OTHER.map((o) => {
              const s = SERVICES[o.key];
              return (
                <Link key={o.key} to={s.path} className="group rounded-lg border border-border bg-background p-6 transition-colors hover:border-accent">
                  <h3 className="text-xl font-semibold group-hover:text-accent">{s.name}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{o.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Saiba mais <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="mt-8 text-muted-foreground">
            Também atuamos com Amazon e marketplaces, metadados, e-books e audiobooks, distribuição e livrarias e dados
            comerciais. <Link to="/servicos" className="font-semibold text-accent hover:underline">Ver todos os serviços</Link>.
          </p>
        </Container>
      </section>

      {/* 6. Como trabalhamos */}
      <section aria-labelledby="como" className="py-16 md:py-24">
        <Container>
          <Eyebrow>Como trabalhamos</Eyebrow>
          <h2 id="como" className="text-3xl md:text-4xl">Do diagnóstico ao acompanhamento</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {HOW.map((h, i) => (
              <li key={h.t} className="border-t-2 border-foreground pt-4">
                <span className="text-sm font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-xl font-semibold">{h.t}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{h.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 7. Sobre */}
      <section aria-labelledby="sobre" className="border-y border-border bg-warm py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <Eyebrow>Sobre a LEXA Go</Eyebrow>
            <h2 id="sobre" className="text-3xl md:text-4xl">Experiência editorial e comercial no mesmo time</h2>
            <p className="mt-5 text-lg leading-relaxed text-foreground/85">
              A LEXA Go é liderada por Luciane Dorigam e Joyce Fabris, sócias com ampla vivência no setor e mais de 20 anos
              de experiência no mercado editorial e livreiro. Essa experiência conecta desenvolvimento de livros, estratégia
              comercial, canais de venda e execução.
            </p>
            <Link to="/sobre" className="mt-6 inline-flex items-center gap-2 font-semibold text-accent hover:underline">
              Conheça a LEXA Go <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="flex gap-4">
            {[{ img: lucianeImg, n: "Luciane Dorigam" }, { img: joyceImg, n: "Joyce Fabris" }].map((p) => (
              <figure key={p.n} className="flex-1">
                <img src={p.img} alt={`Foto de ${p.n}`} width={480} height={600} loading="lazy" className="aspect-[4/5] w-full rounded-lg object-cover" />
                <figcaption className="mt-2 text-sm font-semibold">{p.n}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Clientes */}
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

      {/* 9. FAQ */}
      <section className="bg-warm py-16 md:py-24">
        <Container>
          <Faq items={GENERAL_FAQ} />
        </Container>
      </section>

      {/* 10. Contato */}
      <section id="contato" aria-labelledby="contato-t" className="scroll-mt-20 py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <Eyebrow>Contato</Eyebrow>
            <h2 id="contato-t" className="text-3xl md:text-4xl">Conversar sobre meu projeto</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Conte o que você precisa. Respondemos com os próximos passos e, se fizer sentido, marcamos uma conversa.
            </p>
            <WhatsAppLink className="mt-6" message="Olá! Quero conversar sobre meu projeto." />
          </div>
          <LeadForm submitLabel="Conversar sobre meu projeto" />
        </Container>
      </section>
    </>
  );
};

export default Home;
