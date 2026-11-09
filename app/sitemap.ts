import type { MetadataRoute } from "next";

import { SITE_URL, STUDIO_LIST } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/classes",
    "/schedule",
    "/pricing",
    "/contact",
    "/creche",
    "/private-sessions",
    ...STUDIO_LIST.flatMap((s) => [`/studios/${s.slug}`, `/schedule/${s.slug}`, `/pricing/${s.slug}`]),
  ];
  return paths.map((p) => ({ url: `${SITE_URL}${p}` }));
}
