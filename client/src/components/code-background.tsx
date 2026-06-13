import { useMemo } from 'react';
import styles from './code-background.module.css';

/**
 * Scoped "encrypted" code field that streams right-to-left behind its
 * positioned parent - the same motion/texture as the hero portrait scan.
 * Drop it as the first child of a `position: relative; overflow: hidden`
 * container; it fills that container (not the viewport).
 *
 * variant 'radial' (default): soft ellipse, fades at all edges.
 * variant 'band': a full-width horizontal strip, fades at top/bottom only.
 */
const GLYPHS = '01{}[]()<>/\\|=+-*&^%$#@!?;:.AEF9DCB7x';

export function buildField(length: number): string {
  // Deterministic pseudo-random fill (no Math.random - keeps SSR/build stable)
  let out = '';
  let seed = 1337;
  for (let i = 0; i < length; i++) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    out += GLYPHS[seed % GLYPHS.length];
    if (i % 5 === 4) out += ' ';
  }
  return out;
}

export function CodeBackground({ variant = 'radial' }: { variant?: 'radial' | 'band' }) {
  // Enough glyphs to fill tall/wide viewports down past the content line; the
  // container clips the overflow and the mask fades it at the right level.
  const field = useMemo(() => buildField(40000), []);
  const cls = variant === 'band' ? `${styles.codeBg} ${styles['codeBg--band']}` : styles.codeBg;
  return (
    <div className={cls} aria-hidden="true">
      <div className={styles.codeBg__stream}>
        <pre className={styles.codeBg__chars}>{field}</pre>
        <pre className={styles.codeBg__chars}>{field}</pre>
      </div>
    </div>
  );
}
