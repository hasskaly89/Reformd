import { NextResponse } from "next/server";

import { STUDIOS, type StudioSlug } from "@/lib/constants";
import { normaliseAuMobile } from "@/lib/lead";

/**
 * Intro-offer lead capture -> CRM (PD Wise / GoHighLevel inbound webhook).
 *
 * The CRM workflow should: create/update the contact, tag it with the
 * studio, add it to the pipeline, and send the SMS. The payload includes
 * `offer_url` so one workflow can text the right studio's link.
 *
 * Env: CRM_WEBHOOK_URL (server-only). Without it the route returns 503 and
 * the form falls back to the direct "claim now" link, so no visitor is stuck.
 */

const isStudio = (s: unknown): s is StudioSlug => s === "cecil-hills" || s === "kings-park";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "company" field.
  if (typeof body.company === "string" && body.company.trim()) return NextResponse.json({ ok: true });

  const firstName = typeof body.firstName === "string" ? body.firstName.trim().slice(0, 60) : "";
  const phone = typeof body.phone === "string" ? normaliseAuMobile(body.phone) : null;
  if (!firstName) return NextResponse.json({ ok: false, error: "Please add your first name." }, { status: 422 });
  if (!phone) return NextResponse.json({ ok: false, error: "Please use an Australian mobile, e.g. 0412 345 678." }, { status: 422 });
  if (!isStudio(body.studio)) return NextResponse.json({ ok: false, error: "Please choose a studio." }, { status: 422 });
  if (body.consent !== true) return NextResponse.json({ ok: false, error: "Please agree to receive the SMS." }, { status: 422 });

  const studio = STUDIOS[body.studio];
  const webhook = process.env.CRM_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ ok: false, fallback: true }, { status: 503 });

  const payload = {
    first_name: firstName,
    phone,
    studio: studio.shortName,
    studio_slug: studio.slug,
    tags: ["website-intro-offer", `studio-${studio.slug}`],
    offer: "Intro Offer | 4 for $49",
    offer_url: process.env[`INTRO_OFFER_SMS_URL_${studio.slug.toUpperCase().replace("-", "_")}`] || studio.mindbody.introOfferUrl,
    source: "website-popup",
    page: typeof body.page === "string" ? body.page.slice(0, 200) : "",
    sms_consent: true,
    submitted_at: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`CRM responded ${res.status}`);
  } catch (err) {
    console.error("lead webhook failed", err);
    return NextResponse.json({ ok: false, fallback: true }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
