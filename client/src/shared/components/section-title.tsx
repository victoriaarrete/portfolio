import { ScrollReveal } from '@/shared/components/scroll-reveal';
import styles from '@/pages/home/home.module.css';

/** The shared section header: reveal-on-scroll h2 with an accented second word. */
export function SectionTitle({ title, accent }: { title: string; accent: string }) {
  return (
    <ScrollReveal>
      <h2 className={styles.section__title}>
        {title} <span className={styles.section__titleAccent}>{accent}</span>
      </h2>
    </ScrollReveal>
  );
}
