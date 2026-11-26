"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment, type ReactNode } from "react";
import { EASE, useReduce } from "./MotionProvider";

type MaskTextProps = {
  /** One entry per line. Plain strings are revealed word by word; other nodes line by line. */
  lines: ReactNode[];
  lineClassName?: string;
  delay?: number;
  /** Seconds between words/lines. */
  stagger?: number;
  /** Start on mount instead of when scrolled into view (for the hero). */
  onMount?: boolean;
};

const piece: Variants = {
  hidden: { y: "110%", filter: "blur(4px)" },
  show: { y: "0%", filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
};

const Mask = ({ children, inline }: { children: ReactNode; inline?: boolean }) => (
  <span className={`${inline ? "inline-block" : "block"} -mb-[0.08em] overflow-hidden pb-[0.08em] align-bottom`}>
    <motion.span className={`${inline ? "inline-block" : "block"} will-change-transform`} variants={piece}>
      {children}
    </motion.span>
  </span>
);

/** Editorial word/line reveal for big headings. Text stays in the DOM, so screen readers read it normally.
 *  The in-view check sits on the outer wrapper: each piece starts fully clipped, so watching it would never fire. */
export function MaskText({ lines, lineClassName = "", delay = 0, stagger = 0.05, onMount = false }: MaskTextProps) {
  const reduce = useReduce();
  const trigger = onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -8% 0px" } };

  return (
    <motion.span
      className="block"
      initial="hidden"
      {...trigger}
      transition={reduce ? { staggerChildren: 0, delayChildren: 0 } : { delayChildren: delay, staggerChildren: stagger }}
    >
      {lines.map((line, i) =>
        typeof line === "string" ? (
          <span key={i} className={`block ${lineClassName}`}>
            {line.split(" ").map((word, w, all) => (
              <Fragment key={w}>
                <Mask inline>{word}</Mask>
                {w < all.length - 1 && " "}
              </Fragment>
            ))}
          </span>
        ) : (
          <span key={i} className={`block ${lineClassName}`}>
            <Mask>{line}</Mask>
          </span>
        ),
      )}
    </motion.span>
  );
}
