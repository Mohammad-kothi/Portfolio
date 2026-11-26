# Mohammad Kothi — Portfolio

A dark, editorial portfolio built with **Next.js 16**, **Tailwind CSS 4** and **Framer Motion**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Edit the content

**Everything on the page comes from one file: [`src/content/portfolio.ts`](src/content/portfolio.ts).**
Names, text, links, projects, timeline, case study, section headings and menu labels all live there.

- Copy marked **`DRAFT`** was written from the old portfolio and the GitHub READMEs. Rewrite it in your own words any time.
- Set `placeholder: true` on anything that isn't real yet: it gets a dashed red **PLACEHOLDER** tag while you run
  `npm run dev`. The tag never appears in a production build.

### Still to add when you have them

- **LinkedIn**: there's a commented-out line under `socials`.
- **Kothi Steel**: a real screenshot and `links: { live }` when the site launches (the card and case study use mockups for now),
  plus the real outcome in the case study.
- **Ridgeline Roofing and Business OS**: screenshots, if you want to replace the mockups (16:10 works best).
- **Class X**: your school's name in `timeline` (the year is set to 2024).

### Images

Put files in `public/images/` and reference them as `/images/your-file.jpg`.
JPG, PNG and WebP are resized and converted to AVIF/WebP automatically by `next/image`. SVGs are served as-is.

## How it's built

```
src/
  app/
    layout.tsx        fonts (Anton, Inter, JetBrains Mono), metadata
    page.tsx          section order
    globals.css       colour tokens and small utilities (shell, meta, text-outline…)
  content/
    portfolio.ts      ← all content
    types.ts          content shapes
  components/
    Nav.tsx           fixed header, active-section highlight, full-screen mobile menu
    sections/         Hero, About, Skills, Projects, Timeline, CaseStudy, Contact, Footer
    motion/           Reveal, MaskText, ParallaxImage, CountUp, ScrollProgress, MotionProvider
    ui/               SectionHeader, Marquee, GridLines, LocalTime, CopyEmail, primitives
```

- **Colours** live in `globals.css` under `@theme` (`ink`, `paper`, `muted`, `accent`…). Change `--color-accent`
  to restyle every red detail at once.
- **Motion** respects `prefers-reduced-motion`: `MotionProvider` turns off transform animations,
  parallax and the timeline line stay still, and the marquee stops.
- **Section order**: reorder the `order` array in `src/app/page.tsx`. Numbers and menu items follow automatically.
- **Long names**: the hero name is sized for an 8-letter first name. If you change it, adjust the font size
  on the `<h1>` in `src/components/sections/Hero.tsx`.

## Build-cursors intro

`public/build-cursors.js` animates cursors that draw a wireframe around each piece of the page, then reveal it.

- **Settings** (number of cursors, names, frame colour, speed): `public/build-cursors.config.js`.
- **Which pieces get built**: any element with `data-build="section.part"`. Keep them small, never nest one inside another,
  and don't put one on an element that Framer Motion fades in (its inline opacity would show the piece early).
  Elements with Tailwind `translate-*` classes need a wrapper too: the script resets `translate`.
- Both scripts are plain `<script src>` tags in `src/app/layout.tsx`'s `<head>`. Next's
  `strategy="beforeInteractive"` loads them after first paint in Next 16, which makes the page flash before it hides.
- `data-scramble` and `data-count` are on headings, labels and stats as requested, but the current script doesn't read them.

## Deploy

The easiest host is [Vercel](https://vercel.com/new): import the repository and set the **Root Directory** to `web`.
Every push to `main` redeploys, and `meta.siteUrl` picks up the Vercel domain automatically.
