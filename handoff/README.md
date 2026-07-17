# Handoff: Montano.me Portfolio Redesign

## Overview
A single-page personal portfolio for **Fernando Montano — Fullstack Developer**. Light, editorial, "paper + ink" aesthetic with one restrained cobalt accent. Sections: sticky nav, hero, About, a **pinned scroll (scrollytelling) Skills section**, Services list, stats band, Selected Work, and a dark Contact CTA. Motion is powered by GSAP + ScrollTrigger.

The target deployment is **Astro** (the current montano.me is already Astro v5).

## About the Design Files
The file in this bundle — `Montano Portfolio.dc.html` — is a **design reference created in HTML**. It is a prototype demonstrating the intended look, layout, copy, and scroll behavior. It is **not production code to ship as-is**.

Note: the `.dc.html` is authored in an internal "Design Component" runtime (a `<x-dc>` template + a `Component` logic class loaded via `support.js`). **Do not try to port that runtime.** Read it purely as a visual/behavioral spec and **re-implement it as native Astro** — a plain `.astro` page/components with inline markup, plus a small client-side script for the GSAP animations. All styling is already inline `style="..."`; translate it directly into your markup (or into a `<style>` block / Tailwind, matching the existing repo's conventions).

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, and interactions are final. Recreate pixel-for-pixel using the exact tokens below. The only placeholders are: the hero portrait (striped box labeled `portrait.webp`) and the three stat numbers (`05+ / 20+ / 10+`) — replace both with real assets/values.

## Target: Astro implementation

### Recommended structure
```
src/
  pages/index.astro          # composes the sections
  components/
    Nav.astro
    Hero.astro
    About.astro
    Skills.astro             # the pinned scrollytelling section
    Services.astro
    Stats.astro
    Work.astro
    Contact.astro
  scripts/
    animations.ts            # GSAP + ScrollTrigger setup
  styles/
    global.css               # font imports, resets, ::selection, keyframes
public/
  portrait.webp              # real hero image
```

### Fonts
Load once (in `global.css` via `@import`, or `<link>` in the layout head):
- **Bricolage Grotesque** — weights 400/500/600/700/800 (display headings, numbers, logo)
- **IBM Plex Sans** — weights 400/500/600/700 (body, nav, tags)
```
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap
```

### GSAP in Astro
Install and import as a real dependency instead of the CDN used in the prototype:
```
npm i gsap
```
```ts
// src/scripts/animations.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
// ...all the effects below...
```
Load it client-side only (Astro ships zero JS by default). In `index.astro`:
```astro
<script>
  import "../scripts/animations.ts";
</script>
```
A bare `<script>` in an `.astro` file is bundled and hydrated automatically — no framework island needed. Do **not** put it in the frontmatter (that runs at build time on the server).

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| Paper (bg) | `#f3f0e9` | Page background, light text on dark |
| Paper alt | `#eae6db` | Stats band bg, work-tag chips |
| Ink | `#17160f` | Primary text, dark sections bg |
| Ink muted | `#5c5b51` | Body copy |
| Ink faint | `#8a887c` / `#9a988c` | Meta labels, captions |
| Border light | `#e2ddd0` / `#ded9cd` / `#cfcabd` | Dividers, outlines on paper |
| Accent (cobalt) | `#1f34d6` | Dots, highlighted words, eyebrows on light |
| Accent on dark | `#6f7cff` | Same role inside dark sections |
| Dark border | `#33322a` / `#3b3a31` / `#2a2921` | Dividers/outlines on ink bg |
| Dark meta | `#a19f93` | Muted copy on ink bg |

### Typography
- Display/headings/logo/numbers: **Bricolage Grotesque**, weight 600–800, letter-spacing `-0.02em` to `-0.03em`, line-height 0.9–1.05.
- Body/nav/tags: **IBM Plex Sans**, weight 400–600.
- Hero H1: `clamp(56px, 7.6vw, 112px)`, weight 700, line-height 0.9.
- Section H2: `clamp(34px, 4vw, 56px)`, weight 600.
- Contact H2: `clamp(44px, 7vw, 104px)`, weight 600.
- Stat numbers: `clamp(56px, 8vw, 92px)`, weight 700.
- Section eyebrow: 15px, weight 600, accent color, format `NN — Label` (e.g. `01 — About`).

### Radius & misc
- Pills/buttons/tags: `border-radius: 100px`.
- Skill category cards (old grid, now replaced by pinned list): `16px`.
- `::selection { background:#1f34d6; color:#f3f0e9; }`
- Body reset: `margin:0`, `box-sizing:border-box`, `scroll-behavior:smooth`.
- Link default = inherit; `a:hover { color:#1f34d6; }`.

## Screens / Views (single page)

### Nav (sticky)
- `position:sticky; top:0; z-index:50`, translucent `rgba(243,240,233,0.82)` + `backdrop-filter:blur(10px)`, bottom border `#e2ddd0`, padding `22px 56px`.
- Left: logo `FM.` — Bricolage 800, 26px, the `.` is accent `#1f34d6`.
- Center: About · Skills · Services · Work — 15px/500, `#3d3c34`. Hover = animated accent underline (`::after` width 0→100%, 0.3s).
- Right: pill "Let's talk ↗" — 1px ink border, `border-radius:100px`, padding `10px 20px`.

### Hero
- Full-height grid `1.15fr 0.85fr`, min-height `calc(100vh - 67px)`.
- Left panel (right border `#e2ddd0`, padding `72px 56px 48px`, space-between column):
  - Eyebrow row: 8px accent dot + "Fernando Montano — available for work" (accent).
  - H1 "Fullstack / Developer." (line break before Developer, `.` accent).
  - Paragraph, max-width 460px, `#5c5b51`.
  - Buttons: "Selected work" (ink bg, paper text) + "Get in touch" (1px border). Pills.
  - Footer row: "Currently" / "Fullstack Developer @ Willdom" / divider line / GitHub / LinkedIn.
- Right panel: diagonal striped placeholder `repeating-linear-gradient(135deg,#eae6db 0 15px,#e5e1d5 15px 30px)`, caption `portrait.webp` top-left, giant `FM` watermark (Bricolage 800, opacity 0.05) anchored bottom. **Replace stripes with real `portrait.webp`.**

### About
- Padding `120px 56px`, top border. Grid `0.4fr 1fr`, gap 64px.
- Left: sticky eyebrow `01 — About` (accent, `top:100px`).
- Right: big statement H2 (max-width 900px) + two-column paragraphs (`1fr 1fr`, gap 48px, max-width 820px).

### Skills — PINNED SCROLLYTELLING (the key interaction)
- Section: `position:relative; height:360vh; background:#17160f; color:#f3f0e9`.
- Inner `.skillsPin`: `position:sticky; top:0; height:100vh; overflow:hidden; padding:104px 56px 56px; flex column`.
- Header row: eyebrow `02 — Skills` + H2 "The tools I reach for." on the left; three progress bars (`34px × 4px`, radius 100px) on the right.
- Body grid `0.85fr 1.15fr`, gap 64px, vertically centered:
  - **Left = category switcher**: three `.cat-item`s (Frontend / Backend / Infra & DevOps). Each = small `.cat-num` (01/02/03) + big `.cat-name` (Bricolage 600, `clamp(34px,4.4vw,60px)`). Inactive: opacity 0.3, color `#5b5a50`. Active: opacity 1, name `#f3f0e9`, num `#6f7cff`. Transition 0.4s.
  - **Right = stacked `.cat-panel`s** (absolutely positioned, `inset:0`), one per category, each holding `.sk-item` rows: `<name>` (Bricolage 500, `clamp(20px,2.2vw,30px)`) + a right-aligned role label (13px `#8a887c`), separated by `1px #2a2921` bottom borders.

**Behavior (drive from `progress`, do NOT use GSAP `pin` — the sticky element does the pinning; use ScrollTrigger only to read progress):**
```ts
const skills = document.querySelector("#skills");
const cats   = [...skills.querySelectorAll(".cat-item")];
const panels = [...skills.querySelectorAll(".cat-panel")];
const dots   = [...skills.querySelectorAll(".prog-dot")];
const N = panels.length; // 3

function activate(idx, local) {
  cats.forEach((c, i) => {
    const on = i === idx;
    c.style.opacity = on ? "1" : "0.3";
    c.querySelector(".cat-num").style.color  = on ? "#6f7cff" : "#5b5a50";
    c.querySelector(".cat-name").style.color = on ? "#f3f0e9" : "#5b5a50";
  });
  dots.forEach((d, i) => (d.style.background = i <= idx ? "#6f7cff" : "#3b3a31"));
  panels.forEach((pl, i) => {
    const on = i === idx;
    pl.style.opacity = on ? "1" : "0";
    pl.style.transform = on ? "translateY(0)" : i < idx ? "translateY(-24px)" : "translateY(24px)";
    pl.style.pointerEvents = on ? "auto" : "none";
    if (on) {
      const items = [...pl.querySelectorAll(".sk-item")];
      const show = Math.max(1, Math.ceil(local * items.length)); // reveal one-by-one
      items.forEach((it, j) => {
        const vis = j < show;
        it.style.opacity = vis ? "1" : "0.15";
        it.style.transform = vis ? "translateX(0)" : "translateX(20px)";
      });
    }
  });
}

activate(0, 0.2);
ScrollTrigger.create({
  trigger: skills, start: "top top", end: "bottom bottom", scrub: true,
  onUpdate: (self) => {
    const p = self.progress;
    let idx = Math.min(N - 1, Math.floor(p * N));
    const local = p * N - idx;
    activate(idx, local);
  },
});
```
- `.cat-panel` and `.sk-item` need CSS transitions for smoothness: panels `opacity .5s, transform .5s`; items `opacity .45s, transform .45s`.
- Initial CSS state: panels opacity 0 (panel 1 also `translateY(0)`, panels 2–3 `translateY(24px)`); items opacity 0.15, `translateX(20px)`.
- Tune stage length by changing section height (`360vh` ≈ 120vh per category). Longer = slower/more deliberate.

**Category data:**
- Frontend: React (UI library), Next.js (Framework), TypeScript (Language), JavaScript (Language), Vue (Framework), Tailwind (Styling), HTML5 & CSS3 (Fundamentals).
- Backend: Node.js (Runtime), NestJS (Framework), Express (Framework), Laravel (Framework), PostgreSQL (Database), MySQL (Database), Redis (Cache).
- Infra & DevOps: Docker (Containers), Linux (Systems), GitHub Actions (CI/CD), Jenkins (CI/CD), Vercel (Hosting), AWS (Cloud).

### Services
- Padding `120px 56px`. Eyebrow `03 — Services`, H2 "What I can build for you."
- Four rows, each grid `60px 1fr 1.4fr`, gap 32px, `34px 0` padding, `1px #ded9cd` bottom borders: number (`#b4b1a4`) / title (Bricolage 600, 26px) / description (`#5c5b51`).
  1. **Frontend Development** — Responsive, accessible interfaces in React & Next.js — fast, consistent, and pixel-perfect down to the last detail.
  2. **Fullstack Engineering** — End-to-end product work — APIs, databases, and business logic with Node, NestJS, Laravel and SQL, built to scale.
  3. **UX & Interface Design** — Thoughtful layouts, clear hierarchy and smooth interactions — turning rough ideas into interfaces people enjoy using.
  4. **Cloud & DevOps** — Containerized deploys, CI/CD pipelines and reliable infrastructure with Docker, GitHub Actions and cloud platforms.

### Stats band
- Padding `96px 56px`, bg `#eae6db`, top+bottom borders. Grid `repeat(3,1fr)`, centered, middle cell has left+right `1px #d7d2c5` borders.
- `05+`, `20+`, `10+` (the `+` is accent) with labels "Years of experience", "Projects shipped", "Clients & teams served". **Replace numbers with real values.**

### Selected Work
- Padding `120px 56px`. Eyebrow `04 — Selected work`, H2 "Things I've built."
- Two `.workrow` anchor rows (top/bottom `1px #ded9cd`), each grid `1.2fr 1fr auto`, gap 40px, `40px 0`:
  - **Fodor's Travel** → https://www.fodors.com — 2023–Present — "High-traffic travel content platform. Fullstack work on a Vue & Laravel stack backed by PostgreSQL." Tags: Vue, Laravel, PostgreSQL.
  - **Vamo Delivery** → https://www.vamodelivery.com — 2022–2023 — "On-demand delivery app serving thousands of orders. Fullstack with React Native, Node.js and AWS." Tags: React Native, Node.js, AWS.
  - Hover: title → accent `#1f34d6`; arrow (`↗` SVG) translates `+6px,-6px`. Tags = `#eae6db` chips, radius 100px.

### Contact (dark)
- Padding `130px 56px`, bg `#17160f`, paper text. Eyebrow `05 — Contact` (`#6f7cff`).
- H2 "Let's build / something." (`clamp(44px,7vw,104px)`, `.` = `#6f7cff`).
- Paragraph (`#a19f93`, max-width 520px).
- Buttons: `hello@montano.me` (paper bg, ink text) + LinkedIn ↗ + GitHub ↗ (1px `#4a4940` borders). Pills.
- Footer row (top border `#33322a`, margin-top 110px): `FM.` logo + "© 2026 Fernando Montano — Fullstack Developer".

## Interactions & Behavior
- **Hero intro**: on load, all hero `.fx` elements animate `opacity 0→1, y 28→0`, duration 0.85s, stagger 0.1, ease `power3.out`, delay 0.15.
- **Scroll reveals**: every non-hero `.fx` element fades up (`opacity 0→1, y 30→0`, 0.8s, `power3.out`) via ScrollTrigger `start:"top 88%", once:true`.
- **Hero watermark parallax**: `FM` watermark `yPercent: -18` scrubbed over the header (`start:"top top", end:"bottom top"`).
- **Skills**: pinned scrollytelling described above.
- **Nav links**: animated underline on hover; smooth-scroll to anchors.
- **Work rows**: title color + arrow translate on hover.
- Respect `prefers-reduced-motion`: skip/shorten GSAP timelines and jump the Skills section to plain stacked cards.

## State Management
No app state. The only dynamic value is scroll progress → derived `(activeIndex, localProgress)` for the Skills section (see code). Everything else is static markup.

## Assets
- **`portrait.webp`** — real hero portrait (currently a striped placeholder). Put in `public/`. The old site used `me.C4o2J_bm_oY6bA.webp`.
- Arrow glyphs are inline SVG (`↗` up-right arrow) — keep as SVG, not an icon font.
- Fonts via Google Fonts (self-host with `@fontsource/bricolage-grotesque` and `@fontsource/ibm-plex-sans` if you prefer no external requests).
- No other images/icons.

## Files
- `Montano Portfolio.dc.html` — the full design reference (all sections, inline styles, and the GSAP logic in its `Component` class). Read the `<x-dc>` markup for structure/styles and the `class Component` block for the exact animation code.

## Suggested Claude Code prompt
> Implement the design in `design_handoff_montano_portfolio/Montano Portfolio.dc.html` as native Astro components in this repo (see README.md for tokens, copy, and the GSAP pinned-scroll Skills logic). Match it pixel-for-pixel. Use `gsap` from npm loaded via a client `<script>`. Add a real `portrait.webp` and real stat numbers. Honor `prefers-reduced-motion`. Keep the existing repo's conventions (Astro v5, TypeScript).
