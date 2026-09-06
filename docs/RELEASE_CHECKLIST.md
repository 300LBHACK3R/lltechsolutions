# Release checklist

## Before review

- Use an isolated worktree or branch and preserve existing local work.
- Confirm the live-source baseline is still appropriate; this release starts at `55b9d7b`.
- Run `npm ci`, formatting, `npm run check`, dependency audit, production build and `npm run smoke`.
- Review the diff, including deleted files. Originals are recoverable from Git history.

## Browser review required

- Inspect 320/390 px mobile, 768 px tablet, 1366/1440 px desktop and 1920/2560 px wide layouts.
- Use Chrome/Edge, Firefox and Safari, including a real iOS or Android device when available.
- Check navigation, menu close/Escape, keyboard focus, showcase tabs, project anchors and external links.
- Check contact service preselection, native validation, failure messaging and retained input.
- Check reduced-motion mode and usable content with JavaScript unavailable.
- Inspect every page for overflow, missing images, unreadable type and console errors.

## Before production

- Set RESEND_API_KEY, CONTACT_TO_EMAIL and a verified CONTACT_FROM_EMAIL in the intended Vercel environment.
- Verify live inquiry receipt and reply-to with Tate's explicit authorization. A success UI alone does not prove inbox delivery.
- Review privacy/terms wording against actual operating practices and provider setup.
- Check project images against the latest live clients; existing supplied screenshots may reflect earlier designs.
- Verify HTTPS, canonical URLs, robots, sitemap and the 1200×630 social share image on the deployed preview/production domain.
- Confirm GitHub Quality workflow is green for the actual review commit.
- Merge/publish only after the review and authorization. Do not pop an old stash over the release.
- After launch, confirm the production commit and repeat the critical link and inquiry checks before advertising the new site.
