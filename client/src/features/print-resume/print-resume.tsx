import {
  PERSONAL_INFO,
  ROLES,
  TAGLINES,
  EXPERIENCE_LOG,
  ABOUT_IMPACT,
  PRINT_RESUME,
} from '@/shared/constants/strings';
import styles from '@/pages/home/home.module.css';

// Print-only: Cmd+P swaps the interactive page for this one-page document
// (home.module.css hides everything else under @media print). aria-hidden as
// well as display: none - the page already has one h1, and this duplicate
// must stay out of the accessibility tree even where the CSS doesn't apply
// (jsdom in tests); on paper, aria is moot. Content is the same constants the
// live sections render, so print can never drift from the page.
export function PrintResume() {
  return (
    <section className={styles['print-resume']} aria-hidden="true">
      <header className={styles['print-resume__header']}>
        <div>
          <h1 className={styles['print-resume__name']}>{PERSONAL_INFO.NAME}</h1>
          <p className={styles['print-resume__role']}>
            {ROLES.PRIMARY} · {PRINT_RESUME.LOCATION_SHORT}
          </p>
        </div>
        <p className={styles['print-resume__contact']}>
          {PERSONAL_INFO.EMAIL}
          <br />
          {PERSONAL_INFO.LINKEDIN_URL.replace('https://www.', '')}
          <br />
          {PRINT_RESUME.SITE_DISPLAY}
        </p>
      </header>

      <p className={styles['print-resume__tagline']}>{TAGLINES.PRIMARY}</p>

      <h2 className={styles['print-resume__label']}>{PRINT_RESUME.PROOF_LABEL}</h2>
      <p className={styles['print-resume__proof']}>
        {ABOUT_IMPACT.map((item, i) => (
          <span key={item.label}>
            {i > 0 && ' · '}
            <strong>{item.metric}</strong> {item.label}
          </span>
        ))}
      </p>

      <h2 className={styles['print-resume__label']}>{PRINT_RESUME.EXPERIENCE_LABEL}</h2>
      <ul className={styles['print-resume__log']}>
        {EXPERIENCE_LOG.map((entry) => (
          <li key={entry.hash} className={styles['print-resume__entry']}>
            <div className={styles['print-resume__entry-head']}>
              <span className={styles['print-resume__entry-role']}>
                {entry.role} - {entry.company}
              </span>
              <span className={styles['print-resume__entry-period']}>{entry.period}</span>
            </div>
            <p className={styles['print-resume__entry-blurb']}>{entry.blurb}</p>
          </li>
        ))}
      </ul>

      <footer className={styles['print-resume__footnote']}>{PRINT_RESUME.FOOTNOTE}</footer>
    </section>
  );
}
