"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE, INTRO } from "@/components/motion/MotionProvider";
import { TransitionLink } from "@/components/motion/PanelTransition";
import { Dot } from "@/components/ui/primitives";

export type NavItem = { id: string; label: string };

type NavProps = {
  items: NavItem[];
  initials: string;
  name: string;
  available: boolean;
};

export function Nav({ items, initials, name, available }: NavProps) {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Highlight the section in the middle of the viewport ("home" clears it at the top).
  useEffect(() => {
    const sections = ["home", ...items.map(({ id }) => id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return;
    const button = menuButton.current;
    document.body.style.overflow = "hidden";
    document.querySelector<HTMLAnchorElement>("#mobile-menu a")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      button?.focus();
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="meta fixed left-4 top-3 z-[80] -translate-y-20 bg-accent px-3 py-2 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, ease: EASE, delay: INTRO + 0.35 }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          scrolled || open ? "border-line bg-ink/85 backdrop-blur-md" : "border-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between gap-6">
          <TransitionLink
            href="#home"
            label={name}
            data-build="nav.logo"
            className="group flex w-fit items-center gap-3"
            aria-label={`${name}, back to top`}
          >
            <span className="grid size-8 place-items-center border border-paper font-display text-sm tracking-wide transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
              {initials}
            </span>
            <span className="meta hidden text-paper sm:block">{name}</span>
          </TransitionLink>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul data-build="nav.links" className="flex w-fit items-center gap-7">
              {items.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <TransitionLink
                      href={`#${item.id}`}
                      label={item.label}
                      data-scramble
                      aria-current={isActive ? "true" : undefined}
                      className={`meta group relative flex items-center gap-1.5 py-2 transition-colors duration-300 ${
                        isActive ? "text-paper" : "text-muted hover:text-paper"
                      }`}
                    >
                      <span
                        className={`inline-block transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 ${
                          isActive ? "text-accent" : "text-line-strong group-hover:text-accent"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                      {/* Hover hint */}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-line-strong transition-transform duration-500 ease-expo group-hover:origin-left group-hover:scale-x-100"
                      />
                      {/* Active underline glides between items */}
                      {isActive && (
                        <motion.span
                          aria-hidden
                          layoutId="nav-underline"
                          transition={{ duration: 0.5, ease: EASE }}
                          className="absolute inset-x-0 -bottom-0.5 h-px bg-accent"
                        />
                      )}
                    </TransitionLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {available && (
              <TransitionLink
                href="#contact"
                label="Contact"
                data-build="nav.cta"
                className="meta hidden h-9 items-center gap-2.5 border border-line-strong px-3.5 text-paper transition-colors duration-300 hover:border-accent sm:inline-flex"
              >
                <Dot pulse />
                Let&apos;s talk
              </TransitionLink>
            )}
            <button
              ref={menuButton}
              data-build="nav.menu"
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="meta flex h-9 items-center gap-2 border border-line-strong px-3.5 text-paper lg:hidden"
            >
              <span className="relative block h-2 w-3.5" aria-hidden>
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${open ? "top-1 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${open ? "top-1 -rotate-45" : "top-2"}`}
                />
              </span>
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-16 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center">
              <ul className="border-t border-line">
                {items.map((item, i) => (
                  <motion.li
                    key={item.id}
                    className="border-b border-line"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.04 }}
                  >
                    <TransitionLink
                      href={`#${item.id}`}
                      label={item.label}
                      onNavigate={() => setOpen(false)}
                      className="flex items-baseline justify-between py-3 font-display text-[clamp(2.5rem,11vw,4.5rem)] uppercase leading-none transition-colors hover:text-accent"
                    >
                      {item.label}
                      <span className="meta text-accent">{String(i + 1).padStart(2, "0")}</span>
                    </TransitionLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
