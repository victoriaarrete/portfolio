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
  LINKEDIN_DISPLAY: 'linkedin.com/in/victoria-kirichenko',
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
    '           .,           .`.',
    "            ^..        '99'",
    '            ;5S.       `oS;',
    "             :88^,  , ' 938.",
    '             .$9oS^`..o5 :;.',
    '              ;53$$59$5 ;',
    '            :`99S3sS8385o`^',
    "            :9 ;, 5o9o885s'",
    "      .  ^ :8' ` ^$S$589989",
    '      ;`;58SS9:;;3  S8S5388',
    '    .   ^ 5S$58 59 98995989;',
    "     '  `S8S85835  5838oo8 ;",
    '          $5959S$95S9soo859 :',
    '         ^88$os8 o 8$$ 988s58.',
    "           83s8398S333S58o9o'       .    .",
    "          `55osS9599 5S888$^ . ^;.`;o,:`:,'",
    '          `$ o95o$8ooS 9o9ss.88s 8s 59 S55$9  `',
    '           38  89598598s   5S9osSo3o5o s  o8$ $,`',
    '         `o5998S95S  8$98S 58soo855S$898$o5SS95 3 :',
    "         's 9$ 99959 98$8o898935 88 9$o93 58559 o$o'",
    '         `  SoooSSS55o$$8os9955$8599$99S88S95o3o58585',
    '        : 9o59$5  5s89o9S9 oo5S88o399S85S8o989o89o5S88`',
    '        `885S9S58S o 958s 8s S59$98855s98s8 S9S88o 8s9.',
    '          o8$39SS5oo955ooo sS9S5  858S9939$ 8$8$So5388o^',
    '       ^$89S5588888953 8S88S889$395SS$S53S8 8599s39593o$^',
    '       ,59oss98S33os$S5Ss5S585S3 55 8 885 9$oso5 5o595s8;',
    '       ;5$89598898539 $9o853os8So 59 99S  $3 o8so5S95 95^',
    '        98S989 89538598oSo85o98S58555S88SSo9S3$ 8S8S985 ;',
    '       `sS$SSS8$$o8598S$93o$8ooo855oS598o55$So33SS9859$93;',
    "       '$5S9  998583 99s$S$55os S $898osS8 8so5 59595558o9'",
    '       ;oss98555$  8s8S9$589 5999599 8 88 5os55o83s338so8 .',
    "       ^8 99S555   5o55s8853 98o959o 98855$9o885S9 588989 '",
    '       ,S5$998S99$9 888  SS$SoSS$ 3395o5$88353o588  585  58`                  `;^^^',
    "       ' s55 o5So9 98$58oo 55855935o885SS$585$8o 88S o9o 8^                 :oS39S",
    "     ,;8 S5$88885s8 5o$53S53 9395S995 o 88 oS8933s958 o S9'             . ;^S9S$Soo'",
    '       .85999oS8so39o983S$8 889o3$ S5893s95 35$o538SoS998S`             `:$o5$8s85,',
    '        95 5$ sS555o85$s989 $5S8853 988 83os83S953899S89 ,            .;55595539oS:',
    "        `o$ 95o59$585So89 58S588o$89S9$93588o889599593  S9;.'`. .:;^.,5$S8S838895;",
    "         ',S5855$58S85S o958$8s $95 9SoS9 So5935835o5S53S3385s9.s989 99S8 5S5S$So;",
    '         ,.^s35985S5o S9o99395s$ 89s95oo5S39$o85595S9$8 oo$9s3555o885993SS9s5o8s.',
    "          .:858 s 95858s9 5'.$5o38S3S$585598 99o5o58Sos9o99555$S9958o 55SS989998.",
    "          .5$S8885S58985S5:  '``;,, 9^.,,`.'s'`:.:',o 9$8$85 s3S9o5835S99898os ;",
    '         ^.9885S9  .5S98o5 ,   .    ,       ^       ;,.^oo8 8 98o$98 9o98 ^::`',
    "           ',;,;^:   .,:` `                             ,;;;,^,';' .:^'.,",
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
  { metric: '−60%', label: 'automated' },
  { metric: '11+ yrs', label: 'eng & lead' },
  { metric: '5+ QA', label: 'engineers led' },
  { metric: 'Millions', label: 'req & users / day' },
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
// is a real merge — the full-stack track branches off and merges into the
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
    period: 'Mar 2026 - present',
    blurb: 'Leading R&D as the team scales its civic-data platform.',
  },
  {
    hash: '7e3b9d4',
    type: 'feat',
    shape: 'commit',
    role: 'R&D Team Leader',
    company: 'Swish.ai',
    period: 'Apr 2024 - Oct 2025',
    blurb: 'People-first leadership of AI-driven IT workflow automation, delivered with Scrum.',
  },
  {
    hash: 'c4a07f1',
    type: 'merge',
    shape: 'merge',
    role: 'R&D Team Leader',
    company: 'Perion Network',
    period: 'Apr 2021 - Apr 2024',
    blurb: 'Promoted to lead 5 devs + QA across back-office, microservices and MongoDB.',
  },
  {
    hash: '9b21e85',
    type: 'feat',
    shape: 'branch',
    role: 'Full Stack Developer',
    company: 'Perion Network',
    period: 'Jun 2018 - Apr 2021',
    blurb: 'Built scalable React / Next.js front ends and Node / MongoDB microservices.',
  },
  {
    hash: '3d5c0aa',
    type: 'feat',
    shape: 'close',
    role: 'Full Stack Developer',
    company: 'Mind Connect',
    period: 'Mar 2016 - Apr 2018',
    blurb: 'Designed and shipped a full call-center management platform end to end.',
  },
  {
    hash: 'f08e612',
    type: 'feat',
    shape: 'commit',
    role: 'Full Stack Developer',
    company: 'PowerTech',
    period: 'Feb 2015 - Mar 2016',
    blurb: 'Built a project-management web app on .NET and Microsoft SQL Server.',
  },
  {
    hash: '2b4471c',
    type: 'feat',
    shape: 'commit',
    role: 'Full Stack Developer',
    company: 'Early career',
    period: 'Dec 2012 - Jan 2015',
    blurb: 'Foundation years building across the full stack.',
  },
  {
    hash: 'd9aa130',
    type: 'init',
    shape: 'tail',
    root: true,
    role: 'M.Sc. Computer Science',
    company: 'Penza State University',
    period: '2007 - 2012',
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
      'Part of the team that rebuilt a legacy monolith into a scalable microservices architecture handling millions of requests daily — work that led to the startup’s acquisition by Perion.',
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
