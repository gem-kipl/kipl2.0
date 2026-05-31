import Link from 'next/link';
import type { Metadata } from 'next';
import { APPLICATIONS, ROUTES } from '@/lib/constants';
import { IS_AURUM } from '@/lib/edition';
import { AurumApplications } from '@/components/editions/aurum/applications';

export const metadata: Metadata = {
  title: 'Industries We Serve — Fragrance to Industrial',
  description:
    'Aroma & specialty chemicals for fragrance, personal care, home care, cosmetics & industrial applications. Find ingredients matched to your formulation.',
};

const DESCRIPTIONS: Record<string, string> = {
  fragrance: 'Olfactive building blocks for fine fragrance, functional perfumery, and fragrance houses.',
  'personal-care': 'Safe, compliant, sensorially refined ingredients for skin, hair, and body care.',
  'home-care': 'Performance and scent for detergents, cleaners, and air-care systems.',
  cosmetics: 'Cosmetic-grade chemistry meeting global regulatory and sensory standards.',
  industrial: 'Robust specialty chemistry for demanding industrial processes.',
};

export default function ApplicationsPage() {
  if (IS_AURUM) return <AurumApplications />;
  return (
    <div className="mx-auto max-w-container px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Ingredients, Matched to Your End Application.
        </h1>
        <p className="mt-3 text-muted-foreground">
          Whether you formulate fine fragrance or industrial systems, our portfolios are organized
          around how you actually work.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {APPLICATIONS.map((app) => (
          <Link
            key={app.slug}
            href={`${ROUTES.applications}/${app.slug}`}
            className="group rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="text-xl font-semibold group-hover:text-gold">{app.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{DESCRIPTIONS[app.slug]}</p>
            <span className="mt-4 inline-block text-sm font-medium">View ingredients →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
