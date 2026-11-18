import { CONTACT } from "@/lib/site";
import Breadcrumbs from "@/layout/Breadcrumbs";
import LeadForm from "@/layout/LeadForm";
import { EmailLink, WhatsAppLink } from "@/layout/ContactLinks";
import { Container, Eyebrow } from "@/layout/Section";

const Contact = () => (
  <section className="bg-warm">
    <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Contato", path: "/contato" }]} />
        <Eyebrow className="mt-8">Contato</Eyebrow>
        <h1 className="text-4xl leading-[1.08] md:text-5xl">Conversar sobre meu projeto</h1>
        <p className="mt-5 text-lg leading-relaxed text-foreground/80">
          Conte em poucas palavras o que você precisa. Respondemos com os próximos passos. Arquivos e originais podem ser
          combinados depois do primeiro contato.
        </p>
        <div className="mt-8 space-y-4">
          <WhatsAppLink variant="button" label={`WhatsApp ${CONTACT.whatsappDisplay}`} message="Olá! Quero conversar sobre meu projeto." />
          {CONTACT.partners.map((p) => (
            <p key={p.email} className="text-sm">
              <span className="block font-semibold">{p.name}</span>
              <EmailLink email={p.email} />
            </p>
          ))}
        </div>
      </div>
      <LeadForm submitLabel="Enviar mensagem" />
    </Container>
  </section>
);

export default Contact;
