import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteUrl = "https://jds.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jerico Dane Sanchez | Full-Stack & AI Developer",
  description:
    "Portfolio of Jerico Dane Sanchez (JDS) — full-stack and AI developer building offline-first apps, RAG pipelines, and production browser-engine code.",
  keywords: [
    "Jerico Dane Sanchez",
    "JDS",
    "Full Stack Developer",
    "AI Developer",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Jerico Dane Sanchez" }],
  openGraph: {
    title: "Jerico Dane Sanchez",
    description:
      "Full-stack and AI developer — offline-first apps, RAG pipelines, and production browser-engine code.",
    url: siteUrl,
    siteName: "JDS Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jerico Dane Sanchez",
    description:
      "Full-stack and AI developer — offline-first apps, RAG pipelines, and production browser-engine code.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-noise relative overflow-x-clip">
        <div className="fixed inset-0 -z-10 bg-grid" aria-hidden="true" />
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
