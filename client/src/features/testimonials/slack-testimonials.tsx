import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { useReducedMotion } from 'motion/react';
import { TESTIMONIALS } from '@/shared/constants/strings';
import { useScrollReveal } from '@/shared/hooks/use-scroll-reveal';
import styles from './slack-testimonials.module.css';

// Per-colleague avatar tint + a plausible message time. Index-aligned with
// TESTIMONIALS (Ofek, Barak, Palie, Chirieac). Warm dark squares so they sit
// in the site palette without turning into a colour wheel.
const META = [
  { tint: '#5c5346', ink: '#efe9dd', time: '9:14 AM' },
  { tint: '#4a443a', ink: '#efe9dd', time: '9:21 AM' },
  { tint: '#54504a', ink: '#efe9dd', time: '11:03 AM' },
  { tint: '#6b5f49', ink: '#f5efe1', time: '2:47 PM' },
] as const;

// Chirieac (the last entry) is the conversation that opens by default; the
// other three read as unread until the visitor clicks them.
const DEFAULT_INDEX = TESTIMONIALS.length - 1;

// Size is driven by a CSS class (so it can respond to the breakpoint — the DM
// avatars grow on mobile); only the tint is inline, since it's per-person data.
function Avatar({ index, className }: { index: number; className: string }) {
  const t = TESTIMONIALS[index];
  const m = META[index];
  return (
    <span
      className={`${styles.avatar} ${className}`}
      style={{ background: m.tint, color: m.ink }}
      aria-hidden="true"
    >
      {t.initials}
    </span>
  );
}

