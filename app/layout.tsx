import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";

import "./globals.css";

/**
 * Display font: Roc Grotesk Wide (brand) via an Adobe Fonts web project.
 * Set NEXT_PUBLIC_TYPEKIT_ID to the 7-char kit id to switch it on.
 * Until then, or if the kit fails, Archivo Expanded (free, OFL) renders.
 */
const TYPEKIT_ID = process.env.NEXT_PUBLIC_TYPEKIT_ID;

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
    default: `${SITE_NAME} | Boutique Reformer Pilates · Cecil Hills & Kings Park`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_TAGLINE,
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
        {TYPEKIT_ID && (
          <link rel="stylesheet" href={`https://use.typekit.net/${TYPEKIT_ID}.css`} />
        )}
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
