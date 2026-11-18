/**
 * Conteúdo das páginas de serviço e das páginas de campanha.
 * Cada serviço conecta: necessidade → serviço → entregas → próximo passo.
 * Textos sem travessões, sem promessas de resultado e sem dados não verificados.
 */

export type FaqItem = { q: string; a: string };

export type Section =
  | { kind: "list"; id?: string; title: string; intro?: string; items: string[]; note?: string }
  | { kind: "text"; id?: string; title: string; paragraphs: string[] }
  | {
      kind: "compare";
      id?: string;
      title: string;
      intro?: string;
      columns: { title: string; text: string; points?: string[] }[];
      note?: string;
    }
  | {
      kind: "steps";
      id?: string;
      title: string;
      intro?: string;
      steps: { title: string; forWhom?: string; items: string[] }[];
      note?: string;
    };

export type ServiceKey =
  | "projetos-editoriais"
  | "consultoria-comercial"
  | "representacao-comercial"
  | "comercializacao";

/** Opções do campo "assunto" do formulário. */
export const FORM_SERVICES: { value: ServiceKey | "outro"; label: string }[] = [
  { value: "projetos-editoriais", label: "Desenvolver um livro (escrita, ghostwriting, produção)" },
  { value: "comercializacao", label: "Vender um livro já publicado" },
  { value: "consultoria-comercial", label: "Consultoria comercial para editora" },
  { value: "representacao-comercial", label: "Representação comercial de livros" },
  { value: "outro", label: "Outro assunto" },
];

export const EDITORIAL_STAGES = [
  "Tenho uma ideia",
  "Estou escrevendo",
  "Tenho um original pronto",
  "Tenho um livro publicado",
  "Represento uma editora ou empresa",
];

export type Service = {
  key: ServiceKey;
  path: string;
  name: string;
  shortName: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  /** Perguntas de quem chega a esta página. */
  needs: string[];
  audience: { title: string; text: string }[];
  sections: Section[];
  notes?: string[];
  faq: FaqItem[];
  cta: string;
  whatsappMessage: string;
  related: ServiceKey[];
  /** Prova real de experiência ligada ao serviço. */
  proof?: { numero: string; texto: string };
  /** Página de campanha correspondente (anúncios). */
  landing: {
    path: string;
    seoTitle: string;
    h1: string;
    lead: string;
    bullets: string[];
  };
};

