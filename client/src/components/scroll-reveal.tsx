import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { ANIMATION_DURATION, ANIMATION_DELAY, EASING, OPACITY, INITIAL_OFFSET } from '@/constants/layout';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function ScrollReveal({ 
  children, 
  delay = ANIMATION_DELAY.NONE, 
  duration = ANIMATION_DURATION.SLOW, 
  className = '' 
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_LARGE }}
      animate={isVisible 
        ? { opacity: OPACITY.VISIBLE, y: 0 } 
        : { opacity: OPACITY.HIDDEN, y: INITIAL_OFFSET.Y_LARGE }
      }
      transition={{
        duration,
        delay,
        ease: EASING.DEFAULT,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
