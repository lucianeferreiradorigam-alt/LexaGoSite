import { describe, it, expect, beforeEach, vi } from "vitest";
import { contactMethodForHref, installContactClickTracking, trackLead } from "@/lib/tracking";

describe("contactMethodForHref", () => {
  it("reconhece WhatsApp e e-mail", () => {
    expect(contactMethodForHref("https://wa.me/5511968526088?text=Oi")).toBe("whatsapp");
    expect(contactMethodForHref("https://api.whatsapp.com/send?phone=55")).toBe("whatsapp");
    expect(contactMethodForHref("https://web.whatsapp.com/")).toBe("whatsapp");
    expect(contactMethodForHref("mailto:contato@lexagobr.com")).toBe("email");
    expect(contactMethodForHref("/contato")).toBeNull();
    expect(contactMethodForHref("https://www.lexagobr.com/wa.me")).toBeNull();
  });
});

describe("conversões do Google Ads", () => {
  const gtag = vi.fn();
  beforeEach(() => {
    gtag.mockClear();
    window.gtag = gtag;
    document.body.innerHTML = "";
  });

  it("clique em WhatsApp ou e-mail dispara a conversão de contato", () => {
    installContactClickTracking();
    document.body.innerHTML =
      '<a id="w" href="https://wa.me/55"><span id="s">x</span></a><a id="m" href="mailto:a@b.com">m</a><a id="o" href="/x">o</a>';
    const send = (id: string) => document.getElementById(id)!.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    send("s");
    send("m");
    send("o");
    const calls = gtag.mock.calls.filter((c) => c[1] === "conversion");
    expect(calls).toHaveLength(2);
    expect(calls[0][2]).toEqual({ send_to: "AW-18581330039/8VV4CMaEt7odEPewopxF" });
  });

  it("lead com sucesso dispara a conversão do formulário", () => {
    trackLead({ lead_id: "abc" });
    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: "AW-18581330039/-QHOCMOEt7odEPewopxF",
      transaction_id: "abc",
    });
  });
});
