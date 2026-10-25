# Wix Studio build guide — Al Rujuh website

**For:** the designer building this in Wix Studio
**From:** the prototype handoff
**Live prototype to copy from:** <https://diginestpro.github.io/alrujuh-prototype/>
**Performance page:** <https://diginestpro.github.io/alrujuh-prototype/performance.html>

Every section below lists, in order: the **Wix element to add**, the **exact text** (copy/paste),
the **styling values** (from the prototype's design tokens), the **animation**, and the
**responsive** behaviour. Work top-to-bottom; the header and footer are built once on the
master page.

> **How to read the specs**
> `--section-y` = vertical padding of a section · `radius` = corner rounding ·
> `ls` = letter-spacing · `lh` = line-height. Colour names refer to the token table below.
> Sizes are given for **Desktop** unless a breakpoint is named.

---

## Contents

1. **Part 1 — Global setup** (theme, text styles, buttons, breakpoints, header, footer)
2. **Part 2 — Home page** sections 1–6
3. **Part 3 — Home page** sections 7–12
4. **Part 4 — Performance page** sections 1–5
5. **Part 5 — Performance page** sections 6–9
6. **Part 6 — About / Services / Projects / Clients / Contact**
7. **Part 7 — CMS, repeaters, animations, QA checklist**

---

# Part 1 — Global setup

Do this **before** building any section — it makes everything else copy/paste fast.

## 1.1 Site theme colours

Wix Studio → **Theme panel** (left sidebar) → **Colors**. Create these tokens:

| Wix colour token | Hex | Used for |
|---|---|---|
| White | `#FFFFFF` | page background, cards |
| Paper | `#F7F9FA` | alternating section background |
| Paper 2 | `#EFF3F5` | icon tiles, hover fills, bar tracks |
| Line | `#E3E9ED` | card borders, dividers |
| Line 2 | `#D3DCE2` | button borders, timeline rail |
| Ink | `#0B0F12` | dark sections, headings, footer |
| Ink 2 | `#1A2228` | cards inside dark sections |
| Ink 3 | `#2C3840` | donut 4th slice, dark text on light |
| Body | `#54626C` | body paragraphs |
| Muted | `#7C8A94` | form labels, footer text |
| Dim | `#98A5AE` | small-caps captions |
| Green 700 | `#0E6B41` | hover states, deep accents |
| Green 600 | `#128A52` | **primary accent** — eyebrow, links, buttons |
| Green 500 | `#16A364` | icon strokes, active dots |
| Green 400 | `#2FC37C` | accents on dark, footer headings |
| Green 300 | `#6FD9A6` | light accents on dark |
| Green 050 | `#EAF8F1` | icon tile background, soft pills |
| Amber | `#D69614` | "needs attention" pills only |

Green is the **only** accent colour. Never introduce a second hue.

## 1.2 Text styles

Wix Studio → **Theme panel → Text**. Create these site text styles (both fonts are Google
fonts available in Wix — the fallback in brackets is only if a font is missing):

| Style name | Font | Size | Weight | Case / spacing | Colour |
|---|---|---|---|---|---|
| Display / Hero H1 | Barlow Condensed *(Oswald)* | 74 px (38→74) | 700 | UPPER · lh 0.99 · ls −0.005em | White on hero, Ink elsewhere |
| H1 / Page title | Barlow Condensed | 61 px (35→61) | 700 | UPPER · lh 1.1 | Ink |
| H2 / Section title | Barlow Condensed | 50 px (32→50) | 700 | UPPER · ls 0.01em | Ink (White on dark) |
| H3 / Card title | Barlow Condensed | 25 px (20→25) | 700 | Sentence · lh 1.1 | Ink |
| H4 / Small heading | Barlow Condensed | 17 px | 700 | Sentence | Ink |
| Body | Inter *(Segoe UI)* | 16 px · lh 1.68 | 400 | Sentence | Body |
| Lead paragraph | Inter | 18 px · lh 1.75 | 400 | Sentence | Body |
| Small body | Inter | 15 px · lh 1.7 | 400 | Sentence | Body |
| Eyebrow | Barlow Condensed | 13 px · ls 0.2em | 600 | UPPER | Green 600 |
| Button label | Barlow Condensed | 15.5 px · ls 0.07em | 600 | UPPER | per variant |
| Nav link | Barlow Condensed | 15 px · ls 0.06em | 600 | UPPER | Body / Green 700 active |
| Caption / label | Inter | 12 px · ls 0.12em | 600 | UPPER | Dim |
| Stat number | Barlow Condensed | 46 px · lh 1 | 700 | — | Green 600 |

**Eyebrow decoration:** every eyebrow has a 26 px × 2 px green dash **before** it, and a
matching dash **after** it when the heading block is centred. Build it as a small rectangle
shape grouped with the text (or as a Green 500 `—` character).

## 1.3 Buttons

Add → **Button**. Create three site button styles, radius **6 px**, padding **14 px 30 px**
(Large: **17 px 36 px**), label = *Button label*:

| Variant | Fill | Text | Border | Hover |
|---|---|---|---|---|
| Primary (green) | gradient 135° Green 500 → Green 700 | White | none | lift 2 px + shadow `0 12px 34px rgba(18,138,82,.24)` |
| Outline | White | Ink | 1 px Line 2 | border Green 500 · text Green 700 · bg Green 050 |
| Ghost light (on dark) | White @ 7 % | White | 1 px White @ 34 % | border Green 400 · text Green 300 · bg Green 500 @ 16 % |

Arrow buttons: put a 16 px arrow icon **inside** the button and add a hover interaction
that moves it **3 px right**.

## 1.4 Layout rules

| Token | Value |
|---|---|
| Content width | **1240 px** max, centred |
| Side gutters | 24 px desktop · 20 px ≤900 · 18 px ≤560 |
| Section vertical padding | **96 px** desktop · 68 px ≤900 · 54 px ≤560 |
| Tight section | 58 px (≈ 0.6 × section) |
| Corner radius | 6 px buttons/inputs · 12 px cards · 20 px media · 100 px pills |
| Card padding | 30 px 26 px (service cards) · 24–30 px (chart cards) |
| Card at rest | 1 px Line border, radius 12 px, no shadow |
| Card hover | lift 6 px + border Green 500 @ 40 % + shadow `0 12px 34px rgba(11,15,18,.09)` |
| Grid gaps | 22 px card grids · 16 px progress lists · 32–72 px two-column splits |

**Shadows:** `sm 0 2px 10px rgba(11,15,18,.06)` · `md 0 12px 34px rgba(11,15,18,.09)` ·
`lg 0 26px 64px rgba(11,15,18,.14)`.

## 1.5 Breakpoints

Add these custom breakpoints in the canvas so the layout matches the prototype:

| Breakpoint | What changes |
|---|---|
| **Desktop** (base, ≥1340) | full layout: 7 nav items + "Get a Quote" |
| **1200** | nav padding tightens; hero floating cards hide (≤1180) |
| **900** | two-column splits stack; section padding 68 px; hero 520 px tall |
| **700** | card grids → 1 column; stats strips → 2 columns |
| **560** | section padding 54 px; CTA buttons full width; hero counter hides |

## 1.6 Master header (build once, applies to all 7 pages)

**Element:** Add → **Section** pinned to the top of the page (or Wix **Header** on the master
page), height **80 px** (68 px ≤900), background **White @ 82 %** with a **backdrop blur 20 px**
scroll effect, no border at rest.

Layers, left → right, in one horizontal **Stack** (space-between, vertical centre, gap 22 px):

1. **Logo group** (Stack, gap 12 px, clickable → Home)
   - Square **44 px**, radius 10 px, gradient 140° Green 500 → Green 700, shadow
     `0 6px 18px rgba(18,138,82,.26)`, centred text **`AR`** — Display style, 21 px, White.
   - Text stack: line 1 **`Al Rujuh`** (Barlow Condensed 19 px, 700, UPPER, ls 0.03em, Ink);
     line 2 **`General Contracting Est.`** (Inter 10 px, 600, UPPER, ls 0.16em, Green 600).
2. **Nav menu** (Wix **Menu** element, horizontal, gap 2 px). Items in this exact order:
   `Home · About · Services · Projects · Performance · Clients · Contact`
   - Link style = *Nav link*; padding 10 px 14 px; radius 6 px.
   - **Active** item: text Green 700 + a 2 px Green 500 underline (inset 14 px each side).
   - **Hover**: text Ink, background Paper 2, and the underline animates in from the left.
3. **Actions** (Stack, gap 10 px)
   - **Language button**: 1 px Line 2 border, radius 6 px, padding 9 px 13 px, content
     `🇸🇦  AR  |  ع` — set it as a non-clickable placeholder ("Arabic version coming soon").
   - **`Get a Quote`** button (Primary, compact) → links to Contact. Hide below 1080 px.
   - **Burger** (44 px, 1 px Line 2 border, radius 6 px, 3 lines) — show below 1080 px.

**On scroll:** add a scroll interaction — background becomes White @ 95 %, a 1 px Line
bottom border appears and a `0 2px 10px rgba(11,15,18,.06)` shadow fades in (0.4 s).

## 1.7 Mobile menu (drawer)

**Element:** Wix **Menu** element in "Hamburger / full-screen" mode, or a full-screen overlay
container toggled by the burger. Background White @ 99 %, links stacked, gap 4 px:

```
Home 01   About 02   Services 03   Projects 04   Performance 05   Clients 06   Contact 07
```

Each row: label left (*H2-style* 22 px Barlow Condensed, UPPER), number right
(Inter 12 px, Dim). Bottom of the drawer, a Stack with two full-width buttons:
**`Request a Quotation`** (Primary Large) and **`+966 14 322 8485`** (Outline Large).

## 1.8 Footer (build once)

**Element:** Section, background **Ink**, top padding 70 px, plus a **3 px animated gradient
line** along the very top (transparent → Green 500 → Green 300 → Green 500 → transparent).

Four columns in a grid — widths **1.6fr / 1fr / 1fr / 1.3fr**, gap 44 px:

| Column | Content (exact) |
|---|---|
| **Brand** | Logo (same as header, white text) · paragraph: `One of the Western Region's most respected general contractors and support service providers. Building with quality, detail and safety since 2005.` · 3 social tiles 38 px, radius 10 px, 1 px White @ 16 % border (LinkedIn, X, Instagram) |
| **Company** | heading `Company` · links: `About Us`, `Our Services`, `Projects`, `Performance`, `Clients`, `Contact` |
| **Services** | heading `Services` · links: `Civil Construction`, `Mechanical & Electrical`, `Supply & Trading`, `Accommodation`, `Manpower Supply` |
| **Contact** | heading `Contact` · `Near Abis Hotel & Kutubi,` / `Jeddah to Yanbu Main Road,` / `Yanbu, KSA — PO Box 46424` · `+966 14 322 8485` · `info@alrujuhest.com` |

Column headings: Barlow Condensed 13 px, 600, UPPER, ls 0.14em, **Green 400**, with a
26 px × 2 px Green 400 underline that grows to 100 % on hover. Body links: Inter 15 px,
`#8C99A2`, hover Green 400 + 5 px left shift.

**Bottom bar** (1 px White @ 10 % top border, 24 px padding): left
`© 2026 Al Rujuh General Contracting Est. All rights reserved.`; right a pill
(`CR 209425 · Yanbu, KSA`) with a Green 300 border, Green 500 @ 12 % fill, Green 300 text.

---

# Part 2 — Home page (sections 1–6)

## 2.1 Section 1 — Hero slider ⭐

**Wix element:** Add → **Section** (full-bleed, background **Ink**) → inside it add a
**Slideshow** element stretched to fill. Height **94vh, max 860 px** (520 px ≤900).
Set the slideshow transition = **Cross-fade, 0.95 s**, autoplay **6.5 s**, and switch the
built-in arrows and dots **off** (we build custom ones in the control bar below).

### Per-slide layers

Each slide contains: a full-bleed **image**, a **dark overlay**, a **green glow**, and a
**content stack** (badges → heading → paragraph → 2 buttons).

**Overlay (one rectangle per slide, above the image):**
- Gradient 100°: `rgba(6,10,13,.94) 0%` → `rgba(8,13,17,.80) 40%` → `rgba(10,16,20,.46) 70%` → `rgba(11,15,18,.78) 100%`
- Second layer, bottom-up: `rgba(11,15,18,.90) 1%` → transparent `48%`
- Green glow: radial gradient at **80 % / 22 %**, Green 500 @ 20 % → transparent at 46 %.
  Animate it slowly (opacity 0.35 ↔ 0.6 over 9 s) for a breathing effect.

**Content stack:** max text width **790 px**, left-aligned, vertically centred, padding-top
**120 px** (clears the 80 px header), padding-bottom **124 px** (clears the control bar).
Badges (gap 10 px) → heading → paragraph → button row (gap 14 px).

**Slide 1 — image `hero-cranes.jpg`** (alt: *Tower cranes over an industrial construction site in Yanbu*)

| Element | Exact copy |
|---|---|
| Badge 1 | `Operating since 2005` |
| Badge 2 (green) | `ARAMCO Registered Vendor · 10056950` |
| Heading (H1, 2 lines) | `Built to the Standard` ⏎ `Saudi Industry Trusts` — **line 2 in Green 400** |
| Paragraph | `Al Rujuh General Contracting Est. delivers civil, mechanical and electrical construction, industrial supply and site support services across the Kingdom — with 300+ projects completed for the region's most demanding clients.` |
| Button 1 | `Request a Quotation` → Primary, arrow, links to Contact |
| Button 2 | `View Our Projects` → Ghost light, links to Projects |

**Slide 2 — image `structure.jpg`** (alt: *Steel structural frame under construction*)

| Element | Exact copy |
|---|---|
| Badge 1 | `300+ Projects Delivered` |
| Badge 2 (green) | `CR 209425 · Yanbu, KSA` |
| Heading (H2, 2 lines) | `Eighteen Years` ⏎ `On Site, On Time` — **line 2 in Green 400** |
| Paragraph | `From multi-storey buildings and industrial warehouses to pipeline networks and precast production — our portfolio is extensive and our list of satisfied clients keeps growing.` |
| Button 1 | `Explore the Portfolio` → Primary, arrow, links to Projects |
| Button 2 | `See Our Clients` → Ghost light, links to Clients |

**Slide 3 — image `mep-crane.jpg`** (alt: *Industrial piping and mechanical installation works*)

| Element | Exact copy |
|---|---|
| Badge 1 | `Civil · Mechanical · Electrical` |
| Badge 2 (green) | `24/7 Site Support` |
| Heading (H2, 2 lines) | `One Team Across` ⏎ `Every Discipline` — **line 2 in Green 400** |
| Paragraph | `GRP, FRP, PVC and HDPE piping, industrial electrical fit-out, commissioning and maintenance — executed by crews that stay accountable through handover.` |
| Button 1 | `Our Capabilities` → Primary, arrow, links to Services |
| Button 2 | `See Our Performance` → Ghost light, links to Performance |

**Slide 4 — image `warehouse.jpg`** (alt: *Completed industrial warehouse building*)

| Element | Exact copy |
|---|---|
| Badge 1 | `Supply & Logistics` |
| Badge 2 (green) | `Accommodation · Catering · Manpower` |
| Heading (H2, 2 lines) | `Support That Keeps` ⏎ `Your Site Running` — **line 2 in Green 400** |
| Paragraph | `Materials, tools and equipment delivered to site, industrial-standard worker accommodation with full catering, and certified manpower on demand — all from one accountable partner.` |
| Button 1 | `Supply & Support` → Primary, arrow, links to Services › Supply |
| Button 2 | `Talk to Us` → Ghost light, links to Contact |

### Slide typography (on dark)

- Heading: **Display** style, White; line 2 Green 400; uppercase, lh 0.99.
- Paragraph: Inter 18–19 px, `#C2CFD7`, max-width 600 px.
- Badges: White @ 9 % fill · 1 px White @ 24 % border · `#E9F0F4` text · radius 100 px ·
  padding 8 px 15 px. Green badge: Green 500 @ 20 % fill · 1 px Green 400 @ 46 % border ·
  Green 300 text. Each badge has a 6 px Green 400 dot before the text that pulses
  (opacity 0.35 ↔ 1 over 2 s).

### Floating glass cards (right side)

Pinned **right 4.5 %**, vertically centred, width **240 px**, gap 12 px, **hidden ≤1180 px**.
Card: White @ 90 % · 1 px Line border · radius 12 px · padding 14 px 16 px · blur 14 px ·
shadow `md`. Icon tile 36 px, radius 10 px, Green 050 fill, Green 600 icon (17 px).
Title Barlow Condensed 16 px **Green 700**; sub-line Inter 11 px Dim.

| Icon | Title | Sub-line |
|---|---|---|
| shield-check | `ARAMCO Registered` | `Vendor 10056950` |
| building | `300+ Projects` | `Delivered since 2005` |
| clock | `24/7 Support` | `Remote & on-site` |

**Animation:** each card floats gently (y 0 → −14 px → 0, 6 s loop), staggered 1.4 s.

### Control bar (bottom of the hero)

A container-width row pinned to the bottom, 28 px padding:

1. **Dots** — 48 px × 4 px, radius 100 px, White @ 24 % (hover 42 %). The **active** dot
   widens to **74 px** and fills left → right with a Green 400 → Green 300 gradient over
   **6.5 s** (matches autoplay). In Wix: a thin rectangle per slide with a **scale-X
   animation**, or a **Progress Bar** element inside each dot.
2. **Counter** — `01` (Barlow 18 px, White) + a 42 px × 1 px White @ 30 % line + `04`
   (`#8C99A2`, ls 0.18em). Bind the number to the slideshow's current slide (or update it
   with Velo `slideshow.onChange`).
