import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getTeam, stripHtml } from '@/lib/wordpress';
import { ParallaxBg } from '@/components/about/parallax-bg';
import { Reveal } from '@/components/animation/reveal';
import { ROUTES } from '@/lib/constants';
import type { WPTeamMember } from '@/types/wordpress';
import { IS_AURUM } from '@/lib/edition';
import { AurumAbout } from '@/components/editions/aurum/about';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'About — A Gem Aromatics Group Company',
  description:
    'Krystal Ingredients Private Limited — manufacturer, distributor and global exporter of aroma chemicals, essential oils and specialty ingredients, part of the Gem Aromatics Group.',
};

export default async function AboutPage() {
  if (IS_AURUM) return <AurumAbout />;
  const team = await getTeam().catch(() => [] as WPTeamMember[]);

  return (
    <div className="relative -mt-16 overflow-hidden">
      <ParallaxBg />

      <div className="relative z-10 mx-auto max-w-container px-6 lg:px-10">
        {/* Hero */}
        <section className="flex min-h-screen flex-col justify-center py-32">
          <Reveal>
            <p className="eyebrow mb-8">A Gem Aromatics Group Company</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="max-w-5xl font-display text-display-sm font-light leading-[1.0] text-ink lg:text-display-lg">
              Synthesizing nature &amp; science.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-xl text-xl leading-relaxed text-clay">
              Krystal Ingredients Private Limited manufactures, distributes and exports a portfolio
              of more than ninety aroma chemicals, essential oils and specialty ingredients to
              industries worldwide.
            </p>
          </Reveal>
        </section>

        {/* Mission / Vision */}
        <section className="grid gap-16 py-24 md:grid-cols-2">
          <Reveal>
            <div>
              <p className="eyebrow mb-5">Mission</p>
              <p className="font-display text-3xl font-light leading-snug text-ink">
                To supply the global fragrance and specialty-chemical industry with ingredients of
                uncompromising purity and absolute consistency.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="eyebrow mb-5">Vision</p>
              <p className="font-display text-3xl font-light leading-snug text-ink">
                To be the most trusted independent ingredients partner between India&apos;s
                manufacturing strength and the world&apos;s leading brands.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Group */}
        <section className="py-24">
          <Reveal>
            <p className="eyebrow mb-8">The Gem Aromatics Group</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl font-display text-display-sm font-light leading-[1.04] text-ink">
              Backed by decades of integrated aromatic manufacturing.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-prose text-lg leading-relaxed text-clay">
              As part of the Gem Aromatics Group, Krystal Ingredients draws on shared R&amp;D,
              raw-material security and quality systems that span the group — the vertical depth
              behind tighter specifications and fewer disruptions for our customers.
            </p>
          </Reveal>
        </section>

        {/* Leadership */}
        {team.length > 0 && (
          <section className="py-24">
            <Reveal>
              <p className="eyebrow mb-10">Leadership</p>
            </Reveal>
            <Reveal stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m) => {
                const photo = m._embedded?.['wp:featuredmedia']?.[0];
                const name = stripHtml(m.title.rendered);
                return (
                  <div key={m.id} className="glass rounded-lg p-6">
                    <div className="relative mb-5 h-20 w-20 overflow-hidden rounded-full bg-card">
                      {photo?.source_url && (
                        <Image src={photo.source_url} alt={photo.alt_text || name} fill sizes="80px" className="object-cover" />
                      )}
                    </div>
                    <p className="font-display text-xl text-ink">{name}</p>
                    {m.meta?.job_title && <p className="mt-1 text-sm text-clay">{m.meta.job_title}</p>}
                  </div>
                );
              })}
            </Reveal>
          </section>
        )}

        {/* CTA */}
        <section className="py-32 text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl font-display text-display-sm font-light leading-[1.04] text-ink">
              Let&apos;s build better ingredient solutions together.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href={ROUTES.contact}
              className="group mt-10 inline-flex h-14 items-center gap-2 rounded-full bg-ink px-10 text-sm font-medium text-sand transition-transform duration-500 ease-lux hover:-translate-y-1"
            >
              Request a Quote
              <span className="transition-transform duration-500 ease-lux group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
