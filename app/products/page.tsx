import type { Metadata } from 'next';
import { IS_AURUM } from '@/lib/edition';
import { CurrentProducts } from '@/components/editions/current/products';
import { AurumProducts } from '@/components/editions/aurum/products';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Products — Essential Oils, Aroma Chemicals & Specialty Ingredients',
  description:
    "Explore Krystal Ingredients' portfolio of essential oils, aroma chemicals and specialty ingredients — searchable by name, CAS and category.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; application?: string };
}) {
  if (IS_AURUM) return <AurumProducts />;
  return <CurrentProducts searchParams={searchParams} />;
}
