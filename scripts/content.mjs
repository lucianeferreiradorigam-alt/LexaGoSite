/**
 * Leitura e validação dos conteúdos em content/conteudos/*.md.
 * Usado no build (plugin do Vite) e pelo script da fila do Instagram.
 * Roda apenas no Node: o navegador recebe o HTML já convertido.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { marked } from "marked";

export const CONTENT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "content", "conteudos");

export const CATEGORY_SLUGS = [
  "escrever-e-produzir-um-livro",
  "vender-e-distribuir-livros",
  "gestao-comercial-para-editoras",
];
export const SERVICE_KEYS = [
  "projetos-editoriais",
  "consultoria-comercial",
  "representacao-comercial",
  "comercializacao",
];
export const STATUSES = ["rascunho", "aprovado", "agendado", "publicado"];
const FORMATS = ["carrossel", "reels", "imagem", "stories"];

export function loadArticles() {
  const errors = [];
  const items = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
      const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
      if (!m) {
        errors.push(`${file}: cabeçalho (frontmatter) ausente`);
        return null;
      }
      const data = parseYaml(m[1]) || {};
      for (const k of ["slug", "titulo", "descricao", "categoria", "servico_relacionado", "data_publicacao", "status"]) {
        if (!data[k]) errors.push(`${file}: campo "${k}" ausente`);
      }
      if (data.slug && !/^[a-z0-9-]+$/.test(data.slug)) errors.push(`${file}: slug deve ter apenas letras minúsculas, números e hífens`);
      if (data.categoria && !CATEGORY_SLUGS.includes(data.categoria)) errors.push(`${file}: categoria inválida "${data.categoria}"`);
      if (data.servico_relacionado && !SERVICE_KEYS.includes(data.servico_relacionado))
        errors.push(`${file}: servico_relacionado inválido "${data.servico_relacionado}"`);
      if (data.status && !STATUSES.includes(data.status)) errors.push(`${file}: status inválido "${data.status}"`);
      for (const [i, ig] of (data.instagram || []).entries()) {
        if (!FORMATS.includes(ig.formato)) errors.push(`${file}: instagram[${i}].formato inválido`);
        if (!STATUSES.includes(ig.status)) errors.push(`${file}: instagram[${i}].status inválido`);
        if (!ig.legenda) errors.push(`${file}: instagram[${i}].legenda ausente`);
        if (ig.imagem && !ig.imagem_alt) errors.push(`${file}: instagram[${i}] tem imagem sem imagem_alt`);
      }
      return {
        ...data,
        arquivo: file,
        data_publicacao: String(data.data_publicacao ?? ""),
        atualizado_em: data.atualizado_em ? String(data.atualizado_em) : undefined,
        markdown: m[2],
      };
    })
    .filter(Boolean);

  const slugs = new Set();
  for (const a of items) {
    if (slugs.has(a.slug)) errors.push(`slug duplicado: ${a.slug}`);
    slugs.add(a.slug);
  }
  if (errors.length) throw new Error(`Erros nos conteúdos:\n- ${errors.join("\n- ")}`);
  return items.sort((a, b) => b.data_publicacao.localeCompare(a.data_publicacao));
}

/** Plugin do Vite: expõe os conteúdos publicados como módulo virtual:articles. */
export function articlesPlugin() {
  const id = "virtual:articles";
  const resolved = "\0" + id;
  return {
    name: "lexa-articles",
    resolveId: (s) => (s === id ? resolved : null),
    load(s) {
      if (s !== resolved) return null;
      this.addWatchFile(CONTENT_DIR);
      const published = loadArticles()
        .filter((a) => a.status === "publicado")
        .map(({ markdown, arquivo, instagram, ...rest }) => ({ ...rest, html: marked.parse(markdown, { async: false }) }));
      return `export default ${JSON.stringify(published)};`;
    },
  };
}
