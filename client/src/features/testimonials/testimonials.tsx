import { SlackTestimonials } from './slack-testimonials';
import { SECTION_TITLES, NAV_SECTIONS, TESTIMONIALS_CONTENT } from '@/shared/constants/strings';
import { SectionTitle } from '@/shared/components/section-title/section-title';
import styles from '@/pages/home/home.module.css';

export function Testimonials() {
  return (
    <section
      id={NAV_SECTIONS.TESTIMONIALS}
      aria-labelledby={`${NAV_SECTIONS.TESTIMONIALS}-title`}
      className={styles.testimonials}
    >
      <div className={styles.section__container}>
        <SectionTitle
          id={`${NAV_SECTIONS.TESTIMONIALS}-title`}
          title={SECTION_TITLES.TESTIMONIALS}
          accent={SECTION_TITLES.TESTIMONIALS_ACCENT}
        />

        <div className={styles.testimonials__content}>
          <SlackTestimonials />
          <p className={styles.testimonials__footnote}>
            {TESTIMONIALS_CONTENT.FOOTNOTE_PREFIX}
            <a
              className={styles['testimonials__footnote-link']}
              href={TESTIMONIALS_CONTENT.RECOMMENDATIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {TESTIMONIALS_CONTENT.FOOTNOTE_LINK}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
