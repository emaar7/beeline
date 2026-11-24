# Project Brief — Beeline Uzbekistan Website Redesign (Concept)

> Written for another Claude (or a human reviewer) who needs to understand this project quickly.
> Everything below describes the actual state of the repository. Where something is a placeholder or limitation, it says so.

## 1. What this project is

A redesigned **concept website for Beeline Uzbekistan** (mobile operator). The existing site, https://beeline.uz/uz, was judged boring and not user-friendly. The goal of this rebuild:

- A **creative hero** and **scroll-driven animation** throughout (inspiration: a soft, immersive Dribbble app shot — https://dribbble.com/shots/27239697-Superconscious-AI-Powered-Self-Growth-App).
- **Sell tariffs** (primary) and work as a **brand showcase** (secondary).
- An **AI assistant** that helps customers choose a tariff and leads them to the **hambi** app (https://hambi.uz), Beeline's super-app.

It is a **design concept / prototype**, not the official Beeline site. The footer says so.

## 2. Decisions made with the user

| Topic | Decision |
|---|---|
| Hero concept | **"Speed tunnel"** — fly through a yellow/black hexagonal tunnel as you scroll |
| Goals | Sell tariffs + brand showcase |
| Scope | Landing page + key pages (`/tariffs`, `/internet`) |
| Stack | Next.js + GSAP, three languages: Uzbek (default), Russian, English |
| Chatbot engine | **Hybrid**: guided scripted flow now, real AI model later |
| Chatbot popup | Greeting bubble ~3 s after load, then chat on click |
| Chatbot form | Later changed to a **floating bee mascot** that flies across the page |
| Tariff data | Real mobile tariffs from beeline.uz (user-provided link) |
| hambi link | `https://hambi.uz` (no language suffix) |

## 3. Tech stack

- **Next.js 16** (App Router, `cacheComponents` and `partialPrefetching` enabled in `next.config.ts`), React 19, TypeScript
- **Tailwind CSS v4** (tokens in `app/globals.css`)
- **GSAP** (ScrollTrigger, MorphSVG — free since GSAP 3.13) for scroll-driven animation
- **Lenis** for smooth scrolling (synced to the GSAP ticker)
- Fonts via `next/font/google`: **Unbounded** (display), **Inter** (body); Latin, Latin-ext and Cyrillic subsets
- **Canvas 2D** for the tunnel (no Three.js)

> `AGENTS.md` warns this Next.js version has breaking changes versus older versions. Read `node_modules/next/dist/docs/` before changing framework-level code.

Run it:

```bash
npm install
npm run dev      # development
npm run build && npm start   # production
```

`/` redirects to `/uz`.

## 4. Routes

| Route | Content |
|---|---|
| `/{lang}` | Landing page (hero, scroll sections) — `lang` is `uz`, `ru` or `en` |
| `/{lang}/tariffs` | Tariff browser (Mobile / Home internet tabs) + tariff finder |
| `/{lang}/internet` | Home internet plans, download-race demo, FAQ |

Routes are statically generated for the three locales (`generateStaticParams` in `app/[lang]/layout.tsx`). The assistant, header, footer and smooth scroll live in that shared layout, so they appear on every page.

## 5. Landing page — sections in order

1. **Hero** (`Hero.tsx`, `Tunnel.tsx`) — pinned for ~320% of viewport height. Scroll position *and scroll velocity* drive tunnel speed; the cursor bends the tunnel; a counter climbs 0 → 1000 Mbit/s; three headline stages swap ("Feel the speed" → "1 Gbit per second" → "One line. All of Uzbekistan.").
2. **Ticker** (`Ticker.tsx`) — yellow marquee band that skews with scroll velocity.
3. **Statement** (`Statement.tsx`) — a paragraph whose words light up as you scroll.
4. **Tariffs rail** (`TariffsRail.tsx`) — desktop: pinned section where tariff cards travel sideways with scroll; mobile: native snap-scroll row.
5. **Tariff finder** (`TariffFinder.tsx`) — two sliders (GB, minutes) → cheapest matching real plan, animated price.
6. **Speed race** (`SpeedRace.tsx`) — pinned race of 3G / 4G / 5G / fibre markers driven by scroll (theoretical maxima, generic technology classes).
7. **World stack** (`WorldStack.tsx`) — sticky stacking cards that shrink/dim as the next slides over.
8. **Stats** (`Stats.tsx`) — count-up numbers.
9. **Final CTA** (`FinalCta.tsx`) — a wavy "bee-line" path draws itself on scroll, then morphs straight (GSAP MorphSVG).
10. **Footer**.

Cross-cutting: `ScrollProgress.tsx` (thin progress line with a dot on the right edge), `Header.tsx` (language switcher, mobile menu).

Accessibility/perf notes: `prefers-reduced-motion` is respected (no smooth scroll, no pinned horizontal rail, static tunnel frame, still bee). The tunnel pauses when off-screen and caps device pixel ratio at 2.

## 6. The AI assistant (bee mascot)

Files: `components/AiAssistant.tsx`, `components/BeeMascot.tsx`; copy in `lib/dictionaries.ts` under `chat`; plan logic in `lib/data.ts`.

**Behavior**
- A yellow bee flies in after load, **drifts across the page while the user scrolls**, and returns to a corner perch ~2 s after scrolling stops. Position is driven by a `requestAnimationFrame` loop (scroll progress → target point, eased).
- Speech bubbles: a greeting (once per session, stored in `sessionStorage`) and **contextual hints** when the user reaches the tariffs, speed-race and world sections (found by element ids `tariffs`, `coverage`, `world`).
- Clicking the bee opens a chat panel. Bot replies show a "thinking" state, then **stream in letter by letter**; the plan card / hambi button appear after the text finishes.
- Guided flow: personal / family / home internet → data need → calls need (or number of lines for family) → recommendation (best match + next plan up) → **button to https://hambi.uz** and a link to the plan's beeline.uz page.
- Free-text box: understands a few keywords and patterns like "100 gb" / "500 min" in uz/ru/en; otherwise falls back to the buttons.

**Important honesty note:** the assistant is currently **rule-based**, not a language model. The streaming text, thinking state and mascot make it *feel* AI-driven, but answers come from the scripted flow and keyword matching. The name "AI assistant" was the user's requirement. A real model (planned via the Vercel AI Gateway + AI SDK, route like `/api/chat`, prompted to stay on tariffs and steer to hambi) has **not** been built; it needs a Vercel project and AI Gateway credentials.

**Recommendation logic** (`recommend()` in `lib/data.ts`): among public plans sorted by price, pick the first whose GB and minutes cover the need; also return the next plan up. Restricted plans are never recommended.

## 7. Data and where it comes from

**Mobile tariffs are real**, scraped from https://beeline.uz/ru/products/tariffs and `/other` on **2026-11-24** (`lib/data.ts`):

| Plan | Price (so'm/mo) | Notes |
|---|---|---|
| SUHBAT+ | 45 000 | 3000 min, 1000 SMS, no data |
| OPTIMAL+ | 55 000 | 700 min, 15 GB (+25 GB on TAS-IX), 500 SMS |
| VIBE | 80 000 | 80 GB, 500 SMS; site prints "45 000 минут" (looks odd — verify) |
| Oila 3 / 5 / 7 | 90 000 / 150 000 / 175 000 | Family plans, unlimited calls, 225 / 450 / 700 GB, up to 3 / 5 / 7 numbers. These are **new-connection promo prices for 3 months**; regular prices are 155 000 / 300 000 / 350 000 |
| IJTIMOIY, UKLON | — | **Restricted** (special groups / Uklon drivers) — kept in data, never shown or recommended |

The user pointed at the "archived tariffs" page, but archived plans are discontinued, so the **current** tariffs pages were used.

**Still placeholders / demo:**
- **Home internet plans** (50/100/300/1000 Mbit/s and their prices) are invented.
- **Logo** (`Logo.tsx`) is a self-drawn stand-in, not Beeline's.
- "World" cards, stats (14 regions, 5G, 24/7), footer links, store-finder button, FAQ answers are generic placeholder content.
- Uzbek, Russian and English copy was written by an AI; Uzbek especially should be reviewed by a native speaker.

**About hambi** (from hambi.uz): a "super-app" bundling mobile services/tariffs, TV, games, car/health insurance, flights and reward points. The assistant describes it only in those terms.

## 8. File map

```
app/
  globals.css              Tailwind tokens, animations (bee, marquee, chat)
  [lang]/layout.tsx        html shell, fonts, header/footer, smooth scroll, AI assistant
  [lang]/page.tsx          landing page
  [lang]/tariffs/page.tsx  tariffs page
  [lang]/internet/page.tsx home internet page
components/                all UI (see sections above), plus
  TariffCard.tsx           MobileCard / HomeCard
  TariffsBrowser.tsx       tabs + grid for /tariffs
  DownloadRace.tsx         4 GB download race demo for /internet
  PageHero.tsx, SplitWords.tsx, Logo.tsx, SmoothScroll.tsx, ...
lib/
  dictionaries.ts          ALL copy for uz / ru / en (typed; ru and en must match uz's shape)
  data.ts                  tariff data, recommend(), price formatting, link helpers
next.config.ts             cacheComponents, redirect / -> /uz, turbopack CSS rule
```

## 9. Status

- Builds cleanly (`npm run build`); type-check and ESLint are clean for the assistant files. `Header.tsx` has one pre-existing lint complaint (`setState` inside an effect) and `Tunnel.tsx` one warning; neither affects the build.
- Visually verified with headless Chromium screenshots on desktop and mobile widths (hero, home sections, tariffs, internet, chat flow, bee flight). Not tested on real devices or across browsers; animation smoothness was judged from screenshots and position checks, not by feel.
- **Not deployed.** The Vercel CLI wasn't installed and no Vercel credentials were available in the build environment. Deploying a preview needs Vercel access (connector authorization or a token).
- Git branch: `claude/friendly-archimedes-ez8h59` (no PR opened).

## 10. Known limitations and next steps

1. Wire in a **real AI model** for the assistant (AI SDK + Vercel AI Gateway) with tariff data in the prompt/tools.
2. Replace placeholder content: logo, home internet plans, "world" cards, stats, footer links, store finder, real photography/brand fonts.
3. Re-verify tariff prices before any real use (promos and prices change).
4. Native-speaker review of Uzbek copy; sanity-check Russian and English.
5. Deploy a preview and test scroll animations on real phones.
6. Consider optionally making the bee follow the cursor (deliberately left out to avoid annoying users).
7. Accessibility pass beyond the basics already done (focus order inside the chat, screen-reader testing).

## 11. Tips for a Claude picking this up

- All user-visible text lives in `lib/dictionaries.ts`; add keys to `uz` first, then `ru` and `en` (TypeScript will force them to match).
- Plans live only in `lib/data.ts`; the cards, finder, rail and assistant all read from there.
- GSAP animations are created in `useEffect` with `gsap.context(...)` / `gsap.matchMedia()` and reverted on cleanup — keep that pattern, especially for pinned sections (pin spacers otherwise break React unmounting).
- The bee's flight is a plain `requestAnimationFrame` loop inside `AiAssistant.tsx`, not GSAP.
- The chat scroll area carries `data-lenis-prevent` so wheel scrolling inside it doesn't scroll the page.
- Don't claim the assistant is an LLM unless one is actually connected.
