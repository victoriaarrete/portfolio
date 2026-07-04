import { ScrollReveal } from '@/components/scroll-reveal';
import { TangleToClarity } from '@/components/tangle-to-clarity';
import { ANIMATION_DELAY } from '@/constants/layout';
import { SECTION_TITLES, NAV_SECTIONS, TAGLINES, LEADERSHIP_PRINCIPLES } from '@/constants/strings';
import { SectionTitle } from './section-title';
import styles from './home.module.css';

export function Philosophy() {
  return (
    <section id={NAV_SECTIONS.PHILOSOPHY} className={styles.philosophy}>
      <div className={styles.section__container}>
        <SectionTitle title={SECTION_TITLES.PHILOSOPHY} accent={SECTION_TITLES.PHILOSOPHY_ACCENT} />

        <div className={styles.philosophy__content}>
          <div className={styles.philosophy__layout}>
            <ScrollReveal delay={ANIMATION_DELAY.MEDIUM}>
              <div className={styles.philosophy__statement}>
                <span className={styles.philosophy__kicker}>{TAGLINES.PHILOSOPHY_KICKER}</span>

                <blockquote className={styles.philosophy__quote}>
                  {TAGLINES.PHILOSOPHY_QUOTE_LEAD}
                  <span className={styles.philosophy__quoteEmphasis}>
                    {TAGLINES.PHILOSOPHY_QUOTE_EMPHASIS}
                  </span>
                  {TAGLINES.PHILOSOPHY_QUOTE_REST}
                </blockquote>

                {/* Mobile-only horizontal band; desktop uses the side-column figure below */}
                <TangleToClarity variant="horizontal" className={styles.philosophy__band} />

                <div className={styles.philosophy__principles}>
                  {LEADERSHIP_PRINCIPLES.map((item, index) => (
                    <ScrollReveal
                      key={item.title}
                      delay={ANIMATION_DELAY.LONG + index * ANIMATION_DELAY.MEDIUM}
                    >
                      <div className={styles.philosophy__principle}>
                        <span className={styles.philosophy__principleNumber}>
                          <span className={styles.philosophy__principleNumberBracket}>[</span>
                          {index}
                          <span className={styles.philosophy__principleNumberBracket}>]</span>
                        </span>
                        <h3 className={styles.philosophy__principleTitle}>{item.title}</h3>
                        <p className={styles.philosophy__principleDescription}>
                          {item.description}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <TangleToClarity variant="vertical" className={styles.philosophy__visual} />
          </div>
        </div>
      </div>
    </section>
  );
}
