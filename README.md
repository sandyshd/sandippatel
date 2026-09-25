# Sandip Patel — Enterprise Leadership Platform

Source for [sandipbpatel.com](https://sandipbpatel.com) — the market-facing platform of Sandip Patel,
Cloud & Secure Agentic AI Architect. Positioning: zero-trust architecture, multi-agent orchestration,
critical infrastructure modernization and operationalizing LLMs for Fortune 500 operators.

Static HTML/CSS/JS. No frameworks, no build step. Deployed via GitHub Pages.

## Pages

| File | Nav | Purpose |
| --- | --- | --- |
| `index.html` | — | Conversion page. All eight sections: hook, executive matrix, core pillars, experience, insights, media footprint, industry contributions, advisory CTA |
| `expertise.html` | Expertise | Six core pillars in depth, technology stack, open-source proof |
| `insights.html` | Insights | Peer-reviewed research framed for a practitioner audience |
| `influence.html` | Influence | Media footprint + strategic industry contributions |
| `experience.html` | Experience | Career history, recognition, credentials, education |
| `engage.html` | **Engage** (CTA) | Four engagement formats, fit criteria, contact |

Navigation is four links plus one accent CTA button (`.btn-cta`) — a deliberate conversion pattern.
The CTA hides below 560px; an `Engage` link marked `.nav-only-mobile` appears inside the mobile
drawer instead.

## Voice and positioning rules

The site addresses C-suite buyers, enterprise technology leaders and founders. Copy must
demonstrate **commercial impact and market authority**, not eligibility against a checklist.

- **Vocabulary** — use Zero-Trust Architecture, Multi-Agent Orchestration, Critical Infrastructure
  Modernization, Operationalizing LLMs, Autonomous FinOps. Avoid administrative or regulatory
  register: no "criteria", "evidence of", "service record", "eligibility".
- **Naming** — research is *Insights*, press is *Media Footprint*, reviewing and judging are
  *Strategic Industry Contributions* or *technical vetting*, contact is *Engage*.
- **Navigation labels stay plain.** The nav is for wayfinding, not voice — use words every visitor
  understands instantly (Expertise, Insights, Influence, Experience). "Blueprints" and "Trajectory" were both rejected as too technical for a personal site. Personality belongs in
  headlines and body copy, never in nav labels.
- **Every claim carries a number.** If a paragraph has no metric, it probably has no business value.
  Figures come from `Sandip_Patel_Resume.pdf`; research status comes from `Sandip_Patel_EB1A_CV.pdf`.
- **Publication status stays honest.** Published, Accepted (proceedings pending) and Under review are
  visually distinct badges and must never be collapsed into "published".
- **Independence statement** on `engage.html` must remain: full-time Microsoft employment, views are
  his own.

## Assets

```
assets/
  css/styles.css        Base design system (sections 1-19) + executive layer (section 20)
  js/main.js            Theme, mobile nav, reveal, filters, back-to-top, legacy hash redirects
  img/                  Portrait, badges, company logos, media outlet marks
  Awards/               Award documents
  Certificates/         Microsoft certification PDFs
CNAME                   Custom domain
robots.txt              Crawl directives (both PDFs disallowed)
sitemap.xml             Search engine sitemap
.nojekyll               Bypass Jekyll on GitHub Pages
```

## Design system

CSS custom properties throughout. Two layers:

**Base (sections 1–19)** — tokens, typography, layout, cards, tables, timeline, footer, print.
Source Serif 4 display + Inter UI; warm paper light theme and ink dark theme; navy accent
`#14415f` with a bronze secondary.

**Executive layer (section 20)** — the premium components:
- `.band-feature` — theme-aware feature band used for the hook and the advisory CTA. It declares
  its own `--band-*` token set with light-theme defaults and a `[data-theme="dark"]` override, so
  the band is tinted paper in light mode and deep ink in dark mode. **The page is never half-light
  and half-dark.** If you add a band, use this class and the `--band-*` tokens — never hard-code a
  colour inside it.
- `.hook` — oversized display headline, lead, CTA group, trust bar, portrait.
- `.intro-note` — first-person aside with avatar and signature line. Uses base theme tokens only, so
  it works in both themes without overrides, and carries its link inline rather than as a button.
- `.matrix` / `.matrix__item` — executive metric grid, three columns on desktop.
- `.pillar` — numbered capability card with a proof line.
- `.era` / `.role-block` / `.metric-inline` — career-era grouping with inline metrics.
- `.blueprint` — research card with a "What it gives you" takeaway block (class name only; the visible label is "Insights").
- `.engage-card` — engagement format card, band-token aware.
- `.split`, `.rule-list`, `.stat-line` — layout utilities.

### Theming

The site **defaults to light for every visitor**. System `prefers-color-scheme` is deliberately not
consulted — the opening impression is fixed. The header toggle switches the entire page, bands
included, and the choice persists in `localStorage` under `theme`. The default lives in two places
that must stay in sync:

- the inline no-flash script in each page's `<head>` (`localStorage.getItem('theme') || 'light'`)
- `DEFAULT_THEME` in `assets/js/main.js`

To restyle globally, edit the token block at the top of `styles.css`; for the feature bands, edit
the `--band-*` block inside `.band-feature` and its dark override.

## Updating content

- **New insight** — add an entry to `insights.html` and a matching card on `index.html`. Include
  a `.blueprint__takeaway` answering "what it gives you" in commercial terms.
- **New press item** — add to `influence.html#media`, ordered by outlet reach (Forbes first, not by
  date). Drop a square icon into `assets/img/` and reference it at `width="18" height="18"`.
- **Metrics** — the executive matrix on `index.html` and the `.metric-inline` lists on
  `experience.html` must stay consistent with each other.
- **Cache busting** — bump `?v=YYYYMMDD` on the `styles.css` and `main.js` links in every page.

## SEO

Implemented against the [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).
The goal is that a search for **"Sandip Patel"** surfaces this site, which depends on entity
consolidation as much as on page quality.

**Entity signals — the part that matters most for a name search**
- A single `Person` node (`@id` = `https://sandipbpatel.com/#person`) is declared on *every* page and
  referenced by each `WebPage`/`ProfilePage` via `about` / `mainEntity`. One entity, six pages.
- `sameAs` lists LinkedIn, GitHub, ORCID, Google Scholar, ResearchGate and Credly.
- `<link rel="me">` in every `<head>` mirrors those profiles for identity verification.
- `"Sandip Patel"` appears in every `<title>` and meta description.

**Crawl and index**
- `sitemap.xml` (6 URLs, current `lastmod`), referenced from `robots.txt`
- Self-referencing `rel="canonical"` on every page
- Descriptive URLs (`expertise.html`, `insights.html`, …) — no query strings or IDs
- Custom `404.html` marked `noindex, follow` that routes visitors back into the site
- Both source PDFs `Disallow`ed

**Title links and snippets**
- Titles 25–50 characters, unique per page, name always present
- Meta descriptions 140–155 characters — under Google's truncation point, one per page

**Core Web Vitals** (measured locally, 1440px)

| Metric | Result | Threshold |
| --- | --- | --- |
| LCP | 516 ms | < 2.5 s |
| CLS | 0.067 | < 0.1 |
| Page transfer | 595 KB / 17 requests | — |

Achieved by replacing the 1.27 MB `sandip.png` hero with an 800×1000 `sandip-portrait.jpg` (80 KB),
adding `fetchpriority="high"` plus a `<link rel="preload">`, giving **every** image explicit
`width`/`height` (CLS), and lazy-loading everything below the fold.

**Images**
- `sandip.png` is the master source — **not referenced by any page**. Derive variants from it.
- `sandip-portrait.jpg` 800×1000 hero · `sandip-avatar.jpg` 128×128 brand mark and intro note
- `sandip-og.jpg` 1200×630 branded social card, declared with `og:image:width/height/type`
- `favicon.ico` (multi-size) and `apple-touch-icon.png` 180×180
- Descriptive alt text on badges and logos for Google Images

**Deliberately omitted:** the `keywords` meta tag — Google does not use it and the starter guide
lists it under things not to focus on.

### Off-site — still required

On-site work cannot by itself win a name query. These are manual steps:

1. Verify the domain in [Google Search Console](https://search.google.com/search-console) and submit
   `sitemap.xml`.
2. Add `https://sandipbpatel.com` to the website field of **LinkedIn, ORCID, Google Scholar,
   ResearchGate, GitHub and Credly**. These inbound links from high-authority profiles are what
   confirms the entity.
3. Keep the name, job title and location identical everywhere they appear.

## Local preview

```powershell
python -m http.server 8080
# http://localhost:8080
```

## Deployment

GitHub Pages serves `main` from the repository root. `CNAME` pins the domain; `.nojekyll` disables
Jekyll. Legacy inbound anchors from the previous single-page site (`#about`, `#publications`,
`#judge`, `#media`, `#awards`, `#mentorship`, `#contact` and others) are remapped client-side in
`main.js` — keep that map current whenever a page is renamed.

## Notes

- `Sandip_Patel_EB1A_CV.pdf` and `Sandip_Patel_Resume.pdf` are local content sources only. Both are
  git-ignored and disallowed in `robots.txt`; neither should be committed or linked.
- The previous academic/EB-1A build is archived outside the repository at
  `C:\Microsoft Scout\sandippatel-academic-backup` in case that framing is needed again.
