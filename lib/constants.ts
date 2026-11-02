/**
 * Site content. Studio details, prices and Mindbody product codes mirror the
 * live site and Mindbody as verified on 1 Nov 2026. Update here, not in
 * components.
 */

export const SITE_NAME = "Reformd Pilates";
export const SITE_TAGLINE = "Redefine strength, reform your body.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.reformdpilates.com.au";

export const PHONE = "+61 430 496 626";
export const PHONE_HREF = "tel:+61430496626";

/* ------------------------------------------------------------------ */
/* Mindbody URL builders                                               */
/*   stype=40  Contracts: recurring memberships (prodid)               */
/*   stype=41  Services: intro offers, class packs, creche             */
/*             (sTG service group: 24 intro, 26 packs, 27 creche)      */
/* Mixing the two sells the wrong product.                             */
/* ------------------------------------------------------------------ */

const MB = "https://clients.mindbodyonline.com/classic/ws";

/** A membership (contract), preselected in Mindbody checkout */
export const mindbodyContractUrl = (studioId: string, productId: number) =>
  `${MB}?studioid=${studioId}&stype=40&prodid=${productId}`;

/** All memberships at a studio (used where a product code is unconfirmed) */
export const mindbodyContractsUrl = (studioId: string) => `${MB}?studioid=${studioId}&stype=40`;

/** A single service (intro offer) */
export const mindbodyServiceUrl = (studioId: string, groupId: number, productId: number) =>
  `${MB}?studioid=${studioId}&stype=41&sTG=${groupId}&prodId=${productId}`;

/** A service group catalogue (class packs, creche) */
export const mindbodyServiceGroupUrl = (studioId: string, groupId: number) =>
  `${MB}?studioid=${studioId}&stype=41&sTG=${groupId}`;

/** The studio's live schedule on Mindbody */
export const mindbodyScheduleUrl = (studioId: string) =>
  `https://clients.mindbodyonline.com/classic/mainclass?studioid=${studioId}`;

/* ------------------------------------------------------------------ */
/* Studios                                                             */
/* ------------------------------------------------------------------ */

export type StudioSlug = "cecil-hills" | "kings-park";

export type Studio = {
  slug: StudioSlug;
  name: string;
  shortName: string;
  /** Street address, as printed on the live site */
  address: string;
  suburb: string;
  postcode: string;
  state: "NSW";
  phone: string;
  /** Google Maps embed query (`output=embed`) */
  mapsEmbed: string;
  /**
   * Class times: first class start to last class end, from the studio's
   * Mindbody schedule (week of 2 Nov 2026). Keep in sync with Google.
   */
  hours: { day: string; open: string }[];
  /** schema.org openingHours, mirrors `hours` */
  openingHours: string[];
  facilities: string[];
  /** One-line studio intro */
  blurb: string;
  /** Studio photo under /public */
  image: string;
  /** Map coordinates (from the studio shoot) */
  geo: { lat: number; lng: number };
  /** Council area + region, for local copy */
  region: string;
  /** Neighbouring suburbs, for local SEO copy + schema areaServed */
  nearby: string[];
  /** Instagram handle (no @). TODO(owner): set per studio if they have their own account */
  instagram: string;
  /** Google Maps listing, for "read our reviews" links */
  googleReviewsUrl: string;
  mindbody: {
    studioId: string;
    /** Branded Web widget id for the embedded schedule */
    scheduleWidgetId: string;
    /** "Intro Offer | 4 for $49" at this studio (verified 1 Nov 2026) */
    introOfferUrl: string;
    /** Class Packs catalogue (verified 1 Nov 2026) */
    classPacksUrl: string;
    /** "Creche | 1 Class" ($5) (verified 1 Nov 2026) */
    crecheUrl: string;
    /** Live schedule on Mindbody, fallback if the widget fails */
    scheduleUrl: string;
    /** All memberships at this studio */
    contractsUrl: string;
  };
};

