"use client";

import Link from "next/link";
import { useState } from "react";

import { introCheckoutEvent, trackGa } from "@/components/layout/google-analytics";
import { trackMeta } from "@/components/layout/meta-pixel";
import type { Studio } from "@/lib/constants";

type Status = "idle" | "sending" | "redirecting";

const FIELD =
  "h-12 w-full rounded-lg border border-brown/25 bg-white px-4 text-base font-normal text-charcoal outline-none focus:border-brown focus:ring-2 focus:ring-brown/20";

/**
 * Studio-page intro offer: capture name + mobile (sent to PD Wise as a
 * "No Purchase" lead via /api/lead), then send the visitor straight to that
 * studio's Mindbody intro-offer checkout. If the CRM is down, they still go
 * to checkout: the sale matters more than the lead record.
 */
export function StudioOfferForm({ studio }: { studio: Studio }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const checkout = studio.mindbody.introOfferUrl;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.get("firstName"),
          phone: form.get("phone"),
          email: form.get("email"),
          requireEmail: true,
          studio: studio.slug,
          consent: form.get("consent") === "on",
          company: form.get("company"),
          page: `/studios/${studio.slug}`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      // A form problem (name, mobile, consent): show it and let them fix it.
      if (res.status === 422) {
        setStatus("idle");
        setError(data.error ?? "Please check your details.");
        return;
      }
      if (res.ok) {
        trackMeta("Lead", { content_name: "Studio page intro offer", content_category: studio.slug });
        void trackGa("generate_lead", { form: "studio page", studio: studio.slug, page_path: `/studios/${studio.slug}` });
      }
    } catch {
      // Network or CRM trouble: still take them to checkout.
    }
    setStatus("redirecting");
    // Waits for GA to confirm (max 800 ms) so the event isn't lost to the redirect; instant when GA is off.
    await introCheckoutEvent(checkout, `form:/studios/${studio.slug}`);
    window.location.href = checkout;
  }

  return (
    <div id="claim" className="scroll-mt-28 rounded-sm bg-white p-6 shadow-[0_1px_0_rgba(79,62,51,0.08),0_18px_40px_-24px_rgba(79,62,51,0.45)] sm:p-8">
      <p className="eyebrow">New to Reformd {studio.shortName}?</p>
      <h2 className="mt-3 text-3xl sm:text-4xl">4 classes for $49.</h2>
      <p className="mt-2 text-sm text-charcoal/75">Any class, any time. New clients only, valid 14 days from first use. No lock-in.</p>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-medium text-brown">
            First name
            <input name="firstName" required autoComplete="given-name" className={FIELD} />
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-brown">
            Mobile
            <input name="phone" type="tel" inputMode="tel" required autoComplete="tel" placeholder="0412 345 678" className={FIELD} />
          </label>
          <label className="grid gap-1.5 text-sm font-medium text-brown sm:col-span-2">
            Email
            <input name="email" type="email" inputMode="email" required autoComplete="email" placeholder="you@example.com" className={FIELD} />
          </label>
        </div>

        {/* Honeypot: hidden from people, filled by bots */}
        <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

        <label className="flex items-start gap-3 text-xs leading-relaxed text-charcoal/75">
          <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-brown" />
          <span>
            I agree to receive SMS and email from Reformd Pilates about this offer. Unsubscribe or reply STOP any time. See our{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              privacy policy
            </Link>
            .
          </span>
        </label>

        {error && (
          <p role="alert" className="text-sm text-red-700">
            {error}
          </p>
        )}

        <button type="submit" disabled={status !== "idle"} className="btn btn-primary w-full text-base">
          {status === "idle" ? "Claim my 4 classes →" : "Taking you to checkout…"}
        </button>
        <p className="text-center text-xs text-charcoal/70">Next: pick your first class and pay securely on Mindbody.</p>
      </form>

      <p className="mt-5 border-t border-brown/10 pt-4 text-center text-sm text-charcoal/75">
        Already know what you want?{" "}
        <a href={checkout} className="font-medium text-brown underline underline-offset-4">
          Skip to checkout
        </a>
      </p>
    </div>
  );
}
