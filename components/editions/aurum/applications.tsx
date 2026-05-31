import Link from 'next/link';
import { Reveal } from '@/components/animation/reveal';
import { HeroPhoto } from '@/components/editions/aurum/hero-photo';
import { getSiteContent } from '@/lib/site-config';
import { ROUTES } from '@/lib/constants';

const SECTORS = [
  { name: 'Fine Fragrance', items: ['Perfumes', 'Eau de Toilette', 'Fragrance compounds', 'Fixatives'] },
  { name: 'Cosmetics', items: ['Skincare', 'Colour cosmetics', 'Sensorial actives', 'Preservation'] },
  { name: 'Personal Care', items: ['Hair care', 'Oral care', 'Body care', 'Deodorants'] },
  { name: 'Home Care', items: ['Detergents', 'Air care', 'Surface cleaners', 'Fabric softeners'] },
  { name: 'Pharmaceuticals', items: ['Excipients', 'Active intermediates', 'Cooling agents', 'Flavour masking'] },
  { name: 'Food & Beverages', items: ['Flavour systems', 'Confectionery', 'Beverages', 'Mint & menthol'] },
];

const FEATURES = ['Sustainable Sourcing', 'Consistent Quality', 'Innovation Driven', 'Global Partnership'];

export async function AurumApplications() {
  const { heroImages } = await getSiteContent();
  return (
    <div className="-mt-16">
      <section className="relative flex min-h-[60vh] items-center overflow-hidden">
        <HeroPhoto src={heroImages.applications} focus="center" />
        <div className="mx-auto w-full max-w-container px-6 pt-28 lg:px-10">
          <p className="eyebrow mb-6">Powering Innovation Across Industries</p>
          <h1 className="max-w-3xl font-display text-display font-light leading-[1.04] text-foreground">
            Versatile Ingredients.
            <br />
            <span className="text-gradient-brand">Limitless Possibilities.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Our high-performance ingredients are trusted by industry leaders across diverse sectors to
            create exceptional products that perform and delight.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-container px-6 py-16 lg:px-10">
        <Reveal stagger className="grid gap-px overflow-hidden rounded-xl border border-border/60 bg-border/30 md:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((s) => (
            <div key={s.name} className="group bg-card p-7 transition-colors hover:bg-secondary">
              <h3 className="font-display text-2xl text-foreground">{s.name}</h3>
              <ul className="mt-4 space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-accent" />
                    {it}
                  </li>
                ))}
              </ul>
              <Link href={ROUTES.products} className="mt-6 inline-block text-sm text-accent hover:underline">
                View Ingredients →
              </Link>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="border-t border-border/40">
        <div className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-6 px-6 py-10 lg:px-10">
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {FEATURES.map((f) => (
              <span key={f} className="text-sm text-muted-foreground">
                <span className="mr-2 text-accent">◆</span>
                {f}
              </span>
            ))}
          </div>
          <Link href={ROUTES.contact} className="inline-flex h-11 items-center rounded-full bg-brand px-7 text-sm font-medium text-white">
            Let&apos;s Create Together →
          </Link>
        </div>
      </section>
    </div>
  );
}
