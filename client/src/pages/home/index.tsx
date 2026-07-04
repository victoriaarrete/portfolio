import { useEffect } from 'react';
import { ParticleSystem } from '@/shared/components/particle-system';
import { Navigation } from '@/shared/components/navigation';
import { mountConsoleSignature } from '@/shared/lib/console-signature';
import { Hero } from '@/features/hero/hero';
import { About } from '@/features/about/about';
import { Experience } from '@/features/experience/experience';
import { Philosophy } from '@/features/philosophy/philosophy';
import { Projects } from '@/features/projects/projects';
import { Testimonials } from '@/features/testimonials/testimonials';
import { Contact } from '@/features/contact/contact';
import { Footer } from '@/features/footer/footer';
import styles from './home.module.css';

export default function Home() {
  // Install the interactive console experience for fellow developers (window.victoria).
  useEffect(() => {
    mountConsoleSignature();
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
    </div>
  );
}
