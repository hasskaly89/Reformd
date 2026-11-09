import type { Metadata } from "next";

import {
  CLASS_FORMATS,
  CRECHE,
  PRICING_TIERS,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
  type Studio,
} from "@/lib/constants";

const abs = (path: string) => `${SITE_URL}${path}`;

export function studioClasses(studio: Studio) {
  return CLASS_FORMATS.filter((c) => c.availableAt.includes(studio.slug));
}

/** Page metadata for a studio location page. */
export function studioMetadata(studio: Studio): Metadata {
  const path = `/studios/${studio.slug}`;
  const title = `Reformer Pilates ${studio.suburb}`;
  const description = `Boutique reformer Pilates in ${studio.suburb}, ${studio.state}. Small classes, every level welcome. Near ${studio.nearby.slice(0, 3).join(", ")}. Try 4 classes for $49.`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${SITE_NAME}`,
      description,
      url: abs(path),
      images: [{ url: abs(studio.image), alt: `Reformd Pilates ${studio.shortName}` }],
      siteName: SITE_NAME,
      type: "website",
      locale: "en_AU",
    },
  };
}

/** FAQs shown on the page and mirrored in FAQPage schema. */
export function studioFaqs(studio: Studio): { q: string; a: string }[] {
  const price = (name: string) => PRICING_TIERS.find((t) => t.name === name)?.price;
  const classes = studioClasses(studio);
  const parking = studio.facilities.find((f) => /parking/i.test(f));
  const faqs = [
    {
      q: `Is reformer Pilates in ${studio.suburb} good for beginners?`,
      a: `Yes. Every class at Reformd ${studio.shortName} welcomes beginners, and classes are small so your instructor can adjust your form. Balanced | Foundation is the best place to start.`,
    },
    {
      q: `How much does reformer Pilates cost at ${studio.shortName}?`,
      a: `New clients can try 4 classes for ${price("Intro Offer")}. After that, a casual class is ${price("Casual")} and memberships start from ${price("Lite")} a week. Student rates are available.`,
    },
    {
      q: `What classes run at Reformd ${studio.shortName}?`,
      a: `${classes.map((c) => c.name).join(", ")}. Check the ${studio.shortName} schedule for this week's times.`,
    },
    {
      q: `Where is the ${studio.shortName} studio?`,
      a: `${studio.address}, ${studio.suburb} ${studio.state} ${studio.postcode}. It's close to ${studio.nearby.join(", ")}.${parking ? ` ${parking}.` : ""}`,
    },
    {
      q: "How do I book a class?",
      a: `Book online through our ${studio.shortName} schedule. Bookings are handled by Mindbody, so you can manage them from your phone.`,
    },
  ];
  if (studio.facilities.some((f) => /creche/i.test(f))) {
    faqs.splice(3, 0, {
      q: `Is there a creche at ${studio.shortName}?`,
      a: `Yes. Creche runs ${CRECHE.days} at ${CRECHE.times.join(" and ")}, alongside those classes. It's ${CRECHE.price} a session, or free with an ${CRECHE.freeWith} membership.`,
    });
  }
  return faqs;
}

/** LocalBusiness (ExerciseGym) + FAQPage + Breadcrumb JSON-LD for a studio page. */
export function studioJsonLd(studio: Studio) {
  const url = abs(`/studios/${studio.slug}`);
  return [
    {
      "@context": "https://schema.org",
      "@type": "ExerciseGym",
      "@id": `${url}#studio`,
      name: studio.name,
      description: studio.blurb,
      url,
      image: abs(studio.image),
      priceRange: "$$",
      telephone: studio.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: studio.address,
        addressLocality: studio.suburb,
        addressRegion: studio.state,
        postalCode: studio.postcode,
        addressCountry: "AU",
      },
      ...(studio.geo
        ? { geo: { "@type": "GeoCoordinates", latitude: studio.geo.lat, longitude: studio.geo.lng } }
        : {}),
      areaServed: [studio.suburb, ...studio.nearby].map((name) => ({ "@type": "Place", name })),
      amenityFeature: studio.facilities.map((name) => ({
        "@type": "LocationFeatureSpecification",
        name,
        value: true,
      })),
      sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
      parentOrganization: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: studioFaqs(studio).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: studio.shortName, item: url },
      ],
    },
  ];
}

/** Site-wide Organization schema (homepage). */
export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: abs("/images/logo-brown.svg"),
  sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook],
};

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is built from our own constants, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
