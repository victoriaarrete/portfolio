import { useState, useEffect, useRef, useMemo, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, MapPin, Linkedin, User, ChevronDown } from 'lucide-react';
import victoriaPortrait from '@assets/victoria_pic.png';
import { ParticleSystem } from '@/components/particle-system';
import { Navigation } from '@/components/navigation';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SlackTestimonials } from '@/components/slack-testimonials';
import { CodeBackground, buildField } from '@/components/code-background';
import { GeometricWireframe } from '@/components/geometric-wireframe';
import { TangleToClarity } from '@/components/tangle-to-clarity';
import { Card, CardContent } from '@/components/ui/card';
import {
  ANIMATION_DURATION, 
  ANIMATION_DELAY, 
  EASING, 
  TRANSFORM, 
  OPACITY, 
  INITIAL_OFFSET,
} from '@/constants/layout';
import {
  PERSONAL_INFO,
  ROLES,
  TAGLINES,
  NAV_SECTIONS,
  SECTION_TITLES,
  BUTTON_LABELS,
  LEADERSHIP_PRINCIPLES,
  ABOUT_CONTENT,
  ABOUT_APPROACH,
  ABOUT_IMPACT,
  EXPERIENCE_LOG,
  CONTACT_CONTENT,
  COPYRIGHT,
  SCROLL_BEHAVIOR,
} from '@/constants/strings';
import { mountConsoleSignature } from '@/lib/console-signature';
import styles from './home.module.css';