3. **Arrows** (right) — two **52 px circles**: White @ 8 % fill · 1 px White @ 26 % border ·
   blur 10 px · White 19 px chevron. Hover: border Green 400, fill Green 500 @ 30 %, lift 2 px.

### Animations summary

| What | Setting |
|---|---|
| Slide change | Cross-fade 0.95 s |
| Active image | Slow zoom (Ken Burns) scale 1.04 → 1.16 over 20 s, alternate |
| Slide content | Fade up 26 px, 0.8 s, 0.1 s delay — re-triggers on each slide |
| Autoplay | 6.5 s, **pause on hover**, pause when the tab is hidden |
| Reduced motion | No autoplay, no zoom, no progress fill |

### Responsive

- **≤1180:** hide the floating cards.
- **≤900:** section height 520 px; content padding-top 102 px / bottom 112 px.
- **≤560:** hide the counter; dots 28 px (active 44 px); arrows 44 px; CTA buttons full width.

## 2.2 Section 2 — Services ticker (dark scrolling strip)

**Wix element:** Add → **Marquee** (scrolling text) if your Studio version has it; otherwise a
full-width **Container** with a repeating scroll interaction, or an **HTML embed** (the
prototype uses a CSS marquee).

- Container: background **Ink**, padding 15 px 0, overflow hidden.
- Row: 12 items repeated **twice** (24 total) so the loop is seamless, gap 44 px, each item
  = a 5 px Green 400 dot + label. Label style: Barlow Condensed 14 px, 600, UPPER,
  ls 0.12em, `#8C99A2`.
