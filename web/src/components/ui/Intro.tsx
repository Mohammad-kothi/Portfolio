/** First-load curtain: black and coral panels lift away in turn. CSS-only (see `.intro-*` in globals.css). */
export function Intro({ initials, label }: { initials: string; label: string }) {
  return (
    <div aria-hidden className="intro pointer-events-none fixed inset-0 z-[90]">
      <div className="intro-accent absolute inset-0 bg-accent" />
      <div className="intro-ink absolute inset-0 flex flex-col justify-between bg-ink">
        <div className="shell flex h-16 items-center">
          <span className="intro-label grid size-8 place-items-center border border-paper font-display text-sm">
            {initials}
          </span>
        </div>
        <div className="shell pb-8">
          <p className="intro-label meta flex items-center justify-between text-muted" style={{ animationDelay: "0.05s" }}>
            <span>{label}</span>
            <span className="text-accent">Loading</span>
          </p>
          <span className="intro-bar mt-3 block h-px origin-left bg-accent" />
        </div>
      </div>
    </div>
  );
}
