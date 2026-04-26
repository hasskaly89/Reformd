export const SITE_NAME = "Reformd Pilates";
export const SITE_TAGLINE = "Redefine strength, reform your body.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://reformdpilates.com.au";

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
  /** Google Maps embed query — `output=embed` URL */
  mapsEmbed: string;
  /** Operating hours, day-by-day */
  hours: { day: string; open: string }[];
  /** Class formats taught at this studio */
  classes: string[];
  /** Studio-specific facilities */
  facilities: string[];
  /** What makes this studio unique — short paragraph */
  blurb: string;
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
      "Our flagship Cecil Hills studio is where Reformd began. It's the full menu — every class format, plus an on-site creche so the half-hour you carve out for yourself actually happens.",
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
      "Our Kings Park studio brings the Reformd experience further west. Same boutique sizes, same instructor quality, with a class lineup tailored to the local schedule.",
  },
};

export const STUDIO_LIST: Studio[] = [
  STUDIOS["cecil-hills"],
  STUDIOS["kings-park"],
];

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  {
    label: "Studios",
    children: [
      { label: "Cecil Hills", href: "/studios/cecil-hills" },
      { label: "Kings Park", href: "/studios/kings-park" },
    ],
  },
  { label: "Classes", href: "/classes" },
  {
    label: "Schedule",
    children: [
      { label: "Cecil Hills", href: "/schedule/cecil-hills" },
      { label: "Kings Park", href: "/schedule/kings-park" },
    ],
  },
  {
    label: "Pricing",
    children: [
      { label: "Cecil Hills", href: "/pricing/cecil-hills" },
      { label: "Kings Park", href: "/pricing/kings-park" },
    ],
  },
  { label: "Instructors", href: "/instructors" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/reformdpilates",
  facebook: "https://www.facebook.com/reformdpilates",
};

export const APP_LINKS = {
  ios: "#",
  android: "#",
};
