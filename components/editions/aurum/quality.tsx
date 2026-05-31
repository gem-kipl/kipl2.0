import Link from 'next/link';
import { Reveal } from '@/components/animation/reveal';
import { Counter } from '@/components/animation/counter';
import { HeroPhoto } from '@/components/editions/aurum/hero-photo';
import { getSiteContent } from '@/lib/site-config';
import { ROUTES } from '@/lib/constants';

const CERTS = [
  { code: 'REACH', label: 'Registration, Evaluation & Authorisation of Chemicals', no: 'KRYSTAL/REACH/2024/0123' },
  { code: 'IFRA', label: 'International Fragrance Association — Member', no: 'KRYSTAL/IFRA/2024/088' },
  { code: 'ISO 9001:2015', label: 'Quality Management System', no: 'KRYSTAL/ISO9001/2024/056' },
  { code: 'ISO 14001:2015', label: 'Environmental Management System', no: 'KRYSTAL/ISO14001/2024/041' },
  { code: 'GMP', label: 'Good Manufacturing Practice', no: 'KRYSTAL/GMP/2024/072' },
];

const PROCESS = ['Raw Material Control', 'In-Process Monitoring', 'Finished Product Testing', 'Traceability', 'Continuous Improvement'];

export async function AurumQuality() {
  const { heroImages } = await getSiteContent();
  return (
    <div className="-mt-16">
      <section className="relative grid min-h-[70vh] items-center overflow-hidden">
        <HeroPhoto src={heroImages.quality} focus="center" />
        <div className="mx-auto grid w-full max-w-container items-center gap-10 px-6 pt-28 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div>
          <p className="eyebrow mb-6">Quality That Defines Excellence</p>
          <h1 className="font-display text-display font-light leading-[1.04] text-foreground">
            Trusted Quality.
            <br />
            <span className="text-gradient-brand">Global Compliance.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Quality is at the core of everything we do. Our rigorous systems and global compliance
            standards ensure the highest level of safety, purity and consistency in every product we
            deliver.
          </p>
          <Link href={ROUTES.contact} className="mt-8 inline-flex h-12 items-center rounded-full bg-brand px-8 text-sm font-medium text-white">
            Our Quality Commitment →
          </Link>
        </div>
        <Reveal className="glass rounded-xl p-8 text-center">
          <p className="eyebrow mb-4">Quality Promise</p>
          <Counter to={99} suffix=".9%" className="text-gradient-brand font-display text-6xl font-light" />
          <p className="mt-3 text-sm text-muted-foreground">Quality assurance rate across every consignment.</p>
        </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-container px-6 py-16 lg:px-10">
        <div className="mb-10 flex items-center justify-between">
          <span className="eyebrow">Our Certifications</span>
          <Link href={ROUTES.contact} className="text-sm text-accent hover:underline">View All Certificates →</Link>
        </div>
        <Reveal stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c) => (
            <div key={c.code} className="glass rounded-xl p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl text-foreground">{c.code}</h3>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#3DA63C]/40 px-2.5 py-0.5 text-[11px] text-[#3DA63C]">
                  ✓ Verified
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.label}</p>
              <p className="mt-4 font-mono text-[11px] text-accent">{c.no}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="border-t border-border/40">
        <div className="mx-auto flex max-w-container flex-wrap gap-x-10 gap-y-3 px-6 py-10 lg:px-10">
          {PROCESS.map((p) => (
            <span key={p} className="text-sm text-muted-foreground">
              <span className="mr-2 text-accent">◆</span>
              {p}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
