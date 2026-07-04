import { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollReveal } from '@/shared/components/scroll-reveal/scroll-reveal';
import { ANIMATION_DELAY } from '@/shared/constants/layout';
import {
  SECTION_TITLES,
  NAV_SECTIONS,
  PROJECTS,
  PROJECTS_PALETTE,
} from '@/shared/constants/strings';
import { SectionTitle } from '@/shared/components/section-title/section-title';
import styles from '@/pages/home/home.module.css';

export function Projects() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selectedTitle, setSelectedTitle] = useState<string | undefined>(
    () => PROJECTS.find((project) => project.featured)?.title ?? PROJECTS[0]?.title,
  );

  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) return PROJECTS;
    // Match on word prefixes so "ai" finds "AI/ML" but not "daily"
    const terms = normalizedQuery.split(/\s+/);
    return PROJECTS.filter((project) => {
      const words = [project.title, project.company, project.description, ...project.tags]
        .join(' ')
        .toLowerCase()
        .split(/[^a-z0-9]+/);
      return terms.every((term) => words.some((word) => word.startsWith(term)));
    });
  }, [normalizedQuery]);

  // Highlight the arrowed/clicked row, falling back to the top result when
  // filtering drops the selection out of view
  const activeTitle = results.some((project) => project.title === selectedTitle)
    ? selectedTitle
    : results[0]?.title;

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        // Focus alone doesn't scroll here (the page wrapper clips overflow),
        // so bring the palette into view explicitly
        inputRef.current?.focus({ preventScroll: true });
        inputRef.current?.scrollIntoView({ block: 'center' });
      }
    };
    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (results.length === 0) return;
      const currentIndex = results.findIndex((project) => project.title === activeTitle);
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      const nextIndex = (currentIndex + delta + results.length) % results.length;
      setSelectedTitle(results[nextIndex].title);
    } else if (event.key === 'Escape') {
      if (query) {
        setQuery('');
      } else {
        inputRef.current?.blur();
      }
    }
  };

  const isFiltering = normalizedQuery.length > 0;

  const renderResult = (project: (typeof PROJECTS)[number]) => {
    const isActive = project.title === activeTitle;
    return (
      <div
        className={`${styles.projects__result} ${isActive ? styles['projects__result--active'] : ''}`}
        onClick={() => setSelectedTitle(project.title)}
      >
        <span className={styles['projects__result-caret']} aria-hidden="true">
          {isActive ? '❯' : '›'}
        </span>
        <div className={styles['projects__result-body']}>
          <div className={styles['projects__result-head']}>
            <div className={styles['projects__result-ident']}>
              <h3 className={styles.projects__title}>{project.title}</h3>
              <p className={styles.projects__company}>{project.company}</p>
            </div>
            {project.featured && (
              <div className={styles['projects__result-action']}>
                <span className={styles['projects__acquired-chip']}>Acquired by Perion</span>
                <span className={styles['projects__outcome-label']}>outcome of the rebuild</span>
              </div>
            )}
          </div>
          <p className={styles.projects__description}>{project.description}</p>
          <div className={styles.projects__tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.projects__tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id={NAV_SECTIONS.PROJECTS}
      aria-labelledby={`${NAV_SECTIONS.PROJECTS}-title`}
      className={styles.projects}
    >
      <div className={styles.section__container}>
        <SectionTitle
          id={`${NAV_SECTIONS.PROJECTS}-title`}
          title={SECTION_TITLES.PROJECTS}
          accent={SECTION_TITLES.PROJECTS_ACCENT}
        />

        <div className={styles.projects__palette}>
          <div className={styles['projects__palette-search']}>
            <span className={styles['projects__palette-kbd']} aria-hidden="true">
              &#8984;K
            </span>
            <span className={styles['projects__palette-caret']} aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              className={styles['projects__palette-input']}
              placeholder={PROJECTS_PALETTE.PLACEHOLDER}
              aria-label={PROJECTS_PALETTE.ARIA_LABEL}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
          </div>

          <div className={styles['projects__palette-results']}>
            {isFiltering && (
              <p className={styles['projects__palette-group']} aria-live="polite">
                {results.length === 1 ? '1 result' : `${results.length} results`}
              </p>
            )}

            {isFiltering && results.length === 0 && (
              <div className={styles['projects__palette-empty']}>
                <p>
                  {PROJECTS_PALETTE.EMPTY} &ldquo;{query.trim()}&rdquo;
                </p>
                <p className={styles['projects__palette-empty-hint']}>
                  {PROJECTS_PALETTE.EMPTY_HINT}
                </p>
              </div>
            )}

            {results.map((project, index) =>
              // Skip the scroll entrance while filtering so results swap instantly
              isFiltering ? (
                <div key={project.title}>{renderResult(project)}</div>
              ) : (
                <ScrollReveal key={project.title} delay={index * ANIMATION_DELAY.MEDIUM}>
                  {project.group && (
                    <p className={styles['projects__palette-group']} aria-hidden="true">
                      {project.group}
                    </p>
                  )}
                  {renderResult(project)}
                </ScrollReveal>
              ),
            )}
          </div>

          <div className={styles['projects__palette-footer']} aria-hidden="true">
            <span>&#8593;&#8595; navigate</span>
            <span>esc clear</span>
          </div>
        </div>
      </div>
    </section>
  );
}
