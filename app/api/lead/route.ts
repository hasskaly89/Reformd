import { NextResponse } from "next/server";

import { STUDIOS, type StudioSlug } from "@/lib/constants";
import { normaliseAuMobile } from "@/lib/lead";
import { pdwiseConfig, pushLeadToPdWise } from "@/lib/pdwise";

/**
 * Intro-offer lead capture -> PD Wise CRM.
 *
 * 1. PD Wise API (preferred): upsert the contact and open an opportunity in the
 *    studio pipeline's "No Purchase" stage (see lib/pdwise.ts for env vars).
 *    A PD Wise workflow on that stage / the `website-intro-offer` tag sends the SMS.
 * 2. CRM_WEBHOOK_URL (fallback): posts the lead to a PD Wise inbound webhook.
 * If neither is set, or both fail, the route returns `fallback: true` and the
 * form shows the direct "claim now" link, so no visitor is stuck.
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
  const page = typeof body.page === "string" ? body.page.slice(0, 200) : "";
  const offerUrl =
    process.env[`INTRO_OFFER_SMS_URL_${studio.slug.toUpperCase().replace("-", "_")}`] || studio.mindbody.introOfferUrl;

  // 1. PD Wise API: contact + "No Purchase" opportunity
  const pdwise = pdwiseConfig(studio.slug);
  if (pdwise) {
    try {
      await pushLeadToPdWise(pdwise, { firstName, phone, studio, offerUrl, page });
      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("PD Wise lead push failed", err);
      // fall through to the webhook, if there is one
    }
  }

  // 2. Inbound webhook
  const webhook = process.env.CRM_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ ok: false, fallback: true }, { status: pdwise ? 502 : 503 });

  const payload = {
    first_name: firstName,
    phone,
    studio: studio.shortName,
    studio_slug: studio.slug,
    tags: ["website-intro-offer", `studio-${studio.slug}`, "no-purchase"],
    pipeline_stage: "No Purchase",
    offer: "Intro Offer | 4 for $49",
    offer_url: offerUrl,
    source: "website-popup",
    page,
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
