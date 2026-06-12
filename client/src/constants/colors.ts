/**
 * Color constants for use in TypeScript/JavaScript code
 * These complement the CSS custom properties in tokens.css
 */

// Console Palette — warm monochrome that mirrors the site's UI (cream/champagne
// foreground + warm grays). Hierarchy comes from weight/size, not from many hues.
// Tuned mid-light so it reads on the common dark DevTools theme (matching the brand).
export const CONSOLE_PALETTE = {
  TITLE: 'hsl(40, 33%, 90%)', // warm cream — greeting headline
  HEADING: 'hsl(42, 40%, 76%)', // champagne — section headers
  SUBHEADING: 'hsl(40, 22%, 84%)', // soft cream — sub-headers
  BODY: 'hsl(38, 11%, 66%)', // warm gray — body copy
  ACCENT: 'hsl(44, 46%, 71%)', // champagne — the single functional pop (commands, links)
  DIM: 'hsl(34, 8%, 50%)', // muted warm gray — secondary detail
} as const;

// HSL Color Values (for inline styles, animations, etc.)
export const HSL_COLORS = {
  // Neutral
  NEUTRAL_50: 'hsl(0, 0%, 98%)',
  NEUTRAL_950: 'hsl(240, 10%, 3.9%)',
  NEUTRAL_900: 'hsl(240, 12%, 6%)',
  NEUTRAL_800: 'hsl(240, 3.7%, 15.9%)',
  
  // Primary (Blue)
  PRIMARY_500: 'hsl(207, 90%, 54%)',
  PRIMARY_400: 'hsl(207, 91%, 60%)',
  
  // Accent (Cyan)
  ACCENT_400: 'hsl(188, 86%, 53%)',
  ACCENT_500: 'hsl(188, 94%, 43%)',
  
  // With alpha
  PRIMARY_ALPHA_20: 'hsla(207, 90%, 54%, 0.2)',
  PRIMARY_ALPHA_30: 'hsla(207, 90%, 54%, 0.3)',
  PRIMARY_ALPHA_70: 'hsla(207, 90%, 54%, 0.7)',
  PRIMARY_ALPHA_80: 'hsla(207, 90%, 54%, 0.8)',
  GLASS_BG: 'hsla(240, 10%, 3.9%, 0.7)',
} as const;

// Gradient Strings
export const GRADIENTS = {
  PRIMARY: 'linear-gradient(135deg, hsl(207, 90%, 54%), hsl(188, 86%, 53%))',
  HERO: 'linear-gradient(135deg, hsl(240, 10%, 3.9%) 0%, hsl(240, 9%, 9%) 50%, hsl(240, 8%, 15%) 100%)',
  RADIAL_PARTICLE: 'radial-gradient(circle, hsla(207, 90%, 54%, 0.8) 0%, transparent 70%)',
} as const;

// Box Shadow Values
export const BOX_SHADOWS = {
  CARD_HOVER: '0 25px 50px -12px rgba(59, 130, 246, 0.25)',
  GLOW_INITIAL: '0 0 0 0 rgba(59, 130, 246, 0.7)',
  GLOW_MID: '0 0 0 10px rgba(59, 130, 246, 0)',
  GLOW_END: '0 0 0 0 rgba(59, 130, 246, 0)',
} as const;

// Console Font Sizes (for styling)
export const CONSOLE_FONT_SIZE = {
  SMALL: '12px',
  MEDIUM: '14px',
  LARGE: '16px',
  XLARGE: '18px',
} as const;
