/**
 * String constants for repeated text, URLs, and content
 */

// Personal Information
export const PERSONAL_INFO = {
  NAME: 'Victoria Kirichenko',
  FIRST_NAME: 'Victoria',
  LAST_NAME: 'Kirichenko',
  EMAIL: 'talk@victoriakirichenko.com',
  LINKEDIN_URL: 'https://www.linkedin.com/in/victoria-kirichenko/',
  LINKEDIN_DISPLAY: '/in/victoria-kirichenko',
  LOCATION: 'Tel Aviv District, Israel',
  INITIALS: 'VK',
} as const;

// Job Titles & Roles
export const ROLES = {
  PRIMARY: 'R&D Team Leader',
  FULL_SUBTITLE: 'R&D Leader',
  LIST: ['R&D Leader'],
} as const;

// Taglines & Quotes
export const TAGLINES = {
  PRIMARY: 'I build systems that scale - and teams that want to.',
  HERO: 'I build systems that scale - and teams that want to.',
  ABOUT_TITLE: 'Strong code needs strong culture. I build both.',
  PHILOSOPHY_KICKER: 'How I operate',
  PHILOSOPHY_QUOTE_LEAD: "I don't lead by adding process - I lead by ",
  PHILOSOPHY_QUOTE_EMPHASIS: 'removing noise.',
  PHILOSOPHY_QUOTE_REST:
    " Give people a clear goal, real ownership, and a high bar, and they'll surprise you.",
  FOOTER_QUOTE:
    'Not despite the struggle, but because of it. The hard problems are the ones that taught me everything.',
} as const;

// Section Navigation
export const NAV_SECTIONS = {
  HERO: 'hero',
  ABOUT: 'about',
  EXPERIENCE: 'experience',
  PHILOSOPHY: 'philosophy',
  PROJECTS: 'projects',
  TESTIMONIALS: 'testimonials',
  CONTACT: 'contact',
} as const;

export const NAV_ITEMS = [
  { id: NAV_SECTIONS.ABOUT, label: 'About' },
  { id: NAV_SECTIONS.EXPERIENCE, label: 'Experience' },
  { id: NAV_SECTIONS.PHILOSOPHY, label: 'Philosophy' },
  { id: NAV_SECTIONS.PROJECTS, label: 'Projects' },
  { id: NAV_SECTIONS.TESTIMONIALS, label: 'Testimonials' },
  { id: NAV_SECTIONS.CONTACT, label: 'Contact' },
] as const;

// Section Titles
export const SECTION_TITLES = {
  ABOUT: 'About',
  ABOUT_ACCENT: 'Me',
  EXPERIENCE: 'Experience',
  EXPERIENCE_ACCENT: 'git log',
  PHILOSOPHY: 'Leadership',
  PHILOSOPHY_ACCENT: 'Philosophy',
  PROJECTS: 'Key',
  PROJECTS_ACCENT: 'Projects',
  TESTIMONIALS: 'What Colleagues',
  TESTIMONIALS_ACCENT: 'Say',
  CONTACT: "Let's",
  CONTACT_ACCENT: 'Connect',
} as const;

// Button Labels
export const BUTTON_LABELS = {
  GET_IN_TOUCH: 'Get In Touch',
  LEARN_MORE: 'Learn More',
} as const;

// 404 Page - the broken URL seeds a maze (the "tangle to clarity" motif, applied
// to the error state): every wrong turn gets its own tangle, and its one way out.
export const NOT_FOUND = {
  DOC_TITLE: '404 Page Not Found | Victoria Kirichenko',
  KICKER: 'ERROR 404 - PAGE NOT FOUND',
  TITLE_MAIN: 'Wrong turn.',
  TITLE_ACCENT: 'Not a wasted one.',
  LEAD_SUFFIX: " isn't a page here. But every tangle has a way through - this one leads home.",
  MAZE_NOTE_PREFIX: '// maze seeded from ',
  MAZE_NOTE_SUFFIX: ' - every wrong turn gets its own',
  AI_NOTE: '// if an AI sent you here, it invented this URL. The exits below are real.',
  SUGGEST_LABEL: 'Did you mean',
  HOME_ACTION: 'Take the exit',
  CONSOLE_PREFIX: '// wrong turn: ',
  CONSOLE_SUFFIX: ' - solvable, like everything else. try victoria.maze()',
} as const;

