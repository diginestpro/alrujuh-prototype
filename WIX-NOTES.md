# Wix Studio build notes — home slider + Performance page

Prototype additions and how each one maps to **Wix Studio**. Everything stays vanilla
HTML/CSS/JS with CSS custom properties, so it can be rebuilt with native Wix elements,
Velo, or dropped in as-is inside an HTML embed / Custom Element.

---

## 1. What was added

| # | Change | Files |
|---|--------|-------|
| 1 | **New page: "Performance"** (`performance.html`) — company graphs + project progress | `performance.html` |
| 2 | New **hero slider** on the home page (4 slides, autoplay, arrows, dots, swipe, keyboard) | `index.html`, `style.css`, `motion.css`, `main.js` |
| 3 | **"Progress You Can Measure"** dashboard snapshot on the home page | `index.html` |
| 4 | "Performance" added to the nav, mobile drawer and footer of all 7 pages | all `*.html` |
| 5 | Reusable dashboard CSS (KPI cards, bar chart, donut, line chart, gauges, progress rows) | `assets/css/style.css` |
| 6 | Slider + chart behaviour (no libraries) | `assets/js/main.js` |

Page name: **Performance** — nav label "Performance", `<title>` "Performance | …".
Alternatives if the client prefers: *Track Record*, *Growth*, *Progress* (rename the file
and the 7 nav/drawer/footer links).

---

## 2. Hero slider → Wix Studio

| Prototype element | Wix Studio equivalent |
|---|---|
| `.hero-slider` section | **Slideshow** element (or **Pro Gallery → Slider** layout), stretched full-bleed |
| `.hs__slide` | One slide inside the slideshow (image + text layers) |
| `.hs__media img` (ken-burns) | Image layer + *Zoom in* / slow scale animation from the Animations panel |
| `.hs__badges`, `.hs__title`, `.hs__sub`, `.hs__cta` | Text / Button layers inside each slide |
| `.hs__arrow--prev/next` | Slideshow's built-in arrows (restyle them, or hide and use custom buttons) |
| `.hs__dot` (with progress fill) | Slideshow dots. The per-dot *progress fill* is custom — either drop it or keep plain dots |
| `.hs__count` "01 / 04" | Text layer updated by Velo on `slideshow.onChange` |
| `.hs__float` glass cards | Cards pinned over the slideshow (place them outside the slideshow, anchored to the section) |

Implementation options, easiest first:
1. **Native Slideshow + Studio animations** — 90 % of the effect, zero code. Autoplay, arrows and dots are built in.
2. **Keep this code** — paste the section markup into an **HTML embed** (or a **Custom Element** with Velo). Needed only if the exact dot-progress bar and swipe behaviour matter.

Behaviour already handled in `assets/js/main.js` (all optional if you use the native element):
autoplay 6.5 s, pause on hover/focus, pause when the tab is hidden, ←/→ keys, touch swipe,
`prefers-reduced-motion` respected, and a no-JS fallback (slide 1 renders, others hidden).

---

## 3. Performance page → Wix Studio

### 3.1 KPI cards (`.kpi-card`)
- Native: container + text + icon, with the **Counter / Number animation** on the number
  (Studio Animations panel → *Counter*), so "300+", "96%" count up on scroll.
- Data: bind to a `CompanyMetrics` **CMS collection** (fields: `label`, `value`, `suffix`, `trend`, `note`).

### 3.2 Bar chart — delivery & turnover (`.bar-chart`)
- Markup is **data-driven** already: values live in `data-set-projects` / `data-set-revenue`
  and the chart re-renders from them (see `renderBarChart()` in `main.js`).
- Wix options:
  1. **Repeater bound to CMS** — one item = one column (CMS fields: `year`, `projects`, `revenue`);
     column height set from the value (Velo: `$item('#fill').style.height = …`).
  2. **Velo + npm `chart.js`** — real charting with tooltips/axes (Velo supports npm packages).
  3. **HTML embed** — paste the prototype markup as-is.
