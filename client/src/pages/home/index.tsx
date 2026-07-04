import { useEffect } from 'react';
import { ParticleSystem } from '@/components/particle-system';
import { Navigation } from '@/components/navigation';
import { mountConsoleSignature } from '@/lib/console-signature';
import { Hero } from './hero';
import { About } from './about';
import { Experience } from './experience';
import { Philosophy } from './philosophy';
import { Projects } from './projects';
import { Testimonials } from './testimonials';
import { Contact } from './contact';
import { Footer } from './footer';
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