// /cat - the one page with no agenda. A character-art cat wanders, sits, grooms,
// and naps; click the floor and it comes over. The senior signal is restraint:
// same monochrome mono language as the rest, respects prefers-reduced-motion,
// and never begs for attention.
export const CAT = {
  DOC_TITLE: 'The cat | Victoria Kirichenko',
  TITLE_MAIN: 'Off the clock.',
  LEAD: 'Every system that scales needs somewhere to put the pressure down. This is mine.',
  HINT: '// click the floor - she comes when she feels like it',
  BACK_ACTION: 'Back to the serious stuff',
  CONSOLE_LINE: '// meow. (it works, that was the whole point.)',
} as const;

// Console Messages
export const CONSOLE_MESSAGES = {
  WELCOME_TITLE: "🚀 Welcome to Victoria Kirichenko's Portfolio!",
  HELLO_DEV: '👩‍💻 Hello fellow developer!',
  CURIOUS_MESSAGE: "Looks like you're curious about how this site works. I love that! 🔍",

  TECH_STACK_TITLE: '🛠️ Tech Stack:',
  TECH_FRONTEND: '   Frontend: React 18 + TypeScript + Vite',
  TECH_STYLING: '   Styling: Tailwind CSS + Framer Motion',
  TECH_UI: '   UI: Radix UI + shadcn/ui components',
  TECH_DEPLOYMENT: '   Deployment: Static build (no backend needed)',

  FUN_FACTS_TITLE: '💡 Fun Development Facts:',
  FUN_PARTICLES: '   • This site has animated particles (check the background!)',
  FUN_GLASS: '   • Glassmorphism effects everywhere',
  FUN_MAILTO: '   • Contact form uses mailto (perfect for static deployment)',
  FUN_OBSERVER: '   • Intersection Observer for scroll animations',
  FUN_DARK: '   • Dark mode with custom CSS variables',

  ABOUT_TITLE: '🎯 About Victoria:',
  ABOUT_EXPERIENCE: '   • 11+ years in tech (Full Stack → Team Lead → R&D Leader)',
  ABOUT_PASSION: '   • Passionate about AI-driven innovation',
  ABOUT_CULTURE: '   • Building high-performance teams with strong culture',

  EASTER_EGG_TITLE: '🎉 Easter Egg Unlocked!',
  EASTER_EGG_HINT: "Since you're here, try typing: victoria.skills() in the console!",

  PERFORMANCE_TITLE: '⚡ Performance Notes:',
  PERFORMANCE_VITE: '   • Optimized with Vite for fast loading',
  PERFORMANCE_LAZY: '   • Lazy loading for better performance',
  PERFORMANCE_MINIFIED: '   • Minified CSS and JS for production',

  COLLABORATION_TITLE: '💼 Interested in collaboration?',
  COLLABORATION_HINT: 'Type: victoria.contact() for contact info!',

  DIVIDER: '─────────────────────────────────────────────────────────────',

  // Window functions
  SKILLS_LANGUAGES: '   Languages: TypeScript, Python, JavaScript, .NET',
  SKILLS_FRONTEND: '   Frontend: React, HTML5, CSS3',
  SKILLS_BACKEND: '   Backend: Node.js, Express, .NET, PHP',
  SKILLS_CLOUD: '   Cloud & DevOps: AWS, Azure, Docker, Kubernetes, GCP',
  SKILLS_LEADERSHIP: '   Leadership: Team Building, Agile, Strategic Planning',
  SKILLS_RETURN: 'Skills loaded! 💪',

  CONTACT_TITLE: "📧 Let's connect!",
  CONTACT_RETURN: 'Ready to innovate together! 🤝',

  THEME_TITLE: '🌙 Dark Mode Variables:',
  THEME_BG: '   --background: 2 6% 10% (slate-950)',
  THEME_FG: '   --foreground: 0 0% 98% (white)',
  THEME_PRIMARY: '   --primary: 217 91% 60% (blue-500)',
  THEME_ACCENT: '   --accent: 188 86% 53% (cyan-400)',
  THEME_RETURN: 'Theme secrets revealed! 🎨',
} as const;

