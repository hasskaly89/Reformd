import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";

import "./globals.css";

/**
 * Display font: Roc Grotesk Wide Bold from the Adobe Fonts web project
 * "Reformd Pilates" (kit kkx7tho), covered by the studio's Adobe licence.
 * Adobe serves Wide Bold at weight 600. The kit's allowed domains must
 * include every host the site runs on. Archivo Expanded (OFL) is the
 * fallback while the kit loads or if it fails.
 */
const TYPEKIT_ID = process.env.NEXT_PUBLIC_TYPEKIT_ID ?? "kkx7tho";

const displayFallback = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display-fallback",
  display: "swap",
});

// Body: Founders Grotesk (Klim)
const body = localFont({
  src: [
    { path: "../public/fonts/FoundersGrotesk-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/FoundersGrotesk-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/FoundersGrotesk-Semibold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Reformer Pilates Cecil Hills & Kings Park | ${SITE_NAME}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Boutique reformer Pilates studios in Cecil Hills and Kings Park, Sydney. Small classes, five class formats, every level welcome. Try 4 classes for $49.",
  openGraph: {
    title: SITE_NAME,
    description: SITE_TAGLINE,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_AU",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={`${displayFallback.variable} ${body.variable}`}>
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="stylesheet" href={`https://use.typekit.net/${TYPEKIT_ID}.css`} />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
