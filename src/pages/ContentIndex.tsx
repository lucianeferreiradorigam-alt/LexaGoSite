import { Link } from "react-router-dom";
import { CATEGORIES, PUBLISHED_ARTICLES, formatDate } from "@/content/articles";
import Breadcrumbs from "@/layout/Breadcrumbs";
import { Container, Eyebrow } from "@/layout/Section";

const ContentIndex = () => (
  <>
    <section className="border-b border-border bg-warm">
      <Container className="py-12 md:py-16">
        <Breadcrumbs items={[{ name: "Início", path: "/" }, { name: "Conteúdos", path: "/conteudos" }]} />
        <Eyebrow className="mt-8">Conteúdos</Eyebrow>
        <h1 className="max-w-3xl text-4xl leading-[1.08] md:text-5xl">Respostas para quem quer escrever, publicar e vender livros</h1>
        <p className="mt-5 max-w-2xl text-lg text-foreground/80">
          Artigos práticos sobre produção de livros, canais de venda, Amazon, gestão comercial para editoras e e-books.
        </p>
        <nav aria-label="Categorias" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => PUBLISHED_ARTICLES.some((a) => a.categoria === c.slug)).map((c) => (
              <li key={c.slug}>
                <a href={`#${c.slug}`} className="inline-block rounded-full border border-border bg-background px-4 py-1.5 text-sm hover:border-accent hover:text-accent">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>

    <Container className="py-14">
      {CATEGORIES.map((c) => {
        const list = PUBLISHED_ARTICLES.filter((a) => a.categoria === c.slug);
        if (!list.length) return null;
        return (
          <section key={c.slug} id={c.slug} aria-labelledby={`${c.slug}-t`} className="scroll-mt-20 border-b border-border py-8 last:border-0">
            <h2 id={`${c.slug}-t`} className="text-2xl md:text-3xl">{c.name}</h2>
            <ul className="mt-5 grid gap-6 md:grid-cols-2">
              {list.map((a) => (
                <li key={a.slug}>
                  <article>
                    <h3 className="text-xl font-semibold leading-snug">
                      <Link to={`/conteudos/${a.slug}`} className="hover:text-accent">{a.titulo}</Link>
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{a.descricao}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <time dateTime={a.data_publicacao}>{formatDate(a.data_publicacao)}</time>
                    </p>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </Container>
  </>
);

export default ContentIndex;
