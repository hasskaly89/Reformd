"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Meta Pixel, the same pixel as the current site and the intro landing pages,
 * so retargeting audiences keep filling after launch. Loads only when
 * NEXT_PUBLIC_META_PIXEL_ID is set (Production only), so previews never pollute
 * the data. Tracks PageView on every route change; `trackMeta("Lead")` is
 * called by the intro-offer pop-up after a successful submit.
 */
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type Fbq = (...args: unknown[]) => void;
declare global {
  interface Window {
    fbq?: Fbq;
  }
}

export function trackMeta(event: string, params?: Record<string, unknown>) {
  if (PIXEL_ID && typeof window !== "undefined" && window.fbq) window.fbq("track", event, params ?? {});
}

export function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  // The init script fires the first PageView; later client-side navigations fire their own.
  useEffect(() => {
    if (!PIXEL_ID) return;
    if (first.current) {
      first.current = false;
      return;
    }
    trackMeta("PageView");
  }, [pathname]);

  if (!PIXEL_ID || !/^\d{6,20}$/.test(PIXEL_ID)) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
    </Script>
  );
}
