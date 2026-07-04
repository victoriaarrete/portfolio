import { useEffect, useRef } from 'react';
import styles from './cursor-glow.module.css';

/**
 * A subtle warm glow that follows the cursor across the entire page -
 * the same cream radial light used on the hero portrait, applied globally.
 * Stays inert when the user prefers reduced motion or uses a coarse pointer.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const el = ref.current;
    if (reduce || !fine || !el) return;

    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--cursor-x', `${e.clientX}px`);
        el.style.setProperty('--cursor-y', `${e.clientY}px`);
        el.style.setProperty('--cursor-opacity', '1');
      });
    };
    const leave = () => el.style.setProperty('--cursor-opacity', '0');

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, []);

  return <div ref={ref} className={styles.cursorGlow} aria-hidden="true" />;
}
