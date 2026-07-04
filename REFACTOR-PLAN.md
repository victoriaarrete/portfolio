# REFACTOR-PLAN — Deep Review of victoriakirichenko.com

Prepared on branch `refactor/deep-review` (from `feat/console-signature-polish` @ `1e43339`).
Baseline captured in [refactor-baseline/BASELINE.md](refactor-baseline/BASELINE.md):
build passes, `tsc` clean, **no tests exist**, Lighthouse P63 / A85 / BP77 / SEO92, **LCP 20.0 s**,
bundle 455 kB JS (147 kB gz) + 116 kB CSS + a **3.26 MB** portrait PNG.

Prime directive honored throughout: zero visual, behavioral, or URL/SEO-visible changes.
Anything that can't be verified pixel/behavior-identical is flagged RISKY and left for your call.

---

## 1. Architecture map (current state)

```
client/               ← the real site (Vite root)
  index.html          ← document shell, SEO meta, fonts, (Replit banner script)
  src/
    main.tsx → App.tsx → pages/home.tsx (706 lines, 7 sections + footer)
                       → pages/not-found.tsx
    components/       ← 8 live custom components + 47 shadcn ui/ (43 dead) + forms/ (all dead)
    hooks/            ← 4 (2 live, 2 dead)
    lib/              ← utils, console-signature, queryClient (inert)
    constants/        ← layout/strings/colors (live) + index.ts barrel (dead)
    styles/           ← tokens.css (live), utilities.module.css (488 lines, dead)
server/, shared/, drizzle.config.ts   ← vestigial Replit full-stack scaffold; client never calls it
public/               ← committed static build output (CI rebuilds it anyway)
dist/                 ← committed full-stack build output (stale)
index.html + assets/index-*.{css,js}  ← ROOT-level stale build from the old /portfolio/ base-path era
```

Key architectural facts established by the audit:

- **Only 31 of ~90 files under `client/src` are reachable** from the entry point. No dynamic imports, so the graph is exact.
- The Express server exposes one endpoint (`POST /api/contact`) that just `console.log`s; **no client code ever fetches it**. The contact section is mailto/LinkedIn links. `storage.ts`, `shared/schema.ts`, drizzle are unreachable even from the server routes.
- Three generations of build output are committed (`dist/`, `public/`, root `index.html`+`assets/index-*`), while CI (`deploy.yml`) rebuilds from source on every push to `main`.
- `package-lock.json` is **gitignored** and CI runs unpinned `npm install` — deploys are not reproducible.
- Latent bug: `server/vite.ts` imports `nanoid`, which is not declared in `package.json` (resolves transitively).
- Separation of concerns in the live code is actually decent: CSS Modules per component, constants extracted, runtime values via CSS custom properties. The violations are concentrated in `home.tsx` (see §2).

## 2. Duplication report (DRY)

| # | Finding | Where |
|---|---|---|
| D1 | `home.tsx` is a 706-line monolith (7 sections + footer); `home.module.css` is 1,920 lines | `client/src/pages/` |
| D2 | Section-title header block copy-pasted 5× | home.tsx:355, 455, 503, 603, 619 |
| D3 | Contact method card copy-pasted 3× (should map over data) | home.tsx:635–687 |
| D4 | Hand-rolled `whileInView` motion blocks duplicate the existing `ScrollReveal` component 4× + 2 variants; inline `margin: '-80px'` ×4 while `SCROLL.ROOT_MARGIN` exists | home.tsx:244–334 |
| D5 | Projects content inline in JSX while all sibling sections' content lives in `constants/strings.ts` | home.tsx:518–545 |
| D6 | Glassmorphism recipe hand-inlined ~6× (2 dead); blur radius drifts 8px vs 16px between copies | home.module.css:954, 1013, 1417; navigation.module.css:18; slack-testimonials.module.css:15 |
| D7 | Hero scan stream duplicates CodeBackground glyph-for-glyph (comments admit "copy-sync") | home.module.css:206–248 vs code-background.module.css:32–51 |
| D8 | Container recipe (max-width/margin/padding) repeated 4× | hero/section/footer/navigation containers |
| D9 | Scroll-reveal implemented 3 ways (2 dead CSS versions + live Motion one) | index.css:147, utilities.module.css:6, scroll-reveal.tsx |
| D10 | Magic numbers bypassing the constants system: `Math.max(0.55, 1 - index*0.07)`, settle timeouts 400/1400, scroll-cue `y:[0,8,0]`/`duration: 2` | home.tsx:90–91, 231–232, 385 |

