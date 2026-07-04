import { useEffect, useRef, useMemo, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { CodeBackground, buildField } from '@/shared/components/code-background';
import {
  ANIMATION_DURATION,
  ANIMATION_DELAY,
  EASING,
  OPACITY,
  INITIAL_OFFSET,
} from '@/shared/constants/layout';
import {
  PERSONAL_INFO,
  ROLES,
  TAGLINES,
  NAV_SECTIONS,
  BUTTON_LABELS,
  SCROLL_BEHAVIOR,
} from '@/shared/constants/strings';
import styles from '@/pages/home/home.module.css';

export function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  // Same generator as the page-level code field (unified look); enough glyphs to
  // fill the portrait so the overlay reaches the content line on every device.
  const scanField = useMemo(() => buildField(6000), []);

  // Anchor the code field's fade-out to the hero's content line (role chips /
  // tagline). The hero content is vertically centred in a 100vh section, so the
  // line sits at a different % of the hero on every viewport height - a fixed
  // mask stop can't track it. We measure the line and expose it as CSS variables
  // (--code-stop for the background, --portrait-code-stop for the portrait
  // overlay) so the code always reaches at least that line on every device.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const clamp = (n: number) => Math.max(0, Math.min(100, n));

    const computeStops = () => {
      const tagline = hero.querySelector<HTMLElement>('.' + styles['hero__tagline']);
      if (!tagline) return;
      const heroRect = hero.getBoundingClientRect();
      // Top of the tagline ≈ the role-chips / tagline boundary the design targets.
      const lineY = tagline.getBoundingClientRect().top;

      const bgStop = clamp(((lineY - heroRect.top) / heroRect.height) * 100);
      hero.style.setProperty('--code-stop', `${bgStop.toFixed(1)}%`);

      // Top of the band = top of the content block (portrait/name), so the code
      // sits as a full-width horizontal band over the content, not above it.
      const content = hero.querySelector<HTMLElement>('.' + styles['hero__content']);
      if (content) {
        const startPct = clamp(
          ((content.getBoundingClientRect().top - heroRect.top) / heroRect.height) * 100,
        );
        hero.style.setProperty('--code-start', `${startPct.toFixed(1)}%`);
      }

      const portrait = hero.querySelector<HTMLElement>('.' + styles['hero__portrait']);
      if (portrait) {
        const pr = portrait.getBoundingClientRect();
        // Where the line falls within the portrait. If the line is below the
        // portrait (stacked mobile layout), this clamps to 100% = full coverage.
        const pStop = clamp(((lineY - pr.top) / pr.height) * 100);
        hero.style.setProperty('--portrait-code-stop', `${pStop.toFixed(1)}%`);
      }
    };

    // Recompute now, after layout/entrance settle, on resize, and on font load.
    computeStops();
    const raf = requestAnimationFrame(computeStops);
    const t1 = setTimeout(computeStops, 400);
    const t2 = setTimeout(computeStops, 1400);
    window.addEventListener('resize', computeStops);
    const ro = new ResizeObserver(computeStops);
    ro.observe(hero);
    document.fonts?.ready.then(computeStops).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', computeStops);
      ro.disconnect();
    };
  }, []);

  // Cursor-following glow for the portrait scanner reveal.
  const handlePortraitMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <section ref={heroRef} id={NAV_SECTIONS.HERO} className={styles.hero}>
      <CodeBackground variant="band" />

      <div className={styles.hero__container}>
        {/* Opacity-only entrance: a `y` translate here would give this wrapper a
            transform, making it the containing block for the absolutely-pinned
            desktop portrait — so the portrait would sit at the content column's
            edge mid-animation and snap to the viewport edge when the transform
            clears. The inner blocks below each carry their own y slide-up, so the
            entrance still reads the same without the layout jump. */}
        <motion.div
          className={styles.hero__content}
          initial={{ opacity: OPACITY.HIDDEN }}
          animate={{ opacity: OPACITY.VISIBLE }}
          transition={{ duration: ANIMATION_DURATION.VERY_SLOW, ease: EASING.DEFAULT }}
        >
          {/* Role kicker, above the portrait (mobile) / above the name (desktop).
              A <p>, not a heading: it precedes the h1 in the DOM and is a label,
              not a section break (heading styles all come from the class). */}
          <motion.p
            className={styles.hero__roles}
            aria-label={ROLES.FULL_SUBTITLE}
            initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
            animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
            transition={{
              delay: ANIMATION_DELAY.SHORT,
              duration: ANIMATION_DURATION.MEDIUM,
              ease: EASING.DEFAULT,
            }}
          >
            {ROLES.LIST.map((role) => (
              <span key={role} className={styles['hero__role-chip']}>
                {role}
              </span>
            ))}
          </motion.p>

          {/* Portrait: mobile = centred card in flow; desktop = pinned full-bleed
              to the left edge with the name overlapping its faded right edge. */}
          <motion.div className={styles['hero__portrait']} onMouseMove={handlePortraitMove}>
            {/* Stable public path (not a hashed import) so index.html preloads it;
                the PNG source of truth lives in assets/, re-encoded by
                scripts/gen-portrait.mjs. fetchpriority is lowercase because
                React 18 only forwards it as a raw DOM attribute. */}
            <img
              src="/victoria-portrait.webp"
              alt={PERSONAL_INFO.NAME}
              width={1024}
              height={1536}
              className={styles['hero__portrait-image']}
              {...({ fetchpriority: 'high' } as Record<string, string>)}
            />
            {/* Scanner reveal: encrypted chars stream past a fixed central beam + cursor glow */}
            <div className={styles['hero__scan']} aria-hidden="true">
              <div className={styles['hero__scan-stream-mask']}>
                <div className={styles['hero__scan-stream']}>
                  <pre className={styles['hero__scan-chars']}>{scanField}</pre>
                  <pre className={styles['hero__scan-chars']}>{scanField}</pre>
                </div>
              </div>
              <div className={styles['hero__scan-glow']} />
            </div>
            {/* Right-edge scrim: fades the portrait into the page so the name keeps
                contrast where it overlaps (desktop only). */}
            <div className={styles['hero__portrait-scrim']} aria-hidden="true" />
          </motion.div>

          {/* Name - the only block that overlaps the portrait edge on desktop */}
          <motion.h1
            className={styles.hero__title}
            initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_MEDIUM }}
            animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
            transition={{
              delay: ANIMATION_DELAY.SHORT,
              duration: ANIMATION_DURATION.MEDIUM,
              ease: EASING.DEFAULT,
            }}
          >
            <span className={styles['hero__title-main']}>{PERSONAL_INFO.FIRST_NAME}</span>
            <span className={styles['hero__title-accent']}>{PERSONAL_INFO.LAST_NAME}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className={styles.hero__tagline}
            initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
            animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
            transition={{
              delay: ANIMATION_DELAY.LONG,
              duration: ANIMATION_DURATION.MEDIUM,
              ease: EASING.DEFAULT,
            }}
          >
            {TAGLINES.HERO}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className={styles.hero__actions}
            initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
            animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
            transition={{
              delay: ANIMATION_DELAY.VERY_LONG,
              duration: ANIMATION_DURATION.MEDIUM,
              ease: EASING.DEFAULT,
            }}
          >
            <button
              onClick={() =>
                document
                  .getElementById(NAV_SECTIONS.CONTACT)
                  ?.scrollIntoView({ behavior: SCROLL_BEHAVIOR.SMOOTH })
              }
              className={`${styles.button} ${styles['button--primary']}`}
            >
              {BUTTON_LABELS.GET_IN_TOUCH}
            </button>
            <button
              onClick={() =>
                document
                  .getElementById(NAV_SECTIONS.ABOUT)
                  ?.scrollIntoView({ behavior: SCROLL_BEHAVIOR.SMOOTH })
              }
              className={`${styles.button} ${styles['button--outline']}`}
            >
              {BUTTON_LABELS.LEARN_MORE}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className={styles['hero__scroll-cue']}>
        <motion.button
          type="button"
          aria-label="Scroll to About section"
          onClick={() =>
            document
              .getElementById(NAV_SECTIONS.ABOUT)
              ?.scrollIntoView({ behavior: SCROLL_BEHAVIOR.SMOOTH })
          }
          className={styles['hero__scroll-button']}
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: EASING.EASE_IN_OUT }}
        >
          <ChevronDown className={styles['hero__scroll-icon']} aria-hidden="true" />
        </motion.button>
      </div>
    </section>
  );
}
