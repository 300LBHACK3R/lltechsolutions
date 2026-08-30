import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const sourceRoot = join(projectRoot, "src");
const publicRoot = join(projectRoot, "public");
const sourceExtensions = new Set([".ts", ".tsx", ".mjs"]);

const requiredPaths = [
  ".editorconfig",
  ".gitattributes",
  ".github/dependabot.yml",
  ".github/workflows/ci.yml",
  ".nvmrc",
  "AGENTS.md",
  "CHANGELOG.md",
  "README.md",
  "SECURITY.md",
  ".github/CODEOWNERS",
  ".github/pull_request_template.md",
  "docs/ARCHITECTURE.md",
  "docs/RELEASE_CHECKLIST.md",
  "docs/SEO_SECURITY_AUDIT.md",
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/services/page.tsx",
  "src/app/projects/page.tsx",
  "src/app/process/page.tsx",
  "src/app/packages/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/security/page.tsx",
  "src/app/api/contact/route.ts",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
  "src/app/manifest.ts",
  "src/components/layout/SiteHeader.tsx",
  "src/components/layout/SiteFooter.tsx",
  "src/components/contact/ProjectInquiryForm.tsx",
  "src/components/seo/StructuredData.tsx",
  "src/data/services.ts",
  "src/lib/projects.ts",
  "src/styles/globals.css",
  "public/brand/logo-mark.webp",
  "public/images/projects/tow-n-go.webp",
  "public/images/projects/crestline.webp",
  "public/images/projects/mckenzie-house.webp",
  "public/images/projects/tates-tv.webp",
  "public/images/projects/tate-byers.webp",
];

const prohibitedPaths = [
  "src/_archive",
  "src/.eslintrc.json",
  "src/data/projects.ts",
  "src/components/forms/ContactForm.tsx",
  "src/components/navigation/ScrollSpyNav.tsx",
  "src/components/home/ServiceScroller.tsx",
  "src/components/home/Projects.tsx",
  "src/components/home/Proof.tsx",
  "src/components/home/ContactSection.tsx",
  "src/components/seo/BusinessJsonLd.tsx",
  "src/proxy.ts",
  "src/app/projects/infrastructure",
  "src/app/projects/tech-support",
  "public/images/hero/tech-hero.jpg",
  "public/images/projects/cctv-network.png",
  "public/images/projects/rack-cleanup.jpg",
  "public/images/projects/seo-cleanup.jpg",
  "public/images/projects/tech-support.jpg",
  "public/brand/logo.jpg",
  "public/icons",
  "public/images/projects/tow-n-go.jpg",
  "public/images/projects/crestline.jpg",
  "public/images/projects/mckenzie-house.jpg",
  "public/images/projects/tates-tv.jpg",
  "tsconfig.tsbuildinfo",
];

const allowedServiceIds = [
  "website-design",
  "software-development",
  "social-media",
];

const forbiddenPublicPhrases = [
  "Remote IT",
  "Network Infrastructure",
  "Low-Voltage",
  "Cat6",
  "CCTV",
];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = join(directory, entry.name);
    return entry.isDirectory() ? walk(absolutePath) : [absolutePath];
  });
}

function projectPath(absolutePath) {
  return relative(projectRoot, absolutePath).replaceAll("\\", "/");
}

function fail(messages) {
  for (const message of messages) {
    console.error(`✖ ${message}`);
  }

  process.exit(1);
}

const errors = [];

for (const path of requiredPaths) {
  if (!existsSync(join(projectRoot, path))) {
    errors.push(`Required path is missing: ${path}`);
  }
}

for (const path of prohibitedPaths) {
  if (existsSync(join(projectRoot, path))) {
    errors.push(`Obsolete path must be removed: ${path}`);
  }
}