## 3. CSS audit

**Real bugs (fix first):**
- **`var(--font-mono)` referenced 7× but never defined** (token is `--font-family-mono`). Renders correctly only because `body` already uses Space Mono — a silent time bomb. home.module.css:1436, 1475, 1503, 1542, 1553, 1565, 1612.
- **`html { scroll-behavior: smooth !important }`** (index.css:77) beats the reduced-motion `* { scroll-behavior: auto !important }` override on specificity — reduced-motion users still get smooth scroll. The one genuine `!important` bug; only 5 `!important`s exist total, no ID selectors anywhere.
- **Breakpoint boundary mismatch**: `max-width: 767px` vs `max-width: 768px` coexist — at exactly 768 px the `.button` gets mobile padding in a desktop layout.
- Token conflict: shadcn `--primary-foreground` (near-white) vs `tokens.css` `--color-primary-foreground` (near-black). Not hit by live pages today; a trap for any future shadcn use.

**Dead CSS**: `utilities.module.css` (488 lines, zero imports), most of `index.css` `@layer utilities` (only `.particle` + its keyframes are live), orphans `.card--hover/__title/__text/__subtitle` in home.module.css, duplicate `.dark {}` block byte-identical to `:root`, ~20 unused tokens, `chart`/`sidebar`/`accordion`/typography config in `tailwind.config.ts` pointing at undefined vars or dead components.

**Naming**: two generations coexist — BEM-with-camelCase-elements (home, navigation) vs pure camelCase (newer components). One stray kebab element `hero__portrait-image`. Inline `style={}` usage is 100% principled (runtime-computed custom properties only).

**On the prompt's "adopt BEM everywhere" directive — recommendation to deviate:** this codebase already migrated *away* from global BEM to **CSS Modules**, where hashing provides the isolation BEM exists to fake, and the project's recorded convention is camelCase module classes (dot access). Renaming ~200 classes to strict `block__element--modifier` would churn every component for negative value and force bracket access throughout. **I recommend standardizing on camelCase module classes** (renaming only the stray kebab one), documenting that as the convention in ARCHITECTURE.md. Flagged for your approval since it deviates from the prompt.

**Cascade**: order is sane (fonts → tokens → Tailwind layers → base → utilities). Two load-bearing subtleties to document, not "fix": the reduced-motion kill-switch lives in a page module but applies globally (move to index.css), and `.card.about__method` relies on within-file order.

## 4. JavaScript/TypeScript audit

- **Dead files (verified per-file by grep):** 43 of 47 `ui/` shadcn components (live: card, toast, toaster, tooltip), all 9 `forms/` files, `use-scramble.tsx`, `use-mobile.tsx`, `constants/index.ts` barrel, plus `pages/portfolio.code-workspace` (a VS Code file committed inside src).
- **Reachable but inert:** `<Toaster />` (no `toast()` call exists anywhere), `TooltipProvider` (no `<Tooltip>` exists), `QueryClientProvider` + `lib/queryClient.ts` (no `useQuery`/`useMutation`/`apiRequest` call exists). Removing these three lines from `App.tsx` kills ~100 kB min JS with zero behavior change.
- **Unused imports in live files:** `useState`, `User`, `Card`, `CardContent` in home.tsx.
- **Unused dependencies (~35):** all auth/session/DB packages, 19 of 21 @radix-ui packages, react-hook-form, recharts, embla, cmdk, vaul, input-otp, react-day-picker, react-resizable-panels, date-fns, react-icons, next-themes, zod-validation-error, tw-animate-css, @jridgewell/trace-mapping — plus the entire express/drizzle chain if the server scaffold goes.
- TS `strict` already on; `tsc` clean; no implicit-any issues surfaced. Error handling: nothing async exists in live client code beyond event wiring — no swallowed promises found.
- `console-signature.ts` is intentional (easter egg) — startup cost negligible, maze runs on demand only.

## 5. HTML / semantics / accessibility (WCAG 2.1 AA)

Strong baseline: decorative layers consistently `aria-hidden`, real buttons nearly everywhere, 6 independent reduced-motion code paths, semantic lists, one `h1`, complete OG/Twitter meta, no duplicate IDs.

