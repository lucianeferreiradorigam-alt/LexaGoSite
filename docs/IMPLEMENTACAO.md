# Reestruturação do site LEXA Go: buscas, campanhas e leads

## 1. O que mudou

- O site deixou de ser uma página única e passou a ter páginas próprias por serviço, páginas de campanha, área de conteúdos, sobre, contato e privacidade.
- Posicionamento atualizado: "Da ideia ao mercado: desenvolvimento editorial e estratégia comercial para livros".
- Apresentação das sócias com o texto do complemento (Luciane Dorigam e Joyce Fabris, mais de 20 anos de experiência no mercado editorial e livreiro).
- Mantido "mais de 2.000 e-books produzidos para o CEDET" (confirmado), agora visível nas páginas de e-book. Removidas afirmações não confirmadas dos dados ocultos de SEO ("R$ 7 bilhões", "sem investimento inicial", "foundingDate 2024").
- Nova tipografia (Fraunces nos títulos, Source Sans 3 no texto, servidas pelo próprio site), terracota da marca escurecido para contraste adequado, fotos otimizadas (de 2,4 MB para 35 KB).

## 2. Páginas

| URL | Conteúdo | No Google |
|---|---|---|
| `/` | Página inicial na ordem do briefing | Sim |
| `/servicos` | Visão geral de todas as frentes | Sim |
| `/projetos-editoriais` | Seu livro, da ideia ao mercado; cinco etapas; ghostwriting; bloco para editoras | Sim |
| `/amazon-ads-para-livros` | Amazon Ads: publicidade para livros na Amazon | Sim |
| `/conversao-de-livros-em-ebook` | Novo serviço de conversão em e-book (fluido x fixo; conversão x exportação) | Sim |
| `/consultoria-comercial-para-editoras` | Consultoria, marketplaces, metadados, dados | Sim |
| `/representacao-comercial-de-livros` | Representação comercial (com a diferença para agenciamento literário) | Sim |
| `/comercializacao-de-livros` | Quero vender meu livro | Sim |
| `/conteudos` e `/conteudos/<slug>` | Área de conteúdos com 4 artigos iniciais | Sim |
| `/sobre`, `/contato`, `/privacidade` | Institucionais | Sim |
| `/lp/consultoria-e-representacao-comercial` | Campanha 1 | Não (noindex) |
| `/lp/desenvolvimento-de-livros` | Campanha 2 | Não |
| `/lp/comercializacao-de-livros` | Campanha 3 | Não |
| `/lp/amazon-ads` | Campanha 4 | Não |
| `/lp/conversao-de-ebooks` | Campanha 5 | Não |

As páginas de campanha ficam fora do índice para não competir com as páginas de serviço nas buscas orgânicas. Os anúncios funcionam normalmente com elas.

## 3. SEO e indexação

- **Pré-renderização:** no build, cada rota vira um HTML completo (`scripts/prerender.mjs`), com o mesmo código React do navegador, que depois "hidrata" a página. Escolhemos isso em vez de migrar para Next.js ou outro framework porque mantém Vite, React e a Vercel como estão, não exige servidor e entrega o conteúdo pronto para buscadores e redes sociais.
- Título, descrição, canônica, Open Graph e Twitter Card únicos por página.
- Um H1 por página e hierarquia de subtítulos verificada.
- `sitemap.xml` gerado automaticamente apenas com páginas indexáveis; `robots.txt` atualizado.
- Dados estruturados com informações reais: Organization, WebSite, Service, FAQPage, BreadcrumbList e Article.
- Endereço principal: `https://www.lexagobr.com` (o domínio sem www já redireciona na Vercel).
- `vercel.json`: URLs sem `.html` e sem barra final, redirecionamentos de endereços prováveis (`/amazon-ads`, `/ebooks`, `/blog`), cache longo de arquivos estáticos.
- O site antigo tinha apenas `/`, então nenhum endereço existente foi perdido.
- A verificação do Google Search Console (meta tag já existente) foi mantida.

Não há promessa de posição nos resultados de busca.

## 4. Formulários e mensuração

- Formulário enxuto: nome, e-mail, WhatsApp (opcional), empresa (opcional), assunto, etapa do projeto (só para desenvolvimento de livro) e descrição. Nas páginas de serviço o assunto já vem definido e não é perguntado.
- Junto com o lead vão: página de origem, UTMs, gclid/fbclid, referência e página de entrada (primeiro e último acesso).
- Envio para `/api/lead` (função da Vercel), que repassa para um webhook e/ou e-mail. **Sem destino configurado, o formulário mostra erro e oferece o WhatsApp, sem simular recebimento.**
- Eventos no `dataLayer`: `contact_click` (clique em WhatsApp ou e-mail) e `generate_lead` (somente quando o servidor confirma o recebimento). Erros nunca contam como conversão.
- GA4, Google Ads e Meta Pixel ficam preparados por variáveis de ambiente e só carregam depois do aceite no aviso de cookies. O aviso só aparece quando alguma dessas ferramentas está configurada.

## 5. Verificações realizadas

- Build completo com pré-renderização de 21 páginas.
- Navegador automatizado em desktop (1366 px) e celular (iPhone 13): sem rolagem horizontal, um H1 por página e nenhum erro de hidratação no console.
- Formulário sem destino: mostra erro e não dispara conversão.
- Formulário com destino: lead chega ao webhook com UTMs e origem; dispara `generate_lead` uma vez.
- Clique no WhatsApp: dispara `contact_click`.
- Navegação interna atualiza título e canônica.

## 6. Pendências que dependem de você

1. **Destino dos leads (e-mail para luciane@ e joyce@lexagobr.com, via Resend):**
   1. Criar conta gratuita em resend.com.
   2. Em Domains, adicionar `lexagobr.com` e criar no DNS do domínio os registros que o Resend mostrar (TXT/MX de envio e DKIM). Aguardar o status "Verified".
   3. Em API Keys, criar uma chave com permissão "Sending access".
   4. Na Vercel (projeto lexa-go-site > Settings > Environment Variables), criar `RESEND_API_KEY` com a chave, para Production e Preview, e fazer novo deploy.
   Destinatários e remetente (`site@lexagobr.com`) já estão definidos no código; as variáveis `LEAD_EMAIL_TO` e `LEAD_EMAIL_FROM` só servem para alterar esse padrão.
2. **IDs de mensuração:** GA4 configurado (G-943RQFF132). Faltam Google Ads (ID e rótulos de conversão) e Meta Pixel. No GA4, marcar o evento `generate_lead` como evento principal (conversão).
3. **Clientes:** lista atual aprovada e mantida.
4. **Resultados de clientes:** enviar os resultados aprovados para publicação (entram em `src/content/company.ts`).
5. **Perfis oficiais** (Instagram, LinkedIn) para os links e dados estruturados.
6. **Revisão dos 4 artigos iniciais** em `content/conteudos/`.
7. **Search Console:** depois de publicar, enviar `https://www.lexagobr.com/sitemap.xml`.
8. **Instagram:** ver `docs/conteudos-e-instagram.md`.
