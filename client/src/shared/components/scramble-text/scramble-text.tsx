import { useEffect, useRef, useState } from 'react';
import { SCRAMBLE } from '@/shared/constants/layout';

// Lowercase pool; scrambleChar re-uppercases per position so a label like
// "About" never flickers fully lowercase. Spaces stay put - the churn reads
// as terminal chrome only while the word keeps its silhouette.
const GLYPHS = 'abcdefghijklmnopqrstuvwxyz';

const scrambleChar = (ch: string) => {
  if (ch === ' ') return ' ';
  const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  return ch === ch.toUpperCase() ? glyph.toUpperCase() : glyph;
};

/**
 * Character scramble that resolves left to right, for Space Mono labels only
 * (fixed-width glyphs keep the layout still while the characters churn).
 *
 * Contract: triggers on the PARENT element's mouseenter/focusin, so the whole
 * button/link is the hover target, not just the text. Renders the animated
 * copy aria-hidden with a static sr-only twin, so assistive tech never hears
 * the churn. No-op under prefers-reduced-motion.
 */
export function ScrambleText({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const spanRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef(0);

  useEffect(() => {
    const parent = spanRef.current?.parentElement;
    if (!parent) return;

    const start = () => {
      if (timerRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      // Negative start = a few all-random ticks before the first char settles.
      let settled = -SCRAMBLE.LEAD_IN_TICKS;
      timerRef.current = window.setInterval(() => {
        settled += 1;
        if (settled >= text.length) {
          window.clearInterval(timerRef.current);
          timerRef.current = 0;
          setDisplay(text);
          return;
        }
        setDisplay(
          text
            .split('')
            .map((ch, i) => (i < settled ? ch : scrambleChar(ch)))
            .join(''),
        );
      }, SCRAMBLE.TICK_MS);
    };

    parent.addEventListener('mouseenter', start);
    parent.addEventListener('focusin', start);
    return () => {
      parent.removeEventListener('mouseenter', start);
      parent.removeEventListener('focusin', start);
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = 0;
      }
    };
  }, [text]);

  return (
    <>
      <span ref={spanRef} aria-hidden="true">
        {display}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}
