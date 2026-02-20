# Software Studios Website (Angular)

Production-ready marketing website for **Software Studios** (a Kkreative technology wing).

This README explains the project workflow in detail so new developers can quickly understand:
- what is where,
- how content flows,
- how UI is structured,
- how to build/deploy safely.

---

## 1) Project Purpose

This app is a conversion-focused website for Indian business audiences.

Main goals:
- communicate trust (since 2014),
- explain services in simple language,
- push users to high-intent actions:
  - call
  - WhatsApp
  - email
  - consultation page

---

## 2) Tech Stack

- Angular 20 (standalone components, lazy loaded routes)
- TypeScript (strict)
- SCSS (custom design system, no Tailwind)
- Angular animations + CSS transitions
- Netlify deployment with SPA redirects

---

## 3) Root Structure

```text
softwarestudios/
  public/                    # static assets + _redirects
  src/
    app/
      components/            # reusable visual sections/widgets
      content/               # typed content constants (single source for copy/data)
      core/services/         # SEO metadata + brand-lab service
      pages/                 # route-level pages
      shared/directives/     # reveal-on-scroll, count-up
      shared/models/         # shared type models (brand lab etc.)
      app.ts                 # root app shell
      app.html               # navbar + routed content + floating widgets
      app.routes.ts          # route map
    styles/                  # tokens, utilities, animations, mixins
    styles.scss              # global imports + baseline styles
  angular.json
  netlify.toml
  package.json
```

---

## 4) Routing Workflow

Defined in `/src/app/app.routes.ts`.

Routes:
- `/` -> Home
- `/services` -> Services detail page
- `/industries` -> Industries detail page
- `/about` -> About page
- `/contact` -> Contact page
- `/blogs` -> Blogs listing
- `/blogs/:slug` -> Blog detail
- `**` -> redirect to `/`

All pages are lazy loaded via `loadComponent(...)`.

---

## 5) App Shell Workflow

Root shell is in:
- `/src/app/app.ts`
- `/src/app/app.html`

Order:
1. Navbar always mounted
2. Routed page content
3. Deferred footer
4. Floating contact action
5. Floating chatbot
6. Brand Lab overlay in preview mode only

SEO metadata updates on every route change using:
- `/src/app/core/services/seo-meta.service.ts`
- content source from `ROUTE_SEO` in `/src/app/content/site-content.ts`

---

## 6) Content Workflow (Most Important)

The main business/content source is:
- `/src/app/content/site-content.ts`

This file contains:
- typed interfaces (`ServiceItem`, `IndustryItem`, `BrandStat`, etc.)
- constants for:
  - contact info
  - stats
  - services
  - industries
  - process steps
  - testimonials
  - insights
  - pricing
  - nav/footer data
  - route SEO metadata

### Rule
If you need to change business text/data, first update `site-content.ts`.
Do not hardcode values in component templates unless necessary.

---

## 7) Home Page Composition Workflow

Home route component:
- `/src/app/pages/home/home-page.component.html`

Current section order:
1. Hero
2. Stats
3. About teaser
4. Why choose
5. Services grid
6. Industries grid
7. Process
8. Testimonials (deferred)
9. Insight strip (deferred)
10. Pricing highlight
11. Final CTA

Each section is standalone under `/src/app/components/...`

---

## 8) Styling Workflow

Global styling layers:
- `/src/styles/_tokens.scss` -> colors, spacing, radius, shadows, typography tokens
- `/src/styles/_utilities.scss` -> shared layout helpers (`.container`, `.section`, reveal classes)
- `/src/styles/_animations.scss` -> keyframes
- `/src/styles.scss` -> global reset + baseline rendering behavior

### Design rules
- Use tokens first, avoid magic values
- Maintain contrast and readability
- Keep interaction effects subtle (premium, not noisy)
- Mobile-first spacing must remain clean

---

## 9) Floating Widgets Workflow

### Contact FAB
Files:
- `/src/app/components/contact-fab/contact-fab.component.ts`
- `/src/app/components/contact-fab/contact-fab.component.html`
- `/src/app/components/contact-fab/contact-fab.component.scss`

Behavior:
- desktop: expandable contact menu
- mobile: sticky WhatsApp quick action
- click sounds on interactions

### Chatbot
Files:
- `/src/app/components/chatbot-widget/...`

Behavior:
- local rule-based responses (no external AI API)
- quick questions
- links for call/email/WhatsApp handoff

---

## 10) Brand Lab (Logo + Font Switcher) Workflow

Visible only when `uiMode === 'preview'`.

Files:
- `/src/app/components/brand-lab-overlay/...`
- `/src/app/core/services/brand-lab.service.ts`
- `/src/app/shared/models/brand-lab.model.ts`

Environment flag:
- `/src/environments/environment.ts`

Current:
```ts
uiMode: 'production' | 'preview'
```

To enable Brand Lab:
1. set `uiMode: 'preview'`
2. restart dev server

---

## 11) Run / Build / Test

Install:
```bash
npm ci
```

Run dev server:
```bash
npm start
```

Development build:
```bash
npm run build -- --configuration development --no-progress
```

Production build:
```bash
npm run build -- --configuration production --no-progress
```

Unit tests:
```bash
npm test
```

---

## 12) Netlify Deployment Workflow

Netlify config file:
- `/netlify.toml`

Configured values:
- Base: `softwarestudios`
- Build command:
  `npm ci && npm run build -- --configuration production && cp public/_redirects dist/softwarestudios/browser/_redirects`
- Publish dir:
  `dist/softwarestudios/browser`

SPA redirect:
- `/public/_redirects` contains:
  `/* /index.html 200`

---

## 13) Day-to-Day Update Playbook

### A) Update copy/content
1. Edit `/src/app/content/site-content.ts`
2. Run dev build
3. Check impacted section on desktop + mobile

### B) Update styles
1. Prefer token changes in `_tokens.scss`
2. Then adjust component SCSS
3. Validate all breakpoints (390, 430, 768, 1024, 1366)

### C) Add new section on home
1. Create component in `/src/app/components`
2. Import into `/src/app/pages/home/home-page.component.ts`
3. Insert in `home-page.component.html`
4. Keep section-level IDs and heading structure consistent

### D) Add new page route
1. Add page component in `/src/app/pages`
2. Register route in `/src/app/app.routes.ts`
3. Add nav/footer links if needed
4. Add SEO metadata entry in `ROUTE_SEO`

---

## 14) Quality Checklist Before Push

- `npm run build -- --configuration development --no-progress` passes
- No console errors in browser
- Mobile menu opens/closes correctly
- Chatbot and floating actions do not overlap critical UI
- CTA links work (`tel:`, `mailto:`, WhatsApp, router links)
- Footer/layout spacing looks balanced on mobile
- Text contrast is readable on all sections

---

## 15) Common Troubleshooting

### UI change not visible
- hard refresh browser (`Cmd + Shift + R`)
- clear service worker/browser cache if needed

### Mobile overlay issues
- check `z-index` between navbar, chatbot, contact fab
- check `body.mobile-menu-open` interaction rules

### Netlify route 404
- confirm `_redirects` copied to `dist/softwarestudios/browser`
- verify `publish` path in Netlify project settings

---

## 16) Team Notes

- Keep language simple and business-friendly.
- Avoid overloading UI with too many concurrent effects.
- Conversion clarity is higher priority than visual novelty.
- Treat `site-content.ts` as the primary content contract.

---

## 17) Quick Commands

```bash
# local run
npm start

# dev build
npm run build -- --configuration development --no-progress

# production build
npm run build -- --configuration production --no-progress
```
