/**
 * Interactive console "SDK" — the developer easter egg exposed as `window.victoria`.
 *
 * On load it renders a portrait into the DevTools console (Chrome) with a graceful
 * text fallback, prints a concise greeting, and installs a small, explorable command
 * API. The medium is the message: a clean, documented, namespaced object that rewards
 * the curious developer or recruiter who opens the console.
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
  command: `color:${CONSOLE_PALETTE.ACCENT};font-weight:bold;`,
} as const;

function line(text: string, style: string): void {
  console.log(`%c${text}`, style);
}

function block(title: string, items: readonly string[]): void {
  line(`\n${title}`, STYLE.heading);
  items.forEach((item) => line(`  • ${item}`, STYLE.body));
}

/** Paint the portrait straight into the console (Chrome). Silently no-ops elsewhere. */
function renderPortrait(url: string): void {
  if (typeof Image === 'undefined') return;
  const PORTRAIT_WIDTH = 168;
  const img = new Image();
  img.onload = () => {
    const naturalWidth = img.naturalWidth || PORTRAIT_WIDTH;
    const naturalHeight = img.naturalHeight || PORTRAIT_WIDTH;
    const scale = Math.min(1, PORTRAIT_WIDTH / naturalWidth);
    const w = Math.round(naturalWidth * scale);
    const h = Math.round(naturalHeight * scale);
    let src = url;
    // Rasterize at *display* size (not natural size) so the data URL stays a few KB,
    // not megabytes. Same-origin asset → canvas won't taint.
    try {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, w, h);
        // JPEG over PNG: it's a photo, so this is ~10KB instead of ~115KB.
        src = canvas.toDataURL('image/jpeg', 0.82);
      }
    } catch {
      /* tainted/unsupported — fall back to the raw url */
    }
    console.log(
      '%c ',
      `font-size:1px;line-height:${h}px;` +
        `padding:${Math.floor(h / 2)}px ${Math.floor(w / 2)}px;` +
        `background:url('${src}') no-repeat center / contain;border-radius:10px;`,
    );
  };
  img.onerror = () => {
    /* no portrait — the text greeting carries the moment */
  };
  img.src = url;
}

function greet(): void {
  line(CONSOLE_SDK.GREETING_TITLE, STYLE.title);
  line(CONSOLE_SDK.GREETING_BODY, STYLE.body);
  console.log(
    `%c${CONSOLE_SDK.GREETING_HINT_PREFIX}%c${CONSOLE_SDK.GREETING_HINT_CMD}%c${CONSOLE_SDK.GREETING_HINT_SUFFIX}`,
    STYLE.accent,
    STYLE.command,
    STYLE.accent,
  );
}

function buildApi() {
  const api = {
    help() {
      line(CONSOLE_SDK.HELP_TITLE, STYLE.heading);
      console.table(CONSOLE_SDK.COMMANDS);
      return CONSOLE_SDK.HELP_RETURN;
    },
    readme() {
      line(CONSOLE_SDK.README_TITLE, STYLE.heading);
      CONSOLE_SDK.README_SECTIONS.forEach((section) => {
        line(`\n${section.h}`, STYLE.subheading);
        line(`  ${section.body}`, STYLE.body);
      });
      return CONSOLE_SDK.README_RETURN;
    },
    // A getter, so `victoria.experience` (no parens) prints the table *and* hands back
    // the array for the reader to expand and interrogate.
    get experience() {
      line(`\n${CONSOLE_SDK.EXPERIENCE_TITLE}`, STYLE.heading);
      console.table(CONSOLE_SDK.EXPERIENCE);
      return CONSOLE_SDK.EXPERIENCE;
    },
    impact() {
      line(CONSOLE_SDK.IMPACT_TITLE, STYLE.heading);
      console.table(CONSOLE_SDK.IMPACT);
      return CONSOLE_SDK.IMPACT_RETURN;
    },
    decisions() {
      block(CONSOLE_SDK.DECISIONS_TITLE, CONSOLE_SDK.DECISIONS);
      return CONSOLE_SDK.DECISIONS_RETURN;
    },
    principles() {
      line(CONSOLE_SDK.PRINCIPLES_TITLE, STYLE.heading);
      LEADERSHIP_PRINCIPLES.forEach((principle) => {
        line(`\n${principle.title}`, STYLE.subheading);
        line(`  ${principle.description}`, STYLE.body);
      });
      return CONSOLE_SDK.PRINCIPLES_RETURN;
    },
    story() {
      block(CONSOLE_SDK.STORY_TITLE, CONSOLE_SDK.STORY);
      return CONSOLE_SDK.STORY_RETURN;
    },
    skills() {
      line(CONSOLE_MESSAGES.SKILLS_TITLE, STYLE.heading);
      [
        CONSOLE_MESSAGES.SKILLS_LANGUAGES,
        CONSOLE_MESSAGES.SKILLS_FRONTEND,
        CONSOLE_MESSAGES.SKILLS_BACKEND,
        CONSOLE_MESSAGES.SKILLS_CLOUD,
        CONSOLE_MESSAGES.SKILLS_LEADERSHIP,
      ].forEach((skill) => line(skill, STYLE.body));
      return CONSOLE_MESSAGES.SKILLS_RETURN;
    },
    hire() {
      block(CONSOLE_SDK.HIRE_TITLE, CONSOLE_SDK.HIRE);
      line(`\n${CONSOLE_SDK.HIRE_HINT}`, STYLE.accent);
      return TAGLINES.PRIMARY;
    },
    contact() {
      line(CONSOLE_SDK.CONTACT_TITLE, STYLE.heading);
      line(`  Email     ${PERSONAL_INFO.EMAIL}`, STYLE.accent);
      line(`  LinkedIn  ${PERSONAL_INFO.LINKEDIN_URL}`, STYLE.accent);
      line(`  Location  ${PERSONAL_INFO.LOCATION}`, STYLE.body);
      return CONSOLE_SDK.CONTACT_RETURN;
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
export function mountConsoleSignature(portraitUrl: string): void {
  if (mounted || typeof window === 'undefined') return;
  mounted = true;

  renderPortrait(portraitUrl);
  greet();

  (window as unknown as { victoria: ReturnType<typeof buildApi> }).victoria = buildApi();
}
