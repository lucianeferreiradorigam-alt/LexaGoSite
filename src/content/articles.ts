import articles from "virtual:articles";
import type { ServiceKey } from "./services";

/**
 * Área de conteúdos.
 * Cada arquivo em content/conteudos/*.md tem um cabeçalho (frontmatter) com os campos
 * do site e do Instagram. Apenas itens com status "publicado" aparecem no site.
 * O formato completo está documentado em docs/conteudos-e-instagram.md.
 */

export const CATEGORIES = [
  { slug: "escrever-e-produzir-um-livro", name: "Escrever e produzir um livro" },
  { slug: "vender-e-distribuir-livros", name: "Vender e distribuir livros" },
  { slug: "amazon-e-publicidade", name: "Amazon e publicidade" },
  { slug: "gestao-comercial-para-editoras", name: "Gestão comercial para editoras" },
  { slug: "ebooks-e-audiobooks", name: "E-books e audiobooks" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];
export type ContentStatus = "rascunho" | "aprovado" | "agendado" | "publicado";

export type InstagramPiece = {
  formato: "carrossel" | "reels" | "imagem" | "stories";
  legenda: string;
  roteiro?: string[];
  cta?: string;
  imagem?: string;
  imagem_alt?: string;
  utm_campaign?: string;
  data_publicacao?: string;
  status: ContentStatus;
  /** Preenchido pela integração após publicar. Evita publicação duplicada. */
  id_publicacao?: string;
};

export type Article = {
  slug: string;
  titulo: string;
  descricao: string;
  categoria: CategorySlug;
  servico_relacionado: ServiceKey;
  tema?: string;
  data_publicacao: string;
  atualizado_em?: string;
  status: ContentStatus;
  imagem?: string;
  imagem_alt?: string;
  cta?: string;
  instagram?: InstagramPiece[];
  html: string;
};

// Conteúdos lidos e validados no build (scripts/content.mjs). Somente itens "publicado".
export const PUBLISHED_ARTICLES: Article[] = articles as Article[];

export const getArticle = (slug: string) => PUBLISHED_ARTICLES.find((a) => a.slug === slug);

export const categoryName = (slug: string) => CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${d} de ${months[m - 1]} de ${y}`;
};
