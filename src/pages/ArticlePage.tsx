import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { type Article, PUBLISHED_ARTICLES, categoryName, formatDate } from "@/content/articles";
import { SERVICES } from "@/content/services";
import Breadcrumbs from "@/layout/Breadcrumbs";
import { Container, Eyebrow } from "@/layout/Section";

const ArticlePage = ({ article }: { article: Article }) => {
  const service = SERVICES[article.servico_relacionado];
  const more = PUBLISHED_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article>
      <header className="border-b border-border bg-warm">
        <Container className="max-w-3xl py-12 md:py-16">
          <Breadcrumbs
            items={[
              { name: "Início", path: "/" },
              { name: "Conteúdos", path: "/conteudos" },
              { name: article.titulo, path: `/conteudos/${article.slug}` },
            ]}
          />
          <Eyebrow className="mt-8">{categoryName(article.categoria)}</Eyebrow>
          <h1 className="text-4xl leading-[1.1] md:text-5xl">{article.titulo}</h1>
          <p className="mt-5 text-lg leading-relaxed text-foreground/80">{article.descricao}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Publicado em <time dateTime={article.data_publicacao}>{formatDate(article.data_publicacao)}</time>
          </p>
        </Container>
      </header>

      <Container className="max-w-3xl py-12">
        <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-accent" dangerouslySetInnerHTML={{ __html: article.html }} />

        <aside aria-label="Serviço relacionado" className="mt-12 rounded-2xl bg-dark p-6 text-[hsl(var(--text-on-dark))] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider opacity-70">Serviço relacionado</p>
          <p className="mt-2 font-serif text-2xl text-white">{service.name}</p>
          <p className="mt-2 opacity-85">{service.seoDescription}</p>
          <Link to={service.path} className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold text-accent-foreground hover:bg-accent/90">
            {article.cta || service.cta} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </aside>

        {more.length > 0 && (
          <nav aria-labelledby="mais" className="mt-12">
            <h2 id="mais" className="text-2xl">Leia também</h2>
            <ul className="mt-4 space-y-2">
              {more.map((a) => (
                <li key={a.slug}>
                  <Link to={`/conteudos/${a.slug}`} className="font-semibold text-accent hover:underline">{a.titulo}</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Container>
    </article>
  );
};

export default ArticlePage;
