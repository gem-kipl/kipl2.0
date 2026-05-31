/**
 * Representative ingredient dataset for the Aurum "Ingredient Terminal".
 * Demo data modelled on Krystal's real categories — swap for the WordPress
 * `product` CPT (lib/wordpress.ts) when the full catalogue is loaded.
 */
export type IngredientTag = 'Aroma Chemical' | 'Essential Oil' | 'Specialty';

export type Ingredient = {
  name: string;
  cas: string;
  category: string; // matches CATEGORIES slug
  categoryLabel: string;
  tag: IngredientTag;
  mw: number; // g/mol
  purity: string;
  appearance: string;
  applications: string[];
};

export const INGREDIENTS: Ingredient[] = [
  { name: 'L-Menthol', cas: '2216-51-5', category: 'mint-verticals', categoryLabel: 'Mint Verticals', tag: 'Aroma Chemical', mw: 156.27, purity: '≥99%', appearance: 'White crystals', applications: ['Oral care', 'Confectionery', 'Topicals'] },
  { name: 'Menthone', cas: '14073-97-3', category: 'mint-verticals', categoryLabel: 'Mint Verticals', tag: 'Aroma Chemical', mw: 154.25, purity: '≥98%', appearance: 'Colourless liquid', applications: ['Fragrance', 'Flavour'] },
  { name: 'Peppermint Oil', cas: '8006-90-4', category: 'essential-oils-aromatics', categoryLabel: 'Essential Oils', tag: 'Essential Oil', mw: 0, purity: 'Natural', appearance: 'Pale yellow oil', applications: ['Oral care', 'Aromatherapy'] },
  { name: 'Eugenol', cas: '97-53-0', category: 'clove-derivatives', categoryLabel: 'Clove & Derivatives', tag: 'Aroma Chemical', mw: 164.2, purity: '≥99%', appearance: 'Pale yellow liquid', applications: ['Fragrance', 'Flavour', 'Dental'] },
  { name: 'Iso-Eugenol', cas: '97-54-1', category: 'clove-derivatives', categoryLabel: 'Clove & Derivatives', tag: 'Aroma Chemical', mw: 164.2, purity: '≥98%', appearance: 'Pale liquid', applications: ['Fine fragrance'] },
  { name: 'Eugenyl Acetate', cas: '93-28-7', category: 'clove-derivatives', categoryLabel: 'Clove & Derivatives', tag: 'Aroma Chemical', mw: 206.24, purity: '≥98%', appearance: 'Colourless liquid', applications: ['Fragrance compounding'] },
  { name: 'Citral', cas: '5392-40-5', category: 'citral', categoryLabel: 'Citral', tag: 'Aroma Chemical', mw: 152.23, purity: '≥95%', appearance: 'Pale yellow liquid', applications: ['Citrus accords', 'Vitamin A synthesis'] },
  { name: 'Citronellol', cas: '106-22-9', category: 'citral', categoryLabel: 'Citral', tag: 'Aroma Chemical', mw: 156.27, purity: '≥98%', appearance: 'Colourless liquid', applications: ['Fine fragrance', 'Cosmetics'] },
  { name: 'Geraniol', cas: '106-24-1', category: 'citral', categoryLabel: 'Citral', tag: 'Aroma Chemical', mw: 154.25, purity: '≥98%', appearance: 'Colourless liquid', applications: ['Rose accords', 'Personal care'] },
  { name: 'Phenol', cas: '108-95-2', category: 'phenol', categoryLabel: 'Phenol', tag: 'Specialty', mw: 94.11, purity: '≥99%', appearance: 'White crystals', applications: ['Intermediates', 'Specialty'] },
  { name: 'Guaiacol', cas: '90-05-1', category: 'phenol', categoryLabel: 'Phenol', tag: 'Aroma Chemical', mw: 124.14, purity: '≥99%', appearance: 'Colourless liquid', applications: ['Flavour', 'Smoky notes'] },
  { name: 'Orange Oil', cas: '8008-57-9', category: 'orange-oil-isolates', categoryLabel: 'Orange Oil & Isolates', tag: 'Essential Oil', mw: 0, purity: 'Cold-pressed', appearance: 'Orange liquid', applications: ['Home care', 'Flavour', 'Fragrance'] },
  { name: 'D-Limonene', cas: '5989-27-5', category: 'orange-oil-isolates', categoryLabel: 'Orange Oil & Isolates', tag: 'Aroma Chemical', mw: 136.23, purity: '≥96%', appearance: 'Colourless liquid', applications: ['Cleaning', 'Citrus fragrance'] },
  { name: 'Linalool', cas: '78-70-6', category: 'basil-isolates', categoryLabel: 'Basil Isolates', tag: 'Aroma Chemical', mw: 154.25, purity: '≥97%', appearance: 'Colourless liquid', applications: ['Fine fragrance', 'Personal care'] },
  { name: 'Methyl Chavicol', cas: '140-67-0', category: 'basil-isolates', categoryLabel: 'Basil Isolates', tag: 'Aroma Chemical', mw: 148.2, purity: '≥98%', appearance: 'Colourless liquid', applications: ['Fragrance', 'Flavour'] },
  { name: '1,8-Cineole', cas: '470-82-6', category: 'cineol-derivatives', categoryLabel: 'Cineol Derivatives', tag: 'Aroma Chemical', mw: 154.25, purity: '≥99%', appearance: 'Colourless liquid', applications: ['Oral care', 'Wellness'] },
  { name: 'Eucalyptus Oil', cas: '8000-48-4', category: 'essential-oils-aromatics', categoryLabel: 'Essential Oils', tag: 'Essential Oil', mw: 0, purity: 'Natural', appearance: 'Colourless oil', applications: ['Home care', 'Wellness'] },
  { name: 'Basil Oil', cas: '8015-73-4', category: 'essential-oils-aromatics', categoryLabel: 'Essential Oils', tag: 'Essential Oil', mw: 0, purity: 'Natural', appearance: 'Pale yellow oil', applications: ['Fine fragrance', 'Aromatherapy'] },
  { name: 'WS-23 Cooling Agent', cas: '51115-67-4', category: 'cooling-agents', categoryLabel: 'Cooling Agents', tag: 'Specialty', mw: 213.32, purity: '≥99%', appearance: 'White crystals', applications: ['Oral care', 'Beverages'] },
  { name: 'WS-3 Cooling Agent', cas: '39711-79-0', category: 'cooling-agents', categoryLabel: 'Cooling Agents', tag: 'Specialty', mw: 213.32, purity: '≥99%', appearance: 'White powder', applications: ['Skincare', 'Confectionery'] },
  { name: 'Vanillin', cas: '121-33-5', category: 'phenol', categoryLabel: 'Phenol', tag: 'Aroma Chemical', mw: 152.15, purity: '≥99%', appearance: 'White crystals', applications: ['Flavour', 'Fragrance'] },
  { name: 'Terpineol', cas: '8000-41-7', category: 'orange-oil-isolates', categoryLabel: 'Orange Oil & Isolates', tag: 'Aroma Chemical', mw: 154.25, purity: '≥97%', appearance: 'Colourless liquid', applications: ['Soap', 'Home care'] },
  { name: 'Benzyl Benzoate', cas: '120-51-4', category: 'phenol', categoryLabel: 'Phenol', tag: 'Specialty', mw: 212.24, purity: '≥99%', appearance: 'Colourless liquid', applications: ['Fixative', 'Cosmetics'] },
  { name: 'Carvone', cas: '99-49-0', category: 'mint-verticals', categoryLabel: 'Mint Verticals', tag: 'Aroma Chemical', mw: 150.22, purity: '≥98%', appearance: 'Colourless liquid', applications: ['Flavour', 'Oral care'] },
];

export const TOTAL_ACTIVES = '2,450+';
