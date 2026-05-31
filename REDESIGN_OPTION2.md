# KRYSTAL INGREDIENTS — DESIGN DIRECTION **OPTION 2**
## "AURUM" · Where Molecular Science Meets Global Luxury Manufacturing

A second, significantly stronger direction. Where Option 1 was light, editorial and airy,
**AURUM is dark, dense, cinematic and unforgettable** — espresso-black surfaces, liquid-gold
chemistry, and a Bloomberg-terminal product engine, with the blue/green droplet-leaf logo used as
a precious jewel accent against the warmth.

> **Mood board (extracted from the references, not copied):** Aesop's dark apothecary restraint ·
> Stripe's information density · Apple's hierarchy and motion discipline · LVMH material richness ·
> SpaceX engineering gravitas · Bloomberg terminal data confidence.

---

## 0 · How this fixes Option 1

| Option 1 problem | AURUM response |
|---|---|
| Typography oversized | Type scale cut 20–35% (H1 → 72–88px), tighter hierarchy, more above-the-fold info |
| Repetitive section rhythm | Each of the 10 chapters has a distinct layout archetype (see §6) |
| Decorative motion | Every animation is mapped to a *meaning*: science, manufacturing, reach, compliance (§5) |
| Products under-showcased | Products become the centerpiece: a searchable **Ingredient Terminal** (§6.3) |
| Premium but forgettable | A signature **liquid-gold molecular** world + cinematic chapters = memorable |

---

## 1 · Visual Concept

**One sentence:** *Liquid gold is refined chemistry made visible.*

The site is a descent into a refined, backlit laboratory at golden hour. Molecules glow like
suspended gold; amber liquid flows as the connective tissue between chapters. The blue droplet +
green leaf of the logo appear as the single cool note — purity and nature — punctuating the warmth
(also reused as the green "Verified" check on certifications, tying brand to trust).

- **Surface:** near-black espresso, not flat — subtle vignettes, grain, depth haze.
- **Hero device:** mouse-reactive **liquid-gold molecular field** (WebGL).
- **Texture:** glass cards with hairline gold borders; cinematic duotone photography (amber/black).
- **Signature:** the gold-gradient *third line* of every hero headline.

---

## 2 · Typography System

Display: **Fraunces** (opsz, ~400–500 weight, refined serif). UI/Body: **Archivo** /
**Inter**. Data & CAS numbers: **IBM Plex Mono** (terminal credibility).

| Token | Desktop | Mobile | Use |
|---|---|---|---|
| `display/hero` (H1) | **72–88px** / lh 1.05 | 40–48px | Hero headline, 3 lines, line-3 gold gradient |
| `h2` section | **44–56px** / lh 1.1 | 30–34px | Chapter titles |
| `h3` | 24–28px | 20–22px | Card titles, sub-sections |
| `subtitle/lead` | 18–22px | 16–18px | Intro paragraphs |
| `body` | 16–18px / lh 1.6 | 15–16px | Running text |
| `eyebrow` | 12–13px · tracking 0.18em · uppercase · amber | 11px | Section labels ("WHERE SCIENCE MEETS SCENT") |
| `data/mono` | 13–14px | 12px | CAS, specs, metrics |

Rules: max one gradient element per viewport; headlines never exceed 3 lines; body never below
15px; generous but *not* cavernous spacing (denser than Option 1 by ~25%).

---

## 3 · Color System

```
ESPRESSO BASE
  --bg            #0E0B08   page
  --surface       #17110B   sections
  --raised        #211913   cards
  --line          rgba(224,169,74,0.16)   hairline gold borders

LIQUID GOLD (primary accent)
  --gold-300      #F0C77A   highlight / gradient top
  --gold-400      #E0A94A
  --gold-500      #C8862E   primary accent / links
  --amber-700     #8A5A1E   gradient base
  --grad-gold     linear-gradient(120deg,#F0C77A,#C8862E 55%,#8A5A1E)

CREAM TEXT
  --text          #F3ECE0   primary
  --text-muted    #B8AC99
  --text-faint    #7E725F

LOGO JEWEL (sparse, intentional)
  --water         #1C7FC4   logo droplet / data viz nodes
  --leaf          #3DA63C   logo leaf / "Verified" checks / success

GLASS
  background      rgba(243,236,224,0.05)
  border          rgba(224,169,74,0.14)
  blur            16px
```

