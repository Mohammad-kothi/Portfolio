import { DrawLine } from "@/components/motion/DrawLine";
import { MaskText } from "@/components/motion/MaskText";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { LocalTime } from "@/components/ui/LocalTime";
import { ArrowUpRight, Dot, PlaceholderTag } from "@/components/ui/primitives";
import { SectionLabel } from "@/components/ui/SectionHeader";
import type { Portfolio, SectionCopy } from "@/content/types";

type ContactProps = {
  contact: Portfolio["contact"];
  person: Portfolio["person"];
  socials: Portfolio["socials"];
  copy: SectionCopy;
  index: string;
};

export function Contact({ contact, person, socials, copy, index }: ContactProps) {
  const [first, ...rest] = copy.title;
  const email = person.email;
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden py-24 md:py-36">
      {/* Soft accent glow (a cheap radial gradient) drifting against the scroll */}
      <Parallax aria-hidden distance={-120} className="pointer-events-none absolute -right-40 top-1/3 -z-0">
        <div className="size-[44rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-accent)_22%,transparent),transparent_65%)]" />
      </Parallax>

      <div className="shell relative">
        <div className="relative pt-5">
          <DrawLine className="absolute inset-x-0 top-0 bg-line" />
          <SectionLabel index={index} label={copy.label} build="contact.label" />
        </div>

        <h2
          id="contact-title"
          data-build="contact.title"
          data-scramble
          className="mt-12 w-fit font-display text-[clamp(4.25rem,15.5vw,15rem)] uppercase leading-[0.82] tracking-[-0.01em]"
        >
          <MaskText
            stagger={0.12}
            lines={[
              first,
              <span key="t">
                <span className="text-outline-accent">{rest.join(" ")}</span>
                <span className="text-accent">.</span>
              </span>,
            ]}
          />
        </h2>

        <div className="mt-14 grid grid-cols-12 gap-x-5 gap-y-12 md:mt-20">
          <Reveal className="col-span-12 lg:col-span-7">
            <p data-build="contact.blurb" className="w-fit max-w-[44ch] text-lg leading-relaxed text-muted md:text-xl">
              {contact.blurb}
            </p>

            <div className="mt-10">
              <div className="flex items-center gap-3">
                <p data-build="contact.email-label" data-scramble className="meta w-fit text-muted">
                  Write to me
                </p>
                <PlaceholderTag show={email.placeholder} />
              </div>
              <a
                href={email.href}
                data-build="contact.email"
                className="group mt-3 inline-flex max-w-full items-center gap-3 border-b border-line-strong pb-2 text-[clamp(1.125rem,5.2vw,3.5rem)] font-semibold tracking-tight transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                <span className="min-w-0 [overflow-wrap:anywhere]">{email.handle}</span>
                <ArrowUpRight className="size-[0.6em] shrink-0 transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
              <div data-build="contact.buttons" className="mt-6 flex w-fit flex-wrap gap-3">
                <a
                  href={email.href}
                  className="meta inline-flex h-11 items-center gap-3 border border-accent bg-accent px-5 text-ink transition-colors duration-300 hover:border-paper hover:bg-paper"
                >
                  Start a project <ArrowUpRight />
                </a>
                {email.handle && <CopyEmail email={email.handle} />}
              </div>
            </div>
          </Reveal>

          <Reveal className="col-span-12 lg:col-span-4 lg:col-start-9" delay={0.1}>
            <dl data-build="contact.details" className="border-t border-line">
              <div className="flex items-start justify-between gap-6 border-b border-line py-4">
                <dt className="meta text-muted">Status</dt>
                <dd className="flex items-center gap-2 text-right text-sm text-paper">
                  <Dot pulse={person.availability.open} /> {person.availability.label}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-6 border-b border-line py-4">
                <dt className="meta text-muted">Based in</dt>
                <dd className="text-sm text-paper">{person.location}</dd>
              </div>
              <div className="flex items-start justify-between gap-6 border-b border-line py-4">
                <dt className="meta text-muted">Local time</dt>
                <dd className="text-sm text-paper">
                  <LocalTime timeZone={person.timeZone} /> {person.timeZoneLabel}
                </dd>
              </div>
              <div className="flex items-start justify-between gap-6 border-b border-line py-4">
                <dt className="meta text-muted">Elsewhere</dt>
                <dd>
                  <ul className="flex flex-col items-end gap-2">
                    {socials.map((s) => (
                      <li key={s.label} className="flex items-center gap-2">
                        <PlaceholderTag show={s.placeholder} />
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline inline-flex items-center gap-1.5 pb-0.5 text-sm text-paper hover:text-accent"
                        >
                          {s.label}
                          <ArrowUpRight className="size-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
