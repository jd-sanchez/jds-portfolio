import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 140,
            fontWeight: 700,
            letterSpacing: -4,
            color: "#fafafa",
          }}
        >
          JDS
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#fafafa", marginTop: 8 }}>
          Jerico Dane Sanchez
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#a1a1aa", marginTop: 4 }}>
          Full-Stack &amp; AI Developer
        </div>
      </div>
    ),
    { ...size }
  );
}
