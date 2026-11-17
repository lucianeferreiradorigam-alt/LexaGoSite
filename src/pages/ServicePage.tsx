import { Link } from "react-router-dom";
import { ArrowRight, Info } from "lucide-react";
import { SERVICES, type Section, type Service } from "@/content/services";
import { PUBLISHED_ARTICLES } from "@/content/articles";
import Breadcrumbs from "@/layout/Breadcrumbs";
import Faq from "@/layout/Faq";
import LeadForm from "@/layout/LeadForm";
import { WhatsAppLink } from "@/layout/ContactLinks";
import { CheckList, Container, Eyebrow } from "@/layout/Section";

export const SectionBlock = ({ section, index }: { section: Section; index: number }) => {
  const tone = index % 2 === 0 ? "" : "bg-warm";
  return (
    <section id={section.id} aria-labelledby={`${section.id}-t`} className={`py-16 md:py-20 ${tone}`}>
      <Container>
        <h2 id={`${section.id}-t`} className="max-w-3xl text-3xl md:text-4xl">{section.title}</h2>
        {"intro" in section && section.intro && (
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">{section.intro}</p>
        )}

        {section.kind === "list" && (
          <CheckList items={section.items} className="mt-8 grid max-w-4xl gap-x-10 md:grid-cols-2" />
        )}

        {section.kind === "text" && (
          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-foreground/85">
            {section.paragraphs.map((p) => <p key={p}>{p}</p>)}
          </div>
        )}

        {section.kind === "compare" && (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {section.columns.map((c) => (
              <div key={c.title} className="rounded-lg border border-border bg-background p-6">
                <h3 className="text-xl font-semibold">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{c.text}</p>
              </div>
            ))}
          </div>
        )}

        {section.kind === "steps" && (
          <ol className="mt-10 space-y-6">
            {section.steps.map((s, i) => (
              <li key={s.title} className="grid gap-4 rounded-lg border border-border bg-background p-6 md:grid-cols-[220px_1fr] md:gap-10 md:p-8">
                <div>
                  <span className="font-serif text-4xl text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-xl font-semibold leading-snug">{s.title}</h3>
                </div>
                <div>
                  {s.forWhom && <p className="mb-4 font-medium text-foreground/90">{s.forWhom}</p>}
                  <CheckList items={s.items} className="grid gap-x-8 sm:grid-cols-2" />
                </div>
              </li>
            ))}
          </ol>
        )}

        {"note" in section && section.note && (
          <p className="mt-8 flex max-w-3xl gap-3 rounded-md bg-muted/60 p-4 text-sm leading-relaxed text-foreground/80">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
            {section.note}
          </p>
        )}
      </Container>
    </section>
  );
};

export const RelatedServices = ({ keys, title = "Serviços relacionados" }: { keys: Service["related"]; title?: string }) => (
  <section aria-labelledby="relacionados" className="py-16">
    <Container>
      <h2 id="relacionados" className="text-2xl md:text-3xl">{title}</h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {keys.map((k) => {
          const s = SERVICES[k];
          return (
            <li key={k}>
              <Link to={s.path} className="group flex h-full flex-col rounded-lg border border-border p-5 transition-colors hover:border-accent">
                <span className="text-lg font-semibold group-hover:text-accent">{s.shortName}</span>
                <span className="mt-1 text-sm text-muted-foreground">{s.needs[0]}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Ver serviço <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Container>
  </section>
);

const ServicePage = ({ service }: { service: Service }) => {
  const articles = PUBLISHED_ARTICLES.filter((a) => a.servico_relacionado === service.key).slice(0, 3);

  return (
    <>
      <section className="border-b border-border bg-warm">
        <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Serviços", path: "/servicos" }, { name: service.shortName, path: service.path }]} />
            <Eyebrow className="mt-8">{service.eyebrow}</Eyebrow>
            <h1 className="text-4xl leading-[1.08] md:text-5xl lg:text-[3.4rem]">{service.h1}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">{service.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contato" className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3.5 font-semibold text-accent-foreground hover:bg-accent/90">
                {service.cta}
              </a>
              <WhatsAppLink variant="button" message={service.whatsappMessage} service={service.key} />
            </div>
          </div>
          <aside aria-label="Você está no lugar certo se" className="rounded-lg border border-border bg-background p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Você está no lugar certo se pensa:</p>
            <ul className="mt-4 space-y-3">
              {service.needs.map((n) => (
                <li key={n} className="border-l-2 border-accent pl-3 font-serif text-lg leading-snug">“{n}”</li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="para-quem" className="py-16 md:py-20">
        <Container>
          <h2 id="para-quem" className="text-3xl md:text-4xl">Para quem é</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {service.audience.map((a) => (
              <div key={a.title} className="border-t-2 border-foreground pt-4">
                <h3 className="text-xl font-semibold">{a.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{a.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {service.sections.map((s, i) => (
        <SectionBlock key={s.title} section={s} index={i + 1} />
      ))}

      {service.notes && (
        <section aria-labelledby="importante" className="py-12">
          <Container>
            <div className="max-w-3xl rounded-lg border border-border p-6">
              <h2 id="importante" className="flex items-center gap-2 text-xl font-semibold">
                <Info className="h-5 w-5 text-accent" aria-hidden /> Bom saber
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-foreground/85">
                {service.notes.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 md:py-20">
        <Container>
          <Faq items={service.faq} />
        </Container>
      </section>

      <section id="contato" aria-labelledby="contato-t" className="scroll-mt-20 bg-dark py-16 text-[hsl(var(--text-on-dark))] md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <h2 id="contato-t" className="text-3xl text-white md:text-4xl">{service.cta}</h2>
            <p className="mt-4 text-lg leading-relaxed opacity-85">
              Conte em poucas palavras o que você precisa. Na primeira conversa, entendemos o momento do projeto e
              indicamos o caminho e o escopo adequados.
            </p>
            <WhatsAppLink variant="inverse" className="mt-6" message={service.whatsappMessage} service={service.key} />
          </div>
          <div className="text-foreground">
            <LeadForm service={service.key} submitLabel={service.cta} />
          </div>
        </Container>
      </section>

      {articles.length > 0 && (
        <section aria-labelledby="conteudos-rel" className="border-b border-border py-14">
          <Container>
            <h2 id="conteudos-rel" className="text-2xl md:text-3xl">Conteúdos sobre o tema</h2>
            <ul className="mt-5 space-y-3">
              {articles.map((a) => (
                <li key={a.slug}>
                  <Link to={`/conteudos/${a.slug}`} className="text-lg font-semibold text-accent hover:underline">{a.titulo}</Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <RelatedServices keys={service.related} />
    </>
  );
};

export default ServicePage;
