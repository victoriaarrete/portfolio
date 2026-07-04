/**
 * Interactive console "SDK" - the developer easter egg exposed as `window.victoria`.
 *
 * On load it prints a concise greeting and installs a small, explorable command API.
 * The medium is the message: a clean, documented, namespaced object that rewards the
 * curious developer or recruiter who opens the console.
 */
import { CONSOLE_PALETTE, CONSOLE_FONT_SIZE } from '@/shared/constants/colors';
import {
  PERSONAL_INFO,
  TAGLINES,
  LEADERSHIP_PRINCIPLES,
  CONSOLE_MESSAGES,
  CONSOLE_SDK,
  NOT_FOUND,
} from '@/shared/constants/strings';
import { generateMaze, MAZE_COLS, MAZE_ROWS } from '@/shared/lib/maze';

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
// The generator itself lives in shared/lib/maze.ts, where the 404 page reuses it.

/** Print the maze in two tones: dim walls, champagne solution path. */
function drawMaze(): void {
  const grid = generateMaze(MAZE_COLS, MAZE_ROWS);
  const wallStyle = `color:${CONSOLE_PALETTE.DIM};`;
  const pathStyle = `color:${CONSOLE_PALETTE.ACCENT};font-weight:bold;`;

  let fmt = '';
  const styles: string[] = [];
  grid.forEach((row, i) => {
    let run = '';
    let runIsPath = false;
    const flush = () => {
      if (!run) return;
      fmt += `%c${run}`;
      styles.push(runIsPath ? pathStyle : wallStyle);
      run = '';
    };
    for (const cell of row) {
      const p = cell.step != null;
      if (run && p !== runIsPath) flush();
      runIsPath = p;
      run += cell.ch;
    }
    flush();
    if (i < grid.length - 1) fmt += '\n';
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
    // The way out. Client-side nav to /cat: push the URL, then let wouter's
    // popstate listener pick it up - no full reload, no lost console.
    cat() {
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/cat');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      close(CONSOLE_SDK.CAT_RETURN);
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

/** 404 hook: install the SDK, then note the wrong turn in the console's voice. */
export function logWrongTurn(path: string): void {
  mountConsoleSignature();
  line(`${NOT_FOUND.CONSOLE_PREFIX}"${path}"${NOT_FOUND.CONSOLE_SUFFIX}`, STYLE.comment);
}