export function SlackTestimonials() {
  const reduce = useReducedMotion();
  // When the panel scrolls into view, the DMs "arrive" one by one (like
  // messages landing in a live conversation), then the open message appears.
  // Trigger only once a good chunk of the panel is on screen (not the default
  // "edge peeks past the fold") so the arrival plays while the visitor is
  // actually looking at it, not below the fold mid-scroll.
  const { ref, isVisible } = useScrollReveal({ threshold: 0.4, rootMargin: '0px' });
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);
  // Indices the visitor has opened (and therefore "read"). The default one
  // starts read; the rest are unread until clicked.
  const [readIndices, setReadIndices] = useState<Set<number>>(() => new Set([DEFAULT_INDEX]));
  // Unread pings that have "landed". The list starts quiet; once the panel is
  // in view, each colleague's `1` badge pops in (and their name bolds) one
  // after another — mimicking messages arriving in a live Slack.
  const [arrivedPings, setArrivedPings] = useState<Set<number>>(() => new Set());
  // Mobile only: Slack's phone UX is a drill-down — the DM list, then tap a row
  // to open the conversation full-screen, back arrow to return. Ignored by the
  // desktop layout (which shows list + conversation side by side).
  const [mobileView, setMobileView] = useState<'list' | 'conversation'>('list');

  useEffect(() => {
    if (!isVisible) return;
    if (reduce) {
      // Reduced motion: land every ping instantly instead of staggering them.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setArrivedPings(new Set(TESTIMONIALS.map((_, i) => i)));
      return;
    }
    // The unread pings land in a random order each visit (not top-to-bottom),
    // so it reads like real messages arriving. Chirieac (the default) is
    // already read and never pings. First lands ~1.4s in, then one per ~320ms.
    const order = TESTIMONIALS.map((_, i) => i).filter((i) => i !== DEFAULT_INDEX);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    const timers = order.map((index, slot) =>
      window.setTimeout(
        () => {
          setArrivedPings((prev) => new Set(prev).add(index));
        },
        1400 + slot * 320,
      ),
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [isVisible, reduce]);

  // Staggered entrance: `order` sequences each element's arrival. Disabled
  // (rendered instantly) under reduced-motion.
  const arrive = (order: number): CSSProperties =>
    reduce
      ? {}
      : {
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          // Rows land 170ms apart; the message waits an extra beat after the
          // list has settled so it reads as "the conversation opening".
          transitionDelay: `${order < TESTIMONIALS.length ? order * 170 : TESTIMONIALS.length * 170 + 250}ms`,
        };

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const backBtnRef = useRef<HTMLButtonElement | null>(null);

  const select = (index: number) => {
    setActiveIndex(index);
    setReadIndices((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };

  const open = (index: number) => {
    select(index);
    setMobileView('conversation');
    // Mobile drill-down: hand focus to the back button once the conversation
    // screen is visible. On desktop the back bar is display:none, so the
    // focus() call no-ops and focus stays on the clicked tab.
    requestAnimationFrame(() => backBtnRef.current?.focus());
  };

  const back = () => {
    setMobileView('list');
    requestAnimationFrame(() => tabRefs.current[activeIndex]?.focus());
  };

  // Standard tabs keyboard pattern: arrows move selection (roving tabindex),
  // Home/End jump. Activation (Enter/Space) is the button's native click.
  const onTablistKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const count = TESTIMONIALS.length;
    let next: number;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        next = (activeIndex + 1) % count;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        next = (activeIndex - 1 + count) % count;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = count - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  const active = TESTIMONIALS[activeIndex];
  const activeMeta = META[activeIndex];

  return (
    <div
      ref={ref}
      className={`${styles.window} ${mobileView === 'conversation' ? styles.showConversation : ''}`}
    >
      <div className={styles.body}>
        {/* Sidebar / mobile "DMs" screen — the direct-message list */}
        <div className={styles.sidebar}>
          <div className={styles.sectionLabel}>Direct messages</div>
          <div
            className={styles.dmList}
            role="tablist"
            aria-label="Colleague testimonials"
            aria-orientation="vertical"
            onKeyDown={onTablistKeyDown}
          >
            {TESTIMONIALS.map((t, index) => {
              const isActive = index === activeIndex;
              // A row reads as "unread" only once its ping has landed (and it
              // hasn't been opened) — before that it sits quiet.
              const isUnread = !readIndices.has(index) && arrivedPings.has(index);
              return (
                <button
                  key={t.initials}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`testimonial-tab-${index}`}
                  aria-controls="testimonial-panel"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${t.name}, ${t.title}${isUnread ? ' (1 unread message)' : ''}`}
                  className={[
                    styles.dm,
                    isActive ? styles.dmActive : '',
                    isUnread ? styles.dmUnread : '',
                  ].join(' ')}
                  style={arrive(index)}
                  onClick={() => open(index)}
                >
                  <Avatar index={index} className={styles.avatarSm} />
                  <span className={styles.dmText}>
                    <span className={styles.dmName}>{t.name}</span>
                    {/* Last-message preview — shown only on the mobile list */}
                    <span className={styles.dmPreview}>{t.quote}</span>
                  </span>
                  {isUnread && (
                    <span className={styles.unreadBadge} aria-hidden="true">
                      1
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversation pane — desktop: always visible; mobile: the drilled-in screen */}
        <div
          className={styles.main}
          role="tabpanel"
          id="testimonial-panel"
          aria-labelledby={`testimonial-tab-${activeIndex}`}
        >
          {/* Mobile-only back bar (the drill-down header) */}
          <div className={styles.backBar}>
            <button
              type="button"
              ref={backBtnRef}
              className={styles.backBtn}
              onClick={back}
              aria-label="Back to direct messages"
            >
              ‹
            </button>
            <Avatar index={activeIndex} className={styles.avatarXs} />
            <div className={styles.backHead}>
              <span className={styles.backName}>{active.name}</span>
              <span className={styles.backRole}>{active.title}</span>
            </div>
          </div>

          <div className={styles.message} style={arrive(TESTIMONIALS.length)}>
            <Avatar index={activeIndex} className={styles.avatarMd} />
            <div className={styles.msgBody}>
              <div className={styles.msgMeta}>
                <span className={styles.msgAuthor}>{active.name}</span>
                <span className={styles.msgTime}>{activeMeta.time}</span>
              </div>
              <div className={styles.msgTitle}>{active.title}</div>
              <div className={styles.msgText}>{active.quote}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
