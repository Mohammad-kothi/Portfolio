"use client";

import { motion, useScroll, useTransform, type Transition } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { MaskText } from "@/components/motion/MaskText";
import { EASE, EASE_PANEL, INSTANT, INTRO, useReduce } from "@/components/motion/MotionProvider";
import { TransitionLink } from "@/components/motion/PanelTransition";
import { LocalTime } from "@/components/ui/LocalTime";
import { ArrowDown, ArrowUpRight, ButtonLink, Dot, PlaceholderTag } from "@/components/ui/primitives";
import type { Portfolio } from "@/content/types";

type HeroProps = { person: Portfolio["person"]; socials: Portfolio["socials"]; year: number; sectionCount: number };

export function Hero({ person, socials, year, sectionCount }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduce();

  // Load sequence: everything is timed from INTRO, when the curtain has mostly lifted.
  const at = (delay: number, duration = 0.8, ease: Transition["ease"] = EASE): Transition =>
    reduce ? INSTANT : { duration, ease, delay: INTRO + delay };
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 16, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: at(delay),
  });

  // Scroll parallax: backdrop word, coral block, frame and image each move at their own speed.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = (to: number | string) => (reduce ? [0, 0] : [0, to]);
  const wordX = useTransform(scrollYProgress, [0, 1], p("-14%"));
  const wordY = useTransform(scrollYProgress, [0, 1], p(140));
  const accentY = useTransform(scrollYProgress, [0, 1], p(90));
  const frameY = useTransform(scrollYProgress, [0, 1], p(40));
  const imageY = useTransform(scrollYProgress, [0, 1], p("-8%"));

  const fullName = `${person.firstName} ${person.lastName}`;
  const links = [person.email, ...socials];
  const meta = [
    { dt: "Portfolio", dd: <>©{year} — Vol. 01</> },
    {
      dt: "Based in",
      dd: (
        <>
          {person.location}
          <PlaceholderTag show={person.locationPlaceholder} />
        </>
      ),
    },
    {
      dt: "Local time",
      dd: (
        <>
          <LocalTime timeZone={person.timeZone} /> {person.timeZoneLabel}
        </>
      ),
    },
    {
      dt: "Status",
      dd: (
        <>
          <Dot pulse={person.availability.open} />
          {person.availability.label}
        </>
      ),
    },
  ];

  return (
    <section ref={ref} id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-16">
      {/* Oversized outlined backdrop word: wipes in left to right, then drifts on scroll */}
      <motion.div
        aria-hidden
        style={{ x: wordX, y: wordY }}
        className="pointer-events-none absolute left-0 top-[24%] -z-10 md:top-[18%]"
      >
        <motion.p
          initial={{ clipPath: "inset(0% 100% 0% 0%)", x: -40 }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)", x: 0 }}
          transition={at(0, 1.5, EASE_PANEL)}
          className="text-outline whitespace-nowrap font-display text-[clamp(8rem,27vw,26rem)] uppercase leading-[0.8]"
        >
          Portfolio
        </motion.p>
      </motion.div>

      <div className="shell">
        {/* Metadata strip: cells rise in a stagger while the rule beneath draws across */}
        <div className="relative">
          <dl data-build="hero.meta" className="meta grid grid-cols-2 text-muted md:grid-cols-4">
            {meta.map((m, i) => (
              <motion.div
                key={m.dt}
                {...rise(0.25 + i * 0.06)}
                className={`flex flex-col gap-1 py-4 ${i % 2 === 1 ? "pl-4" : ""} ${
                  i >= 2 ? "border-t border-line md:border-t-0" : ""
                } ${i > 0 ? "md:border-l md:border-line md:pl-4" : ""}`}
              >
                <dt>{m.dt}</dt>
                <dd className="flex items-center gap-2 text-paper">{m.dd}</dd>
              </motion.div>
            ))}
          </dl>
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={at(0.2, 1.2)}
            className="absolute inset-x-0 bottom-0 h-px origin-left bg-line"
          />
        </div>

        <div className="grid grid-cols-12 gap-x-5 gap-y-12 pb-14 pt-12 md:pt-16 lg:pb-20">
          {/* Name + statement */}
          <div className="col-span-12 flex flex-col lg:col-span-7">
            <p data-build="hero.greeting" data-scramble className="meta flex w-fit items-center gap-3 text-accent">
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={at(0.25, 0.7)}
                className="h-px w-8 origin-left bg-accent"
              />
              Hello, I&apos;m
            </p>

            <h1
              id="hero-title"
              data-build="hero.name"
              data-scramble
              // Sized so an 8-letter name fits its column; shorten these if your name is longer.
              className="mt-5 w-fit font-display text-[17.5vw] uppercase leading-[0.82] tracking-[-0.01em] lg:text-[min(10.8vw,10rem)]"
            >
              <span className="sr-only">{fullName}</span>
              <span aria-hidden>
                <MaskText
                  onMount
                  delay={reduce ? 0 : INTRO + 0.3}
                  stagger={0.11}
                  lines={[
                    person.firstName,
                    <>
                      {person.lastName}
                      <motion.span
                        className="inline-block origin-bottom-left text-accent"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={at(1.05, 0.5)}
                      >
                        .
                      </motion.span>
                    </>,
                  ]}
                />
              </span>
            </h1>

            <p data-build="hero.tagline" data-scramble className="meta mt-6 flex w-fit items-center gap-3 text-paper">
              <span className="text-accent">↳</span> {person.role}
            </p>

            <p data-build="hero.statement" className="mt-8 w-fit max-w-[38ch] text-lg leading-relaxed text-muted md:text-xl">
              {person.statement}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="#work" label="Work" build="hero.button-work" icon={<ArrowDown />}>
                Selected work
              </ButtonLink>
              <ButtonLink href="#contact" label="Contact" build="hero.button-contact" variant="ghost">
                Let&apos;s work together
              </ButtonLink>
            </div>

            <ul aria-label="Elsewhere" data-build="hero.links" className="mt-10 flex w-fit flex-wrap gap-x-6 gap-y-3">
              {links.map((link, i) => (
                <motion.li key={link.label} {...rise(1.05 + i * 0.05)} className="flex items-center gap-2">
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="meta link-underline group inline-flex items-center gap-1.5 pb-0.5 text-paper hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3 transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <PlaceholderTag show={link.placeholder} />
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Portrait: the coral block expands into place, then the framed image wipes up and settles from a zoom */}
          <figure data-build="hero.photo" className="relative col-span-12 mx-auto w-full max-w-[26rem] sm:max-w-[30rem] lg:col-span-5 lg:col-start-8 lg:mt-6 lg:max-w-none xl:col-span-4 xl:col-start-9">
            <div className="relative">
              <motion.div
                aria-hidden
                style={{ y: accentY }}
                className="absolute inset-0 translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4"
              >
                <motion.div
                  initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={at(0.15, 0.9, EASE_PANEL)}
                  className="size-full bg-accent"
                />
              </motion.div>

              <motion.div style={{ y: frameY }} className="relative">
                <motion.div
                  initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={at(0.4, 1, EASE_PANEL)}
                  className="relative aspect-[4/5] overflow-hidden border border-paper/80 bg-ink-2"
                >
                  <motion.div style={{ y: imageY }} className="absolute inset-x-0 -inset-y-[10%]">
                    <motion.div
                      initial={{ scale: 1.25, filter: "blur(8px)" }}
                      animate={{ scale: 1, filter: "blur(0px)" }}
                      transition={at(0.45, 1.5)}
                      className="absolute inset-0"
                    >
                      <Image
                        src={person.portrait.src}
                        alt={person.portrait.alt}
                        fill
                        preload
                        sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 36vw, (min-width: 640px) 30rem, 90vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </motion.div>

                  {/* Registration marks snap in last */}
                  {[
                    "left-2 top-2 border-l border-t origin-top-left",
                    "right-2 top-2 border-r border-t origin-top-right",
                    "bottom-2 left-2 border-b border-l origin-bottom-left",
                    "bottom-2 right-2 border-b border-r origin-bottom-right",
                  ].map((pos, i) => (
                    <motion.span
                      key={pos}
                      aria-hidden
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={at(1.05 + i * 0.05, 0.45)}
                      className={`absolute size-3 border-accent ${pos}`}
                    />
                  ))}
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={at(1.1, 0.5)}
                    className="meta absolute left-4 top-4 bg-ink/80 px-2 py-1 text-paper backdrop-blur-sm"
                  >
                    Fig. 01
                  </motion.span>
                  <PlaceholderTag show={person.portrait.placeholder} className="absolute right-4 top-4" />
                </motion.div>
              </motion.div>
            </div>
            <motion.figcaption {...rise(1.15)} className="meta mt-7 flex justify-between gap-4 text-muted">
              <span>{fullName}</span>
              <span>{person.location}</span>
            </motion.figcaption>
          </figure>
        </div>

        {/* Bottom rail */}
        <div data-build="hero.scroll" className="relative">
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={at(0.9, 1.2)}
            className="absolute inset-x-0 top-0 h-px origin-left bg-line"
          />
          <motion.div {...rise(1.25)} className="meta flex items-center justify-between py-4 text-muted">
            <TransitionLink href="#about" label="About" className="group inline-flex items-center gap-2 hover:text-paper">
              <ArrowDown className="size-3 text-accent transition-transform duration-500 ease-expo group-hover:translate-y-1" />
              Scroll to explore
            </TransitionLink>
            <span>( 01 — {String(sectionCount).padStart(2, "0")} )</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
