import { motion } from 'motion/react';
import { GeometricWireframe } from './geometric-wireframe';
import {
  ANIMATION_DURATION,
  ANIMATION_DELAY,
  EASING,
  OPACITY,
  INITIAL_OFFSET,
} from '@/shared/constants/layout';
import {
  SECTION_TITLES,
  NAV_SECTIONS,
  ABOUT_CONTENT,
  ABOUT_APPROACH,
  ABOUT_IMPACT,
} from '@/shared/constants/strings';
import styles from '@/pages/home/home.module.css';

export function About() {
  return (
    <section
      id={NAV_SECTIONS.ABOUT}
      aria-labelledby={`${NAV_SECTIONS.ABOUT}-title`}
      className={styles.about}
    >
      <div className={styles.section__container}>
        <div className={styles.about__content}>
          {/* Manifesto - editorial band: ABOUT kicker, display headline, prose */}
          <motion.div
            className={styles.about__manifesto}
            initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_MEDIUM }}
            whileInView={{ opacity: OPACITY.VISIBLE, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              delay: ANIMATION_DELAY.MEDIUM,
              duration: ANIMATION_DURATION.SLOW,
              ease: EASING.DEFAULT,
            }}
          >
            <h2 id={`${NAV_SECTIONS.ABOUT}-title`} className={styles['about__section-label']}>
              {SECTION_TITLES.ABOUT}
            </h2>
            <h3 className={styles['about__manifesto-title']}>
              <span className={styles['about__manifesto-sentence']}>
                Strong code needs strong culture.
              </span>{' '}
              <span className={styles['about__manifesto-no-wrap']}>I build both.</span>
            </h3>
            <div className={styles['about__manifesto-prose']}>
              <p className={styles.about__lead}>{ABOUT_CONTENT.INTRO}</p>
              <p className={styles.about__body}>{ABOUT_CONTENT.PHILOSOPHY}</p>
            </div>
          </motion.div>

          {/* Proof - inline metric grid (no card); the section's evidence */}
          <motion.div
            className={styles.about__proof}
            initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_MEDIUM }}
            whileInView={{ opacity: OPACITY.VISIBLE, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              delay: ANIMATION_DELAY.LONG,
              duration: ANIMATION_DURATION.SLOW,
              ease: EASING.DEFAULT,
            }}
          >
            <span className={styles.about__kicker}>{ABOUT_CONTENT.IMPACT_TITLE}</span>
            <ul className={styles['about__impact-list']}>
              {ABOUT_IMPACT.map((item, index) => (
                <motion.li
                  key={item.label}
                  className={styles['about__impact-row']}
                  initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
                  whileInView={{ opacity: OPACITY.VISIBLE, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    delay: index * ANIMATION_DELAY.SHORT,
                    duration: ANIMATION_DURATION.MEDIUM,
                    ease: EASING.DEFAULT,
                  }}
                >
                  <span className={styles['about__impact-metric']}>{item.metric}</span>
                  <span className={styles['about__impact-label']}>{item.label}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Method - approach.sh terminal, full width of the column */}
          <motion.div
            className={`${styles.card} ${styles.about__method}`}
            initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_MEDIUM }}
            whileInView={{ opacity: OPACITY.VISIBLE, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              delay: ANIMATION_DELAY.LONG,
              duration: ANIMATION_DURATION.SLOW,
              ease: EASING.DEFAULT,
            }}
          >
            <div className={styles['about__term-bar']} aria-hidden="true">
              <span className={styles['about__term-file']}>approach.sh</span>
              <span className={styles['about__term-tag']}>bash</span>
            </div>
            <div className={styles['about__term-body']}>
              <p className={styles['about__term-comment']} aria-hidden="true">
                # my approach is simple
              </p>
              <ol className={styles.about__script}>
                {ABOUT_APPROACH.map((item, index) => (
                  <motion.li
                    key={index}
                    className={styles['about__script-line']}
                    initial={{ opacity: OPACITY.HIDDEN, x: INITIAL_OFFSET.X_SMALL }}
                    whileInView={{ opacity: OPACITY.VISIBLE, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      delay: index * ANIMATION_DELAY.SHORT,
                      duration: ANIMATION_DURATION.MEDIUM,
                      ease: EASING.DEFAULT,
                    }}
                  >
                    <span className={styles['about__line-num']} aria-hidden="true">
                      {index + 1}
                    </span>
                    <span className={styles.about__code}>
                      <span className={styles.about__cmd}>{item.cmd}</span>
                      {'flag' in item && item.flag ? (
                        <span className={styles.about__flag}> {item.flag}</span>
                      ) : null}
                      <span className={styles.about__quote} aria-hidden="true">
                        {' '}
                        "
                      </span>
                      <span className={styles.about__args}>{item.arg}</span>
                      <span className={styles.about__quote} aria-hidden="true">
                        "
                      </span>
                    </span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </motion.div>

          {/* What shaped me - editorial pull-quote sign-off */}
          <motion.div
            className={styles.about__signature}
            initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_MEDIUM }}
            whileInView={{ opacity: OPACITY.VISIBLE, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              delay: ANIMATION_DELAY.VERY_LONG,
              duration: ANIMATION_DURATION.SLOW,
              ease: EASING.DEFAULT,
            }}
          >
            <GeometricWireframe className={styles.about__figure} />
            <div className={styles['about__signature-body']}>
              <span className={styles.about__kicker}>{ABOUT_CONTENT.SIGNATURE_KICKER}</span>
              <blockquote className={styles.about__journey}>{ABOUT_CONTENT.BACKGROUND}</blockquote>
            </div>
            <div className={styles['about__signature-footer']}>
              <p className={styles.about__focus}>
                <span className={styles['about__focus-label']}>{ABOUT_CONTENT.FOCUS_LABEL}</span>
                {ABOUT_CONTENT.FOCUS}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
