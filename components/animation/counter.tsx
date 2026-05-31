'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/lib/use-gsap';

gsap.registerPlugin(ScrollTrigger);

type CounterProps = {
  to: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

/** Counts up from 0 → `to` when scrolled into view. */
export function Counter({ to, suffix = '', prefix = '', className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        el.textContent = `${prefix}${to}${suffix}`;
        return;
      }

      const obj = { val: 0 };
      gsap.to(obj, {
        val: to,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
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
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
