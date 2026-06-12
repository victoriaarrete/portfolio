/**
 * String constants for repeated text, URLs, and content
 */

// Personal Information
export const PERSONAL_INFO = {
  NAME: 'Victoria Kirichenko',
  FIRST_NAME: 'Victoria',
  LAST_NAME: 'Kirichenko',
  EMAIL: 'victoria.arrete@gmail.com',
  LINKEDIN_URL: 'https://www.linkedin.com/in/victoria-kirichenko/',
  LINKEDIN_DISPLAY: 'linkedin.com/in/victoria-kirichenko',
  LOCATION: 'Tel Aviv District, Israel',
  INITIALS: 'VK',
} as const;

// Job Titles & Roles
export const ROLES = {
  PRIMARY: 'R&D Team Leader',
  SUBTITLE: 'Strategic Engineering Leader',
  FULL_SUBTITLE: 'R&D Team Leader | Strategic Engineering Leader',
  LIST: ['R&D Team Leader', 'Strategic Engineering Leader'],
} as const;

// Taglines & Quotes
export const TAGLINES = {
  PRIMARY: 'I build systems that scale — and teams that want to.',
  HERO: 'I build systems that scale — and teams that want to.',
  ABOUT_TITLE: 'Strong code needs strong culture. I build both.',
  PHILOSOPHY_QUOTE: "I don't lead by adding process — I lead by removing noise. Give people a clear goal, real ownership, and a high bar, and they'll surprise you.",
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
  EXPERIENCE_ACCENT: 'Timeline',
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
  ABOUT_EXPERIENCE: "   • 10+ years in tech (Full Stack → Team Lead → R&D Leader)",
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

// Console SDK — the interactive `window.victoria` developer experience.
// Content lives here (the repo centralizes strings); rendering lives in lib/console-signature.ts.
export const CONSOLE_SDK = {
  GREETING_TITLE: '👋 You found the console — good instinct.',
  GREETING_BODY:
    "This is `victoria`: a tiny SDK about how I build and lead. Same thing I do in real systems — make the parts that matter easy to find.",
  GREETING_HINT_PREFIX: 'Run ',
  GREETING_HINT_CMD: 'victoria.help()',
  GREETING_HINT_SUFFIX: ' to explore — or just expand the object below.',

  // Returned when the object is coerced to a string (e.g. `${victoria}`).
  SIGNATURE: 'Victoria Kirichenko — R&D Team Leader. I build systems that scale, and teams that want to.',

  HELP_TITLE: '🗂  victoria.* — call any of these:',
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

  README_TITLE: '📄 README — working with Victoria',
  README_SECTIONS: [
    {
      h: 'What I optimize for',
      body: 'Clarity over cleverness. Momentum over the perfect plan. The decision that moves the product over the one that demos well in a design doc.',
    },
    {
      h: 'How I lead',
      body: "I don't add process — I remove noise. Give people a clear goal, real ownership, and a high bar, and they'll surprise you.",
    },
    {
      h: 'What you can expect from me',
      body: "Directness, context, and air cover. I unblock fast and I tell you the truth early — even when it's the awkward version.",
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
  README_RETURN: "That's the contract. Reciprocity is the point — send me yours.",

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
    { area: 'AI workflow automation', where: 'Swish.ai', outcome: '−60% manual tasks' },
    { area: 'Team leadership', where: 'Swish.ai · Perion', outcome: 'Led 5 eng + QA via Scrum' },
    { area: 'Ad-tech platform', where: 'Perion Network', outcome: 'Millions of requests / day' },
    { area: 'Trajectory', where: '10+ years', outcome: 'Full-Stack → Team Lead → R&D Leader' },
  ],
  IMPACT_RETURN: "Numbers I'm happy to walk you through.",

  EXPERIENCE_TITLE: '🗓  Experience — the timeline',
  EXPERIENCE: [
    { role: 'R&D Team Leader', company: 'Swish.ai', period: '2024 → now', focus: 'AI-driven IT workflow optimization' },
    { role: 'R&D Team Leader', company: 'Perion Network', period: '2021 → 2024', focus: 'Led 5; microservices + MongoDB' },
    { role: 'Full-Stack Developer', company: 'Perion Network', period: '2018 → 2021', focus: 'React · Next.js · Node' },
    { role: 'Full-Stack Developer', company: 'Mind Connect', period: '2016 → 2018', focus: 'Call-center platform' },
    { role: 'Full-Stack Developer', company: 'PowerTech', period: '2015 → 2016', focus: '.NET · MSSQL' },
    { role: 'MSc, Computer Science', company: 'Penza State University', period: '2007 → 2012', focus: 'Foundations' },
  ],

  STORY_TITLE: '🌍 How I actually got here',
  STORY: [
    'I started in Penza, Russia, and moved to a new country alone — no network, no shortcuts.',
    'I built my career from scratch, in a second language, one hard problem at a time.',
    'That’s why I lead the way I do: direct, resilient, and focused on what actually matters.',
    'I’m happiest where systems, data, and people intersect — that’s where the real problems live.',
  ],
  STORY_RETURN: 'Not despite the struggle — because of it.',

  PRINCIPLES_TITLE: '⚖️  What I lead by',
  PRINCIPLES_RETURN: 'Clarity. Safety. Accountability — in that order.',

  HIRE_TITLE: '🤝 Why we should talk',
  HIRE: [
    'Most companies hide a recruiting pitch in their console. Plot twist: here, I’m the one worth recruiting.',
    'I turn ambiguous R&D into shipped product, and I raise the bar of everyone around me.',
    'If you’re building something hard and want someone who treats the system and the team as one problem — let’s talk.',
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

// Core Strengths
export const CORE_STRENGTHS = [
  'Emotional Intelligence & System Thinking',
  'Team Optimization & Scaling Products',
  'Executive-Level Communication',
  'AI-Driven Innovation & Automation',
] as const;

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
  INTRO: "I lead R&D teams, and I treat the system and the people as one problem — because they are. The cleanest architecture won't save a team that doesn't trust each other, and a great team can't outrun tech debt forever.",
  PHILOSOPHY: "I optimize for clarity over cleverness. I'd rather ship the decision that moves the product than the one that looks impressive in a design doc — and I want everyone on the team to know what they own and why it matters.",
  APPROACH_TITLE: 'My approach is simple:',
  SIGNATURE_KICKER: 'What shaped me',
  BACKGROUND: 'I moved to a new country alone and built my career from scratch — that experience shaped how I lead: direct, resilient, and focused on what actually matters.',
  FOCUS: "I'm interested in complex problems where systems, data, and people intersect.",
  FOCUS_LABEL: 'Now focused on',
  STRENGTHS_TITLE: 'Core Strengths',
  IMPACT_TITLE: 'Proof, not adjectives',
} as const;

// About Section - Impact tile
// Outcomes over adjectives: each row leads with the result, then a short label.
// Company-agnostic on purpose — the proof stands on its own.
export const ABOUT_IMPACT = [
  { metric: '−60%', label: 'manual tasks automated' },
  { metric: '11+ yrs', label: 'engineering & leadership' },
  { metric: '5+ QA', label: 'engineers led — offshore & onsite' },
  { metric: 'Millions', label: 'ad requests & users reached / day' },
] as const;

// About Section - Approach List
// Rendered as a shell script: `cmd` is the highlighted command/verb, `args`
// the rest of the line. Read together ("cmd args") they form the original
// sentence, so the ordered-list reading stays natural for screen readers.
export const ABOUT_APPROACH = [
  { cmd: 'understand', args: 'the system deeply (technical + human)' },
  { cmd: 'remove', args: 'noise and unnecessary complexity' },
  { cmd: 'build', args: 'environments where people can perform at their best' },
] as const;

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
