import { ScrollReveal } from '@/shared/components/scroll-reveal';
import { ANIMATION_DELAY } from '@/shared/constants/layout';
import { SECTION_TITLES, NAV_SECTIONS, PROJECTS } from '@/shared/constants/strings';
import { SectionTitle } from '@/shared/components/section-title';
import styles from '@/pages/home/home.module.css';

export function Projects() {
  return (
    <section id={NAV_SECTIONS.PROJECTS} className={styles.projects}>
      <div className={styles.section__container}>
        <SectionTitle title={SECTION_TITLES.PROJECTS} accent={SECTION_TITLES.PROJECTS_ACCENT} />

        <div className={styles.projects__palette}>
          {/* Palette chrome: a focused search field framing the work as ⌘K results */}
          <div className={styles['projects__palette-search']} aria-hidden="true">
            <span className={styles['projects__palette-kbd']}>&#8984;K</span>
            <span className={styles['projects__palette-placeholder']}>search projects</span>
            <span className={styles['projects__palette-caret']} />
          </div>

          <div className={styles['projects__palette-results']}>
            {PROJECTS.map((project, index) => (
              <ScrollReveal key={project.title} delay={index * ANIMATION_DELAY.MEDIUM}>
                {project.group && (
                  <p className={styles['projects__palette-group']} aria-hidden="true">
                    {project.group}
                  </p>
                )}
                <div
                  className={`${styles.projects__result} ${project.featured ? styles['projects__result--active'] : ''}`}
                >
                  <span className={styles['projects__result-caret']} aria-hidden="true">
                    {project.featured ? '❯' : '›'}
                  </span>
                  <div className={styles['projects__result-body']}>
                    <div className={styles['projects__result-head']}>
                      <div className={styles['projects__result-ident']}>
                        <h3 className={styles.projects__title}>{project.title}</h3>
                        <p className={styles.projects__company}>{project.company}</p>
                      </div>
                      {project.featured ? (
                        <div className={styles['projects__result-action']}>
                          <span className={styles['projects__acquired-chip']}>
                            Acquired by Perion <kbd aria-hidden="true">&#8629;</kbd>
                          </span>
                          <span className={styles['projects__outcome-label']}>
                            outcome of the rebuild
                          </span>
                        </div>
                      ) : (
                        <span className={styles['projects__enter-hint']} aria-hidden="true">
                          &#8629;
                        </span>
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
              </ScrollReveal>
            ))}
          </div>

          <div className={styles['projects__palette-footer']} aria-hidden="true">
            <span>&#8593;&#8595; navigate</span>
            <span>&#8629; open</span>
          </div>
        </div>
      </div>
    </section>
  );
}
