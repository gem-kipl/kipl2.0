import Link from 'next/link';
import { MorphMount } from '@/components/three/morph-mount';
import { Counter } from '@/components/animation/counter';
import { Reveal } from '@/components/animation/reveal';
import { CATEGORIES, CERTIFICATIONS } from '@/lib/site-content';
import { ROUTES } from '@/lib/constants';

const STATS = [
  { to: 90, suffix: '+', label: 'Products', sub: 'Aroma & specialty range' },
  { to: 25000, suffix: ' MT', label: 'Annual Capacity', sub: 'High-volume production' },
  { to: 40, suffix: '+', label: 'Countries', sub: 'Global export network' },
  { to: 3, suffix: '+', label: 'Decades', sub: 'Of trusted expertise' },
];

/** Aurum edition homepage — recreates "The Home Page" reference (command center). */
export function AurumHome() {
  return (
    <>
      <MorphMount /> {/* ambient liquid-gold molecular glow */}
      <div className="relative z-10">
        {/* HERO */}
        <section className="relative -mt-16 min-h-[100svh] overflow-hidden">
          <div className="mx-auto flex min-h-[100svh] max-w-container flex-col justify-center px-6 pt-28 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
              {/* Left — headline + lead + CTAs */}
              <div>
                <p className="eyebrow mb-6">Where Science Meets Scent</p>
                <h1 className="font-display text-display font-light leading-[1.04] text-foreground">
                  Global Solutions.
                  <br />
                  Pure Ingredients.
                  <br />
                  <span className="text-gradient-brand">Trusted Worldwide.</span>
                </h1>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Krystal Ingredients delivers high-quality aroma chemicals, essential oils and
                  specialty ingredients to manufacturers and industries around the world — with
                  uncompromising quality and dependable global supply.
                </p>

                <div className="mt-9 flex flex-wrap items-center gap-5">
                  <Link
                    href={ROUTES.products}
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand px-8 text-sm font-medium text-white transition-transform duration-500 ease-lux hover:-translate-y-0.5"
                  >
                    Explore Products
                    <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
                  </Link>
                  <Link
                    href={ROUTES.contact}
                    className="inline-flex h-12 items-center border-b border-foreground/30 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                  >
                    Request Quote
                  </Link>
                  <button className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border">▶</span>
                    Watch Plant Overview
                  </button>
                </div>

                {/* Stat row */}
                <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/30 sm:grid-cols-4">
                  {STATS.map((s) => (
                    <div key={s.label} className="glass p-5">
                      <Counter
                        to={s.to}
                        suffix={s.suffix}
                        className="text-gradient-brand font-display text-3xl font-light lg:text-4xl"
                      />
                      <p className="mt-2 text-sm font-medium text-foreground">{s.label}</p>
                      <p className="text-xs text-muted-foreground">{s.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Certified Excellence */}
              <Reveal className="glass rounded-xl p-6 lg:mt-2">
                <p className="eyebrow mb-5">Certified Excellence</p>
                <ul className="space-y-3">
                  {CERTIFICATIONS.map((c) => (
                    <li key={c.code} className="flex items-center justify-between gap-4 border-b border-border/40 pb-3 last:border-0">
                      <span>
                        <span className="block text-sm font-medium text-foreground">{c.code}</span>
                        <span className="block text-xs text-muted-foreground">{c.label}</span>
                      </span>
                      <span className="text-[#3DA63C]" aria-label="certified">✓</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* TOP PRODUCT CATEGORIES */}
        <section className="border-t border-border/40">
          <div className="mx-auto max-w-container px-6 py-14 lg:px-10">
            <div className="mb-8 flex items-center justify-between">
              <p className="eyebrow">Top Product Categories</p>
              <Link href={ROUTES.products} className="text-sm text-accent hover:underline">
                View All Products →
              </Link>
            </div>
            <Reveal stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`${ROUTES.products}?category=${c.slug}`}
                  className="glass group flex items-center gap-3 rounded-lg px-4 py-3.5 transition-transform duration-500 ease-lux hover:-translate-y-0.5"
                >
                  <span className="h-2 w-2 rotate-45 bg-gradient-to-br from-[var(--grad-from)] to-[var(--grad-to)]" />
                  <span className="text-sm font-medium text-foreground group-hover:text-accent">
                    {c.name}
                  </span>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
