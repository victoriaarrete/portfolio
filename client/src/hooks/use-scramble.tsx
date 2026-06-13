import { useEffect, useRef, useState } from 'react';

// Decode-scramble effect for short mono labels (names / roles). Glyphs churn and
// resolve left-to-right into the target text - a nod to the hero portrait's
// encrypted-char scanner. Applied only to metadata, never the serif quote, and
// skipped on the initial mount + when reduced motion is requested.
const GLYPHS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&$/<>[]{}=+*';
// Characters preserved verbatim so the resolving text stays readable mid-churn.
const PRESERVE = new Set([' ', '/', '-', '.', ',', '·']);

interface UseScrambleOptions {
  frames?: number;
  intervalMs?: number;
  enabled?: boolean;
}

export function useScramble(target: string, options: UseScrambleOptions = {}) {
  const { frames = 12, intervalMs = 26, enabled = true } = options;
  const [display, setDisplay] = useState(target);
  const firstRun = useRef(true);

  useEffect(() => {
    // No effect on first mount or when motion is reduced - show the text as-is.
    if (firstRun.current) {
      firstRun.current = false;
      setDisplay(target);
      return;
    }
    if (!enabled) {
      setDisplay(target);
      return;
    }

    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      const cut = Math.floor((target.length * frame) / frames);
      let out = target.slice(0, cut);
      for (let k = cut; k < target.length; k += 1) {
        const ch = target[k];
        out += PRESERVE.has(ch) ? ch : GLYPHS[(k * 5 + frame * 13) % GLYPHS.length];
      }
      setDisplay(out);
      if (frame >= frames) {
        clearInterval(id);
        setDisplay(target);
      }
    }, intervalMs);

    return () => clearInterval(id);
  }, [target, enabled, frames, intervalMs]);

  return display;
}
