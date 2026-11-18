/**
 * Recebimento de leads do site (Vercel Function).
 *
 * Destinos, configurados por variáveis de ambiente na Vercel (nunca no código):
 *   LEAD_WEBHOOK_URL   URL que recebe o lead em JSON (Google Apps Script/Planilha, Make,
 *                      Zapier, n8n, RD Station, HubSpot etc.).
 *   LEAD_WEBHOOK_TOKEN (opcional) enviado no cabeçalho Authorization: Bearer.
 *   RESEND_API_KEY     (opcional) envia o lead por e-mail via Resend.
 *   LEAD_EMAIL_TO      (opcional) destinatários separados por vírgula. Padrão: as duas sócias.
 *   LEAD_EMAIL_FROM    (opcional) remetente em domínio verificado no Resend.
 *                      Padrão: "Site LEXA Go <site@lexagobr.com>".
 *
 * Só responde sucesso quando ao menos um destino confirmou o recebimento.
 * Sem destino configurado, responde 503 e o site informa que a mensagem não foi enviada.
 */

type Json = Record<string, unknown>;

const SERVICES = new Set([
  "projetos-editoriais",
  "amazon-ads",
  "ebooks",
  "consultoria-comercial",
  "representacao-comercial",
  "comercializacao",
  "outro",
]);

const DEFAULT_EMAIL_TO = "luciane@lexagobr.com,joyce@lexagobr.com";

const str = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const json = (status: number, body: Json) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });

function cleanAttribution(v: unknown) {
  if (!v || typeof v !== "object") return null;
  const out: Record<string, string> = {};
  for (const [k, val] of Object.entries(v as Json)) {
    if (/^[a-z_]{2,20}$/.test(k) && typeof val === "string") out[k] = val.slice(0, 300);
  }
  return out;
}

export async function POST(request: Request) {
  let body: Json;
  try {
    body = (await request.json()) as Json;
  } catch {
    return json(400, { ok: false, error: "Dados inválidos." });
  }

  // Campo-armadilha preenchido: provável robô. Responde sem registrar.
  if (str(body.website)) return json(200, { ok: true, id: "ignored" });

  const lead = {
    id: crypto.randomUUID(),
    recebido_em: new Date().toISOString(),
    nome: str(body.nome, 120),
    email: str(body.email, 160),
    whatsapp: str(body.whatsapp, 40),
    empresa: str(body.empresa, 160),
    servico: str(body.servico, 40),
    etapa: str(body.etapa, 80),
    mensagem: str(body.mensagem, 2000),
    pagina_origem: str(body.pagina_origem, 200),
    pagina_titulo: str(body.pagina_titulo, 200),
    origem_primeiro_acesso: cleanAttribution((body.origem as Json | undefined)?.first),
    origem_ultimo_acesso: cleanAttribution((body.origem as Json | undefined)?.last),
    user_agent: str(request.headers.get("user-agent"), 300),
  };

  if (!lead.nome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || !lead.mensagem) {
    return json(400, { ok: false, error: "Preencha nome, e-mail e a descrição da necessidade." });
  }
  if (!SERVICES.has(lead.servico)) lead.servico = "outro";

  const webhook = process.env.LEAD_WEBHOOK_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const emailTo = process.env.LEAD_EMAIL_TO || DEFAULT_EMAIL_TO;
  if (!webhook && !(resendKey && emailTo)) {
    console.error("[lead] nenhum destino configurado", { id: lead.id, servico: lead.servico });
    return json(503, { ok: false, error: "not_configured" });
  }

  const deliveries: Promise<boolean>[] = [];

  if (webhook) {
    deliveries.push(
      fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.LEAD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` } : {}),
        },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(8000),
      })
        .then((r) => {
          if (!r.ok) console.error("[lead] webhook respondeu", r.status, lead.id);
          return r.ok;
        })
        .catch((e) => {
          console.error("[lead] falha no webhook", lead.id, String(e));
          return false;
        }),
    );
  }

  if (resendKey && emailTo) {
    const o1 = lead.origem_ultimo_acesso || {};
    const text = [
      `Novo contato pelo site (${lead.servico})`,
      "",
      `Nome: ${lead.nome}`,
      `E-mail: ${lead.email}`,
      `WhatsApp: ${lead.whatsapp || "-"}`,
      `Empresa: ${lead.empresa || "-"}`,
      `Etapa: ${lead.etapa || "-"}`,
      "",
      lead.mensagem,
      "",
      `Página: ${lead.pagina_origem}`,
      `Origem: ${o1.utm_source || o1.referrer || "direto"} / ${o1.utm_medium || "-"} / ${o1.utm_campaign || "-"}`,
      `ID: ${lead.id}`,
    ].join("\n");
    deliveries.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: process.env.LEAD_EMAIL_FROM || "Site LEXA Go <site@lexagobr.com>",
          to: emailTo.split(",").map((s) => s.trim()),
          reply_to: lead.email,
          subject: `Novo contato: ${lead.nome} (${lead.servico})`,
          text,
        }),
        signal: AbortSignal.timeout(8000),
      })
        .then((r) => {
          if (!r.ok) console.error("[lead] e-mail respondeu", r.status, lead.id);
          return r.ok;
        })
        .catch((e) => {
          console.error("[lead] falha no e-mail", lead.id, String(e));
          return false;
        }),
    );
  }

  const results = await Promise.all(deliveries);
  if (!results.some(Boolean)) {
    return json(502, { ok: false, error: "Não foi possível registrar sua mensagem agora." });
  }
  return json(200, { ok: true, id: lead.id });
}

export function GET() {
  return json(405, { ok: false, error: "Método não permitido." });
}