// Console SDK - the interactive `window.victoria` developer experience.
// Content lives here (the repo centralizes strings); rendering lives in lib/console-signature.ts.
export const CONSOLE_SDK = {
  // Greeting reads as a code snippet: a comment, a `const` declaration, then two
  // command hints tagged like inline comments. Understated, dev-native.
  GREETING_COMMENT: '// most of the story is on the page. the rest is here.',
  GREETING_CODE_KEYWORD: 'const',
  GREETING_CODE_NAME: 'victoria',
  GREETING_CODE_REST: ' = sdk({ build, lead })',
  GREETING_HELP_CMD: 'victoria.help()',
  GREETING_HELP_TAG: '→ explore',
  GREETING_MAZE_CMD: 'victoria.maze()',
  GREETING_MAZE_TAG: "→ there's always a way through",
  GREETING_CAT_CMD: 'victoria.cat()',
  GREETING_CAT_TAG: "→ she's off the clock",

  // Returned when the object is coerced to a string (e.g. `${victoria}`).
  SIGNATURE:
    'Victoria Kirichenko - R&D Leader. I build systems that scale, and teams that want to.',

  COMMANDS: [
    { command: 'victoria.readme()', what: 'how I work, what I value, how to get my best' },
    { command: 'victoria.experience', what: 'the timeline, role by role' },
    { command: 'victoria.impact()', what: 'outcomes, not adjectives' },
    { command: 'victoria.decisions()', what: 'how I make the hard calls' },
    { command: 'victoria.principles()', what: 'what I lead by' },
    { command: 'victoria.story()', what: 'how I actually got here' },
    { command: 'victoria.maze()', what: 'a tangle, solved - the way through' },
    { command: 'victoria.skills()', what: 'the tech arsenal' },
    { command: 'victoria.hire()', what: 'why we should talk' },
    { command: 'victoria.contact()', what: 'reach me directly' },
    { command: 'victoria.cat()', what: 'everything serious needs a way out' },
  ],
  HELP_RETURN: '↑ call any command, e.g. victoria.readme()',
  CAT_HINT: '// call victoria.cat() to go find her →',
  CAT_RETURN: 'off you go →',

  // A pre-rendered still of the sitting sprite (features/cat SIT_MASK filled
  // with the same glyph noise). Printed when someone reaches for victoria.cat
  // in the console. Baked, not imported, so this foundational module stays
  // free of any feature dependency.
  // The mask is stretched 1.2x horizontally before filling: DevTools ignores
  // line-height on %c styles and draws console lines at a ~2.1 cell aspect
  // (vs the page sprite's 1.75), so the extra width cancels the vertical
  // stretch. Regenerate with the same fill + a seeded RNG if the mask changes.
  CAT_ART: [
    "            ,,'              `;'",
    "              ^^;'          .o8",
    "              '  8^        :oo ^",
    "               :oss:'     .s9 5 ,^",
    "               ,,55$5,^;`;S899^ '`",
    '                 `3S88585858S.',
    "              ':`8 85S8s$Ss5S8^.",
    '              ^99 ;;99 59So9o59,',
    '           ;;;93,   `S5885589558`.',
    "       : ,,99$59 `:,55S85ss8855So'",
    "     '    S 5so839$9o8 8898 8o$oo`",
    '      :  .^S9S855585$59585S3S99S5.',
    '         ` `959S59s8 o 33 55$o8S98`',
    "        :  'S95$o9 955S8 8 S 5oo98S'",
    '            . s5399$ S98o9$8$oo 8,;                .',
    "            `38S95$3SS59 So 5955.  :^;^..'^9.^`.^;^`.",
    "           ';995S SS$so8S99$85oS ^,o8S889ss9 o55 sS58^:^",
    '            ;5o 9S9959o59 95Ss8$s oo853$55oss5958 95S8o8^^,',
    "           , 59$99o8 88$58855S5SS 995589889898So9SSSSS9$5oS';,",
    '           ;935$599SSo558o839So85S85 8 9So 995o5 sS o$588 853.:;`',
    '           `85S5883s5S$5$$89 98S8o39S8$Soo88S559s95S$9$ 9o sS9 5,`',
    "         ' 8o9S9oo8S9o89999 8558 S9985o55 $$835oS9  9S93 S5$$S598'",
    '            o58so 98  S 85o938$8598 S59 5S 8So59 SS5 s9SoS8S 85o9:',
    '         `os sSoS5558SoS98585888SS 95oS859$58o$8$9889 sso8Ss3589So',
    "        ,$89o89oo8S So598S 5o959o598o99 o898S 9S99$  988o59S   8S8S'",
    '         o8 999S99s58S9989o 5s838SSS39sS988S9 33$89o58S 89$o5S8$89 :',
    '        : 3553 59s$59 S8sS55o9s9SSS 89s85$ S85sS8o53o8883 9  S93s98.',
    "        .899S9$osS9$95885959 8$o$S58o 9 $o5 o$oS8S83 o98555$8o58995. '",
    '        ^9s88S$3o885888885539858o9 ooS39oS899o8S9 89$s$58S8$   $53s ,.',
    '         S9    98SSo$8$5S5 5555 998o 39s 5S$o55895o $S 95o83o9 93o885S:',
    "        ' S8SoS98 9885$955o 5 9S$5o5o9S8895555S9 9o9$5  S55oS3  SS8 8S,",
    '        ,95$3$ s$99 985855SS988 98o 99S8o9 985osSs598559555soS9SS5999S,',
    "        ,S5$8$58$s5S5oSo 8S s89So8SS5o855o 5S59S SS 9So88S5S9 SS9s39839                     ,'::.`,.",
    '         s8  S98$o5 5oS59S$995o3 o 5 sSo8558 S988o988 8 S5S5s8 9$s9 39:                    :$o388 8 :',
    "       `85S5s9S888Ss 953S9sSoSS3385ooSSo9559998S55o$S$9 9985SS9 S$9S$9'                  '.85o8$3$S .",
    '        `59o98S58$8 oso9589Ss9o9S   S8 o859$58S99S8$8 s588S55$5s$oS 5`;.              :;` 89s588953`',
    '        ,5 3S3 S9 ss98$888o8s9$9358S  39osoo8o9$9o983So5$9oSs58 Sos3;   .      .    ..S$898989$85 `.',
    "         `:58 S9 o8983S8859938oSSSS9 38 8599589  o 99s 58 3o9 5Sooo9$'.`^^'   ',,;.'9$89sso88$9S5;",
    '           ,.95 395589 59 o9 95$89  S998s95S 559s9S9S9os9S S8559S599os95s35: So3S89$ 9 8s589S8$95',
    '              o$895$8  3 8S8oSs958898855$89S9S8S$89oS5985S9oo93S9 s9583 S5S959953o9 88SS 9o85s3o,',
    "             `585 5so s$S9889o5S::'$88$ 5s 989S 5S8Ss55ss58$9S8S8883oos588S8593S$oS so8S$9358 S8,",
    "            ;95S5o99o3 o988$995    ;^`:;^.,9:``':^:^'S',':.;`^oo8S SosS8o899o55o$855S983 83SoS.'",
    "           ''5 98S8s9 `,s95589o5^;`     '  :`        ^      ' ;::' 8s95S39$s85S8 88 99 9S .`':",
    "             ;,^;, ;^   : ;';:`;                                .  ^:;`,.. ,;`.::.'`'`^^`   .",
  ],

  README_SECTIONS: [
    {
      h: 'What I optimize for',
      body: 'Clarity over cleverness. Momentum over the perfect plan. The decision that moves the product over the one that demos well in a design doc.',
    },
    {
      h: 'How I lead',
      body: "I don't add process - I remove noise. Give people a clear goal, real ownership, and a high bar, and they'll surprise you.",
    },
    {
      h: 'What you can expect from me',
      body: "Directness, context, and air cover. I unblock fast and I tell you the truth early - even when it's the awkward version.",
    },
    {
      h: 'What I expect from you',
      body: "Own your piece. Surface problems while they're small. Disagree with me to my face, not in the retro.",
    },
    {
      h: 'How to get my best',
      body: "Bring me the real problem, not a pre-softened one. I'd rather hear it raw and help you carry it.",
    },
    {
      h: 'Worth knowing',
      body: 'I built my career from scratch in a new country, alone and in a second language. It made me direct, hard to rattle, and allergic to wasted motion.',
    },
    {
      h: 'Your turn',
      body: 'Now tell me how you work best. The strongest teams write their READMEs both ways.',
    },
  ],
  README_RETURN: "That's the contract. Reciprocity is the point - send me yours.",

  DECISIONS: [
    'One-way doors vs. reversible: I move fast on what we can undo, and slow down only for what we genuinely can’t.',
    'Clarity beats cleverness: the solution the whole team understands usually beats the elegant one only I do.',
    'Team before architecture: when the system and the people disagree, I fix trust first. Clean code can’t outrun a team that doesn’t trust each other.',
    'Remove, then add: most "process problems" are clarity problems in a costume. I cut noise before adding a step.',
  ],
  DECISIONS_RETURN: 'Judgment over job titles.',

  IMPACT: [
    { area: 'AI workflow automation', where: 'Swish.ai', outcome: '−60% manual tasks automated' },
    {
      area: 'Team leadership',
      where: 'Swish.ai · Perion',
      outcome: '5+ QA & engineers led - offshore & onsite',
    },
    {
      area: 'Ad-tech platform',
      where: 'Perion Network',
      outcome: 'Millions of ad requests & users / day',
    },
    { area: 'Trajectory', where: '11+ years', outcome: 'Full-Stack → Team Lead → R&D Leader' },
  ],
  IMPACT_RETURN: "Numbers I'm happy to walk you through.",

  EXPERIENCE: [
    {
      role: 'R&D Team Leader',
      company: 'Zencity',
      period: 'Mar 2026 → now',
      focus: 'Just getting started - magic in progress',
    },
    {
      role: 'R&D Team Leader',
      company: 'Swish.ai',
      period: 'Apr 2024 → Oct 2025',
      focus: 'AI-driven IT workflow optimization',
    },
    {
      role: 'R&D Team Leader',
      company: 'Perion Network',
      period: 'Apr 2021 → Apr 2024',
      focus: 'Led 5; microservices + MongoDB',
    },
    {
      role: 'Full-Stack Developer',
      company: 'Perion Network',
      period: 'Jun 2018 → Apr 2021',
      focus: 'React · Next.js · Node',
    },
    {
      role: 'Full-Stack Developer',
      company: 'Mind Connect',
      period: 'Mar 2016 → Apr 2018',
      focus: 'Call-center platform',
    },
    {
      role: 'Full-Stack Developer',
      company: 'PowerTech',
      period: 'Feb 2015 → Mar 2016',
      focus: '.NET · MSSQL',
    },
    {
      role: 'Full-Stack Developer',
      company: 'Early Career',
      period: 'Dec 2012 → Jan 2015',
      focus: 'Foundations across the stack',
    },
    {
      role: 'MSc, Computer Science',
      company: 'Penza State University',
      period: '2007 → 2012',
      focus: 'Foundations',
    },
  ],
  EXPERIENCE_RETURN: 'Eleven years, one direction: up and toward the hard problems.',

  STORY: [
    'I started in Penza, Russia, and moved to a new country alone - no network, no shortcuts.',
    'I built my career from scratch, in a second language, one hard problem at a time.',
    'That’s why I lead the way I do: direct, resilient, and focused on what actually matters.',
    'I’m happiest where systems, data, and people intersect - that’s where the real problems live.',
  ],
  STORY_RETURN: 'Not despite the struggle - because of it.',

  PRINCIPLES_RETURN: 'Clarity. Safety. Accountability - in that order.',

  HIRE: [
    'Most companies hide a recruiting pitch in their console. Plot twist: here, I’m the one worth recruiting.',
    'I turn ambiguous R&D into shipped product, and I raise the bar of everyone around me.',
    'If you’re building something hard and want someone who treats the system and the team as one problem - let’s talk.',
  ],
  HIRE_HINT: '→ victoria.contact() to start the conversation',

  CONTACT_RETURN: 'I read every message. The interesting ones I answer fast.',

  MAZE_CAPTION: "WHEN THERE'S A WILL, THERE'S A WAY.",
  MAZE_RETURN: 'Every tangle has a path - my job is finding it.',
} as const;

