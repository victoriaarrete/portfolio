import { useState, useEffect, useRef, useMemo, type MouseEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Mail, MapPin, ExternalLink, User, Briefcase, Heart, Code, Users, MessageCircle, Brain, Zap, ChevronDown } from 'lucide-react';
import victoriaPortrait from '@assets/victoria_pic.png';
import { ParticleSystem } from '@/components/particle-system';
import { Navigation } from '@/components/navigation';
import { ScrollReveal } from '@/components/scroll-reveal';
import { CodeBackground, buildField } from '@/components/code-background';
import { Card, CardContent } from '@/components/ui/card';
import {
  ANIMATION_DURATION, 
  ANIMATION_DELAY, 
  EASING, 
  TRANSFORM, 
  OPACITY, 
  INITIAL_OFFSET,
  ROTATION,
} from '@/constants/layout';
import {
  PERSONAL_INFO,
  ROLES,
  TAGLINES,
  NAV_SECTIONS,
  SECTION_TITLES,
  BUTTON_LABELS,
  CORE_STRENGTHS,
  LEADERSHIP_PRINCIPLES,
  ABOUT_CONTENT,
  ABOUT_APPROACH,
  ABOUT_IMPACT,
  CONTACT_CONTENT,
  COPYRIGHT,
  SCROLL_BEHAVIOR,
} from '@/constants/strings';
import { mountConsoleSignature } from '@/lib/console-signature';
import styles from './home.module.css';

const STRENGTH_ICONS = [Brain, Users, MessageCircle, Zap] as const;

