# Constants Usage Guide

Quick reference for using centralized constants in the portfolio project.

## Import Patterns

### Import Everything
```typescript
import { 
  CONSOLE_COLORS, 
  ANIMATION_DURATION, 
  PERSONAL_INFO 
} from '@/constants';
```

### Import from Specific Files
```typescript
import { CONSOLE_COLORS } from '@/constants/colors';
import { ANIMATION_DURATION, TRANSFORM } from '@/constants/layout';
import { PERSONAL_INFO, NAV_SECTIONS } from '@/constants/strings';
```

## Common Use Cases

### 1. Animation Timing

```typescript
// ❌ Before (Magic Values)
transition={{ duration: 0.8, delay: 0.2 }}

// ✅ After (Constants)
import { ANIMATION_DURATION, ANIMATION_DELAY } from '@/constants';
transition={{ 
  duration: ANIMATION_DURATION.SLOW, 
  delay: ANIMATION_DELAY.MEDIUM 
}}
```

### 2. Opacity & Visibility

```typescript
// ❌ Before
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}

// ✅ After
import { OPACITY } from '@/constants';
initial={{ opacity: OPACITY.HIDDEN }}
animate={{ opacity: OPACITY.VISIBLE }}
```

### 3. Transform Values

```typescript
// ❌ Before
whileHover={{ scale: 1.05, rotateY: 5 }}

// ✅ After
import { TRANSFORM } from '@/constants';
whileHover={{ 
  scale: TRANSFORM.HOVER_SCALE_SMALL, 
  rotateY: TRANSFORM.ROTATE_Y 
}}
```

### 4. Initial Offsets

```typescript
// ❌ Before
initial={{ y: 50, x: -20 }}

// ✅ After
import { INITIAL_OFFSET } from '@/constants';
initial={{ 
  y: INITIAL_OFFSET.Y_LARGE, 
  x: INITIAL_OFFSET.X_SMALL 
}}
```

### 5. Personal Information

```typescript
// ❌ Before
<h1>Victoria Kirichenko</h1>
<a href="mailto:victoria.arrete@gmail.com">Email</a>

// ✅ After
import { PERSONAL_INFO } from '@/constants';
<h1>{PERSONAL_INFO.NAME}</h1>
<a href={`mailto:${PERSONAL_INFO.EMAIL}`}>Email</a>
```

### 6. Navigation & Sections

```typescript
// ❌ Before
document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

// ✅ After
import { NAV_SECTIONS, SCROLL_BEHAVIOR } from '@/constants';
document.getElementById(NAV_SECTIONS.CONTACT)?.scrollIntoView({ 
  behavior: SCROLL_BEHAVIOR.SMOOTH 
})
```

### 7. Console Styling

```typescript
// ❌ Before
console.log('%cHello', 'color: #3b82f6; font-size: 18px;');

// ✅ After
import { CONSOLE_COLORS, CONSOLE_FONT_SIZE } from '@/constants';
console.log(
  '%cHello', 
  `color: ${CONSOLE_COLORS.PRIMARY}; font-size: ${CONSOLE_FONT_SIZE.XLARGE};`
);
```

### 8. Easing Curves

```typescript
// ❌ Before
transition={{ ease: [0.4, 0, 0.2, 1] }}

// ✅ After
import { EASING } from '@/constants';
transition={{ ease: EASING.DEFAULT }}
```

### 9. Rotation

```typescript
// ❌ Before
animate={{ rotate: [0, 360] }}

// ✅ After
import { ROTATION } from '@/constants';
animate={{ rotate: [ROTATION.ZERO, ROTATION.FULL] }}
```

### 10. Particle System

```typescript
// ❌ Before
const particleCount = 50;
const size = Math.random() * 4 + 1;

// ✅ After
import { PARTICLES } from '@/constants';
const particleCount = PARTICLES.COUNT;
const size = Math.random() * PARTICLES.SIZE_RANGE + PARTICLES.MIN_SIZE;
```

