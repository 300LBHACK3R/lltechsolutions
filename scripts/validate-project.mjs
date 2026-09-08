import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const name = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(name);
    else files.push(name);
  }
}
walk("src");
const errors = [];
for (const name of files.filter((name) => /\.(tsx?|css)$/.test(name))) {
  const text = fs.readFileSync(name, "utf8");
  for (const [, asset] of text.matchAll(/["'`](\/(?:images|brand|media)\/[^"'`\s]+)["'`]/g)) {
    if (!fs.existsSync(path.join("public", asset))) errors.push(`${name}: missing asset ${asset}`);
  }
  if (!/\.tsx?$/.test(name)) continue;
  const source = ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true);
  function visit(node) {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const specifier = node.moduleSpecifier.text;
      if (specifier.startsWith("@/") || specifier.startsWith(".")) {
        const base = specifier.startsWith("@/")
          ? path.join("src", specifier.slice(2))
          : path.join(path.dirname(name), specifier);
        if (
          ![
            base,
            ...[".ts", ".tsx", ".css", "/index.ts", "/index.tsx"].map((ext) => base + ext),
          ].some((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile())
        )
          errors.push(`${name}: unresolved ${specifier}`);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
for (const obsolete of [
  "src/_archive/page-old.tsx",
  "src/lib/projects.ts",
  "src/proxy.ts",
  "src/components/forms/ContactForm.tsx",
]) {
  if (fs.existsSync(obsolete)) errors.push(`Obsolete duplicate restored: ${obsolete}`);
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Validated imports and local asset references across ${files.length} source files.`);