- Animation: translate X 0 → −50 %, **38 s linear, infinite**. Pause on hover.
- Edge fades: 130 px wide gradient from Ink → transparent on both ends (so text fades out).

**Exact items (repeat the whole list twice):**
`Civil Construction` · `Mechanical & Electrical` · `Building Material Supply` ·
`Accommodation & Catering` · `Manpower Supply` · `Equipment Rental` · `Water Supply` ·
`Sewage Removal` · `Pipeline Projects` · `Precast Manholes` · `Commercial Fit-Out` ·
`Industrial Support`

## 2.3 Section 3 — Trust bar (4 stat cells)

**Wix element:** Section (background **Paper**, padding **58 px** vertical) → inside, a
**Grid** with **4 equal columns and a 1 px gap**. Set the grid's background to **Line** so
the gap reads as hairline dividers; each cell has a **White** background, padding 32 px 24 px,
centred content.

Each cell: value (*Stat number* style, Green 600) above a label (*Caption*, Dim, 12 px).

| Value | Label |
|---|---|
| `2005` | `Established in Yanbu` |
| `CR 209425` | `Commercial Registration` |
| `41911` | `Postal Code · Yanbu` |
| `24/7` | `Operational Availability` |

**Animation:** the whole strip scales in from 0.95 → 1 with a fade on scroll (0.85 s).
**Responsive:** 2 columns ≤820 px, stacked look is fine (keep the hairline gaps).

## 2.4 Section 4 — Intro split (Who We Are)

**Wix element:** Section (background **White**, padding 96 px) → **Grid, 2 equal columns**,
gap **clamp 32–72 px**, vertically centred. Add two soft green radial "blobs" behind the
section (Green 500 @ 16 % and Green 400 @ 14 %, ~500 px, blurred 90 px, slowly drifting) —
decorative only, `pointer-events: none`.

**Left column — text stack:**

| Element | Exact copy |
|---|---|
| Eyebrow | `Who We Are` |
| Heading (H2) | `A Contractor Built on ` **`Reliability`** ← this word in Green 600 |
| Paragraph 1 | `Al Rujuh General Contracting Est. is one of the Western Region's most respected service providers. Since 2005 we have grown from a local Yanbu contractor into a full-service establishment trusted by national and international EPC companies alike.` |
| Paragraph 2 | `We are genuinely a different sort of contracting firm. Our job is to give every client the finest workmanship possible — and that begins with a commitment and a caring attitude toward the work itself.` |

**Checklist** (3 rows, gap 14 px). Each row: a Green 500 check icon (19 px) + a text block
where the first line is **bold Ink** and the second line is Body colour:

| Bold lead | Following text |
|---|---|
| `Quality, detail and safety — non-negotiable` | `Since inception these three have set us apart from every other general contractor.` |
| `Manpower is our strongest asset` | `We deploy experienced, safety-trained professionals with the latest technology behind them.` |
| `24-hour remote and on-site support` | `Continual monitoring means your project never waits on us.` |

**Buttons** (row, gap 14 px, 48 px above): `More About Us` (Primary, arrow → About) ·
`See Our Clients` (Outline → Clients).

**Right column — image:** `structure.jpg`, radius **20 px**, shadow `lg`, with a **photo
chip** pinned bottom-left 18 px: White @ 93 % pill, blur 10 px, shadow `md`, radius 100 px,
padding 10 px 16 px, content = 7 px Green 500 dot + `Structural Works` (Barlow 13 px, 600,
UPPER, ls 0.09em, Ink).

**Animation:** text slides in from the left (36 px, 0.85 s), image from the right.
**Responsive:** stack at ≤900 px (text first, image below).

## 2.5 Section 5 — Services (6 cards)

**Wix element:** Section (background **Paper**, padding 96 px) → centred heading block →
**Grid, 3 columns × 2 rows**, gap 22 px (2 columns ≤1024, 1 column ≤700).

**Centred heading block:** eyebrow `What We Do` · H2 `Complete Contracting & Site Support` ·
lead paragraph `From small to mid-size construction across civil, mechanical and electrical disciplines, we cover the full project lifecycle — plus the supply, manpower and site services that keep it running.`

**Card anatomy:** White fill · 1 px Line border · radius 12 px · padding 30 px 26 px ·
icon tile 54 px (radius 12 px, Green 050 fill, 1 px Green 500 @ 20 % border, Green 600 icon
25 px) · H3 title · 15 px body · "Explore service" link with a 14 px arrow
(Barlow 13 px, 600, UPPER, ls 0.09em, Green 600).

**Card hover:** lift 6 px · border Green 500 @ 40 % · shadow `md` · icon tile scales to 1.06
and rotates −3° · a **3 px green gradient bar grows across the top** of the card
(scale X 0 → 1 from the left, 0.5 s) · the arrow gap grows by 5 px.

| # | Title | Body copy | Links to |
|---|---|---|---|
| 1 | `Civil Construction` | `Multi-storey and single-storey residential, industrial and commercial buildings, foundations, structural works and precast manhole production.` | Services › `#civil` |
| 2 | `Mechanical & Electrical` | `Full MEP installation and maintenance, piping networks in GRP, FRP, PVC and HDPE, industrial electrical fit-out and equipment commissioning.` | Services › `#mep` |
| 3 | `Supply & Trading` | `Building materials, construction consumables, tools and industrial equipment supplied and delivered to site — competitively priced and reliably sourced.` | Services › `#supply` |
| 4 | `Accommodation & Catering` | `Industrial-standard worker accommodation with full catering services, run to the hygiene and welfare standards major operators expect.` | Services › `#accommodation` |
| 5 | `Manpower Supply` | `Certified skilled and semi-skilled workforce deployment — the resource that drives every successful project we deliver.` | Services › `#manpower` |
| 6 | `Rental & Logistics` | `Equipment and vehicle rental, water supply, sewage removal and transport services supporting site operations across the region.` | Services › `#rentals` |

**Animation:** cards fade up 38 px with a **0.09 s stagger** per card, triggered when the
grid enters the viewport. **Tip:** build card 1 as a *design component* and duplicate it —
then a content change only has to be made once.

## 2.6 Section 6 — Capability (dark split)

**Wix element:** Section (background **Ink**, padding 96 px) → **Grid, 2 equal columns**,
gap 32–72 px, **image on the left**, text on the right. Behind it, three soft green radial
blobs (Green 500 @ 20 %, Green 400 @ 14 %, and an Ink @ 5 % haze) drifting slowly.

**Left — image:** `mep-crane.jpg`, radius 20 px, shadow `lg`, photo chip bottom-left 18 px
reading `Mechanical & Electrical` (same chip style as 2.4, but with the chip on the dark
section keep it White @ 93 %).

**Right — text stack:**

| Element | Exact copy |
|---|---|
| Eyebrow | `Why Al Rujuh` (on dark use Green 300 for the text and Green 400 for the dashes) |
| Heading (H2) | `Capability That Goes ` **`Beyond the Build`** |
| Paragraph 1 | `Most contractors build. We build and keep the site running — supplying materials, housing and feeding the workforce, and servicing the plant that everything depends on. That single difference removes coordination risk from your project.` |
| Paragraph 2 | `Our project portfolio is extensive, as is our list of satisfied clients. No other support service company in the region carries the same depth of combined construction and operational support.` |

> **Highlight colour note:** the prototype applies Green 600 to highlighted words inside
> dark sections; on Ink that is below AA contrast. **Use Green 400** for highlighted words
> in dark sections and Green 600 in light sections.

**Stats strip** (below the text, 48 px above, 2 columns, hairline 1 px gap):
| Value (counts up) | Label |
|---|---|
| `300+` | `Projects Completed` |
| `18` | `Years Experience` |

Stats on dark: strip border White @ 12 %, cell fill **Ink 2**, number **Green 400**,
label `#8C99A2`. On light sections the same strip is Line border, White cell,
**Green 600** number, Dim label.

**Animation:** image slides in from the left, text from the right; the two numbers count up
over 1.6 s when the strip is 40 % visible.

---

# Part 3 — Home page (sections 7–12)

## 3.1 Section 7 — "Progress You Can Measure" snapshot ⭐

This is the home-page teaser of the Performance page. It reuses the same components as
Part 4, so **build the components here first and reuse them on the Performance page**.

**Section:** background **White**, padding 96 px, plus the same three drifting green blobs.

### Heading row (split: text left, button right)

| Element | Exact copy |
|---|---|
| Eyebrow | `Performance` |
| Heading (H2) | `Progress You Can ` **`Measure`** ← Green 600 |
| Lead paragraph | `Delivery is tracked, not promised. A live snapshot of how the business is performing — projects, growth, workforce and progress on site right now.` |
| Button (right) | `Open Full Dashboard` → Outline, arrow, links to the Performance page |

