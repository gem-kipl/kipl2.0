import type { Metadata } from 'next';
import Link from 'next/link';
import { IS_AURUM } from '@/lib/edition';
import { AurumManufacturing } from '@/components/editions/aurum/manufacturing';
import { ROUTES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Manufacturing & R&D — Precision Process, Pure Chemistry',
  description:
    'State-of-the-art manufacturing of aroma chemicals, essential oils and specialty ingredients — 25,000 MT annual capacity, ISO/GMP/FDA certified.',
};

export default function ManufacturingPage() {
  if (IS_AURUM) return <AurumManufacturing />;

  // Current edition — concise version (the immersive treatment lives in Aurum).
  return (
    <div className="mx-auto max-w-container px-6 py-24 lg:px-10">
      <p className="eyebrow mb-6">Advanced Manufacturing</p>
      <h1 className="max-w-3xl font-display text-display-sm font-light leading-[1.04] text-ink">
        Precision process. Pure chemistry. Trusted worldwide.
      </h1>
      <p className="mt-8 max-w-prose text-lg leading-relaxed text-clay">
        State-of-the-art facilities deliver high-quality aroma chemicals, essential oils and
        specialty ingredients at scale — backed by ISO, GMP and FDA-aligned quality systems and a
        25,000 MT annual capacity.
      </p>
      <Link
        href={ROUTES.contact}
        className="mt-10 inline-flex h-12 items-center rounded-full bg-brand px-8 text-sm font-medium text-white"
      >
        Explore Our Facility →
      </Link>
    </div>
  );
}
