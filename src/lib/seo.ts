import { CONTACT, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL, SOCIAL, absoluteUrl } from "./site";
import type { FaqItem } from "@/content/services";

export type Crumb = { name: string; path: string };

export type SeoData = {
  title: string;
  description: string;
  /** Páginas de campanha e utilitárias ficam fora do índice. */
  noindex?: boolean;
  ogType?: "website" | "article";
  image?: string;
  jsonLd?: object[];
  breadcrumbs?: Crumb[];
};

export const ORG_ID = `${SITE_URL}/#organizacao`;

export const organizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: DEFAULT_OG_IMAGE,
  description:
    "Consultoria para o mercado editorial que conecta desenvolvimento de livros, estratégia comercial, canais de venda e Amazon Ads para editoras, autores e empresas.",
  areaServed: "BR",
  email: CONTACT.emailGeneral,
  founder: CONTACT.partners.map((p) => ({ "@type": "Person", name: p.name })),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: `+${CONTACT.whatsappNumber}`,
      email: CONTACT.emailGeneral,
      availableLanguage: "pt-BR",
      areaServed: "BR",
    },
  ],
  ...(SOCIAL.sameAs.length ? { sameAs: SOCIAL.sameAs } : {}),
});

export const websiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#site`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: "pt-BR",
  publisher: { "@id": ORG_ID },
});

export const serviceSchema = (s: { name: string; description: string; path: string; serviceType: string }) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  serviceType: s.serviceType,
  description: s.description,
  url: absoluteUrl(s.path),
  areaServed: { "@type": "Country", name: "Brasil" },
  provider: { "@id": ORG_ID },
});

export const faqSchema = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbSchema = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absoluteUrl(c.path),
  })),
});

export const articleSchema = (a: {
  title: string;
  description: string;
  path: string;
  published: string;
  modified?: string;
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.title,
  description: a.description,
  mainEntityOfPage: absoluteUrl(a.path),
  datePublished: a.published,
  dateModified: a.modified || a.published,
  image: a.image ? absoluteUrl(a.image) : DEFAULT_OG_IMAGE,
  inLanguage: "pt-BR",
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
});

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Gera as tags do <head> de uma página (usado na pré-renderização). */
export function renderHead(path: string, seo: SeoData) {
  const url = absoluteUrl(path);
  const image = seo.image ? absoluteUrl(seo.image) : DEFAULT_OG_IMAGE;
  const ld = [...(seo.jsonLd || [])];
  if (seo.breadcrumbs && seo.breadcrumbs.length > 1) ld.push(breadcrumbSchema(seo.breadcrumbs));
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="${seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${seo.ogType || "website"}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`),
  ];
  return tags.join("\n    ");
}

/** Atualiza título, descrição, canônica e robots ao navegar entre páginas no navegador. */
export function applyHeadClient(path: string, seo: SeoData) {
  if (typeof document === "undefined") return;
  document.title = seo.title;
  const set = (selector: string, attr: string, value: string) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  const url = absoluteUrl(path);
  set('meta[name="description"]', "content", seo.description);
  set('meta[name="robots"]', "content", seo.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
  set('link[rel="canonical"]', "href", url);
  set('meta[property="og:url"]', "content", url);
  set('meta[property="og:title"]', "content", seo.title);
  set('meta[property="og:description"]', "content", seo.description);
  set('meta[name="twitter:title"]', "content", seo.title);
  set('meta[name="twitter:description"]', "content", seo.description);
}
