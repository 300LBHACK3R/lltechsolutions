export type TemplateScreenshot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type TemplateShowcase = {
  url: string | null;
  screenshots: readonly TemplateScreenshot[];
};

/** Only configured public HTTPS demos and local screenshot assets reach the page. */
export function readTemplateShowcase(
  value: unknown,
  designId:
    | "pigment"
    | "structure"
    | "earthworks"
    | "lawncare"
    | "horizon"
    | "wellness"
    | "still"
    | "medical-spa"
    | "artsy-nails"
    | "hair-salon"
    | "hair-one-page"
    | "massage-one-page" = "pigment",
): TemplateShowcase {
  if (!value || typeof value !== "object") return { url: null, screenshots: [] };
  const config = value as Record<string, unknown>;
  let url: string | null = null;
  if (typeof config.url === "string") {
    try {
      const parsed = new URL(config.url);
      if (parsed.protocol === "https:" && !parsed.username && !parsed.password) url = parsed.href;
    } catch {
      // A missing or malformed deployment URL must never produce a broken live button.
    }
  }
  const screenshots = Array.isArray(config.screenshots)
    ? config.screenshots.filter((item): item is TemplateScreenshot => {
        if (!item || typeof item !== "object") return false;
        const image = item as Record<string, unknown>;
        return (
          typeof image.src === "string" &&
          new RegExp(
            `^/images/templates/${designId}/[a-z0-9][a-z0-9-]*\\.(?:webp|png|jpe?g)$`,
            "i",
          ).test(image.src) &&
          typeof image.alt === "string" &&
          image.alt.trim().length > 0 &&
          typeof image.caption === "string" &&
          image.caption.trim().length > 0 &&
          Number.isInteger(image.width) &&
          Number(image.width) > 0 &&
          Number.isInteger(image.height) &&
          Number(image.height) > 0
        );
      })
    : [];
  return { url, screenshots };
}
