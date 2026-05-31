'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { INGREDIENTS, TOTAL_ACTIVES, type Ingredient, type IngredientTag } from '@/lib/ingredients';

const TAGS: IngredientTag[] = ['Aroma Chemical', 'Essential Oil', 'Specialty'];

/** A small stylised benzene-ring mark used as the molecular thumbnail. */
function MoleculeMark() {
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 text-accent" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="24,6 39,15 39,33 24,42 9,33 9,15" opacity="0.9" />
        <circle cx="24" cy="6" r="2" fill="currentColor" stroke="none" />
        <circle cx="39" cy="15" r="2" fill="currentColor" stroke="none" />
        <circle cx="39" cy="33" r="2" fill="currentColor" stroke="none" />
        <circle cx="24" cy="42" r="2" fill="currentColor" stroke="none" />
        <circle cx="9" cy="33" r="2" fill="currentColor" stroke="none" />
        <circle cx="9" cy="15" r="2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function IngredientTerminal({ data = INGREDIENTS }: { data?: Ingredient[] }) {
  const [query, setQuery] = useState('');
  const [cats, setCats] = useState<string[]>([]);
  const [tags, setTags] = useState<IngredientTag[]>([]);
  const [basket, setBasket] = useState<string[]>([]);

  // Category facet derived from the data (works for demo or live WP catalogue)
  const categoryOptions = useMemo(() => {
    const map = new Map<string, string>();
    data.forEach((i) => map.set(i.category, i.categoryLabel));
    return Array.from(map, ([slug, name]) => ({ slug, name })).sort((a, b) => a.name.localeCompare(b.name));
  }, [data]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((i) => {
      const matchesQ =
        !q || i.name.toLowerCase().includes(q) || i.cas.includes(q) || i.categoryLabel.toLowerCase().includes(q);
      const matchesCat = cats.length === 0 || cats.includes(i.category);
      const matchesTag = tags.length === 0 || tags.includes(i.tag);
      return matchesQ && matchesCat && matchesTag;
    });
  }, [data, query, cats, tags]);

  const toggle = <T,>(arr: T[], v: T, set: (x: T[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const inBasket = (cas: string) => basket.includes(cas);

  return (
    <div className="mx-auto max-w-container px-6 py-10 lg:px-10">
      {/* Search header */}
      <div className="mb-8">
        <p className="eyebrow mb-3">Explore · Discover · Deliver</p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-display text-display-sm font-light leading-[1.05] text-foreground">
            Find the Right Ingredient.
          </h1>
          <span className="text-sm text-muted-foreground">
            <span className="text-gradient-brand font-display text-2xl">{TOTAL_ACTIVES}</span> active ingredients
          </span>
        </div>
        <div className="mt-6 flex items-center gap-3 rounded-full border border-border bg-card px-5 py-3">
          <span className="text-muted-foreground">⌕</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, CAS number or category…"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Search ingredients"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-muted-foreground hover:text-accent">
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="space-y-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-label text-muted-foreground">Type</p>
            <div className="space-y-2">
              {TAGS.map((t) => (
                <label key={t} className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90">
                  <input type="checkbox" checked={tags.includes(t)} onChange={() => toggle(tags, t, setTags)} className="accent-[var(--grad-to)]" />
                  {t}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-label text-muted-foreground">Categories</p>
            <div className="space-y-2">
              {categoryOptions.map((c) => (
                <label key={c.slug} className="flex cursor-pointer items-center gap-2 text-sm text-foreground/90">
                  <input type="checkbox" checked={cats.includes(c.slug)} onChange={() => toggle(cats, c.slug, setCats)} className="accent-[var(--grad-to)]" />
                  {c.name}
                </label>
              ))}
            </div>
          </div>
          {(cats.length > 0 || tags.length > 0 || query) && (
            <button
              onClick={() => { setCats([]); setTags([]); setQuery(''); }}
              className="text-xs text-accent hover:underline"
            >
              Reset all filters
            </button>
          )}
        </aside>

        {/* Results */}
        <div>
          <p className="mb-5 text-sm text-muted-foreground">
            Showing <span className="text-foreground">{results.length}</span> of {data.length} loaded
          </p>
          {results.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              No ingredients match your search. Try a different name, CAS number, or reset filters.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((i) => (
                <IngredientCell key={i.cas} ing={i} inBasket={inBasket(i.cas)} onToggle={() => toggle(basket, i.cas, setBasket)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RFQ basket tray */}
      {basket.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border glass">
          <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-6 py-4 lg:px-10">
            <p className="text-sm text-foreground">
              <span className="text-gradient-brand font-display text-xl">{basket.length}</span> ingredient
              {basket.length > 1 ? 's' : ''} in your quote request
            </p>
            <div className="flex items-center gap-3">
              <button onClick={() => setBasket([])} className="text-xs text-muted-foreground hover:text-accent">
                Clear
              </button>
              <Link
                href={`/contact?items=${encodeURIComponent(basket.join(','))}`}
                className="inline-flex h-10 items-center rounded-full bg-brand px-6 text-sm font-medium text-white"
              >
                Request Quote →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function IngredientCell({ ing, inBasket, onToggle }: { ing: Ingredient; inBasket: boolean; onToggle: () => void }) {
  return (
    <article className="group flex flex-col rounded-lg border border-border/60 bg-card p-5 transition-colors hover:border-accent/60">
      <div className="flex items-start justify-between">
        <MoleculeMark />
        <span className="rounded-full border border-border/60 px-2.5 py-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
          {ing.tag}
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl text-foreground">{ing.name}</h3>
      <p className="mt-1 font-mono text-xs text-accent">CAS {ing.cas}</p>

      <dl className="mt-4 grid grid-cols-2 gap-y-1.5 text-xs">
        <dt className="text-muted-foreground">Mol. weight</dt>
        <dd className="text-right font-mono text-foreground">{ing.mw ? ing.mw : '—'}</dd>
        <dt className="text-muted-foreground">Purity</dt>
        <dd className="text-right font-mono text-foreground">{ing.purity}</dd>
        <dt className="text-muted-foreground">Appearance</dt>
        <dd className="text-right text-foreground">{ing.appearance}</dd>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {ing.applications.slice(0, 3).map((a) => (
          <span key={a} className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">{a}</span>
        ))}
      </div>

      <button
        onClick={onToggle}
        className={
          'mt-5 inline-flex h-9 items-center justify-center rounded-full text-sm font-medium transition-colors ' +
          (inBasket
            ? 'bg-[#3DA63C] text-white'
            : 'border border-border text-foreground hover:border-accent hover:text-accent')
        }
      >
        {inBasket ? '✓ Added to RFQ' : '+ Add to RFQ'}
      </button>
    </article>
  );
}
