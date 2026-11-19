import type { Metadata } from "next";

import { SITE_NAME } from "@/lib/constants";

/** Landscape social card (1200x630) used wherever a page has no image of its own. */
export const DEFAULT_OG_IMAGE = {
  url: "/og/reformd-share.jpg",
  width: 1200,
  height: 630,
  alt: "A reformer Pilates class at Reformd Pilates",
};

type PageMeta = Metadata & { title: string; description: string; alternates: { canonical: string } };

/**
 * Gives a page its own social preview. Next.js replaces (not merges) the
 * layout's openGraph when a page sets one, so every field is set here;
 * without this, secondary pages would share the homepage's title and URL.
 */
export function withOg(meta: PageMeta, image = DEFAULT_OG_IMAGE): Metadata {
  return {
    ...meta,
    openGraph: {
      title: `${meta.title} · ${SITE_NAME}`,
      description: meta.description,
      url: meta.alternates.canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_AU",
      images: [image],
    },
  };
}
