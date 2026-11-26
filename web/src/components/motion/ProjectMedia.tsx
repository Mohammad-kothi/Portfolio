"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useState, type PointerEvent, type ReactNode } from "react";
import { ArrowUpRight } from "@/components/ui/primitives";
import { ImageReveal } from "./ImageReveal";
import { EASE } from "./MotionProvider";
import { ParallaxImage } from "./ParallaxImage";

type ProjectMediaProps = {
  src: string;
  alt: string;
  /** Where the image links to (live site, else code). Without one the badge says "Soon" and nothing is clickable. */
  href?: string;
  linkLabel?: string;
  children?: ReactNode;
};

/** Project image with panel reveal, a lifting dark overlay and a coral "View" badge that follows a mouse pointer. */
export function ProjectMedia({ src, alt, href, linkLabel, children }: ProjectMediaProps) {
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 380, damping: 34, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 34, mass: 0.5 });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const body = (
    <>
      <ImageReveal className="aspect-[16/10]">
        <div className="size-full transition-transform duration-[1.2s] ease-expo group-hover:scale-[1.04]">
          <ParallaxImage src={src} alt={alt} sizes="(min-width: 1024px) 56vw, 95vw" className="size-full" strength={5} />
        </div>
      </ImageReveal>
      {/* Dark overlay lifts on hover */}
      <span aria-hidden className="absolute inset-0 z-[5] bg-ink/30 transition-opacity duration-500 group-hover:opacity-0" />

      <AnimatePresence>
        {hover && (
          <motion.span
            aria-hidden
            style={{ x: sx, y: sy }}
            className="pointer-events-none absolute left-0 top-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              className="meta -ml-11 -mt-11 grid size-22 place-items-center rounded-full bg-accent text-center text-ink"
              initial={{ scale: 0.3 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.3 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <span className="flex items-center gap-1">
                {href ? (
                  <>
                    View <ArrowUpRight className="size-3" />
                  </>
                ) : (
                  "Soon"
                )}
              </span>
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </>
  );

  const shared = {
    onPointerEnter: (e: PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "mouse") return;
      onMove(e);
      setHover(true);
    },
    onPointerMove: onMove,
    onPointerLeave: () => setHover(false),
    className: `relative block overflow-hidden border border-line transition-colors duration-500 group-hover:border-accent/70 ${
      href ? "cursor-none" : ""
    }`,
  };

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={linkLabel} {...shared}>
      {body}
    </a>
  ) : (
    <div {...shared}>{body}</div>
  );
}
