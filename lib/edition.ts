/**
 * Edition system — one codebase, two subdomains.
 *
 *   NEXT_PUBLIC_EDITION=current  → the experimental dual-theme build (Aurum/Verdant toggle)
 *   NEXT_PUBLIC_EDITION=aurum    → the locked dark-amber build that recreates the mockups
 *
 * Set the flag per deployment (e.g. one Vercel project per subdomain). Defaults
 * to "current" so existing behaviour is unchanged.
 */
export type Edition = 'current' | 'aurum';

export const EDITION: Edition =
  process.env.NEXT_PUBLIC_EDITION === 'aurum' ? 'aurum' : 'current';

export const IS_AURUM = EDITION === 'aurum';
