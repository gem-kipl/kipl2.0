import Link from 'next/link';
import { Reveal } from '@/components/animation/reveal';
import { Counter } from '@/components/animation/counter';
import { CategoryExplorer } from '@/components/home/category-explorer';
import {
  SCIENCE,
  INDUSTRIES,
  COUNTRIES,
  CERTIFICATIONS,
  METRICS,
  FINAL_CTA,
} from '@/lib/site-content';

function SectionLabel({ index, children, light }: { index: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className="mb-12 flex items-center gap-4">
      <span className={'font-mono text-xs ' + (light ? 'text-gold' : 'text-copper')}>{index}</span>
      <span className={'text-xs font-medium uppercase tracking-label ' + (light ? 'text-gold' : 'text-copper')}>
        {children}
      </span>
      <span className={'h-px flex-1 ' + (light ? 'bg-sand/20' : 'bg-ink/15')} />
    </div>
  );
}

/* ── 02 · The Science of Ingredients ───────────────────────────────── */
export function ScienceSection() {
  return (
    <section className="relative mx-auto max-w-container px-6 py-28 lg:px-10 lg:py-44">
      <SectionLabel index="02">{SCIENCE.eyebrow}</SectionLabel>
      <Reveal>
        <h2 className="max-w-4xl font-display text-display-sm font-light leading-[1.04] text-ink">
          {SCIENCE.heading}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-prose text-xl leading-relaxed text-clay">{SCIENCE.body}</p>
      </Reveal>

      {/* Flowing timeline — vertical rule + rows, no boxes */}
      <Reveal stagger className="mt-24 border-t border-ink/15">
        {SCIENCE.timeline.map((t, i) => (
          <div
            key={t.label}
            className="group grid items-baseline gap-4 border-b border-ink/15 py-8 md:grid-cols-[120px_1fr_2fr] md:gap-10"
          >
            <span className="font-mono text-xs uppercase tracking-label text-copper">{t.year}</span>
            <span className="font-display text-3xl text-ink transition-transform duration-500 ease-lux group-hover:translate-x-2 md:text-4xl">
              {t.label}
            </span>
            <span className="text-clay md:pt-2">{t.text}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

/* ── 03 · Product Ecosystem ────────────────────────────────────────── */
export function EcosystemSection() {
  return (
    <section className="relative mx-auto max-w-container px-6 py-28 lg:px-10 lg:py-44">
      <SectionLabel index="03">Product Ecosystem</SectionLabel>
      <Reveal>
        <h2 className="max-w-3xl font-display text-display-sm font-light leading-[1.04] text-ink">
          Nine verticals. One continuous fragrance value chain.
        </h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-16">
        <CategoryExplorer />
      </Reveal>
    </section>
  );
}

/* ── 04 · Industries We Serve ──────────────────────────────────────── */
export function IndustriesSection() {
  return (
    <section className="chapter-dark relative text-sand">
      <div className="mx-auto max-w-container px-6 py-28 lg:px-10 lg:py-44">
        <SectionLabel index="04" light>Industries We Serve</SectionLabel>
        <Reveal>
          <h2 className="max-w-3xl font-display text-display-sm font-light leading-[1.04]">
            Trusted across the industries that define quality.
          </h2>
        </Reveal>

        {/* Oversized editorial rows — hover reveals blurb + arrow */}
        <Reveal stagger className="mt-20 border-t border-sand/15">
          {INDUSTRIES.map((ind, i) => (
            <Link
              key={ind.slug}
              href={`/applications/${ind.slug}`}
              className="group grid items-center gap-4 border-b border-sand/15 py-7 md:grid-cols-[80px_1fr_auto] md:gap-10"
            >
              <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
              <span className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <span className="font-display text-4xl font-light leading-none transition-transform duration-500 ease-lux group-hover:translate-x-3 md:text-6xl">
                  {ind.name}
                </span>
                <span className="max-w-md text-sm text-sand/55 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
                  {ind.blurb}
                </span>
              </span>
              <span className="hidden text-2xl text-gold opacity-0 transition-all duration-500 ease-lux group-hover:translate-x-2 group-hover:opacity-100 md:block">
                →
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ── 05 · Global Presence ──────────────────────────────────────────── */
export function GlobalSection() {
  // duplicate the list so the marquee can loop seamlessly
  const half = COUNTRIES.slice();
  return (
    <section className="relative overflow-hidden py-28 lg:py-44">
      <div className="mx-auto max-w-container px-6 lg:px-10">
        <SectionLabel index="05">Global Presence</SectionLabel>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <h2 className="font-display text-display-sm font-light leading-[1.04] text-ink">
              A dependable supply network across four continents.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex items-baseline gap-4">
            <Counter to={15} suffix="+" className="text-gradient-brand font-display text-7xl leading-none lg:text-8xl" />
            <span className="text-sm uppercase tracking-label text-clay">Export Markets</span>
          </Reveal>
        </div>
      </div>

      {/* Country marquee — two opposing rows, edge to edge */}
      <div className="marquee-group mt-20 space-y-4">
        {[half, half].map((row, idx) => (
          <div key={idx} className="flex overflow-hidden">
            <div
              className={'marquee ' + (idx === 1 ? 'marquee-reverse' : '')}
              style={{ '--marquee-duration': idx === 1 ? '46s' : '38s' } as React.CSSProperties}
            >
              {[...row, ...row].map((c, i) => (
                <span key={c + i} className="flex items-center">
                  <span className="px-8 font-display text-4xl font-light text-ink/80 lg:text-6xl">{c}</span>
                  <span className="text-gold">✦</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 06 · Quality & Compliance ─────────────────────────────────────── */
export function QualitySection() {
  return (
    <section className="relative py-28 lg:py-44">
      <div className="mx-auto max-w-container px-6 lg:px-10">
        <SectionLabel index="06">Quality &amp; Compliance</SectionLabel>
        <Reveal>
          <h2 className="max-w-3xl font-display text-display-sm font-light leading-[1.04] text-ink">
            Certified at every layer of the operation.
          </h2>
        </Reveal>
      </div>

      {/* Certification marquee */}
      <div className="marquee-group mt-20 flex overflow-hidden border-y border-ink/15 py-10">
        <div className="marquee" style={{ '--marquee-duration': '34s' } as React.CSSProperties}>
          {[...CERTIFICATIONS, ...CERTIFICATIONS].map((c, i) => (
            <span key={c.code + i} className="flex items-baseline gap-4 px-10">
              <span className="font-display text-5xl font-light text-ink lg:text-7xl">{c.code}</span>
              <span className="text-xs uppercase tracking-label text-clay">{c.label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 07 · Trust Metrics ────────────────────────────────────────────── */
export function MetricsSection() {
  return (
    <section className="relative mx-auto max-w-container px-6 py-28 lg:px-10 lg:py-40">
      <Reveal stagger className="grid gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <div
            key={m.label}
            className={
              'px-2 text-center lg:px-8 ' + (i > 0 ? 'lg:border-l lg:border-ink/15' : '')
            }
          >
            <Counter
              to={m.value}
              suffix={m.suffix}
              className="text-gradient-brand font-display text-7xl font-light leading-none lg:text-8xl"
            />
            <p className="mt-5 text-xs uppercase tracking-label text-clay">{m.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

/* ── 08 · Final CTA ────────────────────────────────────────────────── */
export function FinalCtaSection() {
  return (
    <section className="chapter-dark relative overflow-hidden text-sand">
      <div className="relative mx-auto max-w-container px-6 py-36 text-center lg:px-10 lg:py-52">
        <Reveal>
          <p className="eyebrow mb-8 text-gold">{FINAL_CTA.eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-5xl font-display text-display font-light leading-[1.0]">
            {FINAL_CTA.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-sand/70">
            {FINAL_CTA.body}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link
            href={FINAL_CTA.cta.href}
            className="group mt-14 inline-flex h-14 items-center gap-2 rounded-full bg-brand px-10 text-sm font-medium text-white transition-transform duration-500 ease-lux hover:-translate-y-1"
          >
            {FINAL_CTA.cta.label}
            <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
