/** Faint full-height column guides behind the page (the "strong grid"). They draw down on first load. Decorative. */
export function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="shell grid h-full grid-cols-4 gap-x-5 md:grid-cols-12">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            style={{ animationDelay: `${0.75 + i * 0.045}s` }}
            className={`grid-draw h-full border-x border-paper/[0.035] ${i >= 4 ? "hidden md:block" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
