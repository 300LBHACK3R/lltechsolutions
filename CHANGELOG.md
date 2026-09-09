# Changelog

## 1.3.1 — Publisher path handling

- Resolve project and release directory defaults inside the publisher body; accept an explicit release folder when running a separately downloaded repair script.
- Check for missing directories and release assets before Git operations, with named paths in the error messages.
- Add 11 isolated startup regression checks covering empty/omitted paths, separate download locations, spaces/brackets, missing assets and checksum rejection. Deployment guards remain unchanged.

## 1.3.0 — Client video previews

- Rename Selected Work navigation to Our Clients and remove the personal website from public project content.
- Add six inline previews using real public website captures and supplied client content, with native controls, no autoplay, local posters and visual descriptions.
- Keep Tate’s TV distinct as studio software, and present its guide/remote interface without claiming verified streaming playback.
- Extend asset and HTTP checks to all media files, seek support and retired-reference removal; update production publication checks.
- Document pending Google-review sources without inventing quotations from unreadable screenshots.

## 1.2.1 — Compact footer and production handoff

- Reduced footer padding and logo size, removed the repeated large statement and replaced vertical navigation with compact desktop links and a mobile grid.
- Preserved contact details, social links, legal pages, home navigation and motion controls.
- Rechecked current framework versions, dependency audit, live security headers and non-delivery contact validation.
- Documented Resend/Vercel setup and the separate inbox-delivery check.
- Added an explicit `-Deploy` publication workflow that preserves the original checkout, validates an isolated worktree, waits for exact-commit Quality and uses a normal main push with concurrency guards.

## 1.2.0 — Client showcase, reviews and investment

- Preserved the interactive black/gold studio design and shortened the homepage to five sections.
- Featured all three client websites, with a prominent link to Tow-N-Go's monthly social media/content partnership.
- Grouped the work directory into client websites, content partnerships and studio-owned projects.
- Moved Heather Knorr's exact testimonial to `/reviews`, with project context, unique metadata, breadcrumbs and sitemap/navigation entries.
- Retained the header's home link and added a linked footer logo with larger footer touch targets.
- Centralized website and social starting prices at $399+ CAD and $149+ CAD/month respectively. Software remains quoted after discovery; signed client agreements are unaffected.
- Removed the replaced homepage testimonial component and styles; added focused portfolio/review styles with mobile, large-screen and reduced-motion handling.
- Extended production checks for client links, exact testimonial wording, revised pricing, logo navigation, official social links and sitemap coverage.

## 1.1.0 — Interactive black and gold studio review

- Rebuilt the hero around a layered real-project stage, stronger technology-focused typography and manual keyboard-accessible project selection.
- Added a compact interactive service explorer with original illustrative interface/workflow/content studies.
- Introduced bounded pointer tilt, gold circuit motion, accessible pause controls and synchronized reduced-motion handling without adding an animation dependency.
- Refined project framing, charcoal surfaces, interior introductions and the gold final CTA.
- Added responsive rules through 4K, mobile input sizing, short-landscape menu handling and forced-color fallbacks.
- Refreshed McKenzie and Tow-N-Go screenshots from their actual homepages.
- Removed duplicated hero project content, consolidated portfolio structured data, corrected branded homepage metadata and documented the local motion preference.
- Extended production HTTP assertions for branded metadata, responsive viewport, tab semantics and security headers.

This redesign is a review release. Physical-device and visual browser QA remain outstanding before the next production merge.

## 1.0.0 — Black and gold corporate review

- Preserved the supplied logo and black/gold identity; introduced charcoal/gray section separation and restrained typography.
- Replaced obsolete IT/infrastructure positioning with website development, software development and social media/content.
- Simplified the homepage to six sections and moved full detail to dedicated pages.
- Consolidated project data, contact handling, business configuration and security headers.
- Added real client work, the exact approved Heather testimonial, category case studies and clear inquiry links.
- Removed 32 replaced/obsolete files, including legacy imagery, starter icons, duplicate forms/data, archived code, retired route modules and duplicate ESLint configuration.
- Optimized retained imagery and corrected app icons, social-share imagery, canonical metadata and sitemap routes.
- Added typed server validation, body/origin checks, bounded best-effort throttling, safe email error handling and focused tests.
- Updated dependencies within the existing stack and resolved known transitive audit findings.
- Added formatting, CI quality checks, a production smoke check, architecture/security/release notes and an initial promotion plan.

Historical note: the user subsequently merged the 1.0 corporate release into main at `5304cc16`; the 1.1 redesign above is a separate review.
