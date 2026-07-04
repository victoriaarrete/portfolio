import { SlackTestimonials } from './slack-testimonials';
import { SECTION_TITLES, NAV_SECTIONS } from '@/shared/constants/strings';
import { SectionTitle } from '@/shared/components/section-title';
import styles from '@/pages/home/home.module.css';

export function Testimonials() {
  return (
    <section id={NAV_SECTIONS.TESTIMONIALS} className={styles.testimonials}>
      <div className={styles.section__container}>
        <SectionTitle
          title={SECTION_TITLES.TESTIMONIALS}
          accent={SECTION_TITLES.TESTIMONIALS_ACCENT}
        />

        <div className={styles.testimonials__content}>
          <SlackTestimonials />
        </div>
      </div>
    </section>
  );
}
