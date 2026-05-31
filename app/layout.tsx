import type { Metadata } from 'next';
import { Fraunces, Archivo } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/providers/smooth-scroll';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { APP_NAME } from '@/lib/constants';
import { IS_AURUM } from '@/lib/edition';
import { JsonLd } from '@/components/seo/json-ld';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${APP_NAME} — Where Science Meets Scent`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    'Krystal Ingredients Private Limited — a Gem Aromatics Group company. Global manufacturer, distributor and exporter of aroma chemicals, essential oils and specialty ingredients.',
  openGraph: { siteName: APP_NAME, type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="aurum"
      suppressHydrationWarning
      className={`${fraunces.variable} ${archivo.variable}`}
    >
      <body className="no-js">
        {/* Apply theme + drop no-js before paint. Aurum edition locks the theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: IS_AURUM
              ? `document.documentElement.dataset.theme='aurum';document.body.classList.remove('no-js');`
              : `(function(){try{var t=localStorage.getItem('krystal-theme')||'aurum';document.documentElement.dataset.theme=t;}catch(e){}document.body.classList.remove('no-js');})();`,
          }}
        />
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Krystal Ingredients Private Limited',
            url: siteUrl,
            logo: `${siteUrl}/logo.webp`,
            description:
              'Manufacturer, distributor and global exporter of aroma chemicals, essential oils and specialty ingredients.',
            parentOrganization: { '@type': 'Organization', name: 'Gem Aromatics Group' },
            address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
            slogan: 'Where Science Meets Scent',
          }}
        />
        <SmoothScroll>
          <Header />
          {/* pt-16 clears the fixed header on inner pages; the hero pulls back up under it. */}
          <main className="pt-16">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
