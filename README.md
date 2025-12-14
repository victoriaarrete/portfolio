# Portfolio

This project powers the personal portfolio for **Victoria Kirichenko**. It's a modern, full-stack web application featuring a React client with an extensive UI component library, Express backend, and database integration.

## Tech Stack

### Frontend
- **React 18** + **TypeScript** (strict mode)
- **Vite** – Fast build tool and dev server
- **Tailwind CSS 4** – Utility-first CSS framework
- **Radix UI** – Accessible component primitives
- **Wouter** – Lightweight routing
- **TanStack Query** – Server state management
- **React Hook Form** + **Zod** – Type-safe form handling
- **Framer Motion** – Animation library
- **CSS Modules** – Scoped styles with BEM methodology

### Backend
- **Express** – Web server and API
- **Drizzle ORM** – Type-safe database toolkit
- **Neon** – Serverless PostgreSQL
- **Passport.js** – Authentication middleware

### UI Components
Comprehensive component library based on shadcn/ui including:
- Form components (TextInput, TextArea, SelectInput)
- Navigation with smooth scroll
- Particle system animation
- Scroll reveal effects
- 30+ Radix UI-based components (dialogs, dropdowns, tooltips, etc.)

## Project Structure

- **client/** – React application source code
  - **src/components/** – Reusable components (forms, navigation, UI library)
  - **src/pages/** – Route pages
  - **src/hooks/** – Custom React hooks
  - **src/constants/** – Design tokens and centralized values
  - **src/styles/** – CSS Modules and design tokens
  - **src/lib/** – Utilities and configurations
- **server/** – Express application and API routes
- **shared/** – Shared schemas and types
- **dist/** – Production build output
- **public/** – Static assets for GitHub Pages deployment

## Requirements

- Node.js 18 or later
- npm (comes with Node)

### Environment Variables
- `PORT` – Server port (defaults to `5000`)
- Database connection variables for Drizzle ORM (see `drizzle.config.ts`)

## Getting Started

Install dependencies:

```bash
npm install
```

### Development

Run the server in development mode with Vite HMR:

```bash
npm run dev
```

This starts the Express server with Vite middleware. The React client is served with hot module reloading at the same port.

### Production Build

Create a production build of the client and bundle the server:

```bash
npm run build
```

The compiled files are written to `dist/`.

### Start in Production

After building, start the bundled Express server:

```bash
npm start
```

The server serves the static assets from `dist/public` and exposes the `/api/contact` endpoint.

### Type Checking

Run TypeScript type checking:

```bash
npm run check
```

### Database

Push schema changes to the database:

```bash
npm run db:push
```

### GitHub Pages Deployment

To deploy the client as a static site under `/portfolio/`, run:

```bash
npx vite build --config vite.config.static.ts
```

This outputs the production files to `public/` and generates a `404.html` file so that unknown routes load `index.html` on GitHub Pages. Upload the contents of `public/` to the `gh-pages` branch.

## Architecture & Design Patterns

### Component Organization
- **Presentational components** – Pure UI rendering without business logic
- **Form components** – Reusable, accessible form inputs with validation
- **UI components** – Radix UI-based primitives with consistent styling
- **Feature-based structure** – Code organized by functionality

### Styling Approach
- **CSS Modules** with BEM naming convention for component styles
- **Tailwind CSS** for utility classes and rapid prototyping
- **Design tokens** (`styles/tokens.css`) for colors, spacing, and typography
- **Constants** (`src/constants/`) for centralized values

### State Management
- **TanStack Query** for server state and API calls
- **React Hook Form** for form state
- Local state with hooks for UI interactions

## Documentation

Additional documentation is available in the repository:

- **BEM-METHODOLOGY.md** – CSS naming conventions and guidelines
- **FORM-COMPONENTS-GUIDE.md** – Comprehensive guide to form components
- **FORM-QUICK-START.md** – Quick reference for forms
- **CONSTANTS-USAGE-GUIDE.md** – Guide to design tokens and constants
- **BEM-REFACTORING-SUMMARY.md** – History of BEM implementation
- **FORM-REFACTORING-SUMMARY.md** – Form system evolution
- **CONSTANTS-REFACTORING-SUMMARY.md** – Constants refactoring details

## License

MIT

