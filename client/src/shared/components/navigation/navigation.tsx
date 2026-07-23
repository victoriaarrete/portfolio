import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import {
  SCROLL,
  TRANSFORM,
  ANIMATION_DELAY,
  OPACITY,
  INITIAL_OFFSET,
  ANIMATION_DURATION,
  MOBILE_MENU,
} from '@/shared/constants/layout';
import {
  NAV_ITEMS,
  NAV_SECTIONS,
  PERSONAL_INFO,
  SCROLL_BEHAVIOR,
  ARIA_LABELS,
} from '@/shared/constants/strings';
import styles from './navigation.module.css';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const update = () => {
      setIsScrolled(window.scrollY > SCROLL.TRIGGER_OFFSET);

      // Active section = the last one whose top has scrolled past the activation line
      const activationLine = window.innerHeight * SCROLL.ACTIVE_SECTION_RATIO;
      let current = '';
      NAV_ITEMS.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top <= activationLine) {
          current = item.id;
        }
      });
      setActiveSection(current);
    };

    // Coalesce to one layout read per frame - scroll can fire several times
    // per frame and each pass forces layout via getBoundingClientRect.
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: SCROLL_BEHAVIOR.SMOOTH,
        block: SCROLL_BEHAVIOR.BLOCK_START,
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navigationClass = isScrolled
    ? `${styles.navigation} ${styles['navigation--scrolled']}`
    : `${styles.navigation} ${styles['navigation--transparent']}`;

  const mobileMenuClass = isMobileMenuOpen
    ? `${styles['navigation__mobile-menu']} ${styles['navigation__mobile-menu--open']}`
    : `${styles['navigation__mobile-menu']} ${styles['navigation__mobile-menu--closed']}`;

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className={navigationClass}>
      <div className={styles['navigation__container']}>
        <motion.button
          className={styles['navigation__logo']}
          whileHover={{ scale: TRANSFORM.HOVER_SCALE_SMALL }}
          onClick={() => scrollToSection(NAV_SECTIONS.HERO)}
          aria-label="Scroll to top"
        >
          {PERSONAL_INFO.INITIALS}
        </motion.button>

        {/* Desktop Navigation */}
        <div className={styles['navigation__menu']}>
          {NAV_ITEMS.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${styles['navigation__item']} ${styles['navigation__item--animate']} ${activeSection === item.id ? styles['navigation__item--active'] : ''}`}
              aria-current={activeSection === item.id ? 'true' : undefined}
              whileHover={{ scale: TRANSFORM.HOVER_SCALE_SMALL }}
              initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_NEGATIVE_SMALL }}
              animate={{ opacity: OPACITY.VISIBLE, y: 0 }}
              transition={{ delay: index * ANIMATION_DELAY.SHORT }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles['navigation__mobile-toggle']}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={ARIA_LABELS.TOGGLE_MOBILE_MENU}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? (
            <X className={styles['navigation__mobile-icon']} aria-hidden="true" />
          ) : (
            <Menu className={styles['navigation__mobile-icon']} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Scrim behind the open mobile menu - click closes */}
      {isMobileMenuOpen && (
        <motion.div
          className={styles['navigation__backdrop']}
          initial={{ opacity: OPACITY.HIDDEN }}
          animate={{ opacity: OPACITY.VISIBLE }}
          transition={{ duration: ANIMATION_DURATION.NORMAL }}
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: OPACITY.HIDDEN, maxHeight: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? OPACITY.VISIBLE : OPACITY.HIDDEN,
          maxHeight: isMobileMenuOpen ? MOBILE_MENU.MAX_HEIGHT_OPEN : MOBILE_MENU.MAX_HEIGHT_CLOSED,
        }}
        transition={{ duration: ANIMATION_DURATION.NORMAL }}
        className={mobileMenuClass}
        id="mobile-menu"
      >
        <div className={styles['navigation__mobile-items']}>
          {NAV_ITEMS.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${styles['navigation__mobile-item']} ${styles['navigation__mobile-item--animate']} ${activeSection === item.id ? styles['navigation__mobile-item--active'] : ''}`}
              aria-current={activeSection === item.id ? 'true' : undefined}
              initial={{ opacity: OPACITY.HIDDEN, x: INITIAL_OFFSET.X_SMALL }}
              animate={{
                opacity: isMobileMenuOpen ? OPACITY.VISIBLE : OPACITY.HIDDEN,
                x: isMobileMenuOpen ? 0 : INITIAL_OFFSET.X_SMALL,
              }}
              transition={{ delay: index * ANIMATION_DELAY.SHORT }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
