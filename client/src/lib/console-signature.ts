/**
 * Interactive console "SDK" - the developer easter egg exposed as `window.victoria`.
 *
 * On load it prints a concise greeting and installs a small, explorable command API.
 * The medium is the message: a clean, documented, namespaced object that rewards the
 * curious developer or recruiter who opens the console.
 */
import { CONSOLE_PALETTE, CONSOLE_FONT_SIZE } from '@/constants/colors';
import {
  PERSONAL_INFO,
  TAGLINES,
  LEADERSHIP_PRINCIPLES,
  CONSOLE_MESSAGES,
  CONSOLE_SDK,
} from '@/constants/strings';

const STYLE = {
  title: `color:${CONSOLE_PALETTE.TITLE};font-size:${CONSOLE_FONT_SIZE.LARGE};font-weight:bold;`,
  heading: `color:${CONSOLE_PALETTE.HEADING};font-size:${CONSOLE_FONT_SIZE.MEDIUM};font-weight:bold;`,
  subheading: `color:${CONSOLE_PALETTE.SUBHEADING};font-weight:bold;`,
  body: `color:${CONSOLE_PALETTE.BODY};font-size:${CONSOLE_FONT_SIZE.SMALL};`,
  accent: `color:${CONSOLE_PALETTE.ACCENT};`,
  command: `color:${CONSOLE_PALETTE.COMMAND};font-weight:bold;`,
  comment: `color:${CONSOLE_PALETTE.DIM};font-style:italic;font-size:${CONSOLE_FONT_SIZE.SMALL};`,
  name: `color:${CONSOLE_PALETTE.TITLE};font-weight:bold;`,
  tableHead: `color:${CONSOLE_PALETTE.DIM};font-size:${CONSOLE_FONT_SIZE.SMALL};`,
} as const;

function line(text: string, style: string): void {
  console.log(`%c${text}`, style);
}

// Log a command's closing punchline in the phosphor accent color and return
// undefined - so the line reads green rather than the browser's own (blue)
// color for an echoed return value.
function close(text: string): void {
  line(`\n${text}`, STYLE.accent);
}

// A console.table replacement we can actually color: console.table cell text is
// drawn by DevTools (always blue) and can't be styled, so we render aligned,
// monospace columns via %c instead - command column in phosphor green, the rest warm.
type TableColumn = { key: string; header: string; style: string };
function styledTable(rows: readonly Record<string, unknown>[], columns: TableColumn[]): void {
  const cell = (row: Record<string, unknown>, key: string) => String(row[key] ?? '');
  const widths = columns.map((c) =>
    Math.max(c.header.length, ...rows.map((r) => cell(r, c.key).length)),
  );
  const styles: string[] = [];
  let fmt = '';
  const pushRow = (values: string[], rowStyles: string[]) => {
    values.forEach((v, ci) => {
      const last = ci === columns.length - 1;
      fmt += `%c${last ? v : v.padEnd(widths[ci] + 2)}`;
      styles.push(rowStyles[ci]);
    });
  };
  pushRow(
    columns.map((c) => c.header),
    columns.map(() => STYLE.tableHead),
  );
  rows.forEach((r) => {
    fmt += '\n';
    pushRow(
      columns.map((c) => cell(r, c.key)),
      columns.map((c) => c.style),
    );
  });
  console.log(fmt, ...styles);
}

// --- victoria.maze(): a fresh, always-solvable maze with its one path traced ---
// Same idea as the site's "tangle to clarity" motif: there's always a way through.
const MAZE_COLS = 11;
const MAZE_ROWS = 9;

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

/**
 * Generate a random maze (recursive backtracker) on a (2·cols+1)×(2·rows+1) grid,
 * solve it entrance→exit with BFS, and return thin-line rows. Walls become box
 * glyphs, the solution is a "·" trail, and the exit is marked with "→".
 */
function generateMaze(cols: number, rows: number): string[] {
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
      const j = Math.floor(Math.random() * (i + 1));
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
  for (let cur: number | null | undefined = end; cur != null; cur = prev.get(cur)) {
    const r = Math.floor(cur / W);
    const c = cur % W;
    if (g[r][c] === ' ') g[r][c] = '·';
  }

  const isWall = (r: number, c: number) => r >= 0 && c >= 0 && r < H && c < W && g[r][c] === '#';
  const out: string[] = [];
  for (let r = 0; r < H; r++) {
    let row = '';
    for (let c = 0; c < W; c++) {
      const ch = g[r][c];
      if (ch === '#') {
        const u = isWall(r - 1, c) ? 1 : 0;
        const d = isWall(r + 1, c) ? 1 : 0;
        const l = isWall(r, c - 1) ? 1 : 0;
        const ri = isWall(r, c + 1) ? 1 : 0;
        row += MAZE_BOX[`${u}${d}${l}${ri}`];
      } else {
        row += ch;
      }
    }
    out.push(row);
  }
  out[H - 2] += '→'; // point the way out
  return out;
}

/** Print the maze in two tones: dim walls, champagne solution path. */
function drawMaze(): void {
  const rows = generateMaze(MAZE_COLS, MAZE_ROWS);
  const wallStyle = `color:${CONSOLE_PALETTE.DIM};`;
  const pathStyle = `color:${CONSOLE_PALETTE.ACCENT};font-weight:bold;`;
  const isPath = (ch: string) => ch === '·' || ch === '→';

  let fmt = '';
  const styles: string[] = [];
  rows.forEach((row, i) => {
    let run = '';
    let runIsPath = false;
    const flush = () => {
      if (!run) return;
      fmt += `%c${run}`;
      styles.push(runIsPath ? pathStyle : wallStyle);
      run = '';
    };
    for (const ch of row) {
      const p = isPath(ch);
      if (run && p !== runIsPath) flush();
      runIsPath = p;
      run += ch;
    }
    flush();
    if (i < rows.length - 1) fmt += '\n';
  });
  console.log(fmt, ...styles);
}

