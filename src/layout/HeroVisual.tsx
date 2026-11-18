import { BookOpenText, Megaphone, PenLine, Store, TabletSmartphone } from "lucide-react";

/**
 * Ilustração da abertura: a jornada do livro (escrita, livro impresso, e-book,
 * anúncios e canais de venda) em um painel escuro com brilho azul e roxo.
 * Feita em HTML/CSS: leve, nítida em qualquer tela e sem imagens de terceiros.
 */
const Chip = ({ icon: Icon, label, className, color }: { icon: typeof Store; label: string; className: string; color: string }) => (
  <div className={`absolute flex items-center gap-2.5 rounded-2xl bg-white/90 px-3.5 py-2.5 text-sm font-semibold text-[#1d1d1f] shadow-xl shadow-black/30 backdrop-blur ${className}`}>
    <span className={`flex h-8 w-8 items-center justify-center rounded-xl text-white ${color}`}>
      <Icon className="h-4 w-4" aria-hidden />
    </span>
    {label}
  </div>
);

const HeroVisual = () => (
  <div
    role="img"
    aria-label="Ilustração da jornada do livro: escrita, livro impresso, e-book, Amazon Ads e canais de venda"
    className="relative h-[300px] overflow-hidden rounded-[2rem] bg-[#0b0b12] lg:h-[360px]"
  >
    <div className="absolute -left-16 -top-24 h-80 w-80 rounded-full bg-[#2997ff] opacity-50 blur-[90px]" aria-hidden />
    <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-[#bf5af2] opacity-45 blur-[90px]" aria-hidden />
    <div className="absolute bottom-10 left-1/3 h-40 w-40 rounded-full bg-[#ff9f0a] opacity-25 blur-[70px]" aria-hidden />

    {/* Livro impresso */}
    <div className="absolute left-[18%] top-1/2 h-[190px] w-[138px] -translate-y-1/2 -rotate-6 rounded-r-xl rounded-l-sm bg-gradient-to-br from-white to-[#e8e8ed] shadow-2xl shadow-black/50 lg:h-[220px] lg:w-[160px]">
      <div className="absolute inset-y-0 left-0 w-3 rounded-l-sm bg-gradient-to-r from-black/15 to-transparent" />
      <div className="flex h-full flex-col justify-between p-4">
        <BookOpenText className="h-6 w-6 text-[#5e5ce6]" aria-hidden />
        <div>
          <div className="h-2 w-16 rounded-full bg-[#1d1d1f]" />
          <div className="mt-2 h-2 w-20 rounded-full bg-[#1d1d1f]/30" />
          <div className="mt-1.5 h-2 w-12 rounded-full bg-[#1d1d1f]/30" />
        </div>
      </div>
    </div>

    {/* E-book (tablet) */}
    <div className="absolute left-[44%] top-1/2 h-[200px] w-[150px] -translate-y-[45%] rotate-6 rounded-[1.4rem] border-[6px] border-[#2c2c34] bg-white shadow-2xl shadow-black/50 lg:h-[230px] lg:w-[170px]">
      <div className="space-y-2 p-4">
        <div className="h-2 w-14 rounded-full bg-[#2997ff]" />
        {[90, 100, 80, 95, 70, 100, 60].map((w, i) => (
          <div key={i} className="h-1.5 rounded-full bg-[#1d1d1f]/15" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>

    <Chip icon={PenLine} label="Escrita e edição" color="bg-[#5e5ce6]" className="left-5 top-5" />
    <Chip icon={TabletSmartphone} label="E-book EPUB" color="bg-[#1a9bb8]" className="right-5 top-12 lg:top-14" />
    <Chip icon={Megaphone} label="Amazon Ads" color="bg-[#f56300]" className="bottom-16 right-6 lg:bottom-20" />
    <Chip icon={Store} label="Livrarias e marketplaces" color="bg-[#e8335a]" className="bottom-5 left-6" />
  </div>
);

export default HeroVisual;
