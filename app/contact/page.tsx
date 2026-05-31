import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/contact-form';
import { IS_AURUM } from '@/lib/edition';
import { AurumContact } from '@/components/editions/aurum/contact';

export const metadata: Metadata = {
  title: 'Contact & Request a Quote',
  description:
    'Contact Krystal Ingredients for quotes, samples & documentation. Sales, quality & export desks respond within 1–2 business days.',
};

export default function ContactPage({ searchParams }: { searchParams: { items?: string } }) {
  if (IS_AURUM) return <AurumContact items={searchParams?.items} />;
  return (
    <div className="mx-auto max-w-container px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s Talk Specifications.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Whether you need a quote, a sample, or a regulatory document, the right person will
            respond within [X] business days.
          </p>

          <dl className="mt-8 space-y-6 text-sm">
            <div>
              <dt className="font-semibold">Sales &amp; Quotes</dt>
              <dd className="text-muted-foreground">[sales@krystalingredients.com] · [+91 XXXXX XXXXX]</dd>
            </div>
            <div>
              <dt className="font-semibold">Quality &amp; Documentation</dt>
              <dd className="text-muted-foreground">[quality@krystalingredients.com]</dd>
            </div>
            <div>
              <dt className="font-semibold">Export Desk</dt>
              <dd className="text-muted-foreground">[exports@krystalingredients.com] · [WhatsApp]</dd>
            </div>
            <div>
              <dt className="font-semibold">Visit Us</dt>
              <dd className="text-muted-foreground">[Registered office] · [Manufacturing site(s)]</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border bg-card p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