On mobile (≤700) the button drops below the text, left-aligned.

### KPI cards — 4 in a row (gap 22 px; 2 columns ≤1024, 1 column ≤560)

**Card anatomy (build once as a component):**
White · 1 px Line border · radius 12 px · padding 26 px 24 px · no shadow at rest.
Top row: 46 px icon tile (radius 12 px, Green 050 fill, 1 px Green 500 @ 20 % border,
Green 600 icon 22 px) on the left, and a **trend chip** on the right
(Barlow 15 px, 600, Green 600, with a 13 px up-arrow icon).
Then: **big number** (Barlow Condensed 40 px, Ink) → **label** (Caption, Dim, uppercase) →
a 1 px Line top border, 14 px padding, and a **footnote** (Small body 13 px, Body colour).

**Hover:** lift 5 px · border Green 500 @ 40 % · shadow `md` · 3 px green gradient bar grows
across the top of the card (scale X 0 → 1).

| # | Icon | Trend chip | Number | Label | Footnote |
|---|---|---|---|---|---|
| 1 | building | `+18%` ↑ | `300+` *(counts up)* | `Projects Delivered` | `Since 2005 across the Western Region` |
| 2 | chart-line | `+4 pts` ↑ | `96%` *(counts up)* | `On-Time Delivery` | `Measured against approved programmes` |
| 3 | users | `+15%` ↑ | `1,200+` *(counts up)* | `Workforce Deployed` | `Skilled, semi-skilled and certified crews` |
| 4 | shield-check | `Held` *(Muted, no arrow)* | `100%` *(counts up)* | `HSE Compliance` | `Zero lost-time incidents on live sites` |

**Counter animation:** number counts 0 → value over **1.6 s** with an ease-out, triggered
when the number is 40 % visible. In Wix: Animations → **Counter** on the text element
(or Velo `setInterval` if your version lacks the Counter preset). Use `1,200+` as the
display value — for the count-up animate `1200` and append `+`.

**Stagger:** cards fade up 38 px with a 0.09 s stagger.

### Charts row 1 — bar chart + donut (grid 1.32fr / 1fr, gap 22 px, 48 px above)

**Chart card anatomy (component):** White · 1 px Line border · radius 12 px ·
padding 24–30 px · shadow `sm` · flex column. Header row: text block (H3 + 15 px muted
sub-line) left, control right. The chart body sits at the bottom of the card.

#### A. "Delivery Per Year" bar chart

| Part | Spec |
|---|---|
| H3 | `Delivery Per Year` |
| Sub-line | `Completed scope across civil, mechanical, electrical and support services.` |
| Control | Segmented switch: `Projects` \| `Revenue` |
| Chart area | height **250 px**, 6 columns, gap 8–22 px, bars aligned to the bottom |
| Value label | above each bar — Barlow Condensed 15 px, 600, **Green 700** |
| Bar track | max-width **58 px**, centred, transparent |
| Bar fill | width 100 %, height = value ÷ max × 100 %, gradient **to top: Green 700 → Green 400**, radius 6 px on the two top corners, **1.25 s** height transition, plus a soft white sweep on load |
| Axis row | 6 labels under the bars (`2019`…`2024`) — Caption style, Dim; 14 px above them a **1 px Line top border** |
| Footnote | `Revenue shown in SAR millions. Figures are illustrative for this prototype.` (12 px Dim) |

**Data (projects / revenue in SAR millions):**

| 2019 | 2020 | 2021 | 2022 | 2023 | 2024 |
|---|---|---|---|---|---|
| 18 / 3.1 | 22 / 4.2 | 26 / 5.6 | 31 / 7.4 | 38 / 9.2 | 44 / 11.5 |

The Revenue series shows the value with an `M` suffix (`11.5M`).

**Segmented control spec:** container = Paper fill · 1 px Line 2 border · radius 100 px ·
padding 4 px · gap 4 px. Buttons = Barlow Condensed 13 px, 600, UPPER, ls 0.08em,
padding 8 px 16 px, radius 100 px, Body colour. **Active** = Green 600 fill, White text,
shadow `0 4px 14px rgba(18,138,82,.26)`.

> **Wix mapping (pick one):**
> 1. **No-code-ish (recommended):** a **Repeater** bound to a CMS collection
>    `AnnualPerformance` (`year`, `projects`, `revenueM`). Each item = Stack with a value
>    text + a bar track; set the fill height with Velo:
>    `$item('#fill').style.height = (item.projects / max * 100) + '%'`.
> 2. **Velo + npm `chart.js`** — real axes/tooltips; import the package in the page code.
> 3. **HTML embed** — paste the prototype markup (no code changes needed).
> The `Projects / Revenue` switch = two buttons that re-run the fill heights (or filter the
> dataset) — see the `renderBarChart()` logic in the prototype's `main.js`.

#### B. "Sector Mix" donut

| Part | Spec |
|---|---|
| H3 | `Sector Mix` |
| Sub-line | `Where the workload sits today.` |
| Card background | soft tint — gradient 168° White → Paper |
| Donut | **184 px** circle; conic gradient **from −90°**: Green 600 `0–42 %`, Green 400 `42–70 %`, Green 300 `70–88 %`, Ink 3 `88–100 %` |
| Hole | White circle inset **30 px** (1 px Line ring), so the ring thickness is 30 px |
| Centre text | `300+` (Barlow Condensed 28 px, Ink) over `Projects` (Caption, Dim) |
| Legend | 4 rows, gap 13 px; each row = 11 px swatch (radius 3 px) + label (Small body) + value right (Barlow Condensed 17 px, Ink); a **1 px dashed Line 2** divider under every row except the last |

| Swatch | Label | Value |
|---|---|---|
| Green 600 | `Civil & Structural` | `42%` |
| Green 400 | `Mechanical & Electrical` | `28%` |
| Green 300 | `Supply & Logistics` | `18%` |
| Ink 3 | `Accommodation & Manpower` | `12%` |

**Animation:** the donut scales 0.88 → 1 with a fade (0.9 s) on scroll.

> **Wix mapping:** there is no native donut element. Use an **SVG** (recommended — crisp at
> every size, and each arc can be bound to a CMS percentage), a PNG per data state, or bind
> the conic gradient through Velo. Keep the legend as a **Repeater** bound to a `SectorMix`
> collection so the client can edit percentages themselves.

### Charts row 2 — line chart + live progress (2 equal columns, gap 22 px, 48 px above)

#### C. "Workforce Growth" line chart

| Part | Spec |
|---|---|
| H3 | `Workforce Growth` |
| Sub-line | `Direct manpower deployed across live projects, 2019 – 2026.` |
| Pill (right) | `+15% YoY` (green status pill) |
| Chart | **inline SVG**, viewBox `0 0 720 300` → scales to the card width |
| Grid | 4 horizontal 1 px Line rules at y = 40 / 110 / 180 / 250 |
| Y labels | `1200` `900` `600` `300`, right-aligned at x = 46, Barlow Condensed 11 px, Dim |
| X labels | `2019` … `2026`, centred under each point at y = 276, same style |
| Area | gradient Green 500 @ 26 % → transparent, under the line |
| Line | 3.2 px stroke, gradient **Green 700 → Green 400**, round caps/joins |
| Points | 8 dots, r = 4.5 px, White fill with a 2.6 px **Green 600** stroke |

**Series (workforce):** 320 → 410 → 520 → 640 → 780 → 910 → 1050 → 1200

**Animation:** the line **draws itself** left → right over **2 s** when the chart is 25 %
visible (animate `stroke-dashoffset` 1 → 0 using `pathLength="1"`), the area fades in
0.5 s later, and the 8 dots fade in staggered by **0.2 s**.

> **Wix mapping:** the same three options as the bar chart. For a designer-only build,
> SVG is easiest: export the chart as SVG from Figma, drop it in as an **SVG image**, and
> add a **"Draw" / wipe** animation. Bind the data later via Velo + `chart.js` if the client
> wants live numbers.

#### D. "Live Project Progress" list

| Part | Spec |
|---|---|
| H3 | `Live Project Progress` |
| Sub-line | `Completion against programme on our current works.` |
| Rows | 3 progress rows, gap 16 px |
| Row card | White · 1 px Line border · radius 12 px · padding 22 px 24 px |
| Row hover | shift 5 px right · border Green 500 @ 42 % · shadow `sm` |
| Bar track | height **7 px** · radius 100 px · Paper 2 fill |
| Bar fill | gradient 90° **Green 700 → Green 400**, radius 100 px, grows 0 → % over **1.6 s** + a soft sheen that loops |
| % value | right of the bar — Barlow Condensed 19 px, **Green 700**, min-width 54 px |

| Project | Status pill | Bar |
|---|---|---|
| `Factory & Warehouse Buildings` | `On Schedule` (green) | 82 % |
| `Industrial Piping Networks` | `On Schedule` (green) | 64 % |
| `Worker Accommodation Camp` | `Weather Delay` (amber) | 47 % |

**Footnote:** `Progress updated weekly by our project control team.`

**Status pill spec:** radius 100 px · padding 5 px 12 px · 12 px Inter, 600, UPPER,
ls 0.08em · 6 px dot before the label that pulses (opacity 0.35 ↔ 1, 2 s).
Green: Green 050 fill · Green 500 @ 30 % border · Green 700 text · Green 500 dot.
Amber: `#FDF6E7` fill · `#D69614` @ 34 % border · `#8A6410` text · `#D69614` dot.