**Usage discipline:** gold carries hierarchy and CTAs; cream carries reading; the blue/green
jewel tones appear only in the logo, the certification "Verified" badges, and the global-map data
nodes — so the brand colors feel deliberate, never decorative.

---

## 4 · Layout System

- **Grid:** 12-col, max-width **1320px**, gutters 24/32px, generous vertical rhythm but **dense
  information bands** (the opposite of Option 1's emptiness).
- **Above the fold = headline + lead + a 3–4 metric stat row** (enterprise buyers see proof fast).
- **Repeatable components:**
  - `StatRow` — 3–4 metrics (90+, 25,000 MT, 40+, 3+ decades) with mono numerals.
  - `GlassCard` — raised surface, hairline gold border, hover lift + border glow.
  - `CertCard` — icon, title, cert number (mono), green **Verified** badge.
  - `ProductCell` — molecular thumbnail, name, CAS (mono), specs, tags, View Details.
  - `SectorColumn` — mega-menu style list per industry with sub-items.
  - `FeatureStrip` — 4-up icon row capping most chapters.
  - `TimelineRail` — vertical amber thread with year nodes.
  - `MapPanel` — globe/world map + side stat cards + bar sparklines.
- **Chapter caps:** most sections end on a `FeatureStrip` + a single amber CTA — consistent
  conversion anchor without visual monotony (each strip themed to its chapter).

---

## 5 · Motion System (meaning-driven)

Stack: **GSAP + ScrollTrigger + Lenis + Three.js**. Every motion encodes a message.

| Zone | Motion | Meaning | Tech |
|---|---|---|---|
| Hero | Liquid-gold molecular field, mouse-reactive; amber flow drift | "Science made visible / liquid gold" | Three.js (curl-noise particles + additive glow) |
| Hero headline | Masked line rise; line-3 gold-gradient sweep | Reveal & focus | GSAP SplitText |
| Stats | Count-up + subtle number morph on view | Scale & credibility | GSAP |
| Science | Molecule assembles atom-by-atom as you scroll | Synthesis | Three.js + ScrollTrigger |
| Products | Card hover **expansion**, filter **morph/reflow**, category cross-fade | Discovery, control | GSAP Flip |
| Manufacturing | Animated **process pipeline** flow (nodes light in sequence) | Precision process | SVG + GSAP draw |
| Global | Pulsing nodes + **animated export arcs**; rotate/drag globe | Reach & reliability | Three.js |
| Quality | **Glass-card stacking** reveal; green Verified check draws on | Compliance rigor | GSAP |
| Timeline (Group) | Year markers **light up**, milestone cards expand on scroll | Heritage progression | ScrollTrigger scrub |
| CTAs | **Magnetic** buttons; gold fill wipe on hover | Premium tactility | GSAP quickTo |
| Transitions | Espresso **curtain wipe** between pages; section fades with depth parallax | Cinematic continuity | GSAP + View Transitions |

Discipline: 60fps budget, `prefers-reduced-motion` disables WebGL + scrubs, motion never blocks
reading, one "hero" motion per viewport.

---

## 6 · The Journey — 10 Chapters / Page Redesigns

Each chapter has a **distinct layout archetype** so rhythm never repeats.

### 6.1 — HOME (archetype: *cinematic command center*)
```
┌───────────────────────────────────────────────────────────┐
│ [logo]  HOME ABOUT PRODUCTS APPLICATIONS QUALITY …  [Quote] │
├───────────────────────────────────────────────────────────┤
│ WHERE SCIENCE MEETS SCENT                  ╔═════════════╗  │
│ Global Solutions.                          ║ CERTIFIED   ║  │
│ Pure Ingredients.                          ║ EXCELLENCE  ║  │
│ ‹Trusted Worldwide.›  ← gold gradient      ║ ISO·FDA·GMP ║  │
│ [lead 18–22px]   ▸ Watch Plant Overview    ╚═════════════╝  │
│ ┌──────┬──────────┬──────┬────────┐  ← liquid-gold field →  │
│ │ 90+  │ 25,000 MT│ 40+  │ 3+ dec │                         │
│ └──────┴──────────┴──────┴────────┘                         │
├───────────────────────────────────────────────────────────┤
│ TOP PRODUCT CATEGORIES (icon row: Mint·Clove·Citral·…) →    │
└───────────────────────────────────────────────────────────┘
```
- **Rationale:** proof-dense above the fold (headline + lead + 4 stats + cert card + category
  rail) — enterprise buyers grasp scale, compliance and range in 3 seconds.
- **Animation:** liquid-gold molecular field (mouse parallax); headline masked rise; stat count-up;
  category rail magnetic hover.
- **Conversion:** persistent "Request Quote", "Watch Plant Overview" (trust), category rail →
  funnels straight into the Terminal.
- **UX:** sticky condensed header on scroll; category rail doubles as a quick-jump.

### 6.2 — THE SCIENCE BEHIND INGREDIENTS (archetype: *split scrollytelling*)
```
│ STICKY 3D MOLECULE  │  scrolling narrative panels:          │
│  (assembles as you  │  • Isolation & distillation           │
│   scroll)           │  • Synthesis & purity control         │
│                     │  • Application science                │
```
- **Rationale:** establishes scientific authority before selling product.
- **Animation:** molecule builds atom-by-atom per panel; terms highlight in gold.
- **Conversion:** soft — "Explore the Catalog" hand-off to §6.3.
- **UX:** left sticky visual, right text; collapses to stacked on mobile (reduced motion).

### 6.3 — PRODUCTS · THE INGREDIENT TERMINAL (archetype: *Bloomberg-meets-Apple*) ★ centerpiece
```
│ Find the Right Ingredient.      [ search: name · CAS · formula ]  2,450+ active │
│ ┌─FILTERS────────┐ ┌─RESULTS GRID──────────────────────────────────────────┐ │
│ │ Category ▾      │ │ ▢ Linalool   ▢ D-Limonene  ▢ Citral   ▢ Menthol       │ │
│ │ Application ▾   │ │  CAS·specs    CAS·specs     CAS·specs   CAS·specs     │ │
│ │ Industry ▾      │ │  [tag][View]  [tag][View]   …                         │ │
│ │ Mol. weight ▭▭  │ │ ▢ Vanillin   ▢ Geraniol    ▢ Benzyl…  ▢ Terpineol     │ │
│ │ Purity ▾        │ │  molecular thumbnail · mono CAS · purity · tags        │ │
│ └────────────────┘ └───────────────────────────────────────────────────────┘ │
```
- **Rationale:** *products are the business* — make discovery the strongest experience.
  Searchable by **name, CAS, application, industry**; molecular thumbnails; mono data.
- **Animation:** instant filter **reflow (GSAP Flip)**; card hover **expansion** revealing specs +
  "Add to RFQ"; category pill cross-fade; molecule thumbnail rotates on hover.
- **Conversion:** **multi-select → RFQ basket** ("Add to Quote"); sticky RFQ tray with count; CAS
  copy-to-clipboard. This is the primary lead engine.
- **UX:** URL-synced filters (shareable), keyboard search, empty-state guidance, 10/page virtualized.

### 6.4 — GLOBAL SUPPLY NETWORK (archetype: *data map*)
```
│ Global Reach.                         ┌ 250K+ ┌ 90+ ┌ 99% (sparkline bars)   │
│ ‹Reliable Delivery.›                  └ side stat cards ───────────────────  │
│ [glowing world map · amber arcs from India → 40+ markets]                    │
│ [shipment tracker]   [ Request a Logistics Quote ▸ ]                         │
```
- **Rationale:** exporter credibility = visualized scale + reliability metrics.
- **Animation:** pulsing origin (India), arcs draw to destinations, nodes twinkle; counters; drag.
- **Conversion:** "Request a Logistics Quote" + shipment-tracker utility (returning-buyer value).
- **UX:** map degrades to a static highlighted list on low-power/mobile.

### 6.5 — MANUFACTURING EXCELLENCE (archetype: *cinematic photo + process*)
```
│ Precision Process. Pure Chemistry. ‹Trusted Worldwide.›   │ ISO 9001        │
│ [duotone plant-at-golden-hour hero]                       │ ISO 14001       │
│ ┌ 90+ ┌ 25,000 MT ┌ 6 certs ┌ 40+ ┐                       │ ISO 45001 …     │
│ FeatureStrip: Adv. Tech · R&D · QC · Sustainable   [Explore Our Facility ▸] │
```
- **Animation:** animated **process pipeline** (reactor→distillation→QC→pack lights in sequence);
  parallax depth on the plant image; cert list reveal.
- **Conversion:** "Explore Our Facility" → virtual tour / RFQ.
- **UX:** capacity + certs visible together = procurement de-risking.

### 6.6 — QUALITY & CERTIFICATIONS (archetype: *liquid splash + credentials*)
```
│ Trusted Quality. ‹Global Compliance.›        ╔ Quality Promise ╗            │
│ [amber liquid splash hero]                    ║ 99.9% assurance ║            │
│ ┌REACH┐ ┌IFRA┐ ┌ISO 9001┐ ┌ISO 14001┐ ┌GMP┐  ← cert no. + ✓ Verified (green) │
│ FeatureStrip: Material control · In-process · Finished · Traceability        │
```
- **Animation:** **glass-card stacking** reveal; green Verified check **draws on**; splash loops subtly.
- **Conversion:** "Download Certificates" (gated → lead); "View All Certificates".
- **UX:** real cert numbers (mono) + verify = trust signals procurement actually checks.

### 6.7 — INDUSTRIES SERVED (archetype: *mega-directory*)
```
│ Versatile Ingredients. ‹Limitless Possibilities.›                            │
│ Fine Fragrance │ Cosmetics │ Personal Care │ Home Care │ Pharma │ F&B        │
│  • sub-items     • sub-items   …   each → "View Ingredients" (filters Terminal)│
│ FeatureStrip: Sustainable · Consistent · Innovation · Global   [Contact Sales]│
```
- **Rationale:** maps Krystal's molecules to buyer's world; every sector links into a pre-filtered
  Terminal view (§6.3) — application → product discovery.
- **Animation:** column hover lifts + amber underline draws; sector icon micro-animations.
- **Conversion:** "View Ingredients" (deep links) + "Contact Sales".

### 6.8 — SUSTAINABILITY (archetype: *editorial + the cool jewel note*)
- The one chapter where **leaf-green** breathes more — green-tinted glass, growth metrics, sourcing
  map. Visual relief from amber; reinforces the leaf in the logo.
- **Animation:** leaf/particle bloom; metric counters (renewable %, waste ↓).
- **Conversion:** ESG one-pager download (lead) + "Partner With Us".

### 6.9 — GROUP / LEGACY (Gem Aromatics) (archetype: *scroll timeline*)
```
│ Our Legacy. ‹Built on Innovation.›    1994 ● Foundation                      │
│ [amber flowing thread down the page]  2000 ● Expansion                       │
│ ┌ 90+ ┌ 250+ ┌ 30+ ┐                  2008 ● Global Reach                     │
│                                       2014 ● Innovation Leap                  │
│                                       2020 ● Sustainability                   │
│                                       2024 ● Beyond Boundaries  [Partner ▸]   │
```
- **Animation:** year markers **light up** + milestone cards expand on scrub along the gold thread.
- **Conversion:** "Partner With Us" / investor links.

### 6.10 — CONTACT & RFQ (archetype: *conversion console*)
```
│ Let's Create Together.                 ┌ RFQ FORM (multi-step) ───────────┐  │
│ Sales · Quality · Export desks         │ 1 Products (prefilled from basket)│  │
│ [office/plant addresses · map]         │ 2 Company & volume                │  │
│                                        │ 3 Market & Incoterms  [Submit ▸]  │  │
```
- **Rationale:** the RFQ basket from §6.3 flows here pre-filled — the whole site funnels to this.
- **Animation:** magnetic submit; field focus glow; success state with reference number.
- **Conversion:** multi-step RFQ (higher completion), routed desks, sample-request toggle.
- **UX:** progress saved, validation inline, WhatsApp/export-desk fast path.

> **About** = §6.5 hero + §6.9 legacy + a **Values & Team** band (6 value glass cards + leadership
> photo cards: Vishal Kedia MD, Amit Kedia, Zakir Khan CEO, Pooja Kedia) + "Join Our Team".

---

## 7 · Product Experience detail — "Ingredient Terminal"

Bloomberg confidence, Apple polish.

- **Search:** fuzzy by name / **CAS** / synonym / formula; instant results; recent + popular chips.
- **Facets:** Category, Application, Industry, Molecular weight (range slider), Purity, Certification.
- **Cell data:** name · CAS (mono, copyable) · purity · appearance · key applications · tags ·
  rotating molecular thumbnail · **Add to RFQ**.
- **Detail drawer:** slides over (no full nav loss) with full spec sheet, CoA/SDS download (lead),
  related products, "Add to Quote".
- **RFQ basket:** multi-select across the catalog → sticky tray → pre-fills §6.10.
- **Data source:** the WordPress `product` CPT already built (REST) — Terminal is its premium face.

---

## 8 · Mobile UX Strategy (not a stack of desktop)

- **Type:** H1 40–48px; tighter leading; body 15–16px; never below 15.
- **Motion:** WebGL hero → a lightweight looping gradient/poster; scrubs disabled; reveals only.
- **Products:** search-first; filters in a bottom-sheet; single-column cells; **persistent
  "RFQ (n)" bar**; CAS tap-to-copy.
- **Nav:** full-screen overlay menu; thumb-reachable "Request Quote" FAB.
- **Conversion:** sticky bottom CTA bar (Quote · WhatsApp); multi-step RFQ becomes one field per
  screen; autofill + minimal typing.
- **Performance:** images AVIF/lazy, defer Three.js, < 200KB critical JS, LCP < 2.5s on 4G.

---

## 9 · Conversion architecture (B2B)

1. Every chapter ends in a themed CTA → all roads lead to **RFQ**.
2. **RFQ basket** built from product discovery = qualified, specific leads (molecule + volume + market).
3. **Gated assets** (catalogue PDF, certificates, ESG one-pager) = top-of-funnel capture.
4. **Trust scaffolding** before ask: stats, certs (with numbers), plant footage, legacy.
5. **Returning-buyer utility** (shipment tracker, saved RFQs) = retention.

---

## 10 · Build path (when approved)

Same Next.js + GSAP + Lenis + Three.js stack already in `krystal-frontend`. AURUM is a **re-skin +
re-architecture**: new token set (espresso/gold), new hero WebGL (liquid-gold field), the Ingredient
Terminal (the biggest new build, backed by the existing WP `product` CPT), and the per-chapter
archetypes above. Logo stays; theme goes dark-amber; blue/green become jewel accents.
