import { useEffect } from 'react';
import { ParticleSystem } from '@/shared/components/particle-system/particle-system';
import { Navigation } from '@/shared/components/navigation/navigation';
import { SCROLL_BEHAVIOR } from '@/shared/constants/strings';
import { mountConsoleSignature } from '@/shared/lib/console-signature';
import { Hero } from '@/features/hero/hero';
import { About } from '@/features/about/about';
import { Experience } from '@/features/experience/experience';
import { Philosophy } from '@/features/philosophy/philosophy';
import { Projects } from '@/features/projects/projects';
import { Testimonials } from '@/features/testimonials/testimonials';
import { Contact } from '@/features/contact/contact';
import { Footer } from '@/features/footer/footer';
import { PrintResume } from '@/features/print-resume/print-resume';
import styles from './home.module.css';

export default function Home() {
  // Install the interactive console experience for fellow developers (window.victoria).
  useEffect(() => {
    mountConsoleSignature();
  }, []);

  // A deep link like /#experience (e.g. an exit from the 404 page) loads the SPA
  // fresh, and the browser's native hash-scroll fires before React has rendered
  // the sections - so it lands at the top. Re-run the scroll ourselves, then
  // re-assert once late assets (web fonts, the hero portrait) settle and the
  // final page height is known.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    let cancelled = false;
    const scrollToTarget = () => {
      if (cancelled) return;
      // 'instant', NOT 'auto': the page sets a global `scroll-behavior: smooth`,
      // and 'auto' defers to that CSS - so an in-flight smooth animation gets
      // interrupted by the next settle signal and never lands. 'instant' forces
      // an immediate jump that can't be chased or overshoot.
      document
        .getElementById(id)
        ?.scrollIntoView({ block: SCROLL_BEHAVIOR.BLOCK_START, behavior: 'instant' });
    };
    const raf = requestAnimationFrame(scrollToTarget);
    document.fonts?.ready.then(scrollToTarget);
    if (document.readyState === 'complete') {
      scrollToTarget();
    } else {
      window.addEventListener('load', scrollToTarget, { once: true });
    }
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('load', scrollToTarget);
    };
  }, []);

  return (
    <div className={styles.page}>
      <ParticleSystem />
      <Navigation />

      <main>
        <Hero />
        <About />
        <Experience />
        <Philosophy />
        <Projects />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <PrintResume />
    </div>
  );
}
