'use client';

import { useEffect, useState } from 'react';

export type Theme = 'aurum' | 'verdant';

export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'aurum';
  return (document.documentElement.dataset.theme as Theme) || 'aurum';
}

export function setTheme(t: Theme) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem('krystal-theme', t);
  } catch {
    /* ignore */
  }
}

/** Subscribe to the active theme (re-renders on toggle). */
export function useTheme(): Theme {
  const [theme, set] = useState<Theme>('aurum');
  useEffect(() => {
    set(getTheme());
    const obs = new MutationObserver(() => set(getTheme()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);
  return theme;
}
