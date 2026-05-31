'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/lib/use-gsap';

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger direct children instead of revealing the container as one block. */
  stagger?: boolean;
  delay?: number;
  y?: number;
};

/**
 * Scroll-triggered reveal. Translates + fades content in once it enters the
 * viewport. Respects reduced-motion (content shown immediately, no transform).
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  stagger = false,
  delay = 0,
  y = 40,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const targets = stagger ? (Array.from(el.children) as HTMLElement[]) : [el];

      if (prefersReduced) {
        gsap.set(targets, { opacity: 1, y: 0 });
        el.classList.add('is-ready');
        return;
      }

      gsap.set(targets, { opacity: 0, y });
      el.classList.add('is-ready');

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          once: true,
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === el) t.kill();
        });
      };
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
