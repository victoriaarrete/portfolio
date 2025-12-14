# BEM Methodology Documentation

This document outlines the BEM (Block Element Modifier) methodology used in this project's CSS architecture.

## Overview

BEM is a naming convention that helps create reusable, maintainable, and scalable CSS. It stands for:

- **Block**: A standalone entity that is meaningful on its own
- **Element**: A part of a block that has no standalone meaning
- **Modifier**: A flag on a block or element used to change appearance or behavior

## Naming Convention

### Syntax

```
.block__element--modifier
```

- Block: `.navigation`
- Element: `.navigation__item`
- Modifier: `.navigation__item--active`

### Rules

1. **Use double underscores** (`__`) to separate Block from Element
2. **Use double hyphens** (`--`) to separate Block/Element from Modifier
3. **Use single hyphens** (`-`) for multi-word names
4. **All lowercase** naming

## Project Structure

```
src/
├── styles/
│   ├── tokens.css              # Design tokens (CSS variables)
│   ├── utilities.module.css    # Utility classes
│   └── BEM-METHODOLOGY.md      # This file
├── components/
│   ├── navigation.tsx
│   └── navigation.module.css   # Component-specific BEM styles
└── pages/
    ├── home.tsx
    └── home.module.css          # Page-specific BEM styles
```

## Design Tokens

All magic values are centralized in `tokens.css`:

### Colors
```css
--color-primary-500: hsl(207, 90%, 54%);
--color-accent-400: hsl(188, 86%, 53%);
--color-neutral-950: hsl(240, 10%, 3.9%);
```

### Spacing
```css
--spacing-4: 1rem;      /* 16px */
--spacing-8: 2rem;      /* 32px */
--spacing-12: 3rem;     /* 48px */
```

### Typography
```css
--font-size-base: 1rem;
--font-weight-medium: 500;
--line-height-normal: 1.5;
```

### Other Tokens
- Border radius
- Shadows
- Z-index scale
- Transitions
- Breakpoints
- Effects (blur, gradients)

## Component Examples

### Navigation Component

**Block**: `navigation`

```css
.navigation {
  position: fixed;
  top: 0;
  width: 100%;
}
```

**Element**: `navigation__container`

```css
.navigation__container {
  max-width: 1280px;
  margin: 0 auto;
}
```

**Element**: `navigation__logo`

```css
.navigation__logo {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}
```

**Element**: `navigation__item`

```css
.navigation__item {
  color: var(--color-neutral-300);
  transition: color var(--transition-base);
}
```

**Modifier**: `navigation--scrolled`

```css
.navigation--scrolled {
  background: var(--color-surface);
  backdrop-filter: blur(var(--blur-md));
}
```

**Usage in JSX:**

```tsx
import styles from './navigation.module.css';

const navigationClass = isScrolled 
  ? `${styles.navigation} ${styles['navigation--scrolled']}`
  : styles.navigation;

<nav className={navigationClass}>
  <div className={styles.navigation__container}>
    <div className={styles.navigation__logo}>Logo</div>
    <button className={styles.navigation__item}>Link</button>
  </div>
</nav>
```

### Home Page Sections

#### Hero Section

**Block**: `hero`

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero__container { /* Element */ }
.hero__title { /* Element */ }
.hero__title-main { /* Element */ }
.hero__title-accent { /* Element */ }
.hero__subtitle { /* Element */ }
.hero__actions { /* Element */ }
```

#### Card Component

**Block**: `card`

```css
.card {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--spacing-8);
}

.card--hover { /* Modifier */ }
.card__title { /* Element */ }
.card__text { /* Element */ }
```

#### Experience Timeline

**Block**: `experience`

```css
.experience { /* Block */ }
.experience__timeline { /* Element */ }
.experience__timeline-line { /* Element */ }
.experience__item { /* Element */ }
.experience__dot { /* Element */ }
.experience__dot--active { /* Modifier */ }
.experience__card { /* Element */ }
.experience__title { /* Element */ }
.experience__company { /* Element */ }
```

## Utility Classes

Utility classes follow BEM naming for consistency:

```css
/* Block: text */
.text--gradient { /* Modifier */ }
.text--muted { /* Modifier */ }

