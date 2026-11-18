import type { FaqItem } from "@/content/services";

/** Perguntas frequentes com <details>: acessível e legível sem JavaScript. */
const Faq = ({ items, title = "Perguntas frequentes" }: { items: FaqItem[]; title?: string }) => (
  <section aria-labelledby="faq-titulo" className="mx-auto max-w-3xl">
    <h2 id="faq-titulo" className="mb-6 text-3xl md:text-4xl">{title}</h2>
    <div className="divide-y divide-border border-y border-border">
      {items.map((f) => (
        <details key={f.q} className="group py-4">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold">
            <span>{f.q}</span>
            <span aria-hidden className="mt-1 text-accent transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  </section>
);

export default Faq;
