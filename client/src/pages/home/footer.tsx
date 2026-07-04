import { TAGLINES, COPYRIGHT } from '@/shared/constants/strings';
import styles from './home.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <blockquote className={styles.footer__quote}>{TAGLINES.FOOTER_QUOTE}</blockquote>
          <p className={styles.footer__copyright}>{COPYRIGHT.TEXT}</p>
        </div>
      </div>
    </footer>
  );
}
