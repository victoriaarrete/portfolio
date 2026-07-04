import { ScrollReveal } from '@/shared/components/scroll-reveal/scroll-reveal';
import { ANIMATION_DELAY } from '@/shared/constants/layout';
import { SECTION_TITLES, NAV_SECTIONS, EXPERIENCE_LOG } from '@/shared/constants/strings';
import { SectionTitle } from '@/shared/components/section-title/section-title';
import styles from '@/pages/home/home.module.css';

export function Experience() {
  return (
    <section
      id={NAV_SECTIONS.EXPERIENCE}
      aria-labelledby={`${NAV_SECTIONS.EXPERIENCE}-title`}
      className={styles.experience}
    >
      <div className={styles.section__container}>
        <SectionTitle
          id={`${NAV_SECTIONS.EXPERIENCE}-title`}
          title={SECTION_TITLES.EXPERIENCE}
          accent={SECTION_TITLES.EXPERIENCE_ACCENT}
        />

        <div className={styles.experience__content}>
          <div className={styles.experience__terminal}>
            {/* Terminal chrome: traffic lights + the command that produced this log */}
            <div className={styles.experience__bar} aria-hidden="true">
              <span className={styles.experience__dots}>
                <span className={styles['experience__traffic-dot']} />
                <span className={styles['experience__traffic-dot']} />
                <span className={styles['experience__traffic-dot']} />
              </span>
              <span className={styles.experience__file}>career.log</span>
            </div>

            <div className={styles.experience__prompt} aria-hidden="true">
              <span className={styles['experience__prompt-sign']}>victoria@career</span>
              <span className={styles['experience__prompt-path']}> ~ </span>
              <span className={styles['experience__prompt-cmd']}>
                git log --author=victoria --graph
              </span>
            </div>

            <ol className={styles.experience__log}>
              {EXPERIENCE_LOG.map((commit, index) => {
                const shape = commit.shape;
                const railUp = shape !== 'head';
                const railDown = shape !== 'tail';
                const isBranchNode = shape === 'branch';
                const rowOpacity = Math.max(0.55, 1 - index * 0.07);

                return (
                  <ScrollReveal key={commit.hash} delay={index * ANIMATION_DELAY.SHORT}>
                    <li
                      className={styles.experience__commit}
                      style={{ ['--row-op' as string]: rowOpacity }}
                    >
                      <div className={styles.experience__gutter} aria-hidden="true">
                        {railUp && <span className={styles['experience__rail-up']} />}
                        {railDown && <span className={styles['experience__rail-down']} />}

                        {shape === 'merge' && (
                          <>
                            <span className={styles['experience__elbow-open']} />
                            <span className={styles['experience__branch-down-merge']} />
                          </>
                        )}
                        {shape === 'branch' && (
                          <>
                            <span className={styles['experience__branch-up']} />
                            <span className={styles['experience__branch-down']} />
                          </>
                        )}
                        {shape === 'close' && (
                          <span className={styles['experience__elbow-close']} />
                        )}

                        <span
                          className={`${styles.experience__node} ${
                            isBranchNode ? styles['experience__node--branch'] : ''
                          } ${commit.head ? styles['experience__node--head'] : ''} ${
                            commit.root ? styles['experience__node--root'] : ''
                          }`}
                        />
                      </div>

                      <div className={styles.experience__body}>
                        <p className={styles.experience__msg}>
                          <span
                            className={`${styles.experience__type} ${
                              styles[`experience__type--${commit.type}`] ?? ''
                            }`}
                          >
                            {commit.type}:
                          </span>{' '}
                          <span className={styles.experience__role}>{commit.role}</span>
                          <span className={styles.experience__company}> {commit.company}</span>
                          {commit.head && (
                            <span className={styles.experience__ref}> (HEAD &rarr; main)</span>
                          )}
                        </p>
                        <p className={styles.experience__meta}>
                          <span className={styles.experience__hash}>{commit.hash}</span>
                          <span className={styles['experience__meta-sep']}> · </span>
                          {commit.period}
                        </p>
                        <p className={styles.experience__blurb}>{commit.blurb}</p>
                      </div>
                    </li>
                  </ScrollReveal>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
