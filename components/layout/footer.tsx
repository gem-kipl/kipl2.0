import Link from 'next/link';
import { NAV_LINKS, ROUTES } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="chapter-dark">
      <div className="mx-auto max-w-container px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-3xl tracking-editorial">Krystal Ingredients</span>
            </div>
            <p className="mt-2 text-xs uppercase tracking-label text-gold">
              Where Science Meets Scent
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand/60">
              A Gem Aromatics Group company — manufacturer, distributor and global exporter of aroma
              chemicals, essential oils and specialty ingredients.
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-label text-sand/40">Explore</p>
            <ul className="mt-4 space-y-3 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sand/80 transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-label text-sand/40">Get in touch</p>
            <ul className="mt-4 space-y-3 text-sm text-sand/80">
              <li>
                <Link href={ROUTES.contact} className="transition-colors hover:text-gold">
                  Contact &amp; RFQ
                </Link>
              </li>
              <li>[sales@krystalingredients.com]</li>
              <li>[+91 XXXXX XXXXX]</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-sand/15 pt-6 text-xs text-sand/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Krystal Ingredients Private Limited. All rights reserved.</p>
          <p>ISO 9001 · ISO 14001 · ISO 45001 · FDA · GMP · Halal · Kosher</p>
        </div>
      </div>
    </footer>
  );
}
