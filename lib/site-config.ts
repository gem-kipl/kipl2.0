/**
 * WordPress-editable site content (homepage hero, stats, hero images).
 * Edited in wp-admin → Settings → Krystal Content, served from
 * /wp-json/krystal/v1/content. Falls back to defaults if WP is unreachable.
 */
const WP = (process.env.WP_API_URL || 'https://kipl1.gemaromatics.com/wp-json').replace(/\/$/, '');

export type HeroStat = { value: string; suffix: string; label: string; sub: string };

export type SiteContent = {
  hero: {
    eyebrow: string;
    headline1: string;
    headline2: string;
    headline3: string;
    subheadline: string;
    stats: HeroStat[];
  };
  heroImages: {
    manufacturing: string;
    applications: string;
    about: string;
    quality: string;
  };
};

export const SITE_CONTENT_DEFAULT: SiteContent = {
  hero: {
    eyebrow: 'Where Science Meets Scent',
    headline1: 'Global Solutions.',
    headline2: 'Pure Ingredients.',
    headline3: 'Trusted Worldwide.',
    subheadline:
      'Krystal Ingredients delivers high-quality aroma chemicals, essential oils and specialty ingredients to manufacturers and industries around the world — with uncompromising quality and dependable global supply.',
    stats: [
      { value: '90', suffix: '+', label: 'Products', sub: 'Aroma & specialty range' },
      { value: '25000', suffix: ' MT', label: 'Annual Capacity', sub: 'High-volume production' },
      { value: '40', suffix: '+', label: 'Countries', sub: 'Global export network' },
      { value: '3', suffix: '+', label: 'Decades', sub: 'Of trusted expertise' },
    ],
  },
  heroImages: {
    manufacturing: '/images/aurum/manufacturing.jpg',
    applications: '/images/aurum/applications.jpg',
    about: '/images/aurum/about.jpg',
    quality: '/images/aurum/quality.jpg',
  },
};

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const res = await fetch(`${WP}/krystal/v1/content`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return SITE_CONTENT_DEFAULT;
    const d = (await res.json()) as Partial<SiteContent>;
    return {
      hero: {
        ...SITE_CONTENT_DEFAULT.hero,
        ...(d.hero ?? {}),
        stats: d.hero?.stats?.length ? d.hero.stats : SITE_CONTENT_DEFAULT.hero.stats,
      },
      heroImages: { ...SITE_CONTENT_DEFAULT.heroImages, ...(d.heroImages ?? {}) },
    };
  } catch {
    return SITE_CONTENT_DEFAULT;
  }
}