// ASCII Art
export const ASCII_ART = `
%c╭─────────────────────────────────────────────────────────────╮
│                                                             │
│   ██╗   ██╗██╗ ██████╗████████╗ ██████╗ ██████╗ ██╗ █████╗  │
│   ██║   ██║██║██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗██║██╔══██╗ │
│   ██║   ██║██║██║        ██║   ██║   ██║██████╔╝██║███████║ │
│   ╚██╗ ██╔╝██║██║        ██║   ██║   ██║██╔══██╗██║██╔══██║ │
│    ╚████╔╝ ██║╚██████╗   ██║   ╚██████╔╝██║  ██║██║██║  ██║ │
│     ╚═══╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝ │
│                                                             │
│               R&D Team Leader | AI Innovation               │
╰─────────────────────────────────────────────────────────────╯`;

// Leadership principles, decision heuristics, and "how I lead" content live in the
// Philosophy section (and the console SDK) - About stays focused on proof + method
// so the two sections don't restate each other.

// Leadership Principles
export const LEADERSHIP_PRINCIPLES = [
  {
    title: 'Clarity',
    description: 'Clear vision, transparent communication, and defined expectations',
  },
  {
    title: 'Psychological Safety',
    description: 'Creating environments where teams feel safe to innovate and fail',
  },
  {
    title: 'Accountability',
    description: 'Empowering teams with ownership while maintaining high standards',
  },
] as const;

