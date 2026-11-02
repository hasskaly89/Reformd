export const SITE_NAME = "Reformd Pilates";
export const SITE_TAGLINE = "Redefine strength, reform your body.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.reformdpilates.com.au";

export type StudioSlug = "cecil-hills" | "kings-park";

export type Studio = {
  slug: StudioSlug;
  name: string;
  shortName: string;
  address: string;
  suburb: string;
  postcode: string;
  state: "NSW";
  phone?: string;
  email?: string;
  /** Google Maps embed query - `output=embed` URL */
  mapsEmbed: string;
  /** Operating hours, day-by-day */
  hours: { day: string; open: string }[];
  /** Class formats taught at this studio */
  classes: string[];
  /** Studio-specific facilities */
  facilities: string[];
  /** One-line studio intro */
  blurb: string;
  /** Studio photo under /public */
  image: string;
  /** Mindbody integration */
  mindbody: {
    studioId: string;
    /** Healcode widget id for the embedded Schedules widget */
    scheduleWidgetId: string;
    /** Direct deep-link to the membership purchase flow on this studio */
    membershipBuyUrl: string;
  };
};

export const STUDIOS: Record<StudioSlug, Studio> = {
  "cecil-hills": {
    slug: "cecil-hills",
    name: "Reformd Pilates Cecil Hills",
    shortName: "Cecil Hills",
    address: "1A/1 Lancaster Ave",
    suburb: "Cecil Hills",
    postcode: "2171",
    state: "NSW",
    mapsEmbed:
      "https://www.google.com/maps?q=1A/1+Lancaster+Ave,+Cecil+Hills+NSW+2171&output=embed",
    hours: [
      { day: "Mon – Fri", open: "5:30am – 8:00pm" },
      { day: "Saturday", open: "7:00am – 12:00pm" },
      { day: "Sunday", open: "8:00am – 11:00am" },
    ],
    classes: ["Reformer", "Jumpboard", "Dynamic", "Sculpt", "Stretch"],
    facilities: [
      "On-site creche",
      "Boutique reformer studio",
      "Showers & change rooms",
      "Free on-site parking",
    ],
    blurb:
      "Where Reformd began. Every class format, plus an on-site creche.",
    image: "/images/studios/cecil-hills-detail.jpg",
    mindbody: {
      studioId: "5741473",
      scheduleWidgetId: "047812b344",
      membershipBuyUrl:
        "https://clients.mindbodyonline.com/classic/ws?studioid=5741473&stype=41&sTG=24&prodId=100041",
    },
  },
  "kings-park": {
    slug: "kings-park",
    name: "Reformd Pilates Kings Park",
    shortName: "Kings Park",
    address: "6/2 Garling Rd",
    suburb: "Kings Park",
    postcode: "2148",
    state: "NSW",
    mapsEmbed:
      "https://www.google.com/maps?q=6/2+Garling+Rd,+Kings+Park+NSW+2148&output=embed",
    hours: [
      { day: "Mon – Fri", open: "5:30am – 8:00pm" },
      { day: "Saturday", open: "7:00am – 12:00pm" },
      { day: "Sunday", open: "8:00am – 11:00am" },
    ],
    classes: ["Reformer", "Dynamic", "Sculpt", "Stretch"],
    facilities: [
      "Boutique reformer studio",
      "Showers & change rooms",
      "Street parking",
    ],
    blurb:
      "The Reformd standard, further west. Same small classes, same instructors.",
    image: "/images/studios/kings-park-studio.jpg",
    mindbody: {
      studioId: "5749916",
      scheduleWidgetId: "20429556a3a",
      membershipBuyUrl:
        "https://clients.mindbodyonline.com/classic/ws?studioid=5749916&stype=41&sTG=24&prodId=100111",
    },
  },
};

/** Intro offer URL - same product across both studios (hosted on Cecil Hills' Mindbody) */
export const INTRO_OFFER_BUY_URL =
  "https://clients.mindbodyonline.com/classic/ws?studioid=5741473&stype=40&prodid=130";

