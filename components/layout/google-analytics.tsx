"use client";

import Script from "next/script";
import { useEffect } from "react";

import { STUDIO_LIST } from "@/lib/constants";

/**
 * Google Analytics 4. Loads only when NEXT_PUBLIC_GA4_ID is set (Production
 * only), so previews never pollute the data. Page views on client-side
 * navigation come from GA4's enhanced measurement ("page changes based on
 * browser history events", on by default), so we don't send them by hand.
 *
 * Events (mark the first two as key events in GA4):
 *   generate_lead          intro-offer form or pop-up submitted (sent to PD Wise)
 *   intro_offer_checkout   heading to a studio's Mindbody intro-offer checkout
 *   mindbody_click         any other Mindbody link (timetable, pricing, login)
 *   phone_click            tap-to-call
 */
const GA_ID = process.env.NEXT_PUBLIC_GA4_ID;
const ENABLED = !!GA_ID && /^G-[A-Z0-9]{4,20}$/.test(GA_ID);

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: Gtag;
  }
}

/** Send a GA4 event. Resolves once GA confirms it (or after 800 ms), so it's safe to await before a redirect. */
export function trackGa(event: string, params: Record<string, unknown> = {}): Promise<void> {
  if (!ENABLED || typeof window === "undefined" || !window.gtag) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => resolve();
    window.gtag!("event", event, { ...params, transport_type: "beacon", event_callback: done });
    setTimeout(done, 800);
  });
}

const offerStudio = (href: string) => STUDIO_LIST.find((s) => s.mindbody.introOfferUrl === href)?.slug;

/** The event to send when someone leaves for a studio's intro-offer checkout. */
export function introCheckoutEvent(href: string, source: string) {
  return trackGa("intro_offer_checkout", { studio: offerStudio(href) ?? "unknown", source, link_url: href });
}

export function GoogleAnalytics() {
  // One listener for outbound Mindbody links and phone taps, so no component needs wiring.
  useEffect(() => {
    if (!ENABLED) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.href;
      const page = window.location.pathname;
      if (href.startsWith("tel:")) {
        void trackGa("phone_click", { page_path: page });
      } else if (offerStudio(href)) {
        void introCheckoutEvent(href, `link:${page}`);
      } else if (/mindbodyonline\.com|mindbody\.io/i.test(href)) {
        void trackGa("mindbody_click", { page_path: page, link_url: href, link_text: a.textContent?.trim().slice(0, 60) });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!ENABLED) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