const mindbodyFor = (studioId: string, scheduleWidgetId: string, introProductId: number) => ({
  studioId,
  scheduleWidgetId,
  introOfferUrl: mindbodyServiceUrl(studioId, 24, introProductId),
  classPacksUrl: mindbodyServiceGroupUrl(studioId, 26),
  crecheUrl: mindbodyServiceGroupUrl(studioId, 27),
  scheduleUrl: mindbodyScheduleUrl(studioId),
  contractsUrl: mindbodyContractsUrl(studioId),
});

export const STUDIOS: Record<StudioSlug, Studio> = {
  "cecil-hills": {
    slug: "cecil-hills",
    name: "Reformd Pilates Cecil Hills",
    shortName: "Cecil Hills",
    address: "Shop 1A, Cecil Hills Shopping Centre, 1 Lancaster Ave",
    suburb: "Cecil Hills",
    postcode: "2171",
    state: "NSW",
    phone: PHONE,
    mapsEmbed:
      "https://www.google.com/maps?q=Shop+1A+Cecil+Hills+Shopping+Centre,+1+Lancaster+Ave,+Cecil+Hills+NSW+2171&output=embed",
    hours: [
      { day: "Monday", open: "6:00am to 7:50pm" },
      { day: "Tuesday", open: "5:00am to 8:50pm" },
      { day: "Wednesday", open: "5:00am to 7:50pm" },
      { day: "Thursday", open: "5:00am to 8:50pm" },
      { day: "Friday", open: "6:00am to 6:50pm" },
      { day: "Saturday", open: "7:00am to 11:50am" },
      { day: "Sunday", open: "7:00am to 10:50am" },
    ],
    openingHours: [
      "Mo 06:00-19:50",
      "Tu 05:00-20:50",
      "We 05:00-19:50",
      "Th 05:00-20:50",
      "Fr 06:00-18:50",
      "Sa 07:00-11:50",
      "Su 07:00-10:50",
    ],
    facilities: [
      "Soundproof creche (Mon to Fri, 8:30am and 9:30am)",
      "Showers and change rooms",
      "Free on-site parking",
    ],
    blurb: "Our flagship studio, where Reformd began. The full class lineup, plus a soundproof creche.",
    image: "/images/hero/cecil-hills-studio.jpg",
    geo: { lat: -33.8903, lng: 150.8789 },
    region: "Liverpool, South-West Sydney",
    nearby: ["Abbotsbury", "Cecil Park", "Edensor Park", "Bonnyrigg Heights", "Green Valley", "Elizabeth Hills"],
    instagram: "reformdpilatesstudio",
    googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Reformd+Pilates+Cecil+Hills",
    mindbody: mindbodyFor("5741473", "047812b344", 100041),
  },
  "kings-park": {
    slug: "kings-park",
    name: "Reformd Pilates Kings Park",
    shortName: "Kings Park",
    address: "6/2 Garling Rd",
    suburb: "Kings Park",
    postcode: "2148",
    state: "NSW",
    phone: PHONE,
    mapsEmbed:
      "https://www.google.com/maps?q=6/2+Garling+Rd,+Kings+Park+NSW+2148&output=embed",
    hours: [
      { day: "Monday", open: "6:00am to 7:50pm" },
      { day: "Tuesday", open: "5:00am to 7:50pm" },
      { day: "Wednesday", open: "6:00am to 7:50pm" },
      { day: "Thursday", open: "5:00am to 7:50pm" },
      { day: "Friday", open: "6:00am to 7:50pm" },
      { day: "Saturday", open: "7:00am to 10:50am" },
      { day: "Sunday", open: "7:00am to 9:50am" },
    ],
    openingHours: [
      "Mo 06:00-19:50",
      "Tu 05:00-19:50",
      "We 06:00-19:50",
      "Th 05:00-19:50",
      "Fr 06:00-19:50",
      "Sa 07:00-10:50",
      "Su 07:00-09:50",
    ],
    facilities: [
      "Creche (Mon to Fri, 8:30am and 9:30am)",
      "Showers and change rooms",
      "Street parking",
    ],
    blurb: "Reformer Pilates for Blacktown and the north-west. Same small classes, same weekday creche.",
    image: "/images/classes/reformer.jpg",
    geo: { lat: -33.7369, lng: 150.9011 },
    region: "Blacktown, Western Sydney",
    nearby: ["Blacktown", "Quakers Hill", "Marayong", "Kings Langley", "Acacia Gardens", "Glenwood"],
    instagram: "reformdpilatesstudio",
    googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=Reformd+Pilates+Kings+Park",
    mindbody: mindbodyFor("5749916", "20429556a3a", 100111),
  },
};