// About Section Content
export const ABOUT_CONTENT = {
  INTRO:
    "I lead R&D teams, and I treat the system and the people as one problem - because they are. The cleanest architecture won't save a team that doesn't trust each other.",
  PHILOSOPHY:
    "I optimize for clarity over cleverness - I'd rather ship the decision that moves the product than the one that looks good in a doc.",
  APPROACH_TITLE: 'My approach is simple:',
  SIGNATURE_KICKER: 'What shaped me',
  BACKGROUND:
    'I moved to a new country alone and built my career from scratch - that experience shaped how I lead: direct, resilient, and focused on what actually matters.',
  FOCUS: "I'm interested in complex problems where systems, data, and people intersect.",
  FOCUS_LABEL: 'Now focused on',
  IMPACT_TITLE: 'Proof, not adjectives',
} as const;

// About Section - Impact tile
// Outcomes over adjectives: each row leads with the result, then a short label.
// Company-agnostic on purpose - the proof stands on its own.
export const ABOUT_IMPACT = [
  { metric: '−60%', label: 'manual work automated' },
  { metric: '11+ yrs', label: 'engineering & leadership' },
  { metric: '5+', label: 'QA & engineers led' },
  { metric: 'Millions', label: 'requests & users daily' },
] as const;

// About Section - Approach List
// Rendered as valid-looking shell: `cmd` is the command/verb, optional `flag`
// is a long-form option, and `arg` is the quoted string operand. Read together
// ("cmd flag arg") they form the original sentence, so the ordered-list reading
// stays natural for screen readers; the quotes are decorative (aria-hidden).
export const ABOUT_APPROACH = [
  { cmd: 'understand', flag: '--deeply', arg: 'the system - technical + human' },
  { cmd: 'remove', arg: 'noise and unnecessary complexity' },
  { cmd: 'build', arg: 'environments where people perform at their best' },
] as const;

