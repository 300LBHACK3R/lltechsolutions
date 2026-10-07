import { execFileSync } from "node:child_process";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, extname, isAbsolute, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import ts from "typescript";
import { sourceLicense, sourceLicenseVersion } from "../src/data/source-license.ts";
import { paintingPages, paintingPagePath } from "../src/data/painting-pages.ts";
import { plumbingPages, plumbingPagePath } from "../src/data/plumbing-pages.ts";
import { earthworksPages, earthworksPagePath } from "../src/data/earthworks-pages.ts";
import { horizonPages, horizonPagePath } from "../src/data/horizon-pages.ts";
import { sourceProducts } from "../src/data/source-products.ts";
import { lawnPages, lawnPagePath } from "../src/data/lawn-pages.ts";
import { entryTemplateDemos } from "./lib/entry-template-config.mjs";
import { sourceFontLicenses } from "./lib/source-font-licenses.mjs";
import {
  assertPackagePath,
  createSourceArchive,
  customerPackage,
  formatSourceFiles,
  localImportPath,
  regularFiles,
  sha256,
  sourceFile,
  sourcePackageBlockedIds,
  textBytes,
} from "./lib/source-package-tools.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const referenceEditions = {
  "tow-n-go": { folder: "source-editions/tow-n-go", reference: true },
  crestline: { folder: "source-editions/crestline", reference: true },
  "mckenzie-house": { folder: "source-editions/mckenzie-house", reference: true },
};
const customDemos = {
  horizon: { folder: "horizon-demo", routes: horizonPages.map(horizonPagePath) },
  pigment: { folder: "painting-demo", routes: paintingPages.map(paintingPagePath) },
  structure: { folder: "plumbing-demo", routes: plumbingPages.map(plumbingPagePath) },
  earthworks: {
    folder: "earthworks-demo",
    routes: earthworksPages.map(earthworksPagePath),
  },
  lawncare: { folder: "lawncare-demo", routes: lawnPages.map(lawnPagePath) },
};
export const packageDemos = {
  ...Object.fromEntries(
    Object.entries(entryTemplateDemos).map(([kind, demo]) => [demo.id, { ...demo, kind }]),
  ),
  ...customDemos,
  ...referenceEditions,
};

const familyNames = ["homeProperty", "retail", "food", "transport", "professional"];
const transportStyles = {
  "courier-one-page": "transport-courier.css",
  "moving-company": "transport-moving.css",
  "auto-transport": "transport-auto.css",
  "equipment-rentals": "transport-equipment.css",
  "cold-chain": "transport-cold.css",
  "freight-logistics": "transport-freight.css",
};
const replacements = {
  "plumbing-interior.webp": "painting-interior.webp",
  "plumbing-detail.webp": "construction-home.webp",
  "earthworks-site.webp": "construction-home.webp",
  "earthworks-landscape.webp": "construction-home.webp",
  "earthworks-detail.webp": "painting-interior.webp",
  "lawn-hero.webp": "construction-home.webp",
  "lawn-detail.webp": "construction-home.webp",
};
const replacementDescriptions = {
  "painting-interior.webp":
    "Generated sample living room with cream and sage painted walls, light wood and soft furnishings",
  "construction-home.webp":
    "Generated sample contemporary home with dark siding, a timber entrance and garden planting",
};

// Every permitted photograph has a maintained generation/provenance record.
// Live client screenshots, brand marks, videos and unknown assets never enter a ZIP.
function assetProvenance(filename) {
  if (/^(?:painting-interior|construction-home|massage-room)\.webp$/u.test(filename))
    return "docs/TEMPLATE_PREVIEW_IMAGES.md";
  if (/^beauty-(?:studio|detail)\.webp$/u.test(filename)) return "docs/ENTRY_TEMPLATE_ASSETS.md";
  if (
    /^(?:medical-spa-(?:interior|detail)|nail-art-(?:studio|hands)|hair-salon-(?:interior|detail))\.webp$/u.test(
      filename,
    )
  )
    return "docs/WELLNESS_EXPANSION_ASSETS.md";
  if (/^professional-(?:law-office|boardroom)\.webp$/u.test(filename))
    return "docs/LEGAL_PROFESSIONAL_TEMPLATES.md";
  const permitted =
    /^(?:property-(?:home-cleaning|window-care|home-organizing|interior-studio|property-management|real-estate)|transport-(?:courier-one-page|moving-company|auto-transport|equipment-rentals|cold-chain|freight-logistics)|food-(?:food-truck|neighbourhood-cafe|artisan-bakery|pizzeria|catering-events|fine-dining)|retail-(?:mobile-detailing|flower-shop|auto-repair|streetwear-store|wheel-studio|jewellery-atelier))\.webp$/u;
  const match = permitted.test(filename)
    ? /^(property|transport|food|retail)-/u.exec(filename)
    : null;
  if (match)
    return {
      property: "docs/HOME_PROPERTY_TEMPLATES.md",
      transport: "docs/TRANSPORT_LOGISTICS_TEMPLATES.md",
      food: "docs/FOOD_RESTAURANTS_TEMPLATES.md",
      retail: "docs/RETAIL_AUTOMOTIVE_TEMPLATES.md",
    }[match[1]];
  return undefined;
}

function shape(value, property = "") {
  if (value === null) return "null";
  if (Array.isArray(value)) {
    if (!value.length) return "readonly never[]";
    return `readonly (${[...new Set(value.map((item) => shape(item)))].join(" | ")})[]`;
  }
  if (typeof value === "object")
    return `{ ${Object.entries(value)
      .map(([key, item]) => `${JSON.stringify(key)}: ${shape(item, key)}`)
      .join("; ")} }`;
  if (typeof value === "string")
    return ["id", "theme", "industry", "tier"].includes(property)
      ? JSON.stringify(value)
      : "string";
  if (typeof value === "boolean") return String(value);
  return typeof value;
}

function describeReplacementAssets(value) {
  if (Array.isArray(value)) return value.map(describeReplacementAssets);
  if (!value || typeof value !== "object") return value;
  const result = Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, describeReplacementAssets(item)]),
  );
  const image = typeof result.src === "string" ? result.src.split("/").pop() : "";
  if (replacements[image]) result.alt = replacementDescriptions[replacements[image]];
  return result;
}

