import {
  CLASSPASS_RATINGS,
  CLASS_FORMATS,
  CRECHE,
  FIRST_VISIT,
  PHONE,
  PRICING_TIERS,
  SITE_NAME,
  SITE_URL,
  STUDIO_LIST,
} from "@/lib/constants";

/**
 * /llms.txt: a plain-text summary of the site for AI assistants and answer
 * engines (https://llmstxt.org). Built from lib/constants.ts, the same source
 * as the pages and JSON-LD, so it can't drift from what the site says.
 */
export const dynamic = "force-static";

const url = (path: string) => `${SITE_URL}${path}`;

function body() {
  const tier = (name: string) => PRICING_TIERS.find((t) => t.name === name);
  const price = (name: string) => {
    const t = tier(name);
    return t ? `${t.price}${t.unit ?? ""}` : "";
  };
  const memberships = PRICING_TIERS.filter((t) => t.group === "membership")
    .map((t) => `${t.name} (${t.detail.toLowerCase()}) ${t.price}${t.unit ?? ""}`)
    .join("; ");
  const packs = PRICING_TIERS.filter((t) => t.group === "pack")
    .map((t) => `${t.name} ${t.price}`)
    .join("; ");

  const studios = STUDIO_LIST.map((s) => {
    const rating = CLASSPASS_RATINGS.find((r) => r.studio === s.slug);
    return [
      `### ${s.name}`,
      `- Address: ${s.address}, ${s.suburb} ${s.state} ${s.postcode}`,
      `- Phone: ${s.phone}`,
      `- Nearby: ${s.nearby.join(", ")}`,
      ...(rating ? [`- ClassPass rating: ${rating.rating} from ${rating.count} ratings`] : []),
      `- [Studio page](${url(`/studios/${s.slug}`)}): map, hours, facilities, FAQs`,
      `- [Live timetable](${url(`/schedule/${s.slug}`)}) · [Pricing](${url(`/pricing/${s.slug}`)})`,
    ].join("\n");
  }).join("\n\n");

  const classes = CLASS_FORMATS.map(
    (c) => `- ${c.name}${c.variants.length ? ` (${c.variants.join(", ")})` : ""}: ${c.tagline}${c.beginner ? " Best first class for beginners." : ""}`,
  ).join("\n");

  return `# ${SITE_NAME}

> Boutique reformer Pilates in Western Sydney, with studios in Cecil Hills and Kings Park. Small classes, every level welcome. New clients can try 4 classes for ${price("Intro Offer")}.

## Studios

${studios}

## Classes

Each class runs ${FIRST_VISIT.classMinutes} minutes on the reformer. [All classes](${url("/classes")})

${classes}

## First visit

- Start with Balanced.
- Arrive ${FIRST_VISIT.arriveEarlyMinutes} minutes early to check in and get settled.
- Grip socks are required. ${FIRST_VISIT.forSale} are for sale at the front desk.

## Pricing (same at both studios, AUD)

- Intro offer: 4 classes for ${price("Intro Offer")}. ${tier("Intro Offer")?.note ?? ""}.
- Weekly memberships (direct debit): ${memberships}.
- Casual and packs: ${packs}.
- Student memberships are available for current uni or TAFE students.

## Creche

Supervised creche at both studios, ${CRECHE.days} at ${CRECHE.times.join(" and ")}. ${CRECHE.price} a session, free with an ${CRECHE.freeWith} membership. [Creche details](${url("/creche")})

## Other pages

- [Private sessions and events](${url("/private-sessions")}): 1:1 and 2:1 reformer sessions, private group classes.
- [About](${url("/about")})
- [Contact](${url("/contact")}): ${PHONE}
- Bookings and memberships are handled by Mindbody; book from the studio timetable pages above.
`;
}

export function GET() {
  return new Response(body(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
