import type { ReactNode } from "react";

export const Container = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>
);

export const Eyebrow = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`mb-3 text-[15px] font-semibold text-accent ${className}`}>{children}</p>
);

export const Check = () => (
  <svg aria-hidden viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M4 10.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CheckList = ({ items, className = "" }: { items: string[]; className?: string }) => (
  <ul className={`grid gap-y-2.5 ${className}`}>
    {items.map((i) => (
      <li key={i} className="flex gap-3 leading-relaxed">
        <Check />
        <span>{i}</span>
      </li>
    ))}
  </ul>
);
