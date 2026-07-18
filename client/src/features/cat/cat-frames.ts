/**
 * The cat's frames, rebuilt to match the glyph-texture reference renders:
 * a fluffy long-haired cat whose whole body is dense character noise
 * (9s, 8s, S's...) with lighter punctuation along the edges and loose fur
 * wisps just outside the silhouette.
 *
 * Frames are silhouette MASKS ('#' = cat), generated offline from ellipse /
 * polygon / tapered-stroke geometry and baked here. Each render fills the
 * mask with fresh glyph noise, so the fur shimmers frame to frame exactly
 * like the reference sheets. Both poses face left natively; the right-facing
 * sets are mirrored masks (the references include both directions).
 *
 *   A. Sitting  - one pose per direction; idle life comes from periodic
 *                 noise re-rolls (the fur breathes) rather than keyframes.
 *   B. Walking  - an 8-frame leg cycle per direction. The body and plume
 *                 tail are the baked mask; the legs are placed per frame by
 *                 a lateral-walk gait (footfalls a quarter-cycle apart,
 *                 planted paws sweeping back at exactly ground speed).
 */

/* ==========================================================================
   Baked silhouette masks (generated from geometry, facing left)
   ========================================================================== */

export const SIT_MASK: readonly string[] = [
  '           ##           ###',
  '            ###        ####',
  '            ####       ####',
  '             #####    ######',
  '             ###############',
  '              ###########',
  '            ###############',
  '            ###############',
  '         #####   ###########',
  '      # ####################',
  '    #   ####################',
  '     #  ####################',
  '         ####################',
  '       # #####################',
  '          ###################       #',
  '          ################## ###############',
  '          #####################################',
  '          #######################################',
  '         ##########################################',
  '         ############################################',
  '         #############################################',
  '        ###############################################',
  '        ###############################################',
  '        ################################################',
  '       ##################################################',
  '       ##################################################',
  '       ##################################################',
  '       ##################################################',
  '       ###################################################',
  '       ####################################################',
  '       ####################################################',
  '       ####################################################',
  '       #####################################################                 ######',
  '       ####################################################                 ########',
  '      #####################################################               ##########',
  '       ####################################################             ###########',
  '       ###################################################            #############',
  '        ####################################################### ##################',
  '         #########################################################################',
  '           ######################################################################',
  '           ######################################################################',
  '          #################  ###################################################',
  '         ####################       #       #       ##########################',
  '           #######  #######                             ##################',
];

/** Walk body + tail; rows 30-39 are the leg zone, filled per frame below. */
const WALK_BODY: readonly string[] = [
  '                     #',
  '     #              ##',
  '     ###            ##',
  '     ####          ####                                                            ###',
  '      #####       #####                                                      #############',
  '      ######      #####                                                 ###################',
  '      ########   #######                                              ######################',
  '       #################                                             #######################',
  '       #############                                                ########################',
  '       ###############                                             #########################',
  '       ###############                                            ##########################',
  '    ####   ############    #                #                    ###########################',
  '  ###################################################### # #########################',
  '#  ##############################################################################',
  ' # ###########################################################################',
  '    ########################################################################',
  '   # ####################################################################',
  '     ####################################################################',
  '      ####################################################################',
  '        ##################################################################',
  '          ################################################################',
  '          #################################################################',
  '          ################################################################',
  '         #################################################################',
  '          ################################################################',
  '          ###############################################################',
  '          ###############################################################',
  '           #############################################################',
  '             #########################################################',
  '              ###########  # ########################################',
];

/** Widest column any frame can reach. The component uses this to convert
    the sprite's rendered width into a per-column pixel size. */
export const WALK_MASK_WIDTH = 92;
const WALK_ROWS = 40;
const LEG_TOP = 30;

/* ==========================================================================
   Walk legs - a generated lateral-walk gait, 8 frames
   ========================================================================== */

/** How far a paw swings from its hip at full stride, in columns. */
const STRIDE_SWEEP = 4;

/** Fraction of the cycle each paw spends planted. Real cats walk at ~0.6:
    always at least two paws down, never a bunched or floating moment. */
const STANCE_SHARE = 0.6;

/** Ground the body covers in one full leg cycle, in mask columns. Keying
    the animation to this (see the component) is what stops paws from
    sliding: the ground and the planted paws move at exactly the same rate. */
export const WALK_CYCLE_COLS = (2 * STRIDE_SWEEP) / STANCE_SHARE;

/** Hip anchors (columns, left-facing) and footfall offsets in lateral-walk
    order. Near legs render wider than far legs for depth. */
const LEGS = [
  { anchor: 22, offset: 0.25, width: 3 }, // near front
  { anchor: 30, offset: 0.75, width: 2 }, // far front
  { anchor: 55, offset: 0.0, width: 3 }, // near rear
  { anchor: 63, offset: 0.5, width: 2 }, // far rear
] as const;

