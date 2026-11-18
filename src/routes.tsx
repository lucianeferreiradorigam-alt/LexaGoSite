import type { ReactElement } from "react";
import { LANDINGS, SERVICES, SERVICE_ORDER, GENERAL_FAQ } from "@/content/services";
import { PUBLISHED_ARTICLES } from "@/content/articles";
import {
  articleSchema,
  faqSchema,
  organizationSchema,
  serviceSchema,
  websiteSchema,
  type SeoData,
} from "@/lib/seo";
import Home from "@/pages/Home";
import ServicePage from "@/pages/ServicePage";
import LandingPage from "@/pages/LandingPage";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ContentIndex from "@/pages/ContentIndex";
import ArticlePage from "@/pages/ArticlePage";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";

export type AppRoute = {
  path: string;
  element: ReactElement;
  seo: SeoData;
  /** Páginas de campanha usam layout próprio, sem menu completo. */
  bare?: boolean;
  sitemap?: { priority: number; lastmod?: string };
};

export const ROUTES: AppRoute[] = [
  {
    path: "/",
    element: <Home />,
    seo: {
      title: "LEXA Go | Desenvolvimento editorial e estratégia comercial para livros",
      description:
        "Da ideia ao mercado: a LEXA Go apoia editoras, autores e empresas no desenvolvimento de livros, ghostwriting, consultoria comercial, representação comercial e comercialização de livros.",
      jsonLd: [organizationSchema(), websiteSchema(), faqSchema(GENERAL_FAQ)],
    },
    sitemap: { priority: 1 },
  },
  {
    path: "/servicos",
    element: <Services />,
    seo: {
      title: "Serviços editoriais e comerciais para livros | LEXA Go",
      description:
        "Projetos editoriais, ghostwriting, consultoria comercial, representação comercial e comercialização de livros. Contrate o percurso completo ou uma etapa.",
      breadcrumbs: [
        { name: "Início", path: "/" },
        { name: "Serviços", path: "/servicos" },
      ],
      jsonLd: [faqSchema(GENERAL_FAQ)],
    },
    sitemap: { priority: 0.9 },
  },
  ...SERVICE_ORDER.map((k): AppRoute => {
    const s = SERVICES[k];
    return {
      path: s.path,
      element: <ServicePage service={s} />,
      seo: {
        title: s.seoTitle,
        description: s.seoDescription,
        breadcrumbs: [
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/servicos" },
          { name: s.shortName, path: s.path },
        ],
        jsonLd: [
          serviceSchema({ name: s.name, description: s.seoDescription, path: s.path, serviceType: s.eyebrow }),
          faqSchema(s.faq),
        ],
      },
      sitemap: { priority: 0.9 },
    };
  }),
  ...LANDINGS.map((l): AppRoute => {
    const s = SERVICES[l.services[0]];
    return {
      path: l.path,
      element: <LandingPage services={l.services} />,
      bare: true,
      seo: { title: s.landing.seoTitle, description: s.landing.lead || s.seoDescription, noindex: true },
    };
  }),
  {
    path: "/sobre",
    element: <About />,
    seo: {
      title: "Sobre a LEXA Go | Luciane Dorigam e Joyce Fabris",
      description:
        "A LEXA Go é liderada por Luciane Dorigam e Joyce Fabris, sócias com mais de 20 anos de experiência no mercado editorial e livreiro.",
      breadcrumbs: [
        { name: "Início", path: "/" },
        { name: "Sobre", path: "/sobre" },
      ],
    },
    sitemap: { priority: 0.6 },
  },
  {
    path: "/contato",
    element: <Contact />,
    seo: {
      title: "Contato | LEXA Go",
      description: "Fale com a LEXA Go sobre o seu livro ou a sua editora. Atendimento por formulário, e-mail e WhatsApp.",
      breadcrumbs: [
        { name: "Início", path: "/" },
        { name: "Contato", path: "/contato" },
      ],
    },
    sitemap: { priority: 0.6 },
  },
  {
    path: "/conteudos",
    element: <ContentIndex />,
    seo: {
      title: "Conteúdos sobre escrever, publicar e vender livros | LEXA Go",
      description:
        "Artigos sobre como escrever e produzir um livro, vender e distribuir livros e gestão comercial para editoras.",
      breadcrumbs: [
        { name: "Início", path: "/" },
        { name: "Conteúdos", path: "/conteudos" },
      ],
    },
    sitemap: { priority: 0.7 },
  },
  ...PUBLISHED_ARTICLES.map((a): AppRoute => {
    const path = `/conteudos/${a.slug}`;
    return {
      path,
      element: <ArticlePage article={a} />,
      seo: {
        title: `${a.titulo} | LEXA Go`,
        description: a.descricao,
        ogType: "article",
        image: a.imagem,
        breadcrumbs: [
          { name: "Início", path: "/" },
          { name: "Conteúdos", path: "/conteudos" },
          { name: a.titulo, path },
        ],
        jsonLd: [
          articleSchema({
            title: a.titulo,
            description: a.descricao,
            path,
            published: a.data_publicacao,
            modified: a.atualizado_em,
            image: a.imagem,
          }),
        ],
      },
      sitemap: { priority: 0.6, lastmod: a.atualizado_em || a.data_publicacao },
    };
  }),
  {
    path: "/privacidade",
    element: <Privacy />,
    seo: {
      title: "Política de privacidade | LEXA Go",
      description: "Como a LEXA Go trata os dados pessoais recebidos pelo site.",
    },
    sitemap: { priority: 0.2 },
  },
];

export const NOT_FOUND: AppRoute = {
  path: "/404",
  element: <NotFound />,
  seo: { title: "Página não encontrada | LEXA Go", description: "Esta página não existe ou mudou de endereço.", noindex: true },
};

const normalize = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

export const findRoute = (pathname: string) => ROUTES.find((r) => r.path === normalize(pathname)) ?? NOT_FOUND;
