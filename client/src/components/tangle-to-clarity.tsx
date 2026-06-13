import { useMemo, type CSSProperties } from 'react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import styles from './tangle-to-clarity.module.css';

/**
 * Decorative line-art that visualises the philosophy "remove the noise": a
 * dense, chaotic ball of overlapping ovals resolves through a single smooth
 * line into one clean circle — tangle to clarity.
 *
 * Two layouts share one generator: the `vertical` variant (chaos on top, circle
 * below) rides the desktop side-column; the `horizontal` variant (chaos left,
 * circle right) is a short full-width band for mobile, where a tall figure would
 * leave a screen-high void. Each variant is generated once from a fixed seed so
 * it's identical on every load, then the strokes draw themselves in
 * (stroke-dashoffset) the first time the block scrolls into view. Honors
 * prefers-reduced-motion by rendering fully drawn.
 */

interface Stroke {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rot: number;
  op: number;
  dur: number;
  delay: number;
}

type Variant = 'vertical' | 'horizontal';

interface VariantConfig {
  viewW: number;
  viewH: number;
  tangle: { cx: number; cy: number; spreadX: number; spreadY: number; rxBase: number; rxRange: number; ryBase: number; ryRange: number };
  connector: string;
  circle: { cx: number; cy: number; r: number };
}

const VARIANTS: Record<Variant, VariantConfig> = {
  vertical: {
    viewW: 400,
    viewH: 820,
    tangle: { cx: 200, cy: 195, spreadX: 150, spreadY: 195, rxBase: 48, rxRange: 95, ryBase: 18, ryRange: 58 },
    connector: 'M236 320 C296 378 150 410 200 470',
    circle: { cx: 200, cy: 610, r: 140 },
  },
  horizontal: {
    viewW: 760,
    viewH: 360,
    tangle: { cx: 195, cy: 180, spreadX: 150, spreadY: 200, rxBase: 48, rxRange: 92, ryBase: 18, ryRange: 55 },
    connector: 'M306 230 C396 300 360 150 440 178',
    circle: { cx: 580, cy: 180, r: 150 },
  },
};

/** Deterministic LCG so the tangle is stable across renders/loads. */
function buildFigure(variant: Variant) {
  const cfg = VARIANTS[variant];
  let s = 20260613;
  const rnd = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  const round = (n: number, p = 1) => Number(n.toFixed(p));

  // Chaotic ball: many large ovals at random rotations layered densely.
  const tangle: Stroke[] = [];
  const t = cfg.tangle;
  for (let i = 0; i < 52; i++) {
    const ex = t.cx + (rnd() - 0.5) * t.spreadX;
    const ey = t.cy + (rnd() - 0.5) * t.spreadY;
    const rx = t.rxBase + rnd() * t.rxRange;
    const ry = t.ryBase + rnd() * t.ryRange;
    const rot = Math.round(rnd() * 180);
    const op = round(0.4 + rnd() * 0.4, 2);
    tangle.push({ cx: round(ex), cy: round(ey), rx: round(rx), ry: round(ry), rot, op, dur: 0.6, delay: round(i * 0.035, 3) });
  }

  // Clean circle: a few near-overlapping passes for a hand-drawn ring.
  const circles: Stroke[] = [];
  const c = cfg.circle;
  for (let j = 0; j < 4; j++) {
    const jx = c.cx + (rnd() - 0.5) * 7;
    const jy = c.cy + (rnd() - 0.5) * 7;
    circles.push({
      cx: round(jx),
      cy: round(jy),
      rx: round(c.r + (rnd() - 0.5) * 8),
      ry: round(c.r + (rnd() - 0.5) * 8),
      rot: Math.round(rnd() * 30),
      op: round(0.7 + rnd() * 0.25, 2),
      dur: 1.3,
      delay: round(2.7 + j * 0.18, 2),
    });
  }

  return { tangle, circles, connector: cfg.connector, viewW: cfg.viewW, viewH: cfg.viewH };
}

interface TangleToClarityProps {
  variant?: Variant;
  className?: string;
}

export function TangleToClarity({ variant = 'vertical', className }: TangleToClarityProps) {
  const { ref, isVisible } = useScrollReveal();
  const { tangle, circles, connector, viewW, viewH } = useMemo(() => buildFigure(variant), [variant]);

  const lineStyle = (e: Stroke): CSSProperties =>
    ({ '--dur': `${e.dur}s`, '--delay': `${e.delay}s` } as CSSProperties);

  return (
    <div
      ref={ref}
      className={[styles.visual, isVisible ? styles.isVisible : '', className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <svg className={styles.svg} viewBox={`0 0 ${viewW} ${viewH}`} fill="none">
        {tangle.map((e, i) => (
          <ellipse
            key={`t${i}`}
            className={styles.line}
            cx={e.cx}
            cy={e.cy}
            rx={e.rx}
            ry={e.ry}
            transform={`rotate(${e.rot} ${e.cx} ${e.cy})`}
            strokeWidth={1}
            opacity={e.op}
            pathLength={1}
            style={lineStyle(e)}
          />
        ))}

        <path
          className={styles.line}
          d={connector}
          strokeWidth={1.7}
          opacity={0.97}
          pathLength={1}
          style={{ '--dur': '1.1s', '--delay': '1.9s' } as CSSProperties}
        />

        {circles.map((e, i) => (
          <ellipse
            key={`c${i}`}
            className={styles.line}
            cx={e.cx}
            cy={e.cy}
            rx={e.rx}
            ry={e.ry}
            transform={`rotate(${e.rot} ${e.cx} ${e.cy})`}
            strokeWidth={1.4}
            opacity={e.op}
            pathLength={1}
            style={lineStyle(e)}
          />
        ))}
      </svg>
    </div>
  );
}