> **Wix mapping — this is the most "native" section of the whole dashboard:**
> a **Repeater** bound to a CMS collection `LiveProjects` (`title`, `location`, `stage`,
> `status`, `percent`) containing a Wix **Progress Bar** element. Set
> `$item('#progressBar').value = item.percent` in Velo, and swap the pill colour with a
> conditional (`if (item.status === 'On Schedule') …`). Studio's Progress Bar animates its
> fill automatically.

## 3.2 Section 8 — Process (4 numbered steps)

**Wix element:** Section (background **Paper**, padding 96 px) → centred heading block →
**Grid, 4 columns**, gap 26 px (2 columns ≤1000, 1 column ≤600).

**Heading block:** eyebrow `How We Work` · H2 `A Simple, Disciplined Process` ·
lead `Four steps from first conversation to handover — no surprises, no gaps.`

**Step anatomy:** a big number (`01`…`04`, Barlow Condensed **46 px**, 700, colour Line 2
`#D3DCE2`, turning **Green 500** on hover) with a **2 px connector line** running to the
right of it (gradient Green 400 → transparent), then H3 and a 15 px body paragraph.

| # | H3 | Body copy |
|---|---|---|
| 01 | `Scope & Consult` | `Our specialists visit your site, review drawings and define the exact requirement — technically and commercially.` |
| 02 | `Plan & Price` | `Detailed method statement, resource plan and transparent quotation, backed by real historical project data.` |
| 03 | `Execute & Monitor` | `Dedicated crews, 24-hour supervision, full HSE compliance and daily progress reporting to your project manager.` |
| 04 | `Handover & Support` | `Clean handover with complete documentation — then continued support whenever you need it.` |

**Animation:** the numbers scale in from the top (0.9 s, 0.1 s stagger); the connector lines
wipe in from the left (1.1 s, 0.1 s stagger).
**Note:** Wix can't auto-number — type `01`–`04` as static text.

## 3.3 Section 9 — Clients preview (logo wall)

**Wix element:** Section (background **White**, padding 96 px) → split heading row →
**Grid, 4 columns**, 1 px gap, background **Line** (so the gap becomes the hairline grid).

**Heading row:** eyebrow `Our Clients` · H2 `Trusted by the region's ` **`Biggest Names`**
(Green 600) · right-hand Outline button `View All Clients` (arrow → Clients page).

**Cell anatomy:** White fill · min-height **120 px** · centred · padding 22 px 18 px ·
name (Barlow Condensed 15 px, 600, UPPER, ls 0.03em, **Ink 3**) over a type line
(Inter 11 px, UPPER, ls 0.1em, Dim).
**Cell hover:** Green 050 fill · scale 1.02 · name turns Green 700 · a 3 px Green 500 bar
grows to 52 % width at the bottom of the cell.

| Name | Type line |
|---|---|
| `Sankyu Saudi Arabia` | `EPC Contractor` |
| `Sambo Saudi Arabia` | `Mechanical Works` |
| `Dayim Punjlloyd` | `Pipeline Systems` |
| `Doosan Heavy Industries` | `Construction` |
| `Dodsal & Company` | `Industrial Supply` |
| `G.P. Zachariades` | `Overseas Ltd` |
| `Middle East Development` | `Medco` |
| `SSEM` | `Electro Mechanical` |
| `Daelim Engineering` | `& Construction` |
| `Saudi Kad Company` | `Services` |
| `Wardah Al Susan` | `Services` |
| `Arabian Tech` | `Company` |

**Animation:** the wall scales in 0.95 → 1 with a fade.
**Responsive:** 3 columns ≤980 px · 2 columns ≤640 px · 1 column ≤380 px.
**Tip:** make this a **Repeater** bound to a `Clients` collection so new clients are a CMS
entry, not a design change.

## 3.4 Section 10 — Testimonials (3 quote cards)

**Wix element:** Section (background **Paper**, padding 96 px) → centred heading block
(eyebrow `Client Feedback` · H2 `What Our Clients Say`) → **Grid, 3 columns**, gap 22 px.

**Quote card:** White · 1 px Line border · **3 px Green 500 left border** · radius 12 px ·
padding 32 px 30 px · flex column. Inside: 5 stars (15 px, Green 500, gap 3 px) → the quote
(Inter 16 px, **Ink**, lh 1.75) → a "who" row separated by a 1 px Line top border and 20 px
padding: 44 px round avatar (gradient 140° Green 500 → Green 700, White initials) + role
(Bold 15 px Ink) over company (13 px Dim).

| Initials | Quote | Role / company |
|---|---|---|
| `SR` | `"Al Rujuh General Contracting Est. is the most professional and knowledgeable support service provider we have worked with. Their planning and execution are second to none."` | `Senior Project Engineer` / `Major EPC Contractor` |
| `PD` | `"They are incredibly innovative in their thinking and certainly experts with plan and process. Site support is available around the clock, which makes a real difference."` | `Procurement Manager` / `Industrial Operator` |
| `AM` | `"Manpower quality and site safety performance are consistently strong. They deliver on time and stay accountable throughout the project."` | `Construction Manager` / `Industrial Client` |

**Hover:** lift 5 px · shadow `md` · left border turns Green 600 · the 5 stars pop in one
after another (0.05 s apart, scale 0.6 → 1.25 → 1 with a small rotation).
**Animation:** cards fade up with a 0.09 s stagger.

## 3.5 Section 11 — CTA band (dark)

**Wix element:** Section, background **Ink**, content centred, max width 740 px,
padding 58–90 px. Two large blurred green orbs behind it (480 px Green 500 @ 42 % and
420 px Green 400 @ 30 %, blur 90 px) that drift slowly.

| Element | Exact copy |
|---|---|
| Eyebrow | `Let's Build` (Green 300 with Green 400 dashes) |
| H2 | `Have a Project in Yanbu?` |
| Paragraph | `Speak with one of our specialists about your upcoming requirements. We'll scope it properly, price it honestly, and mobilise quickly.` |
| Button 1 | `Get Your Free Quote` → Primary, arrow → Contact |
| Button 2 | phone icon + `+966 14 322 8485` → Ghost light → `tel:+966143228485` |

**Responsive:** at ≤520 px the two buttons become full width, stacked.

## 3.6 Section 12 — Footer

Identical to **1.8** — the footer is built once on the master page and therefore appears
automatically on all 7 pages. Nothing extra to build on the Home page.

---

# Part 4 — Performance page (sections 1–5)

Build the Performance page **after** the home page — most components are already made.

## 4.1 Section 1 — Page hero (reusable on all inner pages)

**Wix element:** Section (background **Paper**, 1 px **Line** bottom border) with an image
layer behind the content at **14 % opacity** plus a white gradient overlay
(100°: White 97 % → 90 % at 45 % → 72 %). Padding-top = **140 px** (80 px header + 60 px),
padding-bottom 60 px.

**Content stack** (max-width **840 px**):

| Element | Spec / copy |
|---|---|
| Breadcrumb | `Home` (Green 600 link) › chevron (12 px, 50 % opacity) › `Performance` (Dim) — 13 px, 18 px below |
| H1 | `Company Performance & Progress` — H1 style (61 px, UPPER) |
| Paragraph | `Eighteen years of delivery, measured. Growth, capability, workforce and live progress on site — the numbers behind the work.` (18 px Body, max-width 650 px) |

**Background image:** `mep-crane.jpg`.
**Reuse:** every inner page uses this exact hero with its own image, breadcrumb label, H1 and
one-line paragraph — build it once as a **design component**.

## 4.2 Section 2 — Services ticker

Identical to **2.2** — copy the ticker component onto this page (dark Ink strip, same 12
items, 38 s marquee).

## 4.3 Section 3 — Headline KPIs

**Wix element:** Section (background **Paper**, padding **58 px** tight) → **Grid, 4 columns**
with the **KPI card component** from 3.1 (2 columns ≤1024, 1 column ≤560).

| # | Icon | Trend chip | Number | Label | Footnote |
|---|---|---|---|---|---|
| 1 | building | `+18%` ↑ | `300+` | `Projects Delivered` | `Across civil, MEP and support services` |
| 2 | chart-line | `+18%` ↑ | `11M` | `Annual Turnover · SAR` | `Year-on-year growth since 2019` |
| 3 | users | `+15%` ↑ | `1,200+` | `Workforce Deployed` | `Skilled, semi-skilled and certified staff` |
| 4 | shield-check | `+4 pts` ↑ | `96%` | `On-Time Delivery` | `Against approved project programmes` |

All four numbers count up on scroll. On this page the cards are **not** wrapped in a
scrolling fade group — they animate individually.

## 4.4 Section 4 — Growth (8-column bar chart + donut)

**Wix element:** Section (background **White**, padding 96 px, with drifting green blobs) →
centred heading block → **Grid 1.32fr / 1fr**, gap 22 px.

**Heading block:** eyebrow `Growth` · H2 `Eighteen Years of ` **`Compounding Delivery`** ·
lead `Steady, deliberate growth — built on repeat work from national and international EPC contractors rather than one-off wins.`

**A. "Delivery & Turnover" bar chart** — same component as 3.1-A, but **8 columns**:

| Part | Spec |
|---|---|
| H3 | `Delivery & Turnover` |
| Sub-line | `Projects completed per year and the revenue they generated.` |
| Switch | `Projects` \| `Revenue` (segmented control) |
| Axis | `2017` `2018` `2019` `2020` `2021` `2022` `2023` `2024` |
| Footnote | `Revenue shown in SAR millions. Figures are illustrative for this prototype and will be wired to real data on Wix.` |

