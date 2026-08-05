import { ImageResponse } from "next/og";

/** Favicon: the signal dot from the wordmark, on the ink field. */
export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0D12",
          color: "#F2EEE7",
          fontSize: 20,
          letterSpacing: "-0.04em",
          position: "relative",
        }}
      >
        B
        <div
          style={{
            position: "absolute",
            right: 5,
            bottom: 7,
            width: 7,
            height: 7,
            borderRadius: 7,
            background: "#E89A4F",
          }}
        />
      </div>
    ),
    size
  );
}
