import type { Config } from 'tailwindcss';

/**
 * Krystal Ingredients — dual-theme token system.
 * Colors resolve to CSS variables (rgb channels) so the whole site re-skins by
 * swapping `data-theme` on <html>:
 *   • "aurum"   — dark espresso + liquid gold (Option 2, default)
 *   • "verdant" — light blue/green from the logo (Option 1)
 * Values live in app/globals.css. The rgb(var(--x) / <alpha-value>) form keeps
 * Tailwind opacity modifiers (bg-ink/90, text-sand/70 …) working.
 */
const v = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand shade ramps (fixed, used mostly by 3D / decorative)
        water: { light: '#35A8E0', DEFAULT: v('--c-accent'), dark: '#0E4F9E' },
        leaf: { pale: '#C7DE6A', light: '#8DC63F', DEFAULT: v('--c-accent2'), dark: '#1F7A3D' },

        // Neutral aliases → theme variables
        mist: v('--c-bg'),
        sand: v('--c-bg'),
        deep: v('--c-fg'),
        ink: v('--c-fg'),
        clay: v('--c-muted-fg'),
        slate: v('--c-muted-fg'),
        copper: v('--c-accent'),
        gold: v('--c-accent2'),

        // Semantic
        background: v('--c-bg'),
        foreground: v('--c-fg'),
        primary: { DEFAULT: v('--c-btn'), foreground: v('--c-btn-fg') },
        secondary: { DEFAULT: v('--c-surface2'), foreground: v('--c-fg') },
        muted: { DEFAULT: v('--c-surface2'), foreground: v('--c-muted-fg') },
        accent: { DEFAULT: v('--c-accent'), foreground: v('--c-accent-fg') },
        card: { DEFAULT: v('--c-card'), foreground: v('--c-card-fg') },
        input: v('--c-input'),
        border: v('--c-border'),
        ring: v('--c-ring'),
        destructive: { DEFAULT: '#9B2C2C', foreground: '#F3ECE0' },
      },
      backgroundImage: {
        brand: 'linear-gradient(120deg, var(--grad-from), var(--grad-to))',
        'brand-soft': 'linear-gradient(135deg, var(--grad-from), var(--grad-to))',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // reduced editorial scale (Option 2 spec: H1 ~72–88px)
        'display-sm': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        display: ['clamp(2.75rem, 6vw, 5rem)', { lineHeight: '1.04', letterSpacing: '-0.022em' }],
        'display-lg': ['clamp(3.25rem, 7vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
      },
      maxWidth: { container: '1320px', prose: '68ch' },
      letterSpacing: { editorial: '-0.02em', label: '0.18em' },
      borderRadius: { lg: '0.75rem', md: '0.5rem', sm: '0.25rem' },
      transitionTimingFunction: { lux: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { 'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both' },
    },
  },
  plugins: [],
};

export default config;