const sourceFiles = walk(sourceRoot).filter((path) =>
  sourceExtensions.has(extname(path)),
);
const sourceByPath = new Map(
  sourceFiles.map((path) => [projectPath(path), path]),
);
const importPattern = /(?:import|export)\s+(?:[^"']*?\s+from\s+)?["']([^"']+)["']/g;
const dependencies = new Map();

function resolveModule(fromAbsolutePath, specifier) {
  let basePath;

  if (specifier.startsWith("@/")) {
    basePath = join(sourceRoot, specifier.slice(2));
  } else if (specifier.startsWith(".")) {
    basePath = resolve(fromAbsolutePath, "..", specifier);
  } else {
    return null;
  }

  const candidates = [
    basePath,
    `${basePath}.ts`,
    `${basePath}.tsx`,
    `${basePath}.mjs`,
    join(basePath, "index.ts"),
    join(basePath, "index.tsx"),
  ];

  return candidates.find((candidate) => existsSync(candidate)) ?? null;
}

for (const absolutePath of sourceFiles) {
  const content = readFileSync(absolutePath, "utf8");
  const resolvedDependencies = [];

  for (const match of content.matchAll(importPattern)) {
    const specifier = match[1];
    const resolvedModule = resolveModule(absolutePath, specifier);

    if (specifier.startsWith("@/") || specifier.startsWith(".")) {
      if (!resolvedModule) {
        errors.push(
          `Unresolved import in ${projectPath(absolutePath)}: ${specifier}`,
        );
      } else if (sourceExtensions.has(extname(resolvedModule))) {
        resolvedDependencies.push(projectPath(resolvedModule));
      }
    }
  }

  dependencies.set(projectPath(absolutePath), resolvedDependencies);
}

const entryPointPatterns = [
  /\/layout\.tsx$/,
  /\/page\.tsx$/,
  /\/route\.ts$/,
  /\/error\.tsx$/,
  /\/not-found\.tsx$/,
  /\/robots\.ts$/,
  /\/sitemap\.ts$/,
  /\/manifest\.ts$/,
];
const reachable = new Set(
  [...sourceByPath.keys()].filter(
    (path) => path.startsWith("src/app/") && entryPointPatterns.some((pattern) => pattern.test(path)),
  ),
);
const queue = [...reachable];

while (queue.length > 0) {
  const current = queue.shift();

  for (const dependency of dependencies.get(current) ?? []) {
    if (!reachable.has(dependency)) {
      reachable.add(dependency);
      queue.push(dependency);
    }
  }
}

for (const path of sourceByPath.keys()) {
  if (path.startsWith("src/") && !reachable.has(path)) {
    errors.push(`Unreferenced source module: ${path}`);
  }
}

const servicesSource = readFileSync(
  join(projectRoot, "src/data/services.ts"),
  "utf8",
);
const serviceIds = [...servicesSource.matchAll(/\bid:\s*"([^"]+)"/g)].map(
  ([, id]) => id,
);

if (JSON.stringify(serviceIds) !== JSON.stringify(allowedServiceIds)) {
  errors.push(
    `Service catalogue must contain exactly ${allowedServiceIds.join(", ")}; found ${serviceIds.join(", ") || "none"}`,
  );
}


const siteConfigSource = readFileSync(
  join(projectRoot, "src/config/site.ts"),
  "utf8",
);
const publicServiceMatch = siteConfigSource.match(
  /services:\s*\[([\s\S]*?)\],\s*socialLinks:/,
);
const publicServiceLabels = publicServiceMatch
  ? [...publicServiceMatch[1].matchAll(/"([^"]+)"/g)].map(([, label]) => label)
  : [];
const expectedPublicServiceLabels = [
  "Website Design & Development",
  "Software Design & Development",
  "Social Media Management",
];

if (
  JSON.stringify(publicServiceLabels) !==
  JSON.stringify(expectedPublicServiceLabels)
) {
  errors.push(
    `Public service configuration must contain exactly the three approved services; found ${publicServiceLabels.join(", ") || "none"}`,
  );
}

