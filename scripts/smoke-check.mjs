import { spawn } from "node:child_process";
import { once } from "node:events";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { checkCollectionStyles } from "./check-collection-styles.mjs";
import { websiteDesigns } from "../src/data/website-collection.ts";
import { formatPriceCad, templatePrice, templateSale } from "../src/data/template-promotion.ts";
import {
  sourceProducts,
  sourceProduct,
  sourceHref,
  sourceInquiryHref,
} from "../src/data/source-products.ts";

const pricingNow = Date.now();

function assertTemplateActions(html, design, context) {
  const links = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((match) => ({
    href: match[1].match(/\bhref="([^"]+)"/)?.[1],
    attributes: match[1],
    markup: match[2],
    label: match[2]
      .replace(/<[^>]+>/g, "")
      .replaceAll("&amp;", "&")
      .trim(),
  }));
  const managedIndex = links.findIndex(
    (link) =>
      link.href === `/website-collection/${design.id}/purchase` &&
      link.label.startsWith("Personalize & launch"),
  );
  assert.ok(managedIndex >= 0, `${context}: managed launch action`);
  const previewIndex = links.findIndex((link) =>
    /^(?:View live demo|View the design|View template|Explore )/.test(link.label),
  );
  assert.ok(
    previewIndex >= 0 && previewIndex < managedIndex,
    `${context}: live demo or accurate preview precedes personalization`,
  );
  const liveIndex = links.findIndex((link) => link.label.startsWith("View live demo"));
  if (liveIndex >= 0)
    assert.ok(liveIndex < managedIndex, `${context}: live demo is before managed launch`);

  const product = sourceProduct(design.id);
  assert.ok(product, `${context}: every catalogue design offers a source edition`);
  const codeIndex = links.findIndex((link) => link.href === sourceHref(design.id));
  assert.ok(codeIndex > managedIndex, `${context}: code purchase follows managed launch`);
  const code = links[codeIndex];
  assert.match(code.markup, /<span>Purchase<\/span>/, `${context}: literal Purchase action`);
  assert.ok(html.includes("Code only"), `${context}: purchase is identified as code only`);
  assert.ok(code.attributes.includes("template-code-button"), `${context}: outlined code button`);
  assert.ok(
    code.markup.includes(formatPriceCad(product.priceCad)),
    `${context}: lower source price is on the button`,
  );
  assert.ok(
    !links.some((link) => /source-version=/.test(link.href ?? "")),
    `${context}: legacy enquiry is not the purchase action`,
  );
}

function assertComparisonActions(html, context) {
  const cards = [...html.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)];
  assert.ok(cards.length >= 2, `${context}: comparison cards exist`);
  for (const [, card] of cards) {
    const id = card.match(/href="\/website-collection\/([^"/]+)\/purchase"/)?.[1];
    const design = websiteDesigns.find((item) => item.id === id);
    assert.ok(design, `${context}: comparison card links its selected offer`);
    assertTemplateActions(card, design, `${context}: ${id}`);
  }
}

function assertTemplatePrice(html, regularPrice, context) {
  const quote = templatePrice(regularPrice, pricingNow);
  const rendered = [
    ...html.matchAll(
      /(<span\b[^>]*\bdata-template-price="([^"]+)"[^>]*>)([\s\S]*?<span\b[^>]*class="template-price-current"[^>]*>([\s\S]*?)<\/span>)/g,
    ),
  ].filter((match) => Number(match[2]) === regularPrice);
  assert.ok(rendered.length > 0, `${context}: regular price remains available for expiry`);
  for (const [, tag, , markup, current] of rendered) {
    assert.ok(tag.includes(`data-sale-end="${templateSale.endsAt}"`), `${context}: sale end`);
    assert.equal(
      current.replace(/<!--.*?-->/g, "").trim(),
      `From ${formatPriceCad(quote.priceCad)}`,
      `${context}: current price`,
    );
    const regular = markup.match(/<del\b[^>]*>(.*?)<\/del>/s)?.[1];
    assert.equal(
      regular,
      quote.saleActive ? formatPriceCad(regularPrice) : undefined,
      `${context}: regular price is struck through only during the sale`,
    );
  }
}

function assertSaleNotice(html, context) {
  const notice = html.match(/<p\b[^>]*class="template-sale-notice"[^>]*>(.*?)<\/p>/s)?.[1];
  assert.equal(
    Boolean(notice),
    templatePrice(150, pricingNow).saleActive,
    `${context}: sale notice follows the promotion window`,
  );
  if (notice) {
    const text = notice.replace(/<[^>]*>/g, "").replace(/\s+/g, " ");
    assert.ok(text.includes("20% off every template."), `${context}: discount amount`);
    assert.ok(
      text.includes("January 1, 2027 at midnight Alberta time"),
      `${context}: unambiguous sale deadline`,
    );
    assert.ok(
      text.includes("code-only downloads, extras and ongoing plans are separate"),
      `${context}: sale scope`,
    );
  }
}