**Invisible fixes (pixel-identical, high value):**
- `maximum-scale=1` in viewport meta **blocks pinch zoom on Android** — WCAG 1.4.4 failure, the single highest-impact fix (index.html:5).
- Closed mobile menu keeps 6 invisible buttons tabbable (`max-height:0` hiding) — add delayed `visibility: hidden`.
- Nav logo is a clickable `motion.div` — not focusable/keyboard-operable; convert to `motion.button` + style reset.
- Hamburger lacks `aria-expanded`/`aria-controls`.
- Testimonials tablist is half-implemented ARIA (no arrow keys, no roving tabindex, no tabpanel) — either complete the pattern or demote to plain buttons.
- framer-motion entrances ignore prefers-reduced-motion (CSS kill-switch can't reach WAAPI) — one-line `<MotionConfig reducedMotion="user">`.
- Heading order: hero kicker `h2` precedes the `h1`; `h4`s skip `h3` in philosophy/contact (headings carry no styling → safe to renumber).
- Polish: `<main>` landmark, focus-visible + focus management in testimonial drill-down, `aria-hidden` on decorative lucide icons, `aria-current` on nav, canonical link, JSON-LD Person schema, 404 `document.title`.

**Flagged, NOT fixed (needs visual change — your decision):**
- WCAG 2.2.2 (Level A): no pause control for infinite background animations (particles, code stream, wireframe). A pause control is new UI.
- Skip-link's *focused* state is new visible UI (the link itself is invisible until focused).
- `not-found.tsx` is an off-brand light page in a dark site (works, but inconsistent).

## 6. Performance audit

Bundle anatomy (455 kB min): react+react-dom ~140 kB, **motion ~120 kB**, **react-query ~45 kB (does nothing)**, **Radix toast+tooltip ~55 kB (render nothing)**, wouter/lucide/app ~95 kB.

| Lever | Class | Impact |
|---|---|---|
| Re-encode 3.26 MB PNG → WebP/AVIF via existing sharp precedent (measured: WebP q82 @840w = **128 kB**, AVIF = 115 kB) | MODERATE (visually indistinguishable; needs your OK) | **−3.1 MB**, biggest LCP lever |
| Preload hero image + `fetchpriority="high"` (today the browser can't discover it until 455 kB JS executes — hence LCP 20 s) | SAFE | Parallelizes LCP with JS |
| Delete inert providers (react-query, Toaster, TooltipProvider) + deps | SAFE | **−~100 kB min / −30-35 kB gz** |
| Remove `replit-dev-banner.js` third-party script from index.html | SAFE | −1 blocking third-party request |
| Drop unused Inter 800 weight from fonts URL; audit Lato italic | SAFE / MODERATE | −1–2 font files |
| IO-pause offscreen loops: wireframe WebGL rAF (runs forever from mount), contact-section CodeBackground animation, visibility-pause particle `setInterval` | SAFE (invisible by definition) | Idle CPU/GPU ≈ 0 |
| rAF-coalesce nav scrollspy (currently unthrottled `getBoundingClientRect` ×6 per scroll event) | SAFE | INP headroom |
| `React.lazy` the 404 route | SAFE | small |
| Metric-adjusted font fallback (`size-adjust`) | MODERATE (changes pre-swap frame only) | CLS-on-swap |
| Replace `motion` with CSS/IO equivalents | **RISKY — not planned** | −120 kB, but exact timing parity is hard to guarantee |
| Lazy-load wireframe/testimonials | MODERATE (placeholder-height CLS risk) — report only | ~−18 kB |

CLS is already 0 and entrance animations are all opacity/transform — genuinely clean.

## 7. Tooling gaps

- **No tests** of any kind (finding per Phase 0).
- No ESLint, no Stylelint, no Prettier, no `.editorconfig`, no pre-commit hooks, no lint step in CI.
- `package-lock.json` gitignored + CI `npm install` → unpinned deploys. Fix: track the lockfile, use `npm ci`.
- `deploy.yml` also triggers on a stale branch (`docs/update-readme-comprehensive-tech-stack`).
- `test-local.sh` echoes a stale `/portfolio/` URL and duplicates `preview:static`.
- 9 of 10 root markdown docs are one-shot AI-refactor changelogs, three of which document the *dead* forms library and the *unused* constants barrel — actively misleading.
- Package is still named `rest-express` (Replit template artifact).

---

## 8. Proposed execution plan (Phase 2) — atomic commits, riskiest last

**Batch A — dead code removal (SAFE; build + screenshot diff after each commit)**
1. `chore: remove dead shadcn ui components (43 files)`
2. `chore: remove dead forms library and stale FORM-*/CONSTANTS-* docs`
3. `chore: remove dead hooks, constants barrel, utilities.module.css, misc orphans`
4. `chore: remove inert providers (react-query, toaster, tooltip) from App` ← the one "dead code" step with runtime reach; verified by bundle diff + full interaction walk
5. `chore: prune unused dependencies` (lockfile diff + fresh install + build)
6. `chore: remove committed build outputs (dist/, root stale assets), gitignore them` — **`public/` handling needs your call, see Q3**
7. `chore: remove vestigial server/drizzle scaffold` — **needs your call, see Q2**

**Batch B — CSS correctness + tokens (SAFE→MODERATE)**
8. `fix: correct var(--font-mono) → var(--font-family-mono) (7 sites)`
9. `fix: scroll-behavior !important vs reduced-motion; move kill-switch to index.css`
10. `refactor: dedupe .dark token block, prune unused tokens, align tailwind config`
11. `style: tokenize repeated taupe hsl(42,17%,56%), easing curves; rename hero__portrait-image`
12. `fix: unify 767/768 breakpoint boundary` (MODERATE — verified at exactly 768 px)

**Batch C — a11y, invisible only (SAFE)**
13. `fix: remove maximum-scale=1 viewport lock`
14. `fix: keyboard access — logo button, mobile menu visibility, aria-expanded`
15. `fix: testimonials tab semantics + focus management`
16. `fix: MotionConfig reducedMotion, heading order, main landmark, aria polish`
17. `feat: canonical link + JSON-LD Person schema` (SEO-additive, no visual)

**Batch D — performance (SAFE items only)**
18. `perf: remove replit dev banner script`
19. `perf: preload hero image with fetchpriority=high`
20. `perf: drop unused Inter 800 weight`
21. `perf: pause offscreen animation loops (wireframe, code background, particles)`
22. `perf: rAF-coalesce nav scrollspy; lazy 404 route`
23. `perf: re-encode portrait to WebP/AVIF` — **after your OK on Q4**

**Batch E — structure (SAFE, mechanical moves; screenshot diff after each)**
24. `refactor: split home.tsx into section components` (one commit per 1–2 sections, markup byte-identical)
25. `refactor: split home.module.css alongside sections; extract SectionTitle + contact data map`
26. `refactor: consolidate hand-rolled whileInView blocks onto ScrollReveal` (props must reproduce exact timings)

**Batch F — tooling & docs**
27. `chore: add eslint + prettier + stylelint + .editorconfig + lint-staged pre-commit`
28. `chore: track package-lock.json, npm ci in CI, remove stale branch trigger`
29. `docs: rewrite README; add ARCHITECTURE.md; remove remaining stale summaries`
30. `test: smoke tests for critical paths (render, nav scroll, testimonial drill-down, console easter egg)` + a `screenshot:diff` npm script wrapping the baseline capture

Verification after every batch: `npm run check`, `npm run build:static`, screenshot re-capture + diff vs `refactor-baseline/`, manual interaction walk (nav, mobile menu, testimonials drill-down, palette hover states, console `victoria.maze()`), Lighthouse at the end.

---

## 9. Decisions I need from you before starting

| # | Question | My recommendation |
|---|---|---|
| **Q1** | BEM migration (per prompt) vs keeping the project's own camelCase CSS Modules convention? | **Keep camelCase modules** — BEM solves a problem Modules already solve; migration is pure churn. |
| **Q2** | Delete the vestigial `server/` + `shared/` + drizzle scaffold (and `dev`/`build`/`start`/`db:push` scripts), making this honestly a static site? Or keep dormant? | **Delete** — it's unreachable, unpinned (`nanoid` bug), and misleading. Git history preserves it. |
| **Q3** | Stop committing `public/` build output (CI builds it anyway)? Requires confirming GitHub Pages serves only from the Actions artifact, not the branch. | **Stop committing it** after verifying Pages source = GitHub Actions. |
| **Q4** | Re-encode the 3.26 MB portrait (WebP q82 ≈ 128 kB at display size)? Technically lossy though visually indistinguishable. | **Yes** — it's 92% of page weight and the whole LCP story. |
| **Q5** | Track `package-lock.json` (currently gitignored) + `npm ci` in CI? | **Yes** — reproducible deploys. |
| **RISKY — not planned unless you say so** | Replacing `motion` (~120 kB) with CSS; visual pause control for background animations (WCAG 2.2.2); re-theming the light 404 page; lazy-loading mid-page components. | Report-only. |
