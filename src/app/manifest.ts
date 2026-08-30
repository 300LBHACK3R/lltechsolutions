import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "L&L Tech Solutions",
    short_name: "L&L Tech",
    description:
      "Custom website design, purpose-built software, and social media management from a Calgary-based digital studio.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#06111f",
    theme_color: "#071522",
    categories: ["business", "design", "productivity", "technology"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
