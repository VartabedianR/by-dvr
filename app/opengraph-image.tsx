import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Romain Vartabedian - Développeur Shopify & Full-Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "#0a0a0a",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    padding: "80px",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        fontSize: 96,
                        fontWeight: 700,
                        color: "#ffffff",
                        letterSpacing: "-2px",
                        lineHeight: 1,
                        marginBottom: 32,
                    }}
                >
                    RV
                </div>
                <div
                    style={{
                        fontSize: 32,
                        fontWeight: 600,
                        color: "#ffffff",
                        marginBottom: 16,
                    }}
                >
                    Romain Vartabedian
                </div>
                <div
                    style={{
                        fontSize: 24,
                        color: "#888888",
                        marginBottom: 48,
                    }}
                >
                    Développeur Shopify & Full-Stack · Marseille
                </div>
                <div
                    style={{
                        display: "flex",
                        gap: 16,
                    }}
                >
                    {["Shopify Partner", "React", "Next.js", "Node.js"].map((tag) => (
                        <div
                            key={tag}
                            style={{
                                background: "#1a1a1a",
                                border: "1px solid #333",
                                borderRadius: 8,
                                padding: "8px 16px",
                                fontSize: 18,
                                color: "#aaaaaa",
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
        ),
        size
    );
}