# Architecture

Lightweight decision log for the portfolio. One page, static output, no server.

## Layout

```
client/
  index.html          document shell: SEO meta, JSON-LD, font + LCP preloads
  public/             static assets copied verbatim into the build
                      (CNAME, favicons, fonts/, og-preview.png, portraits)
  src/
    app/              main.tsx entry → App.tsx (MotionConfig, CursorGlow, router)
                      + index.css (Tailwind layers, cascade order)
    pages/home/       index.tsx (composition only) + home.module.css
                      (single stylesheet shared by all section components)
    features/         one folder per section: hero, about (+ geometric-
                      wireframe), experience, philosophy (+ tangle-to-clarity),
                      projects, testimonials (+ slack-testimonials), contact,
                      footer - components used by exactly one section live in
                      that section's folder. Non-section features: not-found
                      (lazy 404 chunk + suggest-sections.ts), cat (lazy /cat
                      chunk: cat-frames.ts + cat-playground.tsx), print-resume
                      (the Cmd+P one-page document)
    shared/
      components/     cross-feature pieces (navigation, code-background,
                      scroll-reveal, section-title, particle-system,
                      cursor-glow, scramble-text)
      hooks/          use-scroll-reveal
      constants/      strings.ts (all copy/content) · layout.ts (animation
                      numbers) · colors.ts (console palette)
      styles/         tokens.css - design tokens (single source for
                      colors/spacing/type/etc.) · fonts.css (generated
                      @font-face rules; see scripts/gen-fonts.mjs)
      lib/            console-signature.ts (easter egg) · maze.ts (+ test) -
                      the generator behind victoria.maze() and the 404 maze
    test/             vitest setup + smoke tests
assets/               image sources of truth (not shipped as-is)
scripts/              sharp pipelines: gen-portrait.mjs, gen-icons.mjs,
                      gen-og.mjs · gen-fonts.mjs (vendors woff2) ·
                      visual-diff.mjs (pixel-diff regression harness)
```

## Decisions

**Static-only.** The Express/drizzle scaffold the project template shipped with
was removed (2026-07): its one endpoint was never called by the client. CI
builds `public/` from source on every push; build output is not committed.

**CSS Modules with classic BEM names.** Modules provide the isolation, BEM
provides the readability: every class is `block__element--modifier` with
kebab-case words, so a name always says which component owns it - in source,
in grep, and in devtools (the hash embeds it). This reverses the earlier
"write new classes camelCase" convention (2026-07): by then ~85% of classes
were already BEM and the blocks map 1:1 to the feature folders, so finishing
the job beat keeping two dialects. Cost: hyphenated names need bracket access
in JSX (`styles['about__impact-row']`); hyphen-free ones keep dot access
(`styles.hero__tagline`). Enforced by stylelint `selector-class-pattern`.

**One `home.module.css` for all sections.** The section components each import
the same module, so hashed class names are shared and within-file rule order
(which is load-bearing in a few places, e.g. `.card.about__method`) is
preserved. Split it only with a visual-regression check in hand.

**Tokens + constants split.** Visual values → `shared/styles/tokens.css` (CSS
custom properties). Copy/content → `shared/constants/strings.ts`. Animation
durations/delays/offsets → `shared/constants/layout.ts`. If a value repeats twice,
it gets a name.

**Two scroll-reveal mechanisms, deliberately.** `ScrollReveal` (IO-based,
y=50px) for section titles/lists; hand-rolled `whileInView` blocks (margin
-80px, y=30px) in About/hero with per-item stagger. They have different
trigger semantics; consolidating them changes timing, so they stay separate.

**Animations pause when unobservable.** CodeBackground streams and the WebGL
wireframe gate on IntersectionObserver; the particle DOM churn pauses on
`visibilitychange`; everything honors `prefers-reduced-motion` (framer via
`MotionConfig reducedMotion="user"`, CSS via the global kill-switch in
index.css).

**LCP image strategy.** The portrait ships as a stable-named WebP in
`client/public/` (not a hashed import) so `index.html` can `<link rel="preload">`
it - with a hashed JS import the browser couldn't discover it until the bundle
executed, which put baseline LCP at 20 s.

**`/cat` is a route, not a section.** The ASCII cat is an easter egg reached
from the console (`victoria.cat()`), so it gets its own lazy chunk alongside
not-found: a hidden gem shouldn't weigh on the homepage's critical path. It
lives in `features/` rather than `pages/` because it's one self-contained
component, not a composition of sections. Frames are baked silhouette masks
refilled with fresh glyph noise each render (`cat-frames.ts`), so the fur
shimmers without shipping a sprite sheet per pose.

**Print is a separate document, not print styles on the live page.** The
interactive layout can't reflow to one page, so `features/print-resume` renders
a parallel one-page resume and `home.module.css` swaps the two under
`@media print`. It reads the same constants the live sections do
(`EXPERIENCE_LOG`, `ABOUT_IMPACT`, ...), so print can't drift from the page.
Unlike `/cat` it is _not_ lazy: Cmd+P fires with no time to fetch a chunk, so it
ships in the main bundle. It carries `aria-hidden` as well as `display: none`,
since the duplicate `h1` must stay out of the a11y tree where the print CSS
doesn't apply (jsdom in tests).

**Cascade order** (index.css): tokens import → Tailwind base/components/
utilities layers → shadcn variable block → `@layer base` element styles →
`.particle` utility → keyframes → reduced-motion kill-switch. CSS Modules are
unlayered and load after, so they win ties against layered Tailwind rules.
