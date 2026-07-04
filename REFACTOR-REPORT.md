# REFACTOR-REPORT — Deep Review of victoriakirichenko.com

Branch `refactor/deep-review`, 30 commits from `1e43339`.
**Net: −10,679 lines** (2,414 added / 13,093 deleted, excluding lockfile and baselines).
Plan: [REFACTOR-PLAN.md](REFACTOR-PLAN.md) · Baseline: [refactor-baseline/BASELINE.md](refactor-baseline/BASELINE.md)

## Before / after

| Metric                        | Before                                              | After                                                        |
| ----------------------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| Page weight (raw)             | **~3.83 MB** (455 kB JS + 116 kB CSS + 3.26 MB PNG) | **~680 kB** (347 kB JS + 56 kB CSS + 273 kB WebP)            |
| JS (gzip)                     | 147.1 kB                                            | 111.9 kB (+ 7.6 kB lazy 404 chunk)                           |
| CSS (gzip)                    | 20.6 kB                                             | 11.5 kB                                                      |
| Lighthouse Performance        | 63                                                  | **73**                                                       |
| Lighthouse Accessibility      | 85                                                  | **93**                                                       |
| Lighthouse Best Practices     | 77                                                  | **96**                                                       |
| Lighthouse SEO                | 92                                                  | 92                                                           |
| **LCP** (mobile emulation)    | **20.0 s**                                          | **4.7 s**                                                    |
| FCP                           | 3.9 s                                               | 3.6 s                                                        |
| CLS / TBT                     | 0 / 180 ms                                          | 0 / 180 ms                                                   |
| Source files under client/src | ~90                                                 | 38                                                           |
| Runtime dependencies          | 46                                                  | **7**                                                        |
| Tests                         | none                                                | 5 smoke tests + visual-regression harness                    |
| Lint/format tooling           | none                                                | ESLint + Stylelint + Prettier + husky/lint-staged + CI gates |

Pixel verification: all screenshot diffs vs. the pre-refactor baseline sit at or
below the same-build noise floor (randomized glyph fields + reveal-timing
animations, ≤0.42%), except tablet-768 where the **one intentional rendering
change** lives (see below). `not-found` is 0.000% pixel-identical at all widths.

## What changed, by category

**Dead code removal.** 43 unused shadcn components, the entire forms library,
2 hooks, the constants barrel, a 488-line orphan stylesheet, and three inert
App-level providers (react-query, Toaster, TooltipProvider — mounted but
provably unused; −~100 kB min JS). The vestigial Express/drizzle full-stack
scaffold was deleted (its one endpoint console-logged and was never called);
the static build is now the only mode. Three generations of committed build
output removed; `public/` and `dist/` are gitignored (CI builds from source).

**Bugs fixed (all pre-existing).**

