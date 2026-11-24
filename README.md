# Beeline Uzbekistan — concept site

Next.js (App Router) + Tailwind v4 + GSAP ScrollTrigger/MorphSVG + Lenis. Locales: `/uz` (default), `/ru`, `/en`.

```bash
npm install
npm run dev
```

## What's here
- **Hero** – pinned "speed tunnel" (canvas hex tunnel). Scroll and scroll *velocity* drive speed, the counter climbs 0 → 1000 Mbit/s, three headline stages swap, cursor bends the tunnel.
- **Home sections** – velocity-skewed ticker, scroll-lit statement, pinned horizontal tariff rail, tariff finder, pinned speed race, stacking brand cards, count-up stats, bee-line CTA (path draws, then morphs straight).
- **/tariffs** and **/internet** – inner pages with tabs, finder, download-race demo, FAQ.
- Respects `prefers-reduced-motion`; mobile uses native scrollers instead of pinned horizontal scroll.

## Placeholders to replace
Logo (`components/Logo.tsx`), all copy (`lib/dictionaries.ts`), plans/prices (`lib/data.ts`), footer links, store finder, real photography/brand fonts.