/* Block: flex */
.flex { /* Block */ }
.flex--center { /* Modifier */ }
.flex--between { /* Modifier */ }

/* Block: animation */
.animation--float { /* Modifier */ }
.animation--pulse-glow { /* Modifier */ }

/* Block: shadow */
.shadow--sm { /* Modifier */ }
.shadow--lg { /* Modifier */ }
```

## Best Practices

### 1. Avoid Deep Nesting

❌ **Bad:**
```css
.navigation__menu__item__link__icon { }
```

✅ **Good:**
```css
.navigation__item { }
.navigation__link { }
.navigation__icon { }
```

### 2. Use Semantic Names

❌ **Bad:**
```css
.navigation__blue-text { }
.card__big-padding { }
```

✅ **Good:**
```css
.navigation__title { }
.card__content { }
```

### 3. Keep Modifiers Simple

❌ **Bad:**
```css
.button--with-blue-background-and-shadow { }
```

✅ **Good:**
```css
.button--primary { }
.button--large { }
```

### 4. Use Design Tokens

❌ **Bad:**
```css
.hero__title {
  color: #3b82f6;
  font-size: 48px;
  margin-bottom: 24px;
}
```

✅ **Good:**
```css
.hero__title {
  color: var(--color-primary-500);
  font-size: var(--font-size-5xl);
  margin-bottom: var(--spacing-6);
}
```

### 5. Compose Styles

❌ **Bad:**
```css
.about__card {
  background: var(--color-surface);
  backdrop-filter: blur(var(--blur-md));
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-8);
  transition: all var(--transition-base);
}
```

✅ **Good:**
```css
.about__card {
  composes: card;
  composes: card--hover;
}
```

### 6. Responsive Design

Use breakpoints from design tokens:

```css
.hero__title {
  font-size: var(--font-size-5xl);
}

@media (min-width: 768px) {
  .hero__title {
    font-size: var(--font-size-7xl);
  }
}
```

### 7. Accessibility

Always consider focus states:

```css
.navigation__item:focus {
  outline: 2px solid var(--color-primary-400);
  outline-offset: 2px;
}
```

## Migration from Tailwind

When migrating from Tailwind to BEM:

| Tailwind | BEM |
|----------|-----|
| `className="flex items-center gap-4"` | `className={styles.flex} className={styles['flex--center']}` |
| `className="text-gray-300"` | `className={styles.card__text}` |
| `className="bg-blue-500"` | Use `background: var(--color-primary-500)` in CSS |
| `className="rounded-full"` | `className={styles['radius--full']}` or define in component CSS |

## File Organization

### Component CSS Module Template

```css
/* ==========================================================================
   Component Name - BEM Methodology
   ========================================================================== */

/* Block: component-name */
.component-name {
  /* Base styles */
}

/* Modifier: component-name--variant */
.component-name--variant {
  /* Modified styles */
}

/* Element: component-name__element */
.component-name__element {
  /* Element styles */
}

/* Element with Modifier: component-name__element--state */
.component-name__element--state {
  /* Element modifier styles */
}

/* Responsive */
@media (min-width: 768px) {
  .component-name {
    /* Tablet/Desktop styles */
  }
}
```

## Advantages of This Approach

1. **Maintainability**: Clear structure makes code easy to understand and modify
2. **Scalability**: BEM scales well with project growth
3. **Reusability**: Components can be easily reused across the project
4. **No Magic Values**: All values come from design tokens
5. **Type Safety**: CSS Modules provide compile-time checking
6. **Encapsulation**: Styles are scoped to components
7. **Performance**: CSS Modules are optimized at build time
8. **DRY Principle**: Composition prevents code duplication

## Tools and Resources

- **CSS Modules Documentation**: https://github.com/css-modules/css-modules
- **BEM Official**: https://getbem.com/
- **CSS Variables**: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

## Questions?

For questions or suggestions about the CSS architecture, please refer to this document or reach out to the frontend team.

---

**Last Updated**: December 2025
**Version**: 1.0.0

