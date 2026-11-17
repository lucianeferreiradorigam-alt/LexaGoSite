import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import logo from "@/assets/logo-header.png";
import { SERVICES, type ServiceKey } from "@/content/services";
import { IconTile, SERVICE_ICONS, SERVICE_TONES } from "@/layout/ServiceIcon";
import Faq from "@/layout/Faq";
import LeadForm from "@/layout/LeadForm";
import { WhatsAppLink } from "@/layout/ContactLinks";
import { CheckList, Container, Eyebrow } from "@/layout/Section";
import { CONTACT } from "@/lib/site";

/**
 * Página de destino para anúncios (Google Ads, Meta).
 * Navegação reduzida, oferta e formulário logo no início. Fica fora do índice
 * de busca para não competir com a página de serviço equivalente.
 */
const LandingPage = ({ services }: { services: ServiceKey[] }) => {
  const main = SERVICES[services[0]];
  const lp = main.landing;
  const all = services.map((k) => SERVICES[k]);
  const isCombined = all.length > 1;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <Container className="flex h-16 items-center justify-between">
          <Link to="/" aria-label="LEXA Go, página inicial">
            <img src={logo} alt="LEXA Go" width={84} height={48} className="h-9 w-auto" />
          </Link>
          <WhatsAppLink label="WhatsApp" message={main.whatsappMessage} service={main.key} />
        </Container>
      </header>

      <main id="conteudo">
        <section className="bg-warm">
          <Container className="grid gap-10 py-10 md:py-14 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div className="lg:pt-6">
              <IconTile icon={SERVICE_ICONS[main.key]} tone={SERVICE_TONES[main.key]} size="lg" />
              <Eyebrow className="mt-5">{isCombined ? "Para editoras" : main.eyebrow}</Eyebrow>
              <h1 className="text-4xl leading-[1.08] md:text-5xl">{lp.h1}</h1>
              <p className="mt-5 text-lg leading-relaxed text-foreground/80">{lp.lead}</p>
              <CheckList items={lp.bullets} className="mt-6 text-lg" />
              {main.proof && (
                <p className="mt-6 flex items-baseline gap-3">
                  <span className="font-serif text-4xl text-accent">{main.proof.numero}</span>
                  <span className="text-foreground/80">{main.proof.texto}</span>
                </p>
              )}
              <div className="mt-8 hidden lg:block">
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Para quem é</p>
                <ul className="mt-3 space-y-3">
                  {main.audience.map((a) => (
                    <li key={a.title}>
                      <span className="font-semibold">{a.title}:</span>{" "}
                      <span className="text-muted-foreground">{a.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div id="formulario" className="scroll-mt-6">
              <LeadForm
                service={isCombined ? undefined : main.key}
                submitLabel={main.cta}
                title={main.cta}
                compact
              />
            </div>
          </Container>
        </section>

        {all.map((s) => {
          const deliver = s.sections.find((x) => x.kind === "list" || x.kind === "steps");
          return (
            <section key={s.key} aria-labelledby={`${s.key}-entregas`} className="py-14 md:py-16">
              <Container>
                <h2 id={`${s.key}-entregas`} className="text-3xl md:text-4xl">
                  {isCombined ? s.name : "Como funciona e o que está incluído"}
                </h2>
                {isCombined && <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{s.lead}</p>}
                {deliver?.kind === "list" && <CheckList items={deliver.items} className="mt-8 grid max-w-4xl gap-x-10 md:grid-cols-2" />}
                {deliver?.kind === "steps" && (
                  <ol className="mt-8 grid gap-4 md:grid-cols-5">
                    {deliver.steps.map((st, i) => (
                      <li key={st.title} className="rounded-2xl border border-border p-4">
                        <span className="font-serif text-2xl text-accent">{i + 1}</span>
                        <p className="mt-1 font-semibold leading-snug">{st.title}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{st.items.slice(0, 3).join(" ")}</p>
                      </li>
                    ))}
                  </ol>
                )}
                {s.key === "representacao-comercial" && (
                  <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
                    Representação comercial é a atuação de venda dos livros junto a canais e compradores. Não se confunde
                    com agenciamento literário ou representação de direitos autorais.
                  </p>
                )}
              </Container>
            </section>
          );
        })}

        {main.notes && (
          <section className="pb-6">
            <Container>
              <ul className="max-w-3xl space-y-2 rounded-lg bg-muted/60 p-5 text-sm leading-relaxed text-foreground/85">
                {main.notes.map((n) => (
                  <li key={n} className="flex gap-2"><Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />{n}</li>
                ))}
              </ul>
            </Container>
          </section>
        )}

        <section className="bg-warm py-14 md:py-16">
          <Container>
            <h2 className="text-3xl md:text-4xl">Quem conduz o trabalho</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/85">
              A LEXA Go é liderada por Luciane Dorigam e Joyce Fabris, sócias com ampla vivência no setor e mais de 20
              anos de experiência no mercado editorial e livreiro. Essa experiência conecta desenvolvimento de livros,
              estratégia comercial, canais de venda e execução.
            </p>
          </Container>
        </section>

        <section className="py-14 md:py-16">
          <Container>
            <Faq items={all.flatMap((s) => s.faq).slice(0, 6)} />
            <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row">
              <a href="#formulario" className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3.5 font-semibold text-accent-foreground hover:bg-accent/90">
                {main.cta}
              </a>
              <WhatsAppLink variant="button" message={main.whatsappMessage} service={main.key} />
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-border py-6 text-sm text-muted-foreground">
        <Container className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} LEXA Go · {CONTACT.emailGeneral}</span>
          <span>
            <Link to={main.path} className="underline">Saiba mais sobre o serviço</Link> ·{" "}
            <Link to="/privacidade" className="underline">Privacidade</Link>
          </span>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
