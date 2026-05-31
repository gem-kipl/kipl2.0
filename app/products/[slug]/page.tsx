import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProductBySlug, getProductSlugs, stripHtml } from '@/lib/wordpress';
import { ROUTES } from '@/lib/constants';
import { PRODUCT_SPEC_FIELDS } from '@/types/wordpress';
import { JsonLd } from '@/components/seo/json-ld';

export const revalidate = 300;

export async function generateStaticParams() {
  try {
    const slugs = await getProductSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug).catch(() => null);
  if (!product) return { title: 'Product not found' };
  const name = stripHtml(product.title.rendered);
  return {
    title: `${name} — Specifications & Supply`,
    description: stripHtml(product.excerpt?.rendered ?? '').slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug).catch(() => null);
  if (!product) notFound();

  const name = stripHtml(product.title.rendered);
  const media = product._embedded?.['wp:featuredmedia']?.[0];
  const meta = product.meta ?? {};
  const specs = PRODUCT_SPEC_FIELDS.map((f) => ({ label: f.label, value: meta[f.key] }))
    .filter((row) => row.value !== undefined && row.value !== null && String(row.value).trim() !== '');

  return (
    <div className="mx-auto max-w-container px-4 py-12 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name,
          description: stripHtml(product.excerpt?.rendered ?? product.content?.rendered ?? '').slice(0, 300),
          ...(meta.cas_number ? { sku: meta.cas_number } : {}),
          brand: { '@type': 'Brand', name: 'Krystal Ingredients' },
          ...(media?.source_url ? { image: media.source_url } : {}),
          additionalProperty: specs.map((s) => ({
            '@type': 'PropertyValue',
            name: s.label,
            value: String(s.value),
          })),
        }}
      />
      <nav className="text-sm text-muted-foreground">
        <Link href={ROUTES.products} className="hover:text-foreground">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
          {media?.source_url ? (
            <Image
              src={media.source_url}
              alt={media.alt_text || name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{name}</h1>

          <section className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Specifications
            </h2>
            {specs.length > 0 ? (
              <table className="mt-3 w-full overflow-hidden rounded-lg border text-sm">
                <tbody>
                  {specs.map((row, i) => (
                    <tr key={row.label} className={i % 2 ? 'bg-card' : 'bg-secondary/40'}>
                      <th
                        scope="row"
                        className="w-2/5 border-b px-4 py-3 text-left font-medium text-muted-foreground"
                      >
                        {row.label}
                      </th>
                      <td className="border-b px-4 py-3 font-medium">{String(row.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="mt-3 rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
                Specification data will appear here once the product fields are populated and
                exposed in the WordPress REST API.
              </p>
            )}
          </section>

          {product.content?.rendered && (
            <div
              className="wp-content mt-6"
              dangerouslySetInnerHTML={{ __html: product.content.rendered }}
            />
          )}

          <Link
            href={ROUTES.contact}
            className="mt-8 inline-flex h-11 items-center rounded-md bg-gold px-6 font-medium text-gold-foreground transition-opacity hover:opacity-90"
          >
            Request specifications or a sample →
          </Link>
        </div>
      </div>
    </div>
  );
}
