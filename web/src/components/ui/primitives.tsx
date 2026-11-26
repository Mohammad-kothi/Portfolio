import type { ReactNode } from "react";
import { TransitionLink } from "@/components/motion/PanelTransition";

/** Diagonal arrow used on every outbound link. */
export function ArrowUpRight({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowDown({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 2.5v11M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

/** Small red dot. `pulse` adds a slow blink and a ripple, for "live" states. */
export function Dot({ pulse = false, className = "" }: { pulse?: boolean; className?: string }) {
  return (
    <span aria-hidden className={`relative inline-flex size-1.5 shrink-0 ${className}`}>
      {pulse && (
        <span className="absolute inset-0 rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
      )}
      <span className={`relative size-1.5 rounded-full bg-accent ${pulse ? "motion-safe:animate-blink" : ""}`} />
    </span>
  );
}

/** Dashed tag that marks content still to be replaced. Shows only in `npm run dev`. */
export function PlaceholderTag({ show, className = "" }: { show?: boolean; className?: string }) {
  if (!show || process.env.NODE_ENV !== "development") return null;
  return (
    <span
      className={`meta pointer-events-none inline-flex items-center gap-1 border border-dashed border-accent bg-ink/90 px-1.5 py-0.5 text-[0.625rem] text-accent ${className}`}
    >
      Placeholder
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="meta border border-line px-2 py-1 text-muted transition-colors duration-300 group-hover:border-line-strong">
      {children}
    </li>
  );
}

type ButtonLinkProps = {
  href: string;
  /** For in-page links: the word shown on the transition panel. */
  label?: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
  external?: boolean;
  icon?: ReactNode;
  /** Label for build-cursors.js (sets data-build). */
  build?: string;
};

/** Pill-free, square editorial button. The arrow nudges on hover. */
export function ButtonLink({ href, label, children, variant = "solid", external, icon, build }: ButtonLinkProps) {
  const base =
    "group/btn meta relative inline-flex h-11 items-center gap-3 overflow-hidden border px-5 text-[0.75rem] transition-colors duration-300 ease-expo";
  const styles =
    variant === "solid"
      ? "border-accent bg-accent text-ink hover:border-paper"
      : "border-line-strong text-paper hover:border-accent hover:text-ink";
  const content = (
    <>
      {/* Sliding fill on hover */}
      <span
        aria-hidden
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-expo group-hover/btn:scale-y-100 ${
          variant === "solid" ? "bg-paper" : "bg-accent"
        }`}
      />
      <span className="relative">{children}</span>
      <span className="relative transition-transform duration-300 ease-expo group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5">
        {icon ?? <ArrowUpRight />}
      </span>
    </>
  );
  if (href.startsWith("#")) {
    return (
      <TransitionLink href={href as `#${string}`} label={label} data-build={build} className={`${base} ${styles}`}>
        {content}
      </TransitionLink>
    );
  }
  return (
    <a href={href} data-build={build} className={`${base} ${styles}`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {content}
    </a>
  );
}