| Year | Projects | Revenue (SAR M) |
|---|---|---|
| 2017 | 12 | 2.1 |
| 2018 | 14 | 2.4 |
| 2019 | 18 | 3.1 |
| 2020 | 22 | 4.2 |
| 2021 | 26 | 5.6 |
| 2022 | 31 | 7.4 |
| 2023 | 38 | 9.2 |
| 2024 | 44 | 11.5 |

Bars animate height 0 → value over **1.25 s** with a 0.12 s stagger per column, and the
value labels fade in 0.55 s later.

**B. "Workload By Sector" donut** — same component as 3.1-B with different copy:

| Part | Copy |
|---|---|
| H3 | `Workload By Sector` |
| Sub-line | `Share of completed scope across our disciplines.` |
| Centre | `300+` / `Projects` |
| Footnote | `Support services now account for 30% of total workload — the fastest growing part of the business.` |
| Legend | identical values to 3.1-B (42 / 28 / 18 / 12 %) |

## 4.5 Section 5 — Delivery & Workforce

**Wix element:** Section (background **Paper**, padding 96 px) → split heading row →
**Grid 1fr / 1fr**, gap 22 px.

**Heading row:** eyebrow `Delivery & Workforce` · H2 `Performance We ` **`Hold Ourselves To`** ·
right-hand green pill `Updated Quarterly`.

**A. "Workforce Development" card** — the line chart component from 3.1-C, plus a **3-cell
mini stats strip** 48 px below it:

| Value | Label |
|---|---|
| `320` | `Workforce 2019` |
| `1,200+` | `Workforce 2026` |
| `3.75×` | `Growth Multiple` |

Mini stats strip: 3 equal columns, 1 px Line gaps (hairline dividers), White cells,
padding 32 px 24 px, value = *Stat number* Green 600, label = Caption Dim.

**B. "Delivery Scorecard" card** — a stack of 5 progress bars (the `.bar-list` pattern):

| Part | Spec |
|---|---|
| H3 | `Delivery Scorecard` |
| Sub-line | `Rolling twelve-month performance against our own commitments.` |
| Row head | label left (Bold 15 px **Ink**) · value right (Barlow Condensed 14 px **Green 600**) |
| Track | height **7 px** · radius 100 px · Paper 2 fill · 9 px below the row head |
| Fill | gradient 90° **Green 600 → Green 400** · radius 100 px · grows 0 → % over **1.5 s** + a sheen loop |
| Row gap | 20 px |
| Footnote | `Performance indicators reviewed monthly with our project control team.` |

| Label | Value |
|---|---|
| `On-Time Delivery` | `96%` |
| `Client Retention` | `92%` |
| `HSE Compliance` | `100%` |
| `Manpower Requisition Fill Rate` | `94%` |
| `Material Supply On-Time` | `91%` |

**Wix mapping:** a Repeater bound to a `Scorecard` collection, each item containing a label,
a value and a Wix **Progress Bar** (`value = item.percent`). This is a 15-minute build and
the client can update the numbers from the CMS.

---

# Part 5 — Performance page (sections 6–9)

## 5.1 Section 6 — Live project progress (dark, 6 rows)

**Wix element:** Section (background **Ink**, padding 96 px, three drifting green blobs) →
centred heading block → **Grid 2 columns**, gap 16 px (1 column ≤700).

**Heading block:** eyebrow `Live Progress` (Green 300) ·
H2 `What We Are ` **`Building Right Now`** ·
lead `Completion against programme on our current works — updated weekly by our project control team.`

**Row card (dark variant):** **Ink 2** fill · 1 px White @ 9 % border · radius 12 px ·
padding 22 px 24 px. Hover: shift 5 px right · border Green 500 @ 42 %.
Inside, three stacked rows:

1. **Title row** — project name (Barlow Condensed 17 px, **White**) + status pill.
2. **Meta row** — 2 items, each = a 14 px **Green 400** icon (map-pin, calendar) + 12 px
   muted text (`#7C8A94`), 18 px gap.
3. **Bar row** — track (height 7 px, radius 100 px, White @ 10 %) + green gradient fill +
   the % on the right (Barlow Condensed 19 px, **Green 400**, min-width 54 px).

| Project | Status pill | Location | Stage / date | Bar |
|---|---|---|---|---|
| `Factory & Warehouse Buildings` | `On Schedule` | `Yanbu Industrial City` | `Handover Q3 2026` | 82 % |
| `Industrial Piping Networks` | `On Schedule` | `Western Region` | `Testing & Commissioning` | 64 % |
| `Worker Accommodation Camp` | `Weather Delay` | `Yanbu, KSA` | `Recovered Programme Issued` | 47 % |
| `Multi-Storey Residential Blocks` | `On Schedule` | `Yanbu, KSA` | `Handover Q4 2026` | 71 % |
| `Electrical Distribution & Fit-Out` | `On Schedule` | `Yanbu Industrial City` | `Commissioning Stage` | 88 % |
| `Precast Manhole Production` | `Mobilising` | `Yanbu Yard` | `Casting In Progress` | 35 % |

**Pill colours on dark:** green = Green 500 @ 16 % fill · Green 400 @ 40 % border ·
Green 300 text. Amber = `#D69614` @ 16 % fill · `#D69614` @ 42 % border · `#E8C168` text.

**Status legend** (centred under the grid, 26 px above, 20 px gap):
`● On Schedule` (Green 400) · `● Delay — Recovery Programme Agreed` (`#D69614`) ·
`● Mobilising / Early Works` (`#8C99A2`) — 13 px Inter, `#A9B6BE`.

**Animation:** rows fade up with a **0.09 s stagger**; bars grow over 1.6 s when 40 % visible.

## 5.2 Section 7 — HSE scorecard (4 gauges)

**Wix element:** Section (background **Paper**, padding 96 px) → centred heading block →
**Grid 4 columns**, gap 22 px (2 columns ≤900, 1 column ≤460).

**Heading block:** eyebrow `Safety & Compliance` · H2 `HSE Performance ` **`Scorecard`** ·
lead `Safety is not a separate department here — it is the operating standard on every site we run.`

**Gauge anatomy:** a **136 px** ring — conic gradient **from −90°**, Green 500 for the value
then **Paper 2** for the remainder — with a White inner circle inset **13 px** (1 px Line
ring) so the ring is 13 px thick. Inside the hole: the value (Barlow Condensed 24 px, Ink).
Below the ring: an H4 label and a 13 px muted caption, both centred. Add a decorative 1 px
Green 500 @ 22 % ring 7 px outside the gauge that pulses on hover.

| Value | H4 | Caption |
|---|---|---|
| `100%` | `HSE Compliance` | `Zero lost-time incidents recorded` |
| `98%` | `Safety Induction` | `Workforce inducted before mobilisation` |
| `96%` | `Permit To Work` | `Compliance across live work fronts` |
| `92%` | `Client Site Audits` | `Passed with no major findings` |

**Animation:** each ring scales 0.9 → 1 with a fade (0.8 s) on scroll.
**Wix mapping:** export each gauge as an **SVG** (simplest), or bind the conic gradient via
Velo. There is no native gauge element.

## 5.3 Section 8 — Milestones (two timelines)

**Wix element:** Section (background **White**, padding 96 px) → centred heading block
(eyebrow `Milestones` · H2 `How We Got ` **`Here`**) → **Grid 2 columns**, gap 22 px,
each column containing a **vertical timeline**.

**Timeline anatomy:** a 2 px vertical rail inset 7 px from the left (gradient Green 500 →
Line 2), each item carrying a **16 px dot** (White fill, 3 px Green 500 border, 4 px White
halo) on the rail, then: year (Barlow Condensed 24 px, **Green 600**), H3 (18 px),
body (15 px, Body colour), 38 px between items.

| Column | Year | H3 | Body copy |
|---|---|---|---|
| 1 | `2005` | `Established in Yanbu` | `Al Rujuh General Contracting Est. is founded in Yanbu with CR 209425 and a small civil works team.` |
| 1 | `2010` | `Mechanical & Electrical Division` | `Capability extended into MEP, piping networks and industrial electrical fit-out for regional operators.` |
| 1 | `2016` | `ARAMCO Registered Vendor` | `Approved as a registered vendor (10056950), opening the door to major EPC and industrial clients.` |
| 2 | `2021` | `Support Services Added` | `Accommodation with catering, manpower supply, equipment rental and water services brought in-house.` |
| 2 | `2024` | `300+ Projects Delivered` | `A portfolio spanning civil, mechanical, electrical, pipeline and site support works across the Kingdom.` |
| 2 | `2026` | `1,200+ Workforce` | `A certified, safety-trained workforce and the systems to report progress properly on every project.` |

**Animation:** the left timeline slides in from the left (36 px), the right one from the right.
**Responsive:** stack to one column ≤900 px.

## 5.4 Section 9 — CTA band

Same component as **3.5**, with this copy:

| Element | Exact copy |
|---|---|
| Eyebrow | `Let's Build` |
| H2 | `Want This Level of Reporting on Your Project?` |
| Paragraph | `Speak with one of our specialists. We'll scope it properly, price it honestly, mobilise quickly — and report progress the same way.` |
| Button 1 | `Get Your Free Quote` → Primary, arrow → Contact |
| Button 2 | phone icon + `+966 14 322 8485` → Ghost light |

