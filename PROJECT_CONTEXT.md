# Cinemora Studios Website — Project Context

Handoff doc for any agent picking up work on this project. Read this first.

## What this is

Marketing/agency website for **Cinemora Studios** ("We turn attention into clients"),
a personal-branding / content production agency. Single long-scroll landing page
(hero → video → services → milestones → impact stats → testimonials → work
showcase → FAQ → about/founder → team → footer).

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- No CSS framework — one hand-written stylesheet: [app/globals.css](app/globals.css)
- No backend/API, no database, no CMS — all copy/content is hardcoded in `.tsx` files
- **Not a git repository** (no `.git` at project root) — there is no commit history
  or diffs to inspect; treat the working tree as the only source of truth
- Package manager: npm. **On Windows, `npm` alone hits a PowerShell execution-policy
  shim issue — always call `npm.cmd` instead** (e.g. `npm.cmd run dev`, `npm.cmd run lint`)

## Where everything is

```
app/
  layout.tsx        Root layout — wraps children in <html>/<body>, mounts ScrollProgress
  page.tsx           The entire page composition (imports + orders every section)
  globals.css        ALL styling for the whole site (~2000+ lines, no CSS modules)
components/
  site-header.tsx        Header/nav bar (full-width band + centered inner content)
  hero-section.tsx       Hero: slideshow background, H1 pitch, CTA buttons, brand
                         logo carousel, glass metric stats bar
  service-row.tsx        "ServiceMilestones" — numbered process/milestone rows
  branding-card.tsx      Card used in the "Personal Branding Services" grid
  impact-section.tsx     Impact/stats section
  testimonials-section.tsx
  work-showcase.tsx      Work/portfolio showcase grid
  faq-section.tsx
  site-footer.tsx
  scroll-progress.tsx    Fixed top scroll-progress bar (mounted in layout.tsx)
  rolling-link.tsx       Reusable hover-rolling-text link component
public/images/
  branding/           Logo, menu icon
  decorative/          Vector curve graphic under hero heading
  hero/slides/         8 hero background slideshow images (slide1.png … slide8.png)
```

There are no other route segments — this is a one-page site (`app/page.tsx` is the
only page, anchored sections via `id` for nav links: `#top`, `#work`, `#case-studies`,
`#contact`).

## Layout / width system (important — this took several iterations to get right)

The site uses a **full-bleed background + constrained inner content** pattern:
- Section backgrounds (`.hero`, `.site-header`, `.site-footer`, etc.) always span
  100% of the viewport width.
- Inner content sits in a wrapper (`.section-inner`, `.hero-content`,
  `.site-header-inner`, etc.) whose width is capped by the CSS custom property
  `--content-max-width` (defined in `app/globals.css` `:root`), currently stepped
  via media queries at `1440px` / `1680px` / `2000px+` breakpoints to `80vw`.
- Side padding on inner content uses the shared `--content-padding` variable —
  change that instead of hand-editing padding in every section.
- **Do not re-introduce a max-width on the outer page/`main` element** — an earlier
  attempt at this narrowed backgrounds along with content, which was explicitly
  rejected. Always constrain the *inner* wrapper, never the outer band.

## Mobile breakpoints in globals.css

- `max-width: 1440px` — content-max-width steps back down
- `max-width: 1200px` — hero content narrows, branding grid goes 2-column
- `max-width: 760px` — main mobile breakpoint: nav collapses to hamburger menu,
  hero switches to stacked/centered layout with background video/slideshow
  cropped to a fixed-height band (`--hero-media-height`), metrics bar becomes a
  dark pill overlay, brand logo carousel is hidden entirely

## Known gotcha already fixed once — watch for it elsewhere

In `hero-section.tsx`, the H1 uses a manual `<br />` for the desktop line break,
which is CSS-hidden (`display: none`) on mobile so the heading reflows naturally.
When text nodes are split across a JSX line like:
```jsx
We build Personal Brands and
<br />
Products that build ROI...
```
JSX does **not** insert a space between "and" and `<br />` — hiding the `<br />`
on mobile made the words visually merge ("andProducts"). Fixed by adding an
explicit `{" "}` before the `<br />`. If similar `<br />`-hidden-on-mobile
patterns exist elsewhere (check `faq-section.tsx`, `service-row.tsx`,
`testimonials-section.tsx` — they were also edited for the width refactor), verify
there's a real space character, not just JSX line-break whitespace, on either
side of any hidden `<br />`.

## Commands

```powershell
npm.cmd run dev      # start dev server (Next.js), default port 3000
npm.cmd run lint     # eslint .
npm.cmd run build    # production build — also catches most JSX/CSS regressions
```

Dev server check (Windows-safe, no `curl`):
```powershell
try { Invoke-WebRequest -Uri http://127.0.0.1:3000 -UseBasicParsing -TimeoutSec 15 | Select-Object StatusCode } catch { $_.Exception.Message }
```

## Verifying visual/layout changes

No project-specific screenshot skill exists yet. To actually see rendered output
(rather than guessing from CSS), Playwright works but isn't installed as a
dependency — install it ad hoc:
```powershell
npm.cmd install playwright --no-save
npx playwright install chromium
```
then drive it with a small Node script (`chromium.launch()` → `newContext({ viewport })`
→ `page.goto('http://127.0.0.1:3000')` → `page.screenshot(...)`). Useful viewport
widths to check when touching responsive CSS: `320, 375, 390, 414, 600, 760, 900,
1024, 1200, 1440, 1680, 2000+`.

## Recent work in this project (most recent first)

1. Fixed the "andProducts" merged-text bug on mobile hero heading (see gotcha above).
2. Widened `--content-max-width` to `80vw` on large screens per client request
   ("cover somewhat 80% of screen width"), and nudged the hero pitch block
   further toward center.
3. Enlarged hero stat circles (`.metric-icon`/`.glass-metric`) and increased
   spacing between them.
4. Reworked the width model from "constrain the whole page" (wrong — shrank
   backgrounds too) to "full-width bands + constrained inner content" — added
   inner wrapper elements/classes to header, footer, service rows, testimonials,
   work showcase, FAQ, video/about/team sections in `app/page.tsx`.
5. Initial ultra-wide-screen fix attempt (superseded by #4).

## Client/business context (for tone/copy questions)

- Agency founder: **Iqrar Hussain** (Founder & CEO); **Asfar Butt** (Project Manager)
- Sales/delivery pipeline described in `app/page.tsx`'s `services` array is the
  agency's real internal process (lead qual → contract → strategy → production →
  delivery → retention) — treat this copy as accurate business content, not
  placeholder text
- Contact email referenced in copy: `hello@cinemorastudios.com`
