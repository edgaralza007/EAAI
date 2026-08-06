# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React marketing site for EAA Cap, an AI consulting firm serving small and mid-sized businesses. Vite + React Router + TailwindCSS + Framer Motion + Lucide.

The visual design is **editorial, on a single reading axis**: serif display type on a neutral ground, hairline rules instead of drop shadows, one accent color.

**The layout rule that matters most:** every section starts at the same left edge and reads straight down. Eyebrow, heading and intro stack in one narrow column (`SectionHeader`); content follows beneath it. Do not float an intro paragraph to the right of a heading, and do not spread a single item across the full 1200px as separate columns — both force the eye back and forth across the page. Where two columns are genuinely warranted, the second one must be a **bounded card**, so it reads as an object rather than as a competing place to start reading.

See "Design system" below — it is enforced, not just described.

## Development Commands

```bash
npm run dev            # http://localhost:5173
npm run build          # -> dist/
npm run preview

npm test               # watch
npm run test:run       # single pass
npm run test:coverage

npm run check:design   # fails on banned visual patterns (see below)
npm run verify         # check:design + test:run + build

npm run assets:images  # regenerate public/ webp from assets-src/
npm run assets:brand   # regenerate logo colorways + favicons from public/logo.png
```

## Architecture

### Routes (`src/main.jsx`)
- `/` — `EAACapitalLanding.jsx`
- `/portfolio` — `Portfolio.jsx`
- `/portfolio/:slug` — `CaseStudyDetail.jsx`, driven by `src/caseStudies.js`
- `/about` — `About.jsx`

`ScrollManager` sits inside `BrowserRouter` and is the **single owner of scroll position** on navigation. Do not add per-page scroll effects.

### Components (`src/components/`)
Primitives, used by every page — do not re-declare local copies:

| Component | Purpose |
|---|---|
| `PageLayout` | Header + `<main>` + Footer. Every page's outermost element. |
| `Section` | `tone` (paper/raised/ink), `space`, `bordered`. Sections separate with a hairline, never alternating backgrounds. |
| `Container` | `width` (default 1200px / narrow / reading / wide). |
| `SectionHeader` | Eyebrow + heading + intro, stacked flush left in one narrow column. **Use this for every section heading.** |
| `Eyebrow` | `01 ──── LABEL`. The recurring section marker. `inverted` swaps its muted text/rule for paper-on-dark — use on a `tone="ink"` section. |
| `Display` | Serif headline, `as` + `size`. |
| `Button` | All CTAs. `primary` / `secondary` / `quiet` / `link` / `inverted` (paper outline, for `tone="ink"` sections). Handles routing. |
| `Stat` | Serif numeral + tracked label, tabular figures. |
| `Reveal` | Scroll-triggered entrance. Wrap blocks, not individual words. |
| `Logo` | `tone`: accent (default) / ink / paper / original. |

**Tailwind cannot see interpolated class names.** Props that select styles must map through a lookup object of complete class strings — never `` className={`bg-${tone}`} ``.

### Navigation (`src/components/nav.js`)
`useSmartNav()` handles route links, same-page hashes, and cross-page hashes (`/#contact`) in-process. **Never assign to `window.location.href`** — it reloads the whole SPA. `check:design` fails the build on it.

`scrollToId()` deliberately does not rely on `scrollIntoView({behavior:'smooth'})`: smooth scrolling silently no-ops under OS reduced-motion and some browser settings, leaving the URL updated and the page unmoved. It computes the target from `scroll-padding-top` and verifies arrival.

## Design system

Tokens live in `src/index.css` as CSS custom properties; `tailwind.config.js` reads them via `rgb(var(--x) / <alpha-value>)`.

| Token | Value | Use |
|---|---|---|
| `paper` | `#FAFAFA` | page ground — never pure white |
| `paper-raised` | `#FFFFFF` | cards and panels |
| `ink` | `#17171A` | headings, primary text — never `#000` |
| `ink-muted` | `#63636B` | body, captions |
| `rule` | `#E5E5EA` | every hairline |
| `accent` | `#4F46E5` | indigo, sampled from `logo.png` |
| `accent-wash` | `#EEEEFD` | quiet accent surfaces |

