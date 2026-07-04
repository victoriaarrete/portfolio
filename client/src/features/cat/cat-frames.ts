/**
 * The cat. When she sits, she IS the reference art - transcribed verbatim,
 * character by character, not approximated. Generation is reserved for what
 * the reference doesn't have: the walking frames, whose glyph noise is rolled
 * from the same alphabet so the two styles read as one animal.
 */

/**
 * The reference, verbatim: a Maine Coon sitting in profile facing left, tail
 * lying along the ground to the right with the tip curling up at the end.
 */
export const CAT_SIT_ART: readonly string[] = [
  '3/              %',
  ' G%          Rs',
  ' @^%RK(^@@R3',
  ' @#// ^^~%~/t(',
  ' tC // sStt^~(',
  '@@@@@@@@@R7 (s7',
  '@t~%~R@Ct^(@(3Q',
  '7~7R@^(e(/C%@C/^/#@',
  '  @@C#SSs#@7//((%@',
  ' KR@@@@S@C//%(@RsSG',
  'QQQ@#eQt%%SRK@OO%G#KS',
  'OSsO#RG%O#tR~@7tt%SsORS%',
  ' OtKRSK3CS(Ot/(((CKt/%OsK(/t',
  'tG@(eRK(/7~/t%7st~  /( (tCC^%',
  ' 3O%O--^(~/t77OS~  (^^   ~(((/^t',
  ' tt%t(%COt(C%t(  ^ //^   ^//~(sC/',
  ' t%(tsQtt(Ss^^ ~ /~O(^      ^~%SQ',
  '  es%%COK7^ /t7tOQ%3/     ^(((%SQK',
  '  (SKS%3%~(#7COG(OOs / ^  /t%O3SQS',
  '    SRKOS%3(%7sSOK(/~// ^(%OeGC3Q@Q',
  '      (#RGCO%~t%eS  ((/(sCKt///t3Q@',
  '       S CO~~S#sOe%ts%(t#%/^^/(t3e@',
  '        KK^/teOK@@SOOt%t(///~/~tG%@@',
  '         #O//7%S@G@@@%CS(///(t((SQs@@@      ^/t7eCt',
  '         K/^~3R@@#%tKKC7/~//t%OQ%C@@@Rs3%/ t//~%%((C%(%st/',
  '        S% /tS@@(tC3%(%t(7%eSQC%eQQR%O3t((tCC(t%Ot//(%%t// /(%/(',
  '        s(^(s#@     /s@SCOOs@#C3(CR@ssKCC%O@Ct(t%OsO3SSOeSQRG%(t%t',
  '       O//3CR@@    S( ~K@@@@@@R#@@@@ @@@R@@@@#@@@R@@@@@@@@@Q@G^ (CS%',
  '      (~%StCs/       SKS                                %  ^/t%Gt',
  '                                                          O tt#s%%',
];

/**
 * The idle flick: same art, tail tip lifted off the ground for a beat. Only
 * the last two rows differ from the reference - everything else stays exact.
 */
export const CAT_SIT_ART_FLICK: readonly string[] = [
  ...CAT_SIT_ART.slice(0, 28),
  '      (~%StCs/       SKS                                %  ^/t%GtO#s%',
  '',
];

/** The reference's alphabet, split by visual weight - used by the walk frames. */
const GLYPH_EDGE = '(/^~-t%s(',
  GLYPH_MID = 'C3est7sKtO%',
  GLYPH_DENSE = '@#RKQSGO';

/** Chance any walk-frame cell renders as a gap - the "fur" holes. */
const DROPOUT = 0.08;

/**
 * Mid-stride walking profile, facing left. A walking cat is LOW - about
 * two-thirds of her sitting height - and long: level back, head carried at
 * back height, deep belly, bushy tail curving up behind. Head width matches
 * the sitting art's head, so the get-up reads as the same animal changing
 * posture, not changing size. Two stride frames (legs extended / gathering)
 * share this body, so only the legs move.
 */