export const STUDIO_LIST: Studio[] = [STUDIOS["cecil-hills"], STUDIOS["kings-park"]];

/** Creche runs at both studios alongside the 8:30 and 9:30 classes */
export const CRECHE = {
  days: "Monday to Friday",
  times: ["8:30am", "9:30am"],
  price: "$5",
  freeFor: "Foundation Membership",
};

/* ------------------------------------------------------------------ */
/* Pricing: identical at both studios; product codes differ per studio */
/* ------------------------------------------------------------------ */

export type PricingGroup = "intro" | "membership" | "student" | "pack";

export type PricingTier = {
  group: PricingGroup;
  name: string;
  /** What you get, e.g. "2 classes per week" */
  detail: string;
  price: string;
  unit?: string;
  note?: string;
  featured?: boolean;
  /**
   * Mindbody contract id per studio. `null` = code not confirmed after the
   * 2 Nov link check; links to that studio's membership list instead.
   */
  contractIds?: Record<StudioSlug, number | null>;
};

export const PRICING_TIERS: PricingTier[] = [
  { group: "intro", name: "Intro Offer", detail: "4 classes, any format", price: "$49", note: "New clients only. 14 days from first use", featured: true },
  { group: "membership", name: "Lite", detail: "1 class per week", price: "$30", unit: "/wk", note: "26-week minimum", contractIds: { "cecil-hills": 136, "kings-park": null } },
  { group: "membership", name: "Essentials", detail: "2 classes per week", price: "$47", unit: "/wk", note: "12-week minimum", contractIds: { "cecil-hills": 130, "kings-park": 130 } },
  { group: "membership", name: "Elevate", detail: "3 classes per week", price: "$65", unit: "/wk", note: "12-week minimum", contractIds: { "cecil-hills": 131, "kings-park": 131 } },
  { group: "membership", name: "Accelerate", detail: "4 classes per week", price: "$69", unit: "/wk", note: "12-week minimum", contractIds: { "cecil-hills": 137, "kings-park": 139 } },
  { group: "membership", name: "Infinite", detail: "Unlimited classes", price: "$85", unit: "/wk", note: "12-week minimum", featured: true, contractIds: { "cecil-hills": 132, "kings-park": 132 } },
  { group: "student", name: "Essentials Student", detail: "2 classes per week", price: "$40", unit: "/wk", note: "12-week minimum. Uni or TAFE students", contractIds: { "cecil-hills": 138, "kings-park": 140 } },
  { group: "student", name: "Elevate Student", detail: "3 classes per week", price: "$45", unit: "/wk", note: "12-week minimum. Uni or TAFE students", contractIds: { "cecil-hills": 139, "kings-park": 141 } },
  { group: "pack", name: "Casual", detail: "1 class", price: "$35", note: "1-week expiry" },
  { group: "pack", name: "10 Class Pack", detail: "10 classes", price: "$310", note: "12 months from first use" },
  { group: "pack", name: "20 Class Pack", detail: "20 classes", price: "$599", note: "12 months from first use" },
  { group: "pack", name: "50 Class Pack", detail: "50 classes", price: "$1,250", note: "12 months from first use" },
];