// Experience Section - rendered as a `git log --graph` of the career.
// `shape` drives the commit-graph gutter (see home.tsx): the Perion promotion
// is a real merge - the full-stack track branches off and merges into the
// leadership line. `type` is the conventional-commit verb shown before the role.
type ExperienceCommit = {
  hash: string;
  type: 'feat' | 'merge' | 'init';
  shape: 'head' | 'commit' | 'merge' | 'branch' | 'close' | 'tail';
  role: string;
  company: string;
  period: string;
  blurb: string;
  head?: boolean;
  root?: boolean;
};

export const EXPERIENCE_LOG: readonly ExperienceCommit[] = [
  {
    hash: 'a1f0c2e',
    type: 'feat',
    shape: 'head',
    head: true,
    role: 'R&D Team Leader',
    company: 'Zencity',
    period: 'Mar 2026 – present',
    blurb: 'Leading R&D as the team scales its civic-data platform.',
  },
  {
    hash: '7e3b9d4',
    type: 'feat',
    shape: 'commit',
    role: 'R&D Team Leader',
    company: 'Swish.ai',
    period: 'Apr 2024 – Oct 2025',
    blurb: 'People-first leadership of AI-driven IT workflow automation, delivered with Scrum.',
  },
  {
    hash: 'c4a07f1',
    type: 'merge',
    shape: 'merge',
    role: 'R&D Team Leader',
    company: 'Perion Network',
    period: 'Apr 2021 – Apr 2024',
    blurb: 'Promoted to lead 5 devs + QA across back-office, microservices and MongoDB.',
  },
  {
    hash: '9b21e85',
    type: 'feat',
    shape: 'branch',
    role: 'Full Stack Developer',
    company: 'Perion Network',
    period: 'Jun 2018 – Apr 2021',
    blurb: 'Built scalable React / Next.js front ends and Node / MongoDB microservices.',
  },
  {
    hash: '3d5c0aa',
    type: 'feat',
    shape: 'close',
    role: 'Full Stack Developer',
    company: 'Mind Connect',
    period: 'Mar 2016 – Apr 2018',
    blurb: 'Designed and shipped a full call-center management platform end to end.',
  },
  {
    hash: 'f08e612',
    type: 'feat',
    shape: 'commit',
    role: 'Full Stack Developer',
    company: 'PowerTech',
    period: 'Feb 2015 – Mar 2016',
    blurb: 'Built a project-management web app on .NET and Microsoft SQL Server.',
  },
  {
    hash: '2b4471c',
    type: 'feat',
    shape: 'commit',
    role: 'Full Stack Developer',
    company: 'Early career',
    period: 'Dec 2012 – Jan 2015',
    blurb: 'Foundation years building across the full stack.',
  },
  {
    hash: 'd9aa130',
    type: 'init',
    shape: 'tail',
    root: true,
    role: 'M.Sc. Computer Science',
    company: 'Penza State University',
    period: '2007 – 2012',
    blurb: 'Root commit - computer-science foundations.',
  },
];