---

# Part 6 — The other five pages

Each page = **master header (1.6)** → **page hero (4.1)** → **ticker (2.2)** → sections below
→ **CTA band (3.5)** → **footer (1.8)**. Only the middle sections differ, and they all reuse
components you have already built (cards, splits, stats, quote cards, tables, forms).

## 6.1 About page

| # | Section | What to build |
|---|---|---|
| 1 | Page hero | H1 `About Al Rujuh` · paragraph `Eighteen years of dependable construction and industrial support across the Western Region of Saudi Arabia.` · image `hero-cranes.jpg` |
| 2 | Ticker | Reuse 2.2 |
| 3 | Intro split | H2 `Definitely a Different Sort of Contracting Firm` + two body paragraphs + image (`concrete.jpg`) — the split component from 2.4 |
| 4 | Three pillars | H2 `Three Things We Never Compromise` + 3 icon cards: `Quality`, `Detail`, `Safety` (service-card component from 2.5) |
| 5 | Growth timeline | H2 `Eighteen Years of Growth` + the timeline component from 5.3 with years `2005`, `2010`, `2016`, `2021` |
| 6 | Team | H2 `People You Can Reach` + team cards: `Mr. Saad Al Refaie`, `Mr. Valavan Ravi`, `Mr. Jayarajan M.`, `Site Support Desk` — 106 px round initials tile (Green 050 fill, 2 px Green 400 border, initials Green 700 32 px), name, role (Green 600 caption), 2-line bio |
| 7 | Vendor table | H2 `Vendor & Registration Summary` + a 4-row table (`ARAMCO Registered`, `Commercial Reg.`, `Yanbu, KSA`, `Office & Email`) — white card, radius 12 px, header row Paper 2 with Green 700 uppercase labels, 1 px Line row dividers, row hover Green 050 |
| 8 | Community split | H2 `Dedicated to Our Clients and Community` + body + image |
| 9 | CTA band | H2 `Let's Discuss Your Requirements` (use 3.5) |

## 6.2 Services page

| # | Section | What to build |
|---|---|---|
| 1 | Page hero | H1 `Our Services` · one-line intro · image `structure.jpg` |
| 2 | Ticker | Reuse 2.2 |
| 3 | Six service splits | Alternating **text-left / image-right** splits (component 2.4), each with an anchor id: `#civil` `Civil Construction That Stands the Test` · `#mep` `Mechanical & Electrical Done Properly` · `#supply` `Materials Delivered to Site` · `#accommodation` `Accommodation & Catering Camp Living` · `#manpower` `Manpower Supply Every Project` · `#rentals` `Keeping the Site Moving`. Each split = eyebrow, H2, 2 paragraphs, a 3-item checklist and an outline button |
| 4 | Process | H2 `Every Service, Same Process` + the 4-step component from 3.2 |
| 5 | CTA band | H2 `Need Multiple Services?` (use 3.5) |

## 6.3 Projects page

| # | Section | What to build |
|---|---|---|
| 1 | Page hero | H1 `Our Projects` · paragraph `More than 300 projects delivered across commercial, industrial and residential sectors — built on time, built to budget.` · image `hero-cranes.jpg` |
| 2 | Ticker | Reuse 2.2 |
| 3 | Stats strip | 4 counting stats: `300+ Total Projects`, `18 Years Delivering`, `6 Sectors Served`, `96% On-Time Record` (component 2.3) |
| 4 | Portfolio | Split heading (eyebrow `Portfolio`, H2 `Selected Work`) + a **filter bar** (`All Projects`, `Civil`, `Mechanical & Electrical`, `Pipeline`, `Site & Camp`) + a **9-card grid** (3 columns). Project card: image 16:11 with a category tag pill top-left (White @ 93 %, Green 700 text, radius 100 px), H3, 15 px body, then a 1 px Line top border and a 2-column meta row (bold value over a Dim caption). Hover: lift 6 px, image scales to 1.07, border Green 500 @ 40 % |
| 5 | Delivery record | Dark split: H2 `Consistency Is the Real Product` + 2 paragraphs + a 3-item checklist (`On-time and within budget`, `Full HSE compliance`, `Documented handover`) |
| 6 | CTA band | Reuse 3.5 |

**Filter behaviour:** in Wix use a **Pro Gallery with categories**, or a Repeater + category
buttons that filter the dataset. (Prototype: the buttons filter cards by a `data-cat` value —
`civil`, `mep`, `pipeline`, `campus`.)

**The 9 project cards:**

| Title | Cat | Body | Meta 1 | Meta 2 |
|---|---|---|---|---|
| `Multi-Storey Residential Blocks` | civil | `Full structural and finishing works for multi-storey residential construction, delivered to schedule with client-side inspection sign-off.` | `Yanbu Industrial City` / Location | `Civil & Structural` / Scope |
| `Factory & Warehouse Buildings` | civil | `Industrial building structures including steel framing, concrete works and envelope installation for light and heavy industry facilities.` | `Western Region` / Location | `Industrial` / Sector |
| `Precast Manhole Production` | civil | `Factory production of precast concrete manhole units to client specification, with delivery sequenced to civil works progress.` | `Batch Production` / Type | `To Specification` / Standard |
| `Industrial Piping Networks` | mep | `Process and utility piping installation in GRP, FRP, PVC and HDPE, including supports, valves and connection testing.` | `GRP · FRP · PVC · HDPE` / Materials | `Installation & Testing` / Scope |
| `Electrical Distribution & Fit-Out` | mep | `Industrial electrical distribution, panel installation, containment, cabling and lighting for operating facilities.` | `Electrical` / Discipline | `Commissioned` / Status |
| `Pipeline Construction Projects` | pipeline | `Long-run pipeline installation across multiple material grades, with trenching, jointing and restoration included.` | `Multi-Grade` / Material | `Turnkey` / Delivery |
| `Worker Accommodation Camp` | campus | `Accommodation modules with full catering and welfare services, run to industrial standards for a large site workforce.` | `Accommodation & Mess` / Scope | `Industrial Standard` / Standard |
| `Site Logistics & Support` | campus | `Water supply, sewage removal, equipment and vehicle rental — delivered on site schedules that keep the programme moving.` | `24/7 Availability` / Coverage | `On-Schedule` / Delivery |
| `Commercial Fit-Out Works` | civil | `Commercial and institutional interiors, finishing packages and fit-out executed under live operational conditions.` | `Commercial` / Sector | `Fit-Out` / Scope |

Footnote under the grid: `Project photography and detailed case studies will be added as client-approved content becomes available.`

## 6.4 Clients page

| # | Section | What to build |
|---|---|---|
| 1 | Page hero | H1 `Our Major Clients` · paragraph `Our project portfolio is extensive, as is our list of satisfied clients. No other support service company carries the same depth of experience.` · image `structure.jpg` |
| 2 | Ticker | Reuse 2.2 |
| 3 | Stats strip | `16+ Major Clients`, `300+ Projects Delivered`, `10056950 ARAMCO Vendor Code`, `18 Years of Trust` |
| 4 | Client wall | H2 `List of Our Major Respected Clients` + the logo-wall component from 3.3 with the **full** list: Sankyu Saudi Arabia Ltd, Sambo Saudi Arabia LLC, Dayim Punjlloyd Ltd, Doosan Heavy Industries & Construction Co. Ltd, Dodsal & Company Ltd, G.P. Zachariades Overseas Ltd, Middle East Development Co. Ltd (Medco), Saudi Services for Electro Mechanical Works (SSEM), Daelim Engineering & Construction Co. Ltd, Saudi Kad Company, Wardah Al Susan Company, Arabian Tech Company, Ramkey Construction Ltd |
| 5 | Vendor & registration | H2 `Vendor & Registration Information` + 4 credential cards (`ARAMCO Registered`, `Commercial Registration`, `Based in Yanbu`, `Operating Since`): white card, radius 12 px, a 52 px round green seal icon, a tag pill top-right, H3, body, then a **dashed 1 px divider** with a bold code value |
| 6 | Testimonials | H2 `What Our Clients Have to Say` (component 3.4) |
| 7 | CTA band | H2 `Become Our Next Client` |

## 6.5 Contact page

| # | Section | What to build |
|---|---|---|
| 1 | Page hero | H1 `Contact Us` · paragraph `Speak with one of our specialists about your upcoming project requirements. We respond within 24 hours.` |
| 2 | Ticker | Reuse 2.2 |
| 3 | Form + contacts | **Left** = Wix **Form** inside a white card (radius 20 px, shadow `md`, padding 26–40 px): eyebrow `Get a Quotation`, H2 `Tell Us What You Need`, intro paragraph, the fields below, a consent checkbox, a `Send Request` Primary button and the note `We respond within 24 hours. For urgent site requirements, call our office directly.` **Right** = `Get in Touch` / `Direct Contacts`: `Head Office` · `Office Telephone +966 14 322 8485` · `Email info@alrujuhest.com` · `Managing Director — Mr. Saad Al Refaie, +966 50 329 6334` · `General Manager — Operations — Mr. Valavan Ravi, +966 54 748 6756` · `Registration — CR No. 209425 · Yanbu, KSA · ARAMCO Vendor Code: 10056950` |
| 4 | Map | H2 `Our Yanbu Office` + embedded map, 340 px tall, radius 20 px, 1 px Line border |
| 5 | CTA band | H2 `Speak to a Specialist Directly` with `Call +966 14 322 8485` |