function buildWalkMask(phase: number): readonly string[] {
  const legs: string[][] = Array.from({ length: WALK_ROWS - LEG_TOP }, () =>
    Array<string>(WALK_MASK_WIDTH).fill(' '),
  );
  for (const leg of LEGS) {
    const t = (phase + leg.offset) % 1;
    let paw: number;
    let lift = 0;
    if (t < STANCE_SHARE) {
      // Planted: forward reach to full push-back, at constant speed.
      paw = leg.anchor - STRIDE_SWEEP + 2 * STRIDE_SWEEP * (t / STANCE_SHARE);
    } else {
      // Swinging: back to front in the remaining slice, paw off the ground.
      const s = (t - STANCE_SHARE) / (1 - STANCE_SHARE);
      paw = leg.anchor + STRIDE_SWEEP - 2 * STRIDE_SWEEP * s;
      lift = Math.sin(s * Math.PI) * 3;
    }
    const rows = legs.length;
    const reach = Math.max(3, rows - Math.round(lift));
    for (let r = 0; r < reach; r++) {
      const x = Math.round(leg.anchor + (paw - leg.anchor) * ((r + 1) / rows));
      for (let w = 0; w < leg.width; w++) {
        const c = x + w;
        if (c >= 0 && c < WALK_MASK_WIDTH) legs[r][c] = '#';
      }
      // The paw: one cell past the leading (left-facing) edge on the last row.
      if (r === reach - 1 && x - 1 >= 0) legs[r][x - 1] = '#';
    }
  }
  return [...WALK_BODY, ...legs.map((cells) => cells.join('').trimEnd())];
}

const WALK_MASKS_LEFT: readonly (readonly string[])[] = Array.from({ length: 8 }, (_, i) =>
  buildWalkMask(i / 8),
);

/** Masks are pure '#' cells, so mirroring is an exact horizontal flip. */
const mirrorMask = (mask: readonly string[]): readonly string[] =>
  mask.map((row) => row.padEnd(WALK_MASK_WIDTH, ' ').split('').reverse().join('').trimEnd());

export const WALK_MASKS: Readonly<Record<'left' | 'right', readonly (readonly string[])[]>> = {
  left: WALK_MASKS_LEFT,
  right: WALK_MASKS_LEFT.map(mirrorMask),
};

const SIT_WIDTH = Math.max(...SIT_MASK.map((row) => row.length));

export const SIT_MASKS: Readonly<Record<'left' | 'right', readonly string[]>> = {
  left: SIT_MASK,
  right: SIT_MASK.map((row) => row.padEnd(SIT_WIDTH, ' ').split('').reverse().join('').trimEnd()),
};

/* ==========================================================================
   Glyph fill - the reference renders' texture
   ========================================================================== */

/** The reference alphabet: heavy digits in the coat, light punctuation at
    the edges, single wisps of fur just outside the silhouette. */
const GLYPH_DENSE = '9988SS$5';
const GLYPH_MID = '95o3s58o';
const GLYPH_EDGE = ":;'.,`^";
const GLYPH_WISP = ",'`.";

/** Chance an interior cell renders as a gap - the felty holes in the coat. */
const DROPOUT = 0.1;

/** Chance a cell just outside the silhouette sprouts a fur wisp. */
const WISP = 0.07;

/**
 * Fill a mask with glyph noise. Edge cells (any blank neighbour) get light
 * punctuation, the interior mixes heavy and mid digits with occasional
 * dropout, and empty cells hugging the silhouette occasionally sprout a
 * wisp - so every re-roll shimmers like the reference's fur.
 */
export function renderCat(mask: readonly string[], random: () => number): readonly string[] {
  const pick = (set: string) => set[Math.floor(random() * set.length)];
  const at = (r: number, c: number) => mask[r]?.[c] === '#';

  return mask.map((row, r) => {
    let out = '';
    const width = Math.max(row.length, mask[r - 1]?.length ?? 0, mask[r + 1]?.length ?? 0);
    for (let c = 0; c < width; c++) {
      if (row[c] !== '#') {
        const nearFur = at(r - 1, c) || at(r + 1, c) || at(r, c - 1) || at(r, c + 1);
        out += nearFur && random() < WISP ? pick(GLYPH_WISP) : ' ';
        continue;
      }
      if (random() < DROPOUT) {
        out += ' ';
        continue;
      }
      const edge = !at(r - 1, c) || !at(r + 1, c) || !at(r, c - 1) || !at(r, c + 1);
      out += pick(edge ? GLYPH_EDGE : random() < 0.55 ? GLYPH_DENSE : GLYPH_MID);
    }
    return out.trimEnd();
  });
}

/* ==========================================================================
   Behaviour + motion tuning
   ========================================================================== */

/** Which behaviours the idle cat picks between, and how it weights them. */
export interface IdleBehaviour {
  readonly mode: 'sit' | 'sleep';
  /** Relative likelihood of being chosen. */
  readonly weight: number;
  /** [min, max] seconds to hold the behaviour before wandering off again. */
  readonly hold: readonly [number, number];
}

export const IDLE_BEHAVIOURS: readonly IdleBehaviour[] = [
  { mode: 'sit', weight: 6, hold: [4, 9] },
  { mode: 'sleep', weight: 2, hold: [6, 11] },
];

export const CAT_MOTION = {
  /** Travel speed as a fraction of the floor's width, per second.
      A Maine Coon prowls: slow, heavy, elegant, calm. The leg cycle is keyed
      to the distance this covers (WALK_CYCLE_COLS), not to a clock. */
  WALK_SPEED: 0.09,
  /** Seconds between noise re-rolls while sitting - the fur breathing. */
  SIT_SHIMMER: 0.9,
  /** Height of the walking bob, in pixels. Subtle: the head stays level. */
  BOB_HEIGHT: 2,
  /** Beat before the cat sets off toward a fresh spot. */
  ALERT_HOLD: 0.7,
} as const;
