# victoriakirichenko.com

Personal portfolio for **Victoria Kirichenko** — a static single-page React site
deployed to GitHub Pages behind a custom domain.

## Tech stack

- **React 18** + **TypeScript** (strict) on **Vite 5**
- **CSS Modules** with a design-token layer (`client/src/styles/tokens.css`)
- **Tailwind CSS 3** (preflight + the few utilities the 404 page uses)
- **motion** (framer-motion) for entrance/hover animation, with full
  `prefers-reduced-motion` support
- **wouter** for the two routes: `/` and the 404 catch-all

There is no backend: the contact section is `mailto:`/LinkedIn links, and the
site builds to plain static files.

## Getting started

```bash
npm ci          # install (uses the tracked lockfile)
npm run dev     # vite dev server on :5173
```

| Script                   | What it does                                 |
| ------------------------ | -------------------------------------------- |
| `npm run dev`            | Dev server with HMR                          |
| `npm run build`          | Production build into `public/` (gitignored) |
| `npm run preview:static` | Build + serve `public/` on :3000             |
| `npm run check`          | TypeScript                                   |
| `npm run lint`           | ESLint (typescript-eslint + react-hooks)     |
| `npm run lint:css`       | Stylelint                                    |
| `npm run format`         | Prettier                                     |

Pre-commit (husky + lint-staged) runs ESLint/Stylelint/Prettier on staged files
plus a full `tsc` pass.

## Conventions

- **CSS Modules, camelCase class names** for dot access
  (`styles.dmName`); older files use BEM-style `block__element--modifier`
  names accessed with brackets — both are fine, new classes should be
  camelCase. See [ARCHITECTURE.md](ARCHITECTURE.md).
- **Design tokens first**: colors, spacing, type, radii, shadows, easings live
  in `client/src/styles/tokens.css`. Don't hardcode a value that has a token.
- **Content lives in `client/src/constants/strings.ts`** (copy, nav, experience
  log, testimonials, projects), layout numbers in `constants/layout.ts`.
- **Animation values** go through `constants/layout.ts`
  (durations/delays/offsets) and respect reduced motion — `MotionConfig
reducedMotion="user"` covers framer, a global CSS kill-switch covers the rest.

## Images

The hero portrait's source of truth is `assets/victoria_pic.png`. The shipped
WebP is generated with:

```bash
node scripts/gen-portrait.mjs   # -> client/public/victoria-portrait.webp
```

Favicons regenerate with `node scripts/gen-icons.mjs`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`: `npm ci` → lint →
type check → `npm run build:static` → GitHub Pages artifact deploy. Build
output (`public/`) is not committed. The custom-domain CNAME lives in
`client/public/` and is copied into every build.

## Console easter egg

Open the browser console on the live site and follow the prompts
(`victoria.help()`, `victoria.maze()`).
