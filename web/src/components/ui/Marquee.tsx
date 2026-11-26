/** Slanted accent band with a looping list of words. CSS-only; stops for reduced motion. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center font-display text-[clamp(1.75rem,4vw,3rem)] uppercase leading-none">
          <span className="px-6 md:px-8">{item}</span>
          <span aria-hidden className="text-[0.5em]">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative z-10 -mx-2 overflow-hidden border-y border-ink bg-accent py-3.5 text-ink md:-rotate-[1.2deg] md:py-4">
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
