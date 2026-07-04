# Architecture

Lightweight decision log for the portfolio. One page, static output, no server.

## Layout

```
client/
  index.html          document shell: SEO meta, JSON-LD, font links, LCP preload
  public/             static assets copied verbatim into the build
                      (CNAME, favicons, og-preview.png, victoria-portrait.webp)
  src/
    app/              main.tsx entry → App.tsx (MotionConfig, CursorGlow, router)
                      + index.css (Tailwind layers, cascade order)
    pages/home/       index.tsx (composition only) + home.module.css
                      (single stylesheet shared by all section components)
    features/         one folder per section: hero, about (+ geometric-
                      wireframe), experience, philosophy (+ tangle-to-clarity),
                      projects, testimonials (+ slack-testimonials), contact,
                      footer, not-found (lazy-loaded 404 chunk) — components
                      used by exactly one section live in that section's folder
    shared/
      components/     cross-feature pieces (navigation, code-background,
                      scroll-reveal, section-title, particle-system,
                      cursor-glow) + ui/card (shadcn)
      hooks/          use-scroll-reveal
      constants/      strings.ts (all copy/content) · layout.ts (animation
                      numbers) · colors.ts (console palette)
      styles/         tokens.css — design tokens (single source for
                      colors/spacing/type/etc.)
      lib/            utils.ts (cn) · console-signature.ts (easter egg)
    test/             vitest setup + smoke tests
assets/               image sources of truth (not shipped as-is)
scripts/              sharp pipelines: gen-portrait.mjs, gen-icons.mjs
```

## Decisions

**Static-only.** The Express/drizzle scaffold the project template shipped with
was removed (2026-07): its one endpoint was never called by the client. CI
builds `public/` from source on every push; build output is not committed.

**CSS Modules over global BEM.** Modules already provide the isolation BEM
encodes in names. Convention: camelCase class names, dot access. The older
files (home.module.css, navigation.module.css) still carry BEM-ish
`block__element--modifier` names — renaming them is churn with no payoff, so
both styles coexist; write new classes camelCase.

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
it — with a hashed JS import the browser couldn't discover it until the bundle
executed, which put baseline LCP at 20 s.

**Cascade order** (index.css): tokens import → Tailwind base/components/
utilities layers → shadcn variable block → `@layer base` element styles →
`.particle` utility → keyframes → reduced-motion kill-switch. CSS Modules are
unlayered and load after, so they win ties against layered Tailwind rules.
