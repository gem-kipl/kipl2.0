import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProducts } from '@/lib/wordpress';
import { ProductCard } from '@/components/product-card';
import { APPLICATIONS, ROUTES } from '@/lib/constants';
import type { ProductCard as ProductCardData } from '@/types/wordpress';

export const revalidate = 300;

export function generateStaticParams() {
  return APPLICATIONS.map((a) => ({ slug: a.slug }));
}

function findApp(slug: string) {
  return APPLICATIONS.find((a) => a.slug === slug);
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const app = findApp(params.slug);
  if (!app) return { title: 'Application not found' };
  return {
    title: `${app.name} Ingredients`,
    description: `High-purity aroma & specialty chemicals for ${app.name.toLowerCase()} formulation, supplied by Krystal Ingredients.`,
  };
}

export default async function ApplicationPage({ params }: { params: { slug: string } }) {
  const app = findApp(params.slug);
  if (!app) notFound();

  let products: ProductCardData[] = [];
  try {
    products = await getProducts({ applicationSlug: app.slug });
  } catch {
    products = [];
  }

  return (
    <div className="mx-auto max-w-container px-4 py-12 sm:px-6 lg:px-8">
      <nav className="text-sm text-muted-foreground">
        <Link href={ROUTES.applications} className="hover:text-foreground">
          Applications
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{app.name}</span>
      </nav>

      <header className="mt-6 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {app.name} Ingredients That Perform to Specification.
        </h1>
        <p className="mt-3 text-muted-foreground">
          [Overview: what the {app.name} industry needs, and how Krystal Ingredients serves it.]
        </p>
      </header>

      <h2 className="mt-12 text-2xl font-semibold tracking-tight">Recommended Products</h2>
      {products.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
          No products are tagged to {app.name} yet. Assign the “{app.name}” application term to
          products in WordPress.
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <Link
        href={ROUTES.contact}
        className="mt-12 inline-flex h-11 items-center rounded-md bg-gold px-6 font-medium text-gold-foreground transition-opacity hover:opacity-90"
      >
        Request a Quote →
      </Link>
    </div>
  );
}