## CSS Custom Properties

In CSS files, use the enhanced tokens:

```css
/* ❌ Before */
.container {
  max-width: 1280px;
  border: 1px solid var(--color-border);
}

/* ✅ After */
.container {
  max-width: var(--container-max-width);
  border: var(--border-width-thin) solid var(--color-border);
}
```

## Available Constants Categories

### Colors (`@/constants/colors`)
- `CONSOLE_COLORS` - Console log colors
- `HSL_COLORS` - HSL color values
- `GRADIENTS` - Gradient strings
- `BOX_SHADOWS` - Shadow values
- `CONSOLE_FONT_SIZE` - Console font sizes

### Layout (`@/constants/layout`)
- `ANIMATION_DURATION` - Animation durations (seconds)
- `ANIMATION_DELAY` - Animation delays (seconds)
- `TIMING_MS` - Timing values (milliseconds)
- `EASING` - Easing curve functions
- `SCROLL` - Scroll thresholds and margins
- `PARTICLES` - Particle system values
- `TRANSFORM` - Transform values (scale, rotate, translate)
- `OPACITY` - Opacity levels
- `MOBILE_MENU` - Mobile menu dimensions
- `INITIAL_OFFSET` - Animation start positions
- `VIEWPORT` - Viewport units
- `ROTATION` - Rotation degrees

### Strings (`@/constants/strings`)
- `PERSONAL_INFO` - Personal information
- `ROLES` - Job titles and roles
- `TAGLINES` - Taglines and quotes
- `NAV_SECTIONS` - Navigation section IDs
- `NAV_ITEMS` - Navigation items array
- `SECTION_TITLES` - Section heading text
- `BUTTON_LABELS` - Button text
- `CONSOLE_MESSAGES` - Console log messages
- `ASCII_ART` - ASCII art header
- `CORE_STRENGTHS` - Strengths array
- `LEADERSHIP_PRINCIPLES` - Leadership principles array
- `ABOUT_CONTENT` - About section content
- `CONTACT_CONTENT` - Contact section content
- `COPYRIGHT` - Copyright information
- `SCROLL_BEHAVIOR` - Scroll behavior constants
- `ARIA_LABELS` - Accessibility labels

## Best Practices

1. **Always use constants instead of hardcoded values**
2. **Import only what you need** for better tree-shaking
3. **Use TypeScript autocomplete** - type the constant name to see all available values
4. **Keep constants organized** - add new values to the appropriate file
5. **Document new constants** - add comments for complex values
6. **Test after changes** - run `npm run build` to verify

## Adding New Constants

### To add a new constant:

1. Choose the appropriate file:
   - Visual/styling → `colors.ts`
   - Timing/sizing/spacing → `layout.ts`
   - Text/strings/content → `strings.ts`

2. Add to the relevant object:
```typescript
export const ANIMATION_DURATION = {
  // ... existing values
  MY_NEW_DURATION: 2.5, // Add your new value
} as const;
```

3. Use TypeScript `as const` for type safety

4. Document complex values with comments

5. Test your changes: `npm run build`

## TypeScript Tips

The `as const` assertion provides:
- **Literal types** - TypeScript knows exact values, not just types
- **Readonly** - Values cannot be accidentally modified
- **Autocomplete** - IDE provides suggestions for all available values

Example:
```typescript
// Without 'as const'
const OPACITY = { HIDDEN: 0, VISIBLE: 1 };
// Type: { HIDDEN: number, VISIBLE: number }

// With 'as const'
const OPACITY = { HIDDEN: 0, VISIBLE: 1 } as const;
// Type: { readonly HIDDEN: 0, readonly VISIBLE: 1 }
```

## Questions or Issues?

If you encounter any issues with constants:
1. Check the import path is correct
2. Verify the constant exists in the specified file
3. Ensure you're using the correct constant name (autocomplete helps!)
4. Run `npm run build` to catch any TypeScript errors
