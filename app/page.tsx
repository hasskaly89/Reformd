import type { Metadata } from "next";

import { ClassFormats } from "@/components/sections/class-formats";
import { Hero } from "@/components/sections/hero";
import { InstagramFeed } from "@/components/sections/instagram-feed";
import { IntroOffer } from "@/components/sections/intro-offer";
import { StudioLocations } from "@/components/sections/studio-locations";
import { Testimonials } from "@/components/sections/testimonials";
import { ValueProp } from "@/components/sections/value-prop";
import { STUDIO_LIST } from "@/lib/constants";
import { JsonLd, ORGANIZATION_JSON_LD } from "@/lib/seo";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <JsonLd data={ORGANIZATION_JSON_LD} />
      <Hero />
      <ValueProp />
      <ClassFormats />
      <Testimonials />
      <InstagramFeed studios={STUDIO_LIST} />
      <StudioLocations />
      <IntroOffer />
    </>
  );
}
