import Link from 'next/link';
import { Reveal } from '@/components/animation/reveal';
import { Counter } from '@/components/animation/counter';
import { HeroPhoto } from '@/components/editions/aurum/hero-photo';
import { getSiteContent } from '@/lib/site-config';
import { ROUTES } from '@/lib/constants';

const VALUES = [
  { t: 'Integrity & Trust', d: 'We operate with honesty, transparency and dependable supply.' },
  { t: 'Quality Excellence', d: 'We deliver uncompromising purity, batch after batch.' },
  { t: 'Sustainability', d: 'We are committed to responsible, future-minded manufacturing.' },
  { t: 'Customer Focus', d: 'We build long-term partnerships around our customers’ success.' },
  { t: 'Innovation', d: 'We invest in R&D to develop safer, better ingredients.' },
  { t: 'Global Collaboration', d: 'We partner across the world to move the industry forward.' },
];

const LEADERS = [
  { n: 'Vishal Kedia', r: 'Managing Director' },
  { n: 'Amit Kedia', r: 'Director' },
  { n: 'Zakir Khan', r: 'Chief Executive Officer' },
  { n: 'Pooja Kedia', r: 'Director' },
];

const TIMELINE = [
  { y: '1994', t: 'Foundation', d: 'Established with a vision for high-quality aromatic chemistry.' },
  { y: '2000', t: 'Expansion', d: 'Scaled capacity and broadened the ingredient portfolio.' },
  { y: '2008', t: 'Global Reach', d: 'Opened export markets across multiple continents.' },
  { y: '2014', t: 'Innovation Leap', d: 'Invested in R&D and advanced process control.' },
  { y: '2020', t: 'Sustainability', d: 'Committed to responsible sourcing and operations.' },
  { y: '2024', t: 'Beyond Boundaries', d: 'A trusted global partner across the fragrance value chain.' },
];

const STATS = [
  { to: 90, suffix: '+', label: 'Products' },
  { to: 40, suffix: '+', label: 'Countries' },
  { to: 250, suffix: '+', label: 'Global Clients' },
  { to: 30, suffix: '+', label: 'Years of Excellence' },
];

export async function AurumAbout() {
  const { heroImages } = await getSiteContent();
  return (
    <div className="-mt-16">
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-center overflow-hidden">
        <HeroPhoto src={heroImages.about} focus="center" />
        <div className="mx-auto w-full max-w-container px-6 pt-28 lg:px-10">
        <p className="eyebrow mb-6">Where Science Meets Scent</p>
        <h1 className="max-w-4xl font-display text-display font-light leading-[1.04] text-foreground">
          Global Ingredients.
          <br />
          <span className="text-gradient-brand">Trusted Worldwide.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
          A Gem Aromatics Group company, Krystal Ingredients manufactures, distributes and exports
          high-quality aroma chemicals, essential oils and specialty ingredients with uncompromising
          quality and dependable global supply.
        </p>
        <Reveal stagger className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/30 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="glass p-6 text-center">
              <Counter to={s.to} suffix={s.suffix} className="text-gradient-brand font-display text-4xl font-light" />
              <p className="mt-2 text-xs uppercase tracking-label text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-container px-6 py-24 lg:px-10">
        <div className="mb-12 flex items-center gap-4">
          <span className="eyebrow">Our Core Values</span>
          <span className="h-px flex-1 bg-border/50" />
        </div>
        <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.t} className="glass rounded-xl p-7">
              <h3 className="font-display text-2xl text-foreground">{v.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Leadership */}
      <section className="mx-auto max-w-container px-6 py-12 lg:px-10">
        <p className="eyebrow mb-10">Leadership Team</p>
        <Reveal stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERS.map((l) => (
            <div key={l.n} className="glass rounded-xl p-6">
              <div className="mb-5 h-16 w-16 rounded-full bg-gradient-to-br from-[var(--grad-from)] to-[var(--grad-to)] opacity-80" />
              <p className="font-display text-xl text-foreground">{l.n}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l.r}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Legacy timeline */}
      <section className="mx-auto max-w-container px-6 py-24 lg:px-10">
        <div className="mb-12 flex items-center gap-4">
          <span className="eyebrow">Our Legacy — Built on Innovation</span>
          <span className="h-px flex-1 bg-border/50" />
        </div>
        <div className="relative border-l border-border/50 pl-8">
          {TIMELINE.map((m) => (
            <Reveal key={m.y} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-[var(--grad-from)] to-[var(--grad-to)]" />
              <p className="font-mono text-sm text-accent">{m.y}</p>
              <h3 className="mt-1 font-display text-2xl text-foreground">{m.t}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{m.d}</p>
            </Reveal>
          ))}
        </div>
        <Link
          href={ROUTES.contact}
          className="mt-12 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-8 text-sm font-medium text-white"
        >
          Partner With Us →
        </Link>
      </section>
    </div>
  );
}
