import Link from 'next/link';
import { Reveal } from '@/components/animation/reveal';
import { Counter } from '@/components/animation/counter';
import { HeroPhoto } from '@/components/editions/aurum/hero-photo';
import { ROUTES } from '@/lib/constants';

const STATS = [
  { to: 90, suffix: '+', label: 'Products', sub: 'Aroma & specialty range' },
  { to: 25000, suffix: ' MT', label: 'Annual Capacity', sub: 'High-volume production' },
  { to: 6, suffix: '', label: 'Certifications', sub: 'ISO, GMP, FDA, Halal, Kosher' },
  { to: 40, suffix: '+', label: 'Countries', sub: 'Global export network' },
];

const CERTS = ['ISO 9001:2015', 'ISO 14001:2015', 'ISO 45001:2018', 'FDA Registered', 'GMP Certified', 'Halal & Kosher'];

const PIPELINE = [
  { n: '01', t: 'Raw Material Intake', d: 'Certified identity, purity and traceability checks.' },
  { n: '02', t: 'Reaction & Synthesis', d: 'Controlled processing under precise parameters.' },
  { n: '03', t: 'Distillation & Refining', d: 'High-purity isolation of target molecules.' },
  { n: '04', t: 'Quality Control', d: 'In-process and finished-product testing.' },
  { n: '05', t: 'Packaging & Dispatch', d: 'Compliant packing for global export.' },
];

const FEATURES = ['Advanced Technology', 'R&D Excellence', 'Strict Quality Control', 'Sustainable Practices'];

export function AurumManufacturing() {
  return (
    <div className="-mt-16">
      {/* Cinematic hero (gradient stand-in for plant photography) */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <HeroPhoto src="/images/aurum/manufacturing.jpg" focus="center" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(120% 90% at 75% 60%, rgba(200,134,46,0.28), transparent 55%)' }}
        />
        <div className="relative mx-auto w-full max-w-container px-6 pt-28 lg:px-10">
          <p className="eyebrow mb-6">Advanced Manufacturing</p>
          <h1 className="max-w-4xl font-display text-display font-light leading-[1.04] text-foreground">
            Precision Process.
            <br />
            Pure Chemistry.
            <br />
            <span className="text-gradient-brand">Trusted Worldwide.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            State-of-the-art facilities delivering high-quality aroma chemicals, essential oils and
            specialty ingredients with uncompromising quality and scale.
          </p>

          <Reveal stagger className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/30 lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="glass p-5">
                <Counter to={s.to} suffix={s.suffix} className="text-gradient-brand font-display text-3xl font-light lg:text-4xl" />
                <p className="mt-2 text-sm font-medium text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Process pipeline */}
      <section className="mx-auto max-w-container px-6 py-20 lg:px-10">
        <div className="mb-12 flex items-center gap-4">
          <span className="eyebrow">From Molecule to Market</span>
          <span className="h-px flex-1 bg-border/50" />
        </div>
        <Reveal stagger className="grid gap-4 md:grid-cols-5">
          {PIPELINE.map((p) => (
            <div key={p.n} className="glass rounded-xl p-5">
              <p className="font-mono text-sm text-accent">{p.n}</p>
              <h3 className="mt-3 font-display text-lg text-foreground">{p.t}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Certifications + CTA */}
      <section className="mx-auto max-w-container px-6 pb-20 lg:px-10">
        <div className="glass flex flex-wrap items-center justify-between gap-6 rounded-xl p-8">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {CERTS.map((c) => (
              <span key={c} className="text-sm text-foreground"><span className="mr-2 text-[#3DA63C]">✓</span>{c}</span>
            ))}
          </div>
          <Link href={ROUTES.contact} className="inline-flex h-11 items-center rounded-full bg-brand px-7 text-sm font-medium text-white">
            Explore Our Facility →
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-3">
          {FEATURES.map((f) => (
            <span key={f} className="text-sm text-muted-foreground"><span className="mr-2 text-accent">◆</span>{f}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
