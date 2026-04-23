import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Romain Vartabedian — Développeur Shopify & Full-Stack",
  description:
    "Développeur Shopify Partner basé à Marseille. Apps Shopify, thèmes Liquid, React / Next.js / Node.js. Disponible CDI & Freelance.",
  metadataBase: new URL("https://by-dvr.vercel.app"),
  openGraph: {
    title: "Romain Vartabedian — Développeur Shopify & Full-Stack",
    description:
      "Shopify Partner · React / Next.js / Node.js · Marseille & Remote",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}