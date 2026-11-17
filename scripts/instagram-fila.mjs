/**
 * Fila do Instagram (modo de simulação).
 *
 * Lista as peças de Instagram prontas para publicar: status "aprovado" ou "agendado",
 * data de publicação vencida e sem id_publicacao. Monta a URL de destino com UTM e
 * valida os campos. NÃO publica nada e não chama nenhuma API.
 *
 * Uso: npm run instagram:fila            (todas as peças com pendência)
 *      npm run instagram:fila -- --json  (saída em JSON para uma automação futura)
 */
import { loadArticles } from "./content.mjs";

const SITE_URL = "https://www.lexagobr.com";
const now = new Date();
const asJson = process.argv.includes("--json");

export function destinationUrl(article, piece, index) {
  const u = new URL(`${SITE_URL}/conteudos/${article.slug}`);
  u.searchParams.set("utm_source", "instagram");
  u.searchParams.set("utm_medium", "social");
  u.searchParams.set("utm_campaign", piece.utm_campaign || article.slug);
  u.searchParams.set("utm_content", `${piece.formato}-${index + 1}`);
  return u.toString();
}

const queue = [];
const pending = [];
for (const a of loadArticles()) {
  (a.instagram || []).forEach((piece, i) => {
    const key = `${a.slug}#${i}`; // chave de idempotência da peça
    const item = {
      chave: key,
      artigo: a.titulo,
      artigo_publicado_no_site: a.status === "publicado",
      formato: piece.formato,
      status: piece.status,
      data_publicacao: piece.data_publicacao ? String(piece.data_publicacao) : null,
      legenda: piece.legenda,
      roteiro: piece.roteiro || [],
      cta: piece.cta || a.cta || null,
      imagem: piece.imagem || null,
      imagem_alt: piece.imagem_alt || null,
      url_destino: destinationUrl(a, piece, i),
      ja_publicado: Boolean(piece.id_publicacao),
    };
    const due = item.data_publicacao && new Date(item.data_publicacao) <= now;
    const ready = ["aprovado", "agendado"].includes(piece.status) && due && !item.ja_publicado;
    const problems = [];
    if (!item.imagem) problems.push("sem imagem");
    if (item.imagem && !/\.jpe?g$/i.test(item.imagem)) problems.push("imagem precisa ser JPEG");
    if (!item.artigo_publicado_no_site) problems.push("artigo ainda não publicado no site (link de destino não existe)");
    item.problemas = problems;
    (ready ? queue : pending).push(item);
  });
}

if (asJson) {
  console.log(JSON.stringify({ gerado_em: now.toISOString(), prontas: queue, demais: pending }, null, 2));
} else {
  console.log(`Peças prontas para publicar: ${queue.length}`);
  for (const q of queue) console.log(`  - ${q.chave} (${q.formato}) ${q.problemas.length ? "PROBLEMAS: " + q.problemas.join("; ") : "ok"}`);
  console.log(`Demais peças: ${pending.length}`);
  for (const q of pending) console.log(`  - ${q.chave} [${q.status}] ${q.data_publicacao || "sem data"}`);
  console.log("\nModo de simulação: nada foi publicado.");
}
