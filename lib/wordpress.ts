/**
 * WordPress REST client for the Krystal Ingredients headless frontend.
 *
 * Uses the native `fetch` API (the App Router idiom) so requests run in Server
 * Components with built-in caching / ISR. Configure the base URL via env:
 *
 *   WP_API_URL=https://kipl1.gemaromatics.com/wp-json
 *
 * All reads are public GETs against /wp/v2. No credentials are needed for
 * published content; do NOT put application passwords in the frontend.
 */

import type {
  WPPage,
  WPProduct,
  WPCertification,
  WPTeamMember,
  WPMedia,
  WPTerm,
  ProductCard,
} from '@/types/wordpress';

const WP_API_URL = (process.env.WP_API_URL || 'https://kipl1.gemaromatics.com/wp-json').replace(
  /\/$/,
  ''
);

/** Default revalidation window (ISR) in seconds. Override per call as needed. */
const DEFAULT_REVALIDATE = 300;

export class WordPressError extends Error {
  constructor(
    message: string,
    public status: number,
    public url: string
  ) {
    super(message);
    this.name = 'WordPressError';
  }
}

type FetchParams = Record<string, string | number | boolean | undefined>;

async function wpFetch<T>(
  path: string,
  params: FetchParams = {},
  revalidate: number = DEFAULT_REVALIDATE
): Promise<T> {
  const url = new URL(`${WP_API_URL}/wp/v2/${path.replace(/^\//, '')}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  const res = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
    next: { revalidate },
    // Guard against a slow/unreachable WordPress host hanging builds/requests.
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new WordPressError(
      `WordPress request failed (${res.status} ${res.statusText})`,
      res.status,
      url.toString()
    );
  }
  return res.json() as Promise<T>;
}

/* ----------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------- */

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&hellip;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/&#8217;/g, '’')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

function featuredImage(item: { _embedded?: { 'wp:featuredmedia'?: WPMedia[] } }) {
  const media = item._embedded?.['wp:featuredmedia']?.[0];
  if (!media?.source_url) return null;
  return { src: media.source_url, alt: media.alt_text || '' };
}

function termsByTaxonomy(
  item: { _embedded?: { 'wp:term'?: WPTerm[][] } },
  taxonomy: string
): string[] {
  const groups = item._embedded?.['wp:term'] ?? [];
  return groups
    .flat()
    .filter((t) => t?.taxonomy === taxonomy)
    .map((t) => t.name);
}

export function toProductCard(p: WPProduct): ProductCard {
  return {
    id: p.id,
    slug: p.slug,
    name: stripHtml(p.title.rendered),
    excerpt: stripHtml(p.excerpt?.rendered ?? ''),
    cas: p.meta?.cas_number ?? '',
    purity: p.meta?.purity_grade ?? '',
    image: featuredImage(p),
    categories: termsByTaxonomy(p, 'product_category'),
    applications: termsByTaxonomy(p, 'application'),
  };
}

/* ----------------------------------------------------------------------------
 * Pages
 * ------------------------------------------------------------------------- */

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await wpFetch<WPPage[]>('pages', { slug, _embed: true });
  return pages[0] ?? null;
}

/* ----------------------------------------------------------------------------
 * Products
 * ------------------------------------------------------------------------- */

export interface ProductQuery {
  categorySlug?: string;
  applicationSlug?: string;
  perPage?: number;
  page?: number;
  search?: string;
}

export async function getProducts(query: ProductQuery = {}): Promise<ProductCard[]> {
  const params: FetchParams = {
    _embed: true,
    per_page: query.perPage ?? 24,
    page: query.page ?? 1,
    orderby: 'title',
    order: 'asc',
  };
  if (query.search) params.search = query.search;

  // Resolve taxonomy slugs to term IDs (REST filters by ID, not slug).
  if (query.categorySlug) {
    const id = await getTermId('product_category', query.categorySlug);
    if (id) params.product_category = id;
  }
  if (query.applicationSlug) {
    const id = await getTermId('application', query.applicationSlug);
    if (id) params.application = id;
  }

  const products = await wpFetch<WPProduct[]>('product', params);
  return products.map(toProductCard);
}

export async function getProductBySlug(slug: string): Promise<WPProduct | null> {
  const products = await wpFetch<WPProduct[]>('product', { slug, _embed: true });
  return products[0] ?? null;
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await wpFetch<WPProduct[]>('product', {
    per_page: 100,
    _fields: 'slug',
  });
  return products.map((p) => p.slug);
}

/* ----------------------------------------------------------------------------
 * Taxonomies
 * ------------------------------------------------------------------------- */

export async function getTerms(taxonomy: string): Promise<WPTerm[]> {
  return wpFetch<WPTerm[]>(taxonomy, { per_page: 100, hide_empty: false });
}

async function getTermId(taxonomy: string, slug: string): Promise<number | null> {
  const terms = await wpFetch<WPTerm[]>(taxonomy, { slug });
  return terms[0]?.id ?? null;
}

/* ----------------------------------------------------------------------------
 * Certifications & Leadership
 * ------------------------------------------------------------------------- */

export async function getCertifications(): Promise<WPCertification[]> {
  return wpFetch<WPCertification[]>('certification', { per_page: 50, _embed: true });
}

export async function getTeam(): Promise<WPTeamMember[]> {
  const team = await wpFetch<WPTeamMember[]>('team_member', { per_page: 50, _embed: true });
  return team.sort(
    (a, b) => (a.meta?.display_order ?? 0) - (b.meta?.display_order ?? 0)
  );
}
