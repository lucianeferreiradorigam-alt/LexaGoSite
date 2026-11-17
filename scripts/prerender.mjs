/**
 * Pré-renderização (SSG): gera um HTML completo para cada rota a partir do mesmo
 * código React usado no navegador. Também gera sitemap.xml e robots.txt.
 *
 * Fluxo do build (npm run build):
 *   1. vite build                      -> dist/ (cliente)
 *   2. vite build --ssr entry-server   -> dist-ssr/ (renderizador)
 *   3. node scripts/prerender.mjs      -> dist/<rota>.html, sitemap.xml, robots.txt
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE_URL = "https://www.lexagobr.com";

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, ROUTES } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);

const write = (urlPath, html) => {
  const file = urlPath === "/" ? "index.html" : `${urlPath.slice(1)}.html`;
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  return file;
};

const page = (url) => {
  const { html, head } = render(url);
  return template.replace("<!--app-head-->", head).replace("<!--app-html-->", html);
};

for (const r of ROUTES) {
  const file = write(r.path, page(r.path));
  console.log(`  pré-renderizado ${r.path} -> ${file}`);
}
write("/404", page("/404"));

// sitemap.xml: apenas páginas indexáveis
const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.filter((r) => r.sitemap && !r.seo.noindex)
  .map((r) => {
    const loc = r.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${r.path}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${r.sitemap.lastmod || today}</lastmod>\n    <priority>${r.sitemap.priority.toFixed(1)}</priority>\n  </url>`;
  })
  .join("\n");
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
);

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
console.log(`  sitemap.xml com ${urls.split("<url>").length - 1} URLs`);
