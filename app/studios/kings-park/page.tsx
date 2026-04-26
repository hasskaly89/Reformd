import type { Metadata } from "next";

import { StudioDetail } from "@/components/sections/studio-detail";
import { STUDIOS } from "@/lib/constants";

const studio = STUDIOS["kings-park"];

export const metadata: Metadata = {
  title: `${studio.shortName} Studio`,
  description: `${studio.blurb} ${studio.address}, ${studio.suburb} ${studio.state} ${studio.postcode}.`,
};

export default function KingsParkPage() {
  return <StudioDetail studio={studio} />;
}
