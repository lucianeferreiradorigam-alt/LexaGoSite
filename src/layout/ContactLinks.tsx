import { MessageCircle, Mail } from "lucide-react";
import { CONTACT, whatsappLink } from "@/lib/site";

type Props = {
  message?: string;
  service?: string;
  label?: string;
  variant?: "button" | "link" | "inverse";
  className?: string;
};

export const WhatsAppLink = ({ message, service, label = "Falar pelo WhatsApp", variant = "link", className = "" }: Props) => {
  const styles = {
    button:
      "inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 bg-background px-5 py-3 font-semibold text-foreground transition-colors hover:border-accent hover:text-accent",
    inverse:
      "inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10",
    link: "inline-flex items-center gap-2 font-semibold text-accent underline-offset-4 hover:underline",
  }[variant];
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles} ${className}`}
      data-service={service}
    >
      <MessageCircle className="h-5 w-5" aria-hidden />
      {label}
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
};

export const EmailLink = ({ email = CONTACT.emailGeneral, service }: { email?: string; service?: string }) => (
  <a
    href={`mailto:${email}`}
    className="inline-flex items-center gap-2 underline-offset-4 hover:text-accent hover:underline"
    data-service={service}
  >
    <Mail className="h-4 w-4" aria-hidden />
    {email}
  </a>
);