**Form fields:** `Full Name *` · `Company` · `Email *` · `Phone *` ·
`Service Required *` (dropdown) · `Project Location` · `Project Details *` (textarea) ·
consent checkbox (`I confirm the details above are accurate and agree to be contacted regarding this enquiry.`).

**Field spec:** label = Caption style, uppercase, Muted, 9 px below; input = Paper fill,
1 px Line 2 border, radius 6 px, padding 13 px 15 px; focus = Green 500 border, White fill,
plus a 3 px Green 500 @ 13 % focus ring. Two fields per row on desktop, one per row ≤640 px.
Textarea min-height 130 px.

**Dropdown options (exact order):** `Select a service…` · `Civil Construction` ·
`Mechanical & Electrical` · `Supply & Trading — Building Materials` ·
`Accommodation & Catering` · `Manpower Supply` · `Equipment / Vehicle Rental` ·
`Water Supply / Sewage Removal` · `Multiple Services / Full Package` · `Other`

---

# Part 7 — CMS, assets, animations, QA

## 7.1 Suggested CMS collections

Create these in the **CMS panel** and bind the repeaters — then the client can update
numbers themselves without touching the design.

| Collection | Fields | Bound to |
|---|---|---|
| `CompanyMetrics` | `label`, `value`, `suffix`, `trend`, `note`, `order` | KPI cards (home + Performance) |
| `AnnualPerformance` | `year`, `projects`, `revenueM`, `workforce` | Bar chart, line chart |
| `SectorMix` | `sector`, `percent`, `colour`, `order` | Donut legend |
| `LiveProjects` | `title`, `location`, `stage`, `status`, `percent`, `handover`, `order` | Live progress rows (home + Performance) |
| `Scorecard` | `metric`, `percent`, `note`, `order` | Delivery scorecard, HSE gauges |
| `Milestones` | `year`, `title`, `text`, `order` | Timelines (About + Performance) |
| `Clients` | `name`, `type`, `order` | Logo walls |
| `Projects` | `title`, `category`, `body`, `meta1`, `meta2`, `image`, `order` | Projects grid |
| `Testimonials` | `initials`, `quote`, `role`, `company`, `order` | Quote cards |

**Important:** all figures in the prototype are **illustrative placeholders**. Ask the client
for the real numbers (projects per year, turnover, workforce, percentages) before launch —
each chart carries a small note saying so, which can be deleted once real data is in.

## 7.2 Images used (all supplied in `assets/img/site/`)

| File | Where |
|---|---|
| `hero-cranes.jpg` | Hero slide 1 · About page hero · Projects page hero · Contact page hero |
| `structure.jpg` | Hero slide 2 · Intro split (home) · Clients page hero · Services page hero |
| `mep-crane.jpg` | Hero slide 3 · Capability split (home) · Performance page hero |
| `warehouse.jpg` | Hero slide 4 |
| `concrete.jpg` | About page intro split |
| `facade.jpg`, `factory-hall.jpg` | Extra site photos for Projects / Services sections |

All images are already optimised for web. Keep the aspect ratio 16:11 for project cards and
16:9 for split media; hero images should be at least 1920 px wide.

## 7.3 Component reuse map

Build these **once** as Wix Studio design components and drop them in everywhere:

| Component | Used on |
|---|---|
| Header + drawer | all 7 pages (master page) |
| Page hero | About, Services, Projects, Performance, Clients, Contact |
| Ticker strip | all pages except Home (Home has it too, under the hero) |
| Section heading (eyebrow + H2 + lead) | every section |
| KPI card | Home snapshot, Performance KPIs |
| Chart card (bar / line / donut) | Home snapshot, Performance Growth + Delivery |
| Progress row | Home snapshot, Performance live progress |
| Service card | Home services, About pillars |
| Quote card | Home, Clients |
| Stats strip | Home, About, Projects, Clients, Performance |
| Split (text + image) | Home intro, Home capability, About, Services |
| Timeline | About, Performance |
| CTA band | all pages |
| Footer | all pages (master page) |

## 7.4 Animation master list

| Effect | Where | Settings |
|---|---|---|
| Cross-fade + autoplay | Hero slideshow | 0.95 s fade · 6.5 s autoplay · pause on hover |
| Ken Burns zoom | Hero image | scale 1.04 → 1.16, 20 s alternate |
| Fade up 26 px | Hero slide content | 0.8 s, 0.1 s delay |
| Marquee | Ticker | 38 s linear infinite, pause on hover |
| Fade / slide up 38 px | Section headings & cards | 0.85 s, 0.09 s stagger per item |
| Slide left / right 36 px | Split text / media | 0.85 s |
| Scale 0.95 → 1 | Stats strips, logo walls, donuts, gauges | 0.8–0.9 s |
| Counter | All stat numbers | 1.6 s ease-out, trigger at 40 % visible |
| Bar grow | Bar charts, progress bars, scorecards | 1.25–1.6 s, 0.12 s stagger |
| Line draw | Line charts | 2 s stroke draw, dots fade in 0.2 s apart |
| Hover lift | Cards | −5/−6 px + shadow `md` |
| Hover underline | Nav, footer headings, logo cells | wipe in from the left |
| Pulse | Status dots, badge dots | opacity 0.35 ↔ 1, 2 s |
| Sheen | Buttons, progress bars, quote cards | diagonal light sweep on loop / hover |

**Respect reduced motion:** if the visitor's OS asks for reduced motion, disable the hero
autoplay and the zoom, and jump chart animations to their end state.

## 7.5 Responsive rules to check on every page

| Breakpoint | Checks |
|---|---|
| **Desktop** (base) | 1240 px content width · 7 nav items + Get a Quote visible · 4-up KPI row · 3-up card grids · hero at 94vh with floating cards |
| **1200** | nav spacing tightens (no wrapping) · hero floating cards hidden |
| **900** | all splits stack (text above image) · section padding 68 px · hero 520 px · KPI 2-up · timelines stack |
| **700** | card grids 1 column · progress rows 1 column · charts full width · ticker unchanged |
| **560** | section padding 54 px · gutters 18 px · CTA buttons full width · hero counter hidden · dots smaller |

Also check: no horizontal scrollbar at any width; hero text never overlaps the control bar;
chart value labels never collide at 6–8 columns (reduce the font or drop labels ≤560 px if
needed).

## 7.6 Final QA checklist

**Structure**
- [ ] All 7 pages built: Home, About, Services, Projects, **Performance**, Clients, Contact
- [ ] Header + footer on the master page, identical everywhere
- [ ] Nav order: `Home · About · Services · Projects · Performance · Clients · Contact`
- [ ] Active nav state correct on each page (Green 700 + underline)
- [ ] Mobile drawer numbering `01`–`07` matches the order
- [ ] Footer "Company" links include **Performance**

**Content**
- [ ] Every heading/paragraph matches the prototype copy exactly (this guide is verbatim)
- [ ] Numbers replaced with the client's real figures (or the placeholder notes kept)
- [ ] ARAMCO vendor code `10056950`, CR `209425`, phone `+966 14 322 8485`,
      email `info@alrujuhest.com` correct everywhere
- [ ] No lorem ipsum, no "TBD" left anywhere
- [ ] Arabic language button present as a non-clickable placeholder

**Hero slider**
- [ ] 4 slides, correct images and alt text
- [ ] Autoplay, arrows, dots and counter all work; pause on hover
- [ ] Text is legible over every image (check the lightest part of each photo)
- [ ] Slide 3 button links to Performance page; slide 4 to Services › Supply

**Charts & progress**
- [ ] Bar chart toggles between Projects and Revenue
- [ ] Bars/progress bars animate on scroll, and are already filled if JS/animation is off
- [ ] Donut, gauges and line chart are crisp on retina (use SVG)
- [ ] Every chart has a text label (accessibility) — not colour alone

**Forms & links**
- [ ] Contact form validates required fields and sends to `info@alrujuhest.com`
- [ ] Every button/link goes somewhere real (no `#` placeholders left)
- [ ] Phone links use `tel:` and email links use `mailto:`
- [ ] Map embed loads and is centred on the Yanbu office

**Polish**
- [ ] Hover states on all cards, buttons, nav and footer links
- [ ] Focus outlines visible when tabbing through (keyboard accessibility)
- [ ] Reduced-motion behaviour tested
- [ ] Favicon + page titles + meta descriptions set for all 7 pages
- [ ] Checked on a real phone, not just the Studio mobile canvas
- [ ] Lighthouse / PageSpeed run; images lazy-loaded below the fold

---

## Reference files in this repo

| File | What it is |
|---|---|
| `index.html` | Home page markup (hero slider, snapshot, all sections) |
| `performance.html` | Performance page markup |
| `assets/css/style.css` | All design tokens in `:root` + every component's CSS |
| `assets/css/motion.css` | Every animation/keyframe in one place |
| `assets/js/main.js` | Slider + chart behaviour (the only JS the new sections need) |
| `WIX-NOTES.md` | Short mapping note: which prototype element = which Wix element |
| `DEPLOY.md` | How the live preview URL is published/updated |

**Live prototype for side-by-side reference:**
<https://diginestpro.github.io/alrujuh-prototype/> ·
<https://diginestpro.github.io/alrujuh-prototype/performance.html>

Open the live page next to the Wix canvas and compare section by section — if something looks
different, the answer is almost always in `style.css` (search for the class name in the
"Reference files" table above).

















