'use client';

import { useState } from 'react';
import { CATEGORIES } from '@/lib/site-content';

export function CategoryExplorer() {
  const [active, setActive] = useState(0);
  const cat = CATEGORIES[active];

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
      {/* Index list — borderless, hairline separators only */}
      <ul>
        {CATEGORIES.map((c, i) => {
          const isActive = i === active;
          return (
            <li key={c.slug} className="border-t border-ink/12 last:border-b">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className="group flex w-full items-center gap-5 py-5 text-left"
              >
                <span className={'font-mono text-xs ' + (isActive ? 'text-copper' : 'text-clay/50')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={
                    'font-display text-2xl transition-all duration-500 ease-lux md:text-3xl ' +
                    (isActive ? 'translate-x-2 text-copper' : 'text-ink/70 group-hover:translate-x-1 group-hover:text-ink')
                  }
                >
                  {c.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Detail — sticky, transparent, no box */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div key={cat.slug} className="animate-fade-up">
          <p className="eyebrow mb-5">Category {String(active + 1).padStart(2, '0')}</p>
          <h3 className="font-display text-4xl leading-[1.02] text-ink md:text-5xl">{cat.name}</h3>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-clay">{cat.description}</p>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-4 text-clay">Applications</p>
              <ul className="space-y-3">
                {cat.applications.map((a) => (
                  <li key={a} className="flex items-center gap-3 text-ink">
                    <span className="h-px w-5 bg-copper" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 text-clay">Industries</p>
              <ul className="space-y-3">
                {cat.industries.map((ind) => (
                  <li key={ind} className="flex items-center gap-3 text-ink">
                    <span className="h-px w-5 bg-gold" />
                    {ind}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