function bullets(items: readonly string[]): void {
  items.forEach((item) => line(`  • ${item}`, STYLE.body));
}

function greet(): void {
  line(CONSOLE_SDK.GREETING_COMMENT, STYLE.comment);
  console.log(
    `%c${CONSOLE_SDK.GREETING_CODE_KEYWORD} %c${CONSOLE_SDK.GREETING_CODE_NAME}%c${CONSOLE_SDK.GREETING_CODE_REST}`,
    STYLE.accent,
    STYLE.name,
    STYLE.body,
  );
  console.log(
    `\n%c${CONSOLE_SDK.GREETING_HELP_CMD}%c  ${CONSOLE_SDK.GREETING_HELP_TAG}`,
    STYLE.command,
    STYLE.comment,
  );
  console.log(
    `%c${CONSOLE_SDK.GREETING_MAZE_CMD}%c  ${CONSOLE_SDK.GREETING_MAZE_TAG}`,
    STYLE.command,
    STYLE.comment,
  );
}

function buildApi() {
  const api = {
    help() {
      styledTable(CONSOLE_SDK.COMMANDS, [
        { key: 'command', header: 'command', style: STYLE.command },
        { key: 'what', header: 'what', style: STYLE.body },
      ]);
      close(CONSOLE_SDK.HELP_RETURN);
    },
    readme() {
      CONSOLE_SDK.README_SECTIONS.forEach((section) => {
        line(`\n${section.h}`, STYLE.subheading);
        line(`  ${section.body}`, STYLE.body);
      });
      close(CONSOLE_SDK.README_RETURN);
    },
    // A getter, so `victoria.experience` (no parens) prints the timeline on access.
    get experience() {
      styledTable(CONSOLE_SDK.EXPERIENCE, [
        { key: 'role', header: 'role', style: STYLE.command },
        { key: 'company', header: 'company', style: STYLE.subheading },
        { key: 'period', header: 'period', style: STYLE.body },
        { key: 'focus', header: 'focus', style: STYLE.body },
      ]);
      close(CONSOLE_SDK.EXPERIENCE_RETURN);
      return undefined;
    },
    impact() {
      styledTable(CONSOLE_SDK.IMPACT, [
        { key: 'area', header: 'area', style: STYLE.command },
        { key: 'where', header: 'where', style: STYLE.subheading },
        { key: 'outcome', header: 'outcome', style: STYLE.accent },
      ]);
      close(CONSOLE_SDK.IMPACT_RETURN);
    },
    decisions() {
      bullets(CONSOLE_SDK.DECISIONS);
      close(CONSOLE_SDK.DECISIONS_RETURN);
    },
    principles() {
      LEADERSHIP_PRINCIPLES.forEach((principle) => {
        line(`\n${principle.title}`, STYLE.subheading);
        line(`  ${principle.description}`, STYLE.body);
      });
      close(CONSOLE_SDK.PRINCIPLES_RETURN);
    },
    story() {
      bullets(CONSOLE_SDK.STORY);
      close(CONSOLE_SDK.STORY_RETURN);
    },
    maze() {
      drawMaze();
      line(`\n${CONSOLE_SDK.MAZE_CAPTION}`, STYLE.subheading);
      close(CONSOLE_SDK.MAZE_RETURN);
    },
    skills() {
      [
        CONSOLE_MESSAGES.SKILLS_LANGUAGES,
        CONSOLE_MESSAGES.SKILLS_FRONTEND,
        CONSOLE_MESSAGES.SKILLS_BACKEND,
        CONSOLE_MESSAGES.SKILLS_CLOUD,
        CONSOLE_MESSAGES.SKILLS_LEADERSHIP,
      ].forEach((skill) => line(skill, STYLE.body));
      close(CONSOLE_MESSAGES.SKILLS_RETURN);
    },
    hire() {
      bullets(CONSOLE_SDK.HIRE);
      line(`\n${CONSOLE_SDK.HIRE_HINT}`, STYLE.accent);
      close(TAGLINES.PRIMARY);
    },
    contact() {
      line(`  Email     ${PERSONAL_INFO.EMAIL}`, STYLE.accent);
      line(`  LinkedIn  ${PERSONAL_INFO.LINKEDIN_URL}`, STYLE.accent);
      line(`  Location  ${PERSONAL_INFO.LOCATION}`, STYLE.body);
      close(CONSOLE_SDK.CONTACT_RETURN);
    },
  };

  // Stringify to a clean one-liner (e.g. `${victoria}`) instead of "[object Object]".
  Object.defineProperty(api, 'toString', {
    value: () => CONSOLE_SDK.SIGNATURE,
    enumerable: false,
  });
  Object.defineProperty(api, Symbol.toPrimitive, {
    value: () => CONSOLE_SDK.SIGNATURE,
    enumerable: false,
  });

  return api;
}

let mounted = false;

/** Print the greeting and install `window.victoria`. Safe to call more than once. */
export function mountConsoleSignature(): void {
  if (mounted || typeof window === 'undefined') return;
  mounted = true;

  greet();

  (window as unknown as { victoria: ReturnType<typeof buildApi> }).victoria = buildApi();
}
