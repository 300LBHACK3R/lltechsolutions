import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { isAbsolute, join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { verifyWellnessPublicSegments } from "./check-wellness-public.mjs";
import { isCompletedHeadTransfer } from "./lib/capture-request-failures.mjs";

// Run on the publisher's computer after public deployment verification.
// Playwright is installed outside the website repository by the release script.
const playwrightVersion = "1.58.2";
const approvedOrigin = "https://ll-wellness-template.vercel.app";
const { values } = parseArgs({
  options: {
    url: { type: "string" },
    "tooling-dir": { type: "string" },
    "output-dir": { type: "string" },
    config: { type: "string" },
    help: { type: "boolean" },
  },
  strict: true,
});

if (values.help) {
  console.log(
    "Capture the verified public Evergreen Wellness demo.\n" +
      "node scripts/capture-wellness-demo.mjs --url https://ll-wellness-template.vercel.app/ " +
      "--tooling-dir <absolute isolated Playwright directory> --output-dir <absolute empty directory> " +
      "--config <absolute wellness-demo.json path>\n" +
      `Requires playwright@${playwrightVersion} and its Chromium browser in the tooling directory.`,
  );
  process.exit(0);
}

const source = new URL(values.url ?? "");
assert(
  source.origin === approvedOrigin &&
    source.pathname === "/" &&
    !source.username &&
    !source.password &&
    !source.search &&
    !source.hash,
  `Only the approved public demo root ${approvedOrigin}/ can be captured.`,
);
for (const key of ["tooling-dir", "output-dir", "config"]) {
  assert(values[key] && isAbsolute(values[key]), `--${key} must be an absolute path.`);
}
const output = resolve(values["output-dir"]);
const configPath = resolve(values.config);
const tooling = resolve(values["tooling-dir"]);
assert(output !== tooling, "Capture output and tooling must be separate directories.");
const config = JSON.parse(await readFile(configPath, "utf8"));
assert(config && typeof config === "object" && !Array.isArray(config), "Invalid demo config.");
assert(
  !config.archived,
  "The generic wellness demo is archived. McKenzie House is the current client template reference; its showcase must not be replaced by the former demo.",
);
const toolingRequire = createRequire(join(tooling, "package.json"));
const installed = toolingRequire("playwright/package.json");
assert.equal(installed.version, playwrightVersion, "Unexpected Playwright version in tooling.");
const { chromium } = toolingRequire("playwright");
// Exclusive mkdir prevents overwriting an earlier capture or a user-selected folder.
await mkdir(output);

const shots = [
  {
    file: "home-desktop.png",
    route: "/",
    viewport: { width: 1440, height: 1000 },
    mobile: false,
    alt: "Evergreen Wellness sample website home page on desktop",
    caption: "Home — actual desktop demo capture",
  },
  {
    file: "treatments-desktop.png",
    route: "/treatments/",
    viewport: { width: 1440, height: 1000 },
    mobile: false,
    alt: "Evergreen Wellness sample website treatments page on desktop",
    caption: "Treatments — actual desktop demo capture",
  },
  {
    file: "contact-desktop.png",
    route: "/contact/",
    viewport: { width: 1440, height: 1000 },
    mobile: false,
    alt: "Evergreen Wellness sample website contact page on desktop",
    caption: "Contact — actual desktop demo capture",
  },
  {
    file: "home-mobile.png",
    route: "/",
    viewport: { width: 390, height: 844 },
    mobile: true,
    alt: "Evergreen Wellness sample website home page on a mobile screen",
    caption: "Home — actual mobile demo capture",
  },
];

function pngDimensions(buffer) {
  assert(
    buffer.length > 24 &&
      buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
    "Screenshot is not a PNG image.",
  );
  assert.equal(buffer.toString("ascii", 12, 16), "IHDR", "PNG dimensions are unavailable.");
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  assert(width > 0 && height > 0, "Screenshot has invalid dimensions.");
  return { width, height };
}

async function assertNoOverflow(page, label) {
  const dimensions = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  assert(dimensions.width <= dimensions.viewport + 1, `Horizontal overflow on ${label}.`);
}

async function checkDemoNavigationAndPreviews(browser, mobile) {
  const context = await browser.newContext({
    viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    isMobile: mobile,
    hasTouch: mobile,
    reducedMotion: "reduce",
    serviceWorkers: "block",
  });
  try {
    const page = await context.newPage();
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    const firstResponse = await page.goto(source.href, { waitUntil: "load", timeout: 45000 });
    assert.equal(firstResponse?.status(), 200, "Navigation check could not load the public demo.");
    await page.locator('[data-wellness-page="home"]').waitFor({ state: "visible" });
    await assertNoOverflow(page, mobile ? "mobile Home" : "desktop Home");
    for (const label of ["Treatments", "Contact", "Home"]) {
      if (mobile) await page.locator(".wellness-mobile-nav > summary").click();
      const navigation = page.getByRole("navigation", {
        name: mobile ? "Wellness mobile pages" : "Wellness website pages",
        exact: true,
      });
      const route = label === "Home" ? "/" : `/${label.toLowerCase()}`;
      await Promise.all([
        page.waitForURL(
          (url) =>
            url.origin === approvedOrigin &&
            url.pathname.replace(/\/$/, "") === route.replace(/\/$/, ""),
          { timeout: 20000 },
        ),
        navigation.getByRole("link", { name: new RegExp(`^${label}(?:\\s|$)`) }).click(),
      ]);
      await page
        .locator(`[data-wellness-page="${label.toLowerCase()}"]`)
        .waitFor({ state: "visible" });
      await assertNoOverflow(page, `${mobile ? "mobile" : "desktop"} ${label}`);
      if (label !== "Contact") continue;

      const enquiry = page.locator('[data-wellness-demo-form="enquiry"]');
      const booking = page.locator('[data-wellness-demo-form="booking"]');
      await enquiry.getByRole("button", { name: "Preview enquiry", exact: true }).waitFor();
      await page.waitForFunction(() => {
        const field = document.querySelector('[data-enquiry-field="name"]');
        return field && !field.matches(":disabled");
      });
      // These are local demo previews. Offline mode guarantees that clicking the
      // controls cannot transmit the synthetic sample details or reserve anything.
      await context.setOffline(true);
      try {
        const contactUrl = page.url();
        await enquiry.getByLabel("Your name", { exact: true }).fill("Sample visitor");
        await enquiry.getByLabel("Email address", { exact: true }).fill("sample@example.com");
        await enquiry
          .getByLabel("What would you like to know?", { exact: true })
          .selectOption("general");
        await enquiry
          .getByLabel("Your message", { exact: true })
          .fill("A sample question about session lengths.");
        await enquiry.getByRole("button", { name: "Preview enquiry", exact: true }).click();
        await enquiry
          .getByRole("status")
          .filter({ hasText: /sample enquiry is ready to review/ })
          .waitFor();
        assert.match(
          await enquiry.getByRole("status").innerText(),
          /Nothing has been sent or saved/,
        );
        await booking.getByLabel("Service", { exact: true }).selectOption({ index: 1 });
        await booking.getByLabel("Session length", { exact: true }).selectOption({ index: 0 });
        const selectedService = await booking
          .getByLabel("Service", { exact: true })
          .locator("option:checked")
          .innerText();
        const selectedDuration = await booking
          .getByLabel("Session length", { exact: true })
          .locator("option:checked")
          .innerText();
        await booking.getByRole("button", { name: "Review booking preview", exact: true }).click();
        await booking
          .getByRole("status")
          .filter({ hasText: /no appointment has been booked or reserved/ })
          .waitFor();
        const review = await booking.getByRole("status").innerText();
        assert(
          review.includes(selectedService) && review.includes(selectedDuration),
          "Booking preview did not reflect the selected service and duration.",
        );
        assert.equal(
          page.url(),
          contactUrl,
          "A demo preview unexpectedly navigated away from Contact.",
        );
        await assertNoOverflow(page, `${mobile ? "mobile" : "desktop"} Contact preview states`);
      } finally {
        await context.setOffline(false);
      }
    }
    assert.equal(pageErrors.length, 0, `Demo interaction errors: ${pageErrors.join("; ")}`);
    console.log(
      `CHECKED ${mobile ? "390px mobile" : "1440px desktop"}: navigation, overflow and offline enquiry/booking previews.`,
    );
  } finally {
    await context.close();
  }
}

const verifiedSegments = await verifyWellnessPublicSegments({ url: source.href });
console.log(`CHECKED ${verifiedSegments} public page-data files before browser capture.`);
const browser = await chromium.launch({ headless: true });
const screenshots = [];
try {
  await checkDemoNavigationAndPreviews(browser, false);
  await checkDemoNavigationAndPreviews(browser, true);
  // Fresh contexts keep the screenshots in the default clean state, with no
  // synthetic form values, validation messages or preview success messages.
  for (const shot of shots) {
    const context = await browser.newContext({
      viewport: shot.viewport,
      deviceScaleFactor: 1,
      isMobile: shot.mobile,
      hasTouch: shot.mobile,
      reducedMotion: "reduce",
      colorScheme: "light",
      locale: "en-CA",
      timezoneId: "America/Toronto",
      serviceWorkers: "block",
    });
    const errors = [];
    const failedRequests = [];
    const responseStatuses = new WeakMap();
    try {
      const page = await context.newPage();
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("response", (response) => {
        responseStatuses.set(response.request(), response.status());
        const url = new URL(response.url());
        if (url.origin === approvedOrigin && response.status() >= 400) {
          errors.push(
            `HTTP ${response.status()} ${response.request().method()} at ${url.pathname}`,
          );
        }
      });
      page.on("requestfailed", (request) => {
        const url = new URL(request.url());
        if (url.origin === approvedOrigin) failedRequests.push(request);
      });
      const assertResources = async () => {
        for (const request of failedRequests.splice(0)) {
          const failure = {
            method: request.method(),
            resourceType: request.resourceType(),
            errorText: request.failure()?.errorText ?? "Unknown request failure",
            status: responseStatuses.get(request),
          };
          const path = new URL(request.url()).pathname;
          if (isCompletedHeadTransfer(failure)) {
            console.log(
              `CHECKED successful HEAD ${path}: HTTP ${failure.status}; no body required.`,
            );
          } else {
            errors.push(
              `${failure.method} ${path} (${failure.resourceType}): ${failure.errorText}; response ${failure.status ?? "not received"}`,
            );
          }
        }
        if (errors.length) {
          const diagnostic = { page: shot.route, viewport: shot.viewport, errors };
          await writeFile(
            join(output, "capture-errors.json"),
            `${JSON.stringify(diagnostic, null, 2)}\n`,
          );
          console.error(`CAPTURE DIAGNOSTICS: ${join(output, "capture-errors.json")}`);
        }
        assert.equal(errors.length, 0, `Page errors prevent capture: ${errors.join("; ")}`);
      };
      const sourceUrl = new URL(shot.route, source).href;
      const response = await page.goto(sourceUrl, { waitUntil: "load", timeout: 45000 });
      assert(
        response && response.status() === 200,
        `Demo page did not return HTTP 200: ${shot.route}`,
      );
      const finalUrl = new URL(page.url());
      assert(
        finalUrl.origin === approvedOrigin &&
          finalUrl.pathname.replace(/\/$/, "") === shot.route.replace(/\/$/, "") &&
          !finalUrl.search &&
          !finalUrl.hash,
        "The public demo redirected away from the approved page.",
      );
      const headers = await response.allHeaders();
      assert(/noindex/i.test(headers["x-robots-tag"] ?? ""), "Demo noindex header is missing.");
      assert.equal(headers["x-content-type-options"], "nosniff", "Demo nosniff header is missing.");
      await page.locator('[data-wellness-demo="mckenzie-house"]').waitFor({ state: "visible" });
      assert(
        (await page.getByRole("link", { name: /^Make this my website(?:\s|$)/ }).count()) > 0,
        "Demo enquiry handoff is missing.",
      );
      assert(
        /evergreen\s+wellness/i.test(await page.locator("body").innerText()),
        "Wrong sample brand.",
      );
      // Scroll through the real page to load lazy images before full-page capture.
      await page.evaluate(async () => {
        await document.fonts.ready;
        const frame = () => new Promise((done) => requestAnimationFrame(done));
        for (let step = 0; step < 60; step += 1) {
          window.scrollBy(0, Math.max(200, window.innerHeight - 100));
          await frame();
          await frame();
          if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) break;
        }
        for (const image of document.images) image.loading = "eager";
        window.scrollTo(0, 0);
        await frame();
        await frame();
      });
      await page.waitForFunction(
        () => [...document.images].every((image) => image.complete && image.naturalWidth > 0),
        null,
        { timeout: 20000 },
      );
      await assertNoOverflow(page, shot.route);
      await assertResources();
      const bytes = await page.screenshot({
        fullPage: true,
        type: "png",
        animations: "disabled",
        caret: "hide",
        scale: "css",
        timeout: 30000,
      });
      await assertResources();
      const size = pngDimensions(bytes);
      assert.equal(size.width, shot.viewport.width, "Screenshot width differs from the viewport.");
      assert(size.height >= shot.viewport.height, "Screenshot does not cover the viewport.");
      await writeFile(join(output, shot.file), bytes, { flag: "wx" });
      screenshots.push({
        src: `/images/templates/wellness/${shot.file}`,
        alt: shot.alt,
        caption: shot.caption,
        ...size,
        sourceUrl,
        capturedAt: new Date().toISOString(),
      });
      console.log(`CAPTURED ${shot.file}: ${size.width} x ${size.height} from ${sourceUrl}`);
    } catch (error) {
      // Preserve evidence even when a navigation or image wait fails before
      // the usual resource assertion. Diagnostic writes never replace the cause.
      const diagnostic = {
        page: shot.route,
        viewport: shot.viewport,
        cause: error instanceof Error ? error.message : String(error),
        errors,
        pendingFailures: failedRequests.map((request) => ({
          path: new URL(request.url()).pathname,
          method: request.method(),
          type: request.resourceType(),
          error: request.failure()?.errorText ?? "Unknown request failure",
          status: responseStatuses.get(request) ?? null,
        })),
      };
      try {
        await writeFile(
          join(output, "capture-errors.json"),
          `${JSON.stringify(diagnostic, null, 2)}\n`,
        );
        console.error(`CAPTURE DIAGNOSTICS: ${join(output, "capture-errors.json")}`);
      } catch (diagnosticError) {
        console.error(`Could not save capture diagnostics: ${diagnosticError.message}`);
      }
      throw error;
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}

// Write metadata last: a failed/partial capture cannot be mistaken for a complete set.
await writeFile(
  join(output, "wellness-demo.json"),
  `${JSON.stringify({ ...config, url: source.href, screenshots }, null, 2)}\n`,
  { flag: "wx" },
);
console.log("PUBLIC WELLNESS DEMO SCREENSHOTS CAPTURED: four actual browser images and metadata.");
