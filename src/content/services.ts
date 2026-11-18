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
  | "amazon-ads"
  | "ebooks"
  | "consultoria-comercial"
  | "representacao-comercial"
  | "comercializacao";

/** Opções do campo "assunto" do formulário. */
export const FORM_SERVICES: { value: ServiceKey | "outro"; label: string }[] = [
  { value: "projetos-editoriais", label: "Desenvolver um livro (escrita, ghostwriting, produção)" },
  { value: "comercializacao", label: "Vender um livro já publicado" },
  { value: "consultoria-comercial", label: "Consultoria comercial para editora" },
  { value: "representacao-comercial", label: "Representação comercial de livros" },
  { value: "amazon-ads", label: "Amazon Ads: anunciar livros na Amazon" },
  { value: "ebooks", label: "Converter livro em e-book" },
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
              "Avaliação de oportunidades para e-book e audiobook.",
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
              "Campanhas de Amazon Ads.",
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
    related: ["comercializacao", "ebooks", "amazon-ads"],
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

  "amazon-ads": {
    key: "amazon-ads",
    path: "/amazon-ads-para-livros",
    name: "Amazon Ads: publicidade para livros na Amazon",
    shortName: "Amazon Ads",
    seoTitle: "Amazon Ads para livros: anúncios e gestão de campanhas na Amazon | LEXA Go",
    seoDescription:
      "Gestão de Amazon Ads para editoras e autores: diagnóstico, seleção de títulos, palavras-chave, campanhas, otimização e relatórios para divulgar livros na Amazon.",
    eyebrow: "Publicidade para livros",
    h1: "Amazon Ads: publicidade para livros na Amazon",
    lead:
      "Coloque seus livros diante de leitores que estão buscando o que ler. Planejamos, gerenciamos e acompanhamos campanhas dentro da Amazon, com decisões orientadas pelos objetivos do catálogo, pelos dados disponíveis e pela viabilidade comercial de cada título.",
    needs: [
      "Como divulgar meu livro na Amazon?",
      "Quero anunciar os livros da minha editora.",
      "Já anuncio, mas não sei se o investimento está funcionando.",
    ],
    audience: [
      {
        title: "Editoras",
        text: "Que querem ampliar a visibilidade do catálogo na Amazon e trabalhar as vendas dos títulos com prioridade comercial.",
      },
      {
        title: "Autores",
        text: "Com livros à venda na Amazon que desejam divulgar a obra para leitores interessados no tema.",
      },
    ],
    sections: [
      {
        kind: "list",
        id: "entregas",
        title: "O que faz parte da gestão de Amazon Ads",
        items: [
          "Diagnóstico dos títulos e da conta.",
          "Definição de objetivos e orçamento.",
          "Seleção de livros para anunciar.",
          "Pesquisa de palavras-chave e oportunidades de segmentação.",
          "Estruturação de campanhas nos formatos disponíveis para a conta.",
          "Acompanhamento de investimento, lances e desempenho.",
          "Otimização de campanhas e termos de busca.",
          "Análise de vendas atribuídas e indicadores de eficiência.",
          "Relatórios com interpretação dos resultados e próximos passos.",
          "Recomendações sobre páginas dos livros, preço, disponibilidade e metadados.",
        ],
      },
      {
        kind: "list",
        id: "diferenciais",
        title: "Por que a gestão com a LEXA Go é diferente",
        items: [
          "Conhecimento do mercado editorial.",
          "Visão conjunta de publicidade, catálogo e operação comercial.",
          "Escolha dos títulos considerando seus objetivos e condições de venda.",
          "Acompanhamento para orientar ajustes no investimento.",
        ],
      },
      {
        kind: "text",
        id: "como-funciona",
        title: "Como funciona",
        paragraphs: [
          "Começamos pelo diagnóstico da conta e dos títulos. Em seguida, definimos objetivos, orçamento e quais livros anunciar. As campanhas são estruturadas e acompanhadas de perto, com ajustes de lances, termos e investimento ao longo do tempo.",
          "Você recebe relatórios que explicam o que aconteceu e quais são os próximos passos, incluindo recomendações sobre a página do livro, preço e disponibilidade, que também influenciam o desempenho dos anúncios.",
        ],
      },
    ],
    notes: [
      "A verba de mídia, paga diretamente à Amazon, é separada da remuneração pela gestão.",
      "Os recursos disponíveis dependem da elegibilidade e das condições da conta.",
      "Os resultados variam conforme demanda, preço, página do produto, concorrência e disponibilidade.",
    ],
    faq: [
      {
        q: "Como funciona a gestão de Amazon Ads?",
        a: "Analisamos a conta e os títulos, definimos objetivos e orçamento, estruturamos as campanhas e acompanhamos o desempenho com ajustes contínuos e relatórios.",
      },
      {
        q: "O investimento em anúncios está incluído na gestão?",
        a: "Não. A verba de mídia é paga diretamente à Amazon e é separada da remuneração pelo trabalho de gestão.",
      },
      {
        q: "Autores independentes podem contratar?",
        a: "Sim, desde que o livro esteja à venda na Amazon e a conta tenha acesso aos recursos de anúncio. Avaliamos cada caso no diagnóstico.",
      },
      {
        q: "Vocês garantem aumento de vendas?",
        a: "Não. Os resultados dependem de fatores como demanda, preço, página do produto, concorrência e disponibilidade. Nosso trabalho é usar o investimento com critério e mostrar com clareza o que os dados indicam.",
      },
      {
        q: "Qual é o orçamento mínimo?",
        a: "O orçamento é definido com você conforme os objetivos, o número de títulos e a fase do catálogo. Conversamos sobre isso no diagnóstico.",
      },
    ],
    cta: "Quero anunciar meus livros",
    whatsappMessage: "Olá! Quero conversar sobre Amazon Ads para os meus livros.",
    related: ["comercializacao", "consultoria-comercial", "ebooks"],
    landing: {
      path: "/lp/amazon-ads",
      seoTitle: "Gestão de Amazon Ads para livros | LEXA Go",
      h1: "Gestão de Amazon Ads para editoras e autores",
      lead:
        "Planejamos, gerenciamos e acompanhamos campanhas de anúncios de livros na Amazon, com escolha criteriosa dos títulos e relatórios que explicam os próximos passos.",
      bullets: [
        "Diagnóstico da conta e seleção dos títulos para anunciar.",
        "Palavras-chave, campanhas, lances e otimização contínua.",
        "Relatórios com interpretação dos resultados.",
      ],
    },
  },

  ebooks: {
    key: "ebooks",
    path: "/conversao-de-livros-em-ebook",
    name: "Conversão de arquivos em e-books",
    shortName: "Conversão em e-book",
    seoTitle: "Conversão de livros em e-book: Word, PDF e InDesign para EPUB | LEXA Go",
    seoDescription:
      "Converta seu livro em e-book EPUB pronto para publicação: layout fluido ou fixo, sumário navegável, imagens, notas, metadados e testes de leitura. Para autores e editoras.",
    eyebrow: "Produção de e-books",
    h1: "Transforme seu arquivo em um e-book pronto para publicação",
    lead:
      "A LEXA Go converte originais e arquivos de livros em e-books, com atenção à organização do conteúdo, à leitura em diferentes dispositivos e aos requisitos dos canais de distribuição.",
    needs: [
      "Quero converter meu livro em e-book.",
      "Tenho o livro em Word ou PDF. Como faço um EPUB?",
      "Minha editora quer levar o catálogo para o digital.",
    ],
    audience: [
      {
        title: "Autores",
        text: "Com o livro em Word, PDF ou arquivo de diagramação que desejam publicar também em formato digital.",
      },
      {
        title: "Editoras",
        text: "Que querem converter títulos do catálogo e preparar os arquivos para os canais de e-book.",
      },
    ],
    sections: [
      {
        kind: "list",
        id: "entregas",
        title: "O que pode fazer parte da conversão",
        items: [
          "Avaliação dos arquivos de origem, como Word, PDF e arquivos de diagramação.",
          "Conversão para EPUB.",
          "Definição entre layout fluido e fixo, conforme o conteúdo e os canais de destino.",
          "Adaptação de imagens, tabelas, notas e demais elementos.",
          "Organização de capítulos, sumário navegável e links.",
          "Inclusão de capa e metadados.",
          "Verificação técnica e testes de leitura.",
          "Orientação ou apoio para distribuição e comercialização, conforme a contratação.",
        ],
      },
      {
        kind: "compare",
        id: "layout",
        title: "Layout fluido ou layout fixo?",
        intro: "A escolha depende do tipo de livro e dos canais em que ele será vendido.",
        columns: [
          {
            title: "Layout fluido",
            text: "O texto se adapta à tela e permite ajustes de tamanho de fonte. É o formato mais comum para livros de texto corrido.",
          },
          {
            title: "Layout fixo",
            text: "Preserva a composição das páginas. Pode ser indicado para obras em que a organização visual é essencial, como livros ilustrados, conforme a compatibilidade dos canais.",
          },
        ],
      },
      {
        kind: "text",
        id: "conversao-x-exportacao",
        title: "Conversão não é apenas exportar o arquivo",
        paragraphs: [
          "Exportar um PDF ou um documento de Word para EPUB costuma gerar quebras estranhas, sumário sem links, imagens desproporcionais e notas fora do lugar.",
          "Na conversão, o conteúdo é reorganizado para o formato digital: capítulos, hierarquia de títulos, notas, imagens e links são tratados um a um e testados em leitura. O objetivo é entregar uma experiência adequada ao conteúdo.",
        ],
      },
    ],
    faq: [
      {
        q: "Quais arquivos posso enviar?",
        a: "Word, PDF e arquivos de diagramação, como InDesign. Avaliamos o material antes de definir o escopo, porque a qualidade do arquivo de origem influencia o trabalho.",
      },
      {
        q: "Vocês publicam o e-book nas lojas?",
        a: "Conforme a contratação, podemos orientar ou apoiar a distribuição e a comercialização do e-book nos canais definidos.",
      },
      {
        q: "Vocês trabalham com audiobooks?",
        a: "Sim. Avaliamos oportunidades de audiobook para catálogos e coordenamos a produção com parceiros, conforme o projeto.",
      },
      {
        q: "Quanto tempo leva?",
        a: "Depende do tamanho do livro, da complexidade dos elementos e do formato escolhido. O prazo é informado após a avaliação dos arquivos.",
      },
    ],
    cta: "Quero converter meu livro em e-book",
    whatsappMessage: "Olá! Quero converter meu livro em e-book.",
    proof: { numero: "+2.000", texto: "e-books produzidos pela LEXA Go para o catálogo do CEDET." },
    related: ["comercializacao", "projetos-editoriais", "amazon-ads"],
    landing: {
      path: "/lp/conversao-de-ebooks",
      seoTitle: "Converta seu livro em e-book EPUB | LEXA Go",
      h1: "Transforme seu arquivo em um e-book pronto para publicação",
      lead:
        "Convertemos Word, PDF e arquivos de diagramação em EPUB, com sumário navegável, imagens e notas adaptadas, metadados e testes de leitura.",
      bullets: [
        "Layout fluido ou fixo, conforme o livro e os canais.",
        "Capítulos, links, imagens, tabelas e notas tratados um a um.",
        "Apoio para distribuição, conforme a contratação.",
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
    related: ["representacao-comercial", "amazon-ads", "comercializacao"],
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
    related: ["consultoria-comercial", "comercializacao", "amazon-ads"],
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
          "Campanhas de Amazon Ads.",
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
        a: "Sim. Revisamos página, metadados, preço e disponibilidade e avaliamos campanhas de Amazon Ads.",
      },
    ],
    cta: "Quero vender meu livro",
    whatsappMessage: "Olá! Tenho um livro publicado e quero conversar sobre a comercialização.",
    related: ["amazon-ads", "ebooks", "consultoria-comercial"],
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
  "amazon-ads",
  "consultoria-comercial",
  "representacao-comercial",
  "comercializacao",
  "ebooks",
];

/** Páginas de campanha (anúncios). Consultoria e representação compartilham uma página. */
export const LANDINGS: { path: string; services: ServiceKey[] }[] = [
  { path: "/lp/consultoria-e-representacao-comercial", services: ["consultoria-comercial", "representacao-comercial"] },
  { path: "/lp/desenvolvimento-de-livros", services: ["projetos-editoriais"] },
  { path: "/lp/comercializacao-de-livros", services: ["comercializacao"] },
  { path: "/lp/amazon-ads", services: ["amazon-ads"] },
  { path: "/lp/conversao-de-ebooks", services: ["ebooks"] },
];

/** Outras frentes apresentadas na página de serviços. */
export const OTHER_FRONTS: { id: string; title: string; text: string; items: string[] }[] = [
  {
    id: "ebooks-audiobooks",
    title: "E-books e audiobooks para catálogos",
    text: "Para editoras que querem ampliar o catálogo digital.",
    items: [
      "Análise do catálogo para identificar oportunidades.",
      "Priorização de títulos para conversão.",
      "Coordenação da produção com parceiros.",
      "Estruturação de distribuição digital.",
      "Acompanhamento comercial.",
      "Análise de desempenho e oportunidades de licenciamento.",
    ],
  },
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
    a: "Sim. Uma editora pode contratar somente a operação comercial, uma pessoa autora pode contratar só o desenvolvimento do livro e um catálogo já publicado pode precisar apenas de Amazon Ads ou de uma estratégia de distribuição.",
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
    q: "Vocês trabalham com e-books e audiobooks?",
    a: "Sim. Convertemos arquivos em e-books e avaliamos oportunidades de audiobook, coordenando a produção com parceiros conforme o projeto.",
  },
  {
    q: "O investimento em anúncios está incluído na gestão de Amazon Ads?",
    a: "Não. A verba de mídia é paga diretamente à Amazon e é separada da remuneração pela gestão.",
  },
  {
    q: "Como são definidos orçamento e prazo?",
    a: "Escopo, profissionais envolvidos, prazos e investimento são definidos conforme cada projeto, depois de uma conversa inicial. Não publicamos pacotes fechados.",
  },
];
