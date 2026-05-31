import type { Metadata } from 'next';
import { GlobeMount } from '@/components/three/globe-mount';
import { Counter } from '@/components/animation/counter';
import { COUNTRIES } from '@/lib/site-content';
import { IS_AURUM } from '@/lib/edition';
import { AurumGlobal } from '@/components/editions/aurum/global';

export const metadata: Metadata = {
  title: 'Global Presence — Export Markets Worldwide',
  description:
    'From our Mumbai headquarters and Dahej manufacturing facility, Krystal Ingredients exports aroma chemicals, essential oils and specialty ingredients to markets across four continents.',
};

const LEGEND = [
  { label: 'Headquarters — Mumbai', color: '#C5811D' },
  { label: 'Manufacturing — Dahej', color: '#FFD27A' },
  { label: 'Export Markets', color: '#B0633A' },
];

export default function GlobalPresencePage() {
  if (IS_AURUM) return <AurumGlobal />;
  return (
    <div className="-mt-16 chapter-dark">
      <section className="mx-auto grid min-h-screen max-w-container items-center gap-10 px-6 pt-24 lg:grid-cols-[1fr_1.1fr] lg:px-10">
        {/* Left — narrative + legend + stats */}
        <div>
          <p className="eyebrow mb-6 text-gold">Global Presence</p>
          <h1 className="font-display text-display-sm font-light leading-[1.02] lg:text-display">
            One network. Four continents.
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-sand/70">
            From our headquarters in Mumbai and manufacturing at Dahej, we supply formulators and
            manufacturers worldwide — engineered around the documentation, handling and timelines
            high-value chemistry demands.
          </p>

          <ul className="mt-10 space-y-3">
            {LEGEND.map((l) => (
              <li key={l.label} className="flex items-center gap-3 text-sm text-sand/80">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                {l.label}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex gap-12">
            <div>
              <Counter to={COUNTRIES.length} suffix="+" className="font-display text-6xl font-light text-gold" />
              <p className="mt-2 text-xs uppercase tracking-label text-sand/50">Export Markets</p>
            </div>
            <div>
              <Counter to={4} className="font-display text-6xl font-light text-gold" />
              <p className="mt-2 text-xs uppercase tracking-label text-sand/50">Continents</p>
            </div>
          </div>

          <p className="mt-10 text-xs uppercase tracking-label text-sand/40">Drag the globe to explore →</p>
        </div>

        {/* Right — interactive globe */}
        <div className="h-[55vh] w-full lg:h-[80vh]">
          <GlobeMount />
        </div>
      </section>

      {/* Country marquee strip */}
      <section className="border-t border-sand/10 py-10">
        <div className="mx-auto flex max-w-container flex-wrap justify-center gap-x-8 gap-y-3 px-6 text-sand/60 lg:px-10">
          {COUNTRIES.map((c) => (
            <span key={c} className="text-sm uppercase tracking-label">
              {c}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
