import { ScrollReveal } from '@/shared/components/scroll-reveal/scroll-reveal';
import styles from './section-title.module.css';

/** The shared section header: reveal-on-scroll h2 with an accented second word.
 *  Pass `id` so the enclosing <section> can reference it via aria-labelledby. */
export function SectionTitle({
  title,
  accent,
  id,
}: {
  title: string;
  accent: string;
  id?: string;
}) {
  return (
    <ScrollReveal>
      <h2 id={id} className={styles.section__title}>
        {title} <span className={styles['section__title-accent']}>{accent}</span>
      </h2>
    </ScrollReveal>
  );
}
