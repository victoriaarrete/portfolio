import { useEffect, useMemo, type CSSProperties } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'motion/react';
import { ParticleSystem } from '@/shared/components/particle-system/particle-system';
import { generateMaze, hashString, seededRandom, MAZE_COLS, MAZE_ROWS } from '@/shared/lib/maze';
import { logWrongTurn } from '@/shared/lib/console-signature';
import { NOT_FOUND, PERSONAL_INFO } from '@/shared/constants/strings';
import { ANIMATION_DURATION, INITIAL_OFFSET, OPACITY } from '@/shared/constants/layout';
import { suggestSections, looksAiInvented } from './suggest-sections';
import styles from './not-found.module.css';

export default function NotFound() {
  const [path] = useLocation();

  // The broken URL is the seed: the same wrong turn always draws the same maze.
  const maze = useMemo(
    () => generateMaze(MAZE_COLS, MAZE_ROWS, seededRandom(hashString(path))),
    [path],
  );
  const suggestions = useMemo(() => suggestSections(path), [path]);
  const aiNote = suggestions.length === 0 && looksAiInvented(path);

  useEffect(() => {
    const previous = document.title;
    document.title = NOT_FOUND.DOC_TITLE;
    // Static hosts serve the SPA shell with a 200 for unknown paths (a soft
    // 404); noindex keeps crawlers from treating dead URLs as real pages.
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    return () => {
      document.title = previous;
      robots.remove();
    };
  }, []);

  useEffect(() => {
    logWrongTurn(path);
  }, [path]);

  return (
    <div className={styles['not-found']}>
      <ParticleSystem />

      <a className={styles['not-found__home-mark']} href="/" aria-label="Back to home">
        {PERSONAL_INFO.INITIALS}
      </a>

      <main className={styles['not-found__main']}>
        <motion.div
          className={styles['not-found__content']}
          initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
          animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
          transition={{ duration: ANIMATION_DURATION.NORMAL }}
        >
          <p className={styles['not-found__kicker']}>{NOT_FOUND.KICKER}</p>

          <h1 className={styles['not-found__title']}>
            <span className={styles['not-found__title-main']}>{NOT_FOUND.TITLE_MAIN}</span>
            <span className={styles['not-found__title-accent']}>{NOT_FOUND.TITLE_ACCENT}</span>
          </h1>

          <p className={styles['not-found__lead']}>
            <code className={styles['not-found__path']}>{path}</code>
            {NOT_FOUND.LEAD_SUFFIX}
          </p>

          <pre className={styles['not-found__maze']} aria-hidden="true">
            {maze.map((row, r) => (
              <span key={r}>
                {row.map((cell, c) =>
                  cell.step != null ? (
                    <span
                      key={c}
                      className={styles['not-found__maze-step']}
                      style={{ '--step': cell.step } as CSSProperties}
                    >
                      {cell.ch}
                    </span>
                  ) : (
                    cell.ch
                  ),
                )}
                {'\n'}
              </span>
            ))}
          </pre>

          <div className={styles['not-found__notes']}>
            <p className={styles['not-found__note']}>
              {NOT_FOUND.MAZE_NOTE_PREFIX}
              {`"${path}"`}
              {NOT_FOUND.MAZE_NOTE_SUFFIX}
            </p>
            {aiNote && <p className={styles['not-found__note']}>{NOT_FOUND.AI_NOTE}</p>}
          </div>

          <nav className={styles['not-found__exits']} aria-label="Where to go instead">
            {suggestions.length > 0 && (
              <span className={styles['not-found__exits-label']}>{NOT_FOUND.SUGGEST_LABEL}</span>
            )}
            {suggestions.map((suggestion) => (
              <a
                key={suggestion.id}
                className={styles['not-found__action']}
                href={`/#${suggestion.id}`}
              >
                {suggestion.label}
              </a>
            ))}
            <a
              className={`${styles['not-found__action']} ${styles['not-found__action--primary']}`}
              href="/"
            >
              {NOT_FOUND.HOME_ACTION} →
            </a>
          </nav>
        </motion.div>
      </main>
    </div>
  );
}
