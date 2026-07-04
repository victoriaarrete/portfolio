import { ScrollReveal } from '@/components/scroll-reveal';
import { ANIMATION_DELAY } from '@/constants/layout';
import { SECTION_TITLES, NAV_SECTIONS } from '@/constants/strings';
import { SectionTitle } from './section-title';
import styles from './home.module.css';

export function Projects() {
  return (
    <section id={NAV_SECTIONS.PROJECTS} className={styles.projects}>
      <div className={styles.section__container}>
        <SectionTitle title={SECTION_TITLES.PROJECTS} accent={SECTION_TITLES.PROJECTS_ACCENT} />

        <div className={styles.projects__palette}>
          {/* Palette chrome: a focused search field framing the work as ⌘K results */}
          <div className={styles.projects__paletteSearch} aria-hidden="true">
            <span className={styles.projects__paletteKbd}>&#8984;K</span>
            <span className={styles.projects__palettePlaceholder}>search projects</span>
            <span className={styles.projects__paletteCaret} />
          </div>

          <div className={styles.projects__paletteResults}>
            {[
              {
                group: 'Featured',
                featured: true,
                title: 'Content Arbitrage Platform',
                company: 'CIQ/Perion',
                description: (
                  <>
                    Part of the team that rebuilt a legacy monolith into a scalable microservices architecture handling millions of requests daily &mdash; work that led to the startup&rsquo;s acquisition by Perion.
                  </>
                ),
                tags: ['Microservices', 'AdTech', 'Scale'],
              },
              {
                group: 'More',
                title: 'AI Workflow Optimizer',
                company: 'Swish.ai',
                description:
                  'Led development of AI-driven automation platform that optimizes IT workflows, reducing manual tasks by 60% and improving team efficiency across multiple departments.',
                tags: ['AI/ML', 'Automation', 'Workflow'],
              },
              {
                title: 'Internal Productivity Tools',
                company: 'Multiple Organizations',
                description:
                  'Designed and implemented custom productivity tools that streamlined development workflows, improved team collaboration, and enhanced project management across R&D teams.',
                tags: ['Tools', 'Productivity', 'Collaboration'],
              },
            ].map((project, index) => (
              <ScrollReveal key={project.title} delay={index * ANIMATION_DELAY.MEDIUM}>
                {project.group && (
                  <p className={styles.projects__paletteGroup} aria-hidden="true">
                    {project.group}
                  </p>
                )}
                <div
                  className={`${styles.projects__result} ${project.featured ? styles['projects__result--active'] : ''}`}
                >
                  <span className={styles.projects__resultCaret} aria-hidden="true">
                    {project.featured ? '❯' : '›'}
                  </span>
                  <div className={styles.projects__resultBody}>
                    <div className={styles.projects__resultHead}>
                      <div className={styles.projects__resultIdent}>
                        <h3 className={styles.projects__title}>{project.title}</h3>
                        <p className={styles.projects__company}>{project.company}</p>
                      </div>
                      {project.featured ? (
                        <div className={styles.projects__resultAction}>
                          <span className={styles.projects__acquiredChip}>
                            Acquired by Perion <kbd aria-hidden="true">&#8629;</kbd>
                          </span>
                          <span className={styles.projects__outcomeLabel}>outcome of the rebuild</span>
                        </div>
                      ) : (
                        <span className={styles.projects__enterHint} aria-hidden="true">
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

          <div className={styles.projects__paletteFooter} aria-hidden="true">
            <span>&#8593;&#8595; navigate</span>
            <span>&#8629; open</span>
          </div>
        </div>
      </div>
    </section>
  );
}
