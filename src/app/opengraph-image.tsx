import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const alt = "L&L Tech Solutions — Websites. Software. Social & Content.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function OpenGraphImage() {
  const mark = await readFile(join(process.cwd(), "public/brand/icon.png"));
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#080808",
        width: "100%",
        height: "100%",
        padding: "60px 72px",
        color: "#f5f5ef",
        borderBottom: "8px solid #d4af37",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <img
          src={`data:image/png;base64,${mark.toString("base64")}`}
          width={100}
          height={100}
          alt=""
        />
        <span style={{ fontSize: 26 }}>L&L TECH SOLUTIONS</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 66,
          letterSpacing: "-2px",
          lineHeight: 1.08,
        }}
      >
        <span>Your business has</span>
        <span>outgrown ordinary.</span>
        <span style={{ color: "#f0d481", fontSize: 39, marginTop: 20 }}>
          Its digital presence should too.
        </span>
      </div>
      <div
        style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#b1b1ac" }}
      >
        <span>Websites / Software / Social & Content</span>
        <span>Calgary-based · Canada-wide</span>
      </div>
    </div>,
    size,
  );
}
