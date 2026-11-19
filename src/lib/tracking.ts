/**
 * Mensuração e origem dos contatos.
 *
 * - Registra a origem da visita (UTM, gclid, fbclid, referência e página de entrada)
 *   no primeiro e no último acesso, para anexar aos formulários.
 * - Dispara eventos no dataLayer. A tag do Google Ads (gtag.js, AW-) fica no <head> do
 *   index.html, em todas as páginas, com Consent Mode: sem cookies até o visitante aceitar.
 *   GA4 e Meta Pixel só são ativados quando há ID configurado E consentimento do visitante.
 * - Cliques em qualquer link de WhatsApp (wa.me, api.whatsapp.com, web.whatsapp.com) ou
 *   e-mail (mailto:) do site são medidos por um único ouvinte global (installContactClickTracking).
 * - "contact_click" (clique em WhatsApp ou e-mail) é diferente de "generate_lead"
 *   (formulário recebido com sucesso pelo servidor). Erros nunca viram conversão.
 */

const ATTR_FIRST = "lexa_attr_first";
const ATTR_LAST = "lexa_attr_last";
const CONSENT_KEY = "lexa_consent";

const ATTR_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
] as const;

export type Attribution = Partial<Record<(typeof ATTR_PARAMS)[number], string>> & {
  referrer?: string;
  landing_page?: string;
  captured_at?: string;
};

export const TRACKING_IDS = {
  // ID público do GA4 da LEXA Go. VITE_GA4_ID na Vercel substitui, se necessário.
  ga4: (import.meta.env.VITE_GA4_ID as string | undefined) || "G-943RQFF132",
  // Google Ads (conta 811-562-7607): ID e rótulos das conversões são públicos (aparecem na página).
  // As variáveis VITE_GOOGLE_ADS_* na Vercel substituem estes valores, se necessário.
  googleAds: (import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined) || "AW-18581330039",
  googleAdsLeadLabel: (import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL as string | undefined) || "-QHOCMOEt7odEPewopxF",
  googleAdsContactLabel: (import.meta.env.VITE_GOOGLE_ADS_CONTACT_LABEL as string | undefined) || "8VV4CMaEt7odEPewopxF",
  // ID público do Meta Pixel da LEXA Go. VITE_META_PIXEL_ID na Vercel substitui, se necessário.
  metaPixel: (import.meta.env.VITE_META_PIXEL_ID as string | undefined) || "2542404786282497",
};

export const hasTrackingConfigured = () =>
  Boolean(TRACKING_IDS.ga4 || TRACKING_IDS.googleAds || TRACKING_IDS.metaPixel);

function safeGet(storage: Storage | undefined, key: string): string | null {
  try {
    return storage ? storage.getItem(key) : null;
  } catch {
    return null;
  }
}

function safeSet(storage: Storage | undefined, key: string, value: string) {
  try {
    storage?.setItem(key, value);
  } catch {
    /* navegação privada ou armazenamento bloqueado */
  }
}

const local = () => (typeof window !== "undefined" ? window.localStorage : undefined);

/** Chamado a cada carregamento de página no navegador. */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const current: Attribution = {};
  ATTR_PARAMS.forEach((p) => {
    const v = params.get(p);
    if (v) current[p] = v.slice(0, 200);
  });

  const externalReferrer =
    document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";

  const hasCampaign = Object.keys(current).length > 0;
  if (!hasCampaign && !externalReferrer && safeGet(local(), ATTR_LAST)) return;

  const record: Attribution = {
    ...current,
    referrer: externalReferrer || undefined,
    landing_page: window.location.pathname + window.location.search,
    captured_at: new Date().toISOString(),
  };
  if (!safeGet(local(), ATTR_FIRST)) safeSet(local(), ATTR_FIRST, JSON.stringify(record));
  safeSet(local(), ATTR_LAST, JSON.stringify(record));
}

export function getAttribution(): { first: Attribution | null; last: Attribution | null } {
  const parse = (k: string) => {
    const raw = safeGet(local(), k);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Attribution;
    } catch {
      return null;
    }
  };
  return { first: parse(ATTR_FIRST), last: parse(ATTR_LAST) };
}

/* ---------------- Consentimento ---------------- */

export type ConsentChoice = "granted" | "denied";

export function getConsent(): ConsentChoice | null {
  const v = safeGet(local(), CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

export function setConsent(choice: ConsentChoice) {
  safeSet(local(), CONSENT_KEY, choice);
  if (choice === "granted") loadMarketingTags();
}

/* ---------------- Tags externas ---------------- */

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: Gtag;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean };
    _fbq?: unknown;
  }
}

let tagsLoaded = false;

function injectScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function loadMarketingTags() {
  if (typeof window === "undefined" || tagsLoaded) return;
  if (!hasTrackingConfigured() || getConsent() !== "granted") return;
  tagsLoaded = true;

  const { ga4, googleAds, metaPixel } = TRACKING_IDS;
  window.dataLayer = window.dataLayer || [];

  if (ga4 || googleAds) {
    const granted = {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    };
    if (window.gtag) {
      // Caminho normal: a tag do Google já foi carregada no <head> (index.html).
      // Só libera o consentimento e liga o GA4; não carrega o gtag.js de novo.
      window.gtag("consent", "update", granted);
      if (ga4) window.gtag("config", ga4, { allow_enhanced_conversions: true });
    } else {
      // Reserva, caso a tag do <head> não exista.
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };
      window.gtag("consent", "default", granted);
      window.gtag("js", new Date());
      if (ga4) window.gtag("config", ga4, { allow_enhanced_conversions: true });
      if (googleAds) window.gtag("config", googleAds);
      injectScript(`https://www.googletagmanager.com/gtag/js?id=${ga4 || googleAds}`);
    }
  }

  if (metaPixel) {
    const fbq = function (...args: unknown[]) {
      const f = fbq as unknown as { callMethod?: (...a: unknown[]) => void; queue: unknown[] };
      if (f.callMethod) f.callMethod(...args);
      else f.queue.push(args);
    } as Window["fbq"] & { queue: unknown[]; loaded: boolean; version: string; push: unknown };
    fbq!.queue = [];
    fbq!.loaded = true;
    fbq!.version = "2.0";
    fbq!.push = fbq;
    // O PageView de navegação interna é enviado por trackPageView; evita duplicar.
    (fbq as unknown as { disablePushState: boolean }).disablePushState = true;
    window.fbq = fbq;
    window._fbq = fbq;
    injectScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq!("init", metaPixel);
    window.fbq!("track", "PageView");
  }
}

