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
  GREETING_CAT_CMD: 'victoria.cat',
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
  CAT_ART: [
    "          ,,'           ;`;",
    "            .^^        '9s^",
    '            ` 8        .59^',
    "             ' s,:    ,sSss.",
    '             .9 5 ,^^`5S9^,,',
    '              ;8389 9988,',
    "            '` 888338o8sS,'",
    '            ^9^`;S8s$Ss5S8^',
    '         `^` `   ,5 9 59So9`',
    '      ,  59$55  ^598 99$85o,',
    '    .   ;89S8s5 9$59 5 ooo9.',
    "     `  `s5585 $8o5 S 5so83;'",
    '         :o8 8898 8o$oooS8o .,',
    '       , `55585$59585S3S99S5S^`',
    "          , 59S59s8 o 33 55$,       :'",
    "           98o 5$o9 955S8 8  . `;^^'  ^.,' ;",
    "         ',5399$ S98o9$8$oo ^S8oo9SS 83995$S``^",
    '          ,59 So 5955S9oo8o5855o88895995S SS$so^:',
    '         :9$85oS o$9sS9Soo855o9sS58so995o 9S9959o^; ,',
    '         ;5Ss8$s oo853$55oss5958 95S8o8oS5959$99o8 .`',
    '         ;S935555o38S5S858S5 835953o99933 $5oS59o$9S8',
    '         3 9SSo558o839So85S85 8 9So 995o5 sS o$588 853.',
    '        ;S5595SSsoSS88533$o58958$9$3 3o$5o83$5o s95S$9.',
    '       .:o sS9 59SSSS95SS9 93 o89999 8558 S9985o55 $$83`',
    '       ^S9  9S93 S5$$S598S   o58so 98  S 85o938$8598 S59',
    '       ,S 8So59 SS5 s9SoS8S 85o9$8os sSoS5558SoS98585888;',
    "       :89S83$5955538$oS8S9sso8Ss3589So 9855 o89oo8S So5'",
    "       '998s 89 o598o99 o898S 9S99$  988o59S   8S8S8 o8 ;",
    '       :9S99s58S9989o 5s838SSS39sS988S9 33$89o58S 89$o5S8:',
    '       `9 S93553 59s$59 S8sS55o9s9SSS 89s85$ S85sS8o53o888,',
    '        9  S93s9888o$So$o$o 989995s8 59 8$o$S58o 9 $o5 o$o.',
    '       ,s8$8s5S3S5 9SS$39 55 S5 s88S$3o885888885539858o9 o`',
    "       :oS899o8S9 89$s$58S8$   $53s 5S S9    98SSo$8$5S5 55^                 ` ,'",
    "       .939s 5S$o55895o $S 95o83o9 93o885SS9S8SoS98 9885$9,                 '95 9S$,",
    "      ,588 S8895555S9 9o9$5  S55oS3  SS8 8S88855$9s$99 985'               ';SS988 9:",
    '       `8$58959985osSs598559555soS9SS5999So955988o9589598S^             ;`98S s89S,',
    '       .SS5o855o 5S59S SS 9So88S5S9 SS9s39839 o39 S58589 :            ^.9o8S5$ 85 ;',
    "        `8s895 sSo8558 S988o988 8 S5S5s8 9$s9 39$9 $o388 8 :;;` ;'^^,. 889S958SsS,",
    "         ,.SoSS3385ooSSo9559998S55o$S$9 9985SS9 S$9S$9$8$S55o5$`o9$55So9 98S95S98'",
    '            589Ss9o9S   S8 o859$58S99S8$8 s588S55$5s$oS 5855 895S85538S8So93S3 S:',
    '          ..s98$888o8s9$935;.9 39osoo8o9$9o983So5$9oSs58 Sos39939S88S$898989$85 `',
    "          '5 58 S9 o8983S8'  `' :'.;$`,;..:;9^. :.,^99589  o 99s 58 3o9 5Sooo9:;",
    "         .,5855s39:.95$ssS9'`       ;       ,   .   ,':`o885s9o9 95$89  S9.;'^",
    "           :,. ^.,   `.:;,:                             :,. ;:;.'`',';`^.:",
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
      outcome: '5+ QA engineers led - offshore & onsite',
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
  { metric: '5+', label: 'QA engineers led' },
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

// Contact Section Content
export const CONTACT_CONTENT = {
  TITLE: 'Get In Touch',
  INTRO: "I like hard problems and the people who solve them well. Let's talk.",
  EMAIL_LABEL: 'Email',
  LINKEDIN_LABEL: 'LinkedIn',
  LOCATION_LABEL: 'Location',
} as const;

// Copyright
const CURRENT_YEAR = new Date().getFullYear();
export const COPYRIGHT = {
  YEAR: String(CURRENT_YEAR),
  TEXT: `© ${CURRENT_YEAR} ${PERSONAL_INFO.NAME}. All rights reserved.`,
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
