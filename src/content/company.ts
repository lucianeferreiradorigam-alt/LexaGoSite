/**
 * Informações institucionais e provas de experiência.
 * Publique aqui somente dados reais e aprovados para uso público.
 */

export const PARTNERS_STATEMENT =
  "A LEXA Go é liderada por Luciane Dorigam e Joyce Fabris, sócias com ampla vivência no setor e mais de 20 anos de experiência no mercado editorial e livreiro. Essa experiência conecta desenvolvimento de livros, estratégia comercial, canais de venda e execução.";

export const PARTNERS = [
  {
    name: "Luciane Dorigam",
    role: "Sócia",
    bio: "Atuação em compras, vendas, marketing, comércio eletrônico e logística no mercado editorial.",
    email: "luciane@lexagobr.com",
  },
  {
    name: "Joyce Fabris",
    role: "Sócia",
    bio: "Atuação em estratégia comercial de editoras, com foco em planos de crescimento para livros físicos e digitais e na expansão de canais de distribuição.",
    email: "joyce@lexagobr.com",
  },
];

/** Lista que já estava publicada no site. Confirmar aprovação antes de ampliar. */
export const SHOW_CLIENTS = true;
export const CLIENTS = ["CEDET", "CNBB", "GEMA Editora", "Valete", "Intelítera", "Vida & Consciência"];

/**
 * Depoimentos e resultados: deixe vazio até haver material aprovado e verificável.
 * Formato: { texto, autor, cargo, empresa }.
 */
export const TESTIMONIALS: { texto: string; autor: string; cargo?: string; empresa?: string }[] = [];
