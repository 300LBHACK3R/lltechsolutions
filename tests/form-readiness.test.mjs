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
const referenceRoot = new URL("../templates/source-editions/", import.meta.url);
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "next/link") return nextResolve("next/link.js", context);
    if (specifier === "next/navigation")
      return { url: "form-readiness:navigation", shortCircuit: true };
    if (specifier.startsWith("@/")) {
      const root = context.parentURL?.startsWith(referenceRoot.href)
        ? new URL("tow-n-go/", referenceRoot)
        : sourceRoot;
      for (const extension of [".ts", ".tsx"]) {
        const url = new URL(`${specifier.slice(2)}${extension}`, root);
        if (existsSync(url)) return nextResolve(url.href, context);
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url === "form-readiness:navigation")
      return {
        format: "module",
        source: "export const useSearchParams = () => new URLSearchParams();",
        shortCircuit: true,
      };
    if (
      (url.startsWith(sourceRoot.href) || url.startsWith(referenceRoot.href)) &&
      /\.tsx?$/u.test(url)
    ) {
      const { outputText } = ts.transpileModule(readFileSync(new URL(url), "utf8"), {
        fileName: fileURLToPath(url),
        compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext },
      });
      return { format: "module", source: outputText, shortCircuit: true };
    }
    return nextLoad(url, context);
  },
});

let ContactForm, ManagedCheckout, SourceCheckout, TrailerSample, PaintingSample;
try {
  ContactForm = (await import("../src/components/contact/ContactForm.tsx")).default;
  ManagedCheckout = (await import("../src/components/collection/ManagedTemplateCheckout.tsx"))
    .default;
  SourceCheckout = (await import("../src/components/collection/SourceCheckout.tsx")).default;
  TrailerSample = (
    await import("../templates/source-editions/tow-n-go/components/contact/ContactForm.tsx")
  ).ContactForm;
  PaintingSample = (
    await import("../templates/source-editions/crestline/src/components/contact/contact-form-section.tsx")
  ).default;
} finally {
  hooks.deregister();
}

for (const [name, Component] of [
  ["trailer reference", TrailerSample],
  ["painting reference", PaintingSample],
]) {
  test(`${name} demo fields stay inert without JavaScript`, () => {
    const html = renderToStaticMarkup(createElement(Component));
    assert.match(html, /<form\b[^>]*method="post"/u);
    assert.match(html, /local demonstration needs JavaScript/u);
    const controls = html.match(/<(?:input|select|textarea|button)\b[^>]*>/gu) ?? [];
    assert.ok(controls.length > 5, "actual sample fields were rendered");
    for (const control of controls) assert.match(control, /\bdisabled=""/u);
  });
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
