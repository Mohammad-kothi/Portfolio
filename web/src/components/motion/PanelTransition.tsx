"use client";

import { motion } from "framer-motion";
import { createContext, useCallback, useContext, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { EASE_PANEL, useReduce } from "./MotionProvider";

type Go = (id: string, label?: string) => void;
const PanelContext = createContext<Go | null>(null);

type Phase = "idle" | "cover" | "reveal";

function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "instant", block: "start" });
  // Move keyboard focus with the view, without a second scroll.
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  history.pushState(null, "", `#${id}`);
}

/** Section-to-section transition: coral and black panels sweep up over the page, the page jumps, the panels sweep away. */
export function PanelTransitionProvider({ children }: { children: ReactNode }) {
  const reduce = useReduce();
  const [phase, setPhase] = useState<Phase>("idle");
  const [label, setLabel] = useState("");
  const target = useRef<string | null>(null);

  const go = useCallback<Go>(
    (id, nextLabel = "") => {
      if (reduce) return jumpTo(id);
      if (phase !== "idle") return;
      target.current = id;
      setLabel(nextLabel);
      setPhase("cover");
    },
    [phase, reduce],
  );

  const panel = (lead: boolean) => ({
    idle: { y: "100%", transition: { duration: 0 } },
    cover: { y: "0%", transition: { duration: 0.45, ease: EASE_PANEL, delay: lead ? 0 : 0.07 } },
    reveal: { y: "-100%", transition: { duration: 0.5, ease: EASE_PANEL, delay: lead ? 0.07 : 0 } },
  });

  return (
    <PanelContext.Provider value={go}>
      {children}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[85] overflow-hidden">
        <motion.div className="absolute inset-0 bg-accent" initial="idle" animate={phase} variants={panel(true)} />
        <motion.div
          className="absolute inset-0 flex items-end bg-ink"
          initial="idle"
          animate={phase}
          variants={panel(false)}
          onAnimationComplete={(def) => {
            if (def === "cover" && target.current) {
              jumpTo(target.current);
              target.current = null;
              setPhase("reveal");
            } else if (def === "reveal") {
              setPhase("idle");
            }
          }}
        >
          <p className="shell pb-10 font-display text-[clamp(3rem,12vw,10rem)] uppercase leading-none text-paper">
            {label}
            <span className="text-accent">.</span>
          </p>
        </motion.div>
      </div>
    </PanelContext.Provider>
  );
}

type TransitionLinkProps = {
  href: `#${string}`;
  label?: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
  "aria-label"?: string;
  "aria-current"?: "true";
};

/** In-page anchor that plays the panel transition. Still a normal link without JS or with modifier keys. */
export function TransitionLink({ href, label, onNavigate, children, ...rest }: TransitionLinkProps) {
  const go = useContext(PanelContext);
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!go || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate?.();
    go(href.slice(1), label);
  };
  return (
    <a href={href} onClick={onClick} {...rest}>
      {children}
    </a>
  );
}