function customerData(catalogue, source, design) {
  const type = source.match(/export type WebsiteDesign = \{[\s\S]*?\n\};/u)?.[0];
  if (!type) throw new Error("Cannot isolate the canonical WebsiteDesign type.");
  const data = describeReplacementAssets({
    ...design,
    demoUrl: "",
    included: [],
    deliveryWindow: "Self-managed source package",
  });
  if (data.concept)
    data.concept = {
      ...data.concept,
      services: data.concept.services.map(({ name, description }) => ({ name, description })),
    };
  delete data.preview;
  delete data.pagePreview;
  delete data.walkthrough;
  delete data.performance;
  delete data.customization;
  delete data.clientProjectId;
  delete data.clientPreview;
  delete data.clientScopeNote;
  delete data.independentConcept;
  let output = `// Customer-editable content for this one template only.\nimport { customerContactHref } from "@/config/site";\nexport type CollectionTierId = string;\nexport type CollectionIndustryId = string;\nexport type CollectionContactMode = "direct" | "enquiry-form";\nexport type CollectionVideo = { src: string; poster: string; title: string; captions?: string };\nexport type PerformanceEvidence = { label: string; value: string };\n${type}\nexport const websiteDesigns: readonly WebsiteDesign[] = ${JSON.stringify([data], null, 2)};\nexport function collectionInquiryHref(_selection?: unknown) { return customerContactHref; }\n`;
  for (const family of familyNames) {
    const values = catalogue[`${family}Templates`];
    const selected = values.filter((item) => item.id === design.id);
    if (!selected.length) continue;
    const typeName = `${family[0].toUpperCase()}${family.slice(1)}Template`;
    output += `\nexport type ${typeName} = ${values.map((item) => shape(item)).join(" | ")};\nexport type ${typeName}Id = ${typeName}["id"];\nexport const ${family}Templates: readonly ${typeName}[] = ${JSON.stringify(selected, null, 2)};\nexport function ${family}Template(id: string) { return ${family}Templates.find((item) => item.id === id); }\n`;
    const functionNode = ts
      .createSourceFile("data.ts", source, ts.ScriptTarget.Latest, true)
      .statements.find(
        (node) => ts.isFunctionDeclaration(node) && node.name?.text === `${family}PagePath`,
      );
    if (!functionNode) throw new Error(`Missing ${family} page routing helper.`);
    output += functionNode.getText() + "\n";
  }
  return output;
}

function stripSalesSource(source, filename) {
  const parsed = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    filename.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const transform = (context) => {
    const emptyRendering = (node) =>
      ts.isJsxElement(node.parent) || ts.isJsxFragment(node.parent)
        ? undefined
        : ts.factory.createNull();
    function visit(node) {
      if (
        ts.isImportDeclaration(node) &&
        ts.isStringLiteral(node.moduleSpecifier) &&
        /(?:TemplatePrice|use-template-sale|template-promotion)$/u.test(node.moduleSpecifier.text)
      )
        return undefined;
      if (ts.isJsxElement(node)) {
        const attr = node.openingElement.attributes.properties.find(
          (item) => ts.isJsxAttribute(item) && item.name.text === "className",
        );
        const className =
          attr?.initializer && ts.isStringLiteral(attr.initializer) ? attr.initializer.text : "";
        if (
          /(?:real-enquiry|website-enquiry|website-note|contact-launch|pro-purchase|property-purchase|lawn-website-cta|horizon-own-site)/u.test(
            className,
          )
        )
          return emptyRendering(node);
        if (
          ["a", "Link"].includes(node.openingElement.tagName.getText()) &&
          /Template details/u.test(node.getText())
        )
          return emptyRendering(node);
      }
      if (ts.isJsxSelfClosingElement(node) && node.tagName.getText() === "TemplatePrice")
        return emptyRendering(node);
      if (ts.isJsxSelfClosingElement(node) && node.tagName.getText() === "Image") {
        const src = node.attributes.properties.find(
          (item) => ts.isJsxAttribute(item) && item.name.text === "src",
        );
        const path =
          src?.initializer && ts.isStringLiteral(src.initializer) ? src.initializer.text : "";
        const replacement = replacements[path.split("/").pop()];
        if (replacement)
          return ts.factory.updateJsxSelfClosingElement(
            node,
            node.tagName,
            node.typeArguments,
            ts.factory.createJsxAttributes(
              node.attributes.properties.map((item) =>
                ts.isJsxAttribute(item) && item.name.text === "alt"
                  ? ts.factory.createJsxAttribute(
                      ts.factory.createIdentifier("alt"),
                      ts.factory.createStringLiteral(replacementDescriptions[replacement]),
                    )
                  : item,
              ),
            ),
          );
      }
      if (ts.isObjectLiteralExpression(node)) {
        const src = node.properties.find(
          (item) =>
            ts.isPropertyAssignment(item) && item.name.getText().replaceAll('"', "") === "src",
        );
        const path =
          src?.initializer && ts.isStringLiteral(src.initializer) ? src.initializer.text : "";
        const replacement = replacements[path.split("/").pop()];
        if (replacement)
          return ts.factory.updateObjectLiteralExpression(
            node,
            node.properties.map((item) =>
              ts.isPropertyAssignment(item) && item.name.getText().replaceAll('"', "") === "alt"
                ? ts.factory.createPropertyAssignment(
                    "alt",
                    ts.factory.createStringLiteral(replacementDescriptions[replacement]),
                  )
                : item,
            ),
          );
      }
      return ts.visitEachChild(node, visit, context);
    }
    return (node) => ts.visitNode(node, visit);
  };
  const transformed = ts.transform(parsed, [transform]);
  let output = ts.createPrinter().printFile(transformed.transformed[0]);
  transformed.dispose();
  output = output
    .replaceAll("https://lltechsolutions.ca", "")
    .replaceAll("Make this my website", "Email this business")
    .replaceAll("Website by L&L", "Contact")
    .replaceAll("A website by L&L", "Email this business")
    .replaceAll("Original L&L demo", "Sample website")
    .replaceAll(
      "Fictional business · L&L website demonstration",
      "Sample business · Replace before launch",
    )
    .replaceAll(
      "Try the demonstration enquiry with sample details, or follow the L&L link to discuss this website for your own business.",
      "Try the enquiry layout with sample details. This demonstration does not send or save messages.",
    )
    .replaceAll(
      "Explore the sample enquiry form below. For a real conversation about this website, follow the L&L enquiry link.",
      "Explore the enquiry layout with sample details. Connect your own form service before accepting real enquiries.",
    )
    .replaceAll(
      "This is an illustrative website demo, so it does not accept landscape bookings or contractor enquiries. If you would like a website like this for your business, use the L&L enquiry link on the Contact page.",
      "This sample website does not accept landscape bookings or contractor enquiries. Replace the sample contact details and connect your chosen enquiry service before launch.",
    )
    .replaceAll(
      "An original L&L sample design · Your business, made personal.",
      "Sample website · Replace with your business details.",
    )
    .replace(
      /This (?:button|link) contacts L&L Tech Solutions about the website\.?/gu,
      "Sample email link. Replace hello@example.com before launch.",
    )
    .replace(
      /This opens a real enquiry with L&L Tech Solutions\.?/gu,
      "Sample email link. Replace hello@example.com before launch.",
    );
  return output;
}

