import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getConsent, hasTrackingConfigured, loadMarketingTags, setConsent } from "@/lib/tracking";

/** Só aparece quando há alguma ferramenta de mensuração configurada. */
const ConsentBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!hasTrackingConfigured()) return;
    const c = getConsent();
    if (c === null) setVisible(true);
    else if (c === "granted") loadMarketingTags();
  }, []);

  if (!visible) return null;

  const choose = (choice: "granted" | "denied") => {
    setConsent(choice);
    setVisible(false);
  };

  return (
    <div role="dialog" aria-live="polite" aria-label="Preferências de cookies" className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background p-4 shadow-2xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-foreground/90">
          Usamos cookies do Google e da Meta para medir visitas e anúncios. Ao enviar um formulário com cookies aceitos,
          e-mail e telefone são compartilhados com o Google de forma criptografada para medir anúncios. Você pode aceitar
          ou recusar. <Link to="/privacidade" className="underline">Política de privacidade</Link>.
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => choose("denied")} className="rounded-md border border-border px-4 py-2 text-sm font-semibold">
            Recusar
          </button>
          <button type="button" onClick={() => choose("granted")} className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;
