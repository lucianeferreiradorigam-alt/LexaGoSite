/**
 * Dados institucionais reais usados em todo o site.
 * Altere aqui para refletir em páginas, rodapé e dados estruturados.
 */
export const SITE_URL = "https://www.lexagobr.com";
export const SITE_NAME = "LEXA Go";

export const CONTACT = {
  whatsappNumber: "5511968526088",
  whatsappDisplay: "(11) 96852-6088",
  emailGeneral: "luciane@lexagobr.com",
  partners: [
    { name: "Luciane Dorigam", email: "luciane@lexagobr.com" },
    { name: "Joyce Fabris", email: "joyce@lexagobr.com" },
  ],
};

export const SOCIAL = {
  // Preencha quando os perfis oficiais forem confirmados (ex.: Instagram, LinkedIn).
  sameAs: [] as string[],
};

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-lexago.jpg`;

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${CONTACT.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function absoluteUrl(path: string) {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}