export default function Home() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  // Same generator as the page-level code field (unified look); enough glyphs to
  // fill the portrait so the overlay reaches the content line on every device.
  const scanField = useMemo(() => buildField(6000), []);

  // Anchor the code field's fade-out to the hero's content line (role chips /
  // tagline). The hero content is vertically centred in a 100vh section, so the
  // line sits at a different % of the hero on every viewport height - a fixed
  // mask stop can't track it. We measure the line and expose it as CSS variables
  // (--code-stop for the background, --portrait-code-stop for the portrait
  // overlay) so the code always reaches at least that line on every device.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const clamp = (n: number) => Math.max(0, Math.min(100, n));

    const computeStops = () => {
      const tagline = hero.querySelector<HTMLElement>('.' + styles['hero__tagline']);
      if (!tagline) return;
      const heroRect = hero.getBoundingClientRect();
      // Top of the tagline ≈ the role-chips / tagline boundary the design targets.
      const lineY = tagline.getBoundingClientRect().top;

      const bgStop = clamp(((lineY - heroRect.top) / heroRect.height) * 100);
      hero.style.setProperty('--code-stop', `${bgStop.toFixed(1)}%`);

      // Top of the band = top of the content block (portrait/name), so the code
      // sits as a full-width horizontal band over the content, not above it.
      const content = hero.querySelector<HTMLElement>('.' + styles['hero__content']);
      if (content) {
        const startPct = clamp(((content.getBoundingClientRect().top - heroRect.top) / heroRect.height) * 100);
        hero.style.setProperty('--code-start', `${startPct.toFixed(1)}%`);
      }

      const portrait = hero.querySelector<HTMLElement>('.' + styles['hero__portrait']);
      if (portrait) {
        const pr = portrait.getBoundingClientRect();
        // Where the line falls within the portrait. If the line is below the
        // portrait (stacked mobile layout), this clamps to 100% = full coverage.
        const pStop = clamp(((lineY - pr.top) / pr.height) * 100);
        hero.style.setProperty('--portrait-code-stop', `${pStop.toFixed(1)}%`);
      }
    };

    // Recompute now, after layout/entrance settle, on resize, and on font load.
    computeStops();
    const raf = requestAnimationFrame(computeStops);
    const t1 = setTimeout(computeStops, 400);
    const t2 = setTimeout(computeStops, 1400);
    window.addEventListener('resize', computeStops);
    const ro = new ResizeObserver(computeStops);
    ro.observe(hero);
    document.fonts?.ready.then(computeStops).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', computeStops);
      ro.disconnect();
    };
  }, []);

  // Cursor-following glow for the portrait scanner reveal.
  const handlePortraitMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  // Install the interactive console experience for fellow developers (window.victoria).
  useEffect(() => {
    mountConsoleSignature();
  }, []);

  return (
    <div className={styles.page}>
      <ParticleSystem />
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} id={NAV_SECTIONS.HERO} className={styles.hero}>
        <CodeBackground variant="band" />

        <div className={styles.hero__container}>
          {/* Opacity-only entrance: a `y` translate here would give this wrapper a
              transform, making it the containing block for the absolutely-pinned
              desktop portrait — so the portrait would sit at the content column's
              edge mid-animation and snap to the viewport edge when the transform
              clears. The inner blocks below each carry their own y slide-up, so the
              entrance still reads the same without the layout jump. */}
          <motion.div
            className={styles.hero__content}
            initial={{ opacity: OPACITY.HIDDEN }}
            animate={{ opacity: OPACITY.VISIBLE }}
            transition={{ duration: ANIMATION_DURATION.VERY_SLOW, ease: EASING.DEFAULT }}
          >
            {/* Role kicker, above the portrait (mobile) / above the name (desktop) */}
            <motion.h2
              className={styles.hero__roles}
              aria-label={ROLES.FULL_SUBTITLE}
              initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
              animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
              transition={{ delay: ANIMATION_DELAY.SHORT, duration: ANIMATION_DURATION.MEDIUM, ease: EASING.DEFAULT }}
            >
              {ROLES.LIST.map((role) => (
                <span key={role} className={styles.hero__roleChip}>{role}</span>
              ))}
            </motion.h2>

            {/* Portrait: mobile = centred card in flow; desktop = pinned full-bleed
                to the left edge with the name overlapping its faded right edge. */}
            <motion.div
              className={styles['hero__portrait']}
              onMouseMove={handlePortraitMove}
            >
              <img
                src={victoriaPortrait}
                alt={PERSONAL_INFO.NAME}
                className={styles['hero__portrait-image']}
              />
              {/* Scanner reveal: encrypted chars stream past a fixed central beam + cursor glow */}
              <div className={styles['hero__scan']} aria-hidden="true">
                <div className={styles['hero__scanStreamMask']}>
                  <div className={styles['hero__scanStream']}>
                    <pre className={styles['hero__scanChars']}>{scanField}</pre>
                    <pre className={styles['hero__scanChars']}>{scanField}</pre>
                  </div>
                </div>
                <div className={styles['hero__scanGlow']} />
              </div>
              {/* Right-edge scrim: fades the portrait into the page so the name keeps
                  contrast where it overlaps (desktop only). */}
              <div className={styles['hero__portraitScrim']} aria-hidden="true" />
            </motion.div>

            {/* Name - the only block that overlaps the portrait edge on desktop */}
            <motion.h1
              className={styles.hero__title}
              initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_MEDIUM }}
              animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
              transition={{ delay: ANIMATION_DELAY.SHORT, duration: ANIMATION_DURATION.MEDIUM, ease: EASING.DEFAULT }}
            >
              <span className={styles.hero__titleMain}>{PERSONAL_INFO.FIRST_NAME}</span>
              <span className={styles.hero__titleAccent}>{PERSONAL_INFO.LAST_NAME}</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className={styles.hero__tagline}
              initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
              animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
              transition={{ delay: ANIMATION_DELAY.LONG, duration: ANIMATION_DURATION.MEDIUM, ease: EASING.DEFAULT }}
            >
              {TAGLINES.HERO}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              className={styles.hero__actions}
              initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
              animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
              transition={{ delay: ANIMATION_DELAY.VERY_LONG, duration: ANIMATION_DURATION.MEDIUM, ease: EASING.DEFAULT }}
            >
              <button
                onClick={() => document.getElementById(NAV_SECTIONS.CONTACT)?.scrollIntoView({ behavior: SCROLL_BEHAVIOR.SMOOTH })}
                className={`${styles.button} ${styles['button--primary']}`}
              >
                {BUTTON_LABELS.GET_IN_TOUCH}
              </button>
              <button
                onClick={() => document.getElementById(NAV_SECTIONS.ABOUT)?.scrollIntoView({ behavior: SCROLL_BEHAVIOR.SMOOTH })}
                className={`${styles.button} ${styles['button--outline']}`}
              >
                {BUTTON_LABELS.LEARN_MORE}
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className={styles.hero__scrollCue}>
          <motion.button
            type="button"
            aria-label="Scroll to About section"
            onClick={() => document.getElementById(NAV_SECTIONS.ABOUT)?.scrollIntoView({ behavior: SCROLL_BEHAVIOR.SMOOTH })}
            className={styles.hero__scrollButton}
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: EASING.EASE_IN_OUT }}
          >
            <ChevronDown className={styles.hero__scrollIcon} />
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section id={NAV_SECTIONS.ABOUT} className={styles.about}>
        <div className={styles.section__container}>
          <div className={styles.about__content}>
            {/* Manifesto - editorial band: ABOUT kicker, display headline, prose */}
            <motion.div
              className={styles.about__manifesto}
              initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_MEDIUM }}
              whileInView={{ opacity: OPACITY.VISIBLE, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: ANIMATION_DELAY.MEDIUM, duration: ANIMATION_DURATION.SLOW, ease: EASING.DEFAULT }}
            >
              <h2 className={styles.about__sectionLabel}>{SECTION_TITLES.ABOUT}</h2>
              <h3 className={styles.about__manifestoTitle}>
                <span className={styles.about__manifestoSentence}>Strong code needs strong culture.</span>{' '}
                <span className={styles.about__manifestoNoWrap}>I build both.</span>
              </h3>
              <div className={styles.about__manifestoProse}>
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
              transition={{ delay: ANIMATION_DELAY.LONG, duration: ANIMATION_DURATION.SLOW, ease: EASING.DEFAULT }}
            >
              <span className={styles.about__kicker}>{ABOUT_CONTENT.IMPACT_TITLE}</span>
              <ul className={styles.about__impactList}>
                {ABOUT_IMPACT.map((item, index) => (
                  <motion.li
                    key={item.label}
                    className={styles.about__impactRow}
                    initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
                    whileInView={{ opacity: OPACITY.VISIBLE, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: index * ANIMATION_DELAY.SHORT, duration: ANIMATION_DURATION.MEDIUM, ease: EASING.DEFAULT }}
                  >
                    <span className={styles.about__impactMetric}>{item.metric}</span>
                    <span className={styles.about__impactLabel}>{item.label}</span>
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
              transition={{ delay: ANIMATION_DELAY.LONG, duration: ANIMATION_DURATION.SLOW, ease: EASING.DEFAULT }}
            >
              <div className={styles.about__termBar} aria-hidden="true">
                <span className={styles.about__termFile}>approach.sh</span>
                <span className={styles.about__termTag}>bash</span>
              </div>
              <div className={styles.about__termBody}>
                <p className={styles.about__termComment} aria-hidden="true"># my approach is simple</p>
                <ol className={styles.about__script}>
                  {ABOUT_APPROACH.map((item, index) => (
                    <motion.li
                      key={index}
                      className={styles.about__scriptLine}
                      initial={{ opacity: OPACITY.HIDDEN, x: INITIAL_OFFSET.X_SMALL }}
                      whileInView={{ opacity: OPACITY.VISIBLE, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ delay: index * ANIMATION_DELAY.SHORT, duration: ANIMATION_DURATION.MEDIUM, ease: EASING.DEFAULT }}
                    >
                      <span className={styles.about__lineNum} aria-hidden="true">{index + 1}</span>
                      <span className={styles.about__code}>
                        <span className={styles.about__cmd}>{item.cmd}</span>
                        {'flag' in item && item.flag ? (
                          <span className={styles.about__flag}> {item.flag}</span>
                        ) : null}
                        <span className={styles.about__quote} aria-hidden="true"> "</span>
                        <span className={styles.about__args}>{item.arg}</span>
                        <span className={styles.about__quote} aria-hidden="true">"</span>
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
              transition={{ delay: ANIMATION_DELAY.VERY_LONG, duration: ANIMATION_DURATION.SLOW, ease: EASING.DEFAULT }}
            >
              <GeometricWireframe className={styles.about__figure} />
              <div className={styles.about__signatureBody}>
                <span className={styles.about__kicker}>{ABOUT_CONTENT.SIGNATURE_KICKER}</span>
                <blockquote className={styles.about__journey}>{ABOUT_CONTENT.BACKGROUND}</blockquote>
              </div>
              <div className={styles.about__signatureFooter}>
                <p className={styles.about__focus}>
                  <span className={styles.about__focusLabel}>{ABOUT_CONTENT.FOCUS_LABEL}</span>
                  {ABOUT_CONTENT.FOCUS}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id={NAV_SECTIONS.EXPERIENCE} className={styles.experience}>
        <div className={styles.section__container}>
          <ScrollReveal>
            <h2 className={styles.section__title}>
              {SECTION_TITLES.EXPERIENCE} <span className={styles.section__titleAccent}>{SECTION_TITLES.EXPERIENCE_ACCENT}</span>
            </h2>
          </ScrollReveal>

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
                <span className={styles.experience__promptCmd}>git log --author=victoria --graph</span>
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

      {/* Philosophy Section */}
      <section id={NAV_SECTIONS.PHILOSOPHY} className={styles.philosophy}>
        <div className={styles.section__container}>
          <ScrollReveal>
            <h2 className={styles.section__title}>
              {SECTION_TITLES.PHILOSOPHY} <span className={styles.section__titleAccent}>{SECTION_TITLES.PHILOSOPHY_ACCENT}</span>
            </h2>
          </ScrollReveal>

          <div className={styles.philosophy__content}>
            <div className={styles.philosophy__layout}>
              <ScrollReveal delay={ANIMATION_DELAY.MEDIUM}>
                <div className={styles.philosophy__statement}>
                  <span className={styles.philosophy__kicker}>{TAGLINES.PHILOSOPHY_KICKER}</span>

                  <blockquote className={styles.philosophy__quote}>
                    {TAGLINES.PHILOSOPHY_QUOTE_LEAD}
                    <span className={styles.philosophy__quoteEmphasis}>{TAGLINES.PHILOSOPHY_QUOTE_EMPHASIS}</span>
                    {TAGLINES.PHILOSOPHY_QUOTE_REST}
                  </blockquote>

                  {/* Mobile-only horizontal band; desktop uses the side-column figure below */}
                  <TangleToClarity variant="horizontal" className={styles.philosophy__band} />

                  <div className={styles.philosophy__principles}>
                    {LEADERSHIP_PRINCIPLES.map((item, index) => (
                      <ScrollReveal key={item.title} delay={ANIMATION_DELAY.LONG + index * ANIMATION_DELAY.MEDIUM}>
                        <div className={styles.philosophy__principle}>
                          <span className={styles.philosophy__principleNumber}>
                            <span className={styles.philosophy__principleNumberBracket}>[</span>
                            {index}
                            <span className={styles.philosophy__principleNumberBracket}>]</span>
                          </span>
                          <h4 className={styles.philosophy__principleTitle}>{item.title}</h4>
                          <p className={styles.philosophy__principleDescription}>{item.description}</p>
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

      {/* Projects Section */}
      <section id={NAV_SECTIONS.PROJECTS} className={styles.projects}>
        <div className={styles.section__container}>
          <ScrollReveal>
            <h2 className={styles.section__title}>
              {SECTION_TITLES.PROJECTS} <span className={styles.section__titleAccent}>{SECTION_TITLES.PROJECTS_ACCENT}</span>
            </h2>
          </ScrollReveal>

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
                              Acquired by Perion <kbd>&#8629;</kbd>
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

      {/* Testimonials Section */}
      <section id={NAV_SECTIONS.TESTIMONIALS} className={styles.testimonials}>
        <div className={styles.section__container}>
          <ScrollReveal>
            <h2 className={styles.section__title}>
              {SECTION_TITLES.TESTIMONIALS} <span className={styles.section__titleAccent}>{SECTION_TITLES.TESTIMONIALS_ACCENT}</span>
            </h2>
          </ScrollReveal>

          <div className={styles.testimonials__content}>
            <SlackTestimonials />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id={NAV_SECTIONS.CONTACT} className={styles.contact}>
        <CodeBackground />
        <div className={styles.section__container}>
          <ScrollReveal>
            <h2 className={styles.section__title}>
              {SECTION_TITLES.CONTACT} <span className={styles.section__titleAccent}>{SECTION_TITLES.CONTACT_ACCENT}</span>
            </h2>
          </ScrollReveal>

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
                      <Mail className={styles.contact__icon} />
                    </div>
                    <div className={styles.contact__methodInfo}>
                      <h4 className={styles.contact__methodTitle}>{CONTACT_CONTENT.EMAIL_LABEL}</h4>
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
                      <Linkedin className={styles.contact__icon} />
                    </div>
                    <div className={styles.contact__methodInfo}>
                      <h4 className={styles.contact__methodTitle}>{CONTACT_CONTENT.LINKEDIN_LABEL}</h4>
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
                      <MapPin className={styles.contact__icon} />
                    </div>
                    <div className={styles.contact__methodInfo}>
                      <h4 className={styles.contact__methodTitle}>{CONTACT_CONTENT.LOCATION_LABEL}</h4>
                      <p className={styles.contact__text}>{PERSONAL_INFO.LOCATION}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footer__container}>
          <div className={styles.footer__content}>
            <blockquote className={styles.footer__quote}>{TAGLINES.FOOTER_QUOTE}</blockquote>
            <p className={styles.footer__copyright}>{COPYRIGHT.TEXT}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
