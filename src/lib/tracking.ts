/**
 * Mensuração e origem dos contatos.
 *
 * - Registra a origem da visita (UTM, gclid, fbclid, referência e página de entrada)
 *   no primeiro e no último acesso, para anexar aos formulários.
 * - Dispara eventos no dataLayer. Ferramentas externas (GA4, Google Ads, Meta Pixel)
 *   só são carregadas quando há ID configurado E consentimento do visitante.
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
  // Google Ads (811-562-7607) está vinculado à mesma tag do Google (G-943RQFF132).
  // Preencha VITE_GOOGLE_ADS_ID (AW-...) apenas se for usar conversões diretas do Ads.
  googleAds: import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined,
  googleAdsLeadLabel: import.meta.env.VITE_GOOGLE_ADS_LEAD_LABEL as string | undefined,
  googleAdsContactLabel: import.meta.env.VITE_GOOGLE_ADS_CONTACT_LABEL as string | undefined,
  metaPixel: import.meta.env.VITE_META_PIXEL_ID as string | undefined,
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
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("consent", "default", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    window.gtag("js", new Date());
    if (ga4) window.gtag("config", ga4, { allow_enhanced_conversions: true });
    if (googleAds) window.gtag("config", googleAds);
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${ga4 || googleAds}`);
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
  if (!tagsLoaded) return;
  if (window.gtag && TRACKING_IDS.ga4) window.gtag("event", "contact_click", data);
  if (window.gtag && TRACKING_IDS.googleAds && TRACKING_IDS.googleAdsContactLabel) {
    window.gtag("event", "conversion", {
      send_to: `${TRACKING_IDS.googleAds}/${TRACKING_IDS.googleAdsContactLabel}`,
    });
  }
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
  if (!tagsLoaded) return;
  if (window.gtag && user?.email) {
    const phone = toE164(user.phone);
    window.gtag("set", "user_data", {
      email: user.email.trim().toLowerCase(),
      ...(phone ? { phone_number: phone } : {}),
    });
  }
  if (window.gtag && TRACKING_IDS.ga4) window.gtag("event", "generate_lead", data);
  if (window.gtag && TRACKING_IDS.googleAds && TRACKING_IDS.googleAdsLeadLabel) {
    window.gtag("event", "conversion", {
      send_to: `${TRACKING_IDS.googleAds}/${TRACKING_IDS.googleAdsLeadLabel}`,
      transaction_id: params.lead_id,
    });
  }
  if (window.fbq) window.fbq("track", "Lead", { content_category: params.service }, { eventID: params.lead_id });
}
