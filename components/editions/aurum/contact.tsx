import { ContactForm } from '@/components/forms/contact-form';

/** Aurum edition Contact / RFQ console. Pre-fills products from the Terminal basket. */
export function AurumContact({ items }: { items?: string }) {
  const list = items ? items.split(',').map((s) => s.trim()).filter(Boolean) : [];
  const prefill = list.length ? `CAS: ${list.join(', ')}` : '';

  return (
    <div className="-mt-16 pt-28">
      <div className="mx-auto max-w-container px-6 pb-24 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow mb-6">Let&apos;s Build Together</p>
            <h1 className="font-display text-display font-light leading-[1.04] text-foreground">
              Let&apos;s Create
              <br />
              <span className="text-gradient-brand">Together.</span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">
              Share your requirement and our team responds with availability, documentation and a
              sample — backed by dependable global supply.
            </p>

            {list.length > 0 && (
              <div className="mt-8">
                <p className="eyebrow mb-3">Your Quote Request ({list.length})</p>
                <div className="flex flex-wrap gap-2">
                  {list.map((c) => (
                    <span key={c} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-accent">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <dl className="mt-10 space-y-5 text-sm">
              <div>
                <dt className="font-semibold text-foreground">Sales &amp; Quotes</dt>
                <dd className="text-muted-foreground">[sales@krystalingredients.com] · [+91 XXXXX XXXXX]</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Export Desk</dt>
                <dd className="text-muted-foreground">[exports@krystalingredients.com] · [WhatsApp]</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Headquarters</dt>
                <dd className="text-muted-foreground">[Mumbai, India] · Manufacturing: [Dahej, Gujarat]</dd>
              </div>
            </dl>
          </div>

          <div className="glass rounded-xl p-6 sm:p-8">
            <ContactForm defaultProduct={prefill} />
          </div>
        </div>
      </div>
    </div>
  );
}
