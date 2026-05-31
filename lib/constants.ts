export const APP_NAME = 'Krystal Ingredients';
export const APP_TAGLINE =
  'Aroma Chemicals, Essential Oils & Specialty Chemicals — Manufactured & Exported Worldwide';

export const ROUTES = {
  home: '/',
  about: '/about',
  products: '/products',
  applications: '/applications',
  quality: '/quality-compliance',
  exports: '/global-exports',
  manufacturing: '/manufacturing',
  contact: '/contact',
} as const;

export const NAV_LINKS = [
  { label: 'About', href: ROUTES.about },
  { label: 'Products', href: ROUTES.products },
  { label: 'Applications', href: ROUTES.applications },
  { label: 'Manufacturing', href: ROUTES.manufacturing },
  { label: 'Quality', href: ROUTES.quality },
  { label: 'Global Presence', href: ROUTES.exports },
] as const;

export const PRODUCT_CATEGORIES = [
  { name: 'Aroma Chemicals', slug: 'aroma-chemicals' },
  { name: 'Essential Oils', slug: 'essential-oils' },
  { name: 'Specialty Chemicals', slug: 'specialty-chemicals' },
] as const;

export const APPLICATIONS = [
  { name: 'Fragrance', slug: 'fragrance' },
  { name: 'Personal Care', slug: 'personal-care' },
  { name: 'Home Care', slug: 'home-care' },
  { name: 'Cosmetics', slug: 'cosmetics' },
  { name: 'Industrial', slug: 'industrial' },
] as const;

export const QUERY_KEYS = {
  products: ['products'],
  product: (slug: string) => ['product', slug],
} as const;