export const SERVICES: Record<ServiceKey, Service> = {
  "projetos-editoriais": {
    key: "projetos-editoriais",
    path: "/projetos-editoriais",
    name: "Seu livro, da ideia ao mercado",
    shortName: "Projetos editoriais",
    seoTitle: "Quero escrever um livro: desenvolvimento editorial e ghostwriting | LEXA Go",
    seoDescription:
      "Tem uma ideia, um original ou um projeto em andamento? A LEXA Go organiza escrita, ghostwriting, produção editorial e chegada aos canais de venda, por etapa ou do início ao fim.",
    eyebrow: "Desenvolvimento editorial e ghostwriting",
    h1: "Seu livro, da ideia ao mercado",
    lead:
      "Você pode chegar com uma ideia, um original ou um projeto em andamento. A LEXA Go organiza as etapas necessárias para transformar esse conteúdo em livro e, conforme o escopo contratado, estruturar sua chegada aos canais de venda.",
    needs: [
      "Quero escrever um livro. Por onde começo?",
      "Tenho um original. Como transformá-lo em livro?",
      "Preciso de alguém para escrever meu livro.",
    ],
    audience: [
      {
        title: "Autores e especialistas",
        text: "Para quem tem uma ideia, um conhecimento ou um original e precisa de apoio para estruturar, produzir e comercializar um livro.",
      },
      {
        title: "Empresas e instituições",
        text: "Para livros institucionais, comemorativos, biográficos ou voltados à divulgação de conhecimento.",
      },
      {
        title: "Editoras e selos",
        text: "Para editoras que precisam ampliar a capacidade de desenvolver títulos e levar esses livros ao mercado.",
      },
    ],
    sections: [
      {
        kind: "steps",
        id: "etapas",
        title: "Cinco etapas, contratadas juntas ou por módulos",
        intro:
          "Cada projeto começa no ponto em que você está. É possível contratar o percurso completo ou apenas as etapas de que precisa.",
        steps: [
          {
            title: "Concepção e planejamento",
            forWhom: "Para quem tem uma ideia, uma história ou um conteúdo que deseja transformar em livro.",
            items: [
              "Entendimento dos objetivos do projeto.",
              "Definição de público e proposta editorial.",
              "Organização do conteúdo e dos capítulos.",
              "Planejamento de formato, etapas e cronograma.",
              "Análise inicial de posicionamento e viabilidade comercial.",
            ],
          },
          {
            title: "Escrita e desenvolvimento do original",
            forWhom: "Para quem precisa escrever o livro ou aprimorar um texto existente.",
            items: [
              "Ghostwriting, com escrita a partir de entrevistas, materiais e conhecimento da pessoa autora.",
              "Estruturação da narrativa e dos capítulos.",
              "Recebimento e avaliação de originais.",
              "Leitura crítica.",
              "Edição e preparação de texto.",
              "Revisão.",
            ],
          },
          {
            title: "Produção editorial e preparação para impressão",
            forWhom: "Para quem precisa transformar o original em um livro pronto para produção.",
            items: [
              "Coordenação das etapas editoriais.",
              "Projeto gráfico de capa e miolo.",
              "Diagramação.",
              "Revisão de provas.",
              "Organização de ISBN e ficha catalográfica, conforme o projeto.",
              "Preparação e fechamento dos arquivos para impressão.",
              "Cotação e acompanhamento da produção gráfica.",
              "Definição de formato, acabamento e tiragem.",
              "Avaliação de impressão sob demanda, quando adequada.",
            ],
          },
          {
            title: "Preparação comercial e lançamento",
            forWhom: "Para quem quer planejar a entrada do livro no mercado.",
            items: [
              "Posicionamento comercial da obra.",
              "Análise de preço e condições comerciais.",
              "Elaboração e organização de metadados.",
              "Preparação de sinopse e textos de apresentação.",
              "Definição dos canais prioritários.",
              "Planejamento de lançamento.",
              "Organização de materiais comerciais.",
            ],
          },
          {
            title: "Distribuição e operação de vendas",
            forWhom:
              "Além de ajudar a produzir seu livro, podemos cuidar da estratégia e da operação para levá-lo ao mercado.",
            items: [
              "Planejamento de distribuição física e digital.",
              "Cadastro e acompanhamento de títulos nos canais definidos.",
              "Operação e gestão comercial na Amazon.",
              "Desenvolvimento de vendas no Mercado Livre.",
              "Estruturação de oportunidades no TikTok Shop.",
              "Relacionamento com distribuidores e livrarias.",
              "Acompanhamento de pedidos, estoque e abastecimento.",
              "Gestão de condições comerciais e ações promocionais.",
              "Relatórios de desempenho e recomendações de melhoria.",
            ],
          },
        ],
        note:
          "A execução pode envolver profissionais, gráficas e editoras parceiras, sob coordenação da LEXA Go conforme o escopo contratado. A presença em cada canal de venda depende de requisitos, negociação, disponibilidade e escopo.",
      },
      {
        kind: "text",
        id: "ghostwriting",
        title: "O que é ghostwriting",
        paragraphs: [
          "Ghostwriting é o apoio profissional para transformar as ideias e o conhecimento da pessoa autora em texto. A escrita parte de entrevistas, materiais e referências que você fornece, preservando sua voz.",
          "Autoria, créditos e confidencialidade são definidos em contrato antes do início do trabalho.",
        ],
      },
      {
        kind: "text",
        id: "metadados",
        title: "O que são metadados e por que importam",
        paragraphs: [
          "Metadados são as informações que ajudam lojas e leitores a encontrar e entender o livro: título, descrição, categorias, palavras-chave, preço e dados técnicos. Bem preparados, eles melhoram a apresentação da obra nos canais de venda.",
        ],
      },
      {
        kind: "compare",
        id: "editoras",
        title: "Sua editora pode contar com a LEXA Go na produção e na operação comercial",
        intro:
          "Apoiamos o desenvolvimento do projeto editorial, coordenamos as etapas até os arquivos de impressão e podemos assumir a preparação comercial, a entrada nos canais e o acompanhamento das vendas.",
        columns: [
          {
            title: "Projeto editorial até o livro pronto para impressão",
            text: "Coordenação do desenvolvimento, da edição e da produção até a entrega dos arquivos finais.",
          },
          {
            title: "Projeto editorial com continuidade comercial",
            text: "Além da produção, preparação comercial, entrada nos canais definidos e acompanhamento de vendas.",
          },
        ],
        note:
          "A LEXA Go não é a editora responsável por todas as obras. Modelo de publicação, selo, direitos e responsabilidades são definidos em cada projeto.",
      },
    ],
    notes: [
      "O envio de um original para avaliação faz parte da análise do serviço. Não se trata de seleção para publicação gratuita nem de garantia de contrato com uma editora.",
    ],
    faq: [
      {
        q: "Preciso ter o livro escrito para começar?",
        a: "Não. Você pode começar com uma ideia ou um conjunto de materiais. A etapa de concepção organiza o conteúdo e, se for o caso, o ghostwriting transforma seu conhecimento em texto.",
      },
      {
        q: "Como funciona o ghostwriting?",
        a: "Fazemos entrevistas e reunimos seus materiais para escrever o texto com a sua voz. Você acompanha e aprova o andamento. Autoria, créditos e confidencialidade ficam definidos em contrato.",
      },
      {
        q: "Posso contratar apenas uma etapa?",
        a: "Sim. É possível contratar somente a escrita, somente a produção editorial, somente a preparação comercial ou o percurso completo.",
      },
      {
        q: "Vocês coordenam a impressão?",
        a: "Sim, conforme o escopo. Preparamos os arquivos, cotamos com gráficas, ajudamos a definir formato, acabamento e tiragem e acompanhamos a produção. Quando faz sentido, avaliamos a impressão sob demanda.",
      },
      {
        q: "A LEXA Go publica o meu livro?",
        a: "O modelo de publicação é definido em cada projeto. Podemos coordenar a produção e a chegada aos canais de venda, inclusive com editoras parceiras, mas selo, direitos e responsabilidades são acordados caso a caso.",
      },
      {
        q: "Como são definidos orçamento e prazo?",
        a: "Depois de uma conversa inicial e da análise do material, apresentamos escopo, profissionais envolvidos, cronograma e investimento conforme o projeto. Não trabalhamos com pacotes fechados.",
      },
    ],
    cta: "Quero desenvolver meu livro",
    whatsappMessage: "Olá! Quero conversar sobre o desenvolvimento do meu livro.",
    related: ["comercializacao", "consultoria-comercial", "representacao-comercial"],
    landing: {
      path: "/lp/desenvolvimento-de-livros",
      seoTitle: "Escreva e publique seu livro com apoio profissional | LEXA Go",
      h1: "Quer escrever um livro ou transformar seu original em livro?",
      lead:
        "A LEXA Go organiza escrita, ghostwriting, edição, produção e preparação para venda. Você começa no ponto em que está e contrata apenas o que precisa.",
      bullets: [
        "Ghostwriting a partir das suas ideias, entrevistas e materiais.",
        "Edição, revisão, projeto gráfico e preparação para impressão.",
        "Planejamento comercial para levar o livro aos canais de venda.",
      ],
    },
  },

  "consultoria-comercial": {
    key: "consultoria-comercial",
    path: "/consultoria-comercial-para-editoras",
    name: "Consultoria comercial para editoras",
    shortName: "Consultoria comercial",
    seoTitle: "Consultoria comercial para editoras e gestão comercial de livros | LEXA Go",
    seoDescription:
      "Consultoria para o mercado editorial: diagnóstico comercial, estratégia por título e canal, precificação, metadados e acompanhamento para aumentar as vendas de livros da sua editora.",
    eyebrow: "Gestão comercial para editoras",
    h1: "Consultoria comercial para editoras",
    lead:
      "Estratégia e execução para editoras que querem organizar a operação comercial, desenvolver canais e trabalhar as vendas do catálogo com base em dados.",
    needs: [
      "Preciso de uma consultoria comercial para minha editora.",
      "Como aumentar as vendas de livros do catálogo?",
      "Quero organizar a gestão comercial da editora.",
    ],
    audience: [
      {
        title: "Editoras e selos editoriais",
        text: "Que precisam organizar processos, melhorar metadados, operar canais, ampliar distribuição ou fortalecer as vendas.",
      },
      {
        title: "Editoras em crescimento",
        text: "Que querem apoio estratégico e operacional sem montar uma estrutura comercial completa internamente.",
      },
    ],
    sections: [
      {
        kind: "list",
        id: "consultoria",
        title: "Consultoria e gestão comercial",
        items: [
          "Diagnóstico comercial.",
          "Planejamento de crescimento.",
          "Estratégia por título, catálogo e canal.",
          "Precificação e condições comerciais.",
          "Calendário de lançamentos e promoções.",
          "Desenvolvimento de parcerias e oportunidades.",
          "Acompanhamento de resultados.",
          "Apoio estratégico e operacional.",
        ],
      },
      {
        kind: "list",
        id: "marketplaces",
        title: "Amazon e marketplaces",
        items: [
          "Diagnóstico e estruturação da operação.",
          "Gestão comercial em modelos Seller e Vendor, conforme o caso.",
          "Organização e melhoria de catálogo.",
          "Acompanhamento de pedidos e abastecimento.",
          "Identificação de problemas de cadastro e disponibilidade.",
          "Desenvolvimento de operações no Mercado Livre.",
          "Avaliação e estruturação de presença no TikTok Shop.",
          "Integração entre canais e planejamento comercial.",
        ],
        note: "A atuação em cada plataforma depende das regras e condições de cada canal.",
      },
      {
        kind: "list",
        id: "metadados",
        title: "Metadados e presença de catálogo",
        items: [
          "Organização das informações dos títulos.",
          "Revisão de descrições, categorias e palavras-chave.",
          "Padronização de dados.",
          "Trabalho com provedores de metadados.",
          "Identificação de inconsistências.",
          "Melhoria da apresentação dos livros nos canais.",
        ],
      },
      {
        kind: "list",
        id: "dados",
        title: "Dados e inteligência comercial",
        items: [
          "Dashboards e relatórios.",
          "Análise de vendas por título e canal.",
          "Acompanhamento de estoque e disponibilidade.",
          "Identificação de oportunidades e gargalos.",
          "Recomendações práticas a partir dos dados.",
        ],
      },
    ],
    faq: [
      {
        q: "A consultoria é só estratégica ou vocês executam?",
        a: "As duas coisas, conforme o escopo. Além do diagnóstico e do plano, podemos atuar na implementação, nas negociações e no acompanhamento dos canais.",
      },
      {
        q: "Posso contratar somente a operação comercial de um livro já publicado?",
        a: "Sim. É possível contratar apenas a operação comercial de um título ou de parte do catálogo.",
      },
      {
        q: "Vocês atuam em quais canais?",
        a: "Marketplaces como Amazon, Mercado Livre e TikTok Shop, livrarias, redes varejistas, distribuidores e plataformas de e-books e audiobooks. A presença em cada canal depende de requisitos e negociação.",
      },
      {
        q: "Como são definidos orçamento e prazo?",
        a: "Após um diagnóstico inicial, propomos o escopo, a forma de acompanhamento e o investimento conforme as prioridades da editora.",
      },
    ],
    cta: "Quero ampliar as vendas da minha editora",
    whatsappMessage: "Olá! Quero conversar sobre consultoria comercial para minha editora.",
    related: ["representacao-comercial", "comercializacao", "projetos-editoriais"],
    landing: {
      path: "/lp/consultoria-e-representacao-comercial",
      seoTitle: "Consultoria e representação comercial para editoras | LEXA Go",
      h1: "Consultoria e representação comercial para editoras",
      lead:
        "Diagnóstico, estratégia e execução comercial para editoras que querem desenvolver canais, negociar melhor e acompanhar as vendas do catálogo de perto.",
      bullets: [
        "Diagnóstico comercial e plano por título, catálogo e canal.",
        "Desenvolvimento de canais e relacionamento com compradores.",
        "Amazon, marketplaces, livrarias e distribuidores.",
      ],
    },
  },

  "representacao-comercial": {
    key: "representacao-comercial",
    path: "/representacao-comercial-de-livros",
    name: "Representação comercial de livros",
    shortName: "Representação comercial",
    seoTitle: "Representação comercial de livros para editoras | LEXA Go",
    seoDescription:
      "Representação comercial para editoras: desenvolvimento de canais, relacionamento com compradores, negociação e acompanhamento da distribuição e comercialização de livros.",
    eyebrow: "Representação comercial para editoras",
    h1: "Representação comercial de livros",
    lead:
      "A LEXA Go representa comercialmente editoras junto a canais de venda: desenvolve canais, cuida do relacionamento com compradores, negocia condições e acompanha os resultados, conforme o escopo contratado.",
    needs: [
      "Procuro representação comercial para livros.",
      "Minha editora precisa de representantes junto às livrarias e marketplaces.",
      "Quero ampliar a distribuição e a comercialização do catálogo.",
    ],
    audience: [
      {
        title: "Editoras sem equipe comercial própria",
        text: "Que precisam de uma atuação comercial contínua junto a canais e compradores.",
      },
      {
        title: "Editoras que querem novos canais",
        text: "Que já vendem, mas querem entrar em canais diferentes ou fortalecer a presença em pontos de venda.",
      },
    ],
    sections: [
      {
        kind: "list",
        id: "atuacao",
        title: "Como atuamos na representação comercial",
        items: [
          "Desenvolvimento de canais aderentes ao catálogo.",
          "Relacionamento com compradores de livrarias, redes, distribuidores e marketplaces.",
          "Apresentação de lançamentos e do catálogo.",
          "Negociação de condições comerciais.",
          "Acompanhamento de pedidos, consignação e reposição.",
          "Planejamento de presença em pontos de venda e ações de exposição.",
          "Acompanhamento comercial e relatórios de resultados.",
        ],
      },
      {
        kind: "text",
        id: "nao-e-agenciamento",
        title: "Representação comercial não é agenciamento literário",
        paragraphs: [
          "Na representação comercial, a LEXA Go atua na venda dos livros já editados: canais, compradores, pedidos e condições comerciais.",
          "Não fazemos agenciamento literário nem representação de direitos autorais, como a negociação de obras com editoras ou a venda de direitos de tradução e adaptação.",
        ],
      },
    ],
    faq: [
      {
        q: "Qual é a diferença entre representação comercial e distribuição?",
        a: "A distribuidora compra ou consigna os livros e os leva aos pontos de venda. A representação comercial cuida da relação com compradores e canais, inclusive distribuidores, para que o catálogo seja apresentado, negociado e acompanhado.",
      },
      {
        q: "Vocês representam autores independentes?",
        a: "Nossa representação comercial é voltada a editoras. Para autores com livro publicado, oferecemos a comercialização de livros, com planejamento e operação de canais.",
      },
      {
        q: "A representação garante a entrada em livrarias?",
        a: "Não. A entrada em cada canal depende de requisitos, negociação e decisão dos compradores. Nosso trabalho é apresentar o catálogo de forma adequada e conduzir a negociação.",
      },
    ],
    cta: "Quero falar sobre representação comercial",
    whatsappMessage: "Olá! Quero conversar sobre representação comercial para minha editora.",
    related: ["consultoria-comercial", "comercializacao", "projetos-editoriais"],
    landing: {
      path: "/lp/consultoria-e-representacao-comercial",
      seoTitle: "Consultoria e representação comercial para editoras | LEXA Go",
      h1: "Consultoria e representação comercial para editoras",
      lead: "",
      bullets: [],
    },
  },

  comercializacao: {
    key: "comercializacao",
    path: "/comercializacao-de-livros",
    name: "Comercialização de livros",
    shortName: "Vender meu livro",
    seoTitle: "Quero vender meu livro: comercialização e distribuição de livros | LEXA Go",
    seoDescription:
      "Como vender seu livro já publicado: canais, metadados, preço, Amazon, Mercado Livre, livrarias e acompanhamento comercial para autores e editoras.",
    eyebrow: "Comercialização de livros",
    h1: "Seu livro está pronto. Vamos colocá-lo à venda",
    lead:
      "Para quem já tem um livro publicado e quer vendê-lo melhor: definimos canais, preparamos as informações do livro e acompanhamos a operação comercial, conforme o escopo contratado.",
    needs: [
      "Quero vender meu livro.",
      "Como colocar meu livro à venda na Amazon e em outras lojas?",
      "Meu livro está publicado, mas vende pouco.",
    ],
    audience: [
      {
        title: "Autores com livro publicado",
        text: "Que querem colocar o livro à venda nos canais certos ou melhorar a forma como ele aparece nas lojas.",
      },
      {
        title: "Editoras e empresas",
        text: "Com títulos prontos que precisam de planejamento comercial, entrada em canais e acompanhamento das vendas.",
      },
    ],
    sections: [
      {
        kind: "list",
        id: "entregas",
        title: "O que pode fazer parte da comercialização",
        items: [
          "Análise do livro, do público e dos canais mais adequados.",
          "Revisão de preço e condições comerciais.",
          "Organização de metadados: título, descrição, categorias e palavras-chave.",
          "Cadastro e acompanhamento do título nos canais definidos.",
          "Operação na Amazon e no Mercado Livre, conforme o caso.",
          "Relacionamento com distribuidores e livrarias.",
          "Acompanhamento de pedidos, estoque e relatórios de desempenho.",
        ],
      },
      {
        kind: "text",
        id: "canais",
        title: "Canais físicos e digitais",
        paragraphs: [
          "Cada livro tem canais mais aderentes. Um título técnico pode ter mais espaço em marketplaces e canais especializados; um livro infantil pode depender mais de livrarias e eventos. O planejamento parte do livro e do público.",
          "A presença em cada canal depende de requisitos, negociação, disponibilidade e escopo contratado.",
        ],
      },
    ],
    faq: [
      {
        q: "Posso contratar somente a operação comercial de um livro já publicado?",
        a: "Sim. Esse é justamente o foco deste serviço.",
      },
      {
        q: "Vocês colocam meu livro em livrarias?",
        a: "Podemos apresentar o livro a livrarias e distribuidores e conduzir a negociação, mas a entrada depende da decisão de cada canal.",
      },
      {
        q: "Meu livro já está na Amazon. Vocês podem ajudar?",
        a: "Sim. Revisamos página, metadados, preço e disponibilidade do livro na Amazon e acompanhamos a operação de vendas.",
      },
    ],
    cta: "Quero vender meu livro",
    whatsappMessage: "Olá! Tenho um livro publicado e quero conversar sobre a comercialização.",
    related: ["consultoria-comercial", "representacao-comercial", "projetos-editoriais"],
    landing: {
      path: "/lp/comercializacao-de-livros",
      seoTitle: "Venda seu livro nos canais certos | LEXA Go",
      h1: "Seu livro já está publicado? Vamos trabalhar as vendas",
      lead:
        "Planejamento de canais, metadados, preço, Amazon, Mercado Livre, livrarias e acompanhamento comercial para livros já publicados.",
      bullets: [
        "Escolha dos canais mais adequados ao livro.",
        "Página do livro, metadados e preço revisados.",
        "Operação e acompanhamento das vendas.",
      ],
    },
  },
};

