import { motion } from 'motion/react';
import { Mail, MapPin, Linkedin } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { CodeBackground } from '@/components/code-background';
import { ANIMATION_DURATION, ANIMATION_DELAY, TRANSFORM } from '@/constants/layout';
import { SECTION_TITLES, NAV_SECTIONS, CONTACT_CONTENT, PERSONAL_INFO } from '@/constants/strings';
import { SectionTitle } from './section-title';
import styles from './home.module.css';

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
                <motion.div
                  className={styles.contact__method}
                  whileHover={{ x: TRANSFORM.ROTATE_RANGE }}
                  transition={{ duration: ANIMATION_DURATION.FAST }}
                >
                  <div className={styles.contact__iconWrapper}>
                    <Mail className={styles.contact__icon} aria-hidden="true" />
                  </div>
                  <div className={styles.contact__methodInfo}>
                    <h3 className={styles.contact__methodTitle}>{CONTACT_CONTENT.EMAIL_LABEL}</h3>
                    <a
                      href={`mailto:${PERSONAL_INFO.EMAIL}`}
                      className={styles.contact__link}
                    >
                      {PERSONAL_INFO.EMAIL}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className={styles.contact__method}
                  whileHover={{ x: TRANSFORM.ROTATE_RANGE }}
                  transition={{ duration: ANIMATION_DURATION.FAST }}
                >
                  <div className={styles.contact__iconWrapper}>
                    <Linkedin className={styles.contact__icon} aria-hidden="true" />
                  </div>
                  <div className={styles.contact__methodInfo}>
                    <h3 className={styles.contact__methodTitle}>{CONTACT_CONTENT.LINKEDIN_LABEL}</h3>
                    <a
                      href={PERSONAL_INFO.LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contact__link}
                    >
                      {PERSONAL_INFO.LINKEDIN_DISPLAY}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className={styles.contact__method}
                  whileHover={{ x: TRANSFORM.ROTATE_RANGE }}
                  transition={{ duration: ANIMATION_DURATION.FAST }}
                >
                  <div className={styles.contact__iconWrapper}>
                    <MapPin className={styles.contact__icon} aria-hidden="true" />
                  </div>
                  <div className={styles.contact__methodInfo}>
                    <h3 className={styles.contact__methodTitle}>{CONTACT_CONTENT.LOCATION_LABEL}</h3>
                    <p className={styles.contact__text}>{PERSONAL_INFO.LOCATION}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