function packageLayout(original, design) {
  const parsed = ts.createSourceFile(
    "layout.tsx",
    original,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const imports = parsed.statements
    .filter(
      (node) =>
        ts.isImportDeclaration(node) &&
        ts.isStringLiteral(node.moduleSpecifier) &&
        (node.moduleSpecifier.text.endsWith(".css") ||
          node.moduleSpecifier.text === "next/font/google") &&
        !node.moduleSpecifier.text.includes("template-pricing") &&
        (!transportStyles[design.id] ||
          !Object.values(transportStyles).some((style) =>
            node.moduleSpecifier.text.endsWith(style),
          ) ||
          node.moduleSpecifier.text.endsWith(transportStyles[design.id])),
    )
    .map((node) => node.getText());
  const fonts = parsed.statements
    .filter(
      (node) =>
        ts.isVariableStatement(node) &&
        node.declarationList.declarations.some((item) =>
          ["sans", "editorial"].includes(item.name.getText()),
        ),
    )
    .map((node) => node.getText());
  const main = original.match(/<main\s[\s\S]*?>/u)?.[0];
  if (!main || fonts.length < 1 || fonts.length > 2)
    throw new Error(`Unsupported layout in ${design.id}.`);
  const bodyClass =
    fonts.length === 2 ? "`${sans.variable} ${editorial.variable}`" : "sans.variable";
  const mainTag = main.replace(/\{(?:template|design)\.id\}/gu, JSON.stringify(design.id));
  return `${imports.join("\n")}\nimport "./source-preview.css";\nimport type { Metadata } from "next";\nimport MotionControl from "@/components/ui/MotionControl";\nimport { customerSite } from "@/config/site";\n${fonts.join("\n")}\nexport const metadata: Metadata = { title: { default: customerSite.name, template: "%s | " + customerSite.name }, description: customerSite.description, robots: { index: false, follow: false }, formatDetection: { telephone: false, email: false, address: false } };\nexport default function CustomerLayout({ children }: { children: React.ReactNode }) { return (\n<html lang="en-CA" data-motion="paused"><body className={${bodyClass}}>\n<a className="skip-link" href="#main-content">Skip to content</a>\n${mainTag}{children}</main>\n<footer className="source-preview-note"><span>Sample website. Replace the sample business information before launch. Demonstration forms do not send messages.</span><MotionControl /></footer>\n</body></html>); }\n`;
}

function packageReadme(design, demo, assets, assetNote) {
  return `# ${design.name} — editable source package

This is the complete editable source for one standalone Next.js website template, licensed for one business website. It includes ${demo.routes.length} page${demo.routes.length === 1 ? "" : "s"}: ${demo.routes.join(", ")}.

## What you bought

You receive the design source, its local sample imagery, existing responsive layouts and interactions, package lockfile, and setup instructions. This is a self-managed source download. Personalization, deployment, domain registration, hosting, support beyond download/build defects, new integrations and ongoing maintenance are not included. No merchant keys or client information are included.

${assetNote || "Included imagery is generated sample imagery for this fictional template, not real client photography or actual premises."}

## Run it locally

1. Install Node.js 22.18 or newer (Node.js 24 LTS recommended).
2. Extract this ZIP into a new folder and open that folder in a terminal or VS Code.
3. Run \`npm ci\`.
4. Run \`npm run dev\` and open the local URL printed by Next.js.
5. Run \`npm run typecheck\` and \`npm run build\` before deployment. The build writes a static website to \`out/\`. Google fonts download during the build, so the build machine needs internet access.

## Personalize your website

- Begin in \`src/config/site.ts\` for the website name, description and sample email link. This changes metadata and the generic enquiry link; visible sample brand names, phone numbers and service text also need editing in the files below.
- Edit \`src/data/website-collection.ts\` for this template’s brand, headline, services and other selected content. Only this purchased design's content is included. Other small \`src/data/*\` files and \`src/components/collection/*\` contain its page copy and interactive content. Search for the fictional business name, \`example.com\`, sample telephone numbers, illustrative locations and “demo” to find all places requiring personalization.
- Replace or keep the licensed illustrative files in \`public/images/collection/\`. Update their descriptive alt text when changing images. Each asset is listed in \`ASSET-LICENSES.json\` with its provenance.
- Adjust colours, spacing and effects in \`src/styles/\`. Reduced motion and keyboard controls remain part of the template.
- Replace the neutral \`app/icon.svg\` with your own icon. No L&L or client logos are licensed as your business branding.
- Use \`EDITING.md\` as a file map for this download. Source files use consistent two-space formatting; \`.editorconfig\` records the whitespace conventions.

## Contact and interactive behaviour

The source is a static website, not a configured email service. Sample forms validate locally and do not send or save enquiries. Sample booking, ordering, inventory, payment, quote, fitment and availability controls demonstrate the interface only. A higher managed-launch price elsewhere does not make those services part of this code-only purchase.

For direct contact, replace the email and phone placeholders with your own approved details and add \`mailto:\`/\`tel:\` or your existing booking URL. For delivered enquiry email you must separately add a server endpoint or hosted form service, validate and rate-limit requests, configure your own provider/domain credentials, disclose data handling, and test actual delivery. Never put secrets in browser code or variables prefixed \`NEXT_PUBLIC_\`. The included \`.env.example\` intentionally contains no active keys, and adding keys alone does not enable a backend.

## Deploy

For Vercel: create your own separate project, import your repository, select framework “Other”, use build command \`npm run build\`, install command \`npm ci\`, and output directory \`out\`. The supplied \`vercel.json\` sets these values and static security headers. Do not deploy this folder over an existing unrelated project. Other static hosts can serve \`out/\` with clean URL routing and equivalent response headers. The export normalizer preserves Next.js page-data filenames across Windows builds.

The template intentionally starts with noindex in both metadata and its response header. Once your real content, contact methods, accessibility, privacy information and domain are ready, update \`app/layout.tsx\` robots metadata and remove the \`X-Robots-Tag: noindex, nofollow\` header in \`vercel.json\`. Add your real canonical URL, social sharing image and sitemap. Review the content-security policy if you add third-party services. Keep the noindex settings while previewing.

## Before making it public

Review every route on phone and desktop, keyboard navigation, reduced motion, images, menus and real contact links. Add accurate business/service information and any required professional disclosures. Remove or replace sample disclaimers only when their functionality is real. Check current dependencies and keep an ongoing update process. Purchasing source does not promise a particular search ranking, PageSpeed score or perpetual compatibility.

## Licence and assistance

Read \`LICENSE.txt\` and \`THIRD-PARTY-NOTICES.md\`. One purchase covers one business website and its staging environments. You may hire a developer to customize it for that business. Selling or distributing the source as a template or using it for additional businesses requires a separate licence. Hosting, provider fees, changes and care remain your responsibility unless separately agreed with L&L.

If the downloaded archive is damaged or its supplied build fails unchanged in the documented environment, contact L&L with your order reference and error output. Do not send private API keys. Customization, deployment and ongoing technical support are separately quoted.

Included illustrative asset count: ${assets.length}.
`;
}

// Recalculate reachability after selecting the transport entry component. The
// initial dependency walk also saw its five sibling imports; those modules must
// not remain in a customer's download merely because they existed before pruning.
function pruneUnreachableTemplateSource(files) {
  const pending = [...files.keys()].filter((name) => /^app\/.*\.(?:tsx?|mjs)$/u.test(name));
  const reached = new Set();
  while (pending.length) {
    const name = pending.pop();
    if (reached.has(name)) continue;
    reached.add(name);
    const text = Buffer.from(files.get(name)).toString("utf8");
    const specifiers = [];
    if (name.endsWith(".css")) {
      for (const match of text.matchAll(/@import\s+["']([^"']+)["']/gu)) specifiers.push(match[1]);
    } else {
      const parsed = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true);
      const visit = (node) => {
        if (
          (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
          node.moduleSpecifier &&
          ts.isStringLiteral(node.moduleSpecifier)
        ) {
          specifiers.push(node.moduleSpecifier.text);
        }
        if (
          ts.isCallExpression(node) &&
          node.expression.kind === ts.SyntaxKind.ImportKeyword &&
          node.arguments.length === 1 &&
          ts.isStringLiteral(node.arguments[0])
        ) {
          specifiers.push(node.arguments[0].text);
        }
        ts.forEachChild(node, visit);
      };
      visit(parsed);
    }
    for (const specifier of specifiers) {
      const path = localImportPath(name, specifier);
      if (!path) continue;
      const candidates = extname(path)
        ? [path]
        : [".ts", ".tsx", ".mjs", ".css", "/index.ts", "/index.tsx"].map((suffix) => path + suffix);
      const target = candidates.find((candidate) => files.has(candidate));
      if (!target) throw new Error(`Unresolved customer import ${specifier} in ${name}.`);
      pending.push(target);
    }
  }
  for (const name of files.keys()) {
    if (
      /^src\/(?:components|data|lib|styles)\/.*\.(?:tsx?|mjs|css)$/u.test(name) &&
      !reached.has(name)
    ) {
      files.delete(name);
    }
  }
}

function packageEditingGuide(design, files) {
  const group = (prefix) =>
    [...files.keys()]
      .filter((name) => name.startsWith(prefix))
      .sort()
      .map((name) => `- \`${name}\``)
      .join("\n");
  return `# Editing ${design.name}

Start with \`README.md\` for installation and deployment. Edit one area at a time, then run \`npm run typecheck\` and \`npm run build\`.

## Identity and page content

\`src/config/site.ts\` owns the metadata name, description and generic email destination. It does not automatically replace every visible sample name or phone number. Update those values in the content and component files listed below, then search for the sample business name, \`example.com\`, sample locations and demonstration text before launch.

${group("src/data/")}

## Page layout and interactions

\`app/[[...view]]/page.tsx\` selects this website's pages; \`app/layout.tsx\` owns shared metadata, fonts and the sample notice. The components below supply the page sections and local interactions. Shared family components may retain conditional layouts and types for related styles; the selected content and routes determine this website.

${group("src/components/collection/")}

## Appearance

${group("src/styles/")}

Keep keyboard focus styles, reduced-motion handling and small-screen rules when changing the design. The supplied \`.editorconfig\` uses two spaces and LF line endings. The code is formatted for editing, not minified.

## Images and contact

Replace images under \`public/images/collection/\` and update matching paths and alternative text. \`ASSET-LICENSES.json\` records the supplied illustrative files and their hashes.

Sample contact forms remain local demonstrations. Changing an email setting does not connect form delivery. Replace direct-contact links with your own destinations or implement a protected backend/hosted form service, then test delivery. Keep the sample notice and noindex settings until the real content and behaviour are ready.
`;
}

const editorConfig = `root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
`;

const license = `${sourceLicense.title} — L&L Tech Solutions
Version ${sourceLicenseVersion}

${sourceLicense.points.map((point, index) => `${index + 1}. ${point}`).join("\n\n")}

Keep a private backup and your purchase receipt. Attribution on the public website is not required. Contractors may access the source solely to work on the licensed business website. Keep these licence terms with any permitted handoff.

The licence covers original template code and generated illustrative images identified in ASSET-LICENSES.json for use within the licensed website. It does not transfer ownership of L&L marks, client identities or third-party marks. Open-source packages and fonts retain their respective licences; those rights are not restricted by this licence.

Support covers download delivery and reproducible defects in the unchanged supplied package in the documented environment. Customization, deployment and ongoing technical support are separately quoted. Nothing in these terms removes rights the purchaser has under applicable law.
`;

export async function assembleSourcePackage(
  designId,
  { repository = root, sourceCommit, sourceDirty = true } = {},
) {
  const demo = packageDemos[designId];
  if (!demo || sourcePackageBlockedIds.has(designId))
    throw new Error(`No source package is offered for ${designId}.`);
  if (demo.reference)
    return assembleReferenceEdition(designId, { repository, sourceCommit, sourceDirty });
  const catalogue = await import(
    pathToFileURL(resolve(repository, "src/data/website-collection.ts"))
  );
  const design = catalogue.websiteDesigns.find((item) => item.id === designId);
  if (
    !design ||
    design.clientProjectId ||
    (design.independentConcept && designId !== "horizon") ||
    design.status === "client-example"
  )
    throw new Error(`Client/reference resale is blocked for ${designId}.`);
  const files = new Map();
  const pending = [];
  const put = (name, text) => {
    assertPackagePath(name);
    files.set(name, textBytes(text));
    pending.push(name);
  };
  const source = await readFile(resolve(repository, "src/data/website-collection.ts"), "utf8");
  put("src/data/website-collection.ts", customerData(catalogue, source, design));
  put(
    "src/config/site.ts",
    `// Replace these placeholders before launch.\nexport const customerSite = { name: ${JSON.stringify(design.concept?.brands[0] ?? design.name)}, description: ${JSON.stringify(design.description)}, email: "hello@example.com" };\nexport const customerContactHref = "mailto:" + customerSite.email;`,
  );
  for (const relative of await regularFiles(resolve(repository, "templates", demo.folder))) {
    if (!relative.startsWith("app/") || relative.endsWith("/layout.tsx")) continue;
    let bytes = await sourceFile(resolve(repository, "templates", demo.folder), relative);
    if (/\.(?:tsx?|mjs)$/u.test(relative))
      bytes = textBytes(stripSalesSource(Buffer.from(bytes).toString("utf8"), relative));
    files.set(relative, bytes);
    pending.push(relative);
  }
  put(
    "app/layout.tsx",
    packageLayout(
      await readFile(resolve(repository, "templates", demo.folder, "app/layout.tsx"), "utf8"),
      design,
    ),
  );
  put(
    "app/source-preview.css",
    `.source-preview-note{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 5%;font:inherit;font-size:.8rem;background:#f5f5f2;color:#303030;border-top:1px solid #ccc}.source-preview-note span{max-width:65ch}.source-preview-note .motion-toggle{color:inherit;border-color:currentColor}@media(max-width:600px){.source-preview-note{align-items:flex-start;flex-direction:column}}`,
  );
  put(
    "app/icon.svg",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#182733"/><path d="M14 21h36v5H14zm0 12h24v5H14zm0 12h36v5H14z" fill="#fff"/></svg>`,
  );

  const visited = new Set();
  while (pending.length) {
    const filename = pending.pop();
    if (visited.has(filename)) continue;
    visited.add(filename);
    const bytes = files.get(filename);
    if (!/\.(?:tsx?|css|mjs)$/u.test(filename)) continue;
    const text = Buffer.from(bytes).toString("utf8");
    const imports =
      extname(filename) === ".css"
        ? [...text.matchAll(/@import\s+["']([^"']+)["']/gu)].map((match) => match[1])
        : [
            ...ts.createSourceFile(
              filename,
              text,
              ts.ScriptTarget.Latest,
              true,
              filename.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
            ).statements,
          ]
            .filter((node) => ts.isImportDeclaration(node) || ts.isExportDeclaration(node))
            .map((node) => node.moduleSpecifier)
            .filter((node) => node && ts.isStringLiteral(node))
            .map((node) => node.text);
    for (const specifier of imports) {
      const path = localImportPath(filename, specifier);
      if (!path) continue;
      const candidates = extname(path)
        ? [path]
        : [
            path + ".ts",
            path + ".tsx",
            path + ".mjs",
            path + ".css",
            path + "/index.ts",
            path + "/index.tsx",
          ];
      let target = candidates.find((item) => files.has(item));
      if (!target)
        for (const candidate of candidates) {
          try {
            if ((await stat(resolve(repository, candidate))).isFile()) {
              target = candidate;
              break;
            }
          } catch {
            /* Try the next extension. */
          }
        }
      if (!target) throw new Error(`Unresolved source dependency ${specifier} in ${filename}.`);
      if (files.has(target)) continue;
      if (!/^(?:src\/(?:components\/(?:collection|ui)|data|styles|lib)\/|app\/)/u.test(target))
        throw new Error(`Dependency escapes template source: ${target}`);
      let copied = await sourceFile(repository, target);
      if (/\.(?:tsx?|mjs)$/u.test(target))
        copied = textBytes(stripSalesSource(Buffer.from(copied).toString("utf8"), target));
      files.set(target, copied);
      pending.push(target);
    }
  }
  // Transport's maintained router imports six sibling demos. Keep the selected
  // source component only rather than selling the entire category in one ZIP.
  const transportComponents = {
    "courier-one-page": "CourierTemplate",
    "moving-company": "MovingTemplate",
    "auto-transport": "AutoTransportTemplate",
    "equipment-rentals": "EquipmentRentalsTemplate",
    "cold-chain": "ColdChainTemplate",
    "freight-logistics": "FreightTemplate",
  };
  if (transportComponents[designId]) {
    const selected = transportComponents[designId];
    put(
      "src/components/collection/TransportTemplate.tsx",
      `import type { TransportTemplate as Template } from "@/data/website-collection";\nimport SelectedTemplate from "./${selected}";\nexport default function TransportTemplate(props: { template: Template; page: string; enquiryHref: string }) { return <SelectedTemplate {...props} />; }`,
    );
    for (const component of Object.values(transportComponents))
      if (component !== selected) files.delete(`src/components/collection/${component}.tsx`);
  }
  pruneUnreachableTemplateSource(files);

  const assets = [];
  const requestedAssets = new Set();
  for (const [filename, bytes] of files) {
    if (!/\.(?:tsx?|css)$/u.test(filename)) continue;
    const text = Buffer.from(bytes).toString("utf8");
    for (const match of text.matchAll(/\/images\/collection\/([a-z0-9-]+\.webp)/gu))
      requestedAssets.add(match[1]);
  }
  const substituted = [];
  for (const filename of [...requestedAssets].sort()) {
    const original = replacements[filename] ?? filename;
    const provenance = assetProvenance(original);
    if (!provenance)
      throw new Error(`Asset has no approved redistribution provenance: ${filename}`);
    await stat(resolve(repository, provenance));
    const bytes = await sourceFile(repository, `public/images/collection/${original}`);
    files.set(`public/images/collection/${filename}`, bytes);
    assets.push({
      path: `public/images/collection/${filename}`,
      sha256: sha256(bytes),
      kind: "generated-illustrative",
      sourceAsset: original,
      provenance,
      usage: "Included for use within the licensed business website. Not a real client photograph.",
    });
    if (filename !== original) substituted.push(filename);
  }
  const assetNote = substituted.length
    ? "Source download includes neutral generated sample images in place of some live-demo photographs. The layout and effects are included; those pictures differ from the preview and can be replaced with your own supplied images."
    : "";
  put(
    "ASSET-LICENSES.json",
    JSON.stringify({ schemaVersion: 1, designId, assetNote, assets }, null, 2),
  );
  put("README.md", packageReadme(design, demo, assets, assetNote));
  put("EDITING.md", packageEditingGuide(design, files));
  put(".editorconfig", editorConfig);
  put("LICENSE.txt", license);
  for (const [name, font] of Object.entries(sourceFontLicenses)) {
    put(`licenses/${name}-OFL.txt`, font.text);
  }
  put(
    "THIRD-PARTY-NOTICES.md",
    "# Third-party notices\n\nNext.js, React, Tailwind CSS, TypeScript, PostCSS and their dependencies are installed by npm and remain under their upstream licences. Their notices are available in the installed node_modules packages; preserve them when redistributing where required. Google fonts are fetched and self-hosted by Next.js during builds, under their respective open font licences. The original Geist and Cormorant Garamond SIL Open Font License notices are included in licenses/ and must accompany any redistributed font files. This purchase does not transfer ownership of those projects. L&L's single-business restriction applies only to the original template and identified generated imagery, not to independently licensed open-source code.\n",
  );
  put(
    ".env.example",
    "# This static source package needs no environment variables.\n# Sample forms do not deliver email. A separate backend/provider must be configured.\n# Never place secret keys in NEXT_PUBLIC_ variables or commit .env.local.\n",
  );
  put(
    ".gitignore",
    "node_modules/\n.next/\nout/\n.vercel/\n.env*\n!.env.example\n*.tsbuildinfo\nnext-env.d.ts\n",
  );
  const { pkg, lock } = customerPackage(
    JSON.parse(await readFile(resolve(repository, "package.json"), "utf8")),
    JSON.parse(await readFile(resolve(repository, "package-lock.json"), "utf8")),
    designId,
  );
  put("package.json", JSON.stringify(pkg, null, 2));
  put("package-lock.json", JSON.stringify(lock, null, 2));
  for (const file of [
    "postcss.config.mjs",
    "tsconfig.json",
    "scripts/lib/static-export-segments.mjs",
  ])
    files.set(file, await sourceFile(repository, file));
  const customerTsconfig = JSON.parse(Buffer.from(files.get("tsconfig.json")).toString("utf8"));
  customerTsconfig.exclude = ["node_modules"];
  put("tsconfig.json", JSON.stringify(customerTsconfig, null, 2));
  put(
    "next.config.ts",
    'import type { NextConfig } from "next";\nconst config: NextConfig = { output: "export", images: { unoptimized: true }, poweredByHeader: false, turbopack: { root: process.cwd() } };\nexport default config;',
  );
  put(
    "scripts/normalize-export.mjs",
    `import { rename } from "node:fs/promises";\nimport { resolve } from "node:path";\nimport { normalizeStaticExportSegments } from "./lib/static-export-segments.mjs";\nawait normalizeStaticExportSegments({ projectDirectory: process.cwd(), routes: ${JSON.stringify([...demo.routes, "/_not-found"])} });\nawait rename(resolve("out/wellness-segments.json"), resolve("out/static-segments.json"));`,
  );
  const vercel = JSON.parse(
    await readFile(resolve(repository, "templates", demo.folder, "vercel.json"), "utf8"),
  );
  put(
    "vercel.json",
    JSON.stringify(
      {
        ...vercel,
        framework: null,
        installCommand: "npm ci",
        buildCommand: "npm run build",
        outputDirectory: "out",
      },
      null,
      2,
    ),
  );
  await formatSourceFiles(files);
  const version = sha256(
    Buffer.concat(
      [...files.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, bytes]) => Buffer.concat([Buffer.from(name + "\0"), Buffer.from(bytes)])),
    ),
  );
  put(
    "TEMPLATE-PACKAGE.json",
    JSON.stringify(
      {
        schemaVersion: 1,
        designId,
        version,
        sourceCommit: sourceCommit ?? "unrecorded",
        sourceDirty,
        routes: demo.routes,
        contactMode: "local-demo-only",
        assetNote,
      },
      null,
      2,
    ),
  );
  await formatSourceFiles(files);
  const archive = createSourceArchive(files);
  const digest = sha256(archive);
  return {
    files,
    archive,
    manifest: {
      designId,
      version,
      filename: `${designId}.zip`,
      sha256: digest,
      bytes: archive.length,
      sourceCommit: sourceCommit ?? "unrecorded",
      sourceDirty,
      key: `source-packages/${designId}/${digest}/${designId}.zip`,
      assetNote,
    },
  };
}

