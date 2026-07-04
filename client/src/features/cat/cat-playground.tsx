import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO, CAT } from '@/shared/constants/strings';
import { ANIMATION_DURATION, INITIAL_OFFSET, OPACITY } from '@/shared/constants/layout';
import {
  CAT_SIT_ART,
  CAT_SIT_ART_FLICK,
  CAT_MASK_WALK_A,
  CAT_MASK_WALK_B,
  CAT_MASK_STAND,
  renderCat,
  IDLE_BEHAVIOURS,
  CAT_MOTION,
  type IdleBehaviour,
} from './cat-frames';
import styles from './cat-playground.module.css';

type Mode = 'walk' | 'sit' | 'flick' | 'sleep' | 'alert' | 'rise' | 'settle';

interface CatState {
  mode: Mode;
  /** Horizontal position as a fraction [0,1] of the floor's usable width. */
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
  // The current art frame + a "sleeping" flag are the only things that trigger
  // re-renders; position/facing are written straight to the DOM in the loop.
  // She enters (and, under reduced motion, stays) as the reference: sitting.
  const [art, setArt] = useState<readonly string[]>(CAT_SIT_ART);
  const [sleeping, setSleeping] = useState(false);
  // The seated reference renders a notch smaller than the walk frames, so the
  // get-up reads as a posture change rather than a size drop.
  const seated = art === CAT_SIT_ART || art === CAT_SIT_ART_FLICK;

  const floorRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLPreElement>(null);
  const artRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef<CatState>({ mode: 'sit', x: 0.4, targetX: 0.4, until: 0 });
  const reducedRef = useRef(false);
  // Rightmost reachable x (fraction of floor width), measured against the
  // WIDEST frame - the sit art - so no pose swap ever changes her range.
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
    let facing = 1; // 1 = the art's native left-facing; -1 = mirrored
    let currentSleeping = false;
    let artKey = 'sit'; // which frame is currently committed to React
    let widestPx = 0; // widest sprite seen so far, across all poses
    const start = performance.now();

    // Commit a frame only when it actually changes. Sitting frames are the
    // exact reference art (fixed keys); walk frames are keyed by time bucket
    // so the noise re-rolls as she moves. The frame is built lazily - a key
    // that hasn't changed costs nothing.
    const show = (key: string, make: () => readonly string[]) => {
      if (key === artKey) return;
      artKey = key;
      setArt(make());
    };

    // x is a fraction of the FLOOR width - not of (floor - sprite) - because
    // the sprite's width changes between poses (the sit art is wider than the
    // walk frames). Anchoring to a constant keeps her planted through every
    // frame swap; only the right-edge clamp ever references the sprite width.
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
        // Stand up first; the walk starts when the rise beat ends.
        cat.targetX = next;
        cat.mode = 'rise';
        cat.until = now + CAT_MOTION.RISE_HOLD;
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
      // Getting up and settling down both pass through the standing beat, so
      // sit -> walk is: notice, rise, walk, stand, sit - never a jump cut.
      if (cat.mode === 'alert') {
        if (cat.until === 0) cat.until = now + CAT_MOTION.ALERT_HOLD;
        if (now >= cat.until) {
          cat.mode = 'rise';
          cat.until = now + CAT_MOTION.RISE_HOLD;
        }
      } else if (cat.mode === 'rise') {
        if (now >= cat.until) cat.mode = 'walk';
      } else if (cat.mode === 'walk') {
        const dir = Math.sign(cat.targetX - cat.x) || 1;
        facing = dir > 0 ? -1 : 1; // the art faces left; mirror when heading right
        cat.x += dir * CAT_MOTION.WALK_SPEED * 0.016;
        if ((dir > 0 && cat.x >= cat.targetX) || (dir < 0 && cat.x <= cat.targetX)) {
          cat.x = cat.targetX;
          cat.mode = 'settle';
          cat.until = now + CAT_MOTION.RISE_HOLD;
        }
      } else if (cat.mode === 'settle') {
        if (now >= cat.until) {
          const idle = pickIdle();
          cat.mode = idle.mode;
          cat.until = now + rand(idle.hold[0], idle.hold[1]);
        }
      } else if (now >= cat.until) {
        beginWander(cat, now);
      }

      // --- texture, bob, and sleep flag for the current mode ---
      let bob = 0;
      let isSleeping = false;

      switch (cat.mode) {
        case 'walk': {
          // A real gait: two stride silhouettes (legs extended <-> gathering)
          // swap on the step beat, and the noise re-rolls between swaps so the
          // texture crawls like fur catching light.
          const stride = Math.floor(now / CAT_MOTION.STEP_INTERVAL) % 2;
          const bucket = Math.floor(now / CAT_MOTION.SHIMMER_WALK);
          show(`walk-${bucket}`, () =>
            renderCat(stride === 0 ? CAT_MASK_WALK_A : CAT_MASK_WALK_B, Math.random),
          );
          bob = -Math.abs(Math.sin(now * Math.PI * CAT_MOTION.BOB_RATE)) * CAT_MOTION.BOB_HEIGHT;
          break;
        }
        case 'rise':
          // Up on all fours, already turned toward where she's headed.
          facing = Math.sign(cat.targetX - cat.x) > 0 ? -1 : 1;
          show('stand', () => renderCat(CAT_MASK_STAND, Math.random));
          break;
        case 'settle':
          // Standing beat again on arrival; she turns back to the reference
          // orientation here, where flipping the noise is imperceptible.
          facing = 1;
          show('stand', () => renderCat(CAT_MASK_STAND, Math.random));
          break;
        case 'flick': {
          // Tail tip up, tail tip down - the reference art, wiggling only its
          // last two rows on a slow beat.
          const phase = Math.floor(now / CAT_MOTION.FLICK_INTERVAL) % 2;
          facing = 1;
          show(phase === 0 ? 'flick' : 'sit', () =>
            phase === 0 ? CAT_SIT_ART_FLICK : CAT_SIT_ART,
          );
          break;
        }
        case 'sleep':
          // Perfectly still; the drifting zzz does the animating.
          facing = 1;
          show('sit', () => CAT_SIT_ART);
          isSleeping = true;
          break;
        case 'alert':
          // The tail-tip lift is the twitch of noticing.
          facing = 1;
          show('flick', () => CAT_SIT_ART_FLICK);
          break;
        case 'sit':
        default:
          // Exactly the reference: same glyphs, same orientation. However she
          // arrived, she turns to settle the way the art was drawn.
          facing = 1;
          show('sit', () => CAT_SIT_ART);
          break;
      }

      // --- paint position + facing (cheap: no React involved) ---
      // Facing flips the inner art wrapper, not the sprite itself, so the
      // floating "zzz" never renders mirrored.
      if (catRef.current && width > 0) {
        const px = Math.min(cat.x * width, maxLeft());
        catRef.current.style.transform = `translate3d(${px}px, ${bob}px, 0)`;
      }
      if (artRef.current) {
        artRef.current.style.transform = `scaleX(${facing})`;
        // The zzz counter-flips against this so its glyphs never mirror.
        artRef.current.style.setProperty('--cat-facing', String(facing));
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
          <p className={styles['cat__kicker']}>{CAT.KICKER}</p>
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
            <span ref={artRef} className={styles['cat__art']}>
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
