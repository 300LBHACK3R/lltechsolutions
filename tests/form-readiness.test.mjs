import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, readFileSync } from "node:fs";
import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

// Render the real components, including their actual server hydration snapshot.
const sourceRoot = new URL("../src/", import.meta.url);
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "next/link") return nextResolve("next/link.js", context);
    if (specifier.startsWith("@/")) {
      for (const extension of [".ts", ".tsx"]) {
        const url = new URL(`${specifier.slice(2)}${extension}`, sourceRoot);
        if (existsSync(url)) return nextResolve(url.href, context);
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.startsWith(sourceRoot.href) && /\.tsx?$/u.test(url)) {
      const { outputText } = ts.transpileModule(readFileSync(new URL(url), "utf8"), {
        fileName: fileURLToPath(url),
        compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
      });
      return { format: "module", source: outputText, shortCircuit: true };
    }
    return nextLoad(url, context);
  },
});

let ContactForm, ManagedCheckout, SourceCheckout;
try {
  ContactForm = (await import("../src/components/contact/ContactForm.tsx")).default;
  ManagedCheckout = (await import("../src/components/collection/ManagedTemplateCheckout.tsx"))
    .default;
  SourceCheckout = (await import("../src/components/collection/SourceCheckout.tsx")).default;
} finally {
  hooks.deregister();
}

for (const [name, Component, props, endpoint, fields] of [
  ["enquiry", ContactForm, {}, "/api/contact", true],
  [
    "managed checkout",
    ManagedCheckout,
    {
      designId: "pigment",
      name: "Painting Company",
      regularPriceCad: 399,
      initialSaleActive: true,
      inquiryHref: "/contact",
    },
    "/api/template-purchases/checkout",
    true,
  ],
  [
    "source checkout",
    SourceCheckout,
    { designId: "pigment", priceCad: 99 },
    "/api/source-purchases/checkout",
    false,
  ],
]) {
  test(`${name} cannot submit before hydration or leak fields through a native GET`, () => {
    const html = renderToStaticMarkup(createElement(Component, props));
    const form = html.match(/<form\b[^>]*>/u)?.[0];
    assert.ok(form?.includes('method="post"'));
    assert.ok(form.includes(`action="${endpoint}"`));
    assert.match(html, /needs JavaScript/u);
    assert.match(html, /href="mailto:LandLTechSolutions@protonmail.com"/u);
    if (fields) {
      const fieldset = html.match(/<fieldset\b[^>]*disabled=""[^>]*>([\s\S]*?)<\/fieldset>/u);
      assert.ok(fieldset, "all personal fields and submit action are disabled on the server");
      assert.ok(fieldset[1].includes('type="submit"'));
      assert.equal((html.replace(fieldset[0], "").match(/\bname="/gu) ?? []).length, 0);
    } else {
      for (const control of html.match(/<(?:input|button)\b[^>]*>/gu) ?? [])
        assert.match(control, /\bdisabled=""/u);
    }
  });
}
