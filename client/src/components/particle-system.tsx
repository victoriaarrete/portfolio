import { useEffect, useRef } from 'react';
import { PARTICLES, TIMING_MS, PERCENTAGE } from '@/constants/layout';
import { ARIA_LABELS } from '@/constants/strings';

export function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * PARTICLES.SIZE_RANGE + PARTICLES.MIN_SIZE;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * PERCENTAGE.FULL + '%';
      particle.style.animationDuration = Math.random() * PARTICLES.DURATION_RANGE + PARTICLES.MIN_DURATION + 's';
      particle.style.animationDelay = Math.random() * PARTICLES.DELAY_RANGE + 's';
      
      if (container) {
        container.appendChild(particle);
      }
      particles.push(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
          const index = particles.indexOf(particle);
          if (index > -1) {
            particles.splice(index, 1);
          }
        }
      }, TIMING_MS.PARTICLE_LIFESPAN);
    }

    // Create initial particles
    for (let i = 0; i < PARTICLES.COUNT; i++) {
      setTimeout(createParticle, i * TIMING_MS.PARTICLE_STAGGER);
    }

    // Continue creating particles
    const interval = setInterval(createParticle, TIMING_MS.PARTICLE_CREATE_INTERVAL);

    return () => {
      clearInterval(interval);
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden={ARIA_LABELS.PARTICLE_SYSTEM}
    />
  );
}
