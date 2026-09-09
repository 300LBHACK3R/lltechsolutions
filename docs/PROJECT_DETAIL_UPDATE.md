# Project detail update — September 9, 2026

This update builds on the production release confirmed in Tate's Windows log at `0a2d672`. It includes the subsequent publisher path fix and keeps the approved black/gold layout, compact footer, three service disciplines, Our Clients navigation and current starting prices.

## Client-facing changes

Each of the six project entries now explains the brief, the work delivered and the resulting customer journey. The project sidebar names the relevant development tools or content platforms and explains hosting and ongoing responsibilities in plain language. Tow-N-Go's monthly partnership remains distinct from McKenzie House's completed launch, and Tate's TV remains studio-owned software.

Chad Muxlow's full five-star Google review appears on `/reviews`, preserving the three paragraphs in Tate's supplied screenshot. Heather's exact testimonial remains unchanged. No review date, Google permalink or aggregate score has been invented.

## Factual checks

| Project                | Evidence used for the implementation description                                                                                                                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tow-N-Go website       | Current repository package confirms Next.js, React, TypeScript, Tailwind CSS and Resend. Project history confirms Vercel/GitHub. Public browsing verified rental categories, trailer detail/gallery, service information and the prefilled trailer enquiry link. No enquiry was submitted. |
| Crestline Painting     | Current repository package confirms Next.js, React, TypeScript and Tailwind CSS. Public response headers identify Vercel hosting. Public browsing verified service and portfolio categories, Custom Homes and real project galleries.                                                      |
| McKenzie House Massage | Current repository package confirms Next.js, React, TypeScript and Tailwind CSS. Project history confirms Vercel/GitHub. Public pages verified treatment details, pricing before GST, treatment video elements, client photo reviews and ClinicSense links. No appointment was booked.     |
| Tate's TV              | The current repository package and project README identify Next.js, React, TypeScript, Tailwind CSS, Zustand, Supabase programming data, Cloudflare R2 media and Vercel/GitHub deployment. Streaming operation was not established by this review.                                         |
| Content projects       | Tate's supplied scope, existing media and approved project history establish the monthly Tow-N-Go partnership and the completed McKenzie content/launch work. Private commercial terms and unverified business results are not public case-study copy.                                     |

Technology names are intentionally not tied to public version numbers. Describing a platform is not a claim that every client application's dependencies or operational controls were audited in this update.

## Video delivery

The six MP4 files, posters and description tracks are unchanged. Fuller client-page tours were explored, but the browser captures could not be transferred into the video workspace for export. This update therefore uses Tate's requested fallback: one clear media mapping and a replacement guide for his own recordings. Optional audio labels and captions support are implemented without adding blank media files or broken references.

See [Replacing your portfolio videos](REPLACING_PROJECT_VIDEOS.md) for exact paths and suggested recording sequences. Existing previews retain native controls, inline playback, no autoplay and `preload="none"`.

## Validation and publication

Formatting, `npm run check`, dependency audit, production build and `npm run smoke` passed on September 9. Import/asset validation covered 63 source files, lint passed with zero warnings, TypeScript and all eight contact-security tests passed, and the dependency audit reported zero known vulnerabilities. All 48 production HTTP checks passed, including public routes, metadata, internal navigation, headers, contact rejection paths, verbatim review content, project implementation sections and all preview assets. The packaged verification report also records the isolated PowerShell checks and package integrity results.

Fresh visual/device QA of this build is not claimed: local and protected preview browsing was unavailable. Actual contact inbox delivery is also separate from the automated rejection checks; use [Contact setup](CONTACT_SETUP.md) for configuration and receipt testing.

The Windows publisher accepts an explicit release directory, creates an isolated worktree, runs the quality gates, waits for the exact GitHub Quality commit and uses a normal fast-forward main push with concurrency checks. It checks the public site for Chad's review and the implementation sections after publication. The update is not live until that publication succeeds; existing production success does not establish deployment of this new commit.
