import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import localFont from "next/font/local";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { IntroPopup } from "@/components/sections/intro-popup";
import { FeedbackButton } from "@/components/layout/feedback-button";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import { ALLOW_INDEXING } from "@/lib/site-env";

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

// Body: Founders Grotesk (Klim).
// Its metrics put the baseline at the very top of the em box (ascent 630 =
// cap height, descent 370), so text sits ~0.19em high in buttons and pills.
// Re-balance ascent/descent (same 1000-unit total) to centre the cap height.
const body = localFont({
  src: [
    { path: "../public/fonts/FoundersGrotesk-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/FoundersGrotesk-Medium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/FoundersGrotesk-Semibold.otf", weight: "600", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  declarations: [
    { prop: "ascent-override", value: "81.5%" },
    { prop: "descent-override", value: "18.5%" },
    { prop: "line-gap-override", value: "0%" },
  ],
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
    title: `Reformer Pilates Cecil Hills & Kings Park | ${SITE_NAME}`,
    description: SITE_TAGLINE,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_AU",
    images: [{ url: "/images/gallery/cecil-hills-community.jpg", width: 1439, height: 1530, alt: "A reformer Pilates class at Reformd Pilates" }],
  },
  twitter: { card: "summary_large_image" },
  // Stay out of Google until launch day, so this build never competes with
  // the live Squarespace site. Set ALLOW_INDEXING=true in Vercel at go-live.
  robots: ALLOW_INDEXING ? { index: true, follow: true } : { index: false, follow: false },
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
        <div aria-hidden className="h-20 bg-brown lg:hidden" />
        <IntroPopup />
        <FeedbackButton />
      </body>
    </html>
  );
}
