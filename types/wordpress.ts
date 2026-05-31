/**
 * TypeScript interfaces for the Krystal Ingredients WordPress REST API.
 * Maps the CPTs/taxonomies registered by krystal-demo-importer.php:
 *   - product (product_category, application taxonomies)
 *   - certification
 *   - team_member  (Leadership)
 *   - export_country
 *
 * Custom meta fields (cas_number, purity_grade, etc.) are only present if the
 * WordPress side exposes them in REST — see wp-headless-rest-support.php.
 */

export interface WPRendered {
  rendered: string;
  protected?: boolean;
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
    sizes?: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

/** The `_embedded` block returned when a request uses `?_embed`. */
export interface WPEmbedded {
  'wp:featuredmedia'?: WPMedia[];
  'wp:term'?: WPTerm[][];
}

export interface WPBase {
  id: number;
  slug: string;
  link: string;
  status: string;
  date: string;
  modified: string;
  title: WPRendered;
  _embedded?: WPEmbedded;
}

export interface WPPage extends WPBase {
  content: WPRendered;
  excerpt: WPRendered;
  featured_media: number;
  parent: number;
  menu_order: number;
}

export interface ProductMeta {
  cas_number?: string;
  purity_grade?: string;
  appearance?: string;
  odor?: string;
  iupac_name?: string;
  synonyms?: string;
  grade?: string;
  hs_code?: string;
  packaging?: string;
}

/** Ordered label/value pairs for the product specification table. */
export const PRODUCT_SPEC_FIELDS: { key: keyof ProductMeta; label: string }[] = [
  { key: 'cas_number', label: 'CAS Number' },
  { key: 'iupac_name', label: 'IUPAC Name' },
  { key: 'synonyms', label: 'Synonyms' },
  { key: 'purity_grade', label: 'Purity / Grade' },
  { key: 'grade', label: 'Grade' },
  { key: 'appearance', label: 'Appearance' },
  { key: 'odor', label: 'Odor' },
  { key: 'hs_code', label: 'HS Code' },
  { key: 'packaging', label: 'Packaging' },
];

export interface WPProduct extends WPBase {
  content: WPRendered;
  excerpt: WPRendered;
  featured_media: number;
  meta?: ProductMeta;
  product_category?: number[];
  application?: number[];
}

export interface CertificationMeta {
  certificate_number?: string;
  issuing_body?: string;
}

export interface WPCertification extends WPBase {
  content: WPRendered;
  meta?: CertificationMeta;
}

export interface TeamMemberMeta {
  job_title?: string;
  display_order?: number;
}

export interface WPTeamMember extends WPBase {
  content: WPRendered;
  meta?: TeamMemberMeta;
}

export interface ExportCountryMeta {
  region?: string;
  iso_code?: string;
}

export interface WPExportCountry extends WPBase {
  meta?: ExportCountryMeta;
}

/** Normalized shapes used by the UI (decoupled from raw REST). */
export interface ProductCard {
  id: number;
  slug: string;
  name: string;
  excerpt: string;
  cas: string;
  purity: string;
  image: { src: string; alt: string } | null;
  categories: string[];
  applications: string[];
}
