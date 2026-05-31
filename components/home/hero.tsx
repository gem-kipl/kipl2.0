'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/lib/use-gsap';
import { HERO } from '@/lib/site-content';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]');

      if (reduced) {
        gsap.set([lines, '[data-hero-eyebrow]', '[data-hero-sub]', '[data-hero-cta]'], {
          opacity: 1,
          yPercent: 0,
          y: 0,
        });
        return;
      }

      gsap.set(lines, { yPercent: 110 });
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to('[data-hero-eyebrow]', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
        .to(lines, { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.09 }, '-=0.4')
        .from('[data-hero-sub]', { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out' }, '-=0.7')
        .from('[data-hero-cta]', { opacity: 0, y: 24, duration: 0.8, stagger: 0.1, ease: 'power3.out' }, '-=0.6');

      // parallax the headline up slightly as you scroll past the hero
      gsap.to('[data-hero-headline]', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative -mt-16 flex min-h-[100svh] items-center overflow-hidden"
    >
      <div className="relative mx-auto w-full max-w-container px-6 lg:px-10">
        <div data-hero-headline className="max-w-5xl">
          <p data-hero-eyebrow className="eyebrow mb-8 translate-y-3 opacity-0">
            {HERO.eyebrow}
          </p>

          <h1 className="font-display text-display-sm font-light leading-[0.98] text-ink md:text-display-lg">
            {HERO.headline.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.08em]">
                <span data-hero-line className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p data-hero-sub className="mt-10 max-w-xl text-lg leading-relaxed text-clay">
            {HERO.subheadline}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <Link
              data-hero-cta
              href={HERO.primaryCta.href}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-8 text-sm font-medium text-white shadow-lg shadow-water/20 transition-transform duration-500 ease-lux hover:-translate-y-0.5"
            >
              {HERO.primaryCta.label}
              <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
            </Link>
            <Link
              data-hero-cta
              href={HERO.secondaryCta.href}
              className="inline-flex h-12 items-center border-b border-ink/30 text-sm font-medium text-ink transition-colors hover:border-copper hover:text-copper"
            >
              {HERO.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-label text-clay/70">
        Scroll
      </div>
    </section>
  );
}
