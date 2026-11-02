import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/constants";
import { ALLOW_INDEXING } from "@/lib/site-env";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