const WALK_BODY: readonly string[] = [
  '    ##   ##                                       ####',
  '   ###########                                   #####',
  '   ###########                                  #####',
  '  ############                                 #####',
  ' ##############                               ######',
  ' ##############                              #####',
  '  #############                             #####',
  '   ##############                          #####',
  '    #########################################',
  '    ############################################',
  '     ###########################################',
  '     ##########################################',
  '      ########################################',
  '       ######################################',
];

export const CAT_MASK_WALK_A: readonly string[] = [
  ...WALK_BODY,
  '      ######   #######      #######   ######',
  '     ######     ######      ######     #####',
  '     #####       #####      #####       #####',
  '    #####        ####       ####         ####',
  '    ####         ####       ####          ####',
  '   #####         ####       ####          #####',
];

export const CAT_MASK_WALK_B: readonly string[] = [
  ...WALK_BODY,
  '        ##### #######        ####### ######',
  '        ####   ######        ######   #####',
  '        ####    #####        #####    ####',
  '        ####    #####        #####    ####',
  '        ####    ####         ####     ####',
  '       #####    ####         ####    #####',
];

/**
 * Standing still: same body, legs straight under it, tail up. Shown for a
 * beat between sitting and walking (and again on arrival) so she rises,
 * walks, and settles - instead of teleporting between poses.
 */
export const CAT_MASK_STAND: readonly string[] = [
  ...WALK_BODY,
  '       ######  #######      #######  ######',
  '       #####    ######      ######    #####',
  '       #####     #####      #####     #####',
  '       ####      #####      #####      ####',
  '       ####      ####       ####       ####',
  '      #####      ####       ####      #####',
];

/**
 * Fill a walk mask with glyph noise. Edge cells (any blank neighbour) get the
 * light set; the interior mixes dense and mid weights, with occasional dropout
 * gaps - matching the reference's texture so sit and walk read as one cat.
 */
export function renderCat(mask: readonly string[], random: () => number): readonly string[] {
  const pick = (set: string) => set[Math.floor(random() * set.length)];

  return mask.map((row, r) => {
    let out = '';
    for (let c = 0; c < row.length; c++) {
      if (row[c] !== '#') {
        out += ' ';
        continue;
      }
      if (random() < DROPOUT) {
        out += ' ';
        continue;
      }
      const edge =
        (mask[r - 1]?.[c] ?? ' ') !== '#' ||
        (mask[r + 1]?.[c] ?? ' ') !== '#' ||
        (row[c - 1] ?? ' ') !== '#' ||
        (row[c + 1] ?? ' ') !== '#';
      out += pick(edge ? GLYPH_EDGE : random() < 0.55 ? GLYPH_DENSE : GLYPH_MID);
    }
    return out;
  });
}

/** Which behaviours the idle cat picks between, and how it weights them. */
export interface IdleBehaviour {
  readonly mode: 'sit' | 'flick' | 'sleep';
  /** Relative likelihood of being chosen. */
  readonly weight: number;
  /** [min, max] seconds to hold the behaviour before wandering off again. */
  readonly hold: readonly [number, number];
}

export const IDLE_BEHAVIOURS: readonly IdleBehaviour[] = [
  { mode: 'sit', weight: 4, hold: [3, 6] },
  { mode: 'flick', weight: 3, hold: [2, 4] },
  { mode: 'sleep', weight: 2, hold: [6, 11] },
];

export const CAT_MOTION = {
  /** Travel speed as a fraction of the floor's usable width, per second.
      A cat this size prowls; she doesn't scamper. */
  WALK_SPEED: 0.09,
  /** Seconds per stride frame - legs extended <-> legs gathering. */
  STEP_INTERVAL: 0.32,
  /** Seconds between texture re-rolls while walking - the noise "crawls". */
  SHIMMER_WALK: 0.16,
  /** Seconds between tail-up / tail-down swaps during a flick. */
  FLICK_INTERVAL: 0.55,
  /** Height of the walking bob, in pixels. */
  BOB_HEIGHT: 3,
  /** Bob cycles per second while walking. */
  BOB_RATE: 2.2,
  /** Beat before the cat sets off toward a fresh spot. */
  ALERT_HOLD: 0.7,
  /** How long the standing frame holds while she rises from (or settles into)
      the sit - the beat that makes the transition read as getting up. */
  RISE_HOLD: 0.38,
} as const;