- The **Projects / Revenue** toggle (`.seg`) maps to two Buttons + a Velo dataset swap.

### 3.3 Donut — workload by sector (`.donut`)
- Pure CSS `conic-gradient` (no library). The gradient is written inline per chart so each
  segment % can be bound from CMS data.
- Wix: bind the inline style from CMS percentages (Velo), or use an image/SVG donut.
  Studio has no native donut element.

### 3.4 Line chart — workforce growth (`.line-chart`)
- Inline SVG (`path` + `pathLength="1"` for the draw-on animation), scaled by `viewBox`.
- Wix: Velo + `chart.js`, or CMS-driven SVG points, or keep the HTML embed.

### 3.5 Progress bars — live project progress (`.prog-item`)
- Native match: **Progress Bar** element inside a **Repeater** bound to a
  `LiveProjects` CMS collection (fields: `title`, `location`, `stage`, `status`, `percent`).
- Studio's built-in **Progress Bar** animates its fill, so this section is the most
  "native-friendly" of the whole dashboard.
- Status pills (`.pill`, `.pill--amber`) = a text element with conditional formatting on `status`.

### 3.6 Gauges — HSE scorecard (`.gauge__ring`)
- CSS `conic-gradient` ring; Wix: image per state, a Velo-driven conic gradient, or the HTML embed.

### 3.7 Milestones timeline (`.timeline`)
- Native: Repeater + CMS `Milestones` collection (`year`, `title`, `text`), with a vertical
  line drawn by a shape behind the repeater.

---

## 4. Suggested CMS collections

| Collection | Fields | Used by |
|---|---|---|
| `CompanyMetrics` | `label`, `value`, `suffix`, `trend`, `note`, `order` | KPI cards (home + Performance) |
| `AnnualPerformance` | `year`, `projects`, `revenueM`, `workforce` | Bar chart, line chart |
| `SectorMix` | `sector`, `percent`, `colour`, `order` | Donut + legend |
| `LiveProjects` | `title`, `location`, `stage`, `status`, `percent`, `handover`, `order` | Progress rows, home snapshot |
| `Milestones` | `year`, `title`, `text`, `order` | Timeline |
| `Scorecard` | `metric`, `percent`, `note`, `order` | Delivery scorecard, HSE gauges |

All numbers in the prototype are **illustrative placeholders** — replace them with the
client's real figures before going live (each chart carries a small note saying so).

---

## 5. Design tokens (already Wix-friendly)

Every colour, radius, shadow and font lives in `:root` in `assets/css/style.css`:

```
--green-700:#0E6B41  --green-600:#128A52  --green-500:#16A364  --green-400:#2FC37C
--ink:#0B0F12        --paper:#F7F9FA      --line:#E3E9ED       --body:#54626C
--font-display:'Barlow Condensed'         --font-body:'Inter'
```

Map these to **Wix Studio theme tokens** (Site > Theme > Colors / Text) so the new sections
inherit the same palette as the rest of the site. Green is the only accent colour; the
dashboard uses tints of it (`--green-050`, `--green-300`) plus amber `#D69614` for
"needs attention" states.

---

## 6. Accessibility / behaviour already in place

- Slider: `role="region"` + `aria-roledescription="carousel"`, slides labelled "Slide n of 4",
  inactive slides `visibility:hidden` (not focusable), arrow/dot buttons labelled, ←/→ keys.
- Charts: each has `role="img"` + an `aria-label`; the bar chart's label updates when the
  series is switched.
- `prefers-reduced-motion`: slider autoplay is disabled; chart animations and the dot
  progress jump to their end state.
- No external libraries, no build step, no network calls.

---

## 7. Rebuild / preview

```
python _stage.py      # regenerates dist/ from the source pages + runs integrity checks
```

`_stage.py` now resolves its own folder (the old hard-coded path was stale), skips
`_*.html` staging files, and checks all 7 pages (including `performance.html`).
