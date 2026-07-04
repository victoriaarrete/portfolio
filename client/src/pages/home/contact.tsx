import { motion } from 'motion/react';
import { Mail, MapPin, Linkedin } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { CodeBackground } from '@/components/code-background';
import { ANIMATION_DURATION, ANIMATION_DELAY, TRANSFORM } from '@/constants/layout';
import { SECTION_TITLES, NAV_SECTIONS, CONTACT_CONTENT, PERSONAL_INFO } from '@/constants/strings';
import { SectionTitle } from './section-title';
import styles from './home.module.css';

// The three contact cards share identical chrome (icon tile, title, hover
// nudge); only the icon and body differ.
const CONTACT_METHODS = [
  {
    Icon: Mail,
    title: CONTACT_CONTENT.EMAIL_LABEL,
    body: (
      <a href={`mailto:${PERSONAL_INFO.EMAIL}`} className={styles.contact__link}>
        {PERSONAL_INFO.EMAIL}
      </a>
    ),
  },
  {
    Icon: Linkedin,
    title: CONTACT_CONTENT.LINKEDIN_LABEL,
    body: (
      <a
        href={PERSONAL_INFO.LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.contact__link}
      >
        {PERSONAL_INFO.LINKEDIN_DISPLAY}
      </a>
    ),
  },
  {
    Icon: MapPin,
    title: CONTACT_CONTENT.LOCATION_LABEL,
    body: <p className={styles.contact__text}>{PERSONAL_INFO.LOCATION}</p>,
  },
];

export function Contact() {
  return (
    <section id={NAV_SECTIONS.CONTACT} className={styles.contact}>
      <CodeBackground />
      <div className={styles.section__container}>
        <SectionTitle title={SECTION_TITLES.CONTACT} accent={SECTION_TITLES.CONTACT_ACCENT} />

        <div className={styles.contact__content}>
          <ScrollReveal delay={ANIMATION_DELAY.MEDIUM}>
            <div className={styles.contact__split}>
              <div className={styles.contact__lede}>
                <p className={styles.contact__intro}>
                  {CONTACT_CONTENT.INTRO}
                </p>
              </div>

              <div className={styles.contact__methods}>
                {CONTACT_METHODS.map(({ Icon, title, body }) => (
                  <motion.div
                    key={title}
                    className={styles.contact__method}
                    whileHover={{ x: TRANSFORM.ROTATE_RANGE }}
                    transition={{ duration: ANIMATION_DURATION.FAST }}
                  >
                    <div className={styles.contact__iconWrapper}>
                      <Icon className={styles.contact__icon} aria-hidden="true" />
                    </div>
                    <div className={styles.contact__methodInfo}>
                      <h3 className={styles.contact__methodTitle}>{title}</h3>
                      {body}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
