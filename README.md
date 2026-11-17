# Site LEXA Go

Vite + React + Tailwind, pré-renderizado no build e publicado na Vercel.

- `npm run dev`: ambiente local.
- `npm run build`: gera `dist/` com uma página HTML por rota, `sitemap.xml` e `robots.txt`.
- `npm run instagram:fila`: lista peças de Instagram prontas (simulação, não publica).

Onde editar:
- Serviços e páginas de campanha: `src/content/services.ts`
- Sócias, clientes e depoimentos: `src/content/company.ts`
- Contatos e domínio: `src/lib/site.ts`
- Artigos: `content/conteudos/*.md` (ver `docs/conteudos-e-instagram.md`)
- Variáveis de ambiente: `.env.example`

Relatório da reestruturação: `docs/IMPLEMENTACAO.md`.
