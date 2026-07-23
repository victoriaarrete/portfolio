import { useEffect, useRef, useState } from 'react';
import { ScrollReveal } from '@/shared/components/scroll-reveal/scroll-reveal';
import { CodeBackground } from '@/shared/components/code-background/code-background';
import { ANIMATION_DELAY, TIMING_MS } from '@/shared/constants/layout';
import {
  SECTION_TITLES,
  NAV_SECTIONS,
  CONTACT_CONTENT,
  PERSONAL_INFO,
} from '@/shared/constants/strings';
import { SectionTitle } from '@/shared/components/section-title/section-title';
import styles from '@/pages/home/home.module.css';

// The methods render as a key-value ledger: mono keys name each row (the job
// the icon tiles used to do), hairlines part them, and each interactive row
// reveals one hint in the right margin - "copy" on the email, an arrow on the
// link. Copy-first for the email (a mailto: opens whatever half-configured
// default the OS has); mailto stays as the fallback when there's no clipboard.
export function Contact() {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyEmail = () => {
    // No clipboard API, or the browser denies the write: fall through to
    // mailto - a compose window beats a click that silently does nothing.
    const mailtoFallback = () => {
      window.location.href = `mailto:${PERSONAL_INFO.EMAIL}`;
    };
    if (!navigator.clipboard) {
      mailtoFallback();
      return;
    }
    void navigator.clipboard.writeText(PERSONAL_INFO.EMAIL).then(() => {
      setCopied(true);
      window.clearTimeout(resetTimer.current);
      resetTimer.current = window.setTimeout(() => setCopied(false), TIMING_MS.COPY_FEEDBACK);
    }, mailtoFallback);
  };

  const emailHintClass = copied
    ? `${styles['contact__row-hint']} ${styles['contact__row-hint--on']}`
    : styles['contact__row-hint'];

  return (
    <section
      id={NAV_SECTIONS.CONTACT}
      aria-labelledby={`${NAV_SECTIONS.CONTACT}-title`}
      className={styles.contact}
    >
      <CodeBackground />
      <div className={styles.section__container}>
        <SectionTitle
          id={`${NAV_SECTIONS.CONTACT}-title`}
          title={SECTION_TITLES.CONTACT}
          accent={SECTION_TITLES.CONTACT_ACCENT}
        />

        <div className={styles.contact__content}>
          <ScrollReveal delay={ANIMATION_DELAY.MEDIUM}>
            <div className={styles.contact__split}>
              <div className={styles.contact__lede}>
                <p className={styles.contact__intro}>{CONTACT_CONTENT.INTRO}</p>
              </div>

              <div className={styles.contact__methods}>
                <button
                  type="button"
                  className={`${styles.contact__row} ${styles['contact__row--action']}`}
                  onClick={copyEmail}
                >
                  <span className={styles['contact__row-key']}>{CONTACT_CONTENT.EMAIL_LABEL}</span>
                  <span className={styles['contact__row-value']}>{PERSONAL_INFO.EMAIL}</span>
                  <span className={emailHintClass} aria-live="polite">
                    {copied ? CONTACT_CONTENT.COPIED_HINT : CONTACT_CONTENT.COPY_HINT}
                  </span>
                </button>

                <a
                  className={`${styles.contact__row} ${styles['contact__row--action']}`}
                  href={PERSONAL_INFO.LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles['contact__row-key']}>
                    {CONTACT_CONTENT.LINKEDIN_LABEL}
                  </span>
                  <span className={styles['contact__row-value']}>
                    {PERSONAL_INFO.LINKEDIN_DISPLAY}
                  </span>
                  <span className={styles['contact__row-hint']} aria-hidden="true">
                    {CONTACT_CONTENT.LINK_HINT}
                  </span>
                </a>

                <div className={styles.contact__row}>
                  <span className={styles['contact__row-key']}>
                    {CONTACT_CONTENT.LOCATION_LABEL}
                  </span>
                  <span
                    className={`${styles['contact__row-value']} ${styles['contact__row-value--static']}`}
                  >
                    {PERSONAL_INFO.LOCATION}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
