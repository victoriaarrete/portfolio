import { useEffect, useRef } from 'react';

export function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleCount = 50;
    const particles: HTMLDivElement[] = [];

    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 4 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDuration = Math.random() * 20 + 10 + 's';
      particle.style.animationDelay = Math.random() * 20 + 's';
      
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
      }, 30000);
    }

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      setTimeout(createParticle, i * 200);
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 600);

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
      aria-hidden="true"
    />
  );
}
