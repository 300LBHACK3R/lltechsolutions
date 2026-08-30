# Changelog

## 2026-08-30 — Strict TypeScript release fixes

### Engineering

- Converted contact-form validation to an explicit discriminated union so strict TypeScript narrows success and error states correctly.
- Corrected PWA icon `purpose` metadata to the single-value form accepted by the current Next.js manifest type.
- Added v4 recovery support for earlier interrupted release branches.

## 2026-08-30 — Release-gate cleanup

### Engineering

- Excluded local `.history` editor snapshots from ESLint and Git.
- Corrected the global error page to use Next.js client navigation.
- Added release recovery handling for interrupted or failed local release branches.
- Preserved local editor history in the Desktop release backup before cleanup.

## 2026-08-30 — Pricing and service-focus refinement

### Commercial positioning

- Enforced exactly three public services: Website Design & Development, Software Design & Development, and Social Media Management.
- Simplified the project-inquiry service selector to those three services plus a consultation option.
- Added transparent, competitive CAD starting prices and service tiers.
- Added validation rules so the public service scope cannot drift back into unrelated offerings.

### Navigation

- The Home navigation link is hidden while the visitor is already on the homepage.
- Home remains available in desktop and mobile navigation on every internal route.

## 2026-08-29 — Production premium release

### Brand and content

- Focused the public offer on website design and development, software design and development, and social-media management.
- Refined the studio positioning, calls to action, proof language, service descriptions, and project case studies.
- Added all current commissioned, owned-product, and managed-brand projects.

### Experience

- Rebuilt the responsive system for mobile, tablet, desktop, ultrawide displays, and television-scale screens.
- Added an accessible active-navigation system, mobile dialog, skip link, reduced-motion handling, error boundary, and custom 404 page.
- Added a real-project hero showcase with keyboard-operable tabs and motion-aware rotation.
- Optimized and standardized brand and project imagery.

### Search and sharing

- Centralized metadata, canonical URLs, Open Graph, Twitter cards, robots, sitemap, manifest, icons, and Search Console verification.
- Added Organization, ProfessionalService, WebSite, service catalogue, and project collection structured data.

### Security and operations

- Upgraded Next.js and React to patched production versions.
- Added a restrictive Content Security Policy and browser-security headers.
- Hardened project-inquiry validation, origin checks, body limits, option validation, honeypot filtering, and best-effort throttling.
- Added privacy, terms, security disclosure, CI quality gates, dependency monitoring, repository validation, and release documentation.

### Repository cleanup

- Removed archived pages, duplicate data files, obsolete IT and infrastructure routes, unused components, generated reports, default starter assets, and oversized legacy imagery.
- Reorganized the source tree around clear route, layout, content, project, SEO, and design-system responsibilities.
