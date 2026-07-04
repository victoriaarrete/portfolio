import { ScrollReveal } from '@/components/scroll-reveal';
import { ANIMATION_DELAY } from '@/constants/layout';
import { SECTION_TITLES, NAV_SECTIONS, EXPERIENCE_LOG } from '@/constants/strings';
import { SectionTitle } from './section-title';
import styles from './home.module.css';

export function Experience() {
  return (
    <section id={NAV_SECTIONS.EXPERIENCE} className={styles.experience}>
      <div className={styles.section__container}>
        <SectionTitle title={SECTION_TITLES.EXPERIENCE} accent={SECTION_TITLES.EXPERIENCE_ACCENT} />

        <div className={styles.experience__content}>
          <div className={styles.experience__terminal}>
            {/* Terminal chrome: traffic lights + the command that produced this log */}
            <div className={styles.experience__bar} aria-hidden="true">
              <span className={styles.experience__dots}>
                <span className={styles.experience__trafficDot} />
                <span className={styles.experience__trafficDot} />
                <span className={styles.experience__trafficDot} />
              </span>
              <span className={styles.experience__file}>career.log</span>
            </div>

            <div className={styles.experience__prompt} aria-hidden="true">
              <span className={styles.experience__promptSign}>victoria@career</span>
              <span className={styles.experience__promptPath}> ~ </span>
              <span className={styles.experience__promptCmd}>
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
                        {railUp && <span className={styles.experience__railUp} />}
                        {railDown && <span className={styles.experience__railDown} />}

                        {shape === 'merge' && (
                          <>
                            <span className={styles.experience__elbowOpen} />
                            <span className={styles.experience__branchDownMerge} />
                          </>
                        )}
                        {shape === 'branch' && (
                          <>
                            <span className={styles.experience__branchUp} />
                            <span className={styles.experience__branchDown} />
                          </>
                        )}
                        {shape === 'close' && <span className={styles.experience__elbowClose} />}

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
                          <span className={styles.experience__metaSep}> · </span>
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