const contactSource = readFileSync(
  join(projectRoot, "src/data/contact.ts"),
  "utf8",
);
const contactOptionsMatch = contactSource.match(
  /serviceOptions\s*=\s*\[([\s\S]*?)\]\s*as const/,
);
const contactOptions = contactOptionsMatch
  ? [...contactOptionsMatch[1].matchAll(/"([^"]+)"/g)].map(([, label]) => label)
  : [];
const expectedContactOptions = [
  ...expectedPublicServiceLabels,
  "Not Sure — Project Consultation",
];

if (JSON.stringify(contactOptions) !== JSON.stringify(expectedContactOptions)) {
  errors.push(
    `Contact service choices must match the three-service public scope plus consultation; found ${contactOptions.join(", ") || "none"}`,
  );
}

const siteHeaderSource = readFileSync(
  join(projectRoot, "src/components/layout/SiteHeader.tsx"),
  "utf8",
);

if (
  !siteHeaderSource.includes('pathname === "/"') ||
  !siteHeaderSource.includes('item.href !== "/"') ||
  !siteHeaderSource.includes("visibleNavigation.map")
) {
  errors.push(
    "SiteHeader must hide the Home navigation item while the visitor is already on the homepage.",
  );
}

const publicFacingFiles = sourceFiles.filter(
  (path) =>
    !projectPath(path).includes("/api/") &&
    !projectPath(path).includes("/legal/"),
);
const publicFacingSource = publicFacingFiles
  .map((path) => readFileSync(path, "utf8"))
  .join("\n");

for (const phrase of forbiddenPublicPhrases) {
  if (publicFacingSource.includes(phrase)) {
    errors.push(`Legacy public service wording remains: ${phrase}`);
  }
}

const localAssetPattern = /["'`](\/(?:brand|images)\/[^"'`?#]+)["'`]/g;
for (const match of publicFacingSource.matchAll(localAssetPattern)) {
  const assetPath = join(publicRoot, match[1].slice(1));

  if (!existsSync(assetPath)) {
    errors.push(`Referenced public asset is missing: ${match[1]}`);
  }
}

for (const imagePath of walk(publicRoot).filter((path) =>
  [".png", ".jpg", ".jpeg", ".webp", ".avif"].includes(
    extname(path).toLowerCase(),
  ),
)) {
  const size = statSync(imagePath).size;

  if (size > 1_500_000) {
    errors.push(
      `Image exceeds the 1.5 MB project limit: ${projectPath(imagePath)} (${Math.round(size / 1024)} KB)`,
    );
  }
}

const packageJson = JSON.parse(
  readFileSync(join(projectRoot, "package.json"), "utf8"),
);
const requiredScripts = [
  "validate",
  "lint",
  "typecheck",
  "build",
  "check",
];

for (const script of requiredScripts) {
  if (typeof packageJson.scripts?.[script] !== "string") {
    errors.push(`Required package script is missing: ${script}`);
  }
}

for (const dependency of ["next", "react", "react-dom", "resend"]) {
  const version = packageJson.dependencies?.[dependency];

  if (typeof version !== "string" || version.startsWith("^") || version.startsWith("~")) {
    errors.push(`Production dependency must be pinned exactly: ${dependency}`);
  }
}

const projectsSource = readFileSync(
  join(projectRoot, "src/lib/projects.ts"),
  "utf8",
);
const requiredProjectTitles = [
  "Tow-N-Go Trailers Website",
  "Crestline Painting",
  "McKenzie House Massage",
  "TateByers.ca",
  "Tate's TV",
  "Tow-N-Go Digital Management",
  "McKenzie House Massage Digital Launch",
];

for (const title of requiredProjectTitles) {
  if (!projectsSource.includes(`title: "${title}"`)) {
    errors.push(`Required project is missing from the portfolio: ${title}`);
  }
}

if (errors.length > 0) {
  fail(errors);
}

console.log(
  `✓ Project structure validated (${sourceFiles.length} source modules, ${requiredPaths.length} required paths).`,
);