/** Where a pricing tile sends people in Mindbody for a given studio */
export function buyUrl(tier: PricingTier, studio: Studio): string {
  const mb = studio.mindbody;
  if (tier.group === "intro") return mb.introOfferUrl;
  if (tier.group === "pack") return mb.classPacksUrl;
  const id = tier.contractIds?.[studio.slug];
  return id ? mindbodyContractUrl(mb.studioId, id) : mb.contractsUrl;
}

/* ------------------------------------------------------------------ */
/* Classes: the five families, as named on the schedule ("Lift | Total") */
/* ------------------------------------------------------------------ */

export type ClassFormat = {
  slug: string;
  name: string;
  tagline: string;
  /** Variants as they appear on the schedule */
  variants: string[];
  /** Photo under /public; omitted = tonal block */
  image?: string;
  availableAt: StudioSlug[];
};

export const CLASS_FORMATS: ClassFormat[] = [
  {
    slug: "balanced",
    name: "Balanced",
    tagline: "Your reformer class, refined. Precision, breath and control.",
    variants: ["Foundation", "Women"],
    image: "/images/hero/reformer-detail.jpg",
    availableAt: ["cecil-hills", "kings-park"],
  },
  {
    slug: "dynamic",
    name: "Dynamic",
    tagline: "High-intensity reformer, done properly.",
    variants: [],
    image: "/images/classes/dynamic.jpg",
    availableAt: ["cecil-hills", "kings-park"],
  },
  {
    slug: "ignite",
    name: "Ignite",
    tagline: "Reformer meets cardio on the jumpboard.",
    variants: ["Fired Up"],
    // TODO(owner): swap for a jumpboard shot
    image: "/images/studios/kings-park-studio.jpg",
    availableAt: ["cecil-hills", "kings-park"],
  },
  {
    slug: "lift",
    name: "Lift",
    tagline: "Strength where it counts: lower, upper or total body.",
    variants: ["Lower", "Upper", "Total"],
    image: "/images/classes/sculpt.jpg",
    availableAt: ["cecil-hills", "kings-park"],
  },
  {
    slug: "recharge",
    name: "Recharge",
    tagline: "Slow down. Stretch, mobility and recovery.",
    variants: ["Deep Stretch"],
    image: "/images/classes/stretch.jpg",
    availableAt: ["cecil-hills", "kings-park"],
  },
];

/* ------------------------------------------------------------------ */
/* Navigation + social                                                 */
/* ------------------------------------------------------------------ */

export type NavLink = {
  label: string;
  href?: string;
  external?: boolean;
  children?: { label: string; href: string; external?: boolean }[];
};

export const NAV_LINKS: NavLink[] = [
  {
    label: "Studios",
    children: STUDIO_LIST.map((s) => ({ label: s.shortName, href: `/studios/${s.slug}` })),
  },
  { label: "Classes", href: "/classes" },
  {
    label: "Schedule",
    children: STUDIO_LIST.map((s) => ({ label: s.shortName, href: `/schedule/${s.slug}` })),
  },
  {
    label: "Pricing",
    children: STUDIO_LIST.map((s) => ({ label: s.shortName, href: `/pricing/${s.slug}` })),
  },
  { label: "About", href: "/about" },
];

/**
 * Google reviews widget (Repuso). Paste the embed code from
 * Repuso > Widgets > your widget > "Get code" between the backticks.
 * Empty = the site shows its own review cards instead.
 */
export const REVIEWS_WIDGET_HTML = ``;

/**
 * Verified 2 Nov 2026 against the REFORMD PILATES Meta ad account: every ad
 * runs from Facebook Page 475593318971497 and Instagram @reformdpilatesstudio.
 * The numeric Page URL always redirects to the Page's current vanity URL.
 */
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/reformdpilatesstudio/",
  facebook: "https://www.facebook.com/475593318971497",
};