// Testimonials Section
// Rendered as an initials-selector (see home.tsx): the initials discs act as a
// picker and a single quote shows at a time. Quotes are trimmed to their
// sharpest line; the full recommendations live on LinkedIn.
type Testimonial = {
  quote: string;
  name: string;
  title: string;
  initials: string;
};

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    quote: 'A unique ability to challenge conventional thinking and drive meaningful improvements.',
    name: 'Ofek',
    title: 'Full-Stack Engineer',
    initials: 'OF',
  },
  {
    quote: 'Strategic mindset and leadership acumen that drive innovation and achieve results.',
    name: 'Barak Maoz',
    title: 'Senior Data / Back-End Engineer',
    initials: 'BM',
  },
  {
    quote: 'A true leader - she never failed to bring value to our collaborative efforts.',
    name: 'Palie Răzvan-Mircea',
    title: 'Frontend Developer',
    initials: 'PR',
  },
  {
    quote: 'Her ability to overcome challenges with a smile made her a cut above the rest.',
    name: 'Chirieac Lăcrămioara',
    title: 'QA Engineer',
    initials: 'CL',
  },
];

// Projects (the ⌘K palette results). The featured entry gets the active row
// treatment + the "Acquired by Perion" outcome chip.
type Project = {
  group?: string;
  featured?: boolean;
  title: string;
  company: string;
  description: string;
  tags: readonly string[];
};

