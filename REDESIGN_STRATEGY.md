# Krystal Ingredients — Immersive Redesign

### "Where Science Meets Scent"

An Awwwards-class, editorial, luxury-industrial experience for **Krystal Ingredients
Private Limited** (a Gem Aromatics Group company). Built in Next.js so GSAP, Three.js
and smooth scrolling reach a quality Elementor cannot — while content stays
WordPress-editable via the headless REST layer.

---

## 1 · Strategy

| | |
|---|---|
| **Positioning** | The molecular foundation of the world's finest scents — science-led, supply-reliable. |
| **Tone** | Scientific · luxurious · editorial · minimal · sophisticated. |
| **Audience** | Perfumers, formulators, R&D and procurement at F&F houses and FMCG brands. |
| **Emotional arc** | Wonder (hero) → Credibility (science) → Discovery (ecosystem) → Belonging (industries) → Scale (global) → Trust (quality/metrics) → Action (CTA). |
| **Differentiator vs. typical chemical sites** | No stock people, no corporate blue, no factory clichés. Molecular motion, sand/copper/gold palette, magazine typography. |

---

## 2 · Visual Direction

- **Palette** — Sand `#EBE1CF` (ground), Ink `#1F1810` (type/dark sections), Copper
  `#B0633A` (accent), Gold `#C5811D` (highlight/CTA), Clay `#574C3C` (muted).
- **Type** — Display **Fraunces** (opsz, light weights, large editorial sizes); Body
  **Archivo**. Fluid `clamp()` display scale (`display-sm` → `display-lg`).
- **Texture** — Massive whitespace, hairline dividers, mono numeric labels (`01`, `02`),
  glassmorphism surfaces, grain-free flat color fields.
- **Imagery** (replace placeholders): macro oil droplets, crystalline isolates, lab
  glassware backlit, distillation columns, botanicals (mint/clove/basil/orange),
  molecular renders. Warm, desaturated, high-key. **Never** office/handshake/boardroom.

---

## 3 · Homepage Wireframe & Section Layouts

```
┌──────────────────────────────────────────────────────────┐
│ 01 HERO            full-bleed · Three.js molecular field   │
│   eyebrow · 3-line Fraunces headline (masked rise)         │
│   subhead · [Explore Products] [Request Quote] · scroll cue│
├──────────────────────────────────────────────────────────┤
│ 02 SCIENCE         editorial · big statement + body        │
│   4-card animated capability "timeline" (stagger reveal)   │
├──────────────────────────────────────────────────────────┤
│ 03 PRODUCT ECOSYSTEM   interactive explorer                │
│   left: 9 category list  |  right: live detail panel       │
│   (hover/click → description, applications, industries)    │
├──────────────────────────────────────────────────────────┤
│ 04 INDUSTRIES      DARK section · 5 animated cards (3-col)  │
├──────────────────────────────────────────────────────────┤
│ 05 GLOBAL PRESENCE  split · statement + counter 15+        │
│   15 country chips (glass, stagger, hover lift)            │
├──────────────────────────────────────────────────────────┤
│ 06 QUALITY         card surface · 7 certification tiles    │
│   (ISO 9001/14001/45001 · FDA · GMP · Halal · Kosher)      │
├──────────────────────────────────────────────────────────┤
│ 07 TRUST METRICS   4 count-up stats (90+ · 15+ · 7 · 9)    │
├──────────────────────────────────────────────────────────┤
│ 08 FINAL CTA       DARK · radial gold glow · big headline  │
└──────────────────────────────────────────────────────────┘
```

Rhythm alternates **light (sand) → dark (ink)** at sections 04 and 08 to create
chapters, à la Frequency Breathwork.

---

## 4 · Motion Design System

| Token | Value |
|---|---|
| Smooth scroll | Lenis, `duration 1.1`, exponential ease |
| Primary ease | `power3/power4.out` (GSAP) / `cubic-bezier(0.16,1,0.3,1)` (CSS `ease-lux`) |
| Reveal | fade + 40px rise, `start: top 82%`, `once: true` |
| Stagger | 0.12s between siblings |
| Hero intro | masked line rise (`yPercent 110→0`), 0.08s stagger, after eyebrow |
| Counters | 0→value over 2s, triggered at `top 88%` |
| Hover | `-translate-y-0.5/1`, 500ms `ease-lux`; arrows slide `translate-x-1` |
| 3D | molecular field, DPR≤2, ~90 nodes, paused offscreen, pointer parallax |