/** Registra mudança de página em navegação interna (SPA). */
export function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "page_view_virtual", page_path: path });
  if (!tagsLoaded) return;
  // GA4: as mudanças de página são medidas pela "medição otimizada" (histórico do navegador),
  // ativa por padrão na propriedade. Não enviamos page_view manual para não duplicar.
  if (window.fbq) window.fbq("track", "PageView");
}

type EventParams = { service?: string; page?: string; method?: string; [k: string]: unknown };

function pushEvent(name: string, params: EventParams) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...params });
}

/** Clique em canal de contato. Não é lead recebido. */
export function trackContactClick(method: "whatsapp" | "email", params: EventParams = {}) {
  const page = typeof window !== "undefined" ? window.location.pathname : undefined;
  const data = { method, page, ...params };
  pushEvent("contact_click", data);
  // Conversão do Google Ads "Clique no WhatsApp ou e-mail": a tag está em todas as páginas;
  // sem consentimento, o próprio Consent Mode envia a medição sem cookies.
  if (window.gtag && TRACKING_IDS.googleAds && TRACKING_IDS.googleAdsContactLabel) {
    window.gtag("event", "conversion", {
      send_to: `${TRACKING_IDS.googleAds}/${TRACKING_IDS.googleAdsContactLabel}`,
    });
  }
  if (!tagsLoaded) return;
  if (window.gtag && TRACKING_IDS.ga4) window.gtag("event", "contact_click", { ...data, send_to: TRACKING_IDS.ga4 });
  if (window.fbq) window.fbq("track", "Contact", { method });
}

/** Telefone no formato E.164 exigido pelas conversões otimizadas (assume Brasil se faltar o DDI). */
function toE164(phone?: string) {
  const d = (phone || "").replace(/\D/g, "");
  if (!d) return undefined;
  if (d.startsWith("55") && d.length >= 12) return `+${d}`;
  if (d.length === 10 || d.length === 11) return `+55${d}`;
  return undefined;
}

/**
 * Lead efetivamente recebido (resposta de sucesso do servidor).
 * Com consentimento, envia e-mail e telefone ao Google como user_data para as conversões
 * otimizadas; a própria tag do Google aplica hash (SHA-256) antes do envio.
 */
export function trackLead(params: EventParams & { lead_id?: string }, user?: { email?: string; phone?: string }) {
  const page = typeof window !== "undefined" ? window.location.pathname : undefined;
  const data = { page, ...params };
  pushEvent("generate_lead", data);
  // E-mail e telefone (conversões otimizadas) só vão ao Google com consentimento.
  if (tagsLoaded && window.gtag && user?.email) {
    const phone = toE164(user.phone);
    window.gtag("set", "user_data", {
      email: user.email.trim().toLowerCase(),
      ...(phone ? { phone_number: phone } : {}),
    });
  }
  // Conversão do Google Ads "Formulário do site (lead)": só é chamada após resposta de sucesso.
  if (window.gtag && TRACKING_IDS.googleAds && TRACKING_IDS.googleAdsLeadLabel) {
    window.gtag("event", "conversion", {
      send_to: `${TRACKING_IDS.googleAds}/${TRACKING_IDS.googleAdsLeadLabel}`,
      transaction_id: params.lead_id,
    });
  }
  if (!tagsLoaded) return;
  if (window.gtag && TRACKING_IDS.ga4) window.gtag("event", "generate_lead", { ...data, send_to: TRACKING_IDS.ga4 });
  if (window.fbq) window.fbq("track", "Lead", { content_category: params.service }, { eventID: params.lead_id });
}

/* ---------------- Cliques em WhatsApp e e-mail (site inteiro) ---------------- */

const WHATSAPP_RE = /^https?:\/\/(?:[\w-]+\.)*(?:wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)(?:[/?#:]|$)/i;

/** Identifica se um link é de WhatsApp ou de e-mail. */
export function contactMethodForHref(href: string | null | undefined): "whatsapp" | "email" | null {
  const h = (href || "").trim();
  if (/^mailto:/i.test(h)) return "email";
  if (WHATSAPP_RE.test(h)) return "whatsapp";
  return null;
}

let clickTrackingInstalled = false;

/**
 * Um único ouvinte no documento (fase de captura, antes de o link abrir) mede todo clique
 * em link de WhatsApp ou e-mail, inclusive rodapé, botões e links dentro dos conteúdos.
 */
export function installContactClickTracking() {
  if (typeof document === "undefined" || clickTrackingInstalled) return;
  clickTrackingInstalled = true;
  const handler = (e: MouseEvent) => {
    if (e.type === "auxclick" && e.button !== 1) return;
    const target = e.target as Element | null;
    const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
    if (!link) return;
    const method = contactMethodForHref(link.getAttribute("href"));
    if (!method) return;
    trackContactClick(method, link.dataset.service ? { service: link.dataset.service } : {});
  };
  document.addEventListener("click", handler, true);
  document.addEventListener("auxclick", handler, true);
}