The accent is sampled from the EA monogram itself, so the brand color and the logo cannot drift apart. Neutrals are deliberately neutral rather than warm — a cream ground makes a cool indigo read as accidental.

Changing the brand color is a one-line edit to `--accent` / `--accent-deep`, then `npm run assets:brand` to regenerate the logo colorways and favicons. Also update the (currently disabled) Amazon Connect colors in `index.html`, which are set client-side and cannot read CSS.

`theme.colors`, `borderRadius` and `boxShadow` are **replaced, not extended**. Tailwind's default palette and every drop shadow do not exist in this build, so stale classes visibly fail instead of quietly surviving.

**Radius:** `rounded-lg` (8px) is the sitewide standard — apply it to every bordered panel, card, button, and framed image. `rounded-xl/2xl/3xl` still don't exist (that's the "generic rounded-2xl SaaS card + drop shadow" look this design deliberately avoids); 8px stays deliberate without tipping into that. When a card's image sits flush to its edge, pair `rounded-lg` with `overflow-hidden` on the card so the image clips to the corner instead of poking past it — `border-radius` alone only rounds the box's own border/background, not children. An `<img>` with its own `border-radius` clips correctly without a wrapper. Hairline dividers, left-accent bars (`border-l-2`), and underline-style form inputs are not boxes and should stay unrounded.

**Type:** Instrument Serif (display, 400 + italic only) and Instrument Sans Variable (body/UI), self-hosted via `@fontsource`. Two families — do not add a third.

### Banned patterns
`npm run check:design` fails on: `bg-gradient-to-*`, `bg-clip-text`, `shadow-sm/md/lg/xl`, `rounded-xl/2xl/3xl`, default Tailwind color ramps, and `window.location.href =`. Comments are stripped before matching, so documenting a removed pattern is fine.

The gradient ban targets the Tailwind utility specifically — the generic "indigo-to-blue SaaS hero" tell — not gradients as a concept. `.hero-glow` in `src/index.css` (`@layer components`) is a one-off `radial-gradient` for dark hero sections, written as plain CSS so it doesn't trip the gate. Reach for it (or a sibling class) before reintroducing `bg-gradient-to-*`.

## Images

- **`assets-src/`** — full-resolution masters. Not deployed.
- **`public/`** — only web-sized `.webp`, generated by `npm run assets:images`.

Vite copies all of `public/` into `dist/` verbatim, so anything left there ships whether referenced or not. Originals totalled ~12.6MB; the generated set is ~300kB. Always give `<img>` explicit `width`/`height` to prevent layout shift.

Brand assets (`logo-ink/accent/paper.png`, favicons) are generated from `public/logo.png` by `npm run assets:brand`, which paints color through the source PNG's alpha channel.

## Testing

Vitest + Testing Library, jsdom. `src/test/setup.js` stubs `IntersectionObserver` (Framer Motion's `whileInView`), `matchMedia`, and scrolling — jsdom implements none of them.

Assert **behavior, not presentation**: text users read, `href` targets, form field names, section ids, ARIA. Do not assert class names — they change with every design pass and tell you nothing about whether the site works.

Header/footer chrome repeats nav labels, the company name, emails and the office in page-level renders. Use `getAllByText` or scope with `within(container.querySelector('#services'))`.

## Content updates

- Landing copy: `src/EAACapitalLanding.jsx` (arrays at top of file)
- About bios: `src/About.jsx`
- Case studies: `src/caseStudies.js` — each needs `slug`, `title`, `client`, `category`, `excerpt`, `image`, `date`, `readTime`, `tags`, `challenge`, `solution`, `results`, optional `testimonial`, `technologies`. Entry 2 (`enterprise-customer-service-transformation`) is currently commented out; uncommenting it is all that is needed to publish it.

## External integrations

- **Formspree** — `https://formspree.io/f/xqadveqj`. Field names `FullName`, `email`, `company`, `message` are load-bearing; renaming one silently breaks inbound leads. Covered by a test.
- **Calendly** — `https://calendly.com/edgar-eaacap/30min`
- **Amazon Connect** chat widget — **disabled**. The script block is commented out in `index.html`; uncomment to restore. Its colors are already set to the current accent.
- **Netlify** — SPA routing via `public/_redirects`.
