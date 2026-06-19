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
  PHILOSOPHY_QUOTE_REST: " Give people a clear goal, real ownership, and a high bar, and they'll surprise you.",
  FOOTER_QUOTE: 'Not despite the struggle, but because of it. The hard problems are the ones that taught me everything.',
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
  ABOUT_EXPERIENCE: "   • 11+ years in tech (Full Stack → Team Lead → R&D Leader)",
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
  SKILLS_TITLE: "🚀 Victoria's Tech Arsenal:",
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
  GREETING_TITLE: '👋 You found the console - good instinct.',
  GREETING_BODY:
    "This is `victoria`: a tiny SDK about how I build and lead. Same thing I do in real systems - make the parts that matter easy to find.",
  GREETING_HINT_PREFIX: 'Run ',
  GREETING_HINT_CMD: 'victoria.help()',
  GREETING_HINT_SUFFIX: ' to explore - or just expand the object below.',

  // Returned when the object is coerced to a string (e.g. `${victoria}`).
  SIGNATURE: 'Victoria Kirichenko - R&D Leader. I build systems that scale, and teams that want to.',

  HELP_TITLE: '🗂  victoria.* - call any of these:',
  COMMANDS: [
    { command: 'victoria.readme()', what: 'how I work, what I value, how to get my best' },
    { command: 'victoria.experience', what: 'the timeline, as data you can expand' },
    { command: 'victoria.impact()', what: 'outcomes, not adjectives' },
    { command: 'victoria.decisions()', what: 'how I make the hard calls' },
    { command: 'victoria.principles()', what: 'what I lead by' },
    { command: 'victoria.story()', what: 'how I actually got here' },
    { command: 'victoria.skills()', what: 'the tech arsenal' },
    { command: 'victoria.hire()', what: 'why we should talk' },
    { command: 'victoria.contact()', what: 'reach me directly' },
  ],
  HELP_RETURN: '↑ call any command, e.g. victoria.readme()',

  README_TITLE: '📄 README - working with Victoria',
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

  DECISIONS_TITLE: '🧭 How I make the hard calls',
  DECISIONS: [
    'One-way doors vs. reversible: I move fast on what we can undo, and slow down only for what we genuinely can’t.',
    'Clarity beats cleverness: the solution the whole team understands usually beats the elegant one only I do.',
    'Team before architecture: when the system and the people disagree, I fix trust first. Clean code can’t outrun a team that doesn’t trust each other.',
    'Remove, then add: most "process problems" are clarity problems in a costume. I cut noise before adding a step.',
  ],
  DECISIONS_RETURN: 'Judgment over job titles.',

  IMPACT_TITLE: '📈 Outcomes, not adjectives',
  IMPACT: [
    { area: 'AI workflow automation', where: 'Swish.ai', outcome: '−60% manual tasks automated' },
    { area: 'Team leadership', where: 'Swish.ai · Perion', outcome: '5+ QA engineers led - offshore & onsite' },
    { area: 'Ad-tech platform', where: 'Perion Network', outcome: 'Millions of ad requests & users / day' },
    { area: 'Trajectory', where: '11+ years', outcome: 'Full-Stack → Team Lead → R&D Leader' },
  ],
  IMPACT_RETURN: "Numbers I'm happy to walk you through.",

  EXPERIENCE_TITLE: '🗓  Experience - the timeline',
  EXPERIENCE: [
    { role: 'R&D Team Leader', company: 'Zencity', period: 'Mar 2026 → now', focus: 'Just getting started - magic in progress' },
    { role: 'R&D Team Leader', company: 'Swish.ai', period: 'Apr 2024 → Oct 2025', focus: 'AI-driven IT workflow optimization' },
    { role: 'R&D Team Leader', company: 'Perion Network', period: 'Apr 2021 → Apr 2024', focus: 'Led 5; microservices + MongoDB' },
    { role: 'Full-Stack Developer', company: 'Perion Network', period: 'Jun 2018 → Apr 2021', focus: 'React · Next.js · Node' },
    { role: 'Full-Stack Developer', company: 'Mind Connect', period: 'Mar 2016 → Apr 2018', focus: 'Call-center platform' },
    { role: 'Full-Stack Developer', company: 'PowerTech', period: 'Feb 2015 → Mar 2016', focus: '.NET · MSSQL' },
    { role: 'Full-Stack Developer', company: 'Early Career', period: 'Dec 2012 → Jan 2015', focus: 'Foundations across the stack' },
    { role: 'MSc, Computer Science', company: 'Penza State University', period: '2007 → 2012', focus: 'Foundations' },
  ],

  STORY_TITLE: '🌍 How I actually got here',
  STORY: [
    'I started in Penza, Russia, and moved to a new country alone - no network, no shortcuts.',
    'I built my career from scratch, in a second language, one hard problem at a time.',
    'That’s why I lead the way I do: direct, resilient, and focused on what actually matters.',
    'I’m happiest where systems, data, and people intersect - that’s where the real problems live.',
  ],
  STORY_RETURN: 'Not despite the struggle - because of it.',

  PRINCIPLES_TITLE: '⚖️  What I lead by',
  PRINCIPLES_RETURN: 'Clarity. Safety. Accountability - in that order.',

  HIRE_TITLE: '🤝 Why we should talk',
  HIRE: [
    'Most companies hide a recruiting pitch in their console. Plot twist: here, I’m the one worth recruiting.',
    'I turn ambiguous R&D into shipped product, and I raise the bar of everyone around me.',
    'If you’re building something hard and want someone who treats the system and the team as one problem - let’s talk.',
  ],
  HIRE_HINT: '→ victoria.contact() to start the conversation',

  CONTACT_TITLE: '📬 Reach me directly',
  CONTACT_RETURN: 'I read every message. The interesting ones I answer fast.',
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
  INTRO: "I lead R&D teams, and I treat the system and the people as one problem - because they are. The cleanest architecture won't save a team that doesn't trust each other.",
  PHILOSOPHY: "I optimize for clarity over cleverness - I'd rather ship the decision that moves the product than the one that looks good in a doc.",
  APPROACH_TITLE: 'My approach is simple:',
  SIGNATURE_KICKER: 'What shaped me',
  BACKGROUND: 'I moved to a new country alone and built my career from scratch - that experience shaped how I lead: direct, resilient, and focused on what actually matters.',
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
    hash: 'a1f0c2e', type: 'feat', shape: 'head', head: true,
    role: 'R&D Team Leader', company: 'Zencity', period: 'Mar 2026 - present',
    blurb: 'Leading R&D as the team scales its civic-data platform.',
  },
  {
    hash: '7e3b9d4', type: 'feat', shape: 'commit',
    role: 'R&D Team Leader', company: 'Swish.ai', period: 'Apr 2024 - Oct 2025',
    blurb: 'People-first leadership of AI-driven IT workflow automation, delivered with Scrum.',
  },
  {
    hash: 'c4a07f1', type: 'merge', shape: 'merge',
    role: 'R&D Team Leader', company: 'Perion Network', period: 'Apr 2021 - Apr 2024',
    blurb: 'Promoted to lead 5 devs + QA across back-office, microservices and MongoDB.',
  },
  {
    hash: '9b21e85', type: 'feat', shape: 'branch',
    role: 'Full Stack Developer', company: 'Perion Network', period: 'Jun 2018 - Apr 2021',
    blurb: 'Built scalable React / Next.js front ends and Node / MongoDB microservices.',
  },
  {
    hash: '3d5c0aa', type: 'feat', shape: 'close',
    role: 'Full Stack Developer', company: 'Mind Connect', period: 'Mar 2016 - Apr 2018',
    blurb: 'Designed and shipped a full call-center management platform end to end.',
  },
  {
    hash: 'f08e612', type: 'feat', shape: 'commit',
    role: 'Full Stack Developer', company: 'PowerTech', period: 'Feb 2015 - Mar 2016',
    blurb: 'Built a project-management web app on .NET and Microsoft SQL Server.',
  },
  {
    hash: '2b4471c', type: 'feat', shape: 'commit',
    role: 'Full Stack Developer', company: 'Early career', period: 'Dec 2012 - Jan 2015',
    blurb: 'Foundation years building across the full stack.',
  },
  {
    hash: 'd9aa130', type: 'init', shape: 'tail', root: true,
    role: 'M.Sc. Computer Science', company: 'Penza State University', period: '2007 - 2012',
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
  PARTICLE_SYSTEM: 'true',
} as const;
