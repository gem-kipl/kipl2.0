/**
 * Editable site content for the Krystal Ingredients immersive site.
 *
 * This is the single source of truth for the homepage experience. Every string,
 * category, country and metric is editable here. To make it CMS-editable, map
 * each block to a WordPress ACF Options page / CPT (see WORDPRESS_IMPLEMENTATION
 * in REDESIGN_STRATEGY.md) and replace these constants with fetched data.
 */

export const HERO = {
  eyebrow: 'A Gem Aromatics Group Company',
  headline: ['Global Supplier of Aroma Chemicals,', 'Essential Oils &', 'Specialty Ingredients'],
  subheadline:
    'Delivering high-quality ingredient solutions to manufacturers, formulators and global industries through innovation, quality assurance and dependable supply.',
  primaryCta: { label: 'Explore Products', href: '/products' },
  secondaryCta: { label: 'Request Quote', href: '/contact' },
};

export const SCIENCE = {
  eyebrow: 'The Science of Ingredients',
  heading: 'Where molecular precision becomes the foundation of scent.',
  body: 'Krystal Ingredients manufactures, distributes and exports a portfolio of more than ninety aroma chemicals, essential oils and specialty ingredients. Backed by the manufacturing depth of the Gem Aromatics Group, we pair laboratory-grade consistency with the supply reliability that global formulators depend on.',
  timeline: [
    { year: 'Origin', label: 'Gem Aromatics Group', text: 'Rooted in decades of aromatic manufacturing heritage.' },
    { year: 'Capability', label: 'Integrated Manufacturing', text: 'From raw isolates to finished specialty compounds.' },
    { year: 'Portfolio', label: '90+ Ingredients', text: 'Nine core verticals across the fragrance value chain.' },
    { year: 'Reach', label: '15+ Countries', text: 'A dependable export network spanning four continents.' },
  ],
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  applications: string[];
  industries: string[];
};

export const CATEGORIES: Category[] = [
  {
    slug: 'mint-verticals',
    name: 'Mint Verticals',
    description:
      'A complete spectrum of mint-derived aroma chemicals and naturals, engineered for cooling, freshness and olfactive clarity.',
    applications: ['Oral care', 'Confectionery', 'Fine fragrance', 'Topical formulations'],
    industries: ['Personal Care', 'Flavor & Fragrance', 'Cosmetics'],
  },
  {
    slug: 'clove-derivatives',
    name: 'Clove & Derivatives',
    description:
      'Eugenol and downstream derivatives delivering warm, spicy, balsamic character with high purity and batch consistency.',
    applications: ['Fragrance compounding', 'Flavor systems', 'Antioxidant intermediates'],
    industries: ['Fine Fragrance', 'Flavor & Fragrance', 'Industrial'],
  },
  {
    slug: 'citral',
    name: 'Citral',
    description:
      'Bright, lemony citral and its isolates — a cornerstone building block for citrus accords and vitamin intermediates.',
    applications: ['Citrus accords', 'Home care', 'Vitamin synthesis'],
    industries: ['Home Care', 'Fine Fragrance', 'Industrial'],
  },
  {
    slug: 'phenol',
    name: 'Phenol',
    description:
      'Phenolic aroma chemicals offering smoky, medicinal and leathery facets for sophisticated fragrance architecture.',
    applications: ['Fragrance bases', 'Specialty intermediates'],
    industries: ['Fine Fragrance', 'Industrial'],
  },
  {
    slug: 'orange-oil-isolates',
    name: 'Orange Oil & Isolates',
    description:
      'Cold-pressed orange oil and its isolates, delivering radiant, juicy top notes and natural solvency.',
    applications: ['Citrus fragrance', 'Home care', 'Flavor systems', 'Natural cleaning'],
    industries: ['Home Care', 'Personal Care', 'Flavor & Fragrance'],
  },
  {
    slug: 'basil-isolates',
    name: 'Basil Isolates',
    description:
      'Herbaceous, green and aromatic basil isolates that bring lift and natural complexity to compositions.',
    applications: ['Fine fragrance', 'Aromatherapy', 'Flavor'],
    industries: ['Fine Fragrance', 'Personal Care'],
  },
  {
    slug: 'cineol-derivatives',
    name: 'Cineol Derivatives',
    description:
      'Eucalyptus-derived cineol and derivatives prized for fresh, camphoraceous and therapeutic profiles.',
    applications: ['Oral & topical care', 'Home care', 'Wellness'],
    industries: ['Personal Care', 'Home Care', 'Industrial'],
  },
  {
    slug: 'essential-oils-aromatics',
    name: 'Essential Oils & Aromatics',
    description:
      'A curated range of natural essential oils and aromatics, quality-controlled for identity, potency and traceability.',
    applications: ['Fine fragrance', 'Aromatherapy', 'Cosmetics', 'Wellness'],
    industries: ['Fine Fragrance', 'Cosmetics', 'Personal Care'],
  },
  {
    slug: 'cooling-agents',
    name: 'Cooling Agents',
    description:
      'High-performance cooling agents delivering long-lasting, controllable freshness without bitterness.',
    applications: ['Oral care', 'Skincare', 'Confectionery', 'Beverages'],
    industries: ['Personal Care', 'Cosmetics', 'Flavor & Fragrance'],
  },
];

export type Industry = { slug: string; name: string; blurb: string };

export const INDUSTRIES: Industry[] = [
  { slug: 'fine-fragrance', name: 'Fine Fragrance', blurb: 'Olfactive building blocks for perfumers and fragrance houses.' },
  { slug: 'personal-care', name: 'Personal Care', blurb: 'Compliant, sensorial ingredients for skin, hair and oral care.' },
  { slug: 'home-care', name: 'Home Care', blurb: 'Performance and scent for detergents, cleaners and air care.' },
  { slug: 'cosmetics', name: 'Cosmetics', blurb: 'Cosmetic-grade chemistry meeting global regulatory standards.' },
  { slug: 'industrial', name: 'Industrial Applications', blurb: 'Robust intermediates for demanding industrial processes.' },
];

export const COUNTRIES = [
  'USA', 'UK', 'Germany', 'France', 'Netherlands', 'Spain', 'Switzerland', 'Turkey',
  'China', 'Indonesia', 'Vietnam', 'Thailand', 'Nepal', 'South Africa', 'Australia',
] as const;

export const CERTIFICATIONS = [
  { code: 'ISO 9001', label: 'Quality Management' },
  { code: 'ISO 14001', label: 'Environmental Management' },
  { code: 'ISO 45001', label: 'Occupational Health & Safety' },
  { code: 'FDA', label: 'FDA Registered' },
  { code: 'GMP', label: 'Good Manufacturing Practice' },
  { code: 'Halal', label: 'Halal Certified' },
  { code: 'Kosher', label: 'Kosher Certified' },
] as const;

export const METRICS = [
  { value: 90, suffix: '+', label: 'Products' },
  { value: 15, suffix: '+', label: 'Export Markets' },
  { value: 7, suffix: '', label: 'Certified Standards' },
  { value: 9, suffix: '', label: 'Core Verticals' },
] as const;

export const FINAL_CTA = {
  eyebrow: 'Partnership',
  heading: "Let's Build Better Ingredient Solutions Together",
  body: 'Tell us the molecule, the market and the volume. Our team responds with availability, documentation and a sample — backed by dependable global supply.',
  cta: { label: 'Request a Quote', href: '/contact' },
};
