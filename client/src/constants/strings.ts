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
  SUBTITLE: 'Strategic Engineering Leader | AI-Driven Innovator',
  FULL_SUBTITLE: 'R&D Team Leader | Strategic Engineering Leader | AI-Driven Innovator',
} as const;

// Taglines & Quotes
export const TAGLINES = {
  PRIMARY: 'Engineering clarity. Leading with precision.',
  HERO: '"Engineering clarity. Leading with precision."',
  ABOUT_TITLE: 'Strong code needs strong culture. I build both.',
  PHILOSOPHY_QUOTE: 'I believe in clarity, feedback culture, and psychological safety with accountability. Teams thrive when they feel trusted, supported, and empowered to take bold decisions.',
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
  INTRO: "I'm an R&D Leader, passionate about combining innovation with people-focused leadership. I believe teams thrive in a culture of trust, clarity, and support, and I work hard to balance technical results with emotional well-being.",
  JOURNEY: 'Having moved to a new country alone, I built my career on resilience and bold decision-making. At Swish.AI, I lead talented teams to create smarter, more efficient IT workflows with AI, always focusing on delivering real impact.',
  BACKGROUND: "Before this, I worked at Perion Network, where I led teams and developed projects for the content arbitrage market. I also hold a Master's degree in Computer Science, which has fueled my passion for solving problems and empowering teams to grow.",
  STRENGTHS_TITLE: 'Core Strengths',
} as const;

// Contact Section Content
export const CONTACT_CONTENT = {
  TITLE: 'Get In Touch',
  INTRO: "Ready to discuss AI-driven innovation, team leadership, or potential collaboration opportunities? I'd love to connect and explore how we can work together.",
  EMAIL_LABEL: 'Email',
  LINKEDIN_LABEL: 'LinkedIn',
  LOCATION_LABEL: 'Location',
} as const;

// Copyright
export const COPYRIGHT = {
  YEAR: '2025',
  TEXT: '© 2025 Victoria Kirichenko. All rights reserved.',
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
