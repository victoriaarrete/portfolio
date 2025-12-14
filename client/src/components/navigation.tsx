import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { SCROLL, TRANSFORM, ANIMATION_DELAY, OPACITY, INITIAL_OFFSET, ANIMATION_DURATION, MOBILE_MENU } from '@/constants/layout';
import { NAV_ITEMS, NAV_SECTIONS, PERSONAL_INFO, SCROLL_BEHAVIOR, ARIA_LABELS } from '@/constants/strings';
import styles from './navigation.module.css';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL.TRIGGER_OFFSET);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: SCROLL_BEHAVIOR.SMOOTH, block: SCROLL_BEHAVIOR.BLOCK_START });
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={navigationClass}
    >
      <div className={styles.navigation__container}>
        <motion.div
          className={styles.navigation__logo}
          whileHover={{ scale: TRANSFORM.HOVER_SCALE_SMALL }}
          onClick={() => scrollToSection(NAV_SECTIONS.HERO)}
        >
          {PERSONAL_INFO.INITIALS}
        </motion.div>

        {/* Desktop Navigation */}
        <div className={styles.navigation__menu}>
          {NAV_ITEMS.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${styles.navigation__item} ${styles['navigation__item--animate']}`}
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
          className={styles.navigation__mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={ARIA_LABELS.TOGGLE_MOBILE_MENU}
        >
          {isMobileMenuOpen ? (
            <X className={styles.navigation__mobileIcon} />
          ) : (
            <Menu className={styles.navigation__mobileIcon} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: OPACITY.HIDDEN, maxHeight: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? OPACITY.VISIBLE : OPACITY.HIDDEN,
          maxHeight: isMobileMenuOpen ? MOBILE_MENU.MAX_HEIGHT_OPEN : MOBILE_MENU.MAX_HEIGHT_CLOSED,
        }}
        transition={{ duration: ANIMATION_DURATION.NORMAL }}
        className={mobileMenuClass}
      >
        <div className={styles.navigation__mobileItems}>
          {NAV_ITEMS.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`${styles.navigation__mobileItem} ${styles['navigation__mobile-item--animate']}`}
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
