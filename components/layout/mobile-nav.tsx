'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS, ROUTES } from '@/lib/constants';

/** Full-screen mobile navigation. Shown below md; desktop uses the inline nav. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // lock scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
      >
        <span className={'block h-px w-6 bg-foreground transition-transform ' + (open ? 'translate-y-[7px] rotate-45' : '')} />
        <span className={'block h-px w-6 bg-foreground transition-opacity ' + (open ? 'opacity-0' : '')} />
        <span className={'block h-px w-6 bg-foreground transition-transform ' + (open ? '-translate-y-[7px] -rotate-45' : '')} />
      </button>

      {open && (
        <div className="fixed inset-0 top-16 z-40 bg-background">
          <nav className="mx-auto flex max-w-container flex-col px-6 py-6">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-border/50 py-5 font-display text-2xl text-foreground"
                style={{ animation: `fade-up 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s both` }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ROUTES.contact}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-brand text-sm font-medium text-white"
            >
              Request Quote
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
