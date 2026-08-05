import { ImageResponse } from "next/og";

/**
 * Link-preview card. Mirrors the hero: ink field, grid rule, serif name with
 * the signal dot, and a mono telemetry strip along the bottom.
 */
export const runtime = "edge";
export const alt = "Bailey Wallace, AI systems that see the world from above";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Pull the real display face so the card matches the site. Wrapped in a
 * try/catch: if Google Fonts is unreachable the card still renders in the
 * renderer's default face rather than 500-ing and breaking every preview.
 */
async function loadDisplayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());
    const url = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const fontData = await loadDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0D12",
          backgroundImage:
            "linear-gradient(to right, #161B22 1px, transparent 1px), linear-gradient(to bottom, #161B22 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          padding: "64px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: "0.18em",
            color: "#7A7468",
          }}
        >
          <span>BW / OBSERVATORY</span>
          <span style={{ display: "flex", alignItems: "center", color: "#E89A4F" }}>
            {/* Drawn, not typed: the renderer's fallback face has no ● glyph
                and would substitute a tofu box. */}
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 12,
                background: "#E89A4F",
                marginRight: 10,
              }}
            />
            TRANSMITTING
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              fontSize: 128,
              lineHeight: 1,
              color: "#F2EEE7",
              letterSpacing: "-0.03em",
              fontFamily: fontData ? "Display" : undefined,
            }}
          >
            Bailey Wallace
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 22,
                background: "#E89A4F",
                marginLeft: 14,
                marginBottom: 16,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 34,
              color: "#CFC7B8",
              maxWidth: 900,
            }}
          >
            I build AI systems that see the world from above.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #1E2329",
            paddingTop: 22,
            fontSize: 20,
            letterSpacing: "0.14em",
            color: "#7A7468",
          }}
        >
          <span>SATELLITE IMAGERY / PHOTOGRAMMETRY / LIDAR</span>
          <span style={{ color: "#A89F8E" }}>BAILEYWALLACE.AI</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: "Display", data: fontData, style: "normal", weight: 600 }]
        : undefined,
    }
  );
}
