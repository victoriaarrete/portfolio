/**
 * Maze generation - shared by the console easter egg (victoria.maze()) and the
 * 404 page. The generator takes a random source, so the console gets a fresh
 * tangle every call while the 404 page seeds it from the broken URL: every
 * wrong turn gets its own maze, and the same wrong turn always gets the same one.
 */

export const MAZE_COLS = 11;
export const MAZE_ROWS = 9;

export type MazeCell = {
  ch: string;
  /** Position along the entrance→exit solution trail, or null off the trail. */
  step: number | null;
};

// Box-drawing glyph for a wall cell, keyed by which of its up/down/left/right
// neighbours are also walls (1 = connected). Correct junctions = no floating stubs.
const MAZE_BOX: Record<string, string> = {
  '0000': ' ',
  '0001': '╶',
  '0010': '╴',
  '0011': '─',
  '0100': '╷',
  '0101': '┌',
  '0110': '┐',
  '0111': '┬',
  '1000': '╵',
  '1001': '└',
  '1010': '┘',
  '1011': '┴',
  '1100': '│',
  '1101': '├',
  '1110': '┤',
  '1111': '┼',
};

/** xmur3-style string hash → 32-bit seed. */
export function hashString(input: string): number {
  let h = 1779033703 ^ input.length;
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^ (h >>> 16)) >>> 0;
}

/** mulberry32 - a tiny deterministic PRNG over a 32-bit seed. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate a maze (recursive backtracker) on a (2·cols+1)×(2·rows+1) grid,
 * solve it entrance→exit with BFS, and return the grid as cells. Walls become
 * box glyphs, the solution is a "·" trail (ordered by `step`), and the exit
 * row carries a trailing "→" pointing the way out.
 */
export function generateMaze(
  cols: number,
  rows: number,
  random: () => number = Math.random,
): MazeCell[][] {
  const W = 2 * cols + 1;
  const H = 2 * rows + 1;
  const g: string[][] = Array.from({ length: H }, () => Array<string>(W).fill('#'));
  const visited: boolean[][] = Array.from({ length: rows }, () => Array<boolean>(cols).fill(false));

  const carve = (cx: number, cy: number): void => {
    visited[cy][cx] = true;
    g[2 * cy + 1][2 * cx + 1] = ' ';
    const dirs = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ];
    for (let i = dirs.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
    }
    for (const [dx, dy] of dirs) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || visited[ny][nx]) continue;
      g[2 * cy + 1 + dy][2 * cx + 1 + dx] = ' ';
      carve(nx, ny);
    }
  };
  carve(0, 0);

  g[1][0] = ' '; // entrance: left edge, top row
  g[H - 2][W - 1] = ' '; // exit: right edge, bottom row

  // BFS for the shortest entrance→exit path (a single, non-branching trail).
  const key = (r: number, c: number) => r * W + c;
  const prev = new Map<number, number | null>();
  const queue: Array<[number, number]> = [[1, 0]];
  prev.set(key(1, 0), null);
  const end = key(H - 2, W - 1);
  while (queue.length) {
    const [r, c] = queue.shift() as [number, number];
    if (key(r, c) === end) break;
    for (const [dr, dc] of [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= H || nc >= W) continue;
      if (g[nr][nc] === '#' || prev.has(key(nr, nc))) continue;
      prev.set(key(nr, nc), key(r, c));
      queue.push([nr, nc]);
    }
  }
  const trail: number[] = [];
  for (let cur: number | null | undefined = end; cur != null; cur = prev.get(cur)) {
    trail.push(cur);
  }
  trail.reverse();
  const stepOf = new Map<number, number>(trail.map((k, i) => [k, i]));

  const isWall = (r: number, c: number) => r >= 0 && c >= 0 && r < H && c < W && g[r][c] === '#';
  const out: MazeCell[][] = [];
  for (let r = 0; r < H; r++) {
    const row: MazeCell[] = [];
    for (let c = 0; c < W; c++) {
      if (g[r][c] === '#') {
        const u = isWall(r - 1, c) ? 1 : 0;
        const d = isWall(r + 1, c) ? 1 : 0;
        const l = isWall(r, c - 1) ? 1 : 0;
        const ri = isWall(r, c + 1) ? 1 : 0;
        row.push({ ch: MAZE_BOX[`${u}${d}${l}${ri}`], step: null });
      } else {
        const step = stepOf.get(key(r, c)) ?? null;
        row.push({ ch: step != null ? '·' : ' ', step });
      }
    }
    out.push(row);
  }
  out[H - 2].push({ ch: '→', step: trail.length }); // point the way out
  return out;
}
