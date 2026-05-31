import { IngredientTerminal } from '@/components/editions/aurum/ingredient-terminal';
import { getProducts } from '@/lib/wordpress';
import { INGREDIENTS, type Ingredient, type IngredientTag } from '@/lib/ingredients';
import type { ProductCard } from '@/types/wordpress';

function tagFor(label: string): IngredientTag {
  const l = label.toLowerCase();
  if (l.includes('essential') || l.includes('oil')) return 'Essential Oil';
  if (l.includes('specialty') || l.includes('special')) return 'Specialty';
  return 'Aroma Chemical';
}

function mapWp(p: ProductCard): Ingredient {
  const label = p.categories[0] || 'Specialty';
  return {
    name: p.name,
    cas: p.cas || '—',
    category: label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    categoryLabel: label,
    tag: tagFor(label),
    mw: 0,
    purity: p.purity || '—',
    appearance: '—',
    applications: p.applications.slice(0, 3),
  };
}

/**
 * Aurum Products — the Ingredient Terminal.
 * Pulls the live WordPress `product` catalogue; while it is still small, falls
 * back to the representative demo dataset so the terminal stays populated.
 */
export async function AurumProducts() {
  let data: Ingredient[] = INGREDIENTS;
  try {
    const wp = await getProducts({ perPage: 100 });
    const mapped = wp.map(mapWp);
    if (mapped.length >= 8) data = mapped; // use live data once the catalogue is rich enough
  } catch {
    /* keep demo dataset */
  }

  return (
    <div className="-mt-16 min-h-screen pt-24">
      <IngredientTerminal data={data} />
    </div>
  );
}
