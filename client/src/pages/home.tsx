import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ExternalLink, User, Briefcase, Heart, Code, Users, MessageCircle } from 'lucide-react';
import victoriaPortrait from '@assets/victoria_pic.png';
import { ParticleSystem } from '@/components/particle-system';
import { Navigation } from '@/components/navigation';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ANIMATION_DURATION, 
  ANIMATION_DELAY, 
  EASING, 
  TRANSFORM, 
  OPACITY, 
  INITIAL_OFFSET,
  ROTATION,
} from '@/constants/layout';
import { CONSOLE_COLORS, CONSOLE_FONT_SIZE } from '@/constants/colors';
import { 
  PERSONAL_INFO, 
  ROLES, 
  TAGLINES, 
  NAV_SECTIONS, 
  SECTION_TITLES,
  BUTTON_LABELS,
  CONSOLE_MESSAGES,
  ASCII_ART,
  CORE_STRENGTHS,
  LEADERSHIP_PRINCIPLES,
  ABOUT_CONTENT,
  CONTACT_CONTENT,
  COPYRIGHT,
  SCROLL_BEHAVIOR,
} from '@/constants/strings';
import styles from './home.module.css';


export default function Home() {

  // Creative console logs for fellow developers
  useEffect(() => {
    // ASCII Art Header
    console.log(ASCII_ART, 
      `color: ${CONSOLE_COLORS.PRIMARY}; font-family: monospace; font-weight: bold;`);

    // Welcome message
    console.log(`%c${CONSOLE_MESSAGES.WELCOME_TITLE}`, 
      `color: ${CONSOLE_COLORS.CYAN}; font-size: ${CONSOLE_FONT_SIZE.XLARGE}; font-weight: bold;`);
    
    console.log(`%c${CONSOLE_MESSAGES.HELLO_DEV}`, 
      `color: ${CONSOLE_COLORS.PURPLE}; font-size: ${CONSOLE_FONT_SIZE.MEDIUM}; font-weight: bold;`);
    
    console.log(`%c${CONSOLE_MESSAGES.CURIOUS_MESSAGE}`, 
      `color: ${CONSOLE_COLORS.GREEN}; font-size: ${CONSOLE_FONT_SIZE.SMALL};`);

    // Tech stack info
    console.log(`\n%c${CONSOLE_MESSAGES.TECH_STACK_TITLE}`, `color: ${CONSOLE_COLORS.ORANGE}; font-weight: bold; font-size: ${CONSOLE_FONT_SIZE.MEDIUM};`);
    console.log(`%c${CONSOLE_MESSAGES.TECH_FRONTEND}`, `color: ${CONSOLE_COLORS.PRIMARY};`);
    console.log(`%c${CONSOLE_MESSAGES.TECH_STYLING}`, `color: ${CONSOLE_COLORS.PRIMARY};`);
    console.log(`%c${CONSOLE_MESSAGES.TECH_UI}`, `color: ${CONSOLE_COLORS.PRIMARY};`);
    console.log(`%c${CONSOLE_MESSAGES.TECH_DEPLOYMENT}`, `color: ${CONSOLE_COLORS.PRIMARY};`);

    // Fun facts
    console.log(`\n%c${CONSOLE_MESSAGES.FUN_FACTS_TITLE}`, `color: ${CONSOLE_COLORS.ORANGE}; font-weight: bold; font-size: ${CONSOLE_FONT_SIZE.MEDIUM};`);
    console.log(`%c${CONSOLE_MESSAGES.FUN_PARTICLES}`, `color: ${CONSOLE_COLORS.INDIGO};`);
    console.log(`%c${CONSOLE_MESSAGES.FUN_GLASS}`, `color: ${CONSOLE_COLORS.INDIGO};`);
    console.log(`%c${CONSOLE_MESSAGES.FUN_MAILTO}`, `color: ${CONSOLE_COLORS.INDIGO};`);
    console.log(`%c${CONSOLE_MESSAGES.FUN_OBSERVER}`, `color: ${CONSOLE_COLORS.INDIGO};`);
    console.log(`%c${CONSOLE_MESSAGES.FUN_DARK}`, `color: ${CONSOLE_COLORS.INDIGO};`);

    // Professional info
    console.log(`\n%c${CONSOLE_MESSAGES.ABOUT_TITLE}`, `color: ${CONSOLE_COLORS.ORANGE}; font-weight: bold; font-size: ${CONSOLE_FONT_SIZE.MEDIUM};`);
    console.log(`%c${CONSOLE_MESSAGES.ABOUT_EXPERIENCE}`, `color: ${CONSOLE_COLORS.PINK};`);
    console.log(`%c${CONSOLE_MESSAGES.ABOUT_PASSION}`, `color: ${CONSOLE_COLORS.PINK};`);
    console.log(`%c${CONSOLE_MESSAGES.ABOUT_CULTURE}`, `color: ${CONSOLE_COLORS.PINK};`);

    // Easter egg
    console.log(`\n%c${CONSOLE_MESSAGES.EASTER_EGG_TITLE}`, `color: ${CONSOLE_COLORS.ORANGE}; font-weight: bold; font-size: ${CONSOLE_FONT_SIZE.MEDIUM};`);
    console.log(`%c${CONSOLE_MESSAGES.EASTER_EGG_HINT}`, `color: ${CONSOLE_COLORS.GREEN};`);

    // Add interactive function
    (window as any).victoria = {
      skills: () => {
        console.log(`%c${CONSOLE_MESSAGES.SKILLS_TITLE}`, `color: ${CONSOLE_COLORS.PRIMARY}; font-size: ${CONSOLE_FONT_SIZE.LARGE}; font-weight: bold;`);
        console.log(`%c${CONSOLE_MESSAGES.SKILLS_LANGUAGES}`, `color: ${CONSOLE_COLORS.PURPLE};`);
        console.log(`%c${CONSOLE_MESSAGES.SKILLS_FRONTEND}`, `color: ${CONSOLE_COLORS.PURPLE};`);
        console.log(`%c${CONSOLE_MESSAGES.SKILLS_BACKEND}`, `color: ${CONSOLE_COLORS.PURPLE};`);
        console.log(`%c${CONSOLE_MESSAGES.SKILLS_CLOUD}`, `color: ${CONSOLE_COLORS.PURPLE};`);
        console.log(`%c${CONSOLE_MESSAGES.SKILLS_LEADERSHIP}`, `color: ${CONSOLE_COLORS.PURPLE};`);
        return CONSOLE_MESSAGES.SKILLS_RETURN;
      },
      contact: () => {
        console.log(`%c${CONSOLE_MESSAGES.CONTACT_TITLE}`, `color: ${CONSOLE_COLORS.ORANGE}; font-size: ${CONSOLE_FONT_SIZE.LARGE}; font-weight: bold;`);
        console.log(`%c   Email: ${PERSONAL_INFO.EMAIL}`, `color: ${CONSOLE_COLORS.GREEN};`);
        console.log(`%c   LinkedIn: ${PERSONAL_INFO.LINKEDIN_URL}`, `color: ${CONSOLE_COLORS.GREEN};`);
        return CONSOLE_MESSAGES.CONTACT_RETURN;
      },
      theme: () => {
        console.log(`%c${CONSOLE_MESSAGES.THEME_TITLE}`, `color: ${CONSOLE_COLORS.INDIGO}; font-size: ${CONSOLE_FONT_SIZE.LARGE}; font-weight: bold;`);
        console.log(`%c${CONSOLE_MESSAGES.THEME_BG}`, `color: ${CONSOLE_COLORS.PURPLE};`);
        console.log(`%c${CONSOLE_MESSAGES.THEME_FG}`, `color: ${CONSOLE_COLORS.PURPLE};`);
        console.log(`%c${CONSOLE_MESSAGES.THEME_PRIMARY}`, `color: ${CONSOLE_COLORS.PURPLE};`);
        console.log(`%c${CONSOLE_MESSAGES.THEME_ACCENT}`, `color: ${CONSOLE_COLORS.PURPLE};`);
        return CONSOLE_MESSAGES.THEME_RETURN;
      }
    };

    // Performance info
    console.log(`\n%c${CONSOLE_MESSAGES.PERFORMANCE_TITLE}`, `color: ${CONSOLE_COLORS.ORANGE}; font-weight: bold; font-size: ${CONSOLE_FONT_SIZE.MEDIUM};`);
    console.log(`%c${CONSOLE_MESSAGES.PERFORMANCE_VITE}`, `color: ${CONSOLE_COLORS.RED};`);
    console.log(`%c${CONSOLE_MESSAGES.PERFORMANCE_LAZY}`, `color: ${CONSOLE_COLORS.RED};`);
    console.log(`%c${CONSOLE_MESSAGES.PERFORMANCE_MINIFIED}`, `color: ${CONSOLE_COLORS.RED};`);

    console.log(`\n%c${CONSOLE_MESSAGES.COLLABORATION_TITLE}`, `color: ${CONSOLE_COLORS.ORANGE}; font-weight: bold; font-size: ${CONSOLE_FONT_SIZE.MEDIUM};`);
    console.log(`%c${CONSOLE_MESSAGES.COLLABORATION_HINT}`, `color: ${CONSOLE_COLORS.GREEN};`);
    
    console.log(`\n%c${CONSOLE_MESSAGES.DIVIDER}`, `color: ${CONSOLE_COLORS.GRAY};`);
    console.log(`%c ${TAGLINES.PRIMARY} 🎯`, `color: ${CONSOLE_COLORS.INDIGO}; font-style: italic;`);
    console.log(`%c${CONSOLE_MESSAGES.DIVIDER}`, `color: ${CONSOLE_COLORS.GRAY};`);
  }, []);

  return (
    <div className={styles.page}>
      <ParticleSystem />
      <Navigation />

      {/* Hero Section */}
      <section id={NAV_SECTIONS.HERO} className={styles.hero}>
        <div className={styles.hero__container}>
          <motion.div
            initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_LARGE }}
            animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
            transition={{ duration: ANIMATION_DURATION.VERY_SLOW, ease: EASING.DEFAULT }}
          >
            <div className={styles.hero__portraitWrapper}>
              <motion.div
                className={styles.hero__portrait}
                animate={{ y: [0, TRANSFORM.FLOAT_OFFSET, 0] }}
                transition={{ duration: ANIMATION_DURATION.FLOAT, repeat: Infinity, ease: EASING.EASE_IN_OUT }}
              >
                <img
                  src={victoriaPortrait}
                  alt={PERSONAL_INFO.NAME}
                  className={styles.hero__portraitImage}
                />
              </motion.div>
            </div>

            <motion.h1
              className={styles.hero__title}
              initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_MEDIUM }}
              animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
              transition={{ delay: ANIMATION_DELAY.MEDIUM, duration: ANIMATION_DURATION.SLOW }}
            >
              <span className={styles.hero__titleMain}>{PERSONAL_INFO.FIRST_NAME}</span>
              <span className={styles.hero__titleAccent}>{PERSONAL_INFO.LAST_NAME}</span>
            </motion.h1>

            <motion.h2
              className={styles.hero__subtitle}
              initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
              animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
              transition={{ delay: ANIMATION_DELAY.LONG, duration: ANIMATION_DURATION.SLOW }}
            >
              {ROLES.FULL_SUBTITLE}
            </motion.h2>

            <motion.p
              className={styles.hero__tagline}
              initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
              animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
              transition={{ delay: ANIMATION_DELAY.VERY_LONG, duration: ANIMATION_DURATION.SLOW }}
            >
              {TAGLINES.HERO}
            </motion.p>

            <motion.div
              className={styles.hero__actions}
              initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_SMALL }}
              animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
              transition={{ delay: ANIMATION_DELAY.EXTRA_LONG, duration: ANIMATION_DURATION.SLOW }}
            >
              <Button
                onClick={() => document.getElementById(NAV_SECTIONS.CONTACT)?.scrollIntoView({ behavior: SCROLL_BEHAVIOR.SMOOTH })}
                className={`${styles.button} ${styles['button--primary']}`}
              >
                {BUTTON_LABELS.GET_IN_TOUCH}
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById(NAV_SECTIONS.ABOUT)?.scrollIntoView({ behavior: SCROLL_BEHAVIOR.SMOOTH })}
                className={`${styles.button} ${styles['button--outline']}`}
              >
                {BUTTON_LABELS.LEARN_MORE}
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated geometric elements */}
        <motion.div
          className={`${styles.hero__decoration} ${styles['hero__decoration--square']}`}
          animate={{ 
            y: [0, TRANSFORM.FLOAT_OFFSET, 0], 
            rotate: [TRANSFORM.ROTATE_INITIAL, TRANSFORM.ROTATE_END, TRANSFORM.ROTATE_INITIAL] 
          }}
          transition={{ duration: ANIMATION_DURATION.ROTATE_SLOW, repeat: Infinity, ease: EASING.EASE_IN_OUT }}
        />
        <motion.div
          className={`${styles.hero__decoration} ${styles['hero__decoration--circle']}`}
          animate={{ 
            scale: [TRANSFORM.SCALE_MIN, TRANSFORM.SCALE_PULSE_LARGE, TRANSFORM.SCALE_MIN], 
            opacity: [OPACITY.SUBTLE, OPACITY.MEDIUM, OPACITY.SUBTLE] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: EASING.EASE_IN_OUT }}
        />
        <motion.div
          className={`${styles.hero__decoration} ${styles['hero__decoration--dot']}`}
          animate={{ y: [0, TRANSFORM.FLOAT_OFFSET_LARGE, 0] }}
          transition={{ duration: ANIMATION_DURATION.FLOAT, repeat: Infinity, ease: EASING.EASE_IN_OUT, delay: ANIMATION_DELAY.ANIMATION_OFFSET }}
        />
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

            <div className={styles.about__grid}>
              <ScrollReveal delay={ANIMATION_DELAY.MEDIUM}>
                <div className={styles.about__portraitWrapper}>
                  <motion.div
                    className={styles.about__portrait}
                    whileHover={{ scale: TRANSFORM.HOVER_SCALE, rotateY: TRANSFORM.ROTATE_Y }}
                    transition={{ duration: ANIMATION_DURATION.NORMAL }}
                  >
                    <img
                      src={victoriaPortrait}
                      alt={PERSONAL_INFO.NAME}
                      className={styles.about__portraitImage}
                    />
                  </motion.div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={ANIMATION_DELAY.LONG}>
                <div className={`${styles.card} ${styles['card--hover']}`}>
                  <h3 className={styles.card__title}>{TAGLINES.ABOUT_TITLE}</h3>
                  <p className={styles.card__text}>
                    {ABOUT_CONTENT.INTRO}
                  </p>
                  <p className={styles.card__text}>
                    {ABOUT_CONTENT.JOURNEY}
                  </p>
                  <p className={styles.card__text}>
                    {ABOUT_CONTENT.BACKGROUND}
                  </p>
                  
                  <div className={styles.strengths}>
                    <h4 className={styles.strengths__title}>{ABOUT_CONTENT.STRENGTHS_TITLE}</h4>
                    <div className={styles.strengths__list}>
                      {CORE_STRENGTHS.map((strength, index) => (
                        <motion.div
                          key={index}
                          className={styles.strengths__item}
                          initial={{ opacity: OPACITY.HIDDEN, x: INITIAL_OFFSET.X_SMALL }}
                          whileInView={{ opacity: OPACITY.VISIBLE, x: 0 }}
                          transition={{ delay: index * ANIMATION_DELAY.SHORT, duration: ANIMATION_DURATION.MEDIUM }}
                        >
                          <motion.div
                            className={styles.strengths__dot}
                            animate={{ scale: [TRANSFORM.SCALE_MIN, TRANSFORM.SCALE_PULSE_MAX, TRANSFORM.SCALE_MIN] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * ANIMATION_DELAY.MEDIUM }}
                          />
                          <span className={styles.strengths__text}>{strength}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
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
                    animate={{ scale: [TRANSFORM.SCALE_MIN, TRANSFORM.SCALE_MAX, TRANSFORM.SCALE_MIN], boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 10px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)'] }}
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
                  title: "Full-Stack Engineer at Swish.AI",
                  initials: "OF",
                },
                {
                  quote: "Victoria's leadership has been instrumental in optimizing project management and team collaboration. Her adaptability and strategic mindset, combined with technical expertise and leadership acumen, drive innovation and achieve results.",
                  name: "Barak Maoz",
                  title: "Senior Data/Back-End Engineer at Swish.ai",
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
                  title: "QA Engineer at ASSIST Software",
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
            <div className={styles.footer__name}>{PERSONAL_INFO.NAME}</div>
            <p className={styles.footer__tagline}>{TAGLINES.PRIMARY}</p>
            <div className={styles.footer__social}>
              <motion.a
                href={`mailto:${PERSONAL_INFO.EMAIL}`}
                className={styles.footer__socialLink}
                whileHover={{ scale: TRANSFORM.HOVER_SCALE_LARGE }}
              >
                <Mail className={styles.footer__socialIcon} />
              </motion.a>
              <motion.a
                href={PERSONAL_INFO.LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.footer__socialLink}
                whileHover={{ scale: TRANSFORM.HOVER_SCALE_LARGE }}
              >
                <ExternalLink className={styles.footer__socialIcon} />
              </motion.a>
            </div>
            <p className={styles.footer__copyright}>{COPYRIGHT.TEXT}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
