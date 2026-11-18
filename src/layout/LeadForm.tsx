import { FormEvent, useEffect, useId, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { EDITORIAL_STAGES, FORM_SERVICES, type ServiceKey } from "@/content/services";
import { getAttribution, trackLead } from "@/lib/tracking";
import { WhatsAppLink } from "./ContactLinks";

type Props = {
  /** Quando a página já indica o serviço, o campo não é exibido. */
  service?: ServiceKey;
  submitLabel?: string;
  title?: string;
  compact?: boolean;
};

type Status = { state: "idle" } | { state: "sending" } | { state: "success" } | { state: "error"; message: string };

const inputCls =
  "mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2.5 text-base text-foreground shadow-sm placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

const LeadForm = ({ service, submitLabel = "Enviar", title, compact }: Props) => {
  const id = useId();
  const location = useLocation();
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [chosenService, setChosenService] = useState<string>(service ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Permite links como /contato?assunto=comercializacao
  useEffect(() => {
    if (service) return;
    const q = new URLSearchParams(window.location.search).get("assunto");
    if (q && FORM_SERVICES.some((s) => s.value === q)) setChosenService(q);
  }, [service]);

  const showStage = chosenService === "projetos-editoriais";
  const serviceLabel = FORM_SERVICES.find((s) => s.value === chosenService)?.label;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    const nextErrors: Record<string, string> = {};
    if (!data.nome?.trim()) nextErrors.nome = "Informe seu nome.";
    if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
      nextErrors.email = "Informe um e-mail válido.";
    if (!chosenService) nextErrors.servico = "Escolha o assunto.";
    if (!data.mensagem?.trim()) nextErrors.mensagem = "Conte brevemente o que você precisa.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`);
      first?.focus();
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          servico: chosenService,
          pagina_origem: location.pathname,
          pagina_titulo: typeof document !== "undefined" ? document.title : "",
          origem: getAttribution(),
        }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; id?: string; error?: string };
      if (res.ok && body.ok) {
        setStatus({ state: "success" });
        trackLead({ service: chosenService, lead_id: body.id }, { email: data.email, phone: data.whatsapp });
        form.reset();
      } else {
        setStatus({
          state: "error",
          message:
            res.status === 503
              ? "O formulário está temporariamente indisponível. Sua mensagem não foi enviada."
              : body.error || "Não foi possível enviar sua mensagem. Sua mensagem não foi enviada.",
        });
      }
    } catch {
      setStatus({ state: "error", message: "Falha de conexão. Sua mensagem não foi enviada." });
    }
  }

  if (status.state === "success") {
    return (
      <div role="status" className="rounded-2xl border border-accent/30 bg-background p-6">
        <CheckCircle2 className="h-8 w-8 text-accent" aria-hidden />
        <p className="mt-3 text-xl font-semibold">Recebemos sua mensagem.</p>
        <p className="mt-2 text-muted-foreground">
          Vamos responder pelo e-mail informado em breve. Se preferir adiantar a conversa, chame no WhatsApp.
        </p>
        <WhatsAppLink className="mt-4" service={chosenService} />
      </div>
    );
  }

  const err = (name: string) =>
    errors[name] ? (
      <p id={`${id}-${name}-erro`} className="mt-1 text-sm font-medium text-destructive">
        {errors[name]}
      </p>
    ) : null;
  const aria = (name: string) =>
    errors[name] ? { "aria-invalid": true, "aria-describedby": `${id}-${name}-erro` } : {};

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-6" aria-labelledby={title ? `${id}-titulo` : undefined}>
      {title && (
        <h2 id={`${id}-titulo`} className="mb-1 text-2xl">
          {title}
        </h2>
      )}
      <p className="mb-5 text-sm text-muted-foreground">Leva menos de um minuto. Respondemos por e-mail ou WhatsApp.</p>

      <div className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor={`${id}-nome`} className="text-sm font-semibold">Nome</label>
          <input id={`${id}-nome`} name="nome" autoComplete="name" required className={inputCls} {...aria("nome")} />
          {err("nome")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="text-sm font-semibold">E-mail</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required className={inputCls} {...aria("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor={`${id}-whatsapp`} className="text-sm font-semibold">
            WhatsApp <span className="font-normal text-muted-foreground">(opcional)</span>
          </label>
          <input id={`${id}-whatsapp`} name="whatsapp" type="tel" autoComplete="tel" inputMode="tel" className={inputCls} />
        </div>
        <div>
          <label htmlFor={`${id}-empresa`} className="text-sm font-semibold">
            Empresa ou editora <span className="font-normal text-muted-foreground">(opcional)</span>
          </label>
          <input id={`${id}-empresa`} name="empresa" autoComplete="organization" className={inputCls} />
        </div>

        {service ? (
          <p className={`${compact ? "" : "sm:col-span-2"} text-sm text-muted-foreground`}>
            Assunto: <span className="font-semibold text-foreground">{serviceLabel}</span>
          </p>
        ) : (
          <div className={compact ? "" : "sm:col-span-2"}>
            <label htmlFor={`${id}-servico`} className="text-sm font-semibold">Como podemos ajudar?</label>
            <select
              id={`${id}-servico`}
              name="servico"
              value={chosenService}
              onChange={(e) => setChosenService(e.target.value)}
              className={inputCls}
              {...aria("servico")}
            >
              <option value="">Escolha uma opção</option>
              {FORM_SERVICES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            {err("servico")}
          </div>
        )}

        {showStage && (
          <fieldset className={compact ? "" : "sm:col-span-2"}>
            <legend className="text-sm font-semibold">Em que etapa você está? <span className="font-normal text-muted-foreground">(opcional)</span></legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {EDITORIAL_STAGES.map((s) => (
                <label key={s} className="flex cursor-pointer items-center gap-2 rounded-md border border-input px-3 py-2 text-sm has-[:checked]:border-accent has-[:checked]:bg-accent/5">
                  <input type="radio" name="etapa" value={s} className="accent-[hsl(var(--accent))]" />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor={`${id}-mensagem`} className="text-sm font-semibold">Conte brevemente o que você precisa</label>
          <textarea id={`${id}-mensagem`} name="mensagem" rows={4} maxLength={2000} className={inputCls} {...aria("mensagem")} />
          {err("mensagem")}
        </div>

        {/* Campo-armadilha contra spam: invisível para pessoas. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${id}-site`}>Não preencha</label>
          <input id={`${id}-site`} name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status.state === "error" && (
        <div role="alert" className="mt-5 rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">
          <p className="flex items-start gap-2 font-semibold text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {status.message}
          </p>
          <p className="mt-2 text-foreground/80">Tente novamente em instantes ou fale conosco diretamente:</p>
          <WhatsAppLink className="mt-2" service={chosenService} />
        </div>
      )}

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90 disabled:opacity-60 sm:w-auto"
      >
        {status.state === "sending" ? "Enviando..." : submitLabel}
      </button>
      <p className="mt-3 text-xs text-muted-foreground">
        Usamos seus dados apenas para responder ao seu contato. Veja a{" "}
        <a href="/privacidade" className="underline">política de privacidade</a>.
      </p>
    </form>
  );
};

export default LeadForm;