**Performance & a11y rules baked in:**
- `prefers-reduced-motion` → Lenis off, reveals show instantly, counters snap, Three.js
  skipped (static radial wash remains).
- Three.js paused via `IntersectionObserver` when hero leaves viewport.
- `will-change` only on revealing elements; geometry/material disposed on unmount.
- No scroll-jacking; ScrollTriggers are `once` (no scrub thrash).

---

## 5 · Component Library (built)

| Component | File | Notes |
|---|---|---|
| `SmoothScroll` | `providers/smooth-scroll.tsx` | Lenis ↔ GSAP ticker sync |
| `Reveal` | `components/animation/reveal.tsx` | scroll reveal, optional stagger |
| `Counter` | `components/animation/counter.tsx` | count-up on view |
| `MolecularField` | `components/three/molecular-field.tsx` | Three.js node/bond field |
| `Hero` | `components/home/hero.tsx` | section 01 |
| `CategoryExplorer` | `components/home/category-explorer.tsx` | section 03 |
| `*Section` | `components/home/sections.tsx` | sections 02, 04–08 |
| `useGSAP` | `lib/use-gsap.ts` | scoped GSAP context hook |

All copy/data centralized in **`lib/site-content.ts`** — every text, category, country,
certification and metric is editable in one place.

---

## 6 · Content Hierarchy (per page identity)

| Page | Hero motif | Signature interaction |
|---|---|---|
| **Home** | Molecular field | Category explorer |
| **About** | Heritage timeline | Group-companies reveal |
| **Products** | Isolate macro grid | Filterable catalog (live WP) |
| **Applications** | Industry split | Per-industry product pull |
| **Quality** | Certificate wall | Certificate reveal-on-scroll |
| **Global Presence** | Trade-route arcs | Animated map + counters |
| **Contact** | Quiet sand canvas | RFQ form (Resend) |

Each keeps the palette, type and motion system; only the hero motif changes — consistent
yet distinct.

---

## 7 · SEO & Schema Structure

- Metadata template in `app/layout.tsx`; per-page `generateMetadata`.
- `app/sitemap.ts` + `app/robots.ts` already dynamic (pulls live product slugs).
- **Add JSON-LD** (next step): `Organization` (home/about), `Product` (product pages),
  `BreadcrumbList`. Recommended `@graph` with `parentOrganization` → Gem Aromatics.
- Editorial H1→H2 hierarchy preserved; numeric labels are decorative (`aria-hidden`).
- Three.js canvas is `aria-hidden`; all content is real text (crawlable).

---

## 8 · WordPress Implementation Plan

The experience is a **headless Next.js frontend** consuming WordPress. Two binding tiers:

**A. Structured data (already wired)** — Products/Certifications/etc. come from the CPTs
in `krystal-demo-importer.php` via `lib/wordpress.ts`. Activate
`wp-headless-rest-support.php` to expose meta.

**B. Editorial copy (next step)** — Move `lib/site-content.ts` blocks to an **ACF Options
page** ("Homepage") + a **Categories CPT**, exposed via `show_in_rest`. Then swap the
constants for a fetch. Mapping:

| Content block | WordPress source |
|---|---|
| Hero copy/CTAs | ACF Options → Hero group |
| Science timeline | ACF repeater |
| 9 Categories | `category` CPT (name, description, applications, industries, image) |
| Industries | ACF repeater / CPT |
| Countries | ACF repeater (name, iso) |
| Certifications | existing `certification` CPT |
| Metrics | ACF repeater (value, suffix, label) |

**Elementor reality:** the molecular hero + GSAP choreography can't be reproduced in
Elementor at this fidelity. Recommended path: keep this immersive frontend as the public
site; use WordPress purely as the editing/admin layer (headless). If a pure-WP build is
mandated, the fallback is an Elementor theme using the same palette/type with CSS reveals
and a static hero image — a visibly lower tier, documented here so the tradeoff is explicit.

---

## Run

```bash
cd krystal-frontend
npm install
npm run dev   # http://localhost:3000
```

## Built so far / next
- ✅ Design system, motion primitives, Three.js hero, full 8-section homepage, header/footer.
- ⏭ Per-page redesigns (About, Products, Applications, Quality, Global, Contact),
  JSON-LD schema, ACF binding of `site-content.ts`, real imagery.