export function assertSourceBuildState({ repository = root, expectedCommit, gitOutput } = {}) {
  const readGit =
    gitOutput ?? ((args) => execFileSync("git", args, { cwd: repository, encoding: "utf8" }));
  const status = readGit(["status", "--porcelain=v1", "--untracked-files=all"]).trim();
  if (status)
    throw new Error(
      "Source package builds require a clean Git working tree, including untracked files. Commit the reviewed source changes first.",
    );
  const commit = readGit(["rev-parse", "HEAD"]).trim();
  if (!/^[a-f0-9]{40}$/u.test(commit)) throw new Error("Cannot identify the source commit.");
  if (expectedCommit && commit !== expectedCommit)
    throw new Error("Git HEAD changed during packaging. Rebuild from one clean source commit.");
  return commit;
}

/** Package only a separately maintained customer edition, never a client checkout. */
async function assembleReferenceEdition(designId, { repository, sourceCommit, sourceDirty }) {
  const demo = referenceEditions[designId];
  const directory = resolve(repository, "templates", demo.folder);
  const edition = JSON.parse(await readFile(resolve(directory, "edition.json"), "utf8"));
  if (
    !Array.isArray(edition.routes) ||
    !edition.routes.includes("/") ||
    edition.routes.some(
      (route) => typeof route !== "string" || !/^\/(?:[a-z0-9-]+\/?)*$/u.test(route),
    ) ||
    new Set(edition.routes).size !== edition.routes.length ||
    typeof edition.assetNote !== "string" ||
    !edition.assetNote.trim() ||
    edition.assetNote.length > 1000 ||
    !Array.isArray(edition.assets)
  )
    throw new Error(`Incomplete customer edition metadata: ${designId}`);
  const files = new Map();
  const put = (name, value) => files.set(assertPackagePath(name), textBytes(value));
  const permittedRootFiles = new Set([
    "README.md",
    "EDITING.md",
    "SOURCE-GUIDE.md",
    "postcss.config.mjs",
    "tsconfig.json",
  ]);
  const ignored = new Set([
    "edition.json",
    "package.json",
    "package-lock.json",
    "next.config.ts",
    "vercel.json",
    ".gitignore",
    ".env.example",
    "next-env.d.ts",
    "tsconfig.tsbuildinfo",
  ]);
  // Local verification outputs never enter an edition archive. All remaining
  // files still pass the explicit source allowlist and the final archive audit.
  const excludedDirectories = new Set([".next", "out", "node_modules"]);
  for (const name of await regularFiles(directory, "", excludedDirectories)) {
    if (ignored.has(name)) continue;
    assertPackagePath(name);
    if (
      !/^(?:src|app|public|components|data|lib|utils)\//u.test(name) &&
      !permittedRootFiles.has(name)
    )
      throw new Error(`Unreviewed reference-edition file: ${name}`);
    if (/^(?:src\/)?app\/api\//u.test(name))
      throw new Error(`Live API route is not part of this static edition: ${name}`);
    const destination = ["README.md", "SOURCE-GUIDE.md"].includes(name) ? "EDITING.md" : name;
    if (files.has(destination)) throw new Error(`Conflicting edition guide: ${name}`);
    const contents = await sourceFile(directory, name);
    if (destination === "EDITING.md") {
      put(
        destination,
        Buffer.from(contents)
          .toString("utf8")
          .replaceAll("Node.js 22 or newer", "Node.js 22.18 or newer")
          .replaceAll("npm install", "npm ci"),
      );
    } else {
      files.set(destination, contents);
    }
  }
  if (!files.has("EDITING.md")) throw new Error(`Missing customer editing guide: ${designId}`);
  if (
    sourceProducts.find((item) => item.designId === designId)?.pageCount !== edition.routes.length
  )
    throw new Error(`Storefront page count differs from source edition: ${designId}`);
  const assets = [];
  const declared = new Set();
  for (const item of edition.assets) {
    assertPackagePath(item.path);
    assertPackagePath(item.sourceAsset);
    if (
      declared.has(item.path) ||
      !item.path.startsWith("public/") ||
      !/^public\/images\/collection\/[a-z0-9-]+\.webp$/u.test(item.sourceAsset)
    )
      throw new Error(`Invalid edition asset: ${item.path}`);
    declared.add(item.path);
    const provenance = assetProvenance(item.sourceAsset.split("/").pop());
    if (!provenance) throw new Error(`Unverified edition imagery: ${item.sourceAsset}`);
    await stat(resolve(repository, provenance));
    const original = await sourceFile(repository, item.sourceAsset);
    const included = files.get(item.path);
    if (!included || sha256(original) !== sha256(included))
      throw new Error(`Edition asset differs from its approved sample: ${item.path}`);
    assets.push({
      path: item.path,
      sha256: sha256(included),
      kind: "generated-illustrative",
      sourceAsset: item.sourceAsset,
      provenance,
    });
  }
  for (const name of files.keys()) {
    if (/\.(?:png|webp|jpg|jpeg|ico|woff2?|mp4|mov)$/iu.test(name) && !declared.has(name))
      throw new Error(`Undeclared reference-edition binary: ${name}`);
  }
  const { websiteDesigns } = await import(
    pathToFileURL(resolve(repository, "src/data/website-collection.ts"))
  );
  const design = websiteDesigns.find((item) => item.id === designId);
  if (!design) throw new Error(`Unknown reference edition: ${designId}`);
  const { pkg, lock } = customerPackage(
    JSON.parse(await readFile(resolve(repository, "package.json"), "utf8")),
    JSON.parse(await readFile(resolve(repository, "package-lock.json"), "utf8")),
    designId,
  );
  put("package.json", JSON.stringify(pkg, null, 2));
  put("package-lock.json", JSON.stringify(lock, null, 2));
  put(
    "README.md",
    `# ${design.name} — editable source edition

This download contains ${edition.routes.length} website pages: ${edition.routes.join(", ")}.
${edition.assetNote}

## Start locally

Install Node.js 22.18 or newer, then run these commands inside the extracted folder:

\`\`\`sh
npm ci
npm run typecheck
npm run build
npm run dev
\`\`\`

Open the localhost address printed by the development server. The production static website is generated in \`out/\`.

## Make it yours

Follow \`EDITING.md\` for the exact branding, content, image and styling files. The source retains the reference design's layout with fictional sample information. Replace that information with your own business content. Included generated images are identified in \`ASSET-LICENSES.json\`; no original client photographs or logos are included.

Contact forms and booking examples are demonstrations. They do not send email, reserve appointments or connect to the original business. Set up your own contact details or form/booking provider before launch. API/email integration and ongoing support are outside this code-only purchase. Keep secret keys server-side and out of version control.

## Launch

Create a separate Vercel project for your business, framework Other, install command \`npm ci\`, build command \`npm run build\`, output directory \`out\`. The supplied vercel.json and static export normalizer support that setup, including Windows builds. Other static hosts can serve the same output with equivalent route handling and response headers.

Sample editions start with noindex. When your domain, real content, contact methods and privacy information are ready, update robots metadata in the app layout and remove the noindex header from vercel.json. Set your own metadata, canonical URLs and sharing images. Review all pages on mobile and desktop, keyboard access, reduced motion and actual contact delivery before making the site public.

## Licence and help

Read LICENSE.txt and THIRD-PARTY-NOTICES.md. One purchase covers one business website and staging copies. This is a non-exclusive source licence, not a transfer of the reference company's identity or media. Hosting, domains, personalization, provider fees and ongoing care are separate. Keep a private backup and your purchase receipt. Contact L&L with your order reference for file-delivery problems; do not send passwords or API keys.
`,
  );
  put("LICENSE.txt", license);
  put(".editorconfig", editorConfig);
  put(
    ".env.example",
    "# Static sample website. No credentials are included or required.\n# Configure your own contact/booking provider separately before enabling real delivery.\n",
  );
  put(
    ".gitignore",
    "node_modules/\n.next/\nout/\n.vercel/\n.env*\n!.env.example\n*.tsbuildinfo\nnext-env.d.ts\n",
  );
  put(
    "ASSET-LICENSES.json",
    JSON.stringify({ schemaVersion: 1, designId, assetNote: edition.assetNote, assets }, null, 2),
  );
  for (const [name, font] of Object.entries(sourceFontLicenses))
    put(`licenses/${name}-OFL.txt`, font.text);
  put(
    "THIRD-PARTY-NOTICES.md",
    "# Third-party notices\n\nNext.js, React, Tailwind CSS, TypeScript and their dependencies retain their upstream licences. Preserve the notices delivered by npm. Geist and Cormorant Garamond OFL notices are included for any applicable fonts. This source edition excludes the reference business's logos, original photographs, videos, testimonials and live integrations.\n",
  );
  put(
    "next.config.ts",
    'import type { NextConfig } from "next";\nconst config: NextConfig = { output: "export", images: { unoptimized: true }, poweredByHeader: false, turbopack: { root: process.cwd() } };\nexport default config;\n',
  );
  files.set(
    "scripts/lib/static-export-segments.mjs",
    await sourceFile(repository, "scripts/lib/static-export-segments.mjs"),
  );
  put(
    "scripts/normalize-export.mjs",
    `import { rename } from "node:fs/promises";\nimport { resolve } from "node:path";\nimport { normalizeStaticExportSegments } from "./lib/static-export-segments.mjs";\nawait normalizeStaticExportSegments({ projectDirectory: process.cwd(), routes: ${JSON.stringify([...edition.routes, "/_not-found"])} });\nawait rename(resolve("out/wellness-segments.json"), resolve("out/static-segments.json"));\n`,
  );
  const headers = JSON.parse(
    await readFile(resolve(repository, "templates/horizon-demo/vercel.json"), "utf8"),
  );
  put(
    "vercel.json",
    JSON.stringify(
      {
        ...headers,
        framework: null,
        installCommand: "npm ci",
        buildCommand: "npm run build",
        outputDirectory: "out",
      },
      null,
      2,
    ),
  );
  await formatSourceFiles(files);
  const version = sha256(
    Buffer.concat(
      [...files.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, bytes]) => Buffer.concat([Buffer.from(name + "\0"), Buffer.from(bytes)])),
    ),
  );
  put(
    "TEMPLATE-PACKAGE.json",
    JSON.stringify(
      {
        schemaVersion: 1,
        designId,
        version,
        sourceCommit: sourceCommit ?? "unrecorded",
        sourceDirty,
        routes: edition.routes,
        contactMode: "local-demo-only",
        assetNote: edition.assetNote,
      },
      null,
      2,
    ),
  );
  await formatSourceFiles(files);
  const archive = createSourceArchive(files);
  const digest = sha256(archive);
  return {
    files,
    archive,
    manifest: {
      designId,
      version,
      filename: `${designId}.zip`,
      sha256: digest,
      bytes: archive.length,
      sourceCommit: sourceCommit ?? "unrecorded",
      sourceDirty,
      key: `source-packages/${designId}/${digest}/${designId}.zip`,
      assetNote: edition.assetNote,
    },
  };
}

