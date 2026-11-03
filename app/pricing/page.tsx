import type { Metadata } from "next";

import { PageHero } from "@/components/sections/page-hero";
import { StudioChooser } from "@/components/sections/studio-chooser";
import { withOg } from "@/lib/meta";

export const metadata: Metadata = withOg({
  title: "Pricing",
  description: "Reformd Pilates pricing: 4 classes for $49, memberships from $30 a week, student rates and class packs. Same prices at both studios.",
  alternates: { canonical: "/pricing" },
});

export default function PricingPicker() {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Choose your studio." lede="Same prices at Cecil Hills and Kings Park." />
      <StudioChooser href={(s) => `/pricing/${s.slug}`} cta="Pricing" />
    </>
  );
}
