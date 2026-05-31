'use client';

import { useTheme, setTheme } from '@/lib/use-theme';

/** Two-state pill switching the whole site between Aurum (dark) and Verdant (light). */
export function ThemeToggle() {
  const theme = useTheme();
  const next = theme === 'aurum' ? 'verdant' : 'aurum';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Theme: ${theme} — click for ${next}`}
      className="group flex items-center gap-1 rounded-full border border-border p-0.5 text-[11px] uppercase tracking-label"
    >
      <span
        className={
          'rounded-full px-2.5 py-1 transition-colors ' +
          (theme === 'aurum' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground')
        }
      >
        Aurum
      </span>
      <span
        className={
          'rounded-full px-2.5 py-1 transition-colors ' +
          (theme === 'verdant' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground')
        }
      >
        Verdant
      </span>
    </button>
  );
}
