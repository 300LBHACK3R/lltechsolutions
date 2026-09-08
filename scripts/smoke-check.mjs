import { spawn } from "node:child_process";
import { once } from "node:events";
import assert from "node:assert/strict";

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
  const reviews = htmlByRoute.get("/reviews");
  const approvedQuote =
    "Tate has been a joy to work with. I am blown away by his professionalism and care. His communication has made me feel understood and heard each step of the way. Money well spent, especially on a complicated web project—I know it is in good hands with Tate.";
  assert.ok(reviews.includes(approvedQuote), "Heather’s supplied testimonial remains verbatim");
  assert.ok(reviews.includes("Heather Knorr"), "testimonial retains its attribution");
  assert.ok(!reviews.includes("AggregateRating"), "no self-serving aggregate rating schema");
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
  assert.equal(tabTags.length, 6, "project and service tabs are present in server HTML");
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
    2,
    "one selected tab per group",
  );
  for (const [source, html] of htmlByRoute) {
    for (const match of html.matchAll(/href="(\/[^"?]*)(?:\?[^"#]*)?"/g)) {
      const href = match[1];
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
  const mediaAssets = new Set();
  for (const [route, expectedVideos] of [
    ["/projects/web-builds", 3],
    ["/projects/software-development", 1],
    ["/projects/social-media-management", 2],
  ]) {
    const html = htmlByRoute.get(route);
    const videos = [...html.matchAll(/<video\b[^>]*>/g)].map((match) => match[0]);
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
    }
    for (const match of html.matchAll(/(?:src|poster)="(\/media\/[^\"]+)"/g))
      mediaAssets.add(match[1]);
  }
  assert.equal(mediaAssets.size, 18, "six complete previews with posters and descriptions");
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
      for (const path of routes) {
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