// The child process has no mail key: this test must never deliver external email.
const env = {
  ...process.env,
  RESEND_API_KEY: "",
  STRIPE_SECRET_KEY: "",
  STRIPE_WEBHOOK_SECRET: "",
  SOURCE_DOWNLOADS_ENABLED: "false",
  MANAGED_TEMPLATE_PURCHASES_ENABLED: "false",
  MANAGED_STRIPE_WEBHOOK_SECRET: "",
  VERCEL_ENV: "production",
  NEXT_TELEMETRY_DISABLED: "1",
};
const screenshotProjectIds = ["tow-n-go", "crestline", "mckenzie-house", "tates-tv"];
const contentProjectIds = ["tow-n-go-digital", "mckenzie-digital-launch"];
const projectIds = [...screenshotProjectIds, ...contentProjectIds];
const categoryProjects = new Map([
  ["web-builds", ["tow-n-go", "crestline", "mckenzie-house"]],
  ["software-development", ["tates-tv"]],
  ["social-media-management", contentProjectIds],
]);
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
    ...sourceProducts.map((product) => sourceHref(product.designId)),
    ...websiteDesigns
      .filter((design) => design.status !== "draft")
      .map((design) => `/website-collection/${design.id}/purchase`),
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
    "/website-collection/earthworks",
    "/website-collection/lawncare",
    "/website-collection/horizon",
    "/website-collection/still",
    "/website-collection/massage-one-page",
    "/website-collection/medical-spa",
    "/website-collection/artsy-nails",
    "/website-collection/hair-salon",
    "/website-collection/hair-one-page",
    "/website-collection/consultant-one-page",
    "/website-collection/bookkeeping",
    "/website-collection/accounting",
    "/website-collection/creative-consultancy",
    "/website-collection/boutique-law",
    "/website-collection/corporate-law",
    "/website-collection/home-cleaning",
    "/website-collection/window-care",
    "/website-collection/home-organizing",
    "/website-collection/interior-studio",
    "/website-collection/property-management",
    "/website-collection/real-estate",
    "/website-collection/courier-one-page",
    "/website-collection/moving-company",
    "/website-collection/auto-transport",
    "/website-collection/equipment-rentals",
    "/website-collection/cold-chain",
    "/website-collection/freight-logistics",
    "/website-collection/mobile-detailing",
    "/website-collection/flower-shop",
    "/website-collection/auto-repair",
    "/website-collection/streetwear-store",
    "/website-collection/wheel-studio",
    "/website-collection/jewellery-atelier",
    "/website-collection/food-truck",
    "/website-collection/neighbourhood-cafe",
    "/website-collection/artisan-bakery",
    "/website-collection/pizzeria",
    "/website-collection/catering-events",
    "/website-collection/fine-dining",

    "/website-collection/start",
    "/website-collection/compare",
    "/website-collection/brief",
    "/projects",
    "/projects/web-builds",
    "/projects/software-development",
    "/projects/social-media-management",
    ...projectIds.map((id) => `/projects/${id}`),
    "/reviews",
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
    ...websiteDesigns
      .filter((design) => design.status !== "draft")
      .map((design) => `/website-collection/${design.id}/purchase`),
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
    for (const label of ["Main navigation", "Mobile navigation"]) {
      const nav = html.match(
        new RegExp(`<nav[^>]*aria-label="${label}"[^>]*>([\\s\\S]*?)</nav>`),
      )?.[1];
      assert.ok(
        nav && !nav.includes('href="/"'),
        `${route}: ${label} leaves home navigation to the logo`,
      );
      const mainLinks = [...nav.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([^<]+)<\/a>/g)]
        .map((match) => [match[1], match[2]])
        .filter(([href]) => href.startsWith("/"));
      assert.deepEqual(
        mainLinks,
        [
          ["/website-collection", "Website Templates"],
          ["/services", "Services"],
          ["/projects", "Our Clients"],
          ["/packages", "Pricing"],
          ["/reviews", "Reviews"],
          ["/contact", "Contact"],
        ],
        `${route}: ${label} follows the approved six-item order`,
      );
    }
    assert.match(
      html,
      /<a[^>]*aria-label="L&amp;L Tech Solutions home"[^>]*href="\/"|<a[^>]*href="\/"[^>]*aria-label="L&amp;L Tech Solutions home"/,
      `${route}: logo still links home`,
    );
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
  for (const [route, html] of htmlByRoute) {
    if (!route.startsWith("/website-collection/category/")) continue;
    const cards = [
      ...html.matchAll(/<article\b[^>]*class="collection-design"[^>]*>([\s\S]*?)<\/article>/g),
    ];
    for (const [, card] of cards) {
      const id = card.match(/href="\/website-collection\/([^"/]+)\/purchase"/)?.[1];
      const design = websiteDesigns.find((item) => item.id === id);
      assert.ok(design, `${route}: category card links its selected offer`);
      assertTemplateActions(card, design, `${route}: ${id}`);
    }
  }
  const home = htmlByRoute.get("/");
  const homeMain = home.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1];
  assert.ok(homeMain, "homepage content is present");
  assert.ok(!homeMain.includes("<blockquote"), "full testimonials live on Reviews");
  for (const clientId of ["tow-n-go", "crestline", "mckenzie-house"]) {
    assert.ok(
      homeMain.includes(`href="/projects/${clientId}"`),
      `homepage links to the ${clientId} client project`,
    );
  }
  assert.ok(
    homeMain.includes('href="/projects/tow-n-go-digital"'),
    "homepage exposes Tow-N-Go’s monthly partnership",
  );
  assert.ok(
    homeMain.includes('href="#home-work"') && homeMain.includes('id="home-work"'),
    "hero action leads to the project gallery on the same page",
  );
  const pathways = homeMain.match(
    /<nav\b[^>]*aria-label="Find your next step"[^>]*>(.*?)<\/nav>/s,
  )?.[1];
  assert.ok(pathways, "homepage offers a labelled choice of next steps");
  assert.deepEqual(
    [...pathways.matchAll(/href="([^"]+)"/g)].map((match) => match[1]),
    ["/website-collection", "/services", "/projects"],
    "homepage guides visitors to templates, services and client work",
  );
  const heroArtwork = homeMain.match(/class="studio-artboard"[^>]*>(.*?)<\/section>/s)?.[1];
  assert.ok(heroArtwork, "real project artwork appears in the opening section");
  assert.ok(
    heroArtwork.includes('href="/projects/tow-n-go"') &&
      heroArtwork.includes('href="/projects/tow-n-go-digital"'),
    "opening website and content previews lead to their matching case studies",
  );
  assert.ok(!homeMain.includes("<video"), "homepage has no automatic video download or playback");
  assert.ok(
    !/role="(?:tab|tablist|tabpanel)"/.test(homeMain),
    "homepage shows projects directly without the retired carousel",
  );
  const homeCards = [
    ...homeMain.matchAll(/<article\b[^>]*class="home-work-card"[^>]*>(.*?)<\/article>/gs),
  ].map((match) => match[1]);
  assert.equal(homeCards.length, 4, "homepage presents four project cards");
  for (const [id, ownership] of [
    ["tow-n-go", "Client website"],
    ["crestline", "Client website"],
    ["mckenzie-house", "Client website"],
    ["tates-tv", "L&amp;L software"],
  ]) {
    const matchingCards = homeCards.filter((card) => card.includes(`href="/projects/${id}"`));
    assert.equal(matchingCards.length, 1, `${id}: one homepage project card`);
    const card = matchingCards[0];
    assert.ok(
      card.includes(`aria-labelledby="home-project-${id}"`) &&
        card.includes(`id="home-project-${id}"`),
      `${id}: project link has its visible title as an accessible name`,
    );
    assert.ok(card.includes(ownership), `${id}: correct client or studio ownership`);
    assert.match(card, /<img\b[^>]*alt="[^"]+"/, `${id}: project image has descriptive text`);
  }
  const projectDirectory = htmlByRoute.get("/projects");
  const directoryMain = projectDirectory.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1];
  const directoryCards = [
    ...directoryMain.matchAll(/<article\b[^>]*class="project-preview"[^>]*>(.*?)<\/article>/gs),
  ].map((match) => match[1]);
  assert.equal(directoryCards.length, 4, "Our Clients presents four screenshot-led project cards");
  for (const id of screenshotProjectIds) {
    const cards = directoryCards.filter((card) => card.includes(`href="/projects/${id}"`));
    assert.equal(cards.length, 1, `${id}: one directory card opens its standalone case study`);
    assert.match(cards[0], /<img\b[^>]*alt="[^"]+"/, `${id}: directory preview has image text`);
  }
  const directoryPartnerships = [
    ...directoryMain.matchAll(/<article\b[^>]*class="client-partnership"[^>]*>(.*?)<\/article>/gs),
  ].map((match) => match[1]);
  assert.equal(
    directoryPartnerships.length,
    2,
    "Our Clients retains two compact content partnerships",
  );
  for (const id of contentProjectIds) {
    assert.equal(
      directoryPartnerships.filter((row) => row.includes(`href="/projects/${id}"`)).length,
      1,
      `${id}: content partnership opens its standalone case study`,
    );
  }
  for (const [category, ids] of categoryProjects) {
    const page = htmlByRoute.get(`/projects/${category}`);
    const main = page.match(/<main\b[^>]*>(.*?)<\/main>/s)?.[1];
    const cardClass =
      category === "social-media-management" ? "client-partnership" : "project-preview";
    const cards = [...main.matchAll(/<article\b([^>]*)>([\s\S]*?)<\/article>/g)].filter(
      ([, attributes]) => attributes.includes(`class="${cardClass}"`),
    );
    assert.equal(cards.length, ids.length, `${category}: compact project index count`);
    for (const id of ids) {
      const card = cards.find(([, attributes]) => attributes.includes(`id="${id}"`));
      assert.ok(card, `${category}: preserves the public #${id} bookmark`);
      assert.ok(card[2].includes(`href="/projects/${id}"`), `${id}: index card opens its own page`);
    }
  }
  for (const route of [
    "/projects",
    ...[...categoryProjects.keys()].map((id) => `/projects/${id}`),
  ]) {
    const page = htmlByRoute.get(route);
    assert.ok(page.includes("client-directory"), `${route}: shared client showcase layout`);
    assert.ok(!/<video\b/.test(page), `${route}: index has no embedded video`);
    assert.ok(
      !/class="[^"]*\b(?:case-body|case-implementation|client-case-story|client-case-specifications)\b/.test(
        page,
      ),
      `${route}: complete case-study content stays on individual project pages`,
    );
    assert.ok(
      !page.includes("Watch the project preview"),
      `${route}: screenshot card has accurate action wording`,
    );
  }
  const projectDescriptions = new Set();
  const projectScreenshotAssets = new Set();
  for (const id of projectIds) {
    const page = htmlByRoute.get(`/projects/${id}`);
    assert.match(page, /class="[^"]*\bcase-page\b/, `${id}: standalone case-study layout`);
    const description = page.match(/name="description" content="([^"]+)"/)?.[1];
    assert.ok(
      description && !projectDescriptions.has(description),
      `${id}: case study has a unique search description`,
    );
    projectDescriptions.add(description);
    if (!screenshotProjectIds.includes(id)) continue;
    assert.ok(!/<video\b/.test(page), `${id}: website/software case study has no video player`);
    assert.ok(page.includes('class="template-screenshots"'), `${id}: shared screenshot gallery`);
    assert.match(page, /<img\b[^>]*alt="[^"]+"/, `${id}: descriptive screenshot text`);
    const choices = page.match(/class="template-screenshot-choices"[^>]*>(.*?)<\/div>/s)?.[1];
    assert.ok(choices, `${id}: gallery includes screenshot choices`);
    const buttons = [...choices.matchAll(/<button\b[^>]*>/g)];
    assert.ok(buttons.length >= 2, `${id}: at least two screenshot choices`);
    for (const [button] of buttons) {
      assert.ok(
        button.includes('type="button"') && /aria-pressed="(?:true|false)"/.test(button),
        `${id}: screenshot choices use accessible native buttons`,
      );
    }
    const screenshotPaths = new Set(
      [...choices.matchAll(/<img\b[^>]*src="([^"]+)"/g)].map(([, src]) => {
        const url = new URL(src.replaceAll("&amp;", "&"), origin);
        return url.searchParams.get("url") ?? url.pathname;
      }),
    );
    assert.ok(
      screenshotPaths.size >= 2,
      `${id}: gallery has at least two distinct screenshot assets`,
    );
    for (const path of screenshotPaths) {
      assert.match(
        path,
        /^\/images\/.+\.(?:webp|png|jpe?g)$/,
        `${id}: gallery uses screenshot imagery`,
      );
      projectScreenshotAssets.add(path);
    }
    assert.ok(
      [...screenshotPaths].some((path) => page.includes(`href="${path}"`)),
      `${id}: full-size screenshot opens without JavaScript`,
    );
  }
  const painting = htmlByRoute.get("/website-collection/pigment");
  assertTemplatePrice(painting, 399, "painting: agreed starting price");
  for (const [id, configName] of [
    ["pigment", "painting"],
    ["structure", "plumbing"],
    ["earthworks", "earthworks"],
    ["lawncare", "lawncare"],
    ["horizon", "horizon"],
    ["still", "beauty"],
    ["massage-one-page", "massage-one-page"],
    ["medical-spa", "medical-spa"],
    ["artsy-nails", "artsy-nail"],
    ["hair-salon", "hair-salon"],
    ["hair-one-page", "hair-one-page"],
    ["consultant-one-page", "consultant-one-page"],
    ["bookkeeping", "bookkeeping"],
    ["accounting", "accounting"],
    ["creative-consultancy", "creative-consultancy"],
    ["boutique-law", "boutique-law"],
    ["corporate-law", "corporate-law"],
  ]) {
    const detail = htmlByRoute.get(`/website-collection/${id}`);
    const media = JSON.parse(
      await readFile(new URL(`../src/data/${configName}-demo.json`, import.meta.url), "utf8"),
    );
    assert.ok(detail.includes("template-detail-header"), `${id}: compact shared detail header`);
    assert.ok(detail.includes('id="preview"'), `${id}: visual showcase remains available`);
    assert.ok(
      !detail.includes("Try this design here") && !detail.includes("template-preview-dialog"),
      `${id}: duplicate interactive modal removed`,
    );
    assert.ok(
      !detail.includes("Try your business name"),
      `${id}: personalization belongs in the live demo`,
    );
    assert.ok(
      detail.includes("Additional work is quoted separately"),
      `${id}: extra customization is separately scoped`,
    );
    if (media.url) {
      assert.ok(detail.includes(`href="${media.url}"`), `${id}: configured public live demo`);
      assert.equal(
        (detail.match(/>View live demo(?:<!-- -->)? /g) || []).length,
        1,
        `${id}: one live demo action`,
      );
    } else {
      assert.ok(
        !detail.includes("View live demo"),
        `${id}: no invented demo link before deployment`,
      );
    }
    if (media.screenshots.length) {
      assert.ok(detail.includes("template-screenshot-main"), `${id}: uploaded screenshot gallery`);
      assert.ok(
        detail.replaceAll("&amp;", "&").includes(media.screenshots[0].caption),
        `${id}: first screenshot caption`,
      );
      for (const screenshot of media.screenshots) {
        assert.ok(
          detail.includes(encodeURIComponent(screenshot.src)),
          `${id}: screenshot is available in the gallery`,
        );
        const response = await fetch(new URL(screenshot.src, origin), { method: "HEAD" });
        assert.equal(response.status, 200, `${screenshot.src}: screenshot response`);
        assert.ok(response.headers.get("content-type")?.startsWith("image/"));
        checks++;
      }
    } else {
      assert.ok(
        detail.includes("template-design-overview"),
        `${id}: honest design cover until screenshots uploaded`,
      );
    }
  }
  const paintingGallery = htmlByRoute.get("/website-collection/category/construction-trades");
  const wellness = htmlByRoute.get("/website-collection/mckenzie-house");
  assert.ok(wellness.includes("McKenzie House Massage"), "McKenzie: real client identity");
  assertTemplatePrice(wellness, 399, "McKenzie: approved template starting price");
  assert.ok(
    !wellness.includes("From $1,000 CAD"),
    "McKenzie: original bundled fee is not a template price",
  );
  assert.ok(
    wellness.includes("on-site photography, videography, editing"),
    "McKenzie: original production scope is clear",
  );
  assert.ok(
    wellness.includes("Approx. $1,000 CAD") && wellness.includes("Original combined project"),
    "McKenzie: original combined project cost is explained separately",
  );
  assert.ok(!/<video\b/.test(wellness), "McKenzie: template page has no video player");
  assert.ok(
    wellness.includes("template-client-image") &&
      wellness.includes(encodeURIComponent("/images/projects/mckenzie-house.webp")),
    "McKenzie: template preview uses the matching real website image",
  );
  const productionService = "Photo / Video / Short-Form Content";
  const productionHref = `/contact?service=${encodeURIComponent(productionService)}`;
  assert.ok(
    htmlByRoute.get("/services").includes(`href="${productionHref}"`),
    "Services: photography and videography enquiry uses the existing contact option",
  );
  assert.ok(
    htmlByRoute.get("/packages").includes("Approx. $1,000 CAD") &&
      htmlByRoute.get("/packages").includes('href="/services#photography-videography"'),
    "Pricing: combined project example and optional production services are visible",
  );
  const productionContact = await fetch(origin + productionHref);
  assert.equal(productionContact.status, 200);
  const productionContactHtml = await productionContact.text();
  const selectedService = [
    ...productionContactHtml.matchAll(/<option\b([^>]*)>([^<]*)<\/option>/g),
  ].find(([, , label]) => label === productionService);
  assert.ok(
    selectedService?.[1].includes("selected="),
    "Photo/video enquiry preselects its service",
  );
  checks++;
  assert.ok(
    wellness.includes("New photography, video production and ongoing care are priced separately"),
    "McKenzie: optional production and care are separately priced",
  );
  assert.ok(
    wellness.includes('href="/projects/mckenzie-house"'),
    "McKenzie: client story remains accessible",
  );
  assert.ok(
    !wellness.includes("ll-wellness-template.vercel.app") &&
      !wellness.includes("Evergreen Wellness"),
    "McKenzie: archived generic demo is not offered",
  );
  for (const id of projectIds) {
    const page = htmlByRoute.get(`/projects/${id}`);
    const websiteLinks = [
      ...page.matchAll(
        /<a\b[^>]*href="https:\/\/(?:www\.)?(?:towandgotrailers\.ca|crestlinepainting\.ca|mckenziehousemassage\.ca|tatestv\.ca)\/"[^>]*>([\s\S]*?)<\/a>/g,
      ),
    ];
    assert.equal(websiteLinks.length, 1, `${id}: one live website action`);
    for (const [, label] of websiteLinks)
      assert.ok(label.startsWith("View live site"), `${id}: accurate live-site wording`);
    assert.ok(!page.includes("View live demo"), `${id}: case study uses live-site wording`);
  }
  for (const id of ["tow-n-go", "crestline", "calgary-hot-shot"])
    assert.match(
      htmlByRoute.get(`/website-collection/${id}`),
      />View live demo(?:<!-- -->)? /,
      `${id}: consistent external demo wording`,
    );
  assert.match(
    paintingGallery,
    /<h3><a href="\/website-collection\/pigment">Painting Company<\/a><\/h3>/,
    "painting: title opens its detail page",
  );
  assert.match(
    paintingGallery,
    /id="design-pigment"[\s\S]*?class="design-cover paint-cover"/,
    "painting: matching gallery cover",
  );
  const propertyGallery = htmlByRoute.get("/website-collection/category/home-property");
  assert.ok(
    propertyGallery.includes('id="design-earthworks"'),
    "earthworks: landscaping is discoverable under Home & Property too",
  );
  assert.ok(
    !propertyGallery.includes('content="noindex, follow"'),
    "populated property category is indexable",
  );
  checks++;
  for (const id of [
    "pigment",
    "structure",
    "earthworks",
    "lawncare",
    "horizon",
    "still",
    "massage-one-page",
    "medical-spa",
    "artsy-nails",
    "hair-salon",
    "hair-one-page",
  ]) {
    const html = htmlByRoute.get(`/website-collection/${id}`);
    assert.ok(html.includes('"@type":"CreativeWork"'), `${id}: design schema`);
    assert.ok(
      (html.includes('id="preview"') &&
        (html.includes("Sample layout") ||
          html.includes("Available design") ||
          html.includes("Independent design concept"))) ||
        html.includes("Interactive design concept"),
      `${id}: labelled concept preview`,
    );
    assert.ok(
      /From \$[1-9][0-9,]*(?:\.\d{2})? CAD/.test(html) && !html.includes("$0"),
      `${id}: scoped starting price is displayed`,
    );
    assert.ok(html.includes("No published performance measurements"), `${id}: no invented score`);
    assert.ok(
      html.includes(`href="/website-collection/start?design=${id}"`),
      `${id}: guided enquiry starts with design`,
    );
    const previewPhoto = [...html.matchAll(/<img\b[^>]*>/g)].find(([tag]) =>
      tag.includes(encodeURIComponent("/images/collection/")),
    )?.[0];
    assert.ok(previewPhoto, `${id}: design image is rendered`);
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
    assertTemplatePrice(
      journey,
      Number(html.match(/data-template-price="([^"]+)"/)?.[1]),
      `${id}: guided enquiry price agrees with its detail page`,
    );
    checks++;
  }
  const comparison = await fetch(
    `${origin}/website-collection/compare?design=pigment&design=still&design=pigment&design=private-draft`,
  );
  assert.equal(comparison.status, 200);
  const comparisonHtml = await comparison.text();
  assertComparisonActions(comparisonHtml, "template comparison");
  assert.ok(comparisonHtml.includes('class="design-comparison"'));
  assertTemplatePrice(comparisonHtml, 399, "comparison: painting price");
  assertTemplatePrice(comparisonHtml, 299, "comparison: nail studio price");
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
  assertSaleNotice(collection, "template landing page");
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
  const introMatch = collection.match(
    /<section\b[^>]*class="(?:[^"]*\s)?collection-intro(?:\s[^"]*)?"[^>]*>([\s\S]*?)<\/section>/,
  );
  const intro = introMatch?.[1];
  assert.ok(intro, "collection opens with a compact introduction");
  assert.equal(
    intro
      .match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1]
      .replace(/<[^>]*>/g, "")
      .trim(),
    "A design you love. The details, handled.",
    "collection retains the approved headline",
  );
  assert.ok(
    intro.includes(
      "Start with a design that feels right for your business. We tailor the code, bring your brand into it, and handle the launch.",
    ) && intro.includes("Custom-coded. Personally handled."),
    "collection retains its introduction and personal service note",
  );
  assert.ok(
    !collection.includes("collection-showcase") &&
      !collection.includes('name="collection-preview"'),
    "landing page does not restore the removed client preview selector",
  );
  const categorySection = collection.match(
    /<section\b[^>]*id="designs"[^>]*>([\s\S]*?)<\/section>/,
  )?.[1];
  assert.ok(
    categorySection?.includes("Browse by business type") &&
      !categorySection.includes('href="#how-it-works"'),
    "business browsing has no link to the removed process section",
  );
  assert.ok(
    introMatch.index < collection.indexOf('id="designs"'),
    "business categories follow the centred introduction",
  );
  const collectionMain = collection.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(collectionMain, "collection page has its main landmark");
  assert.ok(
    !/id="(?:how-it-works|collections|included|ongoing-care|questions)"/.test(collectionMain) &&
      !/class="[^"]*\bcollection-(?:roadmap|contact-options|customization|developer|questions|end)\b/.test(
        collectionMain,
      ),
    "collection landing remains focused on the introduction and category cards",
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
      categoryImage.includes('alt=""') &&
        categoryImage.includes(id === "construction-trades" ? 'loading="eager"' : 'loading="lazy"'),
      `${id}: decorative photo uses the appropriate loading priority`,
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
  }
  const templatePrices = [
    ["mobile-detailing", "retail-automotive", 150],
    ["flower-shop", "retail-automotive", 299],
    ["auto-repair", "retail-automotive", 399],
    ["streetwear-store", "retail-automotive", 499],
    ["wheel-studio", "retail-automotive", 499],
    ["jewellery-atelier", "retail-automotive", 600],
    ["food-truck", "food-restaurants", 150],
    ["neighbourhood-cafe", "food-restaurants", 299],
    ["artisan-bakery", "food-restaurants", 399],
    ["pizzeria", "food-restaurants", 499],
    ["catering-events", "food-restaurants", 499],
    ["fine-dining", "food-restaurants", 600],

    ["calgary-hot-shot", "transport-logistics", 299],
    ["courier-one-page", "transport-logistics", 150],
    ["moving-company", "transport-logistics", 299],
    ["auto-transport", "transport-logistics", 399],
    ["equipment-rentals", "transport-logistics", 499],
    ["cold-chain", "transport-logistics", 499],
    ["freight-logistics", "transport-logistics", 600],
    ["home-cleaning", "home-property", 150],
    ["window-care", "home-property", 299],
    ["home-organizing", "home-property", 399],
    ["interior-studio", "home-property", 499],
    ["property-management", "home-property", 499],
    ["real-estate", "home-property", 600],
    ["consultant-one-page", "legal-professional", 150],
    ["bookkeeping", "legal-professional", 299],
    ["accounting", "legal-professional", 399],
    ["creative-consultancy", "legal-professional", 499],
    ["boutique-law", "legal-professional", 499],
    ["corporate-law", "legal-professional", 600],

    ["massage-one-page", "health-wellness", 150],
    ["hair-one-page", "health-wellness", 150],
    ["still", "health-wellness", 299],
    ["hair-salon", "health-wellness", 399],
    ["artsy-nails", "health-wellness", 499],
    ["medical-spa", "health-wellness", 600],
    ["horizon", "construction-trades", 399],
    ["lawncare", "construction-trades", 399],
    ["pigment", "construction-trades", 399],
    ["structure", "construction-trades", 499],
    ["earthworks", "construction-trades", 600],
    ["crestline", "construction-trades", 299],
    ["tow-n-go", "transport-logistics", 549],
    ["mckenzie-house", "health-wellness", 399],
  ];
  for (const [id, category, price] of templatePrices) {
    assert.ok(
      Number.isInteger(price) && price >= 150 && price <= 600,
      `${id}: public starting price stays within the approved range`,
    );
    const quote = templatePrice(price, pricingNow);
    const label = `From ${formatPriceCad(quote.priceCad)}`;
    const detail = htmlByRoute.get(`/website-collection/${id}`);
    assertTemplatePrice(detail, price, `${id}: detail price`);
    assert.ok(detail.includes("Before applicable taxes."), `${id}: tax basis`);
    assert.ok(detail.includes("collection-contact-options"), `${id}: contact scope is explained`);
    assert.ok(
      detail.includes("$150–$399 CAD") && detail.includes("$499–$600 CAD"),
      `${id}: contact-scope summary uses the approved price ranges`,
    );
    const gallery = htmlByRoute.get(`/website-collection/category/${category}`);
    const card = gallery.match(
      new RegExp(`<article[^>]*id="design-${id}"[^>]*>[\\s\\S]*?</article>`),
    )?.[0];
    assert.ok(card, `${id}: gallery card exists`);
    assertTemplatePrice(card, price, `${id}: matching gallery price`);
    const contact = await fetch(`${origin}/contact?collection=website&design=${id}&price=1`);
    assert.equal(contact.status, 200);
    const contactHtml = await contact.text();
    assert.ok(contactHtml.includes(`Launch pricing: ${label}`), `${id}: canonical enquiry price`);
    if (quote.saleActive) {
      assert.ok(
        contactHtml.includes(`Regular starting price: ${formatPriceCad(price)}`) &&
          contactHtml.includes(`Offer ends ${templateSale.endsLabel}`),
        `${id}: enquiry states the regular price and exact sale deadline`,
      );
    } else {
      assert.ok(!contactHtml.includes("20% template sale"), `${id}: expired sale is absent`);
    }
    assert.ok(!contactHtml.includes("From $1 CAD"), `${id}: URL cannot change the price`);
    checks++;
  }
  assert.equal(
    (propertyGallery.match(/data-home-property-cover=/g) ?? []).length,
    6,
    "six distinct Home & Property covers",
  );
  for (const [industry, id] of [
    ["cleaning", "home-cleaning"],
    ["window-cleaning", "window-care"],
    ["home-organizing", "home-organizing"],
    ["interior-design", "interior-studio"],
    ["property-management", "property-management"],
    ["real-estate", "real-estate"],
  ]) {
    const response = await fetch(
      `${origin}/website-collection/category/home-property?industry=${industry}`,
    );
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.deepEqual(
      [...html.matchAll(/<article[^>]*id="design-([^"]+)"/g)].map((match) => match[1]),
      [id],
      `${industry}: correct property offer`,
    );
    checks++;
  }
  const retailGallery = htmlByRoute.get("/website-collection/category/retail-automotive");
  assert.equal(
    (retailGallery.match(/data-retail-cover=/g) ?? []).length,
    6,
    "six distinct retail previews",
  );
  assert.ok(!retailGallery.includes('content="noindex'), "populated retail gallery is indexable");
  for (const id of [
    "mobile-detailing",
    "flower-shop",
    "auto-repair",
    "streetwear-store",
    "wheel-studio",
    "jewellery-atelier",
  ]) {
    const response = await fetch(
      `${origin}/website-collection/category/retail-automotive?industry=${id}`,
    );
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.deepEqual(
      [...html.matchAll(/<article[^>]*id="design-([^"]+)"/g)].map((match) => match[1]),
      [id],
      `${id}: exact retail industry filter`,
    );
    checks++;
  }
  const foodGallery = htmlByRoute.get("/website-collection/category/food-restaurants");
  assert.equal(
    (foodGallery.match(/data-food-cover=/g) ?? []).length,
    6,
    "six distinct food previews",
  );
  assert.ok(!foodGallery.includes('content="noindex'), "populated food gallery is indexable");
  for (const id of [
    "food-truck",
    "neighbourhood-cafe",
    "artisan-bakery",
    "pizzeria",
    "catering-events",
    "fine-dining",
  ]) {
    const response = await fetch(
      `${origin}/website-collection/category/food-restaurants?industry=${id}`,
    );
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.deepEqual(
      [...html.matchAll(/<article[^>]*id="design-([^"]+)"/g)].map((match) => match[1]),
      [id],
      `${id}: exact food industry filter`,
    );
    checks++;
  }
  const legalGallery = htmlByRoute.get("/website-collection/category/legal-professional");
  const transportGallery = htmlByRoute.get("/website-collection/category/transport-logistics");
  assert.equal(
    (transportGallery.match(/data-transport-cover=/g) ?? []).length,
    6,
    "six distinct transport previews",
  );
  for (const [industry, id] of [
    ["courier", "courier-one-page"],
    ["moving", "moving-company"],
    ["vehicle-transport", "auto-transport"],
    ["equipment-rentals", "equipment-rentals"],
    ["cold-chain", "cold-chain"],
    ["freight", "freight-logistics"],
  ]) {
    const response = await fetch(
      `${origin}/website-collection/category/transport-logistics?industry=${industry}`,
    );
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.deepEqual(
      [...html.matchAll(/<article[^>]*id="design-([^"]+)"/g)].map((match) => match[1]),
      [id],
      `${industry}: correct transport offer`,
    );
    checks++;
  }
  assert.equal(
    (legalGallery.match(/data-professional-cover=/g) ?? []).length,
    6,
    "six visual professional templates",
  );
  assert.ok(
    !legalGallery.includes('content="noindex'),
    "populated professional gallery is indexable",
  );
  for (const [industry, expected] of [
    ["legal", ["boutique-law", "corporate-law"]],
    ["bookkeeping", ["bookkeeping"]],
    ["accounting", ["accounting"]],
    ["professional-services", ["consultant-one-page", "creative-consultancy"]],
  ]) {
    const res = await fetch(
      `${origin}/website-collection/category/legal-professional?industry=${industry}`,
    );
    assert.equal(res.status, 200);
    const html = await res.text();
    assert.deepEqual(
      [...html.matchAll(/<article[^>]*id="design-([^"]+)"/g)].map((match) => match[1]),
      expected,
      `${industry}: relevant professional templates`,
    );
    checks++;
  }
  const wellnessGallery = htmlByRoute.get("/website-collection/category/health-wellness");
  for (const [id, cover, pages, contactMode] of [
    ["medical-spa", "medical-spa-cover", 6, "enquiry-form"],
    ["artsy-nails", "artsy-nail-cover", 4, "enquiry-form"],
    ["hair-salon", "hair-cover", 4, "direct"],
    ["hair-one-page", "hair-one-cover", 1, "direct"],
  ]) {
    const detail = htmlByRoute.get(`/website-collection/${id}`);
    const name = detail.match(/<h1\b[^>]*>(.*?)<\/h1>/s)?.[1];
    assert.ok(name, `${id}: visible template name`);
    assert.ok(detail.includes("Personalize &amp; launch"), `${id}: managed enquiry action`);
    assert.ok(
      detail.includes(`${pages} ${pages === 1 ? "page structure" : "page structures"}`),
      `${id}: exact page scope`,
    );
    const scope =
      contactMode === "direct" ? "Direct contact included" : "Protected enquiry form included";
    assert.ok(detail.includes(scope), `${id}: agreed contact scope`);
    assert.ok(
      !detail.includes("Live client example"),
      `${id}: demonstration is not a client project`,
    );
    const card = wellnessGallery.match(
      new RegExp(`<article[^>]*id="design-${id}"[^>]*>[\\s\\S]*?</article>`),
    )?.[0];
    assert.ok(card?.includes(cover), `${id}: matching Health & Wellness cover`);
    assert.ok(
      !paintingGallery.includes(`id="design-${id}"`) &&
        !propertyGallery.includes(`id="design-${id}"`),
      `${id}: no unrelated gallery placement`,
    );
    const contactHref = [...detail.matchAll(/href="([^\"]+)"/g)]
      .map((match) => match[1].replaceAll("&amp;", "&"))
      .find(
        (href) =>
          href.startsWith("/contact?") && new URL(href, origin).searchParams.get("design") === id,
      );
    assert.ok(contactHref, `${id}: enquiry keeps the selected design`);
    const tampered = new URL(contactHref, origin);
    tampered.searchParams.set("contactMode", contactMode === "direct" ? "enquiry-form" : "direct");
    tampered.searchParams.set("industry", "forged-industry");
    const response = await fetch(tampered);
    assert.equal(response.status, 200);
    const contact = await response.text();
    const message = contact.match(/<textarea\b[^>]*name="message"[^>]*>(.*?)<\/textarea>/s)?.[1];
    assert.ok(
      message?.includes(`Design: ${name}`),
      `${id}: chosen name reaches the editable enquiry`,
    );
    assert.ok(
      message.includes(scope) && !message.includes("forged-industry"),
      `${id}: query cannot change the agreed contact scope or industry`,
    );
    checks++;
  }
  for (const [industry, expected] of [
    ["medical-spa", ["medical-spa"]],
    ["hair-salon", ["hair-one-page", "hair-salon"]],
    ["beauty", ["still", "artsy-nails"]],
  ]) {
    const response = await fetch(
      `${origin}/website-collection/category/health-wellness?industry=${industry}`,
    );
    assert.equal(response.status, 200);
    const gallery = await response.text();
    assert.deepEqual(
      [...gallery.matchAll(/<article[^>]*id="design-([^"]+)"/g)].map((match) => match[1]),
      expected,
      `${industry}: relevant Health & Wellness designs`,
    );
    checks++;
  }
  for (const category of [
    "construction-trades",
    "health-wellness",
    "transport-logistics",
    "legal-professional",
  ]) {
    const path = `/website-collection/category/${category}`;
    const expected = templatePrices
      .filter(([, id]) => id === category)
      .sort((a, b) => (a[2] === null ? (b[2] === null ? 0 : 1) : b[2] === null ? -1 : a[2] - b[2]))
      .map(([id]) => id);
    const ids = (html) =>
      [...html.matchAll(/<article[^>]*id="design-([^"]+)"/g)].map((match) => match[1]);
    const defaultGallery = htmlByRoute.get(path);
    assert.deepEqual(ids(defaultGallery), expected, `${category}: default ascending order`);
    assert.match(defaultGallery, /<select[^>]*name="sort"/, `${category}: visible sort control`);
    for (const [sort, order] of [
      ["price-low", expected],
      [
        "price-high",
        templatePrices
          .filter(([, id]) => id === category)
          .sort((a, b) =>
            a[2] === null ? (b[2] === null ? 0 : 1) : b[2] === null ? -1 : b[2] - a[2],
          )
          .map(([id]) => id),
      ],
    ]) {
      const response = await fetch(`${origin}${path}?sort=${sort}`);
      assert.equal(response.status, 200);
      const html = await response.text();
      assert.deepEqual(ids(html), order, `${category}: ${sort}`);
      assert.match(
        html,
        new RegExp(`<option[^>]*value="${sort}"[^>]*selected`),
        `${category}: selected sort remains visible`,
      );
      assert.ok(
        html.includes(`rel="canonical" href="https://lltechsolutions.ca${path}"`),
        `${category}: clean canonical for sorted view`,
      );
      const schemas = [
        ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
      ].map((match) => JSON.parse(match[1]));
      const list = schemas.find((schema) => schema["@type"] === "CollectionPage").mainEntity
        .itemListElement;
      assert.deepEqual(
        list.map((item) => item.url.split("/").at(-1)),
        order,
        `${category}: schema follows visual order`,
      );
      checks++;
    }
  }
  const sortedFilter = await fetch(
    `${origin}/website-collection/category/construction-trades?industry=painting&tier=premier&sort=price-high`,
  );
  assert.equal(sortedFilter.status, 200);
  const sortedFilterHtml = await sortedFilter.text();
  assert.deepEqual(
    [...sortedFilterHtml.matchAll(/<article[^>]*id="design-([^"]+)"/g)].map((match) => match[1]),
    ["crestline"],
    "sorting combines with business type and design level",
  );
  checks++;
  const transport = htmlByRoute.get("/website-collection/category/transport-logistics");
  assert.ok(
    transport.includes('id="design-calgary-hot-shot"') &&
      transport.includes('id="design-tow-n-go"') &&
      !transport.includes('id="design-pigment"'),
    "transport gallery shows its live demo and client example",
  );
  for (const [id, name, category, liveUrl] of [
    ["tow-n-go", "Tow-N-Go Trailers", "transport-logistics", "https://www.towandgotrailers.ca/"],
    ["crestline", "Crestline Painting", "construction-trades", "https://www.crestlinepainting.ca/"],
    [
      "mckenzie-house",
      "McKenzie House Massage",
      "health-wellness",
      "https://mckenziehousemassage.ca/",
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
      example.includes("Live client example") &&
        example.includes(`href="/website-collection/${id}/purchase"`),
      `${id}: real-client status and purchase-scope link`,
    );
    const purchaseScope = htmlByRoute.get(`/website-collection/${id}/purchase`);
    assert.ok(
      purchaseScope.includes("Confirm your project scope") &&
        purchaseScope.includes("before booking") &&
        !purchaseScope.includes('class="managed-checkout-form"'),
      `${id}: scope and final price must be agreed before payment`,
    );
    assert.ok(
      !example.includes("placeholder business details") && !example.includes("Made yours."),
      `${id}: not labelled a placeholder template`,
    );
    assert.ok(!/<video\b/.test(example), `${id}: client template has no walkthrough player`);
    if (id !== "mckenzie-house") {
      assert.ok(
        example.includes('class="template-screenshots"'),
        `${id}: client template uses the shared screenshot gallery`,
      );
    }
    for (const href of [`/projects/${id}`, liveUrl]) {
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
  for (const route of ["/website-collection/tow-n-go", "/projects/tow-n-go"]) {
    assert.ok(
      htmlByRoute.get(route).includes('href="/projects/tow-n-go-digital"'),
      `${route}: Tow-N-Go keeps its monthly partnership link`,
    );
  }
  const transportComparison = await fetch(
    `${origin}/website-collection/compare?design=tow-n-go&design=calgary-hot-shot`,
  );
  assert.equal(transportComparison.status, 200);
  const transportComparisonHtml = await transportComparison.text();
  assertComparisonActions(transportComparisonHtml, "reference comparison");
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
  const retiredProcess = await fetch(`${origin}/process`, { redirect: "manual" });
  assert.equal(retiredProcess.status, 308, "retired Process page has a permanent redirect");
  assert.equal(
    new URL(retiredProcess.headers.get("location"), origin).pathname,
    "/services",
    "retired Process page points to Services",
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
    ["structure", "Plumbing Company"],
    ["earthworks", "Excavation &amp; Landscaping"],
    ["lawncare", "Lawn Care"],
    ["horizon", "Landscape Contracting"],
    ["still", "Nail &amp; Esthetics Studio"],
    ["massage-one-page", "One-page Massage Website"],
  ]) {
    const detail = htmlByRoute.get(`/website-collection/${id}`);
    assert.ok(
      detail.includes(name) && detail.includes("Personalize &amp; launch"),
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
  assert.ok(
    propertyGallery.includes('id="design-lawncare"') && trades.includes('id="design-lawncare"'),
    "lawn care appears under both trades and property",
  );
  assert.equal(
    [...trades.matchAll(/<article[^>]*id="design-([^"]+)"/g)].length,
    6,
    "Construction & Trades contains the six supplied designs",
  );
  const horizon = htmlByRoute.get("/website-collection/horizon");
  assert.ok(
    propertyGallery.includes('id="design-horizon"') && trades.includes('id="design-horizon"'),
    "landscape contracting appears under both trades and property",
  );
  assert.ok(
    horizon.includes("Independent design concept") &&
      horizon.includes("Horizon Contracting Group") &&
      horizon.includes("the business identity shown is not offered for resale"),
    "Horizon remains an independent reference personalized with the buyer's own identity",
  );
  assert.ok(!horizon.includes("Live client example"), "Horizon is not presented as a client");
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
  const tierOptions = categoryHtml.match(/<select\b[^>]*name="tier"[^>]*>(.*?)<\/select>/s)?.[1];
  assert.ok(tierOptions, "category gallery offers a design-level filter");
  for (const tier of ["essential", "signature", "premier", "flagship"]) {
    const tierName = tier.charAt(0).toUpperCase() + tier.slice(1);
    assert.ok(
      !collectionMain.includes(`id="collection-${tier}"`),
      `${tier}: tier panels stay off the simplified landing page`,
    );
    assert.match(
      tierOptions,
      new RegExp(`<option\\b[^>]*value="${tier}"[^>]*>${tierName}</option>`),
      `${tier}: available in the category gallery filter`,
    );
    const response = await fetch(`${origin}/contact?collection=website&tier=${tier}&care=care`);
    assert.equal(response.status, 200);
    const html = await response.text();
    const textarea = html.match(/<textarea\b[^>]*name="message"[^>]*>(.*?)<\/textarea>/s)?.[1];
    assert.ok(
      textarea?.includes(`Collection: ${tierName}`),
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
  for (const id of projectIds) {
    const page = htmlByRoute.get(`/projects/${id}`);
    assert.equal(
      (page.match(/class="[^"]*\bcase-implementation\b[^"]*"/g) || []).length,
      1,
      `${id}: case study explains its implementation`,
    );
  }
  assert.ok(
    htmlByRoute.get("/projects/mckenzie-house").includes("ClinicSense"),
    "McKenzie case study explains its booking platform",
  );
  assert.ok(
    htmlByRoute.get("/projects/tates-tv").includes("Cloudflare R2"),
    "Tate’s TV case study explains its software media architecture",
  );

  // Independent fixtures transcribed from the four supplied October 1 reports.
  // These are historical homepage lab tests, never promised site-wide results.
  const pageSpeedSnapshots = [
    ["tow-n-go", "Mobile", [91, 96, 100, 100]],
    ["tow-n-go", "Desktop", [93, 96, 100, 100]],
    ["mckenzie-house", "Mobile", [92, 100, 100, 100]],
    ["mckenzie-house", "Desktop", [100, 100, 88, 100]],
  ];
  for (const [id, device, scores] of pageSpeedSnapshots) {
    const page = htmlByRoute.get(`/projects/${id}`);
    const report = [
      ...page.matchAll(/<article class="client-pagespeed-report">([\s\S]*?)<\/article>/g),
    ]
      .map((match) => match[1])
      .find((markup) => markup.includes(`<h3>${device}</h3>`));
    assert.ok(report, `${id}: ${device} report belongs to the correct case study`);
    assert.deepEqual(
      [...report.matchAll(/<dd>(\d+)/g)].map((match) => Number(match[1])),
      scores,
      `${id}: ${device} scores match the supplied screenshot, including the 88`,
    );
    const image = `/images/projects/${id}/pagespeed-${device.toLowerCase()}-2026-10-01.png`;
    assert.ok(report.includes(`href="${image}"`), `${id}: original ${device} image opens directly`);
    assert.match(report, /<details class="client-pagespeed-original">/, "reports start collapsed");
    assert.match(page, /<time\s+datetime="2026-10-01">/i, `${id}: dated report`);
    assert.ok(page.includes("individual lab tests"), `${id}: lab results are qualified`);
    const response = await fetch(`${origin}${image}`);
    assert.equal(response.status, 200, `${id}: ${device} report image loads`);
    assert.match(response.headers.get("content-type") || "", /^image\/png/);
    assert.deepEqual(
      Buffer.from(await response.arrayBuffer()),
      await readFile(`public${image}`),
      `${id}: original PNG bytes are served intact`,
    );
    checks++;
  }
  for (const id of ["crestline", "tates-tv", ...contentProjectIds]) {
    assert.ok(
      !htmlByRoute.get(`/projects/${id}`).includes('class="client-pagespeed"'),
      `${id}: no unrelated or fabricated PageSpeed report`,
    );
  }

  const investment = htmlByRoute.get("/packages");
  assertSaleNotice(investment, "pricing page");
  assert.ok(investment.includes("$150+") && investment.includes("$149+"), "revised entry prices");
  assert.ok(
    /one polished page/i.test(investment) &&
      investment.includes('href="/website-collection/massage-one-page"'),
    "entry offer explains its one-page scope and links to the example",
  );
  assert.ok(!/\$(?:499|199)/.test(investment), "retired starting prices are removed");
  const investmentMetadata = investment.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(
    investmentMetadata?.includes("$150") && investmentMetadata.includes("$149"),
    "search description agrees with visible pricing",
  );
  for (const [route, html] of htmlByRoute) {
    assert.ok(
      !/href="\/projects\/(?:web-builds|software-development|social-media-management)#[^"]+"/.test(
        html,
      ),
      `${route}: internal project links use canonical case-study routes`,
    );
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
  const designImages = new Set(projectScreenshotAssets);
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
  const crestlineProject = htmlByRoute.get("/projects/crestline");
  assert.ok(!homeMain.includes('class="design-options"'), "design options stay off the homepage");
  for (const [id, category, designIds] of [
    [
      "tow-n-go",
      "transport-logistics",
      ["equipment-rentals", "auto-transport", "calgary-hot-shot"],
    ],
    ["crestline", "construction-trades", []],
    ["mckenzie-house", "health-wellness", ["massage-one-page", "still", "medical-spa"]],
  ]) {
    const page = htmlByRoute.get(`/projects/${id}`);
    const optionsClass = id === "crestline" ? "design-options" : "client-template-options";
    const options = page.match(
      new RegExp(`<section\\b[^>]*class="${optionsClass}"[^>]*>([\\s\\S]*?)<\\/section>`),
    )?.[1];
    assert.ok(options, `${id}: website case study offers other design options`);
    assert.match(options, /Other [Dd]esign [Oo]ptions/, `${id}: accurate options heading`);
    assert.ok(
      options.includes(`href="/website-collection/category/${category}"`),
      `${id}: related template category is linked`,
    );
    if (designIds.length) {
      assert.equal(
        (options.match(/class="client-template-option"/g) || []).length,
        designIds.length,
        `${id}: three distinct canonical template alternatives`,
      );
    }
    for (const designId of designIds) {
      assert.ok(
        options.includes(`href="/website-collection/${designId}"`),
        `${id}: links to the canonical ${designId} template`,
      );
    }
    assert.ok(
      !/(?:client|customer|Crestline|Tow-N-Go|Heather|McKenzie)[^<.]{0,70}(?:chose|selected|approved|rejected) (?:this|these|the|a) (?:design|option|layout|concept)/i.test(
        options,
      ),
      `${id}: design options make no unsupported client-selection claim`,
    );
  }
  assert.ok(
    crestlineProject.includes('aria-labelledby="crestline-design-options"'),
    "Crestline design options retain their accessible heading",
  );
  assert.deepEqual(
    [
      ...new Set(
        [
          ...crestlineProject.matchAll(/href="(\/images\/projects\/crestline-options\/[^"?#]+)"/g),
        ].map((match) => match[1]),
      ),
    ].sort(),
    [
      "/images/projects/crestline-options/architectural-home.jpg",
      "/images/projects/crestline-options/architectural-services.jpg",
      "/images/projects/crestline-options/colour-and-craft.png",
    ].sort(),
    "Crestline preserves its three original design-option image links without JavaScript",
  );
  for (const asset of designImages) {
    const response = await fetch(origin + asset, { method: "HEAD" });
    assert.equal(response.status, 200, `${asset}: image link works`);
    assert.ok(response.headers.get("content-type")?.startsWith("image/"), `${asset}: image MIME`);
    assert.ok(Number(response.headers.get("content-length")) > 0, `${asset}: nonempty image`);
    checks++;
  }
  const mediaAssets = new Set();
  for (const route of contentProjectIds.map((id) => `/projects/${id}`)) {
    const html = htmlByRoute.get(route);
    const videos = [...html.matchAll(/<video\b[^>]*>[\s\S]*?<\/video>/g)].map((match) => match[0]);
    if (route === "/projects/tow-n-go-digital") {
      assert.equal(videos.length, 3, `${route}: all three approved promotional examples render`);
      for (const path of [
        "/media/projects/tow-n-go-halloween-2026.mp4",
        "/media/projects/tow-n-go-ready-for-whats-next.mp4",
        "/media/projects/tow-n-go-content.mp4",
      ]) {
        assert.ok(
          videos.some((video) => video.includes(`src="${path}"`)),
          `${route}: ${path}`,
        );
      }
      for (const href of [
        "https://www.facebook.com/profile.php?id=61581311484780",
        "https://www.tiktok.com/@towngotrailers",
      ])
        assert.ok(html.includes(`href="${href}"`), `${route}: keeps the live social channel`);
      const captionIds = videos.map((video) => video.match(/aria-describedby="([^"]+)"/)?.[1]);
      assert.equal(new Set(captionIds).size, videos.length, `${route}: unique video descriptions`);
      for (const id of captionIds)
        assert.ok(id && html.includes(`id="${id}"`), `${route}: description target exists`);
    } else {
      assert.equal(videos.length, 1, `${route}: existing launch video is preserved`);
    }
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
  assert.ok(
    mediaAssets.size >= 12,
    "four complete content previews, with room for optional captions",
  );
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
    ["/projects/unknown-project", 404],
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
      assert.ok(
        !sitemap.includes("<loc>https://lltechsolutions.ca/process</loc>"),
        "retired Process page is excluded from the sitemap",
      );
      for (const path of routes.filter((path) => !privateUtilityRoutes.has(path))) {
        assert.ok(
          sitemap.includes(`<loc>${new URL(path, "https://lltechsolutions.ca").href}</loc>`),
          `sitemap includes ${path}`,
        );
      }
      for (const path of privateUtilityRoutes)
        assert.ok(
          !sitemap.includes(`<loc>${new URL(path, "https://lltechsolutions.ca").href}</loc>`),
          `${path}: purchase and utility pages stay out of the sitemap`,
        );
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
  for (const design of websiteDesigns.filter((item) => item.status !== "draft")) {
    const detail = await (await fetch(origin + `/website-collection/${design.id}`)).text();
    assert.ok(
      detail.includes("Personalization &amp; launch included"),
      `${design.id}: managed inclusions beside price`,
    );
    assert.ok(
      detail.includes("page-speed optimization"),
      `${design.id}: performance work included`,
    );
    assert.ok(
      detail.includes("technical SEO and metadata setup"),
      `${design.id}: SEO implementation included`,
    );
    assert.ok(
      detail.includes("/services#photography-videography"),
      `${design.id}: original media service linked`,
    );
    assertTemplateActions(detail, design, `${design.id}: detail purchase actions`);
    assert.ok(
      detail.includes(`/website-collection/${design.id}/purchase`),
      `${design.id}: managed checkout entry`,
    );
    const purchase = await fetch(origin + `/website-collection/${design.id}/purchase`);
    assert.equal(purchase.status, 200, `${design.id}: managed purchase page`);
    const purchaseHtml = await purchase.text();
    assertTemplatePrice(
      purchaseHtml,
      design.startingPriceCad,
      `${design.id}: managed checkout price`,
    );
    assert.ok(
      purchaseHtml.includes("/contact?"),
      `${design.id}: unconfigured checkout retains enquiry alternative`,
    );
    checks += 2;
  }
  assert.equal((await fetch(origin + "/website-collection/unlisted/purchase")).status, 404);
  checks++;
  const disabledManagedCheckout = await fetch(origin + "/api/template-purchases/checkout", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify({ designId: "pigment", scopeAccepted: true }),
  });
  assert.equal(disabledManagedCheckout.status, 503, "unconfigured managed checkout cannot charge");
  assert.ok(disabledManagedCheckout.headers.get("cache-control")?.includes("no-store"));
  assert.ok(!(await disabledManagedCheckout.text()).includes("checkout.stripe.com"));
  const managedSuccess = await fetch(origin + "/template-purchase/success");
  assert.equal(managedSuccess.status, 200);
  assert.ok(managedSuccess.headers.get("x-robots-tag")?.includes("noindex"));
  assert.ok(managedSuccess.headers.get("cache-control")?.includes("no-store"));
  checks += 2;
  const referenceEnquiry = await (
    await fetch(origin + "/contact?source-version=tow-n-go&price=1&design=pigment")
  ).text();
  assert.ok(
    referenceEnquiry.includes("Tow-N-Go"),
    "legacy code-version enquiry preserves selected reference",
  );
  assert.ok(
    referenceEnquiry.includes("request a reusable code-only version; quoted separately"),
    "reference files are not promised as a download",
  );
  assert.ok(
    !referenceEnquiry.includes("source-code download, $1 CAD"),
    "reference query cannot invent a checkout price",
  );
  checks++;
  for (const product of sourceProducts) {
    const res = await fetch(origin + sourceHref(product.designId));
    assert.equal(res.status, 200, `${product.designId}: source page`);
    const html = await res.text();
    assert.ok(html.includes(formatPriceCad(product.priceCad)), `${product.designId}: source price`);
    assert.ok(
      html.includes('id="source-checkout-not-ready"') &&
        html.includes("Secure online checkout is being prepared for this download."),
      "unconfigured checkout explains payment and delivery readiness",
    );
    const disabledPurchase = [...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)].find(
      ([, attributes, contents]) =>
        /\bdisabled(?:="[^"]*")?(?:\s|$)/.test(attributes) &&
        attributes.includes('aria-describedby="source-checkout-not-ready"') &&
        contents.replace(/<[^>]+>/g, "").trim() === "Purchase",
    );
    assert.ok(disabledPurchase, "unconfigured checkout keeps Purchase visibly disabled");
    assert.ok(
      !html.includes('class="source-license-check"'),
      "unconfigured checkout does not take payment",
    );
    assert.ok(html.includes("Single-business website licence"), "source licence is visible");
    assert.ok(html.includes("Personalize &amp; launch"), "managed alternative remains available");
    if (product.kind === "reference-edition") {
      assert.ok(
        html.includes("sample business content and illustrative images"),
        `${product.designId}: source edition differences are disclosed`,
      );
      assert.ok(
        html.includes(
          "original photos/video, testimonials and connected services are not included",
        ),
        `${product.designId}: original reference content is excluded`,
      );
    }
    checks++;
  }
  for (const id of ["unlisted", "private-draft"]) {
    assert.equal((await fetch(origin + sourceHref(id))).status, 404, `${id}: no source offer`);
    checks++;
  }
  const sourceInquiry = await fetch(
    origin + sourceInquiryHref("massage-one-page") + "&price=1&design=earthworks",
  );
  const sourceInquiryHtml = await sourceInquiry.text();
  assert.ok(
    sourceInquiryHtml.includes("source-code download, $49 CAD"),
    "download enquiry keeps server-owned price and selected template",
  );
  assert.ok(!sourceInquiryHtml.includes("source-code download, $1 CAD"), "query price is ignored");
  checks++;
  const offlineCheckout = await fetch(origin + "/api/source-purchases/checkout", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify({
      designId: "pigment",
      licenseAccepted: true,
      licenseVersion: "2026-10-02",
    }),
  });
  assert.equal(offlineCheckout.status, 503, "unconfigured checkout fails closed");
  assert.ok(offlineCheckout.headers.get("cache-control")?.includes("no-store"));
  assert.ok(!(await offlineCheckout.text()).includes("checkout.stripe.com"));
  checks++;
  for (const path of [
    "/api/source-purchases/download?token=forged",
    "/api/source-purchases/status?session_id=cs_test_notanorder",
  ]) {
    const res = await fetch(origin + path, { redirect: "manual" });
    assert.equal(res.status, 403, "unverified purchase is denied");
    assert.equal(res.headers.get("location"), null, "no archive location is leaked");
    assert.ok(res.headers.get("cache-control")?.includes("no-store"));
    checks++;
  }
  const successPage = await fetch(origin + "/source-purchase/success");
  assert.equal(successPage.status, 200);
  assert.equal(successPage.headers.get("referrer-policy"), "no-referrer");
  assert.ok(successPage.headers.get("x-robots-tag")?.includes("noindex"));
  assert.ok(
    !(await successPage.text()).includes("Your source files are ready"),
    "landing URL alone never claims payment",
  );
  checks++;
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
