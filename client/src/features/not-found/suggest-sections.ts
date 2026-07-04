/**
 * Recovery suggestions for the 404 page: match the broken path's words against
 * the real sections (plus the slugs people - and AI assistants - tend to guess)
 * and rank the closest ones as "did you mean" exits.
 */
import { NAV_ITEMS } from '@/shared/constants/strings';

export type SectionSuggestion = {
  id: (typeof NAV_ITEMS)[number]['id'];
  label: string;
};

// Plausible slugs → real section ids. Keys are what a visitor might type or an
// AI might invent; values are the sections that actually answer that intent.
const SECTION_ALIASES: Record<string, SectionSuggestion['id']> = {
  about: 'about',
  me: 'about',
  bio: 'about',
  story: 'about',
  experience: 'experience',
  resume: 'experience',
  cv: 'experience',
  career: 'experience',
  history: 'experience',
  philosophy: 'philosophy',
  leadership: 'philosophy',
  values: 'philosophy',
  principles: 'philosophy',
  projects: 'projects',
  work: 'projects',
  portfolio: 'projects',
  cases: 'projects',
  testimonials: 'testimonials',
  references: 'testimonials',
  recommendations: 'testimonials',
  contact: 'contact',
  hire: 'contact',
  email: 'contact',
  talk: 'contact',
};

function levenshtein(a: string, b: string): number {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const next = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = prev[j];
      prev[j] = next;
    }
  }
  return prev[b.length];
}

/** Words a path is made of: "/my-work/2024" → ["my", "work", "2024"]. */
function pathWords(pathname: string): string[] {
  return pathname
    .toLowerCase()
    .split(/[/\-_.]+/)
    .filter(Boolean);
}

export function suggestSections(pathname: string, max = 2): SectionSuggestion[] {
  const words = pathWords(pathname);
  if (words.length === 0) return [];

  const best = new Map<SectionSuggestion['id'], number>();
  for (const [alias, id] of Object.entries(SECTION_ALIASES)) {
    // Tiny aliases must match exactly (fuzzy "me" would swallow "my", "be"…);
    // short ones forgive one slip; longer ones forgive two.
    const tolerance = alias.length <= 3 ? 0 : alias.length >= 6 ? 2 : 1;
    const distance = Math.min(...words.map((word) => levenshtein(word, alias)));
    if (distance > tolerance) continue;
    const prior = best.get(id);
    if (prior == null || distance < prior) best.set(id, distance);
  }

  return Array.from(best.entries())
    .sort((a, b) => a[1] - b[1])
    .slice(0, max)
    .map(([id]) => ({ id, label: NAV_ITEMS.find((item) => item.id === id)?.label ?? id }));
}

/**
 * A multi-segment or long compound slug reads like a URL an AI assistant
 * invented (they hallucinate deep links, not typos). Only meaningful when
 * nothing fuzzy-matched - a near-miss is just a typo.
 */
export function looksAiInvented(pathname: string): boolean {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length >= 2) return true;
  return (segments[0]?.split(/[-_]/).length ?? 0) >= 3;
}
