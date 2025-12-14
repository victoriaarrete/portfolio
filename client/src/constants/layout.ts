/**
 * Layout, spacing, sizing, and timing constants
 */

// Animation Durations (in seconds)
export const ANIMATION_DURATION = {
  INSTANT: 0.15,
  FAST: 0.2,
  NORMAL: 0.3,
  MEDIUM: 0.5,
  SLOW: 0.8,
  VERY_SLOW: 1,
  FLOAT: 6,
  ROTATE_SLOW: 8,
  ROTATE_VERY_SLOW: 20,
} as const;

// Animation Delays (in seconds)
export const ANIMATION_DELAY = {
  NONE: 0,
  SHORT: 0.1,
  MEDIUM: 0.2,
  LONG: 0.4,
  VERY_LONG: 0.6,
  EXTRA_LONG: 0.8,
  STAGGER_1: 1.0,
  STAGGER_2: 1.2,
  STAGGER_3: 1.4,
  ANIMATION_OFFSET: 2,
} as const;

// Animation Timings (in milliseconds for setTimeout/setInterval)
export const TIMING_MS = {
  PARTICLE_LIFESPAN: 30000,
  PARTICLE_CREATE_INTERVAL: 600,
  PARTICLE_STAGGER: 200,
} as const;

// Easing Curves
export const EASING = {
  DEFAULT: [0.4, 0, 0.2, 1] as const,
  EASE_IN_OUT: 'easeInOut' as const,
  LINEAR: 'linear' as const,
} as const;

// Scroll & Intersection Observer
export const SCROLL = {
  THRESHOLD: 0.1,
  TRIGGER_OFFSET: 50, // pixels
  ROOT_MARGIN: '0px 0px -100px 0px',
} as const;

// Particle System
export const PARTICLES = {
  COUNT: 50,
  MIN_SIZE: 1,
  MAX_SIZE: 5,
  SIZE_RANGE: 4,
  MIN_DURATION: 10,
  MAX_DURATION: 30,
  DURATION_RANGE: 20,
  MIN_DELAY: 0,
  MAX_DELAY: 20,
  DELAY_RANGE: 20,
} as const;

// Transform Values
export const TRANSFORM = {
  FLOAT_OFFSET: -20,
  FLOAT_OFFSET_LARGE: -30,
  HOVER_SCALE: 1.02,
  HOVER_SCALE_SMALL: 1.05,
  HOVER_SCALE_LARGE: 1.2,
  HOVER_SCALE_MEDIUM: 1.01,
  HOVER_TRANSLATE_Y: -10,
  ROTATE_Y: 5,
  ROTATE_INITIAL: 45,
  ROTATE_END: 225,
  ROTATE_FULL: 360,
  ROTATE_RANGE: 10,
  SCALE_MIN: 1,
  SCALE_MAX: 1.3,
  SCALE_PULSE_MAX: 1.5,
  SCALE_PULSE_LARGE: 1.2,
} as const;

// Opacity Values
export const OPACITY = {
  HIDDEN: 0,
  VISIBLE: 1,
  SUBTLE: 0.3,
  MEDIUM: 0.8,
} as const;

// Mobile Menu
export const MOBILE_MENU = {
  MAX_HEIGHT_OPEN: '400px',
  MAX_HEIGHT_CLOSED: '0',
} as const;

// Percentage Values
export const PERCENTAGE = {
  FULL: 100,
} as const;

// Initial Animation Offsets
export const INITIAL_OFFSET = {
  Y_SMALL: 20,
  Y_MEDIUM: 30,
  Y_LARGE: 50,
  X_SMALL: -20,
  Y_NEGATIVE_SMALL: -20,
  Y_HERO: -100,
} as const;

// Viewport Units
export const VIEWPORT = {
  FULL_HEIGHT: '100vh',
  NEGATIVE_FULL_HEIGHT: '-100vh',
} as const;

// Rotation Degrees
export const ROTATION = {
  ZERO: 0,
  FULL: 360,
} as const;
