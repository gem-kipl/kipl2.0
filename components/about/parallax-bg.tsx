'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/lib/use-gsap';

gsap.registerPlugin(ScrollTrigger);

/**
 * Abstract frosted-glass shapes drifting at different speeds on scroll —
 * "purity & crystallization" depth behind the About content.
 */
export function ParallaxBg() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((layer) => {
        const speed = Number(layer.dataset.speed || 0);
        gsap.to(layer, {
          yPercent: speed,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      <div
        data-parallax
        data-speed="-30"
        className="glass absolute -left-20 top-[8%] h-80 w-80 rounded-full"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(176,99,58,0.30), transparent 70%)' }}
      />
      <div
        data-parallax
        data-speed="45"
        className="glass absolute right-[-10%] top-[28%] h-[28rem] w-[28rem] rounded-full"
        style={{ background: 'radial-gradient(circle at 60% 40%, rgba(197,129,29,0.22), transparent 70%)' }}
      />
      <div
        data-parallax
        data-speed="-50"
        className="glass absolute left-[15%] top-[58%] h-72 w-72 rounded-[40%]"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(87,76,60,0.18), transparent 72%)' }}
      />
      <div
        data-parallax
        data-speed="25"
        className="glass absolute right-[20%] top-[80%] h-96 w-96 rounded-full"
        style={{ background: 'radial-gradient(circle at 40% 60%, rgba(176,99,58,0.20), transparent 70%)' }}
      />
    </div>
  );
}