/** Pricing - identical at both studios; per-studio Mindbody URLs are derived */
export type PricingTier = {
  name: string;
  price: string;
  /** Sub-label e.g. "/wk", or the cadence */
  unit?: string;
  /** Fine print e.g. "12-week commitment" */
  note?: string;
  /** Group these in the UI */
  group: "intro" | "membership" | "pack";
  /** Highlight one tier visually */
  featured?: boolean;
};

export const PRICING_TIERS: PricingTier[] = [
  { group: "intro",      name: "Intro Offer",        price: "$49",     unit: "for 4 classes", note: "First-timers only",   featured: true },
  { group: "membership", name: "2 Classes / week",   price: "$47",     unit: "/wk",            note: "12-week commitment" },
  { group: "membership", name: "3 Classes / week",   price: "$65",     unit: "/wk",            note: "12-week commitment" },
  { group: "membership", name: "Infinite Unlimited", price: "$85",     unit: "/wk",            note: "12-week commitment", featured: true },
  { group: "pack",       name: "Casual",             price: "$35",     unit: "1 class",        note: "1-week expiry" },
  { group: "pack",       name: "10 Classes",         price: "$310",    unit: "10 classes",     note: "12-month expiry" },
  { group: "pack",       name: "20 Classes",         price: "$599",    unit: "20 classes",     note: "12-month expiry" },
  { group: "pack",       name: "50 Classes",         price: "$1,250",  unit: "50 classes",     note: "12-month expiry" },
];

export type ClassFormat = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  duration: string;
  intensity: "Low" | "Moderate" | "High";
  /** Photo under /public; omitted = tonal block */
  image?: string;
  /** Studios that run this format */
  availableAt: StudioSlug[];
};

export const CLASS_FORMATS: ClassFormat[] = [
  {
    slug: "reformer",
    duration: "50 min",
    intensity: "Moderate",
    image: "/images/classes/reformer.jpg",
    name: "Reformer",
    tagline: "The classic. Long, lean, controlled.",
    description:
      "Our signature full-body class. Precision, breath and progressive load. Every level welcome.",
    availableAt: ["cecil-hills", "kings-park"],
  },
  {
    slug: "jumpboard",
    duration: "50 min",
    intensity: "High",
    name: "Jumpboard",
    tagline: "Cardio in disguise.",
    description:
      "Reformer meets HIIT. Low-impact cardio that's easy on the joints.",
    availableAt: ["cecil-hills"],
  },
  {
    slug: "dynamic",
    duration: "45 min",
    intensity: "High",
    image: "/images/classes/dynamic.jpg",
    name: "Dynamic",
    tagline: "Faster pace, bigger burn.",
    description:
      "A faster, flowing reformer class with fewer rest beats.",
    availableAt: ["cecil-hills", "kings-park"],
  },
  {
    slug: "sculpt",
    duration: "50 min",
    intensity: "Moderate",
    image: "/images/classes/sculpt.jpg",
    name: "Sculpt",
    tagline: "Reformer + weights.",
    description:
      "Light weights and bands for targeted upper-body and glute work.",
    availableAt: ["cecil-hills", "kings-park"],
  },
  {
    slug: "stretch",
    duration: "45 min",
    intensity: "Low",
    image: "/images/classes/stretch.jpg",
    name: "Stretch",
    tagline: "Slow it down. Open up.",
    description:
      "Mobility, breath work and deep release. Your recovery class.",
    availableAt: ["cecil-hills", "kings-park"],
  },
];

export const STUDIO_LIST: Studio[] = [
  STUDIOS["cecil-hills"],
  STUDIOS["kings-park"],
];

/**
 * Site navigation - single source for header + footer.
 * V1: only routes that exist in this build. Add live-site links here.
 */
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

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/reformdpilates",
  facebook: "https://www.facebook.com/reformdpilates",
};
