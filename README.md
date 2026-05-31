# Krystal Ingredients — Headless Frontend

A Next.js 14 (App Router) + TypeScript + Tailwind frontend that consumes the
Krystal Ingredients WordPress site as a **headless CMS** via the REST API.

## Stack
- Next.js 14 App Router (Server Components, ISR)
- TypeScript (strict), Tailwind CSS
- React Hook Form + Zod (RFQ/contact form)
- Native `fetch` data layer with per-request timeouts and ISR caching

## Getting started

```bash
cp .env.example .env.local   # then edit values
npm install
npm run dev                  # http://localhost:3000
```

### Environment variables
| Var | Purpose |
| --- | --- |
| `WP_API_URL` | WordPress REST base, incl. `/wp-json` (no trailing slash). |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this frontend (canonical/OG). |

## How it talks to WordPress
All data is read in Server Components via `lib/wordpress.ts`:
- Pages → `/wp/v2/pages`
- Products (CPT) → `/wp/v2/product` (+ `product_category`, `application` taxonomies)
- Certifications → `/wp/v2/certification`
- Leadership → `/wp/v2/team_member`

Content is revalidated every 5 min (ISR). Every fetch fails gracefully — if the
WordPress host is unreachable, pages still render with empty states / fallbacks.

### ⚠️ Required on the WordPress side
Custom fields (CAS number, purity grade, certificate number, etc.) are only
returned by REST if registered with `show_in_rest`. Activate the companion
plugin **`wp-headless-rest-support.php`** (in the repo root) on the WordPress
site. Without it, those fields render as "—".

CPTs/taxonomies/content themselves come from **`krystal-demo-importer.php`**.

## Routes
| Path | Source |
| --- | --- |
| `/` | Static hero + live featured products |
| `/products` | Product CPT (filter by `?category=` / `?application=`) |
| `/products/[slug]` | Single product (SSG + ISR) |
| `/applications` and `/applications/[slug]` | Industry pages + filtered products |
| `/about` | WP `about` page content + Leadership CPT |
| `/quality-compliance` | Certification CPT |
| `/global-exports` | WP `global-exports` page content (with fallback) |
| `/contact` | RFQ form → `POST /api/contact` |

## Production checklist
- Replace every `[BRACKETED PLACEHOLDER]` in copy with verified facts.
- Wire `app/api/contact/route.ts` to real email/CRM delivery.
- Add the production frontend domain to `next.config.js` image `remotePatterns`
  if media is served from a CDN, and to CORS in `wp-headless-rest-support.php`
  only if you add browser-side WP calls.
