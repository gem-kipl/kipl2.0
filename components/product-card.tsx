import Image from 'next/image';
import Link from 'next/link';
import type { ProductCard as ProductCardData } from '@/types/wordpress';

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt || product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-tight">{product.name}</h3>
        {product.cas && (
          <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
            CAS {product.cas}
          </p>
        )}
        {product.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{product.excerpt}</p>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          {product.categories.map((c) => (
            <span
              key={c}
              className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
