# Conteúdos do site e preparação para o Instagram

## Situação atual

- A área **Conteúdos** (`/conteudos`) está ativa no site.
- A integração com o Instagram **não está ativa**. Existe apenas a estrutura de dados e uma fila em modo de simulação (`npm run instagram:fila`), que não publica nada.

## Como publicar um conteúdo no site

1. Crie um arquivo em `content/conteudos/` com o nome igual ao `slug`, por exemplo `como-vender-meu-livro.md`.
2. Preencha o cabeçalho (exemplo abaixo) e escreva o texto em Markdown.
3. Mude `status` para `publicado` quando estiver aprovado.
4. Faça o commit. A Vercel gera o site, a página do artigo, o sitemap e os dados estruturados automaticamente.

Itens com `status` diferente de `publicado` não aparecem no site. O build falha se faltar algum campo obrigatório, se a categoria ou o serviço não existirem ou se houver slug repetido.

```yaml
---
slug: como-vender-meu-livro                  # URL: /conteudos/como-vender-meu-livro
titulo: "Como vender meu livro"
descricao: "Resumo de 1 a 2 frases. Usado no Google e nas redes."
categoria: vender-e-distribuir-livros        # ver lista abaixo
servico_relacionado: comercializacao         # ver lista abaixo
tema: "Canais de venda para autores"         # assunto-mãe, para reaproveitar em vários formatos
data_publicacao: 2026-12-01
atualizado_em: 2026-12-10                    # opcional
status: rascunho                             # rascunho | aprovado | agendado | publicado
imagem: /conteudos/como-vender.jpg           # opcional, em public/conteudos/
imagem_alt: "Descrição objetiva da imagem"
cta: "Quero vender meu livro"
instagram:                                   # uma ou mais peças derivadas do mesmo tema
  - formato: carrossel                       # carrossel | reels | imagem | stories
    status: rascunho                         # rascunho | aprovado | agendado | publicado
    data_publicacao: 2026-12-02T10:00:00-03:00
    legenda: "Texto da legenda"
    roteiro:                                 # um item por slide ou cena
      - "Slide 1"
      - "Slide 2"
    cta: "Leia o artigo completo"
    imagem: https://www.lexagobr.com/conteudos/como-vender-1.jpg   # JPEG em URL pública
    imagem_alt: "Texto alternativo da imagem"
    utm_campaign: conteudo-vender-livro      # opcional; padrão = slug
    id_publicacao:                           # preenchido pela integração; evita duplicidade
---
```

**Categorias:** `escrever-e-produzir-um-livro`, `vender-e-distribuir-livros`, `amazon-e-publicidade`, `gestao-comercial-para-editoras`, `ebooks-e-audiobooks`.

**Serviços:** `projetos-editoriais`, `amazon-ads`, `ebooks`, `consultoria-comercial`, `representacao-comercial`, `comercializacao`.

A URL de destino do Instagram é montada automaticamente com UTM:
`https://www.lexagobr.com/conteudos/<slug>?utm_source=instagram&utm_medium=social&utm_campaign=<utm_campaign>&utm_content=<formato>-<n>`.
Assim, os contatos que chegam pelo post aparecem com origem "instagram" no formulário.

## Arquitetura prevista para a publicação automática

```
Claude (redação)  ->  arquivo .md no GitHub (status: rascunho)
                         |
                  revisão humana  ->  status: aprovado / agendado
                         |
        Vercel Cron  ->  /api/instagram/publicar (a criar)
                         |  lê a fila (scripts/instagram-fila.mjs)
                         |  cria container(s) de mídia -> publica -> registra id
                         v
                Instagram (API oficial da Meta)
```

Pontos de projeto:

- **API oficial:** Instagram Platform, publicação de conteúdo (Content Publishing). Fluxo: criar container em `/<IG_ID>/media` (para carrossel, um container por item e depois um container `CAROUSEL` com `children`), conferir o status e publicar em `/<IG_ID>/media_publish`.
- **Requisitos da conta:** conta profissional do Instagram e um app da Meta com acesso por "Business Login for Instagram" ou "Facebook Login for Business", com as permissões de publicação (`instagram_business_basic` e `instagram_business_content_publish`, ou `instagram_basic` e `instagram_content_publish` no login pelo Facebook).
- **Mídia:** imagens em JPEG, hospedadas em URL pública no momento da publicação. Carrossel com até 10 itens. Texto alternativo (`alt_text`) é aceito em imagens, não em Reels e Stories.
- **Limite:** a Meta limita publicações por API em uma janela de 24 horas (consultar `content_publishing_limit`).
- **Credenciais:** token de acesso e ID da conta somente em variáveis de ambiente da Vercel (`IG_USER_ID`, `IG_ACCESS_TOKEN`), nunca no repositório. Renovação do token documentada no momento da ativação.
- **Duplicidade:** cada peça tem a chave `<slug>#<índice>`. A função só publica peças sem `id_publicacao` e grava o ID retornado (commit no repositório ou banco de dados) antes de considerar a peça concluída. Uma trava por chave impede duas execuções simultâneas.
- **Falhas:** registrar erro, chave e resposta da API nos logs da Vercel; não tentar de novo automaticamente mais de uma vez; avisar por e-mail.
- **Status:** nada é exibido como "publicado" no Instagram sem o ID de mídia retornado pela API.

Consultado em 17/11/2026: https://developers.facebook.com/docs/instagram-platform/content-publishing/ . As regras da Meta mudam com frequência; revalidar requisitos, permissões e limites antes de implementar.

## O que falta para ativar

1. Conta profissional do Instagram da LEXA Go e acesso de administrador.
2. App da Meta criado e aprovado para as permissões de publicação.
3. Decisão sobre onde gravar o `id_publicacao` (commit automático no GitHub ou um banco simples).
4. Implementar e testar a função `/api/instagram/publicar` com uma conta de teste antes de usar a conta oficial.