- `var(--font-mono)` referenced 7× but defined nowhere (worked by inheritance luck)
- `scroll-behavior: smooth !important` silently defeated the reduced-motion override
- `maximum-scale=1` blocked pinch zoom on Android (WCAG 1.4.4)
- Closed mobile menu left 6 invisible buttons in the tab order
- Nav logo was a clickable div — not keyboard-reachable
- Testimonials tablist was half-implemented ARIA (no arrow keys, no tabpanel)
- framer-motion entrances ignored `prefers-reduced-motion` (CSS can't reach WAAPI)
- 767/768 breakpoint boundary conflict (see "intentional change")
- Duplicate `.about__impactMetric` / universal-selector rules; deprecated `word-wrap`
- `nanoid` was imported but undeclared (moot — file deleted with the server)

**CSS/tokens.** Duplicate `.dark` block (byte-identical to `:root`) removed;
36 unused token definitions pruned (each grep-verified); repeated taupe color
and easing curves tokenized; tailwind config pruned of chart/sidebar/accordion/
typography referencing nothing; fonts consolidated into `index.html` (no more
render-blocking `@import`), Inter 800 and Lato italic dropped (zero usages).

**Performance.** Portrait re-encoded 3.26 MB PNG → 273 kB WebP (sharp, q82,
same dimensions) at a stable path so `index.html` preloads it — baseline LCP
was 20 s because the hashed JS import hid the image until the bundle executed.
Replit's third-party dev-banner script no longer ships to production. The
CodeBackground streams and WebGL wireframe pause via IntersectionObserver when
offscreen; particle DOM churn pauses when the tab is hidden; the nav scrollspy
is rAF-coalesced (was 6 forced layouts per scroll event); the 404 route is a
lazy chunk.

**Accessibility (invisible).** `<main>` landmark, corrected heading outline
(kicker h2→p, h4→h3 skips fixed), `aria-expanded`/`aria-controls` on the
hamburger, `aria-current` on nav items, full WAI-ARIA tabs pattern with focus
management in the testimonials, focus-visible styles, decorative icons
`aria-hidden`, distinct 404 document title, `MotionConfig reducedMotion="user"`.

**SEO.** Canonical link + JSON-LD Person schema added.

**Structure.** 706-line `home.tsx` split into `pages/home/` — one component
per section, shared `SectionTitle` (was copy-pasted 5×), contact cards mapped
from data (was copy-pasted 3×), Projects content moved to `constants/strings.ts`
beside its siblings. All sections share the single moved `home.module.css`, so
hashed classes and load-bearing rule order are untouched.

**Tooling.** ESLint (flat, typescript-eslint + react-hooks), Prettier applied
repo-wide, Stylelint tuned for CSS Modules, `.editorconfig`, husky + lint-staged
pre-commit (lint + format + tsc), lockfile now tracked, CI runs `npm ci` then
lint and type-check before building, stale branch trigger removed. README
rewritten (it documented the deleted stack); ARCHITECTURE.md records the
decisions.

## The one intentional rendering change

At **exactly 768 px viewport width**, the hero buttons now get desktop padding
(16/40 px, was 14/32 px mobile). Both `max-width: 768px` and `min-width: 768px`
rules matched at that single width, producing a mobile-padded button inside a
desktop layout; 768 now resolves to desktop everywhere, matching the seven
`min-width: 768px` layout rules. Approved in review (plan §8, batch B).

## RISKY items deliberately NOT changed

- **Replacing `motion` (~120 kB min / ~40 kB gz)** with CSS/IO equivalents —
  the biggest remaining JS win, but exact timing/stagger parity across every
  entrance can't be guaranteed pixel-perfect. Revisit with the visual harness.
- **Pause control for infinite background animations** (WCAG 2.2.2, Level A) —
  requires new visible UI. The site's most defensible remaining a11y gap.
- **Skip-to-content link** — invisible until focused, but the focused state is
  new visible UI.
- **Consolidating the two scroll-reveal mechanisms** — different trigger
  semantics (IO threshold vs. whileInView margin) and offsets; merging changes
  timing. Documented in ARCHITECTURE.md instead.
- **Lazy-loading wireframe/testimonials** — placeholder-height CLS risk for
  ~18 kB; not worth it.

## Follow-up backlog (needs design/behavior decisions)

1. Responsive portrait `srcset`/AVIF (LCP 4.7 s → ~3 s on throttled mobile;
   the 273 kB WebP is still the largest download).
2. Self-host fonts or add a metric-adjusted (`size-adjust`) local fallback —
   the remaining FCP/LCP tax is Google Fonts CSS; changes the pre-swap frame.
3. Re-theme the light-mode 404 page onto the dark token system (off-brand today).
4. Remove the blanket `translateZ(0)`/`backface-visibility` "GPU hint" rules in
   index.css after profiling (they predate the current design; `[class*="card"]`
   substring-matches broadly).
5. Migrate the ~22 `hsla(42,30%,88%,α)` literals to `color-mix()` on the primary
   token (hue drifts 88% vs 89% lightness between copies — needs a visual pass).
6. Merge the copy-synced hero scan stream and CodeBackground glyph styles into
   one shared implementation.
7. `aria-labelledby` on sections for a richer screen-reader outline.
8. Consider `content-visibility: auto` on below-fold sections.

## Verification trail

Every batch: `tsc` + production build + full-page screenshot diff vs. baseline
(same capture script, noise floor established by diffing two captures of the
same build) + interaction walk on the dev server (nav scroll-spy and smooth
scroll, mobile menu open/close + focus, testimonial tabs by mouse and arrow
keys, drill-down focus hand-off, `victoria.maze()` easter egg, 404 route).
Final: Lighthouse compared to baseline (table above), zero console errors on
the production build, 5/5 smoke tests, ESLint/Stylelint/Prettier clean.
