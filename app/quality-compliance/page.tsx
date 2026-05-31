import type { Metadata } from 'next';
import { getCertifications, stripHtml } from '@/lib/wordpress';
import type { WPCertification } from '@/types/wordpress';
import { IS_AURUM } from '@/lib/edition';
import { AurumQuality } from '@/components/editions/aurum/quality';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Quality & Certifications — ISO, FDA, GMP, Halal, Kosher',
  description:
    'ISO, FDA, GMP, Halal & Kosher certified. Every Krystal Ingredients shipment includes CoA, SDS & full regulatory documentation.',
};

const DOCS = [
  'Certificate of Analysis (CoA), batch-specific',
  'Safety Data Sheet (SDS / MSDS), market-localized',
  'Allergen & regulatory declarations',
  '[Country-of-origin, REACH/IFRA statements as applicable]',
];

export default async function QualityPage() {
  if (IS_AURUM) return <AurumQuality />;
  let certs: WPCertification[] = [];
  try {
    certs = await getCertifications();
  } catch {
    certs = [];
  }

  return (
    <div className="mx-auto max-w-container px-4 py-12 sm:px-6 lg:px-8">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Compliance Is Not a Document. It&apos;s How We Operate.
        </h1>
        <p className="mt-3 text-muted-foreground">
          Every Krystal Ingredients consignment is backed by internationally recognized
          certifications and complete, market-ready documentation.
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight">Certifications</h2>
        {certs.length === 0 ? (
          <div className="mt-6 rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
            Certifications will appear here once added in WordPress.
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {certs.map((cert) => (
              <div key={cert.id} className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold">{stripHtml(cert.title.rendered)}</h3>
                {cert.content?.rendered && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stripHtml(cert.content.rendered)}
                  </p>
                )}
                {cert.meta?.certificate_number && (
                  <p className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
                    Cert. No. {cert.meta.certificate_number}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight">
          Everything You Need, With Every Shipment
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {DOCS.map((d) => (
            <li key={d} className="rounded-lg border bg-card p-4 text-sm">
              {d}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