export default function Home() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  // Same generator as the page-level code field (unified look); enough glyphs to
  // fill the portrait so the overlay reaches the content line on every device.
  const scanField = useMemo(() => buildField(6000), []);

  // Anchor the code field's fade-out to the hero's content line (role chips /
  // tagline). The hero content is vertically centred in a 100vh section, so the
  // line sits at a different % of the hero on every viewport height — a fixed
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
    mountConsoleSignature(victoriaPortrait);
  }, []);

  return (
    <div className={styles.page}>
      <ParticleSystem />
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} id={NAV_SECTIONS.HERO} className={styles.hero}>
        <CodeBackground variant="band" />
        <div className={styles.hero__container}>
          <motion.div
            className={styles.hero__content}
            initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_LARGE }}
            animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
            transition={{ duration: ANIMATION_DURATION.VERY_SLOW, ease: EASING.DEFAULT }}
          >
            {/* Portrait at the top center */}
            <div className={styles['hero__portrait-wrapper']}>
              <motion.div
                className={styles['hero__portrait']}
                onMouseMove={handlePortraitMove}
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: EASING.EASE_IN_OUT }}
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
              </motion.div>
            </div>

            <div className={styles.hero__intro}>
            {/* Name below portrait */}
            <motion.h1
              className={styles.hero__title}
              initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_MEDIUM }}
              animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
              transition={{ delay: ANIMATION_DELAY.SHORT, duration: ANIMATION_DURATION.MEDIUM, ease: EASING.DEFAULT }}
            >
              <span className={styles.hero__titleMain}>{PERSONAL_INFO.FIRST_NAME}</span>
              <span className={styles.hero__titleAccent}>{PERSONAL_INFO.LAST_NAME}</span>
            </motion.h1>

            {/* Roles */}
            <motion.h2
              className={styles.hero__roles}
              aria-label={ROLES.FULL_SUBTITLE}
              initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
              animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
              transition={{ delay: ANIMATION_DELAY.MEDIUM, duration: ANIMATION_DURATION.MEDIUM, ease: EASING.DEFAULT }}
            >
              {ROLES.LIST.map((role) => (
                <span key={role} className={styles.hero__roleChip}>{role}</span>
              ))}
            </motion.h2>

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
            </div>
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
            <ScrollReveal>
              <h2 className={styles.section__title}>
                {SECTION_TITLES.ABOUT} <span className={styles.section__titleAccent}>{SECTION_TITLES.ABOUT_ACCENT}</span>
              </h2>
            </ScrollReveal>

            <div className={styles.about__bento}>
              {/* Manifesto */}
              <motion.div
                className={`${styles.card} ${styles['card--hover']} ${styles.about__manifesto}`}
                initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_MEDIUM }}
                whileInView={{ opacity: OPACITY.VISIBLE, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: ANIMATION_DELAY.MEDIUM, duration: ANIMATION_DURATION.SLOW, ease: EASING.DEFAULT }}
              >
                <span className={styles.about__rail} aria-hidden="true" />
                <h3 className={styles.about__manifestoTitle}>{TAGLINES.ABOUT_TITLE}</h3>
                <p className={styles.about__lead}>{ABOUT_CONTENT.INTRO}</p>
                <p className={styles.about__body}>{ABOUT_CONTENT.PHILOSOPHY}</p>
              </motion.div>

              {/* Impact — outcomes, not adjectives (replaces the duplicate portrait) */}
              <motion.div
                className={`${styles.card} ${styles['card--hover']} ${styles.about__impactTile}`}
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

              {/* Method */}
              <motion.div
                className={`${styles.card} ${styles['card--hover']} ${styles.about__method}`}
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
                  <p className={styles.about__termComment} aria-hidden="true">#!/bin/bash</p>
                  <p className={styles.about__termComment}># {ABOUT_CONTENT.APPROACH_TITLE}</p>
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
                        <span className={styles.about__lineNum} aria-hidden="true">{`0${index + 1}`}</span>
                        <span className={styles.about__cmd}>{item.cmd}</span>
                        <span className={styles.about__args}> {item.args}</span>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </motion.div>

              {/* Strengths */}
              <motion.div
                className={`${styles.card} ${styles['card--hover']} ${styles.about__strengthsTile}`}
                initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_MEDIUM }}
                whileInView={{ opacity: OPACITY.VISIBLE, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: ANIMATION_DELAY.VERY_LONG, duration: ANIMATION_DURATION.SLOW, ease: EASING.DEFAULT }}
              >
                <span className={styles.about__kicker}>{ABOUT_CONTENT.STRENGTHS_TITLE}</span>
                <div className={styles.about__strengthGrid}>
                  {CORE_STRENGTHS.map((strength, index) => {
                    const Icon = STRENGTH_ICONS[index];
                    return (
                      <motion.div
                        key={index}
                        className={styles.about__strengthTile}
                        initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
                        whileInView={{ opacity: OPACITY.VISIBLE, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ delay: index * ANIMATION_DELAY.SHORT, duration: ANIMATION_DURATION.MEDIUM, ease: EASING.DEFAULT }}
                      >
                        <span className={styles.about__strengthIcon}>
                          <Icon className={styles.about__strengthGlyph} />
                        </span>
                        <span className={styles.about__strengthLabel}>{strength}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Signature */}
              <motion.div
                className={`${styles.card} ${styles['card--hover']} ${styles.about__signature}`}
                initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_MEDIUM }}
                whileInView={{ opacity: OPACITY.VISIBLE, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: ANIMATION_DELAY.VERY_LONG, duration: ANIMATION_DURATION.SLOW, ease: EASING.DEFAULT }}
              >
                <span className={styles.about__quoteMark} aria-hidden="true">&ldquo;</span>
                <div className={styles.about__signatureBody}>
                  <span className={styles.about__kicker}>{ABOUT_CONTENT.SIGNATURE_KICKER}</span>
                  <blockquote className={styles.about__journey}>{ABOUT_CONTENT.BACKGROUND}</blockquote>
                </div>
                <div className={styles.about__signatureFooter}>
                  <p className={styles.about__focus}>
                    <span className={styles.about__focusLabel}>{ABOUT_CONTENT.FOCUS_LABEL}</span>
                    {ABOUT_CONTENT.FOCUS}
                  </p>
                  <span className={styles.about__sign}>{PERSONAL_INFO.FIRST_NAME}</span>
                </div>
              </motion.div>
            </div>
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
            <div className={styles.experience__timeline}>
              <div className={styles.experience__timelineLine}></div>

              {/* Current Position - Swish.ai */}
              <ScrollReveal delay={ANIMATION_DELAY.MEDIUM}>
                <div className={styles.experience__item}>
                  <motion.div
                    className={`${styles.experience__dot} ${styles['experience__dot--active']}`}
                    animate={{ scale: [TRANSFORM.SCALE_MIN, TRANSFORM.SCALE_MAX, TRANSFORM.SCALE_MIN], boxShadow: ['0 0 0 0 rgba(235, 226, 208, 0.5)', '0 0 0 10px rgba(235, 226, 208, 0)', '0 0 0 0 rgba(235, 226, 208, 0)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className={`${styles.experience__card} ${styles.card} ${styles['card--hover']}`}>
                    <div className={styles.experience__header}>
                      <h3 className={styles.experience__title}>R&D Team Leader</h3>
                      <span className={styles.experience__period}>April 2024 - Present</span>
                    </div>
                    <h4 className={styles.experience__company}>Swish.ai • Tel Aviv, Israel</h4>
                    <p className={styles.experience__description}>
                      Leading IT workflow optimization with a people-first approach. Driving innovation through AI-driven solutions while fostering collaborative, growth-focused culture using Scrum methodology.
                    </p>
                    <div className={styles.experience__tags}>
                      {['AI Automation', 'Team Leadership', 'Scrum', 'Workflow Optimization'].map((skill) => (
                        <span key={skill} className={styles.experience__tag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Perion Network - R&D Team Leader */}
              <ScrollReveal delay={ANIMATION_DELAY.LONG}>
                <div className={styles.experience__item}>
                  <div className={styles.experience__dot} />
                  <div className={`${styles.experience__card} ${styles.card} ${styles['card--hover']}`}>
                    <div className={styles.experience__header}>
                      <h3 className={styles.experience__title}>R&D Team Leader</h3>
                      <span className={styles.experience__period}>April 2021 - April 2024</span>
                    </div>
                    <h4 className={styles.experience__company}>Perion Network • Holon, Israel</h4>
                    <p className={styles.experience__description}>
                      Led a team of 5 developers and QA through scrum ceremonies, managing back-office projects focusing on configurations for layouts, posts, and advertising logic. Contributed to microservices architecture with MongoDB integration.
                    </p>
                    <div className={styles.experience__tags}>
                      {['Team Management', 'Microservices', 'MongoDB', 'Ad Tech'].map((skill) => (
                        <span key={skill} className={styles.experience__tag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Perion Network - Full Stack Developer */}
              <ScrollReveal delay={ANIMATION_DELAY.VERY_LONG}>
                <div className={styles.experience__item}>
                  <div className={styles.experience__dot} />
                  <div className={`${styles.experience__card} ${styles.card} ${styles['card--hover']}`}>
                    <div className={styles.experience__header}>
                      <h3 className={styles.experience__title}>Full Stack Developer</h3>
                      <span className={styles.experience__period}>June 2018 - April 2021</span>
                    </div>
                    <h4 className={styles.experience__company}>Perion Network • Holon, Israel</h4>
                    <p className={styles.experience__description}>
                      Specialized in developing impactful web solutions using React and Next.js. Built scalable backend solutions with Node.js and MongoDB for microservices architecture.
                    </p>
                    <div className={styles.experience__tags}>
                      {['React', 'Next.js', 'Node.js', 'MongoDB'].map((skill) => (
                        <span key={skill} className={styles.experience__tag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Mind Connect */}
              <ScrollReveal delay={ANIMATION_DELAY.EXTRA_LONG}>
                <div className={styles.experience__item}>
                  <div className={styles.experience__dot} />
                  <div className={`${styles.experience__card} ${styles.card} ${styles['card--hover']}`}>
                    <div className={styles.experience__header}>
                      <h3 className={styles.experience__title}>Full Stack Developer</h3>
                      <span className={styles.experience__period}>March 2016 - April 2018</span>
                    </div>
                    <h4 className={styles.experience__company}>Mind Connect • Rishon LeZion, Israel</h4>
                    <p className={styles.experience__description}>
                      Designed and developed a call center management platform (web application) with full-stack implementation using modern technologies and custom solutions.
                    </p>
                    <div className={styles.experience__tags}>
                      {['PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap', 'Google Maps API'].map((skill) => (
                        <span key={skill} className={styles.experience__tag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* PowerTech */}
              <ScrollReveal delay={ANIMATION_DELAY.STAGGER_1}>
                <div className={styles.experience__item}>
                  <div className={styles.experience__dot} />
                  <div className={`${styles.experience__card} ${styles.card} ${styles['card--hover']}`}>
                    <div className={styles.experience__header}>
                      <h3 className={styles.experience__title}>Full Stack Developer</h3>
                      <span className={styles.experience__period}>February 2015 - March 2016</span>
                    </div>
                    <h4 className={styles.experience__company}>PowerTech • Rishon LeZion, Israel</h4>
                    <p className={styles.experience__description}>
                      Designed and implemented a project management web application using .NET framework and Microsoft SQL Server with modern frontend technologies.
                    </p>
                    <div className={styles.experience__tags}>
                      {['ASP.NET', 'Microsoft SQL Server', 'JavaScript', 'HTML', 'CSS'].map((skill) => (
                        <span key={skill} className={styles.experience__tag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Early Career */}
              <ScrollReveal delay={ANIMATION_DELAY.STAGGER_2}>
                <div className={styles.experience__item}>
                  <div className={styles.experience__dot} />
                  <div className={`${styles.experience__card} ${styles.card} ${styles['card--hover']}`}>
                    <div className={styles.experience__header}>
                      <h3 className={styles.experience__title}>Full Stack Developer</h3>
                      <span className={styles.experience__period}>December 2012 - January 2015</span>
                    </div>
                    <h4 className={styles.experience__company}>Early Career Development • Penza, Russia</h4>
                    <p className={styles.experience__description}>
                      Foundation years building comprehensive full-stack development skills and gaining experience in various technologies and project management methodologies.
                    </p>
                    <div className={styles.experience__tags}>
                      {['Full Stack Development', 'Project Management', 'Software Architecture'].map((skill) => (
                        <span key={skill} className={styles.experience__tag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Education */}
              <ScrollReveal delay={ANIMATION_DELAY.STAGGER_3}>
                <div className={styles.experience__item}>
                  <div className={styles.experience__dot} />
                  <div className={`${styles.experience__card} ${styles.card} ${styles['card--hover']}`}>
                    <div className={styles.experience__header}>
                      <h3 className={styles.experience__title}>Master of Science</h3>
                      <span className={styles.experience__period}>2007 - 2012</span>
                    </div>
                    <h4 className={styles.experience__company}>Penza State University • Computer Science</h4>
                    <p className={styles.experience__description}>
                      Advanced studies in Computer Science, building the foundation for solving complex problems and empowering teams to grow through collaboration, accountability, and purpose.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
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
            <ScrollReveal delay={ANIMATION_DELAY.MEDIUM}>
              <div className={`${styles.philosophy__card} ${styles['card--hover']}`}>
                <div className={styles.philosophy__iconWrapper}>
                  <motion.div
                    className={styles.philosophy__icon}
                    animate={{ rotate: [ROTATION.ZERO, ROTATION.FULL] }}
                    transition={{ duration: ANIMATION_DURATION.ROTATE_VERY_SLOW, repeat: Infinity, ease: EASING.LINEAR }}
                  >
                    <MessageCircle className="w-full h-full" />
                  </motion.div>
                </div>

                <blockquote className={styles.philosophy__quote}>
                  {TAGLINES.PHILOSOPHY_QUOTE}
                </blockquote>

                <div className={styles.philosophy__principles}>
                  {LEADERSHIP_PRINCIPLES.map((item, index) => {
                    const IconComponent = index === 0 ? Heart : index === 1 ? Users : Briefcase;
                    return (
                      <ScrollReveal key={index} delay={ANIMATION_DELAY.LONG + index * ANIMATION_DELAY.MEDIUM}>
                        <div className={styles.philosophy__principle}>
                          <div className={styles.philosophy__principleIconWrapper}>
                            <IconComponent className={styles.philosophy__principleIcon} />
                          </div>
                          <h4 className={styles.philosophy__principleTitle}>{item.title}</h4>
                          <p className={styles.philosophy__principleDescription}>{item.description}</p>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
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

          <div className={styles.projects__grid}>
            {[
              {
                icon: Code,
                title: 'AI Workflow Optimizer',
                company: 'Swish.ai',
                description: 'Led development of AI-driven automation platform that optimizes IT workflows, reducing manual tasks by 60% and improving team efficiency across multiple departments.',
                tags: ['AI/ML', 'Automation', 'Workflow'],
              },
              {
                icon: Briefcase,
                title: 'Content Arbitrage Platform',
                company: 'Perion Network',
                description: 'Built scalable microservices architecture for content arbitrage market, handling millions of requests daily with optimized ad delivery and configuration management systems.',
                tags: ['Microservices', 'AdTech', 'Scale'],
              },
              {
                icon: Users,
                title: 'Internal Productivity Tools',
                company: 'Multiple Organizations',
                description: 'Designed and implemented custom productivity tools that streamlined development workflows, improved team collaboration, and enhanced project management across R&D teams.',
                tags: ['Tools', 'Productivity', 'Collaboration'],
              },
            ].map((project, index) => (
              <ScrollReveal key={index} delay={index * ANIMATION_DELAY.MEDIUM}>
                <div className={styles.projects__card}>
                  <div className={styles.projects__iconWrapper}>
                    <motion.div
                      className={styles.projects__iconBg}
                      whileHover={{ rotate: ROTATION.FULL }}
                      transition={{ duration: ANIMATION_DURATION.MEDIUM }}
                    >
                      <project.icon className={styles.projects__icon} />
                    </motion.div>
                    <h3 className={styles.projects__title}>{project.title}</h3>
                    <p className={styles.projects__company}>{project.company}</p>
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
              </ScrollReveal>
            ))}
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
            <div className={styles.testimonials__grid}>
              {[
                {
                  quote: "Victoria has a unique ability to challenge conventional thinking and drive meaningful improvements. Her insights and creative approach led to more efficient processes and higher-quality outcomes. Working with her was both inspiring and rewarding.",
                  name: "Ofek",
                  title: "Full-Stack Engineer",
                  initials: "OF",
                },
                {
                  quote: "Victoria's leadership has been instrumental in optimizing project management and team collaboration. Her adaptability and strategic mindset, combined with technical expertise and leadership acumen, drive innovation and achieve results.",
                  name: "Barak Maoz",
                  title: "Senior Data/Back-End Engineer",
                  initials: "BM",
                },
                {
                  quote: "Victoria consistently demonstrated a willingness to provide help and support. Her communication skills were always effective and clear. As a true leader, she never failed to bring value to our collaborative efforts. Working with Victoria was an enriching experience!",
                  name: "Palie Răzvan-Mircea",
                  title: "Frontend Developer",
                  initials: "PR",
                },
                {
                  quote: "I've worked with Victoria almost a full year. She's always willing to lend a hand to anyone who needs it. Her ability to overcome challenges with a smile made her stand out as a cut above the rest. Her constant communication helped lift our spirits in challenging situations.",
                  name: "Chirieac Lăcrămioara",
                  title: "QA Engineer",
                  initials: "CL",
                },
              ].map((testimonial, index) => (
                <ScrollReveal key={index} delay={index * ANIMATION_DELAY.MEDIUM}>
                  <div className={styles.testimonials__card}>
                    <div>
                      <motion.div
                        className={styles.testimonials__icon}
                        animate={{ rotate: [ROTATION.ZERO, TRANSFORM.ROTATE_RANGE, -TRANSFORM.ROTATE_RANGE, ROTATION.ZERO] }}
                        transition={{ duration: 4, repeat: Infinity, ease: EASING.EASE_IN_OUT }}
                      >
                        <MessageCircle className="w-full h-full" />
                      </motion.div>
                      <p className={styles.testimonials__quote}>"{testimonial.quote}"</p>
                    </div>
                    <div className={styles.testimonials__author}>
                      <div className={styles.testimonials__avatar}>
                        <span className={styles.testimonials__initials}>{testimonial.initials}</span>
                      </div>
                      <div className={styles.testimonials__authorInfo}>
                        <h4 className={styles.testimonials__name}>{testimonial.name}</h4>
                        <p className={styles.testimonials__title}>{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
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
              <div className={styles.contact__card}>
                <h3 className={styles.contact__title}>{CONTACT_CONTENT.TITLE}</h3>
                <p className={styles.contact__intro}>
                  {CONTACT_CONTENT.INTRO}
                </p>

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
                      <ExternalLink className={styles.contact__icon} />
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
            <div className={styles.footer__name}>{PERSONAL_INFO.INITIALS}</div>
            <blockquote className={styles.footer__quote}>{TAGLINES.FOOTER_QUOTE}</blockquote>
            <p className={styles.footer__copyright}>{COPYRIGHT.TEXT}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