async function main() {
  const { values } = parseArgs({
    options: {
      design: { type: "string", multiple: true },
      "output-dir": { type: "string" },
      unpack: { type: "boolean", default: false },
    },
    strict: true,
  });
  const output = resolve(values["output-dir"] ?? resolve(root, "build/source-packages"));
  const withinBuild = relative(resolve(root, "build"), output);
  if (
    !withinBuild ||
    withinBuild === ".." ||
    withinBuild.startsWith(`..${sep}`) ||
    isAbsolute(withinBuild)
  )
    throw new Error("Source archives must stay inside this repository's ignored build directory.");
  const sourceCommit = assertSourceBuildState();
  const ids = values.design ?? Object.keys(packageDemos);
  if (new Set(ids).size !== ids.length) throw new Error("Duplicate design selection.");
  await mkdir(output, { recursive: true });
  const packages = [];
  for (const id of ids) {
    const result = await assembleSourcePackage(id, { sourceCommit, sourceDirty: false });
    const folder = resolve(output, id, result.manifest.sha256);
    await mkdir(folder, { recursive: true });
    await writeFile(resolve(folder, result.manifest.filename), result.archive, { flag: "w" });
    if (values.unpack)
      for (const [name, bytes] of result.files) {
        const destination = resolve(output, "unpacked", id, name);
        await mkdir(dirname(destination), { recursive: true });
        await writeFile(destination, bytes);
      }
    packages.push(result.manifest);
    console.log(
      `PACKAGED ${id}: ${result.manifest.bytes} bytes, ${result.files.size} files, SHA256 ${result.manifest.sha256}`,
    );
  }
  assertSourceBuildState({ expectedCommit: sourceCommit });
  await writeFile(
    resolve(output, "manifest.json"),
    JSON.stringify({ schemaVersion: 1, packages }, null, 2) + "\n",
  );
  for (const product of sourceProducts) {
    if (!packageDemos[product.designId])
      console.log(
        `SOURCE STILL NEEDED: ${product.designId}. No archive or checkout availability was fabricated.`,
      );
  }
  console.log(
    `Private source manifest: ${resolve(output, "manifest.json")}. No objects uploaded; no storefront availability changed.`,
  );
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
