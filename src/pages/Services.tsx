import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { OTHER_FRONTS, SERVICES, SERVICE_ORDER, GENERAL_FAQ } from "@/content/services";
import Breadcrumbs from "@/layout/Breadcrumbs";
import Faq from "@/layout/Faq";
import { CheckList, Container, Eyebrow } from "@/layout/Section";

const Services = () => (
  <>
    <section className="border-b border-border bg-warm">
      <Container className="py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Serviços", path: "/servicos" }]} />
        <Eyebrow className="mt-8">Serviços editoriais e comerciais</Eyebrow>
        <h1 className="max-w-3xl text-4xl leading-[1.08] md:text-5xl">Serviços para desenvolver, publicar e vender livros</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">
          Atendemos editoras, autores e empresas. Você pode contratar o projeto completo, da ideia ao mercado, ou apenas a
          etapa de que precisa.
        </p>
      </Container>
    </section>

    <section aria-label="Serviços principais" className="py-16 md:py-20">
      <Container>
        <ul className="grid gap-6 md:grid-cols-2">
          {SERVICE_ORDER.map((k) => {
            const s = SERVICES[k];
            return (
              <li key={k}>
                <Link to={s.path} className="group flex h-full flex-col rounded-lg border border-border p-6 transition-colors hover:border-accent md:p-8">
                  <span className="text-sm font-semibold uppercase tracking-wider text-accent">{s.eyebrow}</span>
                  <h2 className="mt-2 text-2xl group-hover:text-accent md:text-3xl">{s.name}</h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.seoDescription}</p>
                  <p className="mt-4 text-sm italic text-foreground/70">“{s.needs[0]}”</p>
                  <span className="mt-5 inline-flex items-center gap-1 font-semibold text-accent">
                    Ver serviço <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>

    <section aria-labelledby="outras" className="bg-warm py-16 md:py-20">
      <Container>
        <h2 id="outras" className="text-3xl md:text-4xl">Outras frentes para editoras</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {OTHER_FRONTS.map((f) => (
            <div key={f.id} id={f.id}>
              <h3 className="text-2xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted-foreground">{f.text}</p>
              <CheckList items={f.items} className="mt-5" />
            </div>
          ))}
        </div>
        <p className="mt-10 text-muted-foreground">
          Amazon e marketplaces, metadados e dados comerciais fazem parte da{" "}
          <Link to={SERVICES["consultoria-comercial"].path} className="font-semibold text-accent hover:underline">
            consultoria comercial para editoras
          </Link>
          .
        </p>
      </Container>
    </section>

    <section className="py-16 md:py-20">
      <Container>
        <Faq items={GENERAL_FAQ} />
        <div className="mx-auto mt-10 max-w-3xl">
          <Link to="/contato" className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3.5 font-semibold text-accent-foreground hover:bg-accent/90">
            Conversar sobre meu projeto
          </Link>
        </div>
      </Container>
    </section>
  </>
);

export default Services;
