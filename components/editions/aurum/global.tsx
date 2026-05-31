import Link from 'next/link';
import { GlobeMount } from '@/components/three/globe-mount';
import { Counter } from '@/components/animation/counter';
import { Reveal } from '@/components/animation/reveal';
import { COUNTRIES } from '@/lib/site-content';
import { ROUTES } from '@/lib/constants';

const PANEL = [
  { to: 250, suffix: 'K+', label: 'MT Export Capacity' },
  { to: 90, suffix: '+', label: 'Shipments / Month' },
  { to: 99, suffix: '%', label: 'On-time Delivery' },
];

const FEATURES = ['Multi-Modal Transport', 'Temperature Controlled', 'Secure Packaging', 'Customs & Compliance', 'Dedicated Support'];

export function AurumGlobal() {
  return (
    <div className="-mt-16">
      <section className="mx-auto grid min-h-screen max-w-container items-center gap-10 px-6 pt-28 lg:grid-cols-[1fr_1.1fr] lg:px-10">
        <div>
          <p className="eyebrow mb-6">Delivering Excellence, Globally</p>
          <h1 className="font-display text-display font-light leading-[1.04] text-foreground">
            Global Reach.
            <br />
            <span className="text-gradient-brand">Reliable Delivery.</span>
          </h1>
          <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">
            Our robust logistics network ensures timely and compliant delivery of high-quality
            ingredients to customers worldwide — from our Mumbai headquarters and Dahej manufacturing.
          </p>

          <Reveal stagger className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/30">
            {PANEL.map((p) => (
              <div key={p.label} className="glass p-5 text-center">
                <Counter to={p.to} suffix={p.suffix} className="text-gradient-brand font-display text-3xl font-light" />
                <p className="mt-2 text-xs text-muted-foreground">{p.label}</p>
              </div>
            ))}
          </Reveal>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={ROUTES.contact} className="inline-flex h-12 items-center rounded-full bg-brand px-8 text-sm font-medium text-white">
              Request a Logistics Quote →
            </Link>
          </div>
          <p className="mt-8 text-xs uppercase tracking-label text-muted-foreground">Drag the globe to explore →</p>
        </div>

        <div className="h-[55vh] w-full lg:h-[80vh]">
          <GlobeMount />
        </div>
      </section>

      <section className="border-t border-border/40 py-10">
        <div className="mx-auto flex max-w-container flex-wrap justify-center gap-x-8 gap-y-3 px-6 lg:px-10">
          {COUNTRIES.map((c) => (
            <span key={c} className="text-sm uppercase tracking-label text-muted-foreground">{c}</span>
          ))}
        </div>
      </section>

      <section className="border-t border-border/40">
        <div className="mx-auto flex max-w-container flex-wrap gap-x-10 gap-y-3 px-6 py-8 lg:px-10">
          {FEATURES.map((f) => (
            <span key={f} className="text-sm text-muted-foreground"><span className="mr-2 text-accent">◆</span>{f}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
