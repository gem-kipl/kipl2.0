import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, ROUTES } from '@/lib/constants';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { MobileNav } from '@/components/layout/mobile-nav';
import { IS_AURUM } from '@/lib/edition';

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="glass">
        <div className="mx-auto flex h-16 max-w-container items-center px-6 lg:px-10">
          <Link href={ROUTES.home} className="flex items-center" aria-label="Krystal Ingredients — home">
            {/* white chip keeps the full-colour logo legible on light or dark headers */}
            <span className="rounded-md bg-white px-2 py-1">
              <Image src="/logo.webp" alt="Krystal Ingredients" width={200} height={120} priority className="h-9 w-auto" />
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground/80 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
            {!IS_AURUM && <ThemeToggle />}
            <Link
              href={ROUTES.contact}
              className="inline-flex h-9 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-transform duration-500 ease-lux hover:-translate-y-0.5"
            >
              Request Quote
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-3 md:hidden">
            {!IS_AURUM && <ThemeToggle />}
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
