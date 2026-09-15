import { spawn } from "node:child_process";
import { once } from "node:events";
import assert from "node:assert/strict";
import { checkCollectionStyles } from "./check-collection-styles.mjs";

// The child process has no mail key: this test must never deliver external email.
const env = {
  ...process.env,
  RESEND_API_KEY: "",
  VERCEL_ENV: "production",
  NEXT_TELEMETRY_DISABLED: "1",
};
const port = 3198;
const origin = `http://127.0.0.1:${port}`;
const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--port", String(port), "--hostname", "127.0.0.1"],
  { env, stdio: ["ignore", "pipe", "pipe"] },
);
let serverOutput = "";
server.stderr.on("data", (chunk) => {
  serverOutput += chunk;
});
const timeout = setTimeout(() => server.kill(), 60000);
try {
  await new Promise((resolve, reject) => {
    server.stdout.on("data", (chunk) => {
      serverOutput += chunk;
      if (serverOutput.includes("Ready in")) resolve();
    });
    server.once("error", reject);
    server.once("exit", (code) => reject(new Error(`Server exited (${code}): ${serverOutput}`)));
  });
  const routes = [
    "/",
    "/services",
    "/website-collection",
    "/website-collection/category/construction-trades",
    "/website-collection/category/health-wellness",
    "/website-collection/category/legal-professional",
    "/website-collection/category/home-property",
    "/website-collection/category/retail-automotive",
    "/website-collection/category/transport-logistics",
    "/website-collection/category/food-restaurants",
    "/website-collection/calgary-hot-shot",
    "/website-collection/tow-n-go",
    "/website-collection/crestline",
    "/website-collection/mckenzie-house",
    "/website-collection/pigment",
    "/website-collection/structure",
    "/website-collection/still",
    "/website-collection/start",
    "/website-collection/compare",
    "/website-collection/brief",
    "/projects",
    "/projects/web-builds",
    "/projects/software-development",
    "/projects/social-media-management",
    "/reviews",
    "/process",
    "/packages",
    "/contact",
    "/free-tech-audit",
    "/privacy",
    "/terms",
    "/security",
  ];
  const privateUtilityRoutes = new Set([
    "/website-collection/start",
    "/website-collection/compare",
    "/website-collection/brief",
    "/website-collection/category/legal-professional",
    "/website-collection/category/home-property",
    "/website-collection/category/retail-automotive",
    "/website-collection/category/food-restaurants",
  ]);
  const htmlByRoute = new Map();
  const titles = new Set();
  let checks = 0;
  for (const route of routes) {
    const res = await fetch(origin + route);
    assert.equal(res.status, 200, route);
    const html = await res.text();
    htmlByRoute.set(route, html);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: exactly one h1`);
    assert.equal((html.match(/<main(?:\s|>)/g) || []).length, 1, `${route}: exactly one main`);
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(
      new URL(canonical).href,
      new URL(route, "https://lltechsolutions.ca").href,
      `${route}: canonical`,
    );
    if (privateUtilityRoutes.has(route))
      assert.ok(
        html.includes('name="robots" content="noindex, follow"'),
        `${route}: utility is not indexed`,
      );
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title && !titles.has(title), `${route}: unique title`);
    assert.ok(title.endsWith(" | L&amp;L Tech Solutions"), `${route}: complete branded title`);
    assert.ok(html.includes('lang="en-CA"'), `${route}: Canadian English language`);
    assert.ok(
      html.includes('name="viewport" content="width=device-width, initial-scale=1"'),
      `${route}: zoomable responsive viewport`,
    );
    assert.ok(html.includes('property="og:locale" content="en_CA"'), `${route}: social locale`);
    assert.ok(
      html.includes('name="twitter:card" content="summary_large_image"'),
      `${route}: social image card`,
    );
    titles.add(title);
    for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs))
      JSON.parse(match[1]);
    assert.ok(
      !/Remote IT|CCTV|Network Infrastructure|Cat6/.test(html),
      `${route}: obsolete positioning`,
    );
    assert.ok(
      !/tate.?byers\.ca|tate-byers|Selected Work/i.test(html),
      `${route}: retired public references`,
    );
    assert.ok(html.includes(">Our Clients</a>"), `${route}: current client navigation`);
    assert.ok(!res.headers.has("x-powered-by"));
    const csp = res.headers.get("content-security-policy");
    assert.ok(csp?.includes("frame-ancestors 'none'") && !csp.includes("unsafe-eval"));
    assert.equal(res.headers.get("x-content-type-options"), "nosniff");
    assert.equal(res.headers.get("x-frame-options"), "DENY");
    assert.equal(res.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
    assert.ok(res.headers.get("strict-transport-security")?.includes("max-age=31536000"));
    checks++;
  }
  checks += await checkCollectionStyles(origin);
  const home = htmlByRoute.get("/");
  const homeMain = home.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1];
  assert.ok(homeMain, "homepage content is present");
  assert.ok(!homeMain.includes("<blockquote"), "full testimonials live on Reviews");
  for (const clientId of ["tow-n-go", "crestline", "mckenzie-house"]) {
    assert.ok(
      homeMain.includes(`href="/projects/web-builds#${clientId}"`),
      `homepage links to the ${clientId} client project`,
    );
  }
  assert.ok(
    homeMain.includes('href="/projects/social-media-management#tow-n-go-digital"'),
    "homepage exposes Tow-N-Go’s monthly partnership",
  );
  for (const id of ["pigment", "structure", "still"]) {
    const html = htmlByRoute.get(`/website-collection/${id}`);
    assert.ok(html.includes('"@type":"CreativeWork"'), `${id}: design schema`);
    assert.ok(
      (html.includes('id="preview"') && html.includes("Sample layout")) ||
        html.includes("Interactive design concept"),
      `${id}: labelled concept preview`,
    );
    assert.ok(
      html.includes("Quoted after a conversation") && !html.includes("$0"),
      `${id}: unpriced concept is never free`,
    );
    assert.ok(html.includes("No published performance measurements"), `${id}: no invented score`);
    assert.ok(
      html.includes(`href="/website-collection/start?design=${id}"`),
      `${id}: guided enquiry starts with design`,
    );
    assert.ok(
      html.includes('aria-pressed="true"') && html.includes('aria-current="page"'),
      `${id}: initial preview controls are accessible`,
    );
    assert.ok(
      html.includes("Try your business name") && html.includes('maxLength="64"'),
      `${id}: bounded personalization control`,
    );
    const previewPhoto = [...html.matchAll(/<img\b[^>]*>/g)].find(([tag]) =>
      tag.includes(encodeURIComponent("/images/collection/")),
    )?.[0];
    assert.ok(previewPhoto, `${id}: illustrative photo is rendered`);
    const previewSource = previewPhoto.match(/\bsrc="([^"]+)"/)?.[1].replaceAll("&amp;", "&");
    const previewResponse = await fetch(new URL(previewSource, origin));
    assert.equal(previewResponse.status, 200, `${id}: optimized preview photo loads`);
    assert.match(previewResponse.headers.get("content-type") || "", /^image\//);
    await previewResponse.arrayBuffer();
    checks++;
    const response = await fetch(`${origin}/website-collection/start?design=${id}`);
    assert.equal(response.status, 200);
    const journey = await response.text();
    assert.ok(
      journey.includes('aria-current="step"') &&
        journey.includes("What would make this easier for you?"),
      `${id}: clear first step`,
    );
    assert.ok(
      journey.includes('name="message"'),
      `${id}: existing enquiry form is retained across steps`,
    );
    assert.ok(journey.includes("Review &amp; enquire"), `${id}: a review step precedes enquiry`);
    checks++;
  }
  const comparison = await fetch(
    `${origin}/website-collection/compare?design=pigment&design=still&design=pigment&design=private-draft`,
  );
  assert.equal(comparison.status, 200);
  const comparisonHtml = await comparison.text();
  assert.ok(comparisonHtml.includes('class="design-comparison"'));
  assert.ok(!comparisonHtml.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1].includes("private-draft"));
  checks++;
  const unknownDesign = await fetch(`${origin}/website-collection/private-draft`);
  assert.equal(unknownDesign.status, 404, "unknown and draft designs have no detail page");
  checks++;
  const brief = htmlByRoute.get("/website-collection/brief");
  assert.ok(brief.includes("Nothing is submitted or uploaded") && !brief.includes('type="file"'));
  assert.ok(
    brief.includes("Restore saved draft") && brief.includes("I’d like help with this section."),
  );
  const reviews = htmlByRoute.get("/reviews");
  const collection = htmlByRoute.get("/website-collection");
  assert.ok(
    collection.includes('"@type":"CollectionPage"'),
    "collection has descriptive structured data",
  );
  assert.ok(
    collection.includes('class="template-category-list"'),
    "landing page starts with business categories",
  );
  assert.ok(
    !collection.includes('class="collection-design"'),
    "individual template cards live in category galleries",
  );
  const mainNav = collection.match(/<nav[^>]*aria-label="Main navigation"[^>]*>(.*?)<\/nav>/s)?.[1];
  assert.ok(
    mainNav && mainNav.indexOf(">Our Clients</a>") < mainNav.indexOf(">Website Templates</a>"),
    "Our Clients precedes Website Templates",
  );
  for (const id of [
    "construction-trades",
    "health-wellness",
    "legal-professional",
    "home-property",
    "retail-automotive",
    "transport-logistics",
    "food-restaurants",
  ]) {
    assert.ok(
      collection.includes(`href="/website-collection/category/${id}"`),
      `${id}: category is linked`,
    );
    const imagePath = `/images/template-categories/${id}.webp`;
    const categoryImage = [...collection.matchAll(/<img\b[^>]*>/g)].find(([tag]) =>
      tag.includes(encodeURIComponent(imagePath)),
    )?.[0];
    assert.ok(categoryImage, `${id}: category photograph is rendered`);
    assert.ok(
      categoryImage.includes('alt=""') && categoryImage.includes('loading="lazy"'),
      `${id}: decorative photo is lazy loaded`,
    );
    const imageUrl = categoryImage.match(/\bsrc="([^"]+)"/)?.[1].replaceAll("&amp;", "&");
    assert.ok(imageUrl, `${id}: responsive image source is present`);
    const imageResponse = await fetch(new URL(imageUrl, origin));
    assert.equal(imageResponse.status, 200, `${id}: optimized image response`);
    assert.match(imageResponse.headers.get("content-type") || "", /^image\//);
    await imageResponse.arrayBuffer();
    checks++;
    const gallery = htmlByRoute.get(`/website-collection/category/${id}`);
    assert.ok(gallery.includes('"@type":"BreadcrumbList"'), `${id}: category breadcrumbs`);
    if (
      ["legal-professional", "home-property", "retail-automotive", "food-restaurants"].includes(id)
    ) {
      assert.ok(
        gallery.includes("No templates have been added here yet."),
        `${id}: truthful empty state`,
      );
      assert.ok(!gallery.includes('class="collection-design"'), `${id}: no invented templates`);
    }
  }
  const transport = htmlByRoute.get("/website-collection/category/transport-logistics");
  assert.ok(
    transport.includes('id="design-calgary-hot-shot"') &&
      transport.includes('id="design-tow-n-go"') &&
      !transport.includes('id="design-pigment"'),
    "transport gallery shows its live demo and client example",
  );
  for (const [id, name, category, liveUrl, videoSrc] of [
    [
      "tow-n-go",
      "Tow-N-Go Trailers",
      "transport-logistics",
      "https://www.towandgotrailers.ca/",
      "tow-n-go-website",
    ],
    [
      "crestline",
      "Crestline Painting",
      "construction-trades",
      "https://www.crestlinepainting.ca/",
      "crestline-website",
    ],
    [
      "mckenzie-house",
      "McKenzie House Massage",
      "health-wellness",
      "https://mckenziehousemassage.ca/",
      "mckenzie-website",
    ],
  ]) {
    const gallery = htmlByRoute.get(`/website-collection/category/${category}`);
    assert.ok(gallery.includes(`id="design-${id}"`), `${id}: correct gallery`);
    const otherCategory =
      category === "health-wellness" ? "construction-trades" : "health-wellness";
    assert.ok(
      !htmlByRoute
        .get(`/website-collection/category/${otherCategory}`)
        .includes(`id="design-${id}"`),
      `${id}: no unrelated category listing`,
    );
    const card = gallery.match(
      new RegExp(`<article[^>]*id="design-${id}"[^>]*>[\\s\\S]*?</article>`),
    )?.[0];
    assert.ok(card?.includes("Live client example"), `${id}: gallery labels real client work`);
    const imageTag = card?.match(/<img\b[^>]*>/)?.[0];
    assert.ok(
      imageTag?.includes(encodeURIComponent(`/images/projects/${id}.webp`)),
      `${id}: real project image`,
    );
    const imageUrl = imageTag.match(/\bsrc="([^"]+)"/)[1].replaceAll("&amp;", "&");
    const imageResponse = await fetch(new URL(imageUrl, origin));
    assert.equal(imageResponse.status, 200, `${id}: optimized preview loads`);
    assert.match(imageResponse.headers.get("content-type") || "", /^image\//);
    await imageResponse.arrayBuffer();
    checks++;
    const example = htmlByRoute.get(`/website-collection/${id}`);
    assert.ok(
      example.includes("Live client example") && example.includes("Build something like this"),
      `${id}: real-client status and distinct CTA`,
    );
    assert.ok(
      !example.includes("placeholder business details") && !example.includes("Made yours."),
      `${id}: not labelled a placeholder template`,
    );
    assert.ok(
      example.includes(`src="/media/projects/${videoSrc}.mp4"`),
      `${id}: correct canonical walkthrough`,
    );
    for (const href of [`/projects/web-builds#${id}`, liveUrl]) {
      assert.ok(example.includes(`href="${href}"`), `${id}: links to ${href}`);
    }
    const inquiryHref = [...example.matchAll(/href="([^"]+)"/g)]
      .map((match) => match[1].replaceAll("&amp;", "&"))
      .find(
        (href) =>
          href.startsWith("/contact?") && new URL(href, origin).searchParams.get("design") === id,
      );
    assert.ok(inquiryHref, `${id}: selected-design enquiry`);
    const contact = await fetch(origin + inquiryHref);
    assert.equal(contact.status, 200);
    const contactHtml = await contact.text();
    assert.ok(
      contactHtml.includes(`Client example: ${name}`) &&
        contactHtml.includes("my own branding, content and business details"),
      `${id}: own-brand enquiry preserved in the contact page`,
    );
    checks++;
  }
  assert.ok(
    htmlByRoute
      .get("/website-collection/tow-n-go")
      .includes('href="/projects/social-media-management#tow-n-go-digital"'),
    "Tow-N-Go keeps its monthly partnership link",
  );
  const transportComparison = await fetch(
    `${origin}/website-collection/compare?design=tow-n-go&design=calgary-hot-shot`,
  );
  assert.equal(transportComparison.status, 200);
  const transportComparisonHtml = await transportComparison.text();
  assert.ok(
    transportComparisonHtml.includes("Live client example") &&
      transportComparisonHtml.includes("Live design demo") &&
      transportComparisonHtml.includes("Pages scoped to your business"),
    "comparison preserves client/demo status and scoped pages",
  );
  checks++;
  const hotshot = htmlByRoute.get("/website-collection/calgary-hot-shot");
  assert.ok(
    hotshot.includes("Live design demo") && hotshot.includes("placeholder business details"),
    "external concept status remains clear",
  );
  assert.ok(
    hotshot.includes('href="https://calgary-hot-shot-corporate-live.vercel.app/"'),
    "the supplied live demo is reachable from its page",
  );
  assert.ok(
    hotshot.includes('class="live-demo-scroll"') && hotshot.includes('tabindex="0"'),
    "actual page capture is keyboard scrollable",
  );
  const fullCapture = await fetch(`${origin}/images/collection/calgary-hot-shot-full.webp`);
  assert.equal(fullCapture.status, 200, "actual full-page capture loads");
  assert.match(fullCapture.headers.get("content-type") || "", /^image\/webp/);
  await fullCapture.arrayBuffer();
  checks++;
  const legacyRetail = await fetch(`${origin}/website-collection/category/retail-hospitality`, {
    redirect: "manual",
  });
  assert.equal(legacyRetail.status, 308, "old category has a permanent redirect");
  assert.equal(
    new URL(legacyRetail.headers.get("location"), origin).pathname,
    "/website-collection/category/retail-automotive",
  );
  checks++;
  const trades = htmlByRoute.get("/website-collection/category/construction-trades");
  assert.ok(
    trades.includes('id="design-pigment"') &&
      trades.includes('id="design-structure"') &&
      !trades.includes('id="design-still"'),
    "category gallery contains only matching templates",
  );
  assert.ok(
    trades.includes('form="template-shortlist"') && trades.includes('id="template-shortlist"'),
    "template cards can be selected for comparison",
  );
  for (const [id, name] of [
    ["pigment", "Painting Company"],
    ["structure", "Construction &amp; Plumbing"],
    ["still", "Massage Practice"],
  ]) {
    const detail = htmlByRoute.get(`/website-collection/${id}`);
    assert.ok(
      detail.includes(name) && detail.includes("Make this my website"),
      `${id}: plain template name and direct enquiry`,
    );
    const contactHref = [...detail.matchAll(/href="([^\"]+)"/g)]
      .map((match) => match[1].replaceAll("&amp;", "&"))
      .find((href) => href.startsWith("/contact?") && href.includes(`design=${id}`));
    assert.ok(contactHref, `${id}: direct enquiry carries template`);
    const response = await fetch(origin + contactHref);
    assert.equal(response.status, 200);
    const text = await response.text();
    assert.ok(
      text
        .match(/<textarea\b[^>]*name="message"[^>]*>(.*?)<\/textarea>/s)?.[1]
        .includes(`Design: ${name}`),
      `${id}: chosen template reaches contact form`,
    );
    checks++;
  }
  const missingCategory = await fetch(`${origin}/website-collection/category/not-a-category`);
  assert.equal(missingCategory.status, 404, "unknown category returns 404");
  checks++;
  const categoryResponse = await fetch(
    `${origin}/website-collection?industry=painting&tier=signature`,
  );
  assert.equal(categoryResponse.status, 200);
  assert.ok(
    categoryResponse.url.includes("/category/construction-trades?"),
    "old industry links lead to the matching gallery",
  );
  const categoryHtml = await categoryResponse.text();
  assert.ok(
    categoryHtml.includes('<option value="painting" selected="">Painting</option>'),
    "industry filter retains its selection on the server",
  );
  assert.ok(
    categoryHtml.includes('<option value="signature" selected="">Signature</option>'),
    "tier and industry can be selected independently",
  );
  assert.ok(
    categoryHtml.includes('method="get"'),
    "catalogue filters work without client JavaScript",
  );
  const categoryCta = [...categoryHtml.matchAll(/href="([^\"]+)"/g)]
    .map((match) => match[1].replaceAll("&amp;", "&"))
    .find(
      (href) =>
        href.startsWith("/contact?") &&
        href.includes("industry=painting") &&
        href.includes("tier=signature"),
    );
  assert.ok(categoryCta, "industry and tier are retained in an inquiry link");
  const categoryContactResponse = await fetch(origin + categoryCta);
  assert.equal(categoryContactResponse.status, 200);
  const categoryContactHtml = await categoryContactResponse.text();
  const categoryMessage = categoryContactHtml.match(
    /<textarea\b[^>]*name="message"[^>]*>(.*?)<\/textarea>/s,
  )?.[1];
  assert.ok(
    categoryMessage?.includes("Business type: Painting") &&
      categoryMessage.includes("Collection: Signature"),
    "category choice reaches the editable inquiry",
  );
  checks += 2;
  for (const tier of ["essential", "signature", "premier", "flagship"]) {
    assert.ok(collection.includes(`id="collection-${tier}"`), `${tier}: public collection level`);
    const response = await fetch(`${origin}/contact?collection=website&tier=${tier}&care=care`);
    assert.equal(response.status, 200);
    const html = await response.text();
    const textarea = html.match(/<textarea\b[^>]*name="message"[^>]*>(.*?)<\/textarea>/s)?.[1];
    assert.ok(
      textarea?.includes(`Collection: ${tier.charAt(0).toUpperCase() + tier.slice(1)}`),
      `${tier}: selection reaches the editable message`,
    );
    assert.ok(textarea.includes("Website Care"), "monthly choice survives the inquiry link");
    assert.ok(
      /<option[^>]*selected=""[^>]*>Website Design &amp; Development<\/option>/.test(html),
      "existing allowed website service is selected",
    );
    checks++;
  }
  // The homepage entry is in the navigation after its service preview was removed.
  for (const source of ["/services", "/packages"]) {
    const main = htmlByRoute.get(source).match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1];
    assert.ok(
      main?.includes('href="/website-collection"'),
      `${source}: collection is discoverable in page content`,
    );
  }
  assert.ok(
    !homeMain.includes('id="collection-essential"'),
    "complete collection catalogue stays off the homepage",
  );

  for (const match of collection.matchAll(/href="#([^\"]+)"/g)) {
    assert.ok(collection.includes(`id="${match[1]}"`), `collection jump link: ${match[1]}`);
  }
  const invalidSelection = await fetch(
    `${origin}/contact?collection=website&tier=untrusted-tier&design=private-draft&care=untrusted-care`,
  );
  assert.equal(invalidSelection.status, 200);
  const invalidHtml = await invalidSelection.text();
  const invalidMessage = invalidHtml.match(
    /<textarea\b[^>]*name="message"[^>]*>(.*?)<\/textarea>/s,
  )?.[1];
  assert.ok(
    invalidMessage && !/untrusted|private-draft/.test(invalidMessage),
    "untrusted URL selections never enter the message",
  );
  checks++;
  const approvedQuote =
    "Tate has been a joy to work with. I am blown away by his professionalism and care. His communication has made me feel understood and heard each step of the way. Money well spent, especially on a complicated web project—I know it is in good hands with Tate.";
  assert.ok(reviews.includes(approvedQuote), "Heather’s supplied testimonial remains verbatim");
  assert.ok(reviews.includes("Heather Knorr"), "testimonial retains its attribution");
  assert.ok(!reviews.includes("AggregateRating"), "no self-serving aggregate rating schema");
  const approvedChadQuote =
    "I have recently had the pleasure of working with Tate from L&L Tech Solutions and the experience has been nothing short of exceptional. He has worked with our small start-up creating a website that very much aligns with our vision.\n\nHe has been highly professional throughout, completing the work ahead of schedule, maintaining consistent communication, and delivering a quality product.\n\nWe are continuing to work with Tate and are super excited to see what Phase 2 of creating our brand looks like.";
  assert.ok(
    reviews.replaceAll("&amp;", "&").includes(approvedChadQuote),
    "Chad’s supplied review remains complete and verbatim",
  );
  assert.ok(
    reviews.includes("Chad Muxlow") && reviews.includes("Google review"),
    "Chad retains author and source attribution",
  );
  assert.ok(
    !homeMain.replaceAll("&amp;", "&").includes(approvedChadQuote),
    "the full new review stays on its dedicated page",
  );
  for (const [route, expected] of [
    ["/projects/web-builds", 3],
    ["/projects/software-development", 1],
    ["/projects/social-media-management", 2],
  ]) {
    const page = htmlByRoute.get(route);
    assert.equal(
      (page.match(/class="case-implementation"/g) || []).length,
      expected,
      "each project explains its implementation",
    );
  }
  assert.ok(
    htmlByRoute.get("/projects/web-builds").includes("ClinicSense"),
    "booking platform is explained",
  );
  assert.ok(
    htmlByRoute.get("/projects/software-development").includes("Cloudflare R2"),
    "software media architecture is explained",
  );

  const investment = htmlByRoute.get("/packages");
  assert.ok(investment.includes("$399+") && investment.includes("$149+"), "revised entry prices");
  assert.ok(!/\$(?:499|199)/.test(investment), "retired starting prices are removed");
  const investmentMetadata = investment.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(
    investmentMetadata?.includes("$399") && investmentMetadata.includes("$149"),
    "search description agrees with visible pricing",
  );
  for (const [route, html] of htmlByRoute) {
    const logoLinks = [
      ...html.matchAll(/<a\b[^>]*aria-label="L&amp;L Tech Solutions home"[^>]*>/g),
    ];
    assert.equal(logoLinks.length, 2, `${route}: header and footer logo links`);
    for (const link of logoLinks)
      assert.ok(link[0].includes('href="/"'), `${route}: logo goes home`);
    assert.ok(html.includes('href="/reviews"'), `${route}: reviews navigation`);
    for (const social of [
      "https://www.facebook.com/profile.php?id=61557129795810",
      "https://www.tiktok.com/@lltechsolutions",
      "https://youtube.com/@LLTechSolutions/videos",
    ])
      assert.ok(html.includes(`href="${social}"`), `${route}: official social link ${social}`);
  }
  const tabTags = [...home.matchAll(/<button\b[^>]*role="tab"[^>]*>/g)].map((match) => match[0]);
  assert.equal(tabTags.length, 3, "project showcase tabs are present in server HTML");
  for (const tag of tabTags) {
    const id = tag.match(/\bid="([^"]+)"/)?.[1];
    const panel = tag.match(/aria-controls="([^"]+)"/)?.[1];
    assert.ok(
      id && panel && home.includes(`id="${panel}"`) && home.includes(`aria-labelledby="${id}"`),
      "tabs identify their labelled panels",
    );
  }
  assert.equal(
    tabTags.filter((tag) => tag.includes('aria-selected="true"')).length,
    1,
    "one selected project showcase tab",
  );
  const designImages = new Set();
  for (const [source, html] of htmlByRoute) {
    for (const match of html.matchAll(/href="(\/[^"?]*)(?:\?[^"#]*)?"/g)) {
      const href = match[1];
      if (/^\/images\/[^?#]+\.(?:jpe?g|png|webp)$/.test(href)) {
        designImages.add(href);
        continue;
      }
      if (
        href.startsWith("/_next/") ||
        href.startsWith("/brand/") ||
        href.startsWith("/media/") ||
        href.startsWith("/favicon") ||
        href.startsWith("/manifest")
      )
        continue;
      const [pathname, hash] = href.split("#");
      assert.ok(htmlByRoute.has(pathname), `${source}: unrecognized internal link ${href}`);
      if (hash)
        assert.ok(
          htmlByRoute.get(pathname).includes(`id="${hash}"`),
          `${source}: missing anchor ${href}`,
        );
    }
  }
  const webProjects = htmlByRoute.get("/projects/web-builds");
  assert.equal(
    (webProjects.match(/class="design-options"/g) || []).length,
    1,
    "one compact design-options gallery in website case studies",
  );
  assert.ok(!homeMain.includes('class="design-options"'), "gallery stays off the homepage");
  assert.ok(
    webProjects.includes('aria-labelledby="crestline-design-options"'),
    "gallery is labelled as part of the Crestline case study",
  );
  assert.equal(
    designImages.size,
    3,
    "three full-size image links remain usable without JavaScript",
  );
  for (const asset of designImages) {
    const response = await fetch(origin + asset, { method: "HEAD" });
    assert.equal(response.status, 200, `${asset}: image link works`);
    assert.ok(response.headers.get("content-type")?.startsWith("image/"), `${asset}: image MIME`);
    assert.ok(Number(response.headers.get("content-length")) > 0, `${asset}: nonempty image`);
    checks++;
  }
  const mediaAssets = new Set();
  for (const [route, expectedVideos] of [
    ["/projects/web-builds", 3],
    ["/website-collection/tow-n-go", 1],
    ["/website-collection/crestline", 1],
    ["/website-collection/mckenzie-house", 1],
    ["/projects/software-development", 1],
    ["/projects/social-media-management", 2],
  ]) {
    const html = htmlByRoute.get(route);
    const videos = [...html.matchAll(/<video\b[^>]*>[\s\S]*?<\/video>/g)].map((match) => match[0]);
    assert.equal(videos.length, expectedVideos, `${route}: every project has an inline preview`);
    for (const video of videos) {
      assert.ok(
        video.includes('preload="none"') && !/autoplay/i.test(video),
        `${route}: previews wait for visitor playback`,
      );
      assert.ok(
        video.includes('controls=""') && video.includes('playsInline=""'),
        `${route}: native controls and inline playback`,
      );
      assert.ok(video.includes("aria-describedby="), `${route}: equivalent visual description`);
      assert.ok(
        /<track\b[^>]*kind="descriptions"[^>]*src="\/media\/[^\"]+\.vtt"/.test(video),
        `${route}: every preview has a visual-description track`,
      );
    }
    for (const match of html.matchAll(/(?:src|poster)="(\/media\/[^\"]+)"/g))
      mediaAssets.add(match[1]);
  }
  assert.ok(mediaAssets.size >= 18, "six complete previews, with room for optional captions");
  for (const asset of mediaAssets) {
    const response = await fetch(origin + asset, { method: "HEAD" });
    assert.equal(response.status, 200, asset);
    assert.ok(Number(response.headers.get("content-length")) > 0, `${asset}: nonempty`);
    if (asset.endsWith(".mp4")) {
      assert.ok(response.headers.get("content-type")?.includes("video/mp4"), `${asset}: MIME type`);
      const partial = await fetch(origin + asset, { headers: { Range: "bytes=0-31" } });
      assert.equal(partial.status, 206, `${asset}: seeking supported`);
      assert.equal((await partial.arrayBuffer()).byteLength, 32, `${asset}: byte range`);
    }
    checks++;
  }
  for (const [route, status] of [
    ["/projects/infrastructure", 308],
    ["/projects/tech-support", 308],
    ["/this-page-does-not-exist", 404],
  ]) {
    const res = await fetch(origin + route, { redirect: "manual" });
    assert.equal(res.status, status, route);
    checks++;
  }
  for (const route of [
    "/sitemap.xml",
    "/robots.txt",
    "/manifest.webmanifest",
    "/brand/icon.png",
    "/brand/apple-icon.png",
    "/opengraph-image",
    "/_next/image?url=%2Fbrand%2Flogo-mark.webp&w=256&q=75",
  ]) {
    const res = await fetch(origin + route);
    assert.equal(res.status, 200, route);
    if (route === "/sitemap.xml") {
      const sitemap = await res.text();
      for (const path of routes.filter((path) => !privateUtilityRoutes.has(path))) {
        assert.ok(
          sitemap.includes(`<loc>${new URL(path, "https://lltechsolutions.ca").href}</loc>`),
          `sitemap includes ${path}`,
        );
      }
    }
    checks++;
  }
  let client = 0;
  async function post(label, body, headers, status) {
    const res = await fetch(origin + "/api/contact", {
      method: "POST",
      headers: { origin, "x-forwarded-for": `192.0.2.${++client}`, ...headers },
      body,
    });
    assert.equal(res.status, status, label);
    const json = await res.json();
    assert.ok(json.message && json.requestId, label);
    assert.equal(res.headers.get("cache-control"), "no-store");
    assert.ok(res.headers.get("x-robots-tag")?.includes("noindex"), label);
    checks++;
  }
  await post(
    "Cross-origin rejection",
    "{}",
    { "content-type": "application/json", origin: "https://example.com" },
    403,
  );
  await post("Unsupported media", "{}", { "content-type": "text/plain" }, 415);
  await post("Malformed JSON", "{", { "content-type": "application/json" }, 400);
  await post("Oversized body", "x".repeat(17000), { "content-type": "application/json" }, 413);
  await post("Invalid inquiry", "{}", { "content-type": "application/json" }, 400);
  await post(
    "Unconfigured delivery never claims success",
    JSON.stringify({
      name: "Test",
      email: "test@example.com",
      service: "Website Design & Development",
      timeline: "This month",
      message: "Local verification only.",
    }),
    { "content-type": "application/json" },
    503,
  );
  console.log(
    `PASS: ${checks} production HTTP checks, internal links and anchors; no external email sent.`,
  );
} catch (error) {
  console.error(error);
  console.error(serverOutput);
  process.exitCode = 1;
} finally {
  clearTimeout(timeout);
  if (server.exitCode === null && server.signalCode === null) {
    const stopped = once(server, "exit");
    server.kill();
    await stopped;
  }
}
