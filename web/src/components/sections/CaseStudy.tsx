import { Accordion } from "@/components/motion/Accordion";
import { DrawLine } from "@/components/motion/DrawLine";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { MaskText } from "@/components/motion/MaskText";
import { Parallax } from "@/components/motion/Parallax";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, Dot, PlaceholderTag } from "@/components/ui/primitives";
import { SectionLabel } from "@/components/ui/SectionHeader";
import type { CaseStudy as CaseStudyData, SectionCopy } from "@/content/types";

type CaseStudyProps = { study: CaseStudyData; copy: SectionCopy; index: string };

export function CaseStudy({ study, copy, index }: CaseStudyProps) {
  const [first, ...rest] = copy.title;
  return (
    <section id="case-study" aria-labelledby="case-title" className="relative overflow-hidden bg-ink-2 py-24 md:py-36">
      <div className="shell">
        <div className="relative flex items-center justify-between gap-4 pt-5">
          <DrawLine className="absolute inset-x-0 top-0 bg-line" />
          <SectionLabel index={index} label={copy.label} build="case.label" />
          <Reveal className="flex items-center gap-3" y={8} delay={0.2}>
            <PlaceholderTag show={study.placeholder} />
            <p data-build="case.eyebrow" data-scramble className="meta w-fit text-accent">
              {study.eyebrow}
            </p>
          </Reveal>
        </div>

        {/* Title on the left, intro + facts stacked against its baseline on the right */}
        <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-10 lg:items-end">
          <h2
            id="case-title"
            data-build="case.title"
            data-scramble
            className="col-span-12 w-fit font-display text-[clamp(5rem,20vw,19rem)] uppercase leading-[0.8] tracking-[-0.01em] lg:col-span-7"
          >
            <MaskText stagger={0.12} lines={[first, <span key="o" className="text-outline-strong">{rest.join(" ")}</span>]} />
          </h2>

          <Reveal className="col-span-12 md:col-span-7 lg:col-span-5 lg:pb-2" delay={0.2}>
            <p data-build="case.intro" className="text-balance text-[clamp(1.375rem,2.2vw,1.875rem)] font-medium leading-snug tracking-tight">
              {study.intro}
            </p>
          </Reveal>

          <div className="relative col-span-12 md:col-span-5 lg:col-span-5 lg:col-start-8 lg:-mt-4">
            <DrawLine className="absolute inset-x-0 top-0 bg-line" delay={0.2} />
            <dl data-build="case.facts" className="grid grid-cols-2 sm:grid-cols-3">
              {study.meta.map((m, i) => (
                <Reveal key={m.label} delay={0.25 + i * 0.05} y={10} className="border-b border-line py-3 pr-3">
                  <dt className="meta text-muted">{m.label}</dt>
                  <dd className="mt-1 text-sm text-paper">{m.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Wide hero shot: coral and black panels slide off, the image settles */}
      <div className="shell mt-16 md:mt-24">
        <div data-build="case.image" className="relative border border-line">
          <ImageReveal className="aspect-[16/10] md:aspect-[16/8]">
            <ParallaxImage
              src={study.heroImage.src}
              alt={study.heroImage.alt}
              sizes="(min-width: 1440px) 1344px, 95vw"
              className="size-full"
              strength={6}
            />
          </ImageReveal>
          <Reveal y={8} delay={0.9} className="absolute bottom-3 left-3 z-30">
            <span className="meta bg-ink/80 px-2 py-1 text-paper backdrop-blur-sm">Fig. 02 — Catalogue, desktop</span>
          </Reveal>
        </div>
      </div>

      {/* Story */}
      <div className="shell mt-16 grid grid-cols-12 gap-x-5 gap-y-12 md:mt-24">
        <Reveal className="col-span-12 lg:col-span-7" blur={false}>
          <div data-build="case.story">
          <Accordion
            items={study.chapters.map((chapter, i) => ({
              key: chapter.label,
              eyebrow: (
                <>
                  {String(i + 1).padStart(2, "0")} <span className="text-muted">{chapter.label}</span>
                </>
              ),
              title: chapter.title,
              body: (
                <>
                  <p className="max-w-[56ch] leading-relaxed text-muted">{chapter.body}</p>
                  {chapter.points && (
                    <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {chapter.points.map((point) => (
                        <li key={point} className="flex gap-3 text-sm leading-relaxed text-paper">
                          <span aria-hidden className="mt-[0.55em] h-px w-3 shrink-0 bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ),
            }))}
          />

          </div>

          {study.cta && (
            <div data-build="case.cta" className="mt-10 w-fit">
              {study.cta.href ? (
                <ButtonLink href={study.cta.href} external>
                  {study.cta.label}
                </ButtonLink>
              ) : (
                <p className="meta inline-flex h-11 items-center gap-3 border border-dashed border-line-strong px-5 text-muted">
                  <Dot pulse /> {study.cta.label}
                </p>
              )}
            </div>
          )}
        </Reveal>

        {/* Mobile detail shot, with its coral outline drifting at a different speed */}
        <div className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-4 lg:col-start-9">
          <figure data-build="case.mobile" className="lg:sticky lg:top-24">
            <div className="relative">
              <Parallax aria-hidden distance={18} className="absolute inset-0 -translate-x-3 translate-y-3">
                <span className="block size-full border border-accent" />
              </Parallax>
              <div className="relative border border-line bg-ink">
                <ImageReveal className="aspect-[4/5]" delay={0.1}>
                  <ParallaxImage
                    src={study.detailImage.src}
                    alt={study.detailImage.alt}
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 60vw, 90vw"
                    className="size-full"
                    strength={5}
                  />
                </ImageReveal>
              </div>
            </div>
            <figcaption className="meta mt-6 text-muted">
              <Reveal as="span" y={8} delay={0.3} className="block">
                Fig. 03 — Product page, mobile
              </Reveal>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
