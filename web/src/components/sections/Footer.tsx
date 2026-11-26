import { DrawLine } from "@/components/motion/DrawLine";
import { MaskText } from "@/components/motion/MaskText";
import { TransitionLink } from "@/components/motion/PanelTransition";
import { ArrowUpRight } from "@/components/ui/primitives";
import type { Portfolio } from "@/content/types";

type FooterProps = { person: Portfolio["person"]; socials: Portfolio["socials"]; footer: Portfolio["footer"] };

export function Footer({ person, socials, footer }: FooterProps) {
  const links = [person.email, ...socials];
  return (
    <footer className="relative overflow-hidden pt-14">
      <DrawLine className="absolute inset-x-0 top-0 bg-line" duration={1.4} />
      <div className="shell grid grid-cols-12 gap-x-5 gap-y-10">
        <div data-build="footer.credits" className="col-span-12 w-fit md:col-span-5">
          <p className="meta text-muted">© {footer.year} {person.firstName} {person.lastName}</p>
          <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-muted">{footer.note}</p>
        </div>

        <nav aria-label="Social" className="col-span-12 sm:col-span-8 md:col-span-4">
          <ul data-build="footer.links" className="flex w-fit flex-wrap gap-x-6 gap-y-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="meta link-underline inline-flex items-center gap-1.5 pb-0.5 text-paper hover:text-accent"
                >
                  {l.label} <ArrowUpRight className="size-3" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-12 sm:col-span-4 md:col-span-3 sm:text-right">
          <TransitionLink href="#home" label="Top" data-build="footer.top" data-scramble className="meta group inline-flex items-center gap-2 text-paper hover:text-accent">
            Back to top
            <span aria-hidden className="inline-block transition-transform duration-500 ease-expo group-hover:-translate-y-1">
              ↑
            </span>
          </TransitionLink>
        </div>
      </div>

      {/* Cropped wordmark rises word by word as you reach the bottom */}
      {/* data-build sits on a wrapper: the script resets `translate`, which would undo the p's translate-y. */}
      <div data-build="footer.wordmark" className="mt-12">
      <p
        aria-hidden
        className="select-none whitespace-nowrap text-center font-display text-[12.6vw] uppercase leading-[0.72] text-outline translate-y-[12%]"
      >
        <MaskText lines={[`${person.firstName} ${person.lastName}`]} stagger={0.1} />
      </p>
      </div>
    </footer>
  );
}