export const SERVICE_ORDER: ServiceKey[] = [
  "projetos-editoriais",
  "consultoria-comercial",
  "representacao-comercial",
  "comercializacao",
];

/** Páginas de campanha (anúncios). Consultoria e representação compartilham uma página. */
export const LANDINGS: { path: string; services: ServiceKey[] }[] = [
  { path: "/lp/consultoria-e-representacao-comercial", services: ["consultoria-comercial", "representacao-comercial"] },
  { path: "/lp/desenvolvimento-de-livros", services: ["projetos-editoriais"] },
  { path: "/lp/comercializacao-de-livros", services: ["comercializacao"] },
];

/** Outras frentes apresentadas na página de serviços. */
export const OTHER_FRONTS: { id: string; title: string; text: string; items: string[] }[] = [
  {
    id: "distribuicao-livrarias",
    title: "Distribuição e livrarias",
    text: "Para fortalecer a presença física do catálogo.",
    items: [
      "Desenvolvimento de relacionamento com distribuidores e livrarias.",
      "Negociação de condições comerciais.",
      "Planejamento de presença em pontos de venda.",
      "Acompanhamento de consignação e reposição.",
      "Avaliação de ações de exposição e eventos.",
      "Identificação de canais aderentes a cada catálogo.",
    ],
  },
];

export const GENERAL_FAQ: FaqItem[] = [
  {
    q: "Posso contratar apenas uma etapa?",
    a: "Sim. Uma editora pode contratar somente a operação comercial, uma pessoa autora pode contratar só o desenvolvimento do livro e um catálogo já publicado pode precisar apenas de uma estratégia de distribuição.",
  },
  {
    q: "A LEXA Go atende autores e editoras?",
    a: "Sim. Atendemos editoras e selos, autores e especialistas, e empresas e instituições que querem produzir livros.",
  },
  {
    q: "Preciso ter o livro escrito para começar?",
    a: "Não. Você pode chegar com uma ideia. A concepção e, se necessário, o ghostwriting ajudam a transformar seu conhecimento em texto.",
  },
  {
    q: "Como são definidos orçamento e prazo?",
    a: "Escopo, profissionais envolvidos, prazos e investimento são definidos conforme cada projeto, depois de uma conversa inicial. Não publicamos pacotes fechados.",
  },
];