export const PROJECTS_PALETTE = {
  ARIA_LABEL: 'Search projects',
  PLACEHOLDER: 'search projects',
  EMPTY: 'no matches for',
  EMPTY_HINT: 'try "microservices" or "AI"',
} as const;

export const PROJECTS: readonly Project[] = [
  {
    group: 'Featured',
    featured: true,
    title: 'Content Arbitrage Platform',
    company: 'CIQ/Perion',
    description:
      'Part of the team that rebuilt a legacy monolith into a scalable microservices architecture handling millions of requests daily - work that led to the startup’s acquisition by Perion.',
    tags: ['Microservices', 'AdTech', 'Scale'],
  },
  {
    group: 'More',
    title: 'AI Workflow Optimizer',
    company: 'Swish.ai',
    description:
      'Led development of AI-driven automation platform that optimizes IT workflows, reducing manual tasks by 60% and improving team efficiency across multiple departments.',
    tags: ['AI/ML', 'Automation', 'Workflow'],
  },
  {
    title: 'Internal Productivity Tools',
    company: 'Multiple Organizations',
    description:
      'Designed and implemented custom productivity tools that streamlined development workflows, improved team collaboration, and enhanced project management across R&D teams.',
    tags: ['Tools', 'Productivity', 'Collaboration'],
  },
];

// Contact Section Content - an unlabeled stack of two self-describing mono
// links (see contact.tsx): the email copies on click with a quiet mono
// confirmation, LinkedIn opens. No keys, no location row - "in Tel Aviv"
// already lives in the footer colophon, where ambient facts belong.
export const CONTACT_CONTENT = {
  TITLE: 'Get In Touch',
  INTRO: "I like hard problems and the people who solve them well. Let's talk.",
  COPY_HINT: 'copy',
  COPIED_HINT: 'copied',
  LINKEDIN_HINT: 'linkedin ↗',
} as const;

// Copyright
const CURRENT_YEAR = new Date().getFullYear();
export const COPYRIGHT = {
  YEAR: String(CURRENT_YEAR),
  TEXT: `© ${CURRENT_YEAR} ${PERSONAL_INFO.NAME}. All rights reserved.`,
  SHORT: `© ${CURRENT_YEAR} ${PERSONAL_INFO.NAME}`,
} as const;

// Footer colophon - the site signed like the last page of a book. The clock is
// the page's one ambient dynamic detail; everything else stays still.
export const COLOPHON = {
  TIME_ZONE: 'Asia/Jerusalem',
  TIME_SUFFIX: 'in Tel Aviv',
  TYPE_CREDIT: 'set in Newsreader & Space Mono',
  HUMANS_LABEL: 'humans.txt',
  HUMANS_HREF: '/humans.txt',
  DIVIDER: '·',
} as const;

// Print resume - Cmd+P re-typesets the page as a one-page document (see
// features/print-resume). Labels only; the content comes from EXPERIENCE_LOG,
// ABOUT_IMPACT, and PERSONAL_INFO so print can never drift from the page.
export const PRINT_RESUME = {
  SITE_DISPLAY: 'victoriakirichenko.com',
  LOCATION_SHORT: 'Tel Aviv, Israel',
  EXPERIENCE_LABEL: 'experience',
  PROOF_LABEL: 'proof, not adjectives',
  FOOTNOTE:
    'Printed from victoriakirichenko.com - the interactive version has the rest of the story.',
} as const;

// Scroll Behavior
export const SCROLL_BEHAVIOR = {
  SMOOTH: 'smooth' as const,
  BLOCK_START: 'start' as const,
} as const;

// Aria Labels
export const ARIA_LABELS = {
  TOGGLE_MOBILE_MENU: 'Toggle mobile menu',
} as const;
