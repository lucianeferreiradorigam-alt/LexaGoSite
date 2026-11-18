import { BookOpenText, Feather, Handshake, PenLine, Store, TrendingUp, type LucideIcon } from "lucide-react";
import type { ServiceKey } from "@/content/services";

export const SERVICE_ICONS: Record<ServiceKey, LucideIcon> = {
  "projetos-editoriais": PenLine,
  "consultoria-comercial": TrendingUp,
  "representacao-comercial": Handshake,
  comercializacao: Store,
};

export { BookOpenText, Feather };

/** Ícone em um quadrado arredondado, no estilo de ícone de aplicativo. */
export const IconTile = ({ icon: Icon, tone = "blue", size = "md" }: { icon: LucideIcon; tone?: Tone; size?: "md" | "lg" }) => (
  <span
    className={`inline-flex shrink-0 items-center justify-center rounded-2xl text-white shadow-sm ${TONES[tone]} ${
      size === "lg" ? "h-14 w-14" : "h-11 w-11"
    }`}
    aria-hidden
  >
    <Icon className={size === "lg" ? "h-7 w-7" : "h-5 w-5"} strokeWidth={2} />
  </span>
);

type Tone = "blue" | "orange" | "green" | "purple" | "pink" | "teal" | "indigo";
const TONES: Record<Tone, string> = {
  blue: "bg-gradient-to-br from-[#2997ff] to-[#0062cc]",
  orange: "bg-gradient-to-br from-[#ff9f0a] to-[#f56300]",
  green: "bg-gradient-to-br from-[#34c759] to-[#1f9d45]",
  purple: "bg-gradient-to-br from-[#bf5af2] to-[#8e3fd1]",
  pink: "bg-gradient-to-br from-[#ff6482] to-[#e8335a]",
  teal: "bg-gradient-to-br from-[#40c8e0] to-[#1a9bb8]",
  indigo: "bg-gradient-to-br from-[#5e5ce6] to-[#3634a3]",
};

export const SERVICE_TONES: Record<ServiceKey, Tone> = {
  "projetos-editoriais": "indigo",
  "consultoria-comercial": "green",
  "representacao-comercial": "purple",
  comercializacao: "pink",
};

export type { Tone };
