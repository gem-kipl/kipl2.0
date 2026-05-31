import Link from 'next/link';
import { getProducts } from '@/lib/wordpress';
import { ProductCard } from '@/components/product-card';
import { FlaskMount } from '@/components/three/flask-mount';
import { PRODUCT_CATEGORIES, ROUTES } from '@/lib/constants';
import type { ProductCard as ProductCardData } from '@/types/wordpress';

/** Current edition Products page (scrollytelling flask + live WP catalogue). */
export async function CurrentProducts({
  searchParams,
}: {
  searchParams: { category?: string; application?: string };
}) {
  const { category, application } = searchParams;

  let products: ProductCardData[] = [];
  let error = false;
  try {
    products = await getProducts({ categorySlug: category, applicationSlug: application });
  } catch {
    error = true;
  }

  return (
    <div className="-mt-16 chapter-dark">
      <section className="mx-auto flex min-h-[60vh] max-w-container flex-col justify-end px-6 pb-10 pt-40 lg:px-10">
        <p className="eyebrow mb-6 text-gold">Capabilities</p>
        <h1 className="max-w-4xl font-display text-display-sm font-light leading-[1.02] lg:text-display">
          A portfolio that flows from nature to molecule.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-sand/70">
          Scroll to follow the ingredient journey — from distilled essential oils, through
          high-purity aroma chemicals, to engineered specialty compounds.
        </p>
      </section>

      <FlaskMount />

      <section className="mx-auto max-w-container px-6 py-24 lg:px-10">
        <div className="mb-12 flex items-center gap-4">
          <span className="font-mono text-xs text-gold">All Products</span>
          <span className="h-px flex-1 bg-sand/15" />
        </div>

        <nav className="mb-12 flex flex-wrap gap-2">
          <FilterChip href={ROUTES.products} active={!category}>
            All
          </FilterChip>
          {PRODUCT_CATEGORIES.map((c) => (
            <FilterChip key={c.slug} href={`${ROUTES.products}?category=${c.slug}`} active={category === c.slug}>
              {c.name}
            </FilterChip>
          ))}
        </nav>

        {error ? (
          <EmptyState title="Unable to load products" body="The catalogue could not be reached. Check WP_API_URL and that WordPress is online." />
        ) : products.length === 0 ? (
          <EmptyState title="No products found" body="No products match this filter yet. Add products in WordPress, or clear the filter." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FilterChip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={
        'rounded-full border px-4 py-1.5 text-sm transition-colors ' +
        (active ? 'border-gold bg-gold text-ink' : 'border-sand/25 text-sand/80 hover:border-sand/50')
      }
    >
      {children}
    </Link>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-dashed border-sand/20 p-12 text-center">
      <p className="font-medium text-sand">{title}</p>
      <p className="mt-2 text-sm text-sand/60">{body}</p>
    </div>
  );
}
