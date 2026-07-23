import { useEffect, useState } from 'react';
import { TAGLINES, COPYRIGHT, COLOPHON } from '@/shared/constants/strings';
import { TIMING_MS } from '@/shared/constants/layout';
import styles from '@/pages/home/home.module.css';

// hourCycle (not hour12: false) so midnight renders 00:14, never 24:14.
const telAvivTime = () =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: COLOPHON.TIME_ZONE,
  }).format(new Date());

export function Footer() {
  const [time, setTime] = useState(telAvivTime);

  useEffect(() => {
    const id = window.setInterval(() => setTime(telAvivTime()), TIMING_MS.COLOPHON_CLOCK_TICK);
    return () => window.clearInterval(id);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <blockquote className={styles.footer__quote}>{TAGLINES.FOOTER_QUOTE}</blockquote>
          <p className={styles.footer__colophon}>
            <span>{COPYRIGHT.SHORT}</span>
            <span aria-hidden="true">{COLOPHON.DIVIDER}</span>
            <span className={styles['footer__colophon-time']}>
              {time} {COLOPHON.TIME_SUFFIX}
            </span>
            <span aria-hidden="true">{COLOPHON.DIVIDER}</span>
            <span>{COLOPHON.TYPE_CREDIT}</span>
            <span aria-hidden="true">{COLOPHON.DIVIDER}</span>
            <a className={styles['footer__colophon-link']} href={COLOPHON.HUMANS_HREF}>
              {COLOPHON.HUMANS_LABEL}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
