import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO, CAT } from '@/shared/constants/strings';
import { ANIMATION_DURATION, INITIAL_OFFSET, OPACITY } from '@/shared/constants/layout';
import {
  SIT_MASKS,
  WALK_MASKS,
  WALK_MASK_WIDTH,
  WALK_CYCLE_COLS,
  renderCat,
  IDLE_BEHAVIOURS,
  CAT_MOTION,
  type IdleBehaviour,
} from './cat-frames';
import styles from './cat-playground.module.css';

type Mode = 'walk' | 'sit' | 'sleep' | 'alert';
type Facing = 'left' | 'right';

interface CatState {
  mode: Mode;
  /** Horizontal position as a fraction [0,1] of the floor's width. */
  x: number;
  /** Where the cat is walking to (fraction). */
  targetX: number;
  /** Timestamp (seconds) at which the current non-walk behaviour ends. */
  until: number;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** Pick the next idle behaviour by weight. */
function pickIdle(): IdleBehaviour {
  const total = IDLE_BEHAVIOURS.reduce((sum, b) => sum + b.weight, 0);
  let roll = Math.random() * total;
  for (const behaviour of IDLE_BEHAVIOURS) {
    roll -= behaviour.weight;
    if (roll <= 0) return behaviour;
  }
  return IDLE_BEHAVIOURS[0];
}

export default function CatPlayground() {
  // The current art + a "sleeping" flag are the only things that trigger
  // re-renders; position/facing are written straight to the DOM in the loop.
  // She enters (and, under reduced motion, stays) sitting, facing left.
  const [art, setArt] = useState<readonly string[]>(() => renderCat(SIT_MASKS.left, Math.random));
  const [sleeping, setSleeping] = useState(false);
  // Sitting masks are 44 rows to the walk's 40; the seated pose renders a
  // notch smaller (see the CSS) so her apparent height barely changes.
  const seated = art.length === SIT_MASKS.left.length;

  const floorRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLPreElement>(null);
  const stateRef = useRef<CatState>({ mode: 'sit', x: 0.4, targetX: 0.4, until: 0 });
  const reducedRef = useRef(false);
  // Rightmost reachable x (fraction of floor width), measured against the
  // widest frame seen so far, so no pose swap ever changes her range.
  const maxFracRef = useRef(0.4);

  // Send the cat to a spot the visitor clicked. She notices (alert), then heads over.
  const callTo = useCallback((fraction: number) => {
    if (reducedRef.current) return;
    const cat = stateRef.current;
    cat.targetX = Math.min(maxFracRef.current, Math.max(0.02, fraction));
    cat.mode = 'alert';
    cat.until = 0; // set on the next tick, once we have `now`
  }, []);

  const onFloorPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const floor = floorRef.current;
      if (!floor) return;
      const rect = floor.getBoundingClientRect();
      callTo((event.clientX - rect.left) / rect.width);
    },
    [callTo],
  );

  useEffect(() => {
    const previous = document.title;
    document.title = CAT.DOC_TITLE;
    return () => {
      document.title = previous;
    };
  }, []);

  useEffect(() => {
    console.log(`%c${CAT.CONSOLE_LINE}`, 'color:#8a8578;font-style:italic;');
  }, []);

  useEffect(() => {
    reducedRef.current = prefersReducedMotion();
    // Reduced motion: one still render, no loop, no travel, no shimmer.
    if (reducedRef.current) return;

    let raf = 0;
    let facing: Facing = 'left'; // she keeps facing her last direction of travel
    let walkPx = 0; // ground covered while walking, in pixels (cumulative)
    let currentSleeping = false;
    let artKey = 'init'; // which frame is currently committed to React
    let widestPx = 0; // widest sprite seen so far, across all poses
    const start = performance.now();

    // Commit a frame only when its key changes. Every commit re-rolls the
    // glyph noise, so motion (and the idle shimmer) ripples through the fur.
    const show = (key: string, mask: readonly string[]) => {
      if (key === artKey) return;
      artKey = key;
      setArt(renderCat(mask, Math.random));
    };

    // x is a fraction of the FLOOR width - not of (floor - sprite) - because
    // the sprite's width changes between poses. Anchoring to a constant keeps
    // her planted through every frame swap; only the right-edge clamp ever
    // references the sprite width.
    const floorWidth = () => floorRef.current?.clientWidth ?? 0;
    const maxLeft = () => {
      const floor = floorRef.current;
      const cat = catRef.current;
      if (!floor || !cat) return 0;
      return Math.max(0, floor.clientWidth - cat.offsetWidth);
    };

    const beginWander = (cat: CatState, now: number) => {
      // New destination, anywhere she can fully fit.
      const next = rand(0.02, Math.max(0.05, maxFracRef.current));
      // Only bother walking if it's a meaningful distance; otherwise idle again.
      if (Math.abs(next - cat.x) < 0.08) {
        const idle = pickIdle();
        cat.mode = idle.mode;
        cat.until = now + rand(idle.hold[0], idle.hold[1]);
      } else {
        cat.targetX = next;
        cat.mode = 'walk';
      }
    };

    const tick = (nowMs: number) => {
      const now = (nowMs - start) / 1000;
      const cat = stateRef.current;
      const width = floorWidth();

      // Track the widest frame we've seen (poses render at different sizes)
      // so the roaming range always fits her fully, whichever pose she's in.
      if (catRef.current && width > 0) {
        widestPx = Math.max(widestPx, catRef.current.offsetWidth);
        maxFracRef.current = Math.max(0.05, (width - widestPx) / width);
      }

      // --- advance the state machine ---
      if (cat.mode === 'alert') {
        if (cat.until === 0) cat.until = now + CAT_MOTION.ALERT_HOLD;
        if (now >= cat.until) cat.mode = 'walk';
      } else if (cat.mode === 'walk') {
        const dir = Math.sign(cat.targetX - cat.x) || 1;
        facing = dir > 0 ? 'right' : 'left';
        cat.x += dir * CAT_MOTION.WALK_SPEED * 0.016;
        if ((dir > 0 && cat.x >= cat.targetX) || (dir < 0 && cat.x <= cat.targetX)) {
          cat.x = cat.targetX;
          const idle = pickIdle();
          cat.mode = idle.mode;
          cat.until = now + rand(idle.hold[0], idle.hold[1]);
        }
      } else if (now >= cat.until) {
        beginWander(cat, now);
      }

      // --- frame, bob, and sleep flag for the current mode ---
      let bob = 0;
      let isSleeping = false;

      switch (cat.mode) {
        case 'walk': {
          // The 8-frame leg cycle for her heading, keyed to ground covered -
          // one stride's worth of pixels per cycle - so planted paws grip
          // the floor instead of sliding under her. Each frame swap re-rolls
          // the noise, so the fur shimmers as she moves.
          walkPx += CAT_MOTION.WALK_SPEED * 0.016 * width;
          const colPx = (catRef.current?.offsetWidth ?? 0) / WALK_MASK_WIDTH;
          const phase = colPx > 0 ? (walkPx / (WALK_CYCLE_COLS * colPx)) % 1 : 0;
          const frames = WALK_MASKS[facing];
          const bucket = Math.floor(phase * frames.length) % frames.length;
          show(`walk-${facing}-${bucket}`, frames[bucket]);
          bob = -Math.abs(Math.sin(phase * Math.PI * 2)) * CAT_MOTION.BOB_HEIGHT;
          break;
        }
        case 'sleep':
          // Perfectly still - one roll, no shimmer; the drifting zzz animates.
          show(`sleep-${facing}`, SIT_MASKS[facing]);
          isSleeping = true;
          break;
        case 'alert': {
          // Noticing: the fur ripples fast for a beat before she sets off.
          const bucket = Math.floor(now / 0.18);
          show(`alert-${facing}-${bucket}`, SIT_MASKS[facing]);
          break;
        }
        case 'sit':
        default: {
          // Sitting idle: a slow shimmer - the coat re-rolls and breathes.
          const bucket = Math.floor(now / CAT_MOTION.SIT_SHIMMER);
          show(`sit-${facing}-${bucket}`, SIT_MASKS[facing]);
          break;
        }
      }

      // --- paint position + bob (cheap: no React involved) ---
      if (catRef.current && width > 0) {
        const px = Math.min(cat.x * width, maxLeft());
        catRef.current.style.transform = `translate3d(${px}px, ${bob}px, 0)`;
      }

      if (isSleeping !== currentSleeping) {
        currentSleeping = isSleeping;
        setSleeping(isSleeping);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={styles['cat']}>
      <a className={styles['cat__home-mark']} href="/" aria-label="Back to home">
        {PERSONAL_INFO.INITIALS}
      </a>

      <motion.main
        className={styles['cat__main']}
        initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
        animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
        transition={{ duration: ANIMATION_DURATION.NORMAL }}
      >
        <header className={styles['cat__intro']}>
          <h1 className={styles['cat__title']}>{CAT.TITLE_MAIN}</h1>
          <p className={styles['cat__lead']}>{CAT.LEAD}</p>
        </header>

        {/* The stage: click anywhere on the floor and the cat comes over. */}
        <div
          ref={floorRef}
          className={styles['cat__floor']}
          onPointerDown={onFloorPointerDown}
          role="presentation"
        >
          <pre
            ref={catRef}
            className={[
              styles['cat__sprite'],
              seated ? styles['cat__sprite--seated'] : '',
              sleeping ? styles['cat__sprite--sleeping'] : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden="true"
          >
            <span className={styles['cat__art']}>
              {sleeping && <span className={styles['cat__zzz']}>z&#8202;z&#8202;z</span>}
              {art.join('\n')}
            </span>
          </pre>
          <div className={styles['cat__floor-line']} aria-hidden="true" />
        </div>

        <p className={styles['cat__hint']}>{CAT.HINT}</p>

        <a className={styles['cat__back']} href="/">
          ← {CAT.BACK_ACTION}
        </a>
      </motion.main>
    </div>
  );
}
